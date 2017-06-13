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
        canvasContext.font = "48px Comic Sans MS";
        canvasContext.fillStyle = "white";
        canvasContext.fillText("Control panel", x, y);
    },
    drawLevelHeightControl: function () {
        var x = this.x + 20
        var y = this.y + 110
        var width = 120;
        var height = 50;
        var leftMargin = 5;
        var topMargin = 5
        var bottomMargin = 10;

        return {
            elem_x: x,
            elem_y: y,
            elem_width: width,
            elem_height: height,
            elem_leftMargin: leftMargin,
            elem_topMargin: topMargin,
            elem_bottomMargin: bottomMargin,
            draw: function () {
                drawLabel().draw()
                drawBorder()
                drawLeftButton().draw()
                drawCounter().draw()
                drawRightButton().draw()
            }
        }
        function drawLabel() {
            return {
                elem_x: x,
                elem_y: y,
                elem_height: 24,
                draw: function () {
                    canvasContext.font = this.elem_height + "px Comic Sans MS";
                    canvasContext.fillStyle = "white";
                    canvasContext.fillText("Level height:", this.elem_x, this.elem_y);
                }
            }
        }


        function drawBorder() {
            canvasContext.rect(x, y + drawLabel().elem_height, width, height);
            canvasContext.stroke()
        }

        function drawLeftButton() {
            return {
                elem_x: x + leftMargin,
                elem_y: y + topMargin + drawLabel().elem_height,
                elem_width: 24,
                elem_height: 40,
                onClick: function () {
                    onIconClick(this.elem_x, this.elem_y, this.elem_width, this.elem_height, decreaseLevelHeight);
                },
                draw: function () {
                    canvasContext.fillStyle = "red";
                    canvasContext.fillRect(this.elem_x, this.elem_y, this.elem_width, this.elem_height);
                    this.onClick()
                }
            }
        }

        function drawCounter() {
            return {
                elem_x: drawLeftButton().elem_x + drawLeftButton().elem_width,
                elem_y: y + topMargin + drawLabel().elem_height,
                elem_width: 60,
                elem_height: 30,
                draw: function () {
                    canvasContext.font = this.elem_height + "px Comic Sans MS";
                    canvasContext.fillStyle = "white";
                    canvasContext.fillText(cavernGrid.length / 14, this.elem_x + this.elem_width / 5, this.elem_y + this.elem_height);
                }
            }
        }

        function drawRightButton() {
            return {
                elem_x: drawLeftButton().elem_x + drawLeftButton().elem_width + drawCounter().elem_width,
                elem_y: y + topMargin + drawLabel().elem_height,
                elem_width: 24,
                elem_height: 40,
                onClick: function () {
                    onIconClick(this.elem_x, this.elem_y, this.elem_width, this.elem_height, increaseLevelHeight);
                },
                draw: function () {
                    canvasContext.fillStyle = "green";
                    canvasContext.fillRect(this.elem_x, this.elem_y, this.elem_width, this.elem_height);
                    this.onClick()
                }
            }
        }
    },
    drawCopyLevelControl: function () {
        var x = this.drawLevelHeightControl().elem_x;
        var y = this.drawLevelHeightControl().elem_y + this.drawLevelHeightControl().elem_height + this.drawLevelHeightControl().elem_bottomMargin + 50;
        var width = 120;
        var height = 50;
        function drawBorder() {
            canvasContext.rect(x, y, width, height);
            canvasContext.stroke()
        }

        return {
            elem_x: x,
            elem_y: y,
            elem_width: width,
            elem_height: height,
            elem_height: 22,
            elem_bottomMargin: 10,
            onClick: function () {
                onIconClick(this.elem_x, this.elem_y, this.elem_width, this.elem_height, copyLevel);
            },
            draw: function() {
                drawBorder();
                canvasContext.font = this.elem_height + "px Comic Sans MS";
                canvasContext.fillStyle = "red";
                canvasContext.fillText("GET", this.elem_x + this.elem_width / 5 + 10, this.elem_y + 22);
                canvasContext.fillText("LEVEL", this.elem_x + this.elem_width / 5, this.elem_y + 22 + this.elem_height);
                this.onClick()
            }
        }
    },
    drawLoadLevelControl: function () {
        var x = this.drawCopyLevelControl().elem_x;
        var y = this.drawCopyLevelControl().elem_y + this.drawCopyLevelControl().elem_height + this.drawCopyLevelControl().elem_bottomMargin + 50;
        var width = 120;
        var height = 50;
        function drawBorder() {
            canvasContext.rect(x, y, width, height);
            canvasContext.stroke()
        }

        return {
            elem_x: x,
            elem_y: y,
            elem_width: width,
            elem_height: height,
            elem_height: 22,
            onClick: function () {
                onIconClick(this.elem_x, this.elem_y, this.elem_width, this.elem_height, loadLevel);
            },
            draw: function() {
                drawBorder();
                canvasContext.font = this.elem_height + "px Comic Sans MS";
                canvasContext.fillStyle = "red";
                canvasContext.fillText("LOAD", this.elem_x + this.elem_width / 5 + 2, this.elem_y + 22);
                canvasContext.fillText("LEVEL", this.elem_x + this.elem_width / 5, this.elem_y + 22 + this.elem_height);
                this.onClick()
            }
        }
    },
    drawKeysDescription: function () {
        var x = this.drawLevelHeightControl().elem_x + this.drawLevelHeightControl().elem_width + 100;
        var y = this.y + 110;

        return {
            x: x,
            y: y,
            elem_height: 24,
            bottom_margin: 5,
            draw: function () {
                var keys = keysDescription();
                keys.map(function (key, index) {
                    var margin = index > 0 ? this.bottom_margin : 0;
                    canvasContext.font = this.elem_height + "px Comic Sans MS";
                    canvasContext.fillStyle = "white";
                    canvasContext.fillText(key, x, y + index * this.elem_height + margin);
                }.bind(this));
            }
        }
    },


}