function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function callGetAjax(url, callback) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function callPostAjax(url, data, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    };
    xhttp.send(JSON.stringify(data));
}

function createExperimentation(title, description, duration, files_path, callback) {
    let params = { title: title, description: description, duration: duration, files_path: files_path };
    callPostAjax('api/createExperimentation', params, callback);
}

function getExperimentations(callback) {
    callGetAjax('api/getExperimentations', callback);
}

function getExperimentation(id, callback) {
    callGetAjax('api/getExperimentation/' + id, callback);
}

function deleteExperimentation(id, callback) {
    callGetAjax('api/deleteExperimentation/' + id, callback);
}

function getExperimentationsResults(callback) {
    callGetAjax('api/getExperimentationsResults', callback);
}

function getExperimentationResults(id, callback) {
    callGetAjax('api/getExperimentationResults/' + id, callback);
}

//createExperimentation('test', 'test', 123, ['a', 'b', 'c']);

// let experimentation_id = findGetParameter('id');
// if (experimentation_id) {
//     if (/^[1-9]\d*$/.test(experimentation_id)) {
//         callGetAjax('json_database/experimentations_results.json', function (data) {
//             let experimentation_data = JSON.parse(data);
//             console.log(experimentation_data[experimentation_id]);
//         });
//     }
// }

let page = document.getElementsByTagName('body')[0];

if (page.dataset['title'] === 'results') {
    getExperimentationsResults(function (data) {
        console.log(data);
    });
}