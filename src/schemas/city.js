const mongoose = require('mongoose');

const city = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field'],
        validate: {
            validator(v) {
                return /^[A-Z]/.test(v);
            },
            message: '{VALUE} doesn\'t start with a capital letter'
        }
    },
    country: {
        type: String,
        required: [true, 'Country is a required field']
    },
    capital: {
        type: Boolean,
        required: [true, 'Capital is a required field']
    },
    location: {
        lat: Number,
        long: Number
    },
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = city;
