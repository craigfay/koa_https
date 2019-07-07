#!/bin/bash
declare docker_compose="/usr/local/bin/docker-compose"
declare yml_file="/home/scarlet/koa_https/docker-compose.yml"

# start certbot container and override default command
sudo $docker_compose -f $yml_file run certbot renew --dry-run \
# send SIGHUP signal to webserver container to reload nginx config
&& sudo $docker_compose -f $yml_file kill -s SIGHUP webserver