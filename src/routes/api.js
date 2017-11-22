const express = require('express');

const controller = require('./route-controller');

const tokenMiddleware = require('../middlewares/tokens');

const router = express.Router();

router.use(tokenMiddleware());

router.get('/', function (req, res) {
    res.send('App Server');
});

router.route('/api/products')
    .get((req, res) => {
        const products = controller.getProducts();
        res.send(products);
    })
    .post((req, res) => {
        const newProduct = controller.saveProduct(req.body);

        res.send(newProduct);
    });

router.get('/api/products/:id', function (req, res, next) {
    const product = controller.getProducts(req.params.id);

    if(!product) {
        return next({
            code: 404,
            message: 'Content not found'
        })
    }

    res.send(product);
});

router.get('/api/products/:id/reviews', function (req, res, next) {
    const review = controller.getReviews(req.params.id);

    if(!review) {
        return next({
            code: 404,
            message: 'Content not found'
        })
    }

    res.send(review);
});


router.get('/api/users', function (req, res) {
    res.send(controller.getUsers());
});

module.exports = router;