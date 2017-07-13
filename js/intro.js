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
var startCrawl = false;
var introY = 600;
var logoAlpha = 1;
var timeElapsed = 0;
//Constants
var STORY_FONT_SIZE; //must be initialized in main.js, but is used as a const  // FIX ME: 
const STORY_FONT = 'Helvetica';
const STORY_MOVEMENT_SPEED = 0.5;
const STORY_MAX_TIME = 10;
var STORY_Y; //must be initialized in main.js, but is used as a const // FIX ME:
const STORY_FONT_COLOR = 'WHITE'; // FIX ME:
const TITLE_DISPLAY_TIME = 0.5;
const BG_SCROLL_SPEED = 3;

story = [
"It is the year 2045 on the planet Mars.", 
"Disaster has struck during a routine agroforestry expedition.",
"Miles away from E.C. (Earth Colony) Evalos, hundreds of",
"sinkholes have appeared, swallowing a number of your",
"colleagues.  Luckily, some of them are still alive!",
"The survivors have reported via radio transmission that",
"not only do the sinkholes run deep, but some have",
"reported spotting alien life, and they don't seem friendly.",
"As the captain and sole crew member of the STS Cydonia,",
"you have been tasked with rescuing as many survivors as",
"you possibly can.  You are their only hope!",
"",
"Good luck and godspeed!"];

var LINE_SPACING = 50;
var STORY_X; //must be initialized in main.js, but is used as a const
const SIZE_CHANGE = 0.018;

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

function drawTitleBackGround() {
	canvasContext.drawImage(titlePic, 0, introY, titlePic.width, titlePic.height, 0, 0, titlePic.width, titlePic.height);	
}

function drawLogo() {
	canvasContext.globalAlpha = logoAlpha;
	canvasContext.drawImage(logoPic, canvas.width / 2 - logoPic.width / 2, 4);	
	canvasContext.globalAlpha = 1;
}

function displayText(text, x, y){
    canvasContext.fillStyle = "ORANGE"
    canvasContext.fillText(text, x, y);
    canvasContext.fillStyle = "RED";
    canvasContext.fillText(text, x + 2, y + 1);
    canvasContext.fillStyle = "WHITE";
}

function pressPToSkip(){
    canvasContext.font = "24px Helvetica";
    canvasContext.textAlign = 'start';
    canvasContext.fillStyle = "YELLOW"
    canvasContext.fillText("Press P to PLAY", 10, 25);
    canvasContext.fillStyle = "WHITE";

}

function displayStory(){

    for (var i = 0; i < storyText.length; i++){
        setStoryFont(storyText[i].size, STORY_FONT, STORY_FONT_COLOR);
        displayText(storyText[i].line, STORY_X, storyText[i].y);
    }
}

function goToGame(){
    canvasContext.textAlign = 'start'; //This un-centers the text before going back to the game.
    canvasContext.font = "10px Comic Sans MS"; //resets the font size for the game
    isIntro = false;
    gameScreen = true;
    editorScreen = false;
}

function loadStory(){
    for (var i = 0 ; i < story.length; i++)
    storyText[i].line = story[i];
}

function introScreen(){
    // fillBlackBG();
	drawTitleBackGround();
	pressPToSkip();
	
	if(startCrawl) {
    	loadStory();
		logoAlpha = Math.max(0, logoAlpha - 0.05);	
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
        	storyText[0].size-=SIZE_CHANGE;

        	for (var i = 1; i < storyText.length; i++){
            	if (storyText[i].y < canvas.height){
                	storyText[i].size-=SIZE_CHANGE;
            	}
        	}
    	}

    	for (var i = 0 ; i < storyText.length; i++){
       		if (storyText[i].size < 0){
         		storyText[i].size = 0;
        	}   
    	}
	}
	else {
    	if (frameCounter == 1){
        	timeElapsed++;
        	console.log('timeElapsed = ' + timeElapsed);
    	}
		if(timeElapsed > TITLE_DISPLAY_TIME && timeElapsed % 0.5 === 0) {
			introY = Math.max(0, introY - BG_SCROLL_SPEED);
			if(timeElapsed > 4) {
				timeElapsed = 0;
				startCrawl = true;	
			}
		}
	}
	drawLogo();
}

