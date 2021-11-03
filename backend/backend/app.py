import os
import sys

from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended.exceptions import WrongTokenError
from flask_restful import Api
from jwt import DecodeError
from marshmallow import ValidationError

from models.users import UsersModel
from auth import is_token_revoked
from mm import mm
from models.db import db
from resources import users, products, orders

database_uri = os.environ.get('DATABASE_URI', None)
app_secret_key = os.environ.get('APP_SECRET_KEY', None)
jwt_secret_key = os.environ.get('JWT_SECRET_KEY', None)

if database_uri is None or app_secret_key is None or jwt_secret_key is None:
    print('no database_url or secret_key')
    sys.exit()

app = Flask(__name__)
CORS(app)

# App
app.config['SECRET_KEY'] = app_secret_key
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['DEBUG'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# JWT
app.config['JWT_SECRET_KEY'] = jwt_secret_key
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

db.init_app(app)
mm.init_app(app)
api = Api(app)
jwt = JWTManager(app)


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(error=err.messages), 400


@app.errorhandler(WrongTokenError)
def handle_token_validation(err):
    return jsonify(error=err.args[0] + '.'), 401


@app.errorhandler(DecodeError)
def handle_token_validation_2(err):
    return jsonify(error=err.args[0] + '.'), 401


@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    response = UsersModel.find_by_uuid__role(identity)
    return {'role': response[0]}


# The blocklist_loader is used to check that the user is logged in (i.e. has a valid token)
# This is opposite of how the blocklist works.
# If the user is found, the user's token is NOT revoked (i.e. is_token_revoked = False)
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    return is_token_revoked(jwt_payload)


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify(error='Token expired.'), 401


@jwt.needs_fresh_token_loader
def needs_fresh_token(jwt_header, jwt_payload):
    return jsonify(error='Fresh token needed.'), 401


@jwt.revoked_token_loader
def revoked_token(jwt_header, jwt_payload):
    return jsonify(error='Revoked token.'), 401


@jwt.invalid_token_loader
def invalid_token():
    return jsonify(error='Invalid token.'), 401


@jwt.unauthorized_loader
def missing_token():
    return jsonify(error='Token required.'), 401


# auth
api.add_resource(users.Login, '/login')
api.add_resource(users.Logout, '/logout')
api.add_resource(users.RefreshToken, '/refresh')

# users
api.add_resource(users.Users, '/users')

# products
api.add_resource(products.Products, '/products')

# orders
api.add_resource(orders.Orders, '/orders')

if __name__ == '__main__':
    app.run(port=5000, debug=False)
