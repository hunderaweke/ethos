"""add account and newsletter resource kinds

Revision ID: a1c2e3f40abc
Revises: 0f81691e70be
Create Date: 2026-07-22 14:10:00.000000

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = 'a1c2e3f40abc'
down_revision: Union[str, Sequence[str], None] = '0f81691e70be'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # X profiles are accounts (not YouTube-style channels) and Substack
    # publications are newsletters — two shapes the original enum lacked.
    # ADD VALUE runs outside a transaction block (Postgres requirement).
    with op.get_context().autocommit_block():
        op.execute("ALTER TYPE resource_kind ADD VALUE IF NOT EXISTS 'account'")
        op.execute("ALTER TYPE resource_kind ADD VALUE IF NOT EXISTS 'newsletter'")


def downgrade() -> None:
    """Downgrade schema."""
    # Postgres can't drop a value from an enum type; downgrade is a no-op.
    # (Removing it would require recreating the type and rewriting the column.)
    pass
