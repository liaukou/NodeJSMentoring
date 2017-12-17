const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize/lib/data-types');

const config = require('../config/config.json');
const product = require('../models/product');
const user = require('../models/user');

const db = new Sequelize(config.development);
const products = product(db, DataTypes);
const users = user(db, DataTypes);

const getProducts = (req, res, next) => {
    products.findAll().then((data) => {
        res.send(data);
        next();
    });
};

const getProduct = (req, res, next) => {
    products.findOne({ where: { id: req.params.id} })
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.send({
                    code: 404,
                    message: 'Content not found'
                });
            }
            next();
        });
};

const getUsers = (req, res, next) => {
    users.findAll().then((data) => {
        res.send(data);
        next();
    });
};

const getReviews = (req, res, next) => {
    products.findOne({where: {id: req.params.id}})
        .then((data) => {
            if (data) {
                res.send(data.reviews);
            } else {
                res.send({
                    code: 404,
                    message: 'Content not found'
                });
            }
            next();
        });
};

const saveProduct = (req, res, next) => {
    const product = req.body;
    products.create(product).then(data => {
        res.send(data);
        next();
    });
};

const authenticate = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    users.findOne({ where: { username, password} })
        .then(user => {
            if (user) {
                const header = {
                    email: user.email,
                    username: user.username
                };
                const token = jwt.sign(header, 'secret', { expiresIn: 60 * 60 });
                res.send({
                    code: 200,
                    message: 'OK',
                    data: { user: header },
                    token: token
                });
                next();
            } else {
                res.send({
                    code: 404,
                    message: 'Not Found',
                    data: {}
                });
                next();
            }
        });
};

module.exports = {
    getProducts,
    getProduct,
    getUsers,
    getReviews,
    saveProduct,
    authenticate
};