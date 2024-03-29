"""changes backstory to string

Revision ID: c9accb215f40
Revises: 0a3b848fa586
Create Date: 2024-02-12 14:12:27.346213

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c9accb215f40'
down_revision = '0a3b848fa586'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.alter_column('backstory',
               existing_type=sa.INTEGER(),
               type_=sa.String(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.alter_column('backstory',
               existing_type=sa.String(),
               type_=sa.INTEGER(),
               existing_nullable=True)

    # ### end Alembic commands ###
