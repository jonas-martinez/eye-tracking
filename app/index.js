var express = require('express');
var path = require('path');
const fs = require('fs');

// listening address and port
const ADDRESS = '127.0.0.1';
const PORT = 5050;

var app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "html/index.html"));
});

app.post('/createExperimentation', function (req, res) {
    console.log('Creating Experimentation...');
    let experimentation = req.body;
    experimentation['creation_date'] = (new Date()).toJSON();

    let experimentations_db_raw = fs.readFileSync(path.join(__dirname, 'public/json_database/experimentations.json'));
    let experimentations_db = JSON.parse(experimentations_db_raw);

    experimentations_db[experimentations_db['index']] = experimentation;
    experimentations_db['index']++;

    fs.writeFileSync(path.join(__dirname, 'public/json_database/experimentations.json'), JSON.stringify(experimentations_db));
    
    console.log('Experimentation created!');
    res.sendStatus(200);
});

app.get('/feedback', function (req, res) {
    res.sendFile(path.join(__dirname, "html/experimentation_feedback.html"));
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});