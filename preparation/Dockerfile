FROM ubuntu:20.04

WORKDIR /database

RUN apt-get update && \
    apt-get install gettext-base git -y \
    envsubst < initialize-template.sql > initialize.sql && \
    apt-get clean