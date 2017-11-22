const _ = require('lodash');

const users = [
    {
        "id": "100002505924503",
        "username": "Andrei",
        "password": "pass",
        "email": "andrei@mail.com"
    }
];

const findUser = function (username, password) {
    return _.find(users, {username, password})
};

const findUserById = function (id) {
    return _.find(users, {id})
};

module.exports = {
    findUser,
    findUserById
};