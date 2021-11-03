from models.db import db

from flask import request
from flask_restful import Resource

import schemas
from models.orders import OrdersModel


class Orders(Resource):

    # get all orders
    @classmethod
    # @jwt_required()
    def get(cls):
        orders_model_list = OrdersModel.find_all()

        return schemas.Orders(many=True).dump(orders_model_list), 200

    # create order
    @classmethod
    def put(cls):
        try:
            array_of_orders = schemas.Orders(many=True).load(request.get_json(), session=db.session)

            # saving each order individually
            for order in array_of_orders:
                order.save()

        except Exception as error:
            print(f'Registration error: {error}')
            return {'err': 'order not created.'}, 400

        return {'msg': 'order created.'}, 200
