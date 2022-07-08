from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@product_routes.route('/')
# @login_required
def all_products():
    """
    Gets all products
    """
    products = Product.query.all()
    print('--I am querying all the products--', products)
    return jsonify([product.to_dict() for product in products])
    # return {"all_products": [product.to_dict() for product in all_products]}


@product_routes.route('/<int:id>')
# @login_required
def one_product(id):
    """
    Gets a single product
    """
    product = Product.query.get(id)
    return product.to_dict()
