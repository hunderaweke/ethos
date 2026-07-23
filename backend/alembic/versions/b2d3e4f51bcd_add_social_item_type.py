"""add social item type

Revision ID: b2d3e4f51bcd
Revises: a1c2e3f40abc
Create Date: 2026-07-23 16:00:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'b2d3e4f51bcd'
down_revision: Union[str, Sequence[str], None] = 'a1c2e3f40abc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Telegram, GitHub, Instagram, TikTok, Threads, Twitch, Bluesky, Mastodon,
    # Reddit and similar social platforms had no dedicated item type and were
    # silently falling into "essay" — ADD VALUE runs outside a transaction
    # block (Postgres requirement).
    with op.get_context().autocommit_block():
        op.execute("ALTER TYPE item_type ADD VALUE IF NOT EXISTS 'social'")


def downgrade() -> None:
    """Downgrade schema."""
    # Postgres can't drop a value from an enum type; downgrade is a no-op.
    # (Removing it would require recreating the type and rewriting the column.)
    pass
