'use strict';
module.exports = (sequelize, DataTypes) => {
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        brand: DataTypes.STRING,
        price: DataTypes.FLOAT,
        reviews: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        timestamps: false
    });
    return Product;
};