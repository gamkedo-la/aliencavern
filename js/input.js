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
const KEY_S = 83; 
const KEY_D = 68;
const KEY_C = 67;
const KEY_A = 65;
const KEY_LEFT_SQ_BRACKET = 219;
const KEY_RIGHT_SQ_BRACKET = 221;

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var jumping = false;
var usingJetpack = false;

var gameScreen = true;
var editorScreen = false;

var gamePaused = false;

var soundVolume = 0.05;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
if (thisKey === KEY_ESC){
    currentLevel = LEVEL_ONE;
    gameState = MENU;
}

if (thisKey === KEY_A) {
    Sound.unMute();
}
if (thisKey === KEY_S){
    Sound.Mute();
}

function checkKeysInGame(){
    switch(thisKey){
      case KEY_M:
        if (!projectiles[0].alive){
          projectiles[0].alive = true;
          fireMissile();
        }
        break;
      case KEY_RIGHT_ARROW:
        holdRight = setTo;
        playerFacingRight = true;
        break;
      case KEY_X:
        holdRight = setTo;
        playerFacingRight = true;
        break;
      case KEY_LEFT_ARROW:
        holdLeft = setTo;
        playerFacingRight = false;
        break;
      case KEY_Z:
        holdLeft = setTo;
        playerFacingRight = false;
        break;
      case KEY_SPACE:
        if(playerOnGround) { //could be made a separate bool for making jumps consumable
          jumping = setTo;
        }
        else if (playerOnGround === false) {
          usingJetpack = setTo; //if mid-fall, use jetpack!
        }
        break;
        //Used for testing pause
        case KEY_L:
          //gamePaused = !gamePaused;
          gameState = LOSE_SCREEN;
        break;
    }    
}   

// TODO : roll up all code below and take actions on gamestate
switch (gameState){
  case MENU:
    if (thisKey === KEY_L){
        gameState = LEVEL_EDITOR;
        levelEditorInitialization();
    }
    else if(thisKey === KEY_P) {
      goToGame();
      resetGame();
      gameState = GAME_STORY_MODE;
    }
    else if(thisKey === KEY_C) {
      gameState = CREDITS;
    }
    else if(thisKey === KEY_M){
      currentLevel = MY_LEVEL;
      goToGame();
      resetGame();
      
      gameState = GAME_STORY_MODE;
    }
    break;
  case INTRO_STORY || GAME_OVER:
    if (thisKey === KEY_ESC){
      gameState = MENU;
    }
    break;
  case GAME_STORY_MODE:  
    checkKeysInGame();
    break;
  }
}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}