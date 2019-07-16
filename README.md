# About
This repo aims to be a demonstration of production-ready node containerization with Nginx
Inspired by [DigitalOcean Literature](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)

### Requirements
* Assumes Ubuntu 18.04 and Docker 18.09.6
* Have a registered domain name that points to the working machine

### Development Instructions
* From this directory: `docker-compose build && docker-compose up`

### Deployment Instructions
* Create non-root sudo user
  * `adduser username`
  * `usermod -aG sudo username`
* Switch user
  * `su - username`
* Clone this repository
  * `git clone https://github.com/craigfay/ssl-container`
  * `cd koa_https`
* Build container and enable ssl
  * `sudo docker-compose build`
  * `./enable-ssl.sh`
* Start server
  * `sudo docker-compose up`
