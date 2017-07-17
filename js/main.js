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

var gameState = INTRO;

var canvas, canvasContext;
var framesPerSecond = 60;
var level = 1;
cavernTileSheet = levelOne;

window.onload = function() {
    if (cheatsOn){
        console.log("cheats on . fuel infinate");
    }
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    setupMouseEvents();	
    // Draw Loading Screen
    colorRect(0,0, screen.width,screen.height, 'black');
    colorText("Game Loading", canvas.width/2, canvas.height/2, 'white');
    loadImages();
    init_particles();
    Sound.play("music_loop_slow", false, soundVolume);
    // intro.js variables & function calls TODO: refactor this
    midY = canvas.height / 2;
	midX = canvas.width / 2;
	bgMidY = titleBG.height / 2;
    loadStory();
    resetGame();
    setInterval(updateAll, 1000/framesPerSecond);
}

function getGameObjectsReadyforGame(){
    loadGameObjects(squiddies, alienSquidPic , ALIEN_SQUID, false, 2, 3, 64, 64);
	loadGameObjects(biters, alienBiterPic, ALIEN_BITER, false, 2, 3, 64, 64);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT, false);
    loadGameObjects(crew, crewPic, CREW, false, 4, 4 , 64, 64);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART, false);
    loadGameObjects(geysers, geyserPic, GEYSERS, true,  8, 8, 64, 64);
    loadGameObjects(lava, lavaPic,LAVA, true, 2,10,64,64);
    loadGameObjects(spikes, spikePic, SPIKES, true);
    loadGameObjects(fuelCans, fuelPic, FUEL, true, 8, 12, 64, 64);
}

function resetGame(){
    cavernGrid = [];
    cavernGrid = [8,8,8,2,5,0,0,0,7,2,2,2,8,8,1,1,4,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,41,0,0,0,43,0,0,0,0,0,3,1,4,0,9,0,6,8,5,0,0,0,0,30,3,1,0,0,0,0,0,0,0,0,0,0,0,8,3,1,0,0,32,0,0,0,0,0,0,20,31,3,3,1,0,0,2,2,0,0,0,0,0,7,2,3,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,30,21,0,0,0,24,0,0,0,30,3,3,1,8,8,5,0,0,0,0,0,0,0,8,3,3,1,1,1,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,43,32,0,32,43,0,0,3,3,1,31,21,0,0,6,42,2,42,5,0,0,0,3,1,8,8,0,0,0,0,0,0,0,0,0,0,3,1,3,4,0,0,0,0,20,0,0,21,0,30,3,1,3,4,0,24,0,0,0,0,0,6,2,2,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,0,8,8,0,0,0,30,3,3,1,0,0,0,0,0,1,1,0,0,0,8,3,3,1,30,0,0,0,0,0,0,20,0,0,3,3,3,1,8,4,0,0,24,0,0,0,0,0,3,3,3,1,3,4,0,0,0,0,0,0,41,31,3,3,3,1,3,4,0,0,0,0,0,0,8,8,3,3,3,1,4,0,0,0,0,0,0,0,3,3,3,3,3,1,4,0,20,24,0,0,0,8,3,3,3,3,3,1,4,0,0,0,0,0,0,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,1,3,1,8,8,8,0,0,24,0,0,21,0,30,1,3,1,3,3,0,0,0,0,0,6,2,2,2,1,3,1,3,3,0,0,0,0,0,0,0,0,0,1,3,1,3,3,0,0,0,6,5,0,0,0,0,0,3,1,0,0,20,0,0,0,0,0,0,0,30,30,3,1,30,21,30,0,21,0,0,0,0,0,3,3,3,1,8,8,8,8,8,0,0,0,0,3,3,3,3,1,3,3,3,4,0,0,0,0,0,3,3,3,3,1,3,3,4,0,0,0,0,0,0,0,0,0,3,1,3,3,4,0,0,20,24,0,24,0,20,0,3,1,0,0,4,0,0,0,0,0,2,0,0,0,3,1,0,0,4,0,0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,20,24,0,0,0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,31,6,3,1,30,8,0,0,0,0,0,0,7,2,2,3,3,1,8,1,8,8,0,0,0,0,0,0,3,3,3,1,0,0,0,0,0,0,31,0,0,0,3,3,3,1,0,0,20,0,0,6,2,5,0,0,3,3,3,1,0,0,31,20,0,0,0,0,0,0,3,3,3,1,0,0,8,8,0,24,0,20,0,31,3,3,3,1,0,0,1,1,0,20,0,0,3,3,3,3,3,1,0,0,1,1,0,0,0,0,3,3,3,3,3,1,31,21,1,1,21,31,31,21,3,3,3,3,3,1,8,8,1,1,8,8,8,1,1,1,1,1,3];
    resetScreenShake();
    initMissile();
    initInput();
    playerReset();
    getGameObjectsReadyforGame();

}

function startGame(){
    gameState = INTRO;
    getGameObjectsReadyforGame();
    initMissile();
    initInput();
    playerReset();    
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
    playerMove();
    cameraFollow();
    if (projectiles[0].alive){
        checkMissleCollisions();
        moveMissile();
    }
    drawAll();
}

function menuScreen(){
    // if (!Sound.isPlaying("music_loop_slow")&& !Sound.isPlaying("music_loop_action")){
    //     Sound.play("music_loop_slow", false, soundVolume);
    //     if (!Sound.isPlaying("mSound.play("cavernambient", true, 0.4);
    // }

    if (!Sound.isPlaying("music_loop_slow")
            && !Sound.isPlaying("music_loop_action")
            && !Sound.isPlaying("cavernambient")
            )
    {
        Sound.play("cavernambient", true, soundVolume);
    }

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

function gameOverScreen(){

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
        //reset sound
            menuScreen();
            break;
        case GAME_STORY_MODE:
            gameStoryMode();
            break;
        case GAME_MY_LEVEL:
            playMyLevel();
            break;
        case GAME_OVER:
            gameOverScreen();
            break;
        case GAME_PAUSED:
            pauseGame();
            break;
        case LEVEL_EDITOR:
            levelEditorInitialization();
            drawLevelEditor();
            break;
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
    canvasContext.drawImage(shipPic, playerX - shipPic.width/2, playerY - shipPic.height/2);
    drawGameObjects(projectiles);
    
    // FIXME: turn into proper GUI elements
    colorText("Fuel: "+jetpackFuel.toFixed(2), playerX+28, playerY+10, "white");
    colorText("Shields: "+playerHealth, playerX+28, playerY+18, "red");
    
 //   draw3Dtxt("Z and X to move, M to fire, SPACE for boosters", 24, "WHITE", "RED", "Helvetica", 20, 30);
    
    canvasContext.font = "24px Helvetica";
    canvasContext.fillStyle = "RED";
    canvasContext.fillText("Z and X to move, M to fire, SPACE for boosters", 20, 30);
    canvasContext.fillStyle = "WHITE";
    canvasContext.fillText("Z and X to move, M to fire, SPACE for boosters", 22, 32);

    // canvasContext.fillStyle = "RED";
    // canvasContext.fillText("Press F2 for level editor", 20, 60);
    // canvasContext.fillStyle = "YELLOW";
    // canvasContext.fillText("Press F2 for level editor", 22, 62);

    canvasContext.restore(); // undoes the .translate() used for cam scroll
    
    // doing this after .restore() so it won't scroll with the camera pan
    canvasContext.fillStyle = 'white';
    //canvasContext.fillText("Arrow keys to slide, scrolling demo",8,14);

    //debug shootProjectile(200, 30, canvas.width / 2, canvas.height / 2, 20, 2, 5, 100);

    // draw the health bar
    colorRect(10,canvas.height-40,canvas.width-20,30,"rgba(66,00,00,0.4)"); // border
    colorRect(15,canvas.height-35,(canvas.width-30)*(playerHealth/MAX_HEALTH),20,"rgba(255,00,00,0.4)"); // hp

    // draw the astronaut rescue counter
    for (var crewloop=0; crewloop<RESCUES_REQUIRED; crewloop++)
    {
        if (rescueCounter > crewloop)
            crewfill = "rgba(255,255,255,0.5)";
        else
            crewfill = "rgba(255,0,0,0.2)";
       
        colorCircle(canvas.width-(crewloop*32)-64,canvas.height-80,16,crewfill);
    }

}
