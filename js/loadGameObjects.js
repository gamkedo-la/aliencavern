
var aliens = [];
var alienPlants = [];
var crew = [];
var shipParts = [];

function GameObject(){
    this.pic = document.createElement("img");
    this.alive  = true;
    this.collision = false;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.type;
}

// loads any game object from the level / cavern array
function loadGameObjects(objectArray, objectPic, gameObjectType){
    this.objectArray = objectArray;
    this.objectPic = objectPic;
    this.gameObjectType = gameObjectType;
    for (var i = 0;  i < BRICK_ROWS * BRICK_COLS; i++ ){
        if (cavernGrid[i] == gameObjectType){
            this.objectArray.push(new GameObject());
            cavernGrid[i] = BKGND_ROCK;
            var pos = this.objectArray.length - 1;
            var row = Math.floor(i / BRICK_COLS);
            var col = i % BRICK_COLS;
            this.objectArray[pos].x = col * BRICK_W;
            this.objectArray[pos].y = row * BRICK_H;
            this.objectArray[pos].pic = this.objectPic;
            console.log (this.objectArray[pos]);
            // var col = math.floor()
            // aliens[aliens.length - 1].x = 

        }
    }
}

function drawGameObjects(gameObject){
    this.gameObject = gameObject;
    this.gameObject.forEach(function(element) {
        canvasContext.drawImage(element.pic, element.x, element.y);
    });
}