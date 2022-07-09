from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, OrderItem
from app.forms.order_item_form import OrderItemForm

order_item_routes = Blueprint('orderItem', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# @order_item_routes.route('/', methods=["POST"])
# @login_required
# def create_order_item():
#     """
#     Adds a new product item to order_item table
#     """
#     form = OrderItemForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
