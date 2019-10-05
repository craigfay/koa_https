// Start serving HTTP
const httpServer = require('./http-server');
httpServer.listen(process.env.PORT, () => console.log('listening ...'));

// Respond to shutdown signals
const shutdown = () => httpServer.close(err => process.exit(err ? 1 : 0));
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
