import re
from datetime import datetime, timedelta, timezone
from urllib.parse import parse_qs, parse_qsl, urlencode, urlparse

import httpx
from bs4 import BeautifulSoup
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models import LinkPreviewCache
from app.schemas.link_preview import LinkPreview
from app.services.uploads import store_cached_image

MAX_IMAGE_BYTES = 10 * 1024 * 1024

# Query params that identify the click/campaign, not the resource — dropped when
# building the canonical cache key so the same link shared with different
# tracking tails dedupes to one stored resource.
TRACKING_PARAMS = {
    "fbclid", "gclid", "igshid", "mc_cid", "mc_eid", "ref", "ref_src", "ref_url",
    "si", "feature", "app", "ab_channel", "spm", "_branch_match_id", "s", "t",
}

CACHE_TTL = timedelta(hours=24)
FETCH_TIMEOUT = 6.0
# A realistic browser UA, not a bot string: many sites (blogs behind CDNs, etc.)
# serve an empty/verification shell to unknown bots but full OG tags to a
# browser. Verified this doesn't regress the platforms that already worked
# (X still serves its profile card, YouTube/Substack/Telegram/Medium unchanged).
USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)

# Domain -> ItemType hints, used when the platform-specific resolver (oEmbed)
# doesn't already imply a type. Order matters — first match wins.
TYPE_DOMAIN_HINTS: list[tuple[str, str]] = [
    ("goodreads.com", "book"),
    ("amazon.", "book"),
    ("openlibrary.org", "book"),
    ("open.spotify.com", "podcast"),
    ("podcasts.apple.com", "podcast"),
    ("anchor.fm", "podcast"),
    ("overcast.fm", "podcast"),
    ("dribbble.com", "design"),
    ("behance.net", "design"),
    ("figma.com", "design"),
]

# Generic social platforms whose profile pages are "an account", not a
# YouTube-style "channel". A single-segment path (optionally @-prefixed) is the
# profile; anything deeper is a specific post/video handled as such elsewhere.
SOCIAL_PROFILE_DOMAINS = (
    "instagram.com", "tiktok.com", "threads.net", "threads.com",
    "linkedin.com", "github.com", "twitch.tv", "bsky.app", "mastodon.social",
)

# "Naval (@naval) on X" -> "Naval". X profile pages have no clean author meta,
# so the display name has to be recovered from the og:title, which otherwise
# leaves creator_name as the useless og:site_name ("X (formerly Twitter)").
X_TITLE_NAME_RE = re.compile(r"^(.*?)\s*\(@[^)]+\)\s+on\s+X$")

# og:site_name on most social/content platforms is just the platform brand, not
# the entity — "by Telegram" / "by GitHub" is noise, not a creator. Blanked so
# the card falls back to the title (which holds the real name). Lowercased.
PLATFORM_BRANDS = {
    "telegram", "medium", "github", "spotify", "youtube", "reddit", "linkedin",
    "instagram", "tiktok", "twitch", "goodreads", "x", "x (formerly twitter)",
    "twitter", "facebook", "pinterest",
}

# Telegram serves full OG tags AND a subscriber/member line on t.me pages. The
# "N subscribers" line (+ a "Preview channel" button) marks a broadcast channel;
# a group shows "N members"; a bare user/bot shows neither.
TG_PAGE_EXTRA_RE = re.compile(r'tgme_page_extra">([^<]*)<')

SUBSCRIBER_COUNT_RE = re.compile(r'"subscriberCountText":.{0,200}?"simpleText":"([^"]+)"')
# YouTube's own authoritative flag, emitted into the server-rendered page data
# only on playlist/show pages: value "1" for a native podcast show, "0" for a
# regular playlist (absent on video/channel pages). Verified empirically across
# regular playlists, creator podcast playlists (Lex Fridman), and native podcast
# shows (Huberman) — the podcasts read "1", everything else "0"/absent.
PODCAST_SHOW_RE = re.compile(r'"is_podcast_show_page","value":"1"')


def _is_substack(domain: str, preview: "LinkPreview | None") -> bool:
    """Substack runs on both *.substack.com and custom domains
    (newsletter.pragmaticengineer.com, etc.). The custom-domain case can't be
    told from the URL, so fall back to signals in the resolved page: Substack
    serves its images off substackcdn.com and stamps "| Substack" onto og:title.
    """
    if domain.endswith("substack.com"):
        return True
    if preview is None:
        return False
    if preview.image_url and "substackcdn.com" in preview.image_url:
        return True
    if preview.title and preview.title.rstrip().endswith("Substack"):
        return True
    return False


