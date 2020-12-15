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

function callAjax(url, callback) {
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

let experimentation_id = findGetParameter('id');
if (experimentation_id) {
    if (/^[1-9]\d*$/.test(experimentation_id)) {
        callAjax('json_database/experimentations_results.json', function(data){
            let experimentation_data = JSON.parse(data);
            console.log(experimentation_data[experimentation_id]);
        });
    }
}

