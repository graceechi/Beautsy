from app.models.db import db, environment, SCHEMA
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .products import seed_products, undo_products
from .orders import seed_orders, undo_orders
from .order_items import seed_items, undo_items
from .reviews import seed_reviews, undo_reviews
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
        
    seed_users()
    # Add other seed functions here
    seed_categories()
    seed_products()
    seed_orders()
    seed_items()
    seed_reviews()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_categories()
    undo_products()
    undo_orders()
    undo_items()
    undo_reviews()
