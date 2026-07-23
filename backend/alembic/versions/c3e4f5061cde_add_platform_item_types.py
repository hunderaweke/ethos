"""add platform-specific item types

Revision ID: c3e4f5061cde
Revises: b2d3e4f51bcd
Create Date: 2026-07-23 17:00:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'c3e4f5061cde'
down_revision: Union[str, Sequence[str], None] = 'b2d3e4f51bcd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

NEW_TYPES = (
    "telegram", "instagram", "linkedin", "spotify", "github", "discord",
    "figma", "twitch", "tiktok", "reddit", "goodreads", "medium", "substack",
)


def upgrade() -> None:
    """Upgrade schema."""
    # Each platform on the landing page's "curate from anywhere" marquee now
    # gets its own item type instead of collapsing into the generic "social"
    # or a loosely-fitting content category (spotify/figma/goodreads were
    # previously podcast/design/book). ADD VALUE runs outside a transaction
    # block (Postgres requirement).
    with op.get_context().autocommit_block():
        for item_type in NEW_TYPES:
            op.execute(f"ALTER TYPE item_type ADD VALUE IF NOT EXISTS '{item_type}'")

    # Backfill existing items that were previously mapped to a generic content
    # type but actually come from a platform that now has its own dedicated type.
    op.execute(
        "UPDATE curation_items SET type = 'goodreads' "
        "WHERE type = 'book' AND link ILIKE '%goodreads.com%'"
    )
    op.execute(
        "UPDATE curation_items SET type = 'spotify' "
        "WHERE type = 'podcast' AND link ILIKE '%open.spotify.com%'"
    )
    op.execute(
        "UPDATE curation_items SET type = 'figma' "
        "WHERE type = 'design' AND link ILIKE '%figma.com%'"
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Postgres can't drop values from an enum type; downgrade is a no-op.
    # (Removing them would require recreating the type and rewriting the column.)
    pass
