var currentMousePos;
var iconActionToTake;
const LEFT_CLICK = 0;
const RIGHT_CLICK = 2;

function setupMouseEvents() {
    onMouseMove();
    onMouseDown();
    onMouseUp();
    // onScroll();
}

function resetMouse() {
    mouse_up = true;
    draggedY = 0;
    iconActionToTake = null;
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function onIconClick(x, y, width, height, callback) {
    if (currentMousePos) {
        y = y - camPanY;
        if (currentMousePos.x > x && currentMousePos.x < x + width &&
            currentMousePos.y > y && currentMousePos.y < y + height) {
            iconActionToTake = callback
        }
    }
}

function onMouseMove() {
    canvas.addEventListener('mousemove', function (evt) {
        currentMousePos = getMousePosition(canvas, evt);
        if (!mouse_up && moveMode) {
            dragScrollLevel();
        } else if (!moveMode) {
            setCursorPosition(evt);
        }
    });
}

function onMouseDown() {
    canvas.addEventListener('mousedown', function (evt) {
        if (evt.button === LEFT_CLICK && mouse_up) {
            LeftMouseActions();
            draggedY = currentMousePos.y;
        }

        if (evt.button === RIGHT_CLICK) {
            change_tile(0);
        }
    });
}


function onMouseUp() {
    canvas.addEventListener('mouseup', function (evt) {
        resetMouse();
    });
}

// NOTE - not currently being used
function onScroll() {
    canvas.addEventListener('mousewheel', function (evt) {
        var delta = -evt.deltaY / 20;
        evt.preventDefault();
        // scrollLevelCamera(delta); // NOW USE camera.js scrollcamera()
        setCursorPosition(evt);
        evt.returnValue = false;
    }, false);
}

function dragScrollLevel() {
    var heightOfLevel = getVisibleLevelHeightInPx();
    var delta = draggedY - currentMousePos.y;

    if (camPanY < heightOfLevel + 250) {
        scrollCamera(delta)
    } else if (camPanY > heightOfLevel + 250 && delta < 0) {
        scrollCamera(-80)
    }
}

function LeftMouseActions() {
    mouse_up = false;
    if (!showControlPanel && !moveMode) {
        change_tile();
    } else if (showControlPanel && iconActionToTake) {
        iconActionToTake();
    }
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

function preventRightClickToDisplayContextMenu() {
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
}
