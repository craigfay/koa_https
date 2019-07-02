// acme-router.js
'use strict';

let fs = require('fs');
let path = require('path');

let koaRouter = require('koa-router');

let router = koaRouter({});

// point to the middleware we wish to serve
router
  .get(
    'getWellKnownAcmeChallenge',
    '/.well-known/acme-challenge/:challengeHash',
    getWellKnownAcmeChallengeRoute);

function *getWellKnownAcmeChallengeRoute() {
  try {
    let key = this.params.challengeHash;
    let val = yield getAcmeChallengeData(key);
    this.response.type = 'text/plain';
    this.response.body = `${val}`;
    this.response.status = 200;
  }
  catch (ex) {
    console.error(`Error: ${ex}`);
    console.error(ex.stack);
    this.response.body = {
      error: 'Failed to obtain challenge hash',
    };
    this.response.status = 500;
  }
}

function getAcmeChallengeData(key) {
  return new Promise((resolve, reject) => {
    let challengeFilePath = path.resolve(process.cwd(), `certs/webroot/.well-known/acme-challenge/${key}`);
    fs.readFile(challengeFilePath, 'utf8', (err, data) => {
      if (!!err || !data) {
        return reject(`No challenge for key ${key}`);
      }
      val = data.toString();
      return resolve(val);
    });
  });
}

module.exports = router;