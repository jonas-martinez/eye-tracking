var http = require('http')
var fs = require('fs')

const ADDRESS = '127.0.0.1';
const PORT = 5050;

fs.readFile('./app/html/index.html', function(err, html) {
    if (err) {
        throw err;
    }

    http.createServer(function(req, res) {
        if (req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Not Found')
        }

        res.end();
    }).listen(PORT, ADDRESS);

    console.log('Server running at ' + ADDRESS + ':' + PORT);
});