var express = require('express');
var path = require('path');

// listening address and port
const ADDRESS = '127.0.0.1';
const PORT = 5050;

var app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "html/index.html"))
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});