const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const router = require('./routes');
const queryMiddleware = require('./middlewares/queries');
const cookieMiddleware = require('./middlewares/cookies');

app.use(queryMiddleware());
app.use(cookieMiddleware());
app.use(bodyParser.json());
app.use(router);

module.exports = app;