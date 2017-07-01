
function drawBitmapWithRotation(useBitmap, atX, atY, withAng) {
    
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    canvasContext.restore();
    
}

function flipSprite(sprite) {
	canvasContext.save();
	canvasContext.translate(sprite.x + sprite.frameWidth, sprite.y);
	canvasContext.scale(-1, 1);
	canvasContext.drawImage(sprite.pic, ((sprite.frameNum - 1) * sprite.frameWidth), 0, sprite.frameWidth, sprite.frameHeight, 0, 0, sprite.frameWidth, sprite.frameHeight);
	canvasContext.restore();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
	this.radius = radius;
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX,centerY, this.radius, 0,Math.PI*2, true);
	canvasContext.fill();
}

function colorText(showWords, textX,textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(showWords, textX, textY);
}