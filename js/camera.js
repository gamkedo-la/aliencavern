var camPanX = 30.0;
var camPanY = 30.0;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 75;
const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 50;
//  const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X = 150;
//  const PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y = 100;
  
function cameraFollow() {
    var cameraFocusCenterX = camPanX + canvas.width/2;
    var cameraFocusCenterY = camPanY + canvas.height/2;

    var playerDistFromCameraFocusX = Math.abs(playerX-cameraFocusCenterX);
    var playerDistFromCameraFocusY = Math.abs(playerY-cameraFocusCenterY);

    if(playerDistFromCameraFocusX > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_X) {
        if(cameraFocusCenterX < playerX)  {
        camPanX += RUN_SPEED;
        } else {
        camPanX -= RUN_SPEED;
        }
    }
    if(playerDistFromCameraFocusY > PLAYER_DIST_FROM_CENTER_BEFORE_CAMERA_PAN_Y) {
        if(cameraFocusCenterY < playerY)  {
        camPanY += RUN_SPEED;
        } else {
        camPanY -= RUN_SPEED;
        }
    }

    // instantCamFollow();

    // this next code blocks the game from showing out of bounds
    // (this isn't required, if you don't mind seeing beyond edges)
    if(camPanX < 0) {
        camPanX = 0;
    }
    if(camPanY < 0) {
        camPanY = 0;
    }
    var maxPanRight = BRICK_COLS * BRICK_W - canvas.width;
    var maxPanTop = BRICK_ROWS * BRICK_H - canvas.height;
    if(camPanX > maxPanRight) {
        camPanX = maxPanRight;
    }
    if(camPanY > maxPanTop) {
        camPanY = maxPanTop;
    }
}

function scrollCamera(y) {
    y = y/3000
    camPanX = 0;
    camPanY += y;
    if(camPanY > 0) {
        canvasContext.translate(-camPanX, -y);
    } else {
        camPanY = 0;
        canvasContext.translate(-camPanX, -camPanY);
    }
}