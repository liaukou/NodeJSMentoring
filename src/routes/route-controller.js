const jwt = require('jsonwebtoken');

const Products = require('../models/products');
const Users = require('../models/users');
const Cities = require('../models/cities');

const _addLastModifiedDate = (item) => {
    item.lastModifiedDate = Date.now();
    return item;
};

const _delete = (req, res, next, model) => {
    const id = req.params.id;
    model.findByIdAndRemove(id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                code: 200,
                message: `Item with ${id} deleted successfully from ${model.collection.name}`
            });
        }
        next();
    })
};

const _save = (req, res, next, model) => {
    const item = new model(_addLastModifiedDate(req.body));
    item.save((err, item) => {
        if (err) {
            return console.error(err);
        }
        res.send(item);
        next();
    });
};

const _getAll = (req, res, next, model) => {
    model.find({}).then((data) => {
        res.send(data);
        next();
    });
};

const _get = (req, res, next, model, field) => {
    const id = req.params.id;
    model.findById(id)
        .then(data => {
            if (data) {
                field ? res.send(data[field]) : res.send(data);
            } else {
                res.send({
                    code: 404,
                    message: 'Content not found'
                });
            }
            next();
        });
};

const _put = (req, res, next, model) => {
    const id = req.params.id;
    const item = _addLastModifiedDate(req.body);
    model.findByIdAndUpdate(id, item, {new: true, upsert: true}, (err, data) => {
        if (err) {
            return console.error(err);
        }
        res.send(data);
        next();
    });
};

const getProducts = (req, res, next) => {
    _getAll(req, res, next, Products);
};

const getProduct = (req, res, next) => {
    _get(req, res, next, Products);
};

const deleteProduct = (req, res, next) => {
    _delete(req, res, next, Products);
};

const getUsers = (req, res, next) => {
    _getAll(req, res, next, Users);
};

const getReviews = (req, res, next) => {
    const reviews = "reviews";
    _get(req, res, next, Products, reviews);
};

const saveProduct = (req, res, next) => {
    _save(req, res, next, Products);
};

const deleteUser = (req, res, next) => {
    _delete(req, res, next, Users);
};

const getCities = (req, res, next) => {
    _getAll(req, res, next, Cities)
};

const saveCity = (req, res, next) => {
    _save(req, res, next, Cities);
};

const putCity = (req, res, next) => {
    _put(req, res, next, Cities);
};

const deleteCity = (req, res, next) => {
    _delete(req, res, next, Cities);
};

const authenticate = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({username, password})
        .then(user => {
            if (user) {
                const header = {
                    email: user.email,
                    username: user.username
                };
                const token = jwt.sign(header, 'secret', {expiresIn: 60 * 60});
                res.send({
                    code: 200,
                    message: 'OK',
                    data: user,
                    token: token
                });
                next();
            } else {
                res.send({
                    code: 404,
                    message: 'Not Found'
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
    authenticate,
    deleteProduct,
    deleteUser,
    getCities,
    saveCity,
    putCity,
    deleteCity
};