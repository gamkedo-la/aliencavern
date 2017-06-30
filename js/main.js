var canvas, canvasContext;
var framesPerSecond = 60;

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
}

function startGame(){
	setInterval(updateAll, 1000/framesPerSecond);

    loadGameObjects(squiddies, alienSquidPic , ALIEN_SQUID, false, 2, 3, 64, 64);
	loadGameObjects(biters, alienBiterPic, ALIEN_BITER, false, 2, 3, 64, 64);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT, false);
    loadGameObjects(crew, crewPic, CREW, false, 4, 4 , 64, 64);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART, false);
    loadGameObjects(geysers, geyserPic, GEYSERS, true,  8, 8, 64, 64);
    loadGameObjects(lava, lavaPic,LAVA, true, 2,10,64,64);
    loadGameObjects(spikes, spikePic, SPIKES, true);
    loadGameObjects(fuelCans, fuelPic, FUEL, true);

    initMissile();
//    loadGameObject(projectiles,projectilePic,1); //load single projectile in to 
// Sound.play("cavernambient", true, 0.4);
    Sound.play("shipengine",true, 0.3);
    Sound.play("aliencavern1", true, 0.4);
    initInput();
    playerReset();    
}

function updateAll() {
    // Press F1 to restart game

    frameCounter++;
    if (frameCounter > framesPerSecond){
        frameCounter = 1;
    }

    if(gameScreen) {
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

    // Press F2 to launch editor
    if(editorScreen) {
        drawLevelEditor();
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
    canvasContext.drawImage(shipPic, playerX - shipPic.width/2, playerY - shipPic.height/2);
    drawGameObjects(projectiles);
    
    // FIXME: turn into proper GUI elements
    colorText("Fuel: "+jetpackFuel.toFixed(2), playerX+28, playerY+10, "white");
    colorText("Shields: "+playerHealth, playerX+28, playerY+18, "red");
    
    colorText("Z and X to move, M to fire, space for boosters", 20, 10, "white");
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
