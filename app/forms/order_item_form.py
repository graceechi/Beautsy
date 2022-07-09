from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class OrderItemForm(FlaskForm):
    quantity = IntegerField('quantity', validators=[DataRequired()])
    order_id = IntegerField('order_id', validators=[DataRequired()])
    product_id = IntegerField('product_id', validators=[DataRequired()])
