// input functions  
const F1 = 112;
const F2 = 113;
const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_SPACE = 32;
const KEY_M = 77; //fire
const KEY_Z = 90; //left
const KEY_X = 88; //right

var holdLeft = false;
var holdRight = false;
var holdUp = false;
var holdDown = false;

var jumping = false;
var usingJetpack = false;

var gameScreen = true;
var editorScreen = false;

function initInput() {
  document.addEventListener("keydown", keyPressed);
  document.addEventListener("keyup", keyReleased);
}

function setKeyHoldState(thisKey, setTo) {
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
  if (thisKey === KEY_M && !missileFired) { // fire missile
    missileFired = true;     
    fireMissile();  
  }

  if(thisKey === F1) {
    window.location.reload() // Find better way to reset game after exit from editor
    gameScreen = true;
    editorScreen = false;
  }

  if(thisKey === F2) {
    levelEditorInitialization();
    gameScreen = false;
    editorScreen = true;
  }


}

function keyPressed(evt) {
  setKeyHoldState(evt.keyCode, true);
  evt.preventDefault(); // without this, arrow keys scroll the browser!
}

function keyReleased(evt) {
  setKeyHoldState(evt.keyCode, false);
}