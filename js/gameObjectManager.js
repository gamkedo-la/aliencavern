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
    this.radius = 30;
}

// loads any game object from the level / cavern array
function loadGameObjects(objectArray, objectPic, gameObjectType){
    this.objectArray = objectArray;
    this.objectPic = objectPic;
    this.gameObjectType = gameObjectType;
    for (var i = 0;  i < BRICK_ROWS * BRICK_COLS; i++ ){
        if (cavernGrid[i] == gameObjectType){
            this.objectArray.push(new GameObject());
            // cavernGrid[i] = BKGND_ROCK;
            var pos = this.objectArray.length - 1;
            var row = Math.floor(i / BRICK_COLS);
            var col = i % BRICK_COLS;
            this.objectArray[pos].x = col * BRICK_W;
            this.objectArray[pos].y = row * BRICK_H;
            this.objectArray[pos].pic = this.objectPic;
        }
    }
}

function drawGameObjects(gameObject){
    this.gameObject = gameObject;
    this.gameObject.forEach(function(element) {
        if (element.alive){
            canvasContext.drawImage(element.pic, element.x, element.y);
        }
    });
}

function detectCollision(gameObject1, gameObject2){
    this.object1 = gameObject1;
    this.object2 = gameObject2;
    var collision = false;
return collision;}

function checkCollision(gameObject){
    this.gameObject = gameObject;
    var hit = false;
    var dx = playerX - (this.gameObject.x + this.gameObject.radius);
    var dy = playerY - (this.gameObject.y + this.gameObject.radius);
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player_RADIUS + this.gameObject.radius && this.gameObject.alive) {
        console.log("hit object");
        hit = true;
    }
return hit;}

function checkEveryCollision(objectArray){
    this.objectArray = objectArray;
    objectArray.forEach(function(element){
        if(checkCollision(element)){
            element.alive = false;
            console.log("picked up crew");
            Sound.play("rescue", false, 0.5);
        }
    });
}