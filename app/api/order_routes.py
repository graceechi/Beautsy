import json
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Order, Product, OrderItem
from app.forms.order_form import OrderForm
from app.forms.address_form import AddressForm

order_routes = Blueprint('orders', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# ---------GET/VIEW ALL ORDERS------------------
@order_routes.route('/<int:userId>')
@login_required
def load_orders(userId):
    """
    Gets all orders of a user
    """
    # print('-------DID I HIT LOAD ORDERS BACKEND ROUTE')
    orders = Order.query.filter(Order.user_id == userId).all();
    order_with_items = [(order, OrderItem.query.filter(order.id == OrderItem.order_id).all()) for order in orders]
    print('----------------THISSS IS ORDERRR WITH ITEMMM from backend', order_with_items)

    # print('--------------this is all orders of session user--------', [order.to_dict() for order in orders])


    return jsonify([order.to_dict() for order in orders]);



# -------CREATE AN ORDER------------
@order_routes.route('/', methods=["POST"])
@login_required
def create_order():
    """
    Creates an order
    """
    print('----------------------------------'*50, request.json)
    # {'order_number': 'ORDER_104744811125121', 'total': 49.99, 'full_name': 'Demoooo', 'address': 'HOUSTONNN', 'user_id': 1, 'cart': {'31': {'quantity': 1}}}
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print('-----------DID I HIT CREATE AN ORDER BACKEND ROUTE?????---------------')

        order = Order(
            order_number=form.data['order_number'],
            total=form.data['total'],
            full_name=form.data['full_name'],
            address=form.data['address'],
            user_id=form.data['user_id'],
            # created_at=form.data['created_at']
        )

        db.session.add(order)
        db.session.commit()

        cart = request.json['cart'];
        for key in cart:
            order_item = OrderItem(
                quantity = cart[key]['quantity'],
                order_id = order.id,
                product_id = key
            )
            db.session.add(order_item)
        db.session.commit()



        return order.to_dict();

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401



# ------------DELETE AN ORDER----------------
@order_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_order(orderId):
    """
    Deletes all purchases associated to an order id
    """
    # print('-------DID I HIT DELEEETEEE ORDERS BACKEND ROUTE')
    order = Order.query.get(orderId);

    if order:
        db.session.delete(order)
        db.session.commit()
        return jsonify([f'All purchases associated to Order ID #{orderId} are successfully deleted.'])
    else:
        return {'errors': ['Order ID #{orderId} not found.']}, 404

# Updates user's shipping info (name and address)
@order_routes.route('/<int:id>', methods=["PUT"])
@login_required
# passing in Order.id aka payload.id
def update_address(id):
    """
    Updates a user's shipping info
    """
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        # print('---------------AM I HITTING UPDATE SHIPPING ROUTE')
        order = Order.query.get(id)
        # if order:
        order.full_name = form.data['full_name']
        order.address = form.data['address']

        db.session.commit()
        return order.to_dict()

    return{'errors': validation_errors_to_error_messages(form.errors)}, 401
