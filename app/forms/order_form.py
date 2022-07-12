from flask_wtf import FlaskForm
from sqlalchemy import Float
from wtforms import IntegerField, StringField, DateTimeField, FloatField
from wtforms.validators import DataRequired

class OrderForm(FlaskForm):
    order_number = StringField('order_number', validators=[DataRequired()])
    total = FloatField('total', validators=[DataRequired()])
    full_name = StringField('full_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    # created_at = DateTimeField('created_at')
