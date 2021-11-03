from sqlalchemy.dialects.postgresql import UUID

from models.db import db


class OrdersModel(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.INT(), server_default=db.FetchedValue(), primary_key=True)
    # user_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('users.uuid'), nullable=False)
    name = db.Column(db.VARCHAR(80), nullable=False)
    price = db.Column(db.FLOAT(), nullable=False)
    quantity = db.Column(db.INTEGER(), nullable=False)
    subtotal = db.Column(db.FLOAT(), nullable=False)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    def save(self):
        db.session.add(self)
        db.session.commit()
