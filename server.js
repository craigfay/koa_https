const Koa = require('koa');
const server = new Koa();

const { PORT } = process.env;
const html = `
	<link rel="stylesheet" href="/main.css">
	<div>Hello from node</div>
`;
server.use(ctx => ctx.body = html);
server.listen(PORT, () => console.log('Listening on port', PORT));

module.exports = server;
