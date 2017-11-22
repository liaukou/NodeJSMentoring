const _ = require('lodash');

const jwt = require('jsonwebtoken');

const { findUser } = require('../utils/users');

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

const authenticate = function (username, password) {
    const user = findUser(username, password);
    if (user) {
        const header = {
            email: user.email,
            username: user.username
        };
        const token = jwt.sign(header, 'secret', { expiresIn: 60 * 60 });
        return {
            code: 200,
            message: 'OK',
            data:
                {
                    user: header
                },
            token: token
        }
    } else {
        return {
            code: 404,
            message: 'Not Found',
            data: {}
        }
    }
};

module.exports = {
    getProducts,
    getUsers,
    getReviews,
    saveProduct,
    authenticate
};