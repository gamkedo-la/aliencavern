	STORY_MAX_TIME = 5; 
	STORY_FONT = "Helvetica", 
	STORY_FONT_SIZE = 32,
	STORY_FONT_COLOR = "WHITE",
	STORY_FONT_SIZE_CHANGE = 0.015,
	STORY_MIN_FONT_SIZE = 12,
	STORY_MOVEMENT_SPEED = 0.5,
	BLOCK_SPACE = 100,
	LINE_SPACE = 40,
	BG_SCROLL_SPEED = 2;

	var timeElapsed = 0;
	var startScroll = false;
	var midY = 300;
	var midX = 448;
	var logoAlpha = 0;

	var bgMidY = 600;
	var bgStartY = 0;

	// Variables
	var storyText = [];			 

	var story = [
		["It is the year 2045 on the planet Mars."], 
		["Disaster has struck during a routine agroforestry expedition."],
		["Miles away from E.C. (Earth Colony) Evalos, hundreds of",
			"sinkholes have appeared, swallowing a number of your",
			"colleagues."],  
		["Luckily, some of them are still alive!"],
		["The survivors have reported via radio transmission that",
			"not only do the sinkholes run deep, but some have",
			"reported spotting alien life, and they don't seem friendly."],
		["As the captain and sole crew member of the STS Cydonia,",
			"you have been tasked with rescuing as many survivors as",
			"you possibly can."],
		["You are their only hope!"],
		["Good luck and godspeed!"]];


// Line Object Constructor
function storyLineOfText(theLine, theY){
    this.line = theLine;
    this.y = theY;
    this.size = STORY_FONT_SIZE;
	this.speed = STORY_MOVEMENT_SPEED;
}

function loadStory() {
	var i = 1,
		j = 0,
		y = 0,
		lastY = 0,
		lineSpaces = 0;
		
	// first line of the story is special b/c of y value
	storyText.push(new storyLineOfText(story[0][0], 0));
	
	// rest of the story lines
	for(i; i < story.length; i++) {
		lineSpaces = story[i].length - 1;
		y = lastY - (BLOCK_SPACE + (lineSpaces * LINE_SPACE));
		lastY = y;
	
		do {
			if(j > 0) y += LINE_SPACE;	
			storyText.push(new storyLineOfText(story[i][j], y));
			j++;
		} while(j < story[i].length);
		j = 0;
	}		
}

function goToGame(){
    canvasContext.textAlign = 'start'; //This un-centers the text before going back to the game.
    canvasContext.font = "10px Comic Sans MS"; //resets the font size for the game
	canvasContext.fillStyle = "white";
}

// Font settings
function setStoryFont(size, font, color){
    canvasContext.font = size + "px " + font;
    canvasContext.fillStyle = color;
    canvasContext.textAlign = 'center';
}

function displayStory(){
    for (var i = 0; i < storyText.length; i++){
        setStoryFont(storyText[i].size, STORY_FONT, STORY_FONT_COLOR);
		displayText(storyText[i].line, midX, storyText[i].y);	
    }
}

// Draw functions
function drawTitleBackGround() {
	canvasContext.drawImage(titleBG, 0, bgStartY, titleBG.width, titleBG.height, 0, 0, titleBG.width, titleBG.height);
}

function drawFrontCaverns() {
	bgMidY = titleBG.height / 2;
	canvasContext.drawImage(frontCavPic, 0, (canvas.height - frontCavPic.height) + (bgMidY - bgStartY));	
}

function drawLogo() {
	canvasContext.globalAlpha = logoAlpha;
	canvasContext.drawImage(logoPic, midX - logoPic.width / 2, 4);	
	canvasContext.globalAlpha = 1;
}

function displayText(text, x, y){
    canvasContext.fillStyle = "#ea4f45"
    canvasContext.fillText(text, x, y);	
    canvasContext.fillStyle = "#89f59c"
    canvasContext.fillText(text, x + 1, y + 1);
    canvasContext.fillStyle = "WHITE";
}

function pressStuffToWhatever(key, action){
    canvasContext.font = "18px ShareTechMono";
    canvasContext.textAlign = 'start';
    canvasContext.fillStyle = "YELLOW"
    canvasContext.fillText("Press " + key + " to " + action, 10, canvas.height - 10);
    canvasContext.fillStyle = "WHITE";

}

function introScreen() {
	if(gameState > INTRO) {
		drawTitleBackGround();
		
		// wait for music to have loaded completely
		if (WAIT_FOR_MUSIC_TO_LOAD && !music_has_loaded) return;
		
   		if (frameCounter == 1){
       		timeElapsed++;
   		}
   		if (timeElapsed >= STORY_MAX_TIME && storyText[storyText.length - 1].y > canvas.height + STORY_FONT_SIZE){
			   gameState = DISPLAY_LOGO;
   		}
		
		switch(gameState) {
			case INTRO_STORY:
		   		displayStory();

				if (storyText[storyText.length - 1].y <= titleBG.height){
					var storyObject;
       				for (var i = 0; i < storyText.length; i++){
						storyObject = storyText[i];
						if(storyObject.y > midY + midY / 2) {
							storyObject.speed = Math.min(2.5, storyObject.speed * 1.1);
							if(i === storyText.length - 5) startScroll = true;
						}
						storyObject.y += storyObject.speed;
						if(storyObject.y > 0) storyObject.size = Math.max(STORY_MIN_FONT_SIZE, storyObject.size - STORY_FONT_SIZE_CHANGE);
       				}
				}
			
				if(startScroll) {
					bgStartY = Math.min(bgMidY, bgStartY + BG_SCROLL_SPEED);
					if(bgStartY === bgMidY) startScroll = false;
				}
			break;
			case DISPLAY_LOGO:
				logoAlpha = Math.min(1, logoAlpha + 0.02);
				if(logoAlpha === 1 && timeElapsed > STORY_MAX_TIME + 10) {
					gameState = MENU;
				}
			break;
			case MENU:
				bgStartY = bgMidY;
				logoAlpha = 1;
			break;	
		}

		drawFrontCaverns();
		if(gameState !== MENU) pressStuffToWhatever("ESC", "SKIP");
//		else pressStuffToWhatever("P", "PLAY");
		drawLogo();
	}
}
