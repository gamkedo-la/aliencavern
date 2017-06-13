function drawLevelHeight(x, y) {
    var x = x + 20
    var y = y + 110
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
}

