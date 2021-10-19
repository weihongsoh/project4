import argon2

from models.auth import AuthModel
from models.db import db

import datetime
from flask_jwt_extended import (decode_token,
                                get_jwt,
                                get_jwt_identity,
                                create_access_token,
                                create_refresh_token,
                                jwt_required)


def epoch_utc_to_datetime(epoch_utc):
    return datetime.datetime.fromtimestamp(epoch_utc)


def insert_token(encoded_token, user_uuid, access_token_id=None):
    decoded_token = decode_token(encoded_token)

    jti = decoded_token['jti']
    expires = epoch_utc_to_datetime(decoded_token['exp'])

    db_token = AuthModel(
        jti=jti,
        user_uuid=user_uuid,
        expires=expires,
        parent_access_token_id=access_token_id
    )

    db.session.add(db_token)
    db.session.commit()

    return db_token.id


def insert_tokens(access_token, refresh_token, email):
    access_token_id = insert_token(access_token, email)  # insert access token
    insert_token(refresh_token, email, access_token_id)  # insert refresh token


# this function uses the @token_in_blocklist_loader decorator, but in reverse.
# the database stores uses who are logged in. So if found, the user is logged in.
def is_token_revoked(jwt_payload):
    # jti = decoded_token['jti']
    jti = jwt_payload["jti"]
    # check if the jti is in the auth table - if found, return False.
    return db.session.query(AuthModel.id).filter_by(jti=jti).scalar() is None


def create_tokens(uuid):
    access_token = create_access_token(identity=uuid, fresh=True)
    refresh_token = create_refresh_token(identity=uuid)

    return access_token, refresh_token


def refresh_access_token():
    jti = get_jwt()['jti']
    user_uuid = get_jwt_identity()

    new_access_token = create_access_token(identity=user_uuid, fresh=False)
    new_access_token_id = insert_token(new_access_token, user_uuid)

    # get the refresh token
    refresh_token = AuthModel.query.filter_by(jti=jti, user_uuid=user_uuid).first()

    # get the parent id from the old parent id from the refresh token
    old_access_token_id = refresh_token.parent_access_token_id

    # change the parent id of the refresh token to the new access token
    refresh_token.parent_access_token_id = new_access_token_id

    db.session.commit()

    # delete the old access token
    old_auth_model = AuthModel.find_by_id(old_access_token_id)
    old_auth_model.delete()

    return new_access_token


def delete_tokens():
    jti = get_jwt()['jti']

    access_token = AuthModel.find_by_jti(jti)

    if access_token:
        refresh_token = AuthModel.find_by_parent_access_token_id(access_token.id)

        if refresh_access_token:
            refresh_token.delete()

        access_token.delete()


def authenticate(password, salt, _hash):
    password_salt = password + salt

    # ph = argon2.PasswordHasher(memory_cost=65536)
    ph = argon2.PasswordHasher()

    try:
        ph.verify(_hash, password_salt)

    except argon2.exceptions.VerifyMismatchError:
        return False

    return True


