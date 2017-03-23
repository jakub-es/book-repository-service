var app = require('./index');

app.listen(3000, function () {
    console.log("When this callback is invoked our server is listening on port: " + 3000);
});