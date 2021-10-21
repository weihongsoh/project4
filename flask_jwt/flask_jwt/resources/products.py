# import secrets

# import argon2
from flask import request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from flask_restful import Resource

# import auth
import schemas
from models.users import UsersModel
from models.products import ProductsModel


# def find_duplicate_email(email):
#     users_model = UsersModel.find_by_email(email)
#
#     if users_model:
#         return True
#     else:
#         return False


# def gen_random_string(n):
#     s = secrets.token_urlsafe(64)
#     return s[:n]


# def hash_password(password):
#     salt = gen_random_string(50)
#
#     password_salt = password + salt
#
#     ph = argon2.PasswordHasher()
#     _hash = ph.hash(password_salt)
#
#     return salt, _hash


class Products(Resource):

    # get all users
    @classmethod
    # @jwt_required()
    def get(cls):
        products_model_list = ProductsModel.find_all()

        return schemas.Products(many=True).dump(products_model_list), 200

    # create user
    @classmethod
    def put(cls):
        print(123)
        input_json = schemas.InputRegistrationData().load(request.get_json())
        # name = input_json['name']
        # email = input_json['email']
        # password = input_json['password']
        # uuid = input_json['uuid']
        name = input_json['name']
        image = input_json['image']
        description = input_json['description']
        price = input_json['price']

        try:
            products_model = ProductsModel(
                name=name,
                image=image,
                description=description,
                price=price,
            )

            products_model.save()

        except Exception as error:
            print(f'Registration error: {error}')
            return {'err': 'product not created.'}, 400

        return {'msg': 'product created.'}, 200

    # select user with email
    @classmethod
    @jwt_required()
    def post(cls):
        input_json = schemas.InputEmail().load(request.get_json())
        users_model = UsersModel.find_by_email(input_json['email'])

        return schemas.Users().dump(users_model), 200

    # update product
    @classmethod
    # @jwt_required()
    def patch(cls):
        # claims = get_jwt()

        # if claims['role'] == 'ADMIN':
        # input_json = schemas.InputProductID().load(request.get_json())
        #     uuid = input_json['uuid']
        # else:
        #     uuid = get_jwt_identity()
        input_json = schemas.InputProductID().load(request.get_json())
        # product_model = ProductsModel.find_by_id(input_json['id'])

        products_model = ProductsModel.find_by_id(input_json['id'])
        print(products_model)
        # if users_model:
        #     input_json = schemas.InputEmailName().load(request.get_json())

            # if input_json.get('email') and len(input_json['email']) > 0 and input_json['email'] != users_model.email:
            #     if find_duplicate_email(input_json['email']):
            #         return {'err': 'duplicate email'}

        products_model.name = input_json['name']
        products_model.image = input_json['image']
        products_model.description = input_json['description']
        products_model.price = input_json['price']

            # if input_json.get('name') and len(input_json['name']) > 0 and input_json['name'] != users_model.name:
            #     users_model.name = input_json['name']

        products_model.save()

        return {'info': 'product updated'}, 200

        # else:
        #     return {'err': 'product not found'}, 400

    @classmethod
    # @jwt_required()
    def delete(cls):
        # claims = get_jwt()

        # if claims['role'] == '1':
        input_json = schemas.InputProductID().load(request.get_json())
        product_model = ProductsModel.find_by_id(input_json['id'])

        if product_model:
            product_model.delete()

            return {'info': 'product deleted'}, 200

        else:
            return {'err': 'product not found'}, 400

        # else:
        #     return {'err': 'not authorised'}, 401


# class Login(Resource):
#
#     @classmethod
#     def post(cls):
#         input_json = schemas.InputEmailPassword().load(request.get_json())
#         email = input_json['email']
#         password = input_json['password']
#
#         users_model = UsersModel.find_by_email(email)
#
#         if not users_model:
#             return {'err': 'user not found'}, 401
#
#         is_authorised = auth.authenticate(password, users_model.salt, users_model.hash)
#
#         if is_authorised:
#             access_token, refresh_token = auth.create_tokens(users_model.uuid)
#
#             if access_token and refresh_token:
#                 auth.insert_tokens(access_token, refresh_token, users_model.uuid)
#
#                 return {
#                            'access': access_token,
#                            'refresh': refresh_token,
#                        }, 200
#
#         else:
#             return {'err': 'unauthorised user.'}, 401


# class Logout(Resource):
#
#     @classmethod
#     @jwt_required()
#     def get(cls):
#         auth.delete_tokens()
#         return {'info': 'user logged out.'}, 200


# class RefreshToken(Resource):
#
#     @classmethod
#     @jwt_required(refresh=True)
#     def get(cls):
#         new_token = auth.refresh_access_token()
#         return {'access': new_token}, 200


# class ValidateToken(Resource):
#
#     @classmethod
#     @jwt_required()
#     def get(cls):
#         return {'info': 'token valid'}