def _detect_resource_kind(
    url: str, suggested_type: str, preview: "LinkPreview | None" = None
) -> str | None:
    """Cross-platform "what shape is this" classification — orthogonal to
    ItemType (which drives category badges/filters): post, video, channel,
    podcast, playlist, account (a social profile), or newsletter. None for
    shapes with no clear signal (a random blog article, a book page, etc.).

    Takes the resolved `preview` so content-based detection (Substack on a
    custom domain) works even when the URL alone gives nothing away.
    """
    parsed = urlparse(url)
    path = parsed.path
    query = parse_qs(parsed.query)
    domain = parsed.hostname or ""

    if suggested_type == "youtube":
        if "list" in query and "v" not in query:
            return "playlist"
        if "v" in query or path.startswith("/shorts/"):
            return "video"
        if path.startswith("/playlist"):
            return "playlist"
        if any(path.startswith(p) for p in ("/@", "/channel/", "/c/", "/user/")):
            return "channel"
        if "youtu.be" in domain and path.strip("/"):
            return "video"
        return "channel"

    # X: a status URL is a single post; the bare handle is the account itself.
    # "channel" is a YouTube concept and never fit X.
    if suggested_type == "x":
        if re.search(r"/status/\d+", path):
            return "post"
        return "account"

    # Substack: a /p/ URL is one published post; anything else (the bare
    # publication) is the newsletter as a whole.
    if _is_substack(domain, preview):
        return "post" if "/p/" in path else "newsletter"

    segments = [s for s in path.split("/") if s]

    # (Telegram is classified by its own resolver from live page signals, not here.)

    # Spotify: distinguish shows/episodes (podcast) from playlists and artists.
    # Checked before the podcast domain-hint below so a Spotify playlist/artist
    # isn't flattened to "podcast".
    if "open.spotify.com" in domain and segments:
        head = segments[0]
        if head in ("show", "episode"):
            return "podcast"
        if head == "playlist":
            return "playlist"
        if head == "artist":
            return "account"

    # Reddit: a /comments/ URL is a single post; a subreddit or user page is a
    # standing feed we treat as an account.
    if domain.endswith("reddit.com") and segments:
        if "comments" in segments:
            return "post"
        if segments[0] in ("r", "u", "user") and len(segments) >= 2:
            return "account"

    # Medium: medium.com/@user is the account; a deeper path is a story.
    if domain.endswith("medium.com") and segments:
        if segments[0].startswith("@"):
            return "post" if len(segments) >= 2 else "account"
        return "post"

    # LinkedIn profiles/companies live under a prefixed path (/in/<user>,
    # /company/<name>, /school/<name>) — the bare-segment rule below misses them.
    if domain.endswith("linkedin.com") and segments:
        if segments[0] in ("in", "company", "school"):
            return "account"

    if suggested_type == "podcast":
        return "podcast"

    # Other social platforms: a single-segment path (optionally @-prefixed) is
    # the profile → account; deeper paths are specific content we don't classify.
    if any(domain == d or domain.endswith("." + d) for d in SOCIAL_PROFILE_DOMAINS):
        if len(segments) == 1:
            return "account"

    return None


def _suggest_item_type(domain: str) -> str:
    if "youtube.com" in domain or "youtu.be" in domain:
        return "youtube"
    if "x.com" in domain or "twitter.com" in domain:
        return "x"
    for hint_domain, item_type in TYPE_DOMAIN_HINTS:
        if hint_domain in domain:
            return item_type
    return "essay"


async def _from_youtube_oembed(client: httpx.AsyncClient, url: str) -> LinkPreview:
    resp = await client.get(
        "https://www.youtube.com/oembed", params={"url": url, "format": "json"}
    )
    resp.raise_for_status()
    data = resp.json()
    return LinkPreview(
        platform="youtube",
        title=data.get("title"),
        image_url=data.get("thumbnail_url"),
        creator_name=data.get("author_name"),
    )


async def _youtube_page_signals(client: httpx.AsyncClient, url: str) -> tuple[str | None, bool]:
    """One fetch of the YouTube page HTML, extracting two best-effort signals:
    subscriber count (from the server-rendered ytInitialData blob) and whether
    this is a podcast show.

    Podcast detection keys off YouTube's own `is_podcast_show_page` flag, which
    it server-renders into playlist/show pages — "1" for a native podcast show
    (including a creator's podcast playlist), "0" for a regular playlist, absent
    on video/channel pages. This replaces the earlier creator-tag/keyword guess,
    which false-positived on any video whose creator happened to tag it
    "podcast" and missed shows that weren't tagged. The flag is authoritative
    and only present on the pages where the podcast-vs-playlist distinction
    actually applies, so videos and channels never get misread as podcasts.
    """
    try:
        resp = await client.get(url, headers={"User-Agent": USER_AGENT}, follow_redirects=True)
        resp.raise_for_status()
    except httpx.HTTPError:
        return None, False

    text = resp.text
    subscriber_match = SUBSCRIBER_COUNT_RE.search(text)
    subscriber_count = subscriber_match.group(1) if subscriber_match else None

    is_podcast = bool(PODCAST_SHOW_RE.search(text))

    return subscriber_count, is_podcast


