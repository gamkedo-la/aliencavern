var squiddies = [];
var biters = [];
var alienPlants = [];
var alienPlants2 = [];
var crew = [];
var shipParts = [];
var projectiles = [];
var geysers = [];
var spikes = [];
var lava = [];
var fuelCans = [];
var planktonFroggy = [];
var ballAlien = [];
var plankton1 = [];
var plankton2 = [];


var frameCounter = 1;

const SOS_TIMER = 60;

function GameObject(){
    this.pic = document.createElement("img");
    this.alive  = true;
    this.collision = false;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.radius = 30;
    this.frames = 1;
    this.frameNum = 1;
    this.frameTicks = 0;
    this.frameWidth = 64;
    this.frameHeight = 64;
    this.fps = 0;
    this.solid = false;
    this.flip = false;
    
    this.timer = 0;
}

function manageAnimation(spriteObj){
//    if the frame ticks are greater than the frames per sec 
    this.gameObj = spriteObj;
    // if more than zero ticks then animate
    // so if ticks is one then advance the frame
    this.gameObj.frameTicks--;
    if (this.gameObj.frameTicks == 0){
        this.gameObj.frameTicks = Math.round(framesPerSecond / this.gameObj.fps);
        this.gameObj.frameNum++;
        if (this.gameObj.frameNum > this.gameObj.frames){
            this.gameObj.frameNum = 1;
        }
    }

}

// loads any game object from the level / cavern array
function loadGameObjects(objectArray, objectPic, gameObjectType, solid ,noFrames, fps, frameW, frameH){
    this.objectArray = objectArray;
    this.objectPic = objectPic;
    this.gameObjectType = gameObjectType;
    this.noFrames = noFrames;
    this.fps = fps;
    this.frameW = frameW;
    this.frameH = frameH;
    this.solid = solid;

    this.timer = 0;

    for (var i = 0;  i < BRICK_ROWS * BRICK_COLS; i++ ){
        if (cavernGrid[i] == gameObjectType){
            if(gameScreen) {
                cavernGrid[i] = BKGND_ROCK;
            }
            this.objectArray.push(new GameObject());
            var pos = this.objectArray.length - 1;
            var row = Math.floor(i / BRICK_COLS);
            var col = i % BRICK_COLS;
            this.objectArray[pos].x = col * BRICK_W;
            this.objectArray[pos].y = row * BRICK_H;
            this.objectArray[pos].pic = this.objectPic;
            this.objectArray[pos].solid = this.solid;
            // remember what kind of thing we are
            this.objectArray[pos].gameObjectType = gameObjectType;
         
            // Set frame information if passed otherwise use default;
            if (arguments.length > 4){
                this.objectArray[pos].frames = this.noFrames;
                this.objectArray[pos].fps = this.fps;
                this.objectArray[pos].frameTicks = Math.round(framesPerSecond / this.objectArray[pos].fps);
                this.objectArray[pos].frameHeight = this.frameH;
                this.objectArray[pos].frameWidth = this.frameW;
				
				// Randomize starting frame so the animations aren't all synced
				switch(gameObjectType) {
					case ALIEN_SQUID:
					case ALIEN_BITER:
					case CREW:
						this.objectArray[pos].frameNum = 1 + Math.floor(Math.random() * this.noFrames);
						break;
				}
            }
        }
    }
}

function drawGameObjects(gameObjArr){
    this.gameObjArr = gameObjArr;
    this.gameObjArr.forEach(function(element) {
        if (element && element.alive){
//            canvasContext.drawImage(element.pic, element.x, element.y);
            if (element.frameTicks){
                manageAnimation(element);
            }
			if(element.flip) flipSprite(element);
            else canvasContext.drawImage(element.pic, ((element.frameNum - 1) * element.frameWidth), 0, element.frameWidth, element.frameHeight, element.x, element.y, element.frameWidth, element.frameHeight);

            if(element.gameObjectType == CREW) {
                if(element.timer > SOS_TIMER) {
                    element.timer = 0;
                    party(element.x + element.radius, element.y, PARTICLE_SOS, 0, 0, 0, 6);
                } else {
                    element.timer++;
                }
            }
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
    var distance = /*Math.sqrt*/(dx * dx + dy * dy);
    var objRad = player_RADIUS + this.gameObject.radius;
    var objRadSquared = objRad * objRad;
    if (distance < objRadSquared && this.gameObject.alive) {
        // console.log(distance+" , "+objRadSquared);
        // console.log("hit object");
        hit = true;
    }
return hit;}

function checkEveryCollision(objectArray){
    this.objectArray = objectArray;
    objectArray.forEach(function(element){
        if(checkCollision(element)){
            element.alive = false;
            console.log("picked up crew");
            Sound.play("rescue", false, soundVolume);
            takeDamage(DAMAGE_CREW); // gain health
            rescueAstronaut();
        }
    });
}

//compare collisions between two objects and kill both objects
function twoArrayCollisionDetect(objArr1, objArr2){
    this.objArr1 = objArr1;
    this.objArr2 = objArr2;
    this.objArr2.forEach(function(element){
        var dx = this.objArr1[0].x - (element.x + element.radius);
        var dy = this.objArr1[0].y - (element.y + element.radius);
        //var dx = this.objArr1[0].x - (element.x/* + element.radius*/);
        //var dy = this.objArr1[0].y - (element.y/* + element.radius*/);
        //square root is extremely expensive, so it would be better to compare the squares instead
        var distance = /*Math.sqrt*/(dx * dx + dy * dy);
        var objRad = objArr1[0].radius + element.radius;
        var objRadSquared = objRad * objRad;
        if (distance < objRadSquared && element.alive) {
            console.log("hit object");
			if(element.gameObjectType == ALIEN_SQUID) {
				party(element.x + element.radius, element.y + element.radius, 
					PARTICLE_SQUIDDIE_EXPLOSION);
            }
                
            else if(element.gameObjectType == CREW) {
                //playerHealth -= MAX_HEALTH/10;
                takeDamage(MAX_HEALTH/10);
                party(element.x + element.radius, element.y + element.radius, PARTICLE_CREW_DEATH_2, 0, 0, 0, 8);
            }
			
			else {
				party(element.x + element.radius, element.y + element.radius, PARTICLE_EXPLOSION);
			}
			
            if (!objArr1[0].solid){ 
                    objArr1[0].alive= false;
            }
            if (!element.solid){
                element.alive = false;
            }
        }
    });
}

function checkMissleCollisions(){
 //   check collsion aliens, plants, crews
 
    twoArrayCollisionDetect(projectiles, squiddies);
    twoArrayCollisionDetect(projectiles, biters);
    twoArrayCollisionDetect(projectiles, alienPlants);
    twoArrayCollisionDetect(projectiles, crew);
    twoArrayCollisionDetect(projectiles, planktonFroggy);
    twoArrayCollisionDetect(projectiles, ballAlien);
    twoArrayCollisionDetect(projectiles, plankton1);
    twoArrayCollisionDetect(projectiles, plankton2);
    twoArrayCollisionDetect(projectiles, alienPlants2);
    
    if (isBrickAtPixelCoord (projectiles[0].x, projectiles[0].y)){
        Sound.play("explosion", false, soundVolume);
        screenshake(10);
        projectiles[0].alive = false;
    }
}