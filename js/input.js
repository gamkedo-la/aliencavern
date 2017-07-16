// input functions  
const F1 = 112;
const F2 = 113;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_M = 77;
const KEY_Z = 90; //left
const KEY_X = 88; //right
const KEY_ESC = 27; //skip intro
const KEY_P = 80;
const KEY_E = 69;
const KEY_L = 76;
const KEY_V = 86;
const KEY_B = 66;
const KEY_S = 83; //Silence sound

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var jumping = false;
var usingJetpack = false;

var gameScreen = true;
var editorScreen = false;

var soundVolume = 0.05;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
// TODO : roll up all code below and take actions on gamestate
switch (gameState){
  case MENU:
    if (thisKey === KEY_L){
      gameState = LEVEL_EDITOR;
    }
  break;
}

if (thisKey === KEY_V) {
    Sound.unMute();
}

if (thisKey === KEY_S){
Sound.Mute();
}



  if (gameState == GAME_MY_LEVEL || GAME_STORY_MODE){
    if(thisKey === KEY_LEFT_ARROW || thisKey ===KEY_Z) {
      holdLeft = setTo;
    }
    if(thisKey === KEY_RIGHT_ARROW || thisKey === KEY_X) {
      holdRight = setTo;
    }
    if (thisKey === KEY_UP_ARROW || thisKey === KEY_SPACE) {

      if(playerOnGround) { //could be made a separate bool for making jumps consumable
        jumping = setTo;
      }
      else if (playerOnGround === false) {
        usingJetpack = setTo; //if mid-fall, use jetpack!
      }
    }
    if (thisKey === KEY_M && !projectiles[0].alive) { // fire missile
      projectiles[0].alive = true;     
      fireMissile();
    }
    if (thisKey === KEY_ESC){
      // TODO: call Are you sure screen?
      gameState = MENU;
    }
  }
  // if (thisKey === KEY_S && editorScreen == false){
  //   if (soundVolume > 0){
  //     soundVolume = 0;
  //   }
  //   else {
  //     soundVolume = 0.005;
  //   }
  // }

  if(thisKey === F1) {
  //  window.location.reload() // Find better way to reset game after exit from editor
    
  gameState = MENU;
	 introState = INTRO_NONE;
  }

  if(thisKey === F2) {
    gameState = LEVEL_EDITOR;
  }
  
  if(gameState == MENU && thisKey === KEY_P) {
    goToGame();
    resetGame();
    gameState = GAME_STORY_MODE;
  }
  
  if(gameState == INTRO_STORY && thisKey === KEY_ESC) {
    gameState = DISPLAY_LOGO;
  }

}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}