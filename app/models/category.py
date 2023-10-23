# add environment and add_prefix-for_prod to existing import statement
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Category(db.Model):
    __tablename__ = "categories"
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    # One-to-Many relationship with Product
    products = db.relationship("Product", back_populates="categories")
