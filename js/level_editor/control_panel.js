var showControlPanel = false;

function initControlPanel(x, y) {
    this.x = x;
    this.y = y;

    this.drawPanel();
    this.drawTitle();
    this.drawLevelHeightControl().draw();
    this.drawKeysDescription().draw();
    this.drawCopyLevelControl().draw();
    this.drawLoadLevelControl().draw();
    this.drawResetLevelControl().draw();
}

initControlPanel.prototype = {
    drawPanel: function () {
        canvasContext.globalAlpha = 0.7;
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(this.x, this.y, 796, 500);
        canvasContext.stroke();
    },
    drawTitle: function () {
        var x = this.x + 20;
        var y = this.y + 60;
        canvasContext.globalAlpha = 1;
        canvasContext.font = "48px Helvetica";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Control panel", x, y);
    },
    drawLevelHeightControl: function () {
        return drawLevelHeight(this.x, this.y);
    },
    drawCopyLevelControl: function () {
        return drawButton(this.drawLevelHeightControl.bind(this), "GET", "LEVEL", copyLevel, 10);
    },
    drawLoadLevelControl: function () {
        return drawButton(this.drawCopyLevelControl.bind(this), "LOAD", "LEVEL", loadLevel, 2);
    },
    drawResetLevelControl: function () {
        return drawButton(this.drawLoadLevelControl.bind(this), "RESET", "LEVEL", resetLevel, -2);
    },
    drawKeysDescription: function (prevElement) {
        return drawKeysDescription(this.drawLevelHeightControl.bind(this), this.y);
    },


}

// Replaced Control Panel with this code
function showHelp(){
    var xPos = (canvas.width / 4);
    var yPos = (canvas.height / 4);
    var menu_text = [
        "Alien Caverns Level Editor",
        "[1 to 4] Change Level Style",
        "[0] & right Mouse - Delete",
        "[C] Show cavern tiles in pallete",
        "[B] Upload cavern code to editor",
        "[N] Save cavern code from editor"
    ];
    colorRect(xPos - 24, yPos - 50, 465, 275, "rgba(0,0,0,0.5)");
    bgStartY = bgMidY;
	logoAlpha = 1;
    canvasContext.font = "24px ShareTechMono";
    canvas.textAlign = 'start';
    for (var i = 0; i < menu_text.length ; i++){
		canvasContext.fillStyle = "#159781"
        canvasContext.fillText(menu_text[i],xPos,yPos);
	    canvasContext.fillStyle = "WHITE";
    	canvasContext.fillText(menu_text[i], xPos + 2, yPos + 2);
		yPos = yPos + 35;
    }
    canvasContext.fillStyle = "WHITE";
}

