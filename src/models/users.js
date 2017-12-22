const mongoose = require('mongoose');

const userSchema = require('../schemas/user');
const userData = require('../bin/users');

const User = mongoose.model('user', userSchema);

const users = userData.reduce((res, user) => [...res, new User(user)], []);

User.count((err, count) => {
    if (count < users.length) {
        users.forEach(city => city.save());
    }
});

module.exports = User;