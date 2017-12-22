const http = require('http');
const mongoose = require('mongoose');

const City = require('../models/cities');

const server = http.createServer();

mongoose.connect('mongodb://localhost:27017/citiesMongoose');

server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    City.find({}, (err, items) => {
        const random = Math.floor(Math.random() * items.length);
        const city = items[random];

        res.end(JSON.stringify(city));
    })
});

module.exports = server;