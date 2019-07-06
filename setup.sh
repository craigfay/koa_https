#!/bin/bash
echo -n "domain: "
read domain
echo -n "email: "
read email
declare -a files=(
  "docker-compose.yml"
  "nginx-conf/nginx.conf"
)
for file in "${files[@]}"; do
  sed -i "s/%EMAIL%/$email/g" $file
  sed -i "s/%DOMAIN%/$domain/g" $file
done
