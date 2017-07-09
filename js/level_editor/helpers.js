function removeImgFromBrick() {
    squiddies = squiddies.map(function (squid, index) {
        if (squid && isInRange(squid)) {
            squiddies.splice(index, 1);
        }
    });
	
	biters = biters.map(function (biter, index) {
        if (biter && isInRange(biter)) {
            biters.splice(index, 1);
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

// function brickTileToIndex(tileCol, tileRow) {
//   return (tileCol + BRICK_COLS*tileRow);
// }

// function isBrickAtTileCoord(brickTileCol, brickTileRow) {
//   var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
//   return (cavernGrid[brickIndex]);
// }

 function toolIndexAt(x, y) {
    var tileCol = x / TOOL_W;
    var tileRow = y / TOOL_H;
  
//   // using Math.floor to round down to the nearest whole number
    tileCol = Math.floor( tileCol);
    tileRow = Math.floor( tileRow);
    return (tileCol + (tileRow * 2));
 }    
//   // first check whether the slider is within any part of the brick wall
//   if(tileCol < 0 || tileCol >= BRICK_COLS ||
//       tileRow < 0 || tileRow >= BRICK_ROWS) {
//       return false;
//   }
  
//   var brickIndex = brickTileToIndex(tileCol, tileRow);
//   return (cavernGrid[brickIndex]);
// }