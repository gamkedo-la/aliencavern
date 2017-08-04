function gameOverScreen(){
    var textPosX = 180;
    var textPosY = canvas.height / 3 + 100 ;
    updateParticles();
    drawAll();
    drawLogo();
    colorRect(textPosX - 10, textPosY - 50, 600, 150, "rgba(00,00,00,0.4)");
    canvasContext.font = "48px ShareTechMono";
    canvasContext.fillStyle = "WHITE"
    canvasContext.fillText("Mission Failed Captain", textPosX, textPosY);
	canvasContext.fillStyle = "#159781";
    canvasContext.fillText("Mission Failed Captain", textPosX + 2, textPosY + 2);
    canvasContext.fillStyle = "YELLOW";   
    canvasContext.font = "30px ShareTechMono";
    canvasContext.fillText("Press Esc to return to the surface", textPosX + 10, textPosY + 50);

    //canvasContext.drawImage(loseScreenImg, canvas.width /4, canvas.height/3);
}