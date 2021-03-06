from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
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
