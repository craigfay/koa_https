# About
This repo aims to be a demonstration of production-ready node containerization with Nginx
Inspired by [DigitalOcean Literature](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)

One advantage of pairing Node with Nginx is that Nginx is much more performant in serving static files.
This project uses `src/public` as the path for static files.

### Requirements
* Assumes Ubuntu 18.04 and Docker 18.09.6
* Have a registered domain name pointing to the working machine

### Development Instructions
* From this directory: `docker-compose up`
* Edit files in `./src`

### Deployment Instructions
* Create non-root sudo user
  * `adduser username`
  * `usermod -aG sudo username`
* Switch user
  * `su - username`
* Clone this repository
  * `git clone https://github.com/craigfay/ssl-container`
  * `cd koa_https`
* Enable ssl
  * `./enable-ssl.sh`
* Start server
  * `sudo docker-compose up`
