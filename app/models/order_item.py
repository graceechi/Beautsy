from .db import db

class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)

    # Many-to-One relationship with Orders
    orders = db.relationship('Order', back_populates='order_items')

    # Many-to-One relationship with Products
    products = db.relationship('Product', back_populates='order_items')
