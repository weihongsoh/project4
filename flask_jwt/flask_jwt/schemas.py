from marshmallow import EXCLUDE, fields, Schema, validate

from mm import mm
from models.users import UsersModel
from models.products import ProductsModel


class Users(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = UsersModel
        dump_only = ('uuid',)
        load_only = ('salt', 'hash')
        include_fk = True
        unknown = EXCLUDE
        load_instance = True


class Products(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = ProductsModel
        # dump_only = ('uuid',)
        # load_only = ('salt', 'hash')
        # include_fk = True
        unknown = EXCLUDE
        # load_instance = True


class InputRegistrationData(Schema):
    # name = fields.Str(required=True, validate=validate.Length(min=3, max=500))
    # email = fields.Str(required=True, validate=validate.Length(max=50))
    # password = fields.Str(required=True, validate=validate.Length(min=15, max=50))
    # uuid = fields.Str(required=True, validate=validate.Length(min=3, max=500))
    name = fields.Str(required=True, validate=validate.Length(min=3, max=500))
    price = fields.Int(required=True)
    quantity = fields.Int(required=True)
    subtotal = fields.Int(required=True)
    total = fields.Int(required=True)






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
