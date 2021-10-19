FROM python:3.9.1-alpine3.12

EXPOSE 10010

ENV TZ=Asia/Singapore

COPY requirements.txt /

RUN apk add libffi-dev postgresql-dev gcc python3-dev musl-dev tzdata \
 && pip install -r requirements.txt \
 && rm requirements.txt \
 && set -x ; addgroup -g 82 -S www-data ; adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1 \
 && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
 && apk del tzdata gcc

COPY flask_jwt /flask_jwt

WORKDIR flask_jwt

CMD ["uwsgi", "--ini", "uwsgi.ini"]
