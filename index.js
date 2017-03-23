const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/books';

function logRequest(req, res, next) {
    console.log('incoming request at', new Date());
    next();
}

function auth(req, res, next) {
    console.log("you can pass my auth");
    next();
}

app.use(logRequest);
app.use(auth);
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello world');
});

app.get('/stock', function (req, res, next) {

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        db.collection('books').find({}).toArray(function (err, docs) {
            res.json(docs);
        });
        db.close();
    });
});

app.post('/stock', function (req, res, next) {
    let isbn = req.body.isbn;
    let count = req.body.count;

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        db.collection('books').updateOne({isbn: isbn}, {
            isbn: isbn,
            count: count
        }, {upsert: true});
        db.close();
    });

    res.json({
        isbn: req.body.isbn,
        count: req.body.count
    })
});

app.get('/error', function (res, req) {
    throw new Error('forced error');
});

app.use(clientError);
app.use(serverError);

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}
function serverError(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    console.error(err.stack);
    res.send('Oh no: ' + status);
}

module.exports = app;
