from .db import db
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    order_number = db.Column(db.String, nullable=False)
    total = db.Column(db.Float, nullable=False)
    full_name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Many-to-One relationship with Users
    users = db.relationship('User', back_populates='orders')

    # One-to-Many relationship with OrderItem
    item = db.relationship('OrderItem', back_populates='orders')

    # Many-to-Many relationship with Products
    # order_to_products = db.relationship('Product', secondary=order_items, back_populates='products_to_order', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'total': self.total,
            'full_name': self.full_name,
            'address': self.address,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'item': {item.id: item.to_dict() for item in self.item}
            # 'order_to_products': [order_to_products.to_dict() for order_to_products in self.order_to_products]
        }
