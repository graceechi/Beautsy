from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    fullName = StringField('fullName', validators=[DataRequired(message="This field is required."), Length(max=40, message="First name should be less than 40 characters.")])
    username = StringField('username', validators=[DataRequired(message="This field is required."), Length(max=40, message="First name should be less than 40 characters."), username_exists])
    address = StringField('address', validators=[DataRequired(message="This field is required.")])
    email = StringField('email', validators=[DataRequired(message="This field is required."), Email(message="Please provide a valid email address."), user_exists])
    password = StringField('password', validators=[DataRequired(message="This field is required.")])
