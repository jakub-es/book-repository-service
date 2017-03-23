/**
 * Created by jaksta on 2017-03-23.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

app.post('/stock', function (req, res, next) {
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

app.listen(3000, function () {
    console.log("When this callback is invoked our server is listening on port: " + 3000);
});

function serverError(err, req, res, next) {
    var status = err.status || 500;
    res.status(status);
    console.error(err.stack);
    res.send(err.status);
}

function clientError(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}
