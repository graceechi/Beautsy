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


#  READ
@order_item_routes.route('/<int:id>')
# passing in order_item id
def get_order_item(id):
    """
    Gets an order item
    """
    order_item = OrderItem.query.get(id);
    return jsonify([order_item.to_dict()]);


#  { order_id: [ {1: 2}, {2: 1}] }

#  custom helper validation function


# ADD ORDER_ITEM
@order_item_routes.route('/', methods=["POST"])
@login_required
def create_order_item():
    """
    Adds a new product item to order_item table
    """
    form = OrderItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # key into payload, and then loop thru array and check key (prodId) and values (qty)

    # for (let item in items) {
    #     validationHelper(item);
    # }

    # if form:
        # if current_user.id == int(form.data['author_id']):
        # prevCart = OrderItem.query.filter(
        #     OrderItem.order_id == form.data['order_id'], OrderItem.product_id == form.data['product_id']).all()
        # if prevCart:
        #     return

    #  per item, goes inside looop
    cart = OrderItem(
        quantity=form.data['quantity'],
        order_id=int(form.data['order_id']),
        product_id=int(form.data['product_id'])
    )
    db.session.add(cart)
    db.session.commit()
    return cart.to_dict()
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE ORDER_ITEM QUANTITY
@order_item_routes.route('/<int:order_id>/<int:product_id>', methods=["PUT"])
@login_required
def update_cart(order_id, product_id):
    """
    Updates quantity of an item in cart
    """
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        payload = request.get_json()
        cart = OrderItem.query.filter(
            OrderItem.order_id == order_id, OrderItem.product_id == product_id).one()
        if cart:
            cart.quantity = payload["quantity"]
            db.session.commit()
            return cart.to_dict()
        else:
            return {'errors': ['cart item {product_id} not found.']}, 404
    return {'errors': "not valid content type"}, 401


# REMOVE ORDER_ITEM
@order_item_routes.route('/<int:order_id>/<int:product_id>', methods=['DELETE'])
@login_required
def delete_cart_item(order_id, product_id):
    """
    Deletes an item from cart
    """
    cart = OrderItem.query.filter(OrderItem.order_id==order_id, OrderItem.product_id==product_id).one()
    if cart:
        db.session.delete(cart)
        db.session.commit()
        return {"message": f'cart item {product_id} successfully deleted'}
    else:
        return {'errors': ['cart item {product_id} not found.']}, 404


#  CLEARS ALL ORDER_ITEMS IN CART/LOCAL STORAGE ???
@order_item_routes.route('/<int:order_id>/clear', methods=['DELETE'])
@login_required
def clear_cart(order_id):
    """
    Clears all cart items of a buyer
    """
    carts = OrderItem.query.filter(OrderItem.order_id == order_id).all()
    if carts:
        for cart in carts:
            db.session.delete(cart)
        db.session.commit()
        return {"message": f'cart items of associated to Order ID #{order_id} successfully deleted'}
    else:
        return {'errors': ['no cart item of Order ID #{order_id} found.']}, 404
