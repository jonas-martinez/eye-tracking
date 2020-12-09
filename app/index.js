var http = require('http')
var fs = require('fs')

// listening address and port
const ADDRESS = '127.0.0.1';
const PORT = 5050;

// loading the main HTML page
fs.readFile('./app/html/index.html', function(err, html) {

    // if page not found or cannot be loaded, we log error
    if (err) {
        console.error(err.message);
    }

    // starting a server listening on address and port defined above
    http.createServer(function(req, res) {

        // serving main page
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
        }
        // serving error page
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found')
        }

        res.end();
    }).listen(PORT, ADDRESS);

    // debug
    console.log('Server running at ' + ADDRESS + ':' + PORT);
});