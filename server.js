const Koa = require('koa');
const server = new Koa();

const { PORT } = process.env;
server.listen(PORT, () => console.log('Listening on port', PORT));

module.exports = server;
