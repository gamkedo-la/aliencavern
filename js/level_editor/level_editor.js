var current_row;
var current_column;
var mouse_up = true;
var selectedBrickIndex;
var moveMode = false;
var showControlPanel = false;
var draggedY = 0;
function levelEditorInitialization() {
    preventRightClickToDisplayContextMenu();
    colorRect(0, 0, screen.width, screen.height, 'black');
    setDefaultCavern();
    setCamera();
    loadGameObjects(aliens, alienPic, ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
    initKeybindings();
    aliens = [];
    alienPlants = [];
    crew = [];
    shipParts = [];

}

function drawLevelEditor() {
    drawOnlyCavernOnScreen();
    drawGameObjects(aliens);
    drawGameObjects(alienPlants);
    drawGameObjects(crew);
    drawGameObjects(shipParts);
    mouseEvenets();
    loadGameObjects(aliens, alienPic, ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
    drawHint();
    if (showControlPanel) {
        new initControlPanel(50, 50 + camPanY);
    }

    if (moveMode && !mouse_up) {

    } else if (moveMode) {

    } else if (!showControlPanel) {
        var cameraLeftMostCol = Math.floor(camPanX / BRICK_W);
        var cameraTopMostRow = Math.floor(camPanY / BRICK_H);
        drawHighlightRect(current_row, current_column);
    }

}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}

function setDefaultCavern() {
    drawBoundries();
}

function drawBoundries() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    var rows = 54;
    var cavern = [];

    for (var i = 0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}


function change_tile(changeTo) {
    removeImgFromBrick();
    if (typeof changeTo !== 'undefined')  {
        cavernGrid[selectedBrickIndex] = changeTo;
        return;
    }

    if (cavernGrid[selectedBrickIndex] < 8) {
        cavernGrid[selectedBrickIndex] = cavernGrid[selectedBrickIndex] + 1;
    } else if (cavernGrid[selectedBrickIndex] === 8) {
        cavernGrid[selectedBrickIndex] = 20;
    } else if (cavernGrid[selectedBrickIndex] === 20) {
        cavernGrid[selectedBrickIndex] = 21;
    } else if (cavernGrid[selectedBrickIndex] === 21) {
        cavernGrid[selectedBrickIndex] = 30;
    } else if (cavernGrid[selectedBrickIndex] === 30) {
        cavernGrid[selectedBrickIndex] = 31;
    } else {
        cavernGrid[selectedBrickIndex] = 0;
    }
}


function drawHighlightRect(x, y) {
    canvasContext.strokeStyle = '#FFFF00';
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(x, y, BRICK_W, BRICK_H);
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function removeImgFromBrick() {
    aliens = aliens.map(function (alien, index) {
        if (alien && isInRange(alien)) {
            aliens.splice(index, 1);
        }
    });

    alienPlants = alienPlants.map(function (plant, index) {
        if (plant && isInRange(plant)) {
            alienPlants.splice(index, 1);
        }
    });

    crew = crew.map(function (buddy, index) {
        if (buddy && isInRange(buddy)) {
            crew.splice(index, 1);
        }
    });

    shipParts = shipParts.map(function (part, index) {
        if (part && isInRange(part)) {
            shipParts.splice(index, 1);
        }
    });
}

function isInRange(object) {
    return mousePosition.x > object.x && mousePosition.x < (object.x + BRICK_W) &&
        mousePosition.y > object.y && mousePosition.y < (object.y + BRICK_H)
}

function decreaseLevelHeight() {
    cavernGrid = cavernGrid.slice(0, -14)
}

function increaseLevelHeight() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    cavernGrid = cavernGrid.concat(row);
}

function drawHint() {
        canvasContext.font = "12px Comic Sans MS";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Press TAB to show control panel", 5, 15 + camPanY);
}