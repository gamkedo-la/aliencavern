var current_row;
var current_column;
var mouse_up = true;
function levelEditorInitialization() {
    colorRect(0, 0, screen.width, screen.height, 'black');
    setDefaultCavern();
    setCamera();
    loadGameObjects(aliens, alienPic, ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
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
    highlightTile();
    drawHighlightRect(current_row, current_column);
    loadGameObjects(aliens, alienPic, ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
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

function highlightTile() {
    canvas.addEventListener('mousemove', function (evt) {
        mousePosition = getMousePosition(canvas, evt);
        var tile_x = Math.floor(mousePosition.x / BRICK_W);
        var tile_y = Math.floor(mousePosition.y / BRICK_H);

        current_row = tile_x * BRICK_W;
        current_column = tile_y * BRICK_H;
    });

    canvas.addEventListener('mousedown', function (evt) {
        if (mouse_up) {
            mouse_up = false;
            change_tile();
        }
    });

    canvas.addEventListener('mouseup', function (evt) {
        mouse_up = true;
    });
}

function change_tile() {
    removeImgFromBrick();
    var tileCol = current_column / BRICK_H;
    var tileRow = current_row / BRICK_W;
    var brickIndex = brickTileToIndex(tileRow, tileCol);
    if (cavernGrid[brickIndex] < 8) {
        cavernGrid[brickIndex] = cavernGrid[brickIndex] + 1;
    } else if (cavernGrid[brickIndex] === 8) {
        cavernGrid[brickIndex] = 20;
    } else if (cavernGrid[brickIndex] === 20) {
        cavernGrid[brickIndex] = 21;
    } else if (cavernGrid[brickIndex] === 21) {
        cavernGrid[brickIndex] = 30;
    } else if (cavernGrid[brickIndex] === 30) {
        cavernGrid[brickIndex] = 31;
    } else {
        cavernGrid[brickIndex] = 0;
    }
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
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