module.exports = function (repositoryObject) {
    const express = require('express');
    const bodyParser = require('body-parser');
    const app = express();
    const repository = repositoryObject;

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
        repository.findAll().then(function (results) {
            res.json(results)
        }).catch(next)
    });

    app.get('/stock/:isbn', function (req, res, next) {
        let isbn = req.param('isbn');
        repository.getCount(isbn).then(function (results) {
            if (results != null) {
                res.json(results);
            } else {
                return clientError(req, res, next);
            }
        }).catch(next)
    });

    app.post('/stock', function (req, res, next) {
        let isbn = req.body.isbn;
        let count = req.body.count;

        repository.stockUp(isbn, count).then(function () {
            res.json({
                isbn: req.body.isbn,
                count: req.body.count
            });
        }).catch(next)
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

    return app;
};
