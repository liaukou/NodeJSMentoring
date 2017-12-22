const mongoose = require('mongoose');

const productSchema = require('../schemas/product');
const productData = require('../bin/products');

const Product = mongoose.model('product', productSchema);

const products = productData.reduce((res, product) => [...res, new Product(product)], []);

Product.count((err, count) => {
    if (count < products.length) {
        products.forEach(city => city.save());
    }
});

module.exports = Product;