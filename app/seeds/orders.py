from app.models import db, Order


def seed_orders():
    order1 = Order(order_number="ORDER_340293844588712", total=176.97, full_name="Demo User", address="100 West Coast Hwy Suite 202, Newport Beach, CA 92663", user_id=1)

    db.session.add(order1)

    db.session.commit()


def undo_orders():
    db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
    db.session.commit()
