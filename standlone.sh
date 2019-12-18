sudo docker run \
    -it \
    --rm \
    -v $(pwd)/volumes/certs:/certs \
    -p 80:80 \
    certbot/certbot \
    certonly --staging \
    --cert-name site \
    --standalone \
    --non-interactive \
    -m $EMAIL \
    -d $DOMAIN

