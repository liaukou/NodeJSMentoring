const express = require('express');

const passport = require('../middlewares/passports');

const controller = require('./route-controller');

const router = express.Router();

router.post('/', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    res.send(controller.authenticate(username, password));
});

router.post('/passport', passport.authenticate('local', { session: false }), (req, res) => {
    res.send(req.user);
});

router.get('/passport/facebook', passport.authenticate('facebook'), (req, res) => {
    res.send(req.user);
});

module.exports = router;