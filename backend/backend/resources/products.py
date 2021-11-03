from flask import request
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_identity
from flask_restful import Resource

import schemas
from models.users import UsersModel
from models.products import ProductsModel


class Products(Resource):

    # get all products
    @classmethod
    # @jwt_required()
    def get(cls):
        products_model_list = ProductsModel.find_all()

        return schemas.Products(many=True).dump(products_model_list), 200

    # create product
    @classmethod
    def put(cls):
        input_json = schemas.InputRegistrationData().load(request.get_json())
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


    # update product
    @classmethod
    # @jwt_required()
    def patch(cls):
        input_json = schemas.InputProductID().load(request.get_json())

        products_model = ProductsModel.find_by_id(input_json['id'])

        products_model.name = input_json['name']
        products_model.image = input_json['image']
        products_model.description = input_json['description']
        products_model.price = input_json['price']

        products_model.save()

        return {'info': 'product updated'}, 200

    @classmethod
    # @jwt_required()
    def delete(cls):

        input_json = schemas.InputProductID().load(request.get_json())
        product_model = ProductsModel.find_by_id(input_json['id'])

        if product_model:
            product_model.delete()

            return {'info': 'product deleted'}, 200

        else:
            return {'err': 'product not found'}, 400
