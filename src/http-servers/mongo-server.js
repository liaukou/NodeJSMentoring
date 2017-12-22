const http = require('http');
const { MongoClient } = require('mongodb');

const cities = require('../bin/cities');

const url = 'mongodb://localhost:27017/cities';

const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    function getCity(collection, res, db) {
        collection.find({}).toArray((err, items) => {
            if (!items.length) {
                collection.insertMany(cities, () => {
                    getCity(collection, res, db);
                });
            } else {
                const random = Math.floor(Math.random() * items.length);
                const city = items[random];

                res.end(JSON.stringify(city));
            }
            db.close();
        });
    }

    MongoClient.connect(url, (err, db) => {
        const collection = db.collection('cities');

        getCity(collection, res, db);
    })
});

module.exports = server;