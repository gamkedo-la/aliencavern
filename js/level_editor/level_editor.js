function levelEditorInitialization() {
    colorRect(0,0, screen.width,screen.height, 'black');
    setDefaultCavern();
    setCamera();
}

function drawLevelEditor() {
    drawOnlyCavernOnScreen();
}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}

function setDefaultCavern() {
    drawBoundries();
}

function drawBoundries() {
    var row = [1,0,0,0,0,0,0,0,0,0,0,0,0,1]
    var rows = 54;
    var cavern = [];

    for(var i=0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}