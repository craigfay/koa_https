#!/bin/bash

# populate templates with real domain/email values
echo -n "domain: "
read domain
echo -n "email: "
read email
declare -a files=(
  "docker-compose.yml"
  "nginx-conf/challenge.conf"
  "after-ssl.conf"
)
echo -n "Replacing files ... "
for file in "${files[@]}"; do
  sed -i "s/%EMAIL%/$email/g" $file
  sed -i "s/%DOMAIN%/$domain/g" $file
done

# build docker container for ssl aquisition 
echo -n "Obtaining SSL certificates ... "
sudo docker-compose build
sudo docker-compose up certbot
