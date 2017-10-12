// game states
const INTRO = 0;
const DISPLAY_LOGO = 1;
const INTRO_STORY = 2;
const MENU = 3;
const GAME_STORY_MODE = 4;
const GAME_MY_LEVEL = 5;
const GAME_OVER = 6;
const GAME_PAUSED = 7;
const LEVEL_EDITOR  = 8;
const INTRO_PAN = 9;
const CREDITS = 10;
//const LOSE_SCREEN = 11;

const DRAW_CIRCLES_IN_GUI = false; // if false, draw transparent icons on gui

var currentLevel = LEVEL_ONE;

var gameState = INTRO;
const WAIT_FOR_MUSIC_TO_LOAD = true;
var music_has_loaded = false;

var canvas, canvasContext;
var framesPerSecond = 60;

function startGame(){
    gameState = INTRO;
    //getGameObjectsReadyforGame();
    initInput();  
}

function resetGame(){
    setTheLevel();
    clearAllGameObjects();
    getGameObjectsReadyforGame();
    resetScreenShake();
    init_particles();
    playerReset();
}

window.onload = function() {
    currentLevel = LEVEL_ONE;
    if (cheatsOn){
        soundVolume = 0.01;
    }
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    setupMouseEvents();
    cavernTileSheet = levelOneTilePic;	
    // Draw Loading Screen
    colorRect(0,0, screen.width,screen.height, 'black');
    colorText("Game Loading", canvas.width/2, canvas.height/2, 'white');
    loadImages();
    initMissile();
    initInput();
    resetGame();
    
	// a callback gets fired when the file has loaded
	if (WAIT_FOR_MUSIC_TO_LOAD)
	{
		console.log('Waiting for music to download before starting intro...');
		Sound.play("music_loop_slow",false,soundVolume,null,null,musicLoaded);
	}
	else
	{
		Sound.play("music_loop_slow",false,soundVolume);
	}

    // intro.js variables & function calls TODO: refactor this
    midY = canvas.height / 2;
    midX = canvas.width / 2;
    loadStory();
    setInterval(updateAll, 1000/framesPerSecond);
}

function musicLoaded()
{
	console.log('Music has downloaded completely. Intro can begin!');
	music_has_loaded = true;
}

function getGameObjectsReadyforGame(){
    loadGameObjects(squiddies, alienSquidPic , ALIEN_SQUID, false, 2, 3, 64, 64);
	loadGameObjects(biters, alienBiterPic, ALIEN_BITER, false, 2, 3, 64, 64);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT, false);
    loadGameObjects(alienPlants2,alienPlantPic2, ALIEN_PLANT_2, false);
    loadGameObjects(crew, crewPic, CREW, false, 4, 4 , 64, 64);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART, false);
    loadGameObjects(geysers, geyserPic, GEYSERS, true,  8, 8, 64, 64);
    loadGameObjects(lava, lavaPic,LAVA, true, 2,10,64,64);
    loadGameObjects(spikes, spikePic, SPIKES, true);
    loadGameObjects(fuelCans, fuelPic, FUEL, false, 8, 12, 64, 64);
    loadGameObjects(planktonFroggy, planktonFroggyPic, PLANKTON_FROGGY, false, 2, 4, 64, 64);
    loadGameObjects(ballAlien, ballAlienPic, BALL_ALIEN, false, 3, 4, 64, 64);
    loadGameObjects(plankton1, plankton1Pic, PLANKTON1, false, 2, 6, 64, 64);
    loadGameObjects(plankton2, plankton2Pic, PLANKTON2, false, 2, 6, 64, 64);
    loadGameObjects(plankton3, plankton3Pic, PLANKTON3, false, 2, 6, 64, 64);
    loadGameObjects(plankton4, plankton4Pic, PLANKTON4, false, 2, 6, 64, 64);
    loadGameObjects(planktonFroggy2, planktonFroggy2Pic, PLANKTON_FROGGY2, false, 2, 4, 64, 64);
    loadGameObjects(alienPlants3,alienPlantPic3, ALIEN_PLANT_3, false);
    loadGameObjects(alienPlants4,alienPlantPic4, ALIEN_PLANT_4, false, 4, 8, 64, 64);

    // rescue 70% of crew and parts
    totalCrew = crew.length;
    remainingCrew = totalCrew;
    if (totalCrew > 3){
        totalCrew = Math.floor(totalCrew * 7/10);
    }

    totalShipParts = shipParts.length;
    if (totalShipParts> 3){
        totalShipParts = Math.floor(totalShipParts * 7/10);
    }

    totalFuelPods = fuelCans.length;
    if (totalFuelPods > 10){
        totalFuelPods = 10;
    }


}

