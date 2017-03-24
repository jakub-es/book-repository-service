module.exports = function (repository) {
    return {
        hello: function (req, res) {
            return res.send('Hello world');
        },
        getStock: function (req, res, next) {
            repository.findAll().then(function (results) {
                return res.json(results);
            }).catch(next)
        },
        getCount: function (req, res, next) {
            let isbn = req.param('isbn');
            repository.getCount(isbn).then(function (results) {
                if (results != null) {
                    return res.json(results);
                } else {
                    next();
                }
            }).catch(next)
        },
        stockUp: function (req, res, next) {
            let isbn = req.body.isbn;
            let count = req.body.count;

            repository.stockUp(isbn, count).then(function () {
                res.json({
                    isbn: req.body.isbn,
                    count: req.body.count
                });
            }).catch(next)
        },
        forcedError: function (res, req) {
            throw new Error('forced error');
        }
    }
};