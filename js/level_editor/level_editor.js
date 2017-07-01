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

function drawLevelEditor() {
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    drawOnlyCavernOnScreen();
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
    var rows = 54;
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
    canvasContext.fillText("Press TAB to show control panel", 5, 15 + camPanY);
    var heightOfLevel = getVisibleLevelHeightInPx();
    var percDepth = Math.floor(100* camPanY / heightOfLevel);
    var tileDepth = Math.floor(camPanY / BRICK_H);
    canvasContext.fillText("Tile depth row " + tileDepth + " " + percDepth + "%", 5, 30 + camPanY);
    
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



