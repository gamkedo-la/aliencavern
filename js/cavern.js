const BRICK_W = 60;
const BRICK_H = 60;
const BRICK_GAP = 1;
const BRICK_COLS = 14;
const BRICK_ROWS = 54; 

var cavernGrid =
 [1,2,3,0,0,0,0,0,4,2,2,2,2,5,
  1,3,0,0,0,0,0,0,0,0,4,2,2,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,4,3,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,2,3,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,2,2,5,
  1,0,0,0,0,4,3,0,0,4,2,2,5,5,
  1,3,0,0,0,0,0,0,0,0,0,0,5,5,
  1,0,0,0,0,0,0,0,0,0,0,0,5,5,
  1,0,0,0,0,0,0,0,0,0,0,0,5,5,
  1,2,2,0,0,0,0,0,0,0,0,0,4,5,
  1,2,3,0,0,0,4,3,0,0,0,0,1,5,
  1,3,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,1,1,1,5,
  1,0,0,0,0,0,0,0,0,0,0,0,1,1,
  1,2,2,3,0,0,0,0,0,0,0,0,0,5,
  1,1,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,2,0,0,0,0,0,5,
  1,2,3,0,0,0,0,0,0,0,2,2,2,5,
  1,0,0,0,0,0,0,0,0,0,4,2,2,5,
  1,1,0,0,0,0,0,0,0,0,0,4,2,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,0,0,5,
  1,0,4,3,0,0,0,0,0,0,0,0,0,5,
  1,0,0,0,0,0,0,0,0,0,0,2,2,5,
  1,0,0,0,0,0,0,0,0,0,0,2,2,5,
  1,2,2,2,0,0,0,4,2,2,2,2,2,5,
  1,2,2,2,0,0,0,0,2,2,2,2,2,5,
  1,2,2,0,0,0,0,0,4,2,2,2,2,5,
  1,2,2,0,0,0,0,0,0,0,4,2,2,5,
  1,2,2,0,1,1,0,0,0,0,0,0,0,5,
  1,2,2,0,0,0,0,0,0,0,0,4,2,5,
  1,2,2,0,0,0,0,0,0,0,0,0,4,5,
  1,2,2,0,0,0,0,0,0,0,0,0,0,5,
  1,2,2,2,2,3,0,0,0,0,0,4,2,5,
  1,2,2,2,3,0,0,0,0,0,0,0,0,5,
  1,2,2,2,0,0,0,0,0,0,0,0,0,5,
  1,2,2,3,0,0,0,0,0,0,0,0,0,5,
  1,2,2,0,0,2,0,0,0,4,2,2,2,5,
  1,2,2,3,0,0,0,0,0,0,4,2,2,5,
  1,2,0,0,0,0,0,0,0,0,0,4,2,5,
  1,2,2,0,0,0,0,0,0,0,0,0,0,5,
  1,2,2,0,0,0,0,0,0,0,0,0,0,5,
  1,2,2,0,0,0,4,3,0,0,4,3,0,5,
  1,2,2,2,0,0,0,0,0,0,0,0,0,5,
  1,2,2,2,0,0,0,0,0,0,0,0,0,5,
  1,2,3,0,0,0,0,4,3,0,4,2,2,5,
  1,2,2,2,0,0,0,0,0,0,0,0,2,5,
  1,2,2,2,3,0,0,0,0,0,0,4,2,5,
  1,2,3,0,0,0,0,0,0,0,0,0,0,0,
  1,2,2,2,2,2,2,2,2,2,2,2,2,0];

const BKGND_ROCK = 0;
const WALL_ROCK_R = 1;
const RIDGE_ROCK_M = 2;
const RIDGE_ROCK_R = 3;
const RIDGE_ROCK_L = 4;
const WALL_ROCK_L = 5;

function brickTileToIndex(tileCol, tileRow) {
  return (tileCol + BRICK_COLS*tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow) {
  var brickIndex = brickTileToIndex(brickTileCol, brickTileRow);
  return (cavernGrid[brickIndex]);
}

function isBrickAtPixelCoord(hitPixelX, hitPixelY) {
  var tileCol = hitPixelX / BRICK_W;
  var tileRow = hitPixelY / BRICK_H;
  
  // using Math.floor to round down to the nearest whole number
  tileCol = Math.floor( tileCol );
  tileRow = Math.floor( tileRow );

  // first check whether the slider is within any part of the brick wall
  if(tileCol < 0 || tileCol >= BRICK_COLS ||
      tileRow < 0 || tileRow >= BRICK_ROWS) {
      return false;
  }
  
  var brickIndex = brickTileToIndex(tileCol, tileRow);
  return (cavernGrid[brickIndex]);
}

function drawOnlyCavernOnScreen() {
    // what are the top-left most col and row visible on canvas?
    var cameraLeftMostCol = Math.floor(camPanX / BRICK_W);
    var cameraTopMostRow = Math.floor(camPanY / BRICK_H);
    // how many columns and rows of tiles fit on one screenful of area?
    var colsThatFitOnScreen = Math.floor(canvas.width / BRICK_W);
    var rowsThatFitOnScreen = Math.floor(canvas.height / BRICK_H);
    // finding the rightmost and bottommost tiles to draw.
    // the +1 and + 2 on each pushes the new tile popping in off visible area
    // +2 for columns since BRICK_W doesn't divide evenly into canvas.width
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 2;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 1;
    for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
      for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {                   
          var brickLeftEdgeX = eachCol * BRICK_W;
          var brickTopEdgeY = eachRow * BRICK_H;
          var tileKindHere = cavernGrid[brickTileToIndex(eachCol, eachRow)];
          //debug(eachRow + "R C" + eachCol, brickTileToIndex(eachCol, eachRow));
          var useImg = cavernPics[tileKindHere];

          canvasContext.drawImage(useImg, brickLeftEdgeX, brickTopEdgeY);
      } // end of for eachRow
    } // end of for eachCol
  } // end of drawBricks()