from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, DateTimeField, TextAreaField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    review = TextAreaField('review', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
    created_at = DateTimeField('created_at')
    updated_at = DateTimeField('updated_at')
