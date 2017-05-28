const GROUND_FRICTION = 0.01;
const AIR_RESISTANCE = 1;
const RUN_SPEED = 2.0; // org 4.0
const JUMP_POWER = 1.0;  
const GRAVITY = 0.08;

var playerX = 75, playerY = 75;
var playerSpeedX = 0, playerSpeedY = 0;
var playerOnGround = false;
var player_RADIUS = 8;


function playerReset() {
    playerX = canvas.width/2;
    playerY = 20;
}

function playerMove() {
   if(playerOnGround) {
      playerSpeedX *= GROUND_FRICTION;
    } else {
      playerSpeedX *= AIR_RESISTANCE;
      playerSpeedY += GRAVITY;
      if(playerSpeedY > player_RADIUS) { // cheap test to ensure can't fall through floor
        playerSpeedY = player_RADIUS;
      }
    }
  
    if(holdLeft) {
      playerSpeedX = -RUN_SPEED;
    }
    if(holdRight) {
      playerSpeedX = RUN_SPEED;
    }
    
    if(playerSpeedY < 0 && isBrickAtPixelCoord(playerX,playerY - player_RADIUS) > 0) {
      playerY = (Math.floor( playerY / BRICK_H )) * BRICK_H + player_RADIUS;
      playerSpeedY = 0.0;
    }
    
    if(playerSpeedY > 0 && isBrickAtPixelCoord(playerX, playerY + player_RADIUS) > 0) {
      playerY = (1+Math.floor( playerY / BRICK_H )) * BRICK_H - player_RADIUS;
      playerOnGround = true;
      playerSpeedY = 0;
    } else if(isBrickAtPixelCoord(playerX,playerY+player_RADIUS+2) == 0) {
      playerOnGround = false;
    }
    
    if(playerSpeedX < 0 && isBrickAtPixelCoord(playerX-player_RADIUS, playerY) > 0) {
      playerX = (Math.floor( playerX / BRICK_W )) * BRICK_W + player_RADIUS;
    }
    if(playerSpeedX > 0 && isBrickAtPixelCoord(playerX+player_RADIUS, playerY) > 0) {
      playerX = (1+Math.floor( playerX / BRICK_W )) * BRICK_W - player_RADIUS;
    }
    
    playerX += playerSpeedX; // move the player based on its current horizontal speed 
    playerY += playerSpeedY; // same as above, but for vertical
    
    // clamp max velocity
    if (playerSpeedY > 2.0){
        playerSpeedY = 2.0;
    }
  }

