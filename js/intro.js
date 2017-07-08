//Variables
var storyText = [new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText(), new storyLineOfText(),
                 new storyLineOfText()];
var storyX;
var storyMinSize;
var storyMinY;
var isIntro; //= true;
var timeElapsed = 0;
//Constants
var STORY_FONT_SIZE; //must be initialized in main.js, but is used as a const
const STORY_FONT = 'Helvetica';
const STORY_MOVEMENT_SPEED = 0.5;
const STORY_MAX_TIME = 10;
var STORY_Y; //must be initialized in main.js, but is used as a const
const STORY_FONT_COLOR = 'WHITE';
const LINE0 = 'It is the year 2045 on the planet Mars.';
const LINE1 = 'Disaster has struck during a routine agroforestry expedition.';
const LINE2 = 'Miles away from E.C. (Earth Colony) Evalos, hundreds of';
const LINE3 = 'sinkholes have appeared, swallowing a number of your';
const LINE4 = 'colleagues.  Luckily, some of them are still alive!';
const LINE5 = 'The survivors have reported via radio transmission that';
const LINE6 = 'not only do the sinkholes run deep, but some have';
const LINE7 = "reported spotting alien life, and they don't seem friendly.";
const LINE8 = 'As the captain and sole crew member of the STS Cydonia,';
const LINE9 = 'you have been tasked with rescuing as many survivors as';
const LINE10 = 'you possibly can.  You are their only hope!';
const LINE11 = '';
const LINE12 = 'Good luck and godspeed!';
const LINE_SPACING = 50;
var STORY_X; //must be initialized in main.js, but is used as a const

function storyLineOfText(line){ // Defined as a class.
    this.y = STORY_Y;
    this.size = STORY_FONT_SIZE;
    this.line = line;
}

function fillBlackBG(){
    colorRect(0,0,canvas.width,canvas.height,'black');
}

function setStoryFont(size, font, color){
    canvasContext.font = size + "px " + font;
    canvasContext.fillStyle = color;
    canvasContext.textAlign = 'center';
}

function displayText(text, x, y){
    canvasContext.fillText(text, x, y);
}

function pressPToSkip(){
    canvasContext.font = '15px Helvetica';
    canvasContext.fillStyle = 'WHITE';
    canvasContext.textAlign = 'start';
    displayText('(P) SKIP', 0, 15);
}

function displayStory(){
    displayText(storyText[0].line, STORY_X, storyText[0].y);
    displayText(storyText[1].line, STORY_X, storyText[1].y);
    displayText(storyText[2].line, STORY_X, storyText[2].y);
    displayText(storyText[3].line, STORY_X, storyText[3].y);
    displayText(storyText[4].line, STORY_X, storyText[4].y);
    displayText(storyText[5].line, STORY_X, storyText[5].y);
    displayText(storyText[6].line, STORY_X, storyText[6].y);
    displayText(storyText[7].line, STORY_X, storyText[7].y);
    displayText(storyText[8].line, STORY_X, storyText[8].y);
    displayText(storyText[9].line, STORY_X, storyText[9].y);
    displayText(storyText[10].line, STORY_X, storyText[10].y);
    displayText(storyText[11].line, STORY_X, storyText[11].y);
    displayText(storyText[12].line, STORY_X, storyText[12].y);
    console.log('displayStory() ran \n' + storyText[11].line + '\ny = ' + storyText[11].y);
}

function goToGame(){
    canvasContext.textAlign = 'start'; //This un-centers the text before going back to the game.
    canvasContext.font = "10px Comic Sans MS"; //resets the font size for the game
    isIntro = false;
    gameScreen = true;
}

function introScreen(){
    fillBlackBG();
    pressPToSkip();
    setStoryFont(STORY_FONT_SIZE, STORY_FONT, STORY_FONT_COLOR);
    storyText[0].line = LINE0;
    storyText[1].line = LINE1;
    storyText[2].line = LINE2;
    storyText[3].line = LINE3;
    storyText[4].line = LINE4;
    storyText[5].line = LINE5;
    storyText[6].line = LINE6;
    storyText[7].line = LINE7;
    storyText[8].line = LINE8;
    storyText[9].line = LINE9;
    storyText[10].line = LINE10;
    storyText[11].line = LINE11;
    storyText[12].line = LINE12;
    for (var i = 1; i <= 12; i++){
        storyText[i].y = storyText[i - 1].y + LINE_SPACING;
    }
    //storyText[1].y = storyText[0].y + LINE_SPACING;
    displayStory();
    
        
    if (frameCounter == 1){
        timeElapsed++;
        console.log('timeElapsed = ' + timeElapsed);
    }
    if (timeElapsed >= STORY_MAX_TIME && storyText[12].y <= 0){ // Kind of convoluted but it works... for now.
        goToGame();
    }
    if (timeElapsed % 0.5 == 0 && storyText[12].y > 0){
        storyText[0].y-=STORY_MOVEMENT_SPEED;
        console.log('moved text');
    }
}

