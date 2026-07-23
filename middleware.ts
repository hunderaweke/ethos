export const config = {
  matcher: "/:handle((?!dashboard$|assets$|api$)[^/.]+)",
};

const BOT_UA_RE =
  /facebookexternalhit|Facebot|Twitterbot|Slackbot|Discordbot|WhatsApp|TelegramBot|LinkedInBot|Applebot|Pinterest|redditbot|vkShare|SkypeUriPreview|Iframely|Embedly|Googlebot|Bingbot/i;

const API_BASE = process.env.API_URL || "https://blueprint-api.hundera.com/api/v1";
const SITE_URL = process.env.SITE_URL || "https://blueprint.hundera.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface Profile {
  handle: string;
  display_name: string;
  bio: string;
  avatar_url: string | null;
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  const userAgent = request.headers.get("user-agent") || "";
  if (!BOT_UA_RE.test(userAgent)) return undefined;

  const url = new URL(request.url);
  const handle = decodeURIComponent(url.pathname.replace(/^\/@?/, ""));
  if (!handle) return undefined;

  let profile: Profile;
  try {
    const res = await fetch(`${API_BASE}/profiles/${encodeURIComponent(handle)}`);
    if (!res.ok) return undefined;
    profile = await res.json();
  } catch {
    return undefined;
  }

  const title = `${profile.display_name || profile.handle} (@${profile.handle}) · blueprint.id`;
  const description =
    profile.bio?.trim() || `Check out @${profile.handle}'s curated Mind-Shelf on blueprint.id.`;
  const canonical = `${SITE_URL}/@${profile.handle}`;
  const image = profile.avatar_url || undefined;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}" />
<link rel="canonical" href="${canonical}" />
<meta property="og:type" content="profile" />
<meta property="og:site_name" content="blueprint.id" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${canonical}" />
${image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : ""}
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ""}
</head>
<body></body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
