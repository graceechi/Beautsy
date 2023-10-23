# add environment and add_prefix-for_prod to existing import statement
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# favorites = db.Table(

#     "favorites",
#     db.Model.metadata,
#     db.Column('products', db.Integer, db.ForeignKey('products.id'), primary_key=True, nullable=False),
#     db.Column('users', db.Integer, db.ForeignKey('users.id'), primary_key=True, nullable=False)
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    address = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # One-to-Many relationship with Reviews
    reviews = db.relationship('Review', back_populates='users')

    # One-to-Many relationship with Orders
    orders = db.relationship('Order', back_populates='users')

    # Many-to-Many relationship with Orders
    # user_to_faves = db.relationship('Product', secondary=favorites, back_populates='faves_to_user', cascade='all, delete')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'username': self.username,
            'address': self.address,
            'email': self.email,
            # 'user_to_faves': [user_to_faves.to_dict() for user_to_faves in self.user_to_faves]
        }
