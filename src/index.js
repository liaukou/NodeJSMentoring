const plainTextServer = require('./http-servers/plain-text-server');
const jsonServer = require('./http-servers/json-server');
const htmlServer = require('./http-servers/html-server');
const echoServer = require('./http-servers/echo-server');
const appServer = require('./app');
const mongoServer = require('./http-servers/mongo-server');
const mongooseServer = require('./http-servers/mongoose-server');

const port = process.env.PORT || 8080;

plainTextServer.listen(port);
jsonServer.listen(port + 1);
htmlServer.listen(port + 2);
echoServer.listen(port + 3);
appServer.listen(port + 4);
mongoServer.listen(port + 5);
mongooseServer.listen(port + 6);