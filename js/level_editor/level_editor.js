const TOP_LEFT = 0;
const BOTTOM_RIGHT = 0
const BOTTOM_LEFT = 0;

function levelEditorInitialization() {
    preventRightClickToDisplayContextMenu();
    colorRect(0, 0, screen.width, screen.height, 'black');
    drawDefaultCavern();
    setCamera();
    initKeybindings();
}

function drawTools(){
    var xPos = 0;
    var yPos = TOOL_H;
    var delta = 0; // Allows the tiles to be placed two at a time

    colorRect(camPanX, (TOOL_H - 8) + camPanY, BRICK_W + 2, (TOOL_H * (toolOrder.length / 2)) + 16, "rgba(0, 0, 64, 0.8)");

    if (currentTool == toolState.gameobjects){
        toolOrder = [];
        toolOrder = [
            ALIEN_SQUID, ALIEN_BITER, ALIEN_PLANT, ALIEN_PLANT_2,
            CREW, SHIP_PART, FUEL, LAVA, SPIKES, GEYSERS
        ];
        for (var i = 0; i < toolOrder.length; i++){
            var tileKindHere = toolOrder[i];
            var isEven = i % 2;
            imageList.forEach(function(element){
                if (element.theTileNum != undefined && tileKindHere == element.theTileNum){
                canvasContext.drawImage(element.varName, 0,0, BRICK_W, BRICK_H, xPos + camPanX + delta, yPos + 
                    camPanY, TOOL_W , TOOL_H);
                }
            });

            if (isEven == 0 ){
                delta = TOOL_W;
            }
            else{            
                delta = 0;
                yPos = yPos + TOOL_H;
            }

        }
    } else if (currentTool == toolState.cavernone){
        // create an array of numbers from cavern grid length
        toolOrder = [];
        for (var i = 0; i < 10; i++){
            toolOrder[i] = i + 1;
        }

        for (var i = 0; i < toolOrder.length; i++){
        var tileKindHere = toolOrder[i];
        var isEven = i % 2;
        canvasContext.drawImage(cavernTileSheet, i * BRICK_W, 0, BRICK_W, BRICK_H, xPos + camPanX + delta, yPos + 
            camPanY, TOOL_W - 1, TOOL_H - 1);

            if (isEven == 0 ){
                delta = TOOL_W;
            }
            else{            
                delta = 0;
                yPos = yPos + TOOL_H;
            }
        }
    }
}
        

function drawTilesOnScreen(){

    var tileImg = document.createElement("img");
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
          if (tileKindHere >= TILE_FIRST_NON_WALL){
            imageList.forEach(function(element){
                if (element.theTileNum != undefined && tileKindHere == element.theTileNum){
                    canvasContext.drawImage(element.varName, 0, 0, BRICK_W, BRICK_H, 
                        brickLeftEdgeX, brickTopEdgeY, BRICK_W, BRICK_H);
                }
            });
          }

        canvasContext.drawImage(cavernTileSheet, (tileKindHere -1) * BRICK_W, 0, BRICK_W, BRICK_H, brickLeftEdgeX, brickTopEdgeY, BRICK_W, BRICK_H);
      } // end of for eachRow
    } // end of for eachCol
  } // end of drawBricks()

function drawMiniMap(){
    var colCount = 0;
    var rowCount = 0;
    var tileX = canvas.width - (BRICK_COLS * 3) - 10;
    var tileY = 10;

    var cameraTopMostRow = Math.floor(camPanY / BRICK_H);
    var rowsThatFitOnScreen = Math.floor(canvas.height / BRICK_H);

    colorRect(tileX , tileY + (cameraTopMostRow * 3) + camPanY, BRICK_COLS * 3, rowsThatFitOnScreen * 3, "rgba(0,0,255, 0.7)");

    cavernGrid.forEach(function(element) {
        if (element){
            if (element < 10){
                colorRect (tileX + (3 * colCount) + camPanX , tileY + (3 * rowCount) + camPanY, 3, 3, "cyan");
            }
            else {
                colorRect (tileX + (3 * colCount) + camPanX , tileY + (3 * rowCount) + camPanY, 3, 3, "red");
            }
        }
        colCount++;
        if (colCount == BRICK_COLS){
            colCount = 0;
            rowCount++;
        }
    });
}

function drawLevelEditor() {
    canvasContext.save();
    canvasContext.translate(-camPanX, -camPanY);
    drawOnlyCavernOnScreen();
    drawTilesOnScreen();
    drawMiniMap();
    drawTools();
    drawHint();
    if (showControlPanel == false && !outOfBounds() ){
        drawHighlightRect(current_row, current_column);
        canvasContext.drawImage(currentToolTile, tileNo * BRICK_W , 0, BRICK_W, BRICK_H, current_row, current_column, BRICK_W, BRICK_H);
    }
    else if (showControlPanel == false && currentMousePos.x < BRICK_W)
    {
       drawHighlightCircle(currentMousePos.x, currentMousePos.y, 6, "magenta");
    }
    canvasContext.restore();
    
    if (showControlPanel) {
        new initControlPanel(50, 50);
    }  
}


function drawDefaultCavern() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    var rows = BRICK_ROWS;
    var cavern = [];

    for (var i = 0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}

function drawHighlightRect(x, y) {
    canvasContext.strokeStyle = '#FFFF00';
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(x, y, BRICK_W, BRICK_H);
}

function drawHighlightCircle(x, y){
    colorCircle( x, y, 4, "yellow");

}

function drawHint() {
    canvasContext.font = "20px Helvetica";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Press TAB to show control panel", 10, 20 + camPanY);
}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}




