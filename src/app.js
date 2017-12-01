const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const api = require('./routes/api');
const auth = require('./routes/auth');
const queryMiddleware = require('./middlewares/queries');
const cookieMiddleware = require('./middlewares/cookies');
const passport = require('./middlewares/passports');

app.use(bodyParser.json());
app.use(queryMiddleware());
app.use(cookieMiddleware());
app.use(passport.initialize());
app.use('/api', api);
app.use('/auth', auth);
app.use((err, req, res, next) => {
    if (err.code === undefined) {
        res.status(500);
        return;
    }
    res.status(err.code).json(err);
});

module.exports = app;