async def _from_twitter_oembed(client: httpx.AsyncClient, url: str) -> LinkPreview:
    try:
        resp = await client.get(
            "https://publish.twitter.com/oembed", params={"url": url, "omit_script": "true"}
        )
        resp.raise_for_status()
        data = resp.json()
        return LinkPreview(platform="x", title=None, creator_name=data.get("author_name"))
    except httpx.HTTPError:
        return LinkPreview(platform="x")


async def _from_open_graph(client: httpx.AsyncClient, url: str, platform: str) -> LinkPreview:
    try:
        resp = await client.get(url, headers={"User-Agent": USER_AGENT}, follow_redirects=True)
        resp.raise_for_status()
    except httpx.HTTPError:
        return LinkPreview(platform=platform)

    soup = BeautifulSoup(resp.text, "html.parser")

    def meta(*names: str) -> str | None:
        for name in names:
            tag = soup.find("meta", attrs={"property": name}) or soup.find(
                "meta", attrs={"name": name}
            )
            if tag and tag.get("content"):
                return tag["content"]
        return None

    return LinkPreview(
        platform=platform,
        title=meta("og:title", "twitter:title") or (soup.title.string if soup.title else None),
        image_url=meta("og:image", "twitter:image"),
        description=meta("og:description", "twitter:description", "description"),
        creator_name=meta("og:site_name", "author"),
    )


async def _from_telegram(client: httpx.AsyncClient, url: str) -> LinkPreview:
    """One fetch of a t.me page → OG tags + channel/account/post classification.

    A t.me/<name>/<n> URL is a single message (post). Otherwise the page's
    subscriber/member line disambiguates what a bare t.me/<name> is: a
    "N subscribers" line (+ "Preview channel") is a broadcast channel; anything
    else (a group's "N members", or a plain user/bot) is treated as an account.
    The subscriber/member count doubles as the follower_count.
    """
    try:
        resp = await client.get(url, headers={"User-Agent": USER_AGENT}, follow_redirects=True)
        resp.raise_for_status()
    except httpx.HTTPError:
        return LinkPreview(platform="telegram")

    html = resp.text
    soup = BeautifulSoup(html, "html.parser")

    def meta(*names: str) -> str | None:
        for name in names:
            tag = soup.find("meta", attrs={"property": name}) or soup.find(
                "meta", attrs={"name": name}
            )
            if tag and tag.get("content"):
                return tag["content"]
        return None

    segments = [s for s in urlparse(url).path.split("/") if s]
    extra_match = TG_PAGE_EXTRA_RE.search(html)
    extra = extra_match.group(1).strip() if extra_match else ""
    extra_lower = extra.lower()

    if len(segments) >= 2 and segments[-1].isdigit():
        kind = "post"
    elif "subscriber" in extra_lower or "preview channel" in html.lower():
        kind = "channel"
    else:
        # group ("N members") or a plain user/bot — no broadcast-channel concept,
        # so it reads as an account.
        kind = "account"

    follower_count = extra if ("subscriber" in extra_lower or "member" in extra_lower) else None

    return LinkPreview(
        platform="telegram",
        title=meta("og:title", "twitter:title"),
        image_url=meta("og:image", "twitter:image"),
        description=meta("og:description", "twitter:description"),
        # The channel/user title already carries the entity name; there's no
        # separate creator, and og:site_name would just say "Telegram".
        creator_name=None,
        resource_kind=kind,
        follower_count=follower_count,
    )


def _normalize_url(url: str) -> str:
    """Canonical key for a link so variants of the same resource collapse to one
    cache entry: https, no "www.", no fragment, no trailing slash, tracking
    params stripped, remaining params sorted. The original URL is still used for
    the actual fetch — only the cache/dedup key is normalized.
    """
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if host.startswith("www."):
        host = host[4:]

    params = [
        (k, v)
        for k, v in parse_qsl(parsed.query, keep_blank_values=False)
        if k.lower() not in TRACKING_PARAMS and not k.lower().startswith("utm_")
    ]
    params.sort()
    query = urlencode(params)

    path = parsed.path.rstrip("/") or "/"
    normalized = f"https://{host}{path}"
    if query:
        normalized += f"?{query}"
    return normalized


