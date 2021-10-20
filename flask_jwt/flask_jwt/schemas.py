from marshmallow import EXCLUDE, fields, Schema, validate


from mm import mm
from models.users import UsersModel
from models.products import ProductsModel
from models.orders import OrdersModel


# users schema
class Users(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = UsersModel
        dump_only = ('uuid',)
        load_only = ('salt', 'hash')
        include_fk = True
        unknown = EXCLUDE
        load_instance = True


class InputRegistrationData(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=3, max=50))
    email = fields.Str(required=True, validate=validate.Length(max=50))
    password = fields.Str(required=True, validate=validate.Length(min=15, max=50))

    class Meta:
        unknown = EXCLUDE


class InputUUID(Schema):
    uuid = fields.UUID(required=True)

    class Meta:
        unknown = EXCLUDE


class InputEmail(Schema):
    email = fields.Str(required=True, validate=validate.Length(max=50))

    class Meta:
        unknown = EXCLUDE


class InputEmailName(Schema):
    email = fields.Str(validate=validate.Length(max=50))
    name = fields.Str(validate=validate.Length(min=3, max=50))

    class Meta:
        unknown = EXCLUDE


class InputEmailPassword(Schema):
    email = fields.Str(required=True, validate=validate.Length(max=50))
    password = fields.Str(required=True, validate=validate.Length(min=15, max=50))

    class Meta:
        unknown = EXCLUDE


# orders schema
class Orders(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = OrdersModel
        include_fk = True
        unknown = EXCLUDE
        load_instance = True
        dump_only = (id, )


class InputOrderData(Schema):
    # user_uuid = fields.UUID(required=True)
    name = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    price = fields.Float(required=True, validate=validate.Range(min=0, max=9999))
    quantity = fields.Int(required=True, validate=validate.Range(min=0, max=10))
    subtotal = fields.Float(required=True, validate=validate.Range(min=0, max=9999))

    class Meta:
        unknown = EXCLUDE


# products schema
class Products(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = ProductsModel
        include_fk = True
        unknown = EXCLUDE
        load_instance = True


class InputProductData(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    image = fields.Int(required=True, validate=validate.Length(min=3, max=250))
    description = fields.Int(required=True, validate=validate.Length(min=0, max=5000))
    price = fields.Float(required=True, validate=validate.Range(min=0, max=9999))

    class Meta:
        unknown = EXCLUDE
