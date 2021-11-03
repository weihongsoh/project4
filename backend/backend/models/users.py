from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP

from models.db import db


class UsersModel(db.Model):
    __tablename__ = 'users'

    uuid = db.Column(UUID(as_uuid=True), server_default=db.FetchedValue(), primary_key=True)
    email = db.Column(db.VARCHAR(50), nullable=False)
    name = db.Column(db.VARCHAR(50), nullable=False)
    role = db.Column(db.VARCHAR(5), nullable=False)
    salt = db.Column(db.VARCHAR(100), nullable=False)
    hash = db.Column(db.VARCHAR(100), nullable=False)
    created_at = db.Column(TIMESTAMP, server_default=db.FetchedValue(), nullable=False)

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
