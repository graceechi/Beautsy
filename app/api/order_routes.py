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
    # print('-----------HELLLOOOOOO DID I HIT CREATE AN ORDER BACKEND ROUTE?????---------------')
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
        # if order:
        #     print("new order")

        db.session.add(order)
        db.session.commit()


        #  loop thru arr of objects for order_items
            #  order items model instance
            #  add
        #  commit

        return jsonify([order.to_dict()]);
        # order_number = form.data['order_number'];
        # all orders with same order number
        # all_orders = Order.query.filter(
            # Order.order_number == order_number).all()

        # if all_orders:
            # return jsonify([order.to_dict() for order in all_orders]);
            # return {order_number: [order.to_dict() for order in all_orders]}
        # else:
        #     return {'message': 'no orders created'}
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401



# ------------DELETE AN ORDER----------------
@order_routes.route('/<int:orderId>', methods=['DELETE'])
@login_required
def delete_order(orderId):
    """
    Deletes all purchases associated to an order id
    """
    print('-------DID I HIT DELEEETEEE ORDERS BACKEND ROUTE')
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
        print('---------------AM I HITTING UPDATE SHIPPING ROUTE')
        order = Order.query.get(id)
        # if order:
        order.full_name = form.data['full_name']
        order.address = form.data['address']

        db.session.commit()
        return order.to_dict()
        # return jsonify({"full_name": order.full_name, "address": order.address});
        # else:
        #     return {'errors': ['Order does not exist']}, 404
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401