async def _cache_image(client: httpx.AsyncClient, image_url: str, base_url: str) -> str | None:
    """Download a resolved remote image and re-host it locally, returning an
    absolute URL to our own copy (or None on failure — caller keeps the remote
    URL as a fallback). Dedup happens by content hash inside store_cached_image.
    """
    try:
        resp = await client.get(image_url, headers={"User-Agent": USER_AGENT}, follow_redirects=True)
        resp.raise_for_status()
    except httpx.HTTPError:
        return None
    if len(resp.content) > MAX_IMAGE_BYTES:
        return None
    relative = store_cached_image(resp.content)
    if relative is None:
        return None
    return f"{base_url.rstrip('/')}{relative}"


async def resolve_link_preview(db: AsyncSession, url: str, base_url: str | None = None) -> LinkPreview:
    base_url = base_url or settings.public_base_url
    # One stored copy per resource: variants of the same link (tracking params,
    # www, trailing slash, http/https) share this canonical key, so a link
    # curated by many people is resolved and cached exactly once.
    cache_key = _normalize_url(url)
    cached = await db.get(LinkPreviewCache, cache_key)
    if cached is not None and cached.fetched_at > datetime.now(timezone.utc) - CACHE_TTL:
        return LinkPreview.model_validate(cached.resolved)

    domain = urlparse(url).hostname or ""
    suggested_type = _suggest_item_type(domain)
    is_telegram = domain in ("t.me", "telegram.me") or domain.endswith(".t.me")
    platform = (
        "youtube" if suggested_type == "youtube"
        else "x" if suggested_type == "x"
        else "telegram" if is_telegram
        else "web"
    )

    async with httpx.AsyncClient(timeout=FETCH_TIMEOUT) as client:
        try:
            if platform == "youtube":
                preview = await _from_youtube_oembed(client, url)
            elif platform == "x":
                preview = await _from_twitter_oembed(client, url)
            elif platform == "telegram":
                preview = await _from_telegram(client, url)
            else:
                preview = await _from_open_graph(client, url, platform)
        except httpx.HTTPError:
            preview = LinkPreview(platform=platform)

        # oEmbed only covers specific videos/tweets — channel and profile pages
        # fall through to a generic OG-tag scrape rather than resolving to nothing.
        if platform in ("youtube", "x") and not preview.image_url:
            fallback = await _from_open_graph(client, url, platform)
            preview = LinkPreview(
                platform=platform,
                title=preview.title or fallback.title,
                image_url=fallback.image_url,
                description=preview.description or fallback.description,
                creator_name=preview.creator_name or fallback.creator_name,
            )

        # X's follower count isn't attempted at all: x.com is a client-rendered
        # SPA, so a plain HTML fetch (no headless browser, no auth token)
        # returns none of that data — unlike YouTube, which still
        # server-renders it into the page.
        is_podcast = False
        if platform == "youtube":
            preview.follower_count, is_podcast = await _youtube_page_signals(client, url)

        # Re-host the resolved image on our own storage (deduped by content hash)
        # so the shelf never hotlinks a third-party CDN that may rate-limit,
        # require a referer, or rot — and so identical images are stored once.
        if preview.image_url and not preview.image_url.startswith(base_url):
            local_image = await _cache_image(client, preview.image_url, base_url)
            if local_image:
                preview.image_url = local_image

    # X profile pages expose no author meta, so creator_name ends up as the
    # og:site_name ("X (formerly Twitter)"). Recover the real display name from
    # the og:title instead; leave tweet pages (where oEmbed already gave a
    # proper author_name) untouched.
    if platform == "x" and preview.title:
        m = X_TITLE_NAME_RE.match(preview.title.strip())
        if m:
            preview.creator_name = m.group(1)

    preview.suggested_type = suggested_type
    if platform != "telegram":
        # Telegram already classified itself from live page signals
        # (subscribers/members); the URL-shape detector would only downgrade it.
        resource_kind = _detect_resource_kind(url, suggested_type, preview)
        # Override with "podcast" when YouTube's own flag says this playlist/show
        # is a podcast — a podcast even when hosted on YouTube, not Spotify.
        preview.resource_kind = "podcast" if is_podcast else resource_kind

    # Strip creator_name when it's just the platform's brand (og:site_name on
    # Medium/GitHub/etc.) — the title already carries the real entity name.
    if preview.creator_name and preview.creator_name.strip().lower() in PLATFORM_BRANDS:
        preview.creator_name = None

    existing = await db.execute(select(LinkPreviewCache).where(LinkPreviewCache.url == cache_key))
    row = existing.scalar_one_or_none()
    if row is None:
        db.add(LinkPreviewCache(url=cache_key, resolved=preview.model_dump()))
    else:
        row.resolved = preview.model_dump()
        row.fetched_at = datetime.now(timezone.utc)
    await db.commit()

    return preview
