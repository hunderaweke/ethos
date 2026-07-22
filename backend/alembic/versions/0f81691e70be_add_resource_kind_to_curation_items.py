"""add resource_kind to curation_items

Revision ID: 0f81691e70be
Revises: 68ffd1e9ad10
Create Date: 2026-07-22 13:20:52.559613

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0f81691e70be'
down_revision: Union[str, Sequence[str], None] = '68ffd1e9ad10'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


resource_kind_enum = sa.Enum('post', 'video', 'channel', 'podcast', 'playlist', name='resource_kind')


def upgrade() -> None:
    """Upgrade schema."""
    resource_kind_enum.create(op.get_bind(), checkfirst=True)
    op.add_column('curation_items', sa.Column('resource_kind', resource_kind_enum, nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('curation_items', 'resource_kind')
    resource_kind_enum.drop(op.get_bind(), checkfirst=True)
