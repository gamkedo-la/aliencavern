var current_row;
var current_column;
var mouse_up = true;
var selectedBrickIndex;
var moveMode = false;
var showControlPanel = false;
var draggedY = 0;
//mouseEvenets();

function levelEditorInitialization() {
    preventRightClickToDisplayContextMenu();
    colorRect(0, 0, screen.width, screen.height, 'black');
    drawDefaultCavern();
    setCamera();
    initKeybindings();
    clearObjects();
}

function drawMiniMap(){  
    var colCount = 0;
    var rowCount = 0;
    var tileX = canvas.width - (BRICK_COLS * 3) - 10;
    var tileY = 10;

    var cameraTopMostRow = Math.floor(camPanY / BRICK_H);
    var rowsThatFitOnScreen = Math.floor(canvas.height / BRICK_H);

    colorRect(tileX , tileY + (cameraTopMostRow * 3) + camPanY, BRICK_COLS * 3, rowsThatFitOnScreen * 3, "rgba(0,0,255, 0.7)");

    cavernGrid.forEach(function(element) {
        if (element){
            if (element < 10){
                colorRect (tileX + (3 * colCount) + camPanX , tileY + (3 * rowCount) + camPanY, 3, 3, "cyan");
            }
            else {
                colorRect (tileX + (3 * colCount) + camPanX , tileY + (3 * rowCount) + camPanY, 3, 3, "red");
            }
        }
        colCount++;
        if (colCount == BRICK_COLS){
            colCount = 0;
            rowCount++;
        }
    });
}

function drawLevelEditor() {
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    drawOnlyCavernOnScreen();
    drawMiniMap();
    drawObjects();
    drawHint();
    if (showControlPanel == false){
        drawHighlightRect(current_row, current_column);
    }
    canvasContext.restore();
    if (showControlPanel) {
        new initControlPanel(50, 50);
    }  
}


function drawObjects() {
	drawGameObjects(squiddies);
	drawGameObjects(biters);
    drawGameObjects(alienPlants);
    drawGameObjects(crew);
    drawGameObjects(shipParts);
	loadGameObjects(squiddies, alienSquidPic, ALIEN_SQUID);
	loadGameObjects(biters, alienBiterPic, ALIEN_BITER);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
}

function drawDefaultCavern() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    var rows = BRICK_ROWS;
    var cavern = [];

    for (var i = 0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}

function drawHighlightRect(x, y) {
    canvasContext.strokeStyle = '#FFFF00';
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(x, y, BRICK_W, BRICK_H);
}

function drawHint() {
    canvasContext.font = "20px Comic Sans MS";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Press TAB to show control panel", 10, 20 + camPanY);
    // var heightOfLevel = getVisibleLevelHeightInPx();
//     var percDepth = Math.floor(100 * camPanY / heightOfLevel);
//     var tileDepth = Math.floor((camPanY + canvas.height) / BRICK_H);
//     canvasContext.fillText("Tile depth row " + tileDepth + " " + percDepth + "%", 5, 40 + camPanY);
    
}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}

function clearObjects() {
	squiddies = [];
	biters = [];
    alienPlants = [];
    crew = [];
    shipParts = [];
}



