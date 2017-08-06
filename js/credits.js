function creditsText(){
    var xPos = 135;
    var yPos = (canvas.height / 4) + 40;
    var credits = [
        "Game concept, design, programming and team lead - Zak Ali",
        "Cavern artwork, animation - Cameron Button",
        "Title, intro, alien art, programming - Jo Liegh Evans",
        "Game Story and code, alien art, Sound FX - Dana Alcala",
        "Game animation FX, Programming - Ezovex Dickson Goh",
        "Alien art, ship art, cavern sound FX - Andy King",
        "Level Editor v2 Zak Ali - original by Artur Slomowski",
        "Alien AI, sound, particles, juicing code - Christer Kaitila",
        "Original core code, team mentor and coach - Chris Deleon",
        "Fuel badge - Mary Brady",
        "Jetpack programming - Remy Lapointe",
        "Game soundtrack - Noah Lema",
        "* A special thanks to my family for their time and patience *", 
        "       allowing me to produce my first real game",
        "   Made with passion @GAMKEDO CLUB http://gamkedo.club/"
    ];
    bgStartY = bgMidY;
	logoAlpha = 1;
    canvasContext.font = "20px ShareTechMono";
    canvas.textAlign = 'start';
    for (var i = 0; i < credits.length ; i++){
		// canvasContext.fillStyle = "#159781"
        // canvasContext.fillText(credits[i],xPos,yPos);
	    canvasContext.fillStyle = "WHITE";
    	canvasContext.fillText(credits[i], xPos + 2, yPos + 2);
		yPos = yPos + 25;
    }
    canvasContext.fillStyle = "YELLOW";
    canvasContext.font = "15px ShareTechMono";
    canvasContext.fillText("Esc for menu", 10, 585);
    }

function creditsScreen(){
    colorRect(0,0, canvas.width,canvas.height, 'black');
    drawTitleBackGround();
    drawLogo();
    colorRect(100, (canvas.height / 4) + 5, 710,430, "rgba(00,00,00,0.4)");
    creditsText();
}

