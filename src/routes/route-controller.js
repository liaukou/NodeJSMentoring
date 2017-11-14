const _ = require('lodash');

const products = require('../bin/products.json');
const reviews = require('../bin/reviews.json');
const users = require('../bin/users.json');

const getProducts = function (id) {
    if (!id) {
        return products;
    }
    return _.find(products, { id: parseInt(id, 10) });
};

const getUsers = function () {
    return users;
};

const getReviews = function (id) {
    return _.find(reviews, { id: parseInt(id, 10) });
};

const saveProduct = function (product) {
    products.push(product);
    return product;
};

module.exports = {
    getProducts,
    getUsers,
    getReviews,
    saveProduct
};