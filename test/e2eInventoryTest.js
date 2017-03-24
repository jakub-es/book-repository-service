const request = require('supertest');
const inMemoryRepository = require('./inMemoryRepository')();
const app = require('./../src/index')(inMemoryRepository);

describe('Book inventory', function () {
    it('allows to stock up the items', function (done) {
        request(app)
            .post('/stock')
            .send({ isbn: '01234567890', count: 10 })
            .expect({ isbn: '01234567890', count: 10 }, done);
    })
});