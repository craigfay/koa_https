const Koa = require('koa');
const server = new Koa();

const { PORT } = process.env;
const html = `
  <link rel="stylesheet" href="/main.css">
  <p>Hello</p>
`
server.use(ctx => ctx.body = html);
server.listen(PORT, () => console.log('Listening ...'));

module.exports = server;
