#!/bin/sh

UID=$(id -u) GID=$(id -g) docker-compose run --rm --service-ports app