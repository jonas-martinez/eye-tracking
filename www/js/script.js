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

bv.setup('img/sample1', 'canvas', 150, 150, logClick);

function logClick(log) {
    // clickCount++;
    //$("#click-count").text(clickCount);
    // console.log(log);
    //clicks.push(log);

    //resetMonitoring();
}