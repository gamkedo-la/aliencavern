
function isInRange(object) {
    return mousePosition.x > object.x && mousePosition.x < (object.x + BRICK_W) &&
        mousePosition.y > object.y && mousePosition.y < (object.y + BRICK_H)
}

function getVisibleLevelHeightInPx() {
    return ((cavernGrid.length / BRICK_COLS) * BRICK_H);
}

function outOfBounds(){
    if (currentMousePos.x > BRICK_W && currentMousePos.x < (BRICK_COLS - 1) * BRICK_W){
        return false;
    }
    else {
        return true;
    }
}

function isMouseInPalette(sizeOftoolset){
    if (currentMousePos.y > TOOL_H && currentMousePos.y < TOOL_H * (sizeOftoolset / 2) + TOOL_H){
        return true;
    }
    return false;
}

 function toolIndexAt(x, y) {
    var tileCol = x / TOOL_W;
    var tileRow = y / TOOL_H;
  
//   // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol);
    tileRow = Math.floor( tileRow);
    return (tileCol + (tileRow * 2));
 }    
