var showControlPanel = false;

function initControlPanel(x,y) {
    this.x = x;
    this.y = y;

    this.drawPanel();
    this.drawTitle();
}

initControlPanel.prototype = {
    drawPanel: function() {
        canvasContext.globalAlpha = 0.7;
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(this.x, this.y, 796, 500);
        canvasContext.stroke();
    },
    drawTitle: function() {
        var x = this.x + 20;
        var y = this.y + 60;
        canvasContext.globalAlpha = 1;
        canvasContext.font = "48px Comic Sans MS";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("What do you need captin?",x, y);
    }
}