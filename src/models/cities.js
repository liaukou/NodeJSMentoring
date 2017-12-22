const mongoose = require('mongoose');

const citySchema = require('../schemas/city');
const citiesData = require('../bin/cities');

const City = mongoose.model('city', citySchema);

const cities = citiesData.reduce((res, city) => [...res, new City(city)], []);

City.count((err, count) => {
    if (count < cities.length) {
        cities.forEach(city => city.save());
    }
});

module.exports = City;