const express = require('express');

const controller = require('./route-controller');

const tokenMiddleware = require('../middlewares/tokens');

const router = express.Router();

// router.use(tokenMiddleware());

router.get('/', function (req, res, next) {
    res.send('App Server');
    next();
});

router.route('/products')
    .get(controller.getProducts)
    .post(controller.saveProduct);

router.get('/products/:id', controller.getProduct);
router.get('/products/:id/reviews', controller.getReviews);
router.get('/users', controller.getUsers);

module.exports = router;