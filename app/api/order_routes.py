import json
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Order, Product
from app.forms.order_form import OrderForm

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
    orders = Order.query.get(userId);
    print('---------this is all orders of session user--------', orders)

    return jsonify([order.to_dict() for order in orders]);



# -------CREATE AN ORDER------------
@order_routes.route('/', methods=["POST"])
@login_required
def create_order():
    """
    Creates an order
    """
    print('-----------HELLLOOOOOO DID I HIT CREATE AN ORDER BACKEND ROUTE?????---------------')
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('-----------DID I HIT CREATE AN ORDER BACKEND ROUTE?????---------------')

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
@order_routes.route('/<orderId>', methods=['DELETE'])
@login_required
def delete_order(orderId):
    """
    Deletes all orders associated to an order_number
    """
    orders = Order.query.filter(Order.id == orderId).all()
    if orders:
        for order in orders:
            db.session.delete(order)
        db.session.commit()
        return jsonify([f'All purchases associated to Order ID #{orderId} are successfully deleted.'])
    else:
        return {'errors': ['Order ID #{orderId} not found.']}, 404
