const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);

    readImage(fileList[0], document.getElementById('canvas')); // DEBUG
    console.log(fileList[0]);
});


/*
    BubbleView Part
*/

// On définit les diamètres des cercles pour la bulle et le floutage
let bubble_radius = 30;
let blur_radius = 30;
let clickCount = 0;
// Tableau des clics
let clicks = [];
let canvas = document.getElementById('canvas');
let current_image = 'img/test.jpg';

// On initialise le canvas avec bubbleview
bv.setup(current_image, 'canvas', bubble_radius, blur_radius, logClick);

// On adapate la taille du canvas à l'image
const img = new Image();
img.onload = function () {
    canvas.width = this.width;
    canvas.height = this.height;
}
img.src = current_image;

// DEBUG
document.getElementById('btn_valider').onclick = function () {
    console.log(clicks);
};

function logClick(log) {
    clickCount++;
    clicks.push(log);

    //resetMonitoring();
}

function readImage(file, canvas) {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
        console.log('File is not an image.', file.type, file);
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        current_image = event.target.result;
        resetBubbleView();
    });
    reader.readAsDataURL(file);
}

function imageFromURL(url, callback) {
    image = new Image();
    image.src = url;
    image.onload = callback;
}

function resetBubbleView() {
    bv.setup(current_image, 'canvas', bubble_radius, blur_radius, logClick);
    clicks = [];
    clickCount = 0;

    // On adapate la taille du canvas à l'image
    const img = new Image();
    img.onload = function () {
        canvas.width = this.width;
        canvas.height = this.height;
    }
    img.src = current_image;
}
