var canvas, canvasContext;
var framesPerSecond = 30;

window.onload = function() {
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
    Sound.play("cavernambient", true, 0.4);
    initInput();
    playerReset();    
}

function updateAll() {
    if(gameScreen) {
        updateScreenshake(); // "juice it...
        updateParticles(); // ...or lose it!" =)
        playerMove();
        cameraFollow();
        drawAll();
    }

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
    canvasContext.drawImage(shipPic, playerX - shipPic.width, playerY - shipPic.height);
    colorText("Fuel: "+jetpackFuel.toFixed(2), playerX, playerY+10, "white");
    canvasContext.restore(); // undoes the .translate() used for cam scroll

    // doing this after .restore() so it won't scroll with the camera pan
    canvasContext.fillStyle = 'white';
    //canvasContext.fillText("Arrow keys to slide, scrolling demo",8,14);

    draw_particles(camPanX,camPanY);

}
