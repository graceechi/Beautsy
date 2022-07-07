from app.models import db, OrderItem

def seed_items():
    item1 = OrderItem(
        quantity=3, order_id=1, product_id=1
    )
    item2 = OrderItem(
        quantity=2, order_id=1, product_id=3
    )

    db.session.add(item1)
    db.session.add(item2)

    db.session.commit()

def undo_items():
    db.session.execute('TRUNCATE order_items RESTART IDENTITY CASCADE;')
    db.session.commit()
