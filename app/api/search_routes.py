from flask import Blueprint
from app.models import Product

search_routes = Blueprint('search', __name__)

@search_routes.route('/', methods=['GET'])
def get_products():
    products_list = []
    products = Product.query.all()

    for i in range(0, len(products)):
        products_list.append(
            {"productId": products[i].id, "product": products[i].name}
        )

    return {"product_names": products_list}
