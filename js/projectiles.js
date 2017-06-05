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
var projectileScaleModifier = 1;
var projectileVelocity = 0;

const PROJECTILE_HEIGHT_ON_SHEET = 1;
const PROJECTILE_WIDTH_ON_SHEET = 1;
const PROJECTILE_MAX_INDEX = 9;
const PROJECTILE_MIN_INDEX = 0;

function shootProjectile(height,width, x,y, angle, imgIndex, velocity, reach){
    /*
    for i = reach; i > 0; i--
        show projectile image @ imgIndex
        Movement: transform x/y according to angle, speed, and reach
    */
    var sinAngle = 0;
    var cosAngle = 0;
    var opposite = 0;
    var hypotenuse = velocity;

    projectileHeight = height;
    projectileWidth = width;
    if (imgIndex > PROJECTILE_MAX_INDEX) {
        imgIndex = PROJECTILE_MAX_INDEX;
    }
    else if (imgIndex < PROJECTILE_MIN_INDEX) {
        imgIndex = PROJECTILE_MIN_INDEX;
    }
    for (i = reach; i > 0; i--){
        drawProjectile(x,y, projectileWidth,projectileHeight, imgIndex,0);
        sinAngle = Math.sin(angle);
        cosAngle = Math.cos(angle);
        opposite = sinAngle * hypotenuse;
        adjacent = cosAngle * hypotenuse;
        x = adjacent;
        y = -opposite;

        /*
        SOH CAH TOA
        sin = Opposite / Hypotenuse
        cosine = Adjacent / Hypotenuse
        tangent = Opposite / Adjacent

        Given a velocity, angle, and beginning point, find the end point after one step
        Velocity = 5
        Angle = 30
        Adjacent = x axis
        Opposite = y axis
        Hypotenuse = velocity
        */
    }
}

function drawProjectile(x,y, width,height, sheetX,sheetY) {
    canvasContext.drawImage(projectile, // object to draw
                            sheetX * PROJECTILE_WIDTH_ON_SHEET,sheetY * PROJECTILE_HEIGHT_ON_SHEET, // where to start on sprite sheet
                            PROJECTILE_WIDTH_ON_SHEET,PROJECTILE_HEIGHT_ON_SHEET, // actual size of image on sprite sheet
                            x,y, // location to draw projectile
                            width * projectileScaleModifier,height * projectileScaleModifier); // size of projectile when drawn
}