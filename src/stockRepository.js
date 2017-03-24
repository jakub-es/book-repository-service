const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/books';

let connectionPromise = MongoClient.connect(url);
let collectionPromise = connectionPromise.then(function (db) {
    return db.collection('books');
});

let repository = {
    stockUp: function (isbn, count) {
        return collectionPromise.then(function (collection) {
            return collection.updateOne({isbn: isbn}, {
                isbn: isbn,
                count: count
            }, {upsert: true})
        })
    },
    findAll: function () {
        return collectionPromise.then(function (collection) {
            return collection.find({}).maxTimeMS(1000).toArray()
        })
    },
    findOne: function (isbn) {
        return collectionPromise.then(function (collection) {
            return collection.find({"isbn": isbn}).limit(1).next();
        })
    }
};

module.exports = repository;