function resetAlienAIvariables(){
    ai_timestamp = 0;
    ai_prev_timestamp = 0;
    ai_seconds_since_last_update = 0;
    warningCooldownTimer = 0;
    damageCooldownTimer = 0;
}

function clearAllGameObjects(){
    squiddies = [];
    biters = [];
    alienPlants = [];
    crew = [];
    shipParts = [];
    geysers = [];
    spikes = [];
    lava = [];
    fuelCans = [];
    planktonFroggy = [];
    planktonFroggy2 = [];
    ballAlien = [];
    plankton1 = [];
    plankton2 = [];
    plankton3 = [];
    plankton4 = [];
    alienPlants2 = [];
    particles = [];
    alienPlants3 = [];
    alienPlants4 =[];
}

function checkMusicIsOn(){
    if (!Sound.isPlaying("music_loop_slow")
            && !Sound.isPlaying("music_loop_action")
            )
    {
        console.log("no sound so play something");
        Sound.stop("cavernambient");
        Sound.play("music_loop_action", true, soundVolume);
    }
}

function gameStoryMode(){
    checkMusicIsOn();
    updateScreenshake(); // "juice it...
    updateParticles(); // ...or lose it!" =)
    updateAliens();
    if(!gamePaused) {
        playerMove();
    }
    cameraFollow();
    if (projectiles[0].alive){
        checkMissleCollisions();
        moveMissile();
    }
    drawAll();
}

function checkSilencePlayAmbient(){
    if (!Sound.isPlaying("music_loop_slow")
            && !Sound.isPlaying("music_loop_action")
            && !Sound.isPlaying("cavernambient")
            )
    {
        Sound.play("cavernambient", true, soundVolume * 10);
    }
}

function menuScreen(){
    checkSilencePlayAmbient();
    var xPos = (canvas.width / 4) + 50;
    var yPos = (canvas.height / 4) + 70;
    var menu_text = [
        "[P] Play Game",
        "[L] Level Editor",
        "[M] My Level",
        "[T] The Story",
        "[C] Credits"
    ];
    bgStartY = bgMidY;
	logoAlpha = 1;
    drawTitleBackGround();
    drawFrontCaverns();
    drawLogo();

    canvasContext.font = "40px ShareTechMono";
    canvas.textAlign = 'start';
	canvasContext.drawImage(menuPanel, xPos - 5, yPos - 50);
    for (var i = 0; i < menu_text.length ; i++){
		canvasContext.fillStyle = "#159781"
        canvasContext.fillText(menu_text[i],xPos,yPos);
	    canvasContext.fillStyle = "WHITE";
    	canvasContext.fillText(menu_text[i], xPos + 2, yPos + 2);
		yPos = yPos + 60;
    }
    canvasContext.fillStyle = "WHITE";
}

function playMyLevel(){

}

function pauseGame(){

}


function updateAll() {

    frameCounter++;
    if (frameCounter > framesPerSecond){
        frameCounter = 1;
    }
    // Placeholder for sound until I know what to do with it - Zak
    // if (!Sound.isPlaying("music_loop_slow")&& !Sound.isPlaying("music_loop_action")){
    //     Sound.play("music_loop_action", true, soundVolume);
    // }
    switch (gameState) {
        case INTRO:
            gameState = INTRO_STORY;
            introScreen();
            break;
        case MENU:
            gameState = MENU;
            menuScreen();
            break;
        case GAME_STORY_MODE:
            gameStoryMode();
            break;
        case GAME_OVER:
            gameOverScreen();
            break;
        case GAME_PAUSED:
            pauseGame();
            break;
        case LEVEL_EDITOR:
            drawLevelEditor();
            break;
        case CREDITS:
            creditsScreen();
            break;
        // case LOSE_SCREEN:
        //     canvasContext.drawImage(loseScreenImg, canvas.width /4, 
        //         canvas.height/3);
        //     break;
        default: 
            introScreen();
    }

}

// function draw3Dtxt(text, fontSize, frontColor, backColor, fontStyle, xPos, yPos)
// {
//     this.text = text;
//     this.fontSize = fontSize;
//     this.frontColor = frontColor;
//     this.backColor = backColor;
//     this.fontstyle = fontStyle;
//     this.xPos = xPos;
//     this.yPos = yPos;

//     canvasContext.font = this.fontSize + "px " + this.fontStyle;
//     canvasContext.fillStyle = this.backColor;
//     canvasContext.fillText(this.text, this.xPos, this.xPos);
//     canvasContext.fillStyle = this.frontColor;
//     canvasContext.fillText(this.text, this.xPos+2, this.yPos+2);
//}


function drawFuelPickupCounter(){
for (var i=0; i < totalFuelPods; i++)
{
    if (fuelPodCounter > i){
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,255,255,0.2)";
			colorCircle((i*32)+48,canvas.height-40,16,crewfill);
		}
        canvasContext.drawImage(fuelPickupUIpic, 0, 0, 64, 64, (i*32)+34, canvas.height-52, 48, 48);
    }
    else
    {
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,255,255,0.2)";
			colorCircle((i*32)+48,canvas.height-40,16,crewfill);
        }
        else
        {
            canvasContext.globalAlpha=0.25;
            canvasContext.drawImage(fuelPickupUIpic, 0, 0, 64, 64, (i*32)+34, canvas.height-52, 48, 48);
            canvasContext.globalAlpha=1.0;
        }
    }

// canvasContext.drawImage(crewPic, 0, 0, 64, 64, canvas.width-(crewloop*32)-64, canvas.height-80, 32, 32);
// canvasContext.drawImage(element.pic, ((element.frameNum - 1) * element.frameWidth), 0, element.frameWidth, element.frameHeight, element.x, element.y, element.frameWidth, element.frameHeight);
//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}
}

function drawShipPickupCounter(){
for (var i=0; i < totalShipParts; i++)
{
    if (rescuePartsCounter > i){
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,0,255,0.2)";
			colorCircle(canvas.width-(i*32)-64,canvas.height-40,16, crewfill);
		}
        canvasContext.drawImage(shipPartPic, 0, 0, 64, 64, canvas.width-(i*32)-80, canvas.height-64, 32, 32);
    }
    else{
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,0,255,0.2)";
			colorCircle(canvas.width-(i*32)-64,canvas.height-40,16,crewfill);
        }
        else
        {
            canvasContext.globalAlpha=0.25;
            canvasContext.drawImage(shipPartPic, 0, 0, 64, 64, canvas.width-(i*32)-80, canvas.height-64, 32, 32);
            canvasContext.globalAlpha=1.0;
        }            
    }

// canvasContext.drawImage(crewPic, 0, 0, 64, 64, canvas.width-(crewloop*32)-64, canvas.height-80, 32, 32);
// canvasContext.drawImage(element.pic, ((element.frameNum - 1) * element.frameWidth), 0, element.frameWidth, element.frameHeight, element.x, element.y, element.frameWidth, element.frameHeight);
//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}
}

function drawRescueCounter(){
for (var crewloop=0; crewloop < totalCrew; crewloop++)
{
    if (rescueCounter > crewloop){
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,0,0,0.2)";
			colorCircle(canvas.width-(crewloop*32)-64,canvas.height-80,16,crewfill);
		}
        canvasContext.drawImage(crewPic, 0, 0, 64, 64, canvas.width-(crewloop*32)-80, canvas.height-100, 32, 32);
    }
    else
    {
		if (DRAW_CIRCLES_IN_GUI)
		{
			crewfill = "rgba(255,0,0,0.2)";
			colorCircle(canvas.width-(crewloop*32)-64,canvas.height-80,16,crewfill);
		}
        else
        {
            canvasContext.globalAlpha=0.25;
            canvasContext.drawImage(crewPic, 0, 0, 64, 64, canvas.width-(crewloop*32)-80, canvas.height-100, 32, 32);
            canvasContext.globalAlpha=1.0;
        }            
    }

// canvasContext.drawImage(crewPic, 0, 0, 64, 64, canvas.width-(crewloop*32)-64, canvas.height-80, 32, 32);
// canvasContext.drawImage(element.pic, ((element.frameNum - 1) * element.frameWidth), 0, element.frameWidth, element.frameHeight, element.x, element.y, element.frameWidth, element.frameHeight);
//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
}
}


function drawAll() {
    // drawing black to erase previous frame, doing before .translate() since
    // its coordinates are not supposed to scroll when the camera view does
    canvasContext.save(); // needed to undo this .translate() used for scroll
    // this next line is like subtracting camPanX and camPanY from every
    // canvasContext draw operation up until we call canvasContext.restore
    // this way we can just draw them at their "actual" position coordinates
    canvasContext.translate(-camPanX,-camPanY);

    //drawBricks();
    drawOnlyCavernOnScreen();

    draw_particles(0,0); // rendered early so they are underneath other tiles

    // if (shipPicLoaded){
    //     canvasContext.drawImage(shipPic, playerX - shipPic.width, playerY - shipPic.height);
    // }
    //colorCircle(playerX, playerY, 10, 'yellow');
    drawGameObjects(squiddies);
	drawGameObjects(biters);
    drawGameObjects(alienPlants);
    drawGameObjects(crew);
    drawGameObjects(shipParts);
    drawGameObjects(geysers);
    drawGameObjects(lava);
    drawGameObjects(spikes);
    drawGameObjects(fuelCans);
    drawGameObjects(planktonFroggy);
    drawGameObjects(planktonFroggy2);
    drawGameObjects(ballAlien);
    drawGameObjects(plankton1);
    drawGameObjects(plankton2);
    drawGameObjects(plankton3);
    drawGameObjects(plankton4);
    drawGameObjects(alienPlants2);
    drawGameObjects(alienPlants3);
    drawGameObjects(alienPlants4);
    
    if (gameState != GAME_OVER){
        canvasContext.drawImage(shipPic, playerX - shipPic.width/2, playerY - shipPic.height/2);
        drawGameObjects(projectiles);
        colorText("Fuel: "+jetpackFuel.toFixed(2), playerX+28, playerY+10, "white");
        colorText("Shields: "+playerHealth, playerX+28, playerY+18, "red");
    }
    
    // FIXME: turn into proper GUI elements

    
 //   draw3Dtxt("Z and X to move, M to fire, SPACE for boosters", 24, "WHITE", "RED", "Helvetica", 20, 30);
    
    canvasContext.font = "18px ShareTechMono";
    canvasContext.fillStyle = "#159781";
    canvasContext.fillText("Z and X to move  M to fire  SPACE for boosters  ESC quit", 20, 30);
    canvasContext.fillStyle = "WHITE";
    canvasContext.fillText("Z and X to move  M to fire  SPACE for boosters  ESC quit", 22, 32);

    canvasContext.restore(); // undoes the .translate() used for cam scroll
    
    // doing this after .restore() so it won't scroll with the camera pan
    canvasContext.fillStyle = 'white';
    //canvasContext.fillText("Arrow keys to slide, scrolling demo",8,14);

    //debug shootProjectile(200, 30, canvas.width / 2, canvas.height / 2, 20, 2, 5, 100);

    // draw the health bar
    colorRect(10,canvas.height-20,canvas.width-20,15,"rgba(66,00,00,0.4)"); // border
    colorRect(15,canvas.height-16,(canvas.width-30)*(playerHealth/MAX_HEALTH),10,"rgba(255,00,00,0.4)"); // hp
    //x, y, with, Hei 
    // draw the astronaut rescue counter
    drawRescueCounter();
    drawShipPickupCounter();
    drawFuelPickupCounter();

}
