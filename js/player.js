const GROUND_FRICTION = 0.01;
const AIR_RESISTANCE = 1;
const GRAVITY = 0.08;
const RUN_SPEED = 4.0; // org 4.0
const JUMP_POWER = 4.0;
const JETPACK_UPTHRUST = 0.10;
const JETPACK_CONSUMPTION = 0.05;
const JETPACK_BASE_REGEN = 0.025;
const JETPACK_MAX_FUEL = 10;

var playerX = 75, playerY = 75;
var playerSpeedX = 0, playerSpeedY = 0;
var playerOnGround = false;
var player_RADIUS = 5;

var jetpackFuel = JETPACK_MAX_FUEL;


function playerReset() {
    playerX = canvas.width/2;
    playerY = 20;
}

function groundPlayer() {

    playerOnGround = true;
    jumping = false;
    usingJetpack = false;

    Sound.play("ground",false,0.5);

    // spawn a spritesheet particle - work in progress!
    party(playerX-32,playerY-64); // TODO define different types of particles

    // rattle the screen a little
    screenshake(10);

}

function checkFuel() { //Is there enough fuel for this frame? Felt like making this a full function... :P
    var fuelCheck = jetpackFuel - JETPACK_CONSUMPTION;
    if (fuelCheck <= 0) {
        jetpackFuel = 0;

        if (!Sound.isPlaying('outoffuel')) Sound.play('outoffuel',false,0.4);

        return false;
    }
    else {
        return true;
    }
}

function fuelRegen(regenAmount) { //made it a function for eventual regen power-ups
    jetpackFuel += regenAmount;
    if (jetpackFuel > JETPACK_MAX_FUEL){ //clamp max fuel
        jetpackFuel = JETPACK_MAX_FUEL;
    }
}

function playerMove() {
   if(playerOnGround) {
       playerSpeedX *= GROUND_FRICTION;
    //    console.log(playerSpeedX);
       fuelRegen(JETPACK_BASE_REGEN); //taken straight from Super Smash's R.O.B ;) feel free to change for a perma-regen

    // scrape sound effect (if moving)
    if (Math.abs(playerSpeedX)<0.001)  
    {
        if (Sound.isPlaying('scrape')) Sound.stop('scrape');
    }
    else // moving
    {
        if (!Sound.isPlaying('scrape'))
            Sound.play('scrape',true,0.05); // looped and super quiet
    }


    } else { // not on the ground
      
      if (Sound.isPlaying('scrape')) Sound.stop('scrape');
      
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
    
    // testing collision detection
    checkEveryCollision (crew);

    if(playerSpeedY < 0 && isBrickAtPixelCoord(playerX,playerY - player_RADIUS) > 0) {
      playerY = (Math.floor( playerY / BRICK_H )) * BRICK_H + player_RADIUS;
      playerSpeedY = 0.0;
    }
    
    if(playerSpeedY > 0 && isBrickAtPixelCoord(playerX, playerY + player_RADIUS) > 0) {
      playerY = (1+Math.floor( playerY / BRICK_H )) * BRICK_H - player_RADIUS;
      groundPlayer();
      playerSpeedY = 0;
    } else if(isBrickAtPixelCoord(playerX,playerY+player_RADIUS+2) == 0) {
      playerOnGround = false;
    }
    
    if(playerSpeedX < 0 && isBrickAtPixelCoord(playerX-player_RADIUS - BRICK_W, playerY) > 0) {
      playerX = (Math.floor( playerX / BRICK_W )) * BRICK_W + player_RADIUS;
      if (!Sound.isPlaying('bump')) Sound.play('bump',false,0.01);
    }

    if(playerSpeedX > 0 && isBrickAtPixelCoord(playerX+player_RADIUS, playerY) > 0) {
      playerX = (1+Math.floor( playerX / BRICK_W )) * BRICK_W - player_RADIUS;
      if (!Sound.isPlaying('bump')) Sound.play('bump',false,0.01);
    }
    
    playerX += playerSpeedX; // move the player based on its current horizontal speed

    //Handle variations regarding Y speed
    if (jumping) {
        playerSpeedY -= JUMP_POWER;
        jumping = false;
        playerOnGround = false;
    }
    else if (usingJetpack && checkFuel()) {
        playerSpeedY -= JETPACK_UPTHRUST;
        jetpackFuel -= JETPACK_CONSUMPTION; //floating point numbers shouldn't be an issue here

        if (!Sound.isPlaying("thrust")) Sound.play("thrust", true, 0.4); // FIXME: should be looped and we change the volume

    }
    if(!usingJetpack) {
         if (Sound.isPlaying("thrust")) Sound.stop("thrust");
    }
    // clamp max velocity
    if (playerSpeedY > 2.0){
        playerSpeedY = 2.0;
    }
    playerY += playerSpeedY;
    //console.log(jetpackFuel);
}

