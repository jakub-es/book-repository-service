const mongoRepository = require('./stockRepository')();
const app = require('./index')(mongoRepository);

let port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log("When this callback is invoked our server is listening on port: " + port);
});
