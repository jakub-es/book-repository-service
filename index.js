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
