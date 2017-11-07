const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200);
    req.pipe(res);
});

module.exports = server;