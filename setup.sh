#!/bin/bash

echo -n "domain: "
read domain
declare -a files=(
  "nginx-prod/nginx.conf"
)
echo "Replacing files ..."
for file in "${files[@]}"; do
  sed -i "s/%DOMAIN%/$domain/g" $file
done

echo "Obtaining SSL certificates ..."
sudo docker-compose build || return 1
sudo docker-compose -f docker-compose.yml -f docker-compose.prod.yml up certbot || return 1
sudo docker-compose down || return 1

echo "Generating Diffie-Hellman key ..."
sudo openssl dhparam -out ./dhparam/dhparam-2048.pem 2048 || return 1

echo "Setting up a cron to renew ssl ..."
declare renew_ssl="/home/scarlet/koa_https/ssl_renew.sh"
declare ssl_log="/home/scarlet/koa_https/log/ssl.log"
# cron runs every sunday at midnight
declare new_line="0 0 * * 0 $renew_ssl >> $ssl_log" 2>&1
sudo crontab -l > tmp_cron
echo "$new_line" >> tmp_cron 
sudo crontab tmp_cron
rm tmp_cron 

echo "Done!"