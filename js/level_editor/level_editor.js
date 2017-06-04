function drawLevelEditor() {
    colorRect(0,0, screen.width,screen.height, 'black');
    setCamera();
    drawParallaxBackground();
}

function setCamera() {
    camPanX = 0;
    camPanY = 0;
}