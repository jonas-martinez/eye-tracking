/**
 * Permet de trouver la valeur du paramètre donné dans une URL.
 * @param {String} parameterName Le nom du paramètre.
 * @return {String} La valeur du paramètre.
 */
function findGetParameter(parameterName) {
    var result = null, tmp = [];

    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) {
            result = decodeURIComponent(tmp[1]);
        }
    });

    return result;
}

/**
 * Permet de faire une requête GET vers une URL, le callback est utilisé pour gérer les données retournées.
 * @param {String} url 
 * @param {Function} callback 
 */
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

/**
 * Permet de faire une requête POST vers une URL, le callback est utilisé pour gérer les données retournées.
 * @param {String} url 
 * @param {JSON} data Les données à envoyer au format JSON.
 * @param {Function} callback 
 */
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

/**
 * Permet de créer une expérimentation.
 * @param {String} title Le titre de l'expérimentation.
 * @param {String} description La description de l'expérimentation.
 * @param {Number} duration La durée de l'expérimentation.
 * @param {Array<String>} files_path La liste des chemins des fichiers de l'expérimentation.
 * @param {Function} callback 
 */
function createExperimentation(title, description, duration, files_path, callback) {
    let params = { title: title, description: description, duration: duration, files_path: files_path };
    callPostAjax('api/createExperimentation', params, callback);
}

/**
 * Permet de récupérer toutes les expérimentations au format JSON.
 * @param {Function} callback 
 */
function getExperimentations(callback) {
    callGetAjax('api/getExperimentations', callback);
}

/**
 * Permet de récupérer une expérimentation depuis son id.
 * @param {Number} id 
 * @param {Function} callback 
 */
function getExperimentation(id, callback) {
    callGetAjax('api/getExperimentation/' + id, callback);
}

/**
 * Permet de supprimer une expérimentation depuis son id.
 * @param {Number} id 
 * @param {Function} callback 
 */
function deleteExperimentation(id, callback) {
    callGetAjax('api/deleteExperimentation/' + id, callback);
}

/**
 * Permet de récupérer tous les résultats des expérimentations.
 * @param {Function} callback 
 */
function getExperimentationsResults(callback) {
    callGetAjax('api/getExperimentationsResults', callback);
}

/**
 * Permet de récupérer tous les résultats d'une expérimentation depuis son id.
 * @param {Number} id 
 * @param {Function} callback 
 */
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
} else if (page.dataset['title'] === 'creation') {
    let experimentation_title = document.getElementById('experimentation_title');
    let experimentation_description = document.getElementById('experimentation_description');
    let experimentation_duration = document.getElementById('experimentation_duration');
    let experimentation_submit_button = document.getElementById('experimentation_submit_button');

    experimentation_submit_button.onclick = function() {
        let title = experimentation_title.value;
        let description = experimentation_description.value;
        let duration = experimentation_duration.value;
        let files = ['test'];

        createExperimentation(title, description, duration, files, function(data){
            console.log(data);
        });
    }
} else if (page.dataset['title'] === 'do_experimentation') {
    let id = findGetParameter('id');

    if(id) {
        console.log(id);
        getExperimentation(id, function(data){
            console.log(data);
        });
    }
}