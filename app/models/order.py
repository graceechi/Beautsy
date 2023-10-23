# add environment and add_prefix-for_prod to existing import statement
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__ = "orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    order_number = db.Column(db.String, nullable=False)
    total = db.Column(db.Float, nullable=False)
    full_name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Many-to-One relationship with Users
    users = db.relationship('User', back_populates='orders')

    # One-to-Many relationship with OrderItem
    order_items = db.relationship('OrderItem', back_populates='orders', cascade='all, delete')

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
            'order_items': {order_item.id: order_item.to_dict() for order_item in self.order_items}
        }
