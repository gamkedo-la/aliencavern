function drawKeysDescription(prevElement, y) {
    var x = prevElement().elem_x + prevElement().elem_width + 100;
    var y = y + 110;

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
}