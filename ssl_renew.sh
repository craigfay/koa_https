#!/bin/bash
# intended to be triggered via cron
declare docker_compose="/usr/local/bin/docker-compose"
declare dev_yml_file="/home/scarlet/koa_https/docker-compose.yml"
declare prod_yml_file="/home/scarlet/koa_https/docker-compose.prod.yml"

# start certbot container and override default command
# send SIGHUP signal to webserver container to reload nginx config
sudo $docker_compose -f $yml_file run certbot renew --dry-run
sudo $docker_compose -f $yml_file kill -s SIGHUP webserver