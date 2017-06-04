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
    var cameraRightMostCol = cameraLeftMostCol + colsThatFitOnScreen + 1;
    var cameraBottomMostRow = cameraTopMostRow + rowsThatFitOnScreen + 2 ; 
    for(var eachCol=cameraLeftMostCol; eachCol<cameraRightMostCol; eachCol++) {
      for(var eachRow=cameraTopMostRow; eachRow<cameraBottomMostRow; eachRow++) {                   
          var brickLeftEdgeX = eachCol * BRICK_W;
          var brickTopEdgeY = eachRow * BRICK_H;
          var tileKindHere = cavernGrid[brickTileToIndex(eachCol, eachRow)];
          var useImg = cavernPics[tileKindHere];
          if (tileKindHere != BKGND_ROCK){          
            canvasContext.drawImage(cavernTileSheet, (tileKindHere -1) * BRICK_W, 0, BRICK_W, BRICK_H, brickLeftEdgeX, brickTopEdgeY, BRICK_W, BRICK_H);
          }
          else
          {
            canvasContext.drawImage(useImg, brickLeftEdgeX, brickTopEdgeY);
          }
//          canvasContext.drawImage(useImg, brickLeftEdgeX, brickTopEdgeY);

// MDN        void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      } // end of for eachRow
    } // end of for eachCol
  } // end of drawBricks()