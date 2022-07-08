from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewForm, UpdateReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#  CREATE
@review_routes.route('/', methods=['POST'])
@login_required
def create_review():
    """
    Creates a review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            review=form.data['review'],
            user_id=form.data['user_id'],
            product_id=form.data['product_id'],
            created_at=form.data['created_at'],
            updated_at=form.data['updated_at']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401


#  READ
@review_routes.route('')
def reviews():
    """
    Gets all reviews
    """
    reviews = Review.query.all()
    return jsonify([review.to_dict() for review in reviews])

#  UPDATE
@review_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_review(id):
    """
    Updates a review
    """
    form = UpdateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('------AM I HITTING UPDATE REVIEW ROUTE----------')
    if form.validate_on_submit():
        print('------AM I HITTING UPDATE REVIEW ROUTE, VALIDATE ON SUBMIT----------')
        review = Review.query.get(id)
        if review:
            review.review=form.data['review'],
            review.user_id=form.data['user_id']
            review.product_id=form.data['product_id']
            # review.updated_at=form.data['updated_at']
            db.session.commit()
            return review.to_dict()
        else:
            return {'errors': ['Review not found.']}, 404
    return{'errors': validation_errors_to_error_messages(form.errors)}, 401

#  DELETE
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Deletes a review
    """
    review = Review.query.get(id)
    if review:
        db.session.delete(review)
        db.session.commit()
        return jsonify([f'Review {id} successfully deleted'])
    else:
        return {'errors': ['Review not found.']}, 404
