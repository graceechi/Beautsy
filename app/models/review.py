# add environment and add_prefix-for_prod to existing import statement
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now)

    # Many-to-One relationship with Product
    products = db.relationship("Product", back_populates="reviews")

    # Many-to-One relationship with User
    users = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "review": self.review,
            "product_id": self.product_id,
            "user_id": self.user_id,
            "product_id": self.product_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    # self.User
