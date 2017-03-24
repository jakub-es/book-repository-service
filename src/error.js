module.exports = function () {
    return {
        clientError: function (req, res, next) {
            let err = new Error('Not Found');
            err.status = 404;
            next(err);
        },

        serverError: function (err, req, res, next) {
            let status = err.status || 500;
            res.status(status);
            console.error(err.stack);
            res.send('Oh no: ' + status);
        }
    };
};
