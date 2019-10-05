// Start serving HTTP
const server = require('./server');
server.listen(process.env.PORT, () => console.log('listening ...'));

// Respond to shutdown signals
const shutdown = () => server.close(err => process.exit(err ? 1 : 0));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
