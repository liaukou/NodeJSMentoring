const mongoose = require('mongoose');

const product = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is a required field']
    },
    brand: {
        type: String,
        required: [true, 'Brand is a required field']
    },
    price: {
        type: Number,
        required: [true, 'Price is a required field']
    },
    reviews: String,
    lastModifiedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = product;