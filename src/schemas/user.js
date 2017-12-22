const mongoose = require('mongoose');

const user = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is a required field']
    },
    password: {
        type: String,
        required: [true, 'Password is a required field']
    },
    email: {
        type: String,
        required: [true, 'Email is a required field']
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = user;