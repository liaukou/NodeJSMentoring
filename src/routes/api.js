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

router.route('/products/:id')
    .get(controller.getProduct)
    .delete(controller.deleteProduct);

router.route('/cities')
    .get(controller.getCities)
    .post(controller.saveCity);

router.route('/cities/:id')
    .put(controller.putCity)
    .delete(controller.deleteCity);

router.get('/products/:id/reviews', controller.getReviews);
router.get('/users', controller.getUsers);
router.delete('/users/:id', controller.deleteUser);

module.exports = router;