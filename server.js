'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

const koa = require('koa');
const server = koa();

const acmeRouter = require('./acme-router.js');
server.use(acmeRouter.routes())
server.use(acmeRouter.allowedMethods());

const {
  DOMAIN,
  HTTP_PORT,
  HTTPS_PORT,
} = process.env

const SSL_KEY = fs.readFileSync('./ssl/privkey.pem', 'utf8').toString();
const SSL_KEY = fs.readFileSync('./ssl/fullchain.pem', 'utf8').toString();

const serverCallback = server.callback();

try {
  const httpServer = http.createServer(serverCallback);
  httpServer.listen(HTTP_PORT, function(err) {
    if (!!err) console.error('HTTP server FAIL: ', err);
    else console.log(`HTTP  server OK: http://${DOMAIN}:${HTTP_PORT}`);
  });
}
catch (ex) {
  console.error('Failed to start HTTP server\n', ex);
}

try {
  const httpServer = https.createServer(serverCallback);
  httpServer.listen(HTTPS_PORT, function(err) {
    if (!!err) console.error('HTTPS server FAIL: ', err);
    else console.log(`HTTPS  server OK: http://${DOMAIN}:${HTTPS_PORT}`);
  });
}
catch (ex) {
  console.error('Failed to start HTTPS server\n', ex);
}

module.exports = server;