from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from app.forms.address_form import AddressForm

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
# @login_required
def users():
    """
    Gets all users
    """
    users = User.query.all()
    # print('---------I am querying ALL the USERS--------', users)
    return jsonify([user.to_dict() for user in users])


# Users can get access to their portfolio and info
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Gets a single user
    """
    user = User.query.get(id)
    # user = User.query.filter(User.id == id).first()
    return jsonify(user.to_dict());


# Updates user's shipping info (name and address)
@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
# passing in User.id
def update_address(id):
    """
    Updates a user's shipping info
    """
    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        print('---------------AM I HITTING UPDATE SHIPPING ROUTE')
        user = User.query.get(id)
        if user:
            user.full_name = form.data['full_name']
            user.address = form.data['address']

            db.session.commit()
            # return user.to_dict()
            return jsonify({"full_name": user.full_name, "address": user.address});
        else:
            return {'errors': ['User does not exist']}, 404
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401
