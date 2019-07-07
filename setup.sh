#!/bin/bash

echo -n "domain: "
read domain
echo -n "email: "
read email
declare -a files=(
  "docker-compose.yml"
  "nginx-conf/challenge.conf"
  "after-ssl.conf"
)
echo "Replacing files ..."
for file in "${files[@]}"; do
  sed -i "s/%EMAIL%/$email/g" $file
  sed -i "s/%DOMAIN%/$domain/g" $file
done

echo "Obtaining SSL certificates ..."
sudo docker-compose build || return 1
sudo docker-compose up certbot || return 1
sudo docker-compose down || return 1

echo "Generating Diffie-Hellman key ..."
sudo openssl dhparam -out ./dhparam/dhparam-2048.pem 2048 || return 1

echo "Adding new nginx config ..."
mv after-ssl.conf nginx-conf/nginx.conf || return 1

echo "Setting up a cron to renew ssl ..."
declare renew_ssl="/home/scarlet/koa_https/ssl_renew.sh"
declare ssl_log="/var/log/ssl.log"
declare new_line="*/1 * * * * $renew_ssl >> $ssl_log"
sudo crontab -l > tmp_cron
echo "$new_line" >> tmp_cron 
sudo crontab tmp_cron
rm tmp_cron 

echo "Done! use \"sudo docker-compose up -d webserver\" to start the server."