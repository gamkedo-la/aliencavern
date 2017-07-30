const GROUND_FRICTION = 0.01;
const AIR_RESISTANCE = 1;
const GRAVITY = 0.08;
const RUN_SPEED = 5.0; // org 4.0
const JUMP_POWER = 3.0;  // org 4.0
const JETPACK_UPTHRUST = 0.10;
const JETPACK_CONSUMPTION = 0.02;
const JETPACK_BASE_REGEN = 0.025;
const JETPACK_MIN_FUEL = 10;

var playerX = 400, playerY = 75;
var playerSpeedX = 0, playerSpeedY = 0;
var playerOnGround = false;
var player_RADIUS = 30;
var playerFacingRight = true;

var jetpackFuel = JETPACK_MIN_FUEL;

const MAX_HEALTH = 1000;
const DAMAGE_SCRAPE = 1;
const DAMAGE_PLANT = 100;
const DAMAGE_SPIKE = 150;
const DAMAGE_LAVA = 200;
const DAMAGE_CREW = -150; // you GAIN some health! =)
const DAMAGE_GROUND = 5;
const DAMAGE_BUMP = 1;
var playerHealth = MAX_HEALTH;
const DRAG_FORCE = 0.9;

const RESCUES_REQUIRED = 10; // to complete level
var rescueCounter = 0; // how many crew rescued?

function playerReset() {
    playerX = canvas.width/2;
    playerY = BRICK_H + 10;
    camPanX = 30.0;
    camPanY = 30.0;
    playerHealth = MAX_HEALTH;
    rescueCounter = 0;
    jetpackFuel = JETPACK_MIN_FUEL;
}

function groundPlayer() {

    playerOnGround = true;
    jumping = false;
    usingJetpack = false;

    Sound.play("ground",false,soundVolume);

    // particles where the lander feet hit the ground
    party(playerX-24, playerY, PARTICLE_DUST); // left
    party(playerX+24, playerY, PARTICLE_DUST); // right

    // rattle the screen a little
    screenshake(10);
    
    takeDamage(DAMAGE_GROUND);

}

function checkFuel() { //Is there enough fuel for this frame? Felt like making this a full function... :P
    var fuelCheck = jetpackFuel - JETPACK_CONSUMPTION;
    if (fuelCheck <= 0) {
        jetpackFuel = 0;

        if (!Sound.isPlaying('outoffuel')) Sound.play('outoffuel',false,soundVolume);

        return false;
    }
    else {
        return true;
    }
}

function fuelRegen(regenAmount) { //made it a function for eventual regen power-ups
    if (jetpackFuel < JETPACK_MIN_FUEL){
        jetpackFuel += regenAmount; 
    }
}

function playerDie()
{
    console.log("Player DIED!");
	party(playerX, playerY, PARTICLE_SHIP_EXPLOSION,null,null,null,10); // 10 fps
    playerReset();
}

function rescueAstronaut()
{
    rescueCounter++;

    console.log("rescueAstronaut " + rescueCounter + " of " + RESCUES_REQUIRED);

    if (rescueCounter>=RESCUES_REQUIRED)
    {
        // TODO: win the game? finish the level? GAME OVER?
        console.log("Crew rescued! Level complete!")
        currentLevel = currentLevel + 1;
        if (currentLevel == LEVEL_EIGHT){
            gameState = MENU;
        }
        else {
            resetGame();
        }
    }

}

function takeDamage(amount)
{
    if (!amount) return;
    console.log("Taking damage: " + amount);

    playerHealth -= amount;
    if (playerHealth>MAX_HEALTH)
        playerHealth=MAX_HEALTH;

    if (playerHealth<1)
        playerDie();

}

function playerMove() {
   if (cheatsOn){
       jetpackFuel = JETPACK_MIN_FUEL;
   }
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
            Sound.play('scrape',true,soundVolume); // looped and super quiet

        takeDamage(DAMAGE_SCRAPE);
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
      party(playerX+60,playerY+6,PARTICLE_BOOST_L);
    }
    else if(holdRight) {
      playerSpeedX = RUN_SPEED;
      party(playerX-60,playerY+6,PARTICLE_BOOST_R);
    }
    else {
        playerSpeedX *= DRAG_FORCE;
    }
    
    // PLAYER COLLISION DETECTION WITH GAME OBJECTS 
    // ON RETURN BOOL TAKE ACTION
    //
    if (checkEveryCollision (crew)){
        console.log("picked up crew");
        Sound.play("rescue", false, soundVolume);
        takeDamage(DAMAGE_CREW); // gain health
        rescueAstronaut(); 
    }

    if (checkEveryCollision (fuelCans)){
        jetpackFuel = jetpackFuel + 100;
    }

    checkEveryCollision (shipParts);
    if (checkEveryCollision(alienPlants) || checkEveryCollision (alienPlants2)){
        takeDamage(DAMAGE_PLANT);
        console.log("alien plant hit");
    }
    
    if (checkEveryCollision (lava)){
        console.log("Hit lava it hurts!!!");
        takeDamage(DAMAGE_LAVA);
    }

    if(isBrickAtPixelCoord(playerX, playerY - player_RADIUS) > 0) {
      playerY = (Math.floor( playerY / BRICK_H )) * BRICK_H + player_RADIUS + 2;
      playerSpeedY = 0;
    }
    
    var horizCollisionFootSpread = 20;
    if(playerSpeedY > 0 && 
        (isBrickAtPixelCoord(playerX-horizCollisionFootSpread, playerY + player_RADIUS) > 0 || 
          isBrickAtPixelCoord(playerX+horizCollisionFootSpread, playerY + player_RADIUS) > 0)) {
      playerY = (1+Math.floor( playerY / BRICK_H )) * BRICK_H - player_RADIUS;
      groundPlayer();
      playerSpeedY = 0;
    } else if(isBrickAtPixelCoord(playerX-horizCollisionFootSpread,playerY+player_RADIUS+2) == 0 &&
              isBrickAtPixelCoord(playerX+horizCollisionFootSpread,playerY+player_RADIUS+2) == 0) {
      playerOnGround = false;
    }
    
    var sideCollisionVertSpread = 10;
    if(playerSpeedX < 0 && (isBrickAtPixelCoord(playerX-player_RADIUS, playerY - sideCollisionVertSpread) > 0
     || isBrickAtPixelCoord(playerX-player_RADIUS, playerY + sideCollisionVertSpread) > 0)) {
      playerX = (Math.floor( playerX / BRICK_W )) * BRICK_W + player_RADIUS;
      if (!Sound.isPlaying('bump')) Sound.play('bump',false,soundVolume);
      takeDamage(DAMAGE_BUMP);
	  playerSpeedX = 0;
    }

    if(playerSpeedX > 0 && (isBrickAtPixelCoord(playerX+player_RADIUS, playerY - sideCollisionVertSpread) > 0
     || isBrickAtPixelCoord(playerX+player_RADIUS, playerY + sideCollisionVertSpread) > 0)) {
      playerX = (1+Math.floor( playerX / BRICK_W )) * BRICK_W - player_RADIUS;
      if (!Sound.isPlaying('bump')) Sound.play('bump',false, soundVolume);
      takeDamage(DAMAGE_BUMP);
	  playerSpeedX = 0;
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

        if (!Sound.isPlaying("thrust")) Sound.play("thrust", true, soundVolume); // FIXME: should be looped and we change the volume

        // thruster particles w wobble
        party(playerX+28+(Math.random()*4-2),playerY+26+(Math.random()*4-2),PARTICLE_THRUST); // right
        party(playerX-28+(Math.random()*4-2),playerY+26+(Math.random()*4-2),PARTICLE_THRUST); // left

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
