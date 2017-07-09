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

