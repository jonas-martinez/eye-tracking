loadfiles_button = document.getElementById("br_loadfiles");
loadfiles_button.onclick = function () {
    console.log('clicked');
};
console.log(loadfiles_button);

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
});

/*
    BubbleView Part
*/

let bubble_radius = 30;
let blur_radius = 30;
let clickCount = 0;
let clicks = [];
let canvas = document.getElementById('canvas');

bv.setup('img/test.jpg', 'canvas', bubble_radius, blur_radius, logClick);

const img = new Image();
img.onload = function() {
    canvas.width = this.width;
    canvas.height = this.height;
}
img.src = 'img/test.jpg';

function logClick(log) {
    clickCount++;
    //$("#click-count").text(clickCount);
    clicks.push(log);

    //resetMonitoring();
}

document.getElementById('btn_valider').onclick = function() {
    console.log(clicks);
};