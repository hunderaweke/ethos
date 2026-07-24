"""add curation_items sort_order

Revision ID: d4e5f6072def
Revises: c3e4f5061cde
Create Date: 2026-07-24 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd4e5f6072def'
down_revision: Union[str, Sequence[str], None] = 'c3e4f5061cde'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column(
        'curation_items', sa.Column('sort_order', sa.Integer(), nullable=False, server_default='0')
    )
    # Give existing shelves a sane initial manual order (creation order) instead
    # of leaving every row at 0.
    op.execute(
        """
        WITH numbered AS (
            SELECT id, ROW_NUMBER() OVER (PARTITION BY profile_id ORDER BY created_at) - 1 AS rn
            FROM curation_items
        )
        UPDATE curation_items
        SET sort_order = numbered.rn
        FROM numbered
        WHERE curation_items.id = numbered.id
        """
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('curation_items', 'sort_order')
