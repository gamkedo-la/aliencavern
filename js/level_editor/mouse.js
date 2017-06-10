var currentMousePos;
var iconActionToTake;
const LEFT_CLICK = 0;
const RIGHT_CLICK = 2;

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function onIconClick(x, y, width, height, callback) {
    if (currentMousePos.x > x && currentMousePos.x < x + width &&
        currentMousePos.y > y && currentMousePos.y < y + height) {
        iconActionToTake = callback
    }
}


function mouseEvenets() {
    canvas.addEventListener('mousemove', function (evt) {
        currentMousePos = getMousePosition(canvas, evt);
        if (!mouse_up && moveMode) {
            var delta = draggedY - currentMousePos.y;
            if (camPanY < 2586 + 250) {
                scrollCamera(delta)
            } else if (camPanY > 2586 + 250 && delta < 0) {
                scrollCamera(-80)
            }

        } else if (!moveMode) {
            setCursorPosition(evt);
        }
    });

    canvas.addEventListener('mousedown', function (evt) {
        if (evt.button === LEFT_CLICK) {
            if (mouse_up) {
                mouse_up = false;
                if (!showControlPanel && !moveMode) {
                    change_tile();
                } else if (showControlPanel && iconActionToTake) {
                    iconActionToTake();

                }
            }
            draggedY = currentMousePos.y;
        }

        if (evt.button === RIGHT_CLICK) {
            change_tile(0);
        }
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
    delta = delta * 256;
    var heightOfLevel =
        console.log(delta);
    if (camPanY + delta < 2586) {
        scrollCamera(-(delta * 256));
    } else if (camPanY >= 2586 - 256) {
        scrollCamera(-(Math.abs(delta) * 256));
    }
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
    setCursorPosition(event);
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


function preventRightClickToDisplayContextMenu(){
    canvas.oncontextmenu = function (e) {
        e.preventDefault();
    };
}