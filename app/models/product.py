from .db import db
# from .user import favorites

#  join table between Product and Orders
# order_items = db.Table(

#     "order_items",
#     db.Model.metadata,
#     db.Column('products', db.Integer, db.ForeignKey('products.id'), primary_key=True, nullable=False),
#     db.Column('orders', db.Integer, db.ForeignKey('orders.id'), primary_key=True, nullable=False)
# )

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

    # One-to-Many relationship with Reviews
    reviews = db.relationship('Review', back_populates='products')

    # One-to-Many relationship with OrderItem
    order_items = db.relationship('OrderItem', back_populates='products')

    # Many-to-One relationship with Categories
    categories = db.relationship('Category', back_populates='products')

    # Many-to-Many relationship with Orders
    # products_to_order = db.relationship('Order', secondary=order_items, back_populates='order_to_products', cascade='all, delete')

    # Many-to-Many relationship with Users
    # faves_to_user = db.relationship('Favorite', secondary=favorites, back_populates='user_to_faves', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'description': self.description,
            'price': self.price,
            'categoryId': self.category_id,
            'reviews': {review.id: review.to_dict() for review in self.reviews}
            # 'faves_to_user': [faves_to_user.to_dict() for faves_to_user in self.faves_to_user],
            # 'products_to_order': [products_to_order.to_dict() for products_to_order in self.products_to_order]
        }
