module.exports = function () {

    const MongoClient = require('mongodb').MongoClient;
    // Connection URL
    let url = process.env.MONGODB_URI || 'mongodb://localhost:27017/books';

    let connectionPromise = MongoClient.connect(url);
    let collectionPromise = connectionPromise.then(function (db) {
        return db.collection('books');
    });

    return {
        stockUp: function (isbn, count) {
            return collectionPromise.then(function (collection) {
                return collection.updateOne({isbn: isbn}, {
                    isbn: isbn,
                    count: count
                }, {upsert: true});
            });
        },
        findAll: function () {
            return collectionPromise.then(function (collection) {
                return collection.find({}).maxTimeMS(1000).toArray();
            });
        },
        getCount: function (isbn) {
            return collectionPromise.then(function (collection) {
                return collection.find({"isbn": isbn}).limit(1).next();
            }).then(function (result) {
                if (result) {
                    return result.count;
                } else {
                    return null;
                }
            });
        }
    };
};