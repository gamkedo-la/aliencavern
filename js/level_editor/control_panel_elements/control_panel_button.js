function drawButton(prevItem, topText, bottomText, action, x_offset) {
    var x = prevItem().elem_x;
    var y = prevItem().elem_y + prevItem().elem_height + prevItem().elem_bottomMargin + 50;
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
            onIconClick(this.elem_x, this.elem_y, this.elem_width, this.elem_height, action);
        },
        draw: function () {
            drawBorder();
            canvasContext.font = this.elem_height + "px Helvetica";
            canvasContext.fillStyle = "red";
            canvasContext.fillText(topText, this.elem_x + this.elem_width / 5 + x_offset || 0, this.elem_y + 22);
            canvasContext.fillText(bottomText, this.elem_x + this.elem_width / 5, this.elem_y + 22 + this.elem_height);
            this.onClick()
        }
    }
}