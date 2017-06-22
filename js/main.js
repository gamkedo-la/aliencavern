var canvas, canvasContext;
var framesPerSecond = 60;

window.onload = function() {
    if (cheatsOn){
        console.log("cheats on . fuel infinate");
    }
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

    // Draw Loading Screen
    colorRect(0,0, screen.width,screen.height, 'black');
    colorText("Game Loading", canvas.width/2, canvas.height/2, 'white');
    loadImages();
    init_particles();
}

function startGame(){
	setInterval(updateAll, 1000/framesPerSecond);

    loadGameObjects(aliens, alienPic ,ALIEN);
    loadGameObjects(alienPlants, alienPlantPic, ALIEN_PLANT);
    loadGameObjects(crew, crewPic, CREW);
    loadGameObjects(shipParts, shipPartPic, SHIP_PART);
    initMissile();
//    loadGameObject(projectiles,projectilePic,1); //load single projectile in to 
    Sound.play("cavernambient", true, 0.4);
    Sound.play("shipengine",true,0.3);
    initInput();
    playerReset();    
}

function updateAll() {
    // Press F1 to restart game
    if(gameScreen) {
        updateScreenshake(); // "juice it...
        updateParticles(); // ...or lose it!" =)
        updateAliens();
        playerMove();
        cameraFollow();
        //console.log(projectiles[0]);
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

    // if (shipPicLoaded){
    //     canvasContext.drawImage(shipPic, playerX - shipPic.width, playerY - shipPic.height);
    // }
    //colorCircle(playerX, playerY, 10, 'yellow');
    drawGameObjects(aliens);
    drawGameObjects(alienPlants);
    drawGameObjects(crew);
    drawGameObjects(shipParts);
    canvasContext.drawImage(shipPic, playerX - shipPic.width/2, playerY - shipPic.height/2);
    drawGameObjects(projectiles);
    colorText("Fuel: "+jetpackFuel.toFixed(2), playerX, playerY+10, "white");
    colorText("Z and X to move, M to fire, space for boosters", 20, 10, "white");
    canvasContext.restore(); // undoes the .translate() used for cam scroll
    
    // doing this after .restore() so it won't scroll with the camera pan
    canvasContext.fillStyle = 'white';
    //canvasContext.fillText("Arrow keys to slide, scrolling demo",8,14);

    draw_particles(camPanX,camPanY);
    //debug shootProjectile(200, 30, canvas.width / 2, canvas.height / 2, 20, 2, 5, 100);

}
