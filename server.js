'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');

const Koa = require('koa');
const server = new Koa();

const acmeRouter = require('./acme-router.js');
server.use(acmeRouter.routes())
server.use(acmeRouter.allowedMethods());

const {
  DOMAIN,
  HTTP_PORT,
  HTTPS_PORT,
} = process.env

const ssl = {
  key: fs.readFileSync('./ssl/privkey.pem', 'utf8').toString(),
  cert: fs.readFileSync('./ssl/fullchain.pem', 'utf8').toString(),
}

const serverCallback = server.callback();

try {
  const httpServer = http.createServer(serverCallback);
  httpServer.listen(HTTP_PORT, function(err) {
    if (!!err) console.error('HTTP:', err);
    else console.log(`HTTP OK: http://${DOMAIN}:${HTTP_PORT}`);
  });
}
catch (ex) {
  console.error('Failed to start HTTP server\n', ex);
}
 
try {
  const httpServer = https.createServer(ssl, serverCallback);
  httpServer.listen(HTTPS_PORT, function(err) {
    if (!!err) console.error('HTTPS:', err);
    else console.log(`HTTPS OK: http://${DOMAIN}:${HTTPS_PORT}`);
  });
}
catch (ex) {
  console.error('Failed to start HTTPS server\n', ex);
}

module.exports = server;