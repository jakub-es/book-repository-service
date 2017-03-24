const express = require('express');
const bodyParser = require('body-parser');
const stockRoutes = require('./stockRoutes');

module.exports = function (repository) {

    const routes = stockRoutes(repository);
    const app = express();
    const error = require('./error')();

    app.use(logRequest);
    app.use(auth);
    app.use(bodyParser.json());

    app.get('/', routes.hello);
    app.get('/stock', routes.getStock);
    app.get('/stock/:isbn', routes.getCount);
    app.post('/stock', routes.stockUp);
    app.get('/error', routes.forcedError);

    app.use(error.clientError);
    app.use(error.serverError);

    return app;
};

function logRequest(req, res, next) {
    console.log('incoming request at', new Date());
    next();
}

function auth(req, res, next) {
    console.log("you can pass my auth");
    next();
}
