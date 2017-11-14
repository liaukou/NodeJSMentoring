const http = require('http');
const fs = require('fs');
const path = require('path');

const through = require('through2');

const server = http.createServer();

const newMessage = 'new message';

server.on('request', (req, res) => {
    const HTMLFilePath = path.join(__dirname, 'index.html');
    const reader = fs.createReadStream(HTMLFilePath);
    const stream = through(function (buffer, encoding, next) {
        const data = buffer
            .toString()
            .replace(`{message}`, newMessage);

        this.push(data);
        next();
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    reader.pipe(stream).pipe(res);
});

module.exports = server;