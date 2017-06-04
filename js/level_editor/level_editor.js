var heightlight_row_x;
var heightlight_column_y;

function levelEditorInitialization() {
    colorRect(0,0, screen.width,screen.height, 'black');
    setDefaultCavern();
    setCamera();
}

function drawLevelEditor() {
    drawOnlyCavernOnScreen();
    highlightTile();
    drawHighlightRect(heightlight_row_x, heightlight_column_y);
}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}

function setDefaultCavern() {
    drawBoundries();
}

function drawBoundries() {
    var row = [1,0,0,0,0,0,0,0,0,0,0,0,0,1]
    var rows = 54;
    var cavern = [];

    for(var i=0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}

function highlightTile() {
    canvas.addEventListener('mousemove', function(evt){
        mousePosition = getMousePosition(canvas, evt);
        var tile_x = Math.floor(mousePosition.x / BRICK_W);
        var tile_y = Math.floor(mousePosition.y / BRICK_H);

        heightlight_row_x = tile_x * BRICK_W;
        heightlight_column_y = tile_y * BRICK_H;
    });
}

function getMousePosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function drawHighlightRect(x, y) {
    canvasContext.strokeStyle='#FFFF00';
    canvasContext.lineWidth=2;
    canvasContext.strokeRect(x, y, BRICK_W, BRICK_H);
}