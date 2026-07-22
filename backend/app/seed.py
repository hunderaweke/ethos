import asyncio

from sqlalchemy import select

from app.db import async_session
from app.models import CurationItem, Profile, User
from app.services.link_preview import resolve_link_preview

DEMO_ITEMS = [
    dict(
        type="book",
        title="Designing Data-Intensive Applications",
        creator_name="Martin Kleppmann",
        link="https://dataintensive.net/",
        description="The absolute bible for understanding distributed systems, database architectures, and engineering trade-offs.",
        impact="This book completely re-wired my brain. It taught me how to think in terms of databases, scale, and trade-offs rather than dogmatic stack choices.",
        tags=["#Systems", "#Databases", "#Backend"],
        size="large",
    ),
    dict(
        type="youtube",
        title="Fireship",
        creator_name="Jeff Delaney",
        link="https://www.youtube.com/@Fireship",
        description="High-intensity code tutorials and tech industry updates in 100 seconds.",
        impact="Keeps me aware of new tech stacks and programming trends in a fraction of the time.",
        tags=["#Coding", "#TechTrends"],
        size="medium",
        metadata={"subscribers": "3.1M"},
    ),
    dict(
        type="podcast",
        title="Huberman Lab",
        creator_name="Dr. Andrew Huberman",
        link="https://www.youtube.com/@hubermanlab",
        description="Science-backed protocols and tools for high performance, focus, and health.",
        impact="His episodes on dopamine scheduling, sleep cycles, and morning sunlight dramatically improved my daily developer focus.",
        tags=["#Biology", "#Focus", "#Habits"],
        size="medium",
        metadata={"episodes": "200+"},
    ),
    dict(
        type="essay",
        title="Choose Boring Technology",
        creator_name="Dan McKinley",
        link="https://mcfunley.com/choose-boring-technology",
        description="The foundational essay arguing why companies should use well-understood tech stacks to save innovation tokens.",
        impact="Saved me from countless unnecessary rewrites and hyped frameworks.",
        tags=["#Architecture", "#Pragmatism"],
        size="small",
        metadata={"readTime": "12 min read"},
    ),
    dict(
        type="x",
        title="Naval Ravikant",
        creator_name="@naval",
        link="https://x.com/naval",
        description="Silicon Valley investor and philosopher sharing insights on wealth, happiness, and leverage.",
        impact="His thoughts on building productized leverage and compounding specific knowledge shaped my entire career path.",
        tags=["#Philosophy", "#Startups", "#Leverage"],
        size="medium",
        metadata={"followers": "2.3M"},
    ),
    dict(
        type="design",
        title="Dieter Rams: Ten Principles",
        creator_name="Braun Design Lead",
        link="https://www.vitsoe.com/gb/about/dieter-rams",
        description="Ten rules detailing why good design is minimalist, honest, aesthetic, and unobtrusive.",
        impact="Good design is as little design as possible. This rule drives every user interface and component API I build.",
        tags=["#UIUX", "#Minimalism", "#DesignSystem"],
        size="medium",
    ),
]


async def seed() -> None:
    async with async_session() as db:
        result = await db.execute(select(User).where(User.google_sub == "seed-demo-user"))
        user = result.scalar_one_or_none()
        if user is None:
            user = User(
                google_sub="seed-demo-user",
                email="demo@blueprint.id",
                email_verified=True,
                avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            )
            db.add(user)
            await db.flush()

        result = await db.execute(select(Profile).where(Profile.user_id == user.id))
        profile = result.scalar_one_or_none()
        if profile is None:
            profile = Profile(
                user_id=user.id,
                handle="technomad23",
                display_name="Alex Rivera",
                bio="Building tools for builders. Shaped by systems engineering, design history, and philosophical essays.",
                location="San Francisco, CA",
                skills="TypeScript • Rust • Distributed Systems",
                avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
                is_verified=True,
                is_public=True,
                follower_count=2400,
                curator_score=99.8,
            )
            db.add(profile)
            await db.flush()

        existing_items = await db.execute(
            select(CurationItem).where(CurationItem.profile_id == profile.id)
        )
        if not existing_items.scalars().first():
            for data in DEMO_ITEMS:
                metadata = data.pop("metadata", {})
                preview = await resolve_link_preview(db, data["link"])
                db.add(
                    CurationItem(
                        profile_id=profile.id,
                        item_metadata=metadata,
                        image_url=preview.image_url,
                        resource_kind=preview.resource_kind,
                        **data,
                    )
                )

        await db.commit()
        print(f"Seeded profile @{profile.handle} ({user.email})")


if __name__ == "__main__":
    asyncio.run(seed())
