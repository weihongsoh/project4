from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP

from models.db import db


class OrdersModel(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.INT(), server_default=db.FetchedValue(), primary_key=True)
    user_uuid = db.Column(UUID(as_uuid=True), db.ForeignKey('users.uuid'), nullable=False)
    name = db.Column(db.VARCHAR(80), nullable=False)
    price = db.Column(db.FLOAT(), nullable=False)
    quantity = db.Column(db.INTEGER(), nullable=False)
    subtotal = db.Column(db.FLOAT(), nullable=False)
    # total = db.Column(db.FLOAT(), nullable=False)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_email(cls, email: str) -> "UsersModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_uuid(cls, uuid: str) -> "UsersModel":
        return cls.query.filter_by(uuid=uuid).first()

    @classmethod
    def find_by_uuid__role(cls, uuid: str) -> tuple:
        return cls.query.with_entities(cls.role).filter_by(uuid=uuid).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
