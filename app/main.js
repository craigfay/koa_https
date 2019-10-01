const http = require('http');

const html = `
  <link rel="stylesheet" href="/main.css">
  <p>Hello from node</p>
`;

http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(html);
}).listen(process.env.PORT, () => console.log('listening ...'))