// Attempt to make a projectile system for use in weapons and possibly other things.
/* 
Things a projectile needs:
--------------------------
* size
--- * height
--- * width
* image source
* velocity
* start point
--- * start x, y
* opacity
* angle
* reach

sinAngle = vert / vel
*/
var projectileWidth = 10;
var projectileHeight = 10;
var projectileScaleModifier = 0;

const PROJECTILE_HEIGHT_ON_SHEET = 1;
const PROJECTILE_WIDTH_ON_SHEET = 1;

function shootProjectile(height,width, x,y, angle, imgIndex, velocity, opacity, reach){
    /*
    for i = reach; i > 0; i--
        show projectile image @ imgIndex
        Movement: transform x/y according to angle, speed, and reach
    */
    for (i = reach; i > 0; i--){
        drawProjectile(x,y, imgIndex,0);
    }
}

function drawProjectile(x,y, sheetX,sheetY) {
    canvasContext.drawImage(projectile, // object to draw
                            sheetX * PROJECTILE_WIDTH_ON_SHEET,sheetY * PROJECTILE_HEIGHT_ON_SHEET, // where to start on sprite sheet
                            PROJECTILE_WIDTH_ON_SHEET,PROJECTILE_HEIGHT_ON_SHEET, // actual size of image on sprite sheet
                            x,y, // location to draw projectile
                            projectileWidth * projectileScaleModifier,projectileHeight * projectileScaleModifier); // size of projectile when drawn

}