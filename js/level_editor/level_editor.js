var current_row;
var current_column;
var mouse_up = true;
var selectedBrickIndex;
var moveMode = false;
var draggedY = 0;
function levelEditorInitialization() {
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
    highlightTile();
    loadGameObjects(aliens, alienPic, ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);

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

function highlightTile() {
    canvas.addEventListener('mousemove', function (evt) {

        if (!mouse_up && moveMode) {
            scrollCamera(draggedY - getMousePosition(canvas, evt).y)
        } else if (!moveMode) {
            setCursorPosition(evt);
        }
    });

    canvas.addEventListener('mousedown', function (evt) {
        if (mouse_up) {
            mouse_up = false;
            if(!showControlPanel) {
                change_tile();
            }
        }
        draggedY = getMousePosition(canvas, evt).y;
    });

    canvas.addEventListener('mouseup', function (evt) {
        mouse_up = true;
        draggedY = 0;
    });

    if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', wheel, false);
    /** IE/Opera. */
    window.onmousewheel = document.onmousewheel = wheel;
}

function handle(delta) {
    console.log(delta);
    scrollCamera(-(delta * SCROLL_SPEED * 15));
}

/** Event handler for mouse wheel event.
 */
function wheel(event) {
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta / 120;
    } else if (event.detail) { /** Mozilla case. */
        /** In Mozilla, sign of delta is different than in IE.
         * Also, delta is multiple of 3.
         */
        delta = -event.detail / 3;
    }
    /** If delta is nonzero, handle it.
     * Basically, delta is now positive if wheel was scrolled up,
     * and negative, if wheel was scrolled down.
     */
    handle(delta);
    /** Prevent default actions caused by mouse wheel.
     * That might be ugly, but we handle scrolls somehow
     * anyway, so don't bother here..
     */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}


function setCursorPosition(evt) {
    mousePosition = getMousePosition(canvas, evt);
    var tile_x = Math.floor(mousePosition.x / BRICK_W);
    var tile_y = Math.floor((mousePosition.y + camPanY) / BRICK_H);

    current_row = Math.floor(tile_x * BRICK_W);
    current_column = Math.floor(tile_y * BRICK_H);
    var tileCol = Math.floor(current_column / BRICK_H);
    var tileRow = Math.floor(current_row / BRICK_W);
    selectedBrickIndex = brickTileToIndex(tileRow, tileCol)
}

function change_tile(changeTo) {
    removeImgFromBrick();
    if (changeTo) {
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