const _ = require('lodash');

const jwt = require('jsonwebtoken');

const tokenMiddleware = function () {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, 'secret', function (err, decoded) {
                if (err) {
                    res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    })
                } else {
                    next();
                }
            });
        } else {
            res.status(403).send({
                success: false,
                message: 'No token provided.'
            })
        }
    }
};

module.exports = tokenMiddleware;