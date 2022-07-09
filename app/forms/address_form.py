from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length


class AddressForm(FlaskForm):
    full_name = StringField(
        'full_name', validators=[DataRequired(), Length(min=1, max=30)])
    address = StringField(
        'address', validators=[DataRequired(), Length(min=1, max=100)])
