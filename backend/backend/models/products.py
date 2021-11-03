from models.db import db


class ProductsModel(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.INT(), server_default=db.FetchedValue(), primary_key=True)
    name = db.Column(db.VARCHAR(80), nullable=False)
    image = db.Column(db.VARCHAR(250), nullable=False)
    description = db.Column(db.VARCHAR(5000), nullable=False)
    price = db.Column(db.FLOAT(), nullable=False)

    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_by_name(cls, name: str) -> "ProductsModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, id: int) -> "ProductsModel":
        return cls.query.filter_by(id=id).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self) -> None:
        db.session.delete(self)
        db.session.commit()
