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

app.get('/creation', function (req, res) {
    res.sendFile(path.join(__dirname, "html/creation.html"));
});

app.get('/feedback', function (req, res) {
    res.sendFile(path.join(__dirname, "html/experimentation_feedback.html"));
});

app.post('/api/createExperimentation', function (req, res) {
    let experimentation = req.body;
    experimentation['creation_date'] = (new Date()).toJSON();

    let experimentations_db_raw = fs.readFileSync(path.join(__dirname, 'public/json_database/experimentations.json'));
    let experimentations_db = JSON.parse(experimentations_db_raw);

    experimentations_db[experimentations_db['index']] = experimentation;
    experimentations_db['index']++;

    fs.writeFileSync(path.join(__dirname, 'public/json_database/experimentations.json'), JSON.stringify(experimentations_db));

    res.sendFile(path.join(__dirname, 'public/json_database/experimentations.json'));
});

app.get('/api/getExperimentations', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/json_database/experimentations.json'));
});

app.get('/api/getExperimentation/:id', function (req, res) {
    let id = req.params.id;

    let experimentations_db_raw = fs.readFileSync(path.join(__dirname, 'public/json_database/experimentations.json'));
    let experimentations_db = JSON.parse(experimentations_db_raw);

    if (experimentations_db.hasOwnProperty(id)) {
        res.send(JSON.stringify(experimentations_db[id]));
    } else {
        res.sendStatus(400);
    }
});

app.get('/api/deleteExperimentation/:id', function (req, res) {
    let id = req.params.id;

    let experimentations_db_raw = fs.readFileSync(path.join(__dirname, 'public/json_database/experimentations.json'));
    let experimentations_db = JSON.parse(experimentations_db_raw);

    if (experimentations_db.hasOwnProperty(id)) {
        delete experimentations_db[id];
        fs.writeFileSync(path.join(__dirname, 'public/json_database/experimentations.json'), JSON.stringify(experimentations_db));

        res.sendFile(path.join(__dirname, 'public/json_database/experimentations.json'));
    } else {
        res.sendStatus(400);
    }
});

app.get('/api/getExperimentationsResults', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/json_database/experimentations_results.json'));
});

app.get('/api/getExperimentationResults/:id', function (req, res) {
    let id = req.params.id;

    let experimentation_r_db_raw = fs.readFileSync(path.join(__dirname, 'public/json_database/experimentations_results.json'));
    let experimentation_r_db = JSON.parse(experimentation_r_db_raw);

    if (experimentation_r_db.hasOwnProperty(id)) {
        res.send(JSON.stringify(experimentation_r_db[id]));
    } else {
        res.sendStatus(400);
    }
});

var server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
});