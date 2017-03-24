const mongoRepository = require('./stockRepository')();
const app = require('./index')(mongoRepository);

app.listen(3001, function () {
    console.log("When this callback is invoked our server is listening on port: " + 3001);
});
