var missileSpeedX = 15;

function initMissile(){
    projectiles[0] = new GameObject();
    projectiles[0].pic = projectilePic;
    projectiles[0].speed = missileSpeedX;
    projectiles[0].alive = false;
    projectiles[0].radius = 15;
    projectiles[0].solid = false;
}

function fireMissile(){
    projectiles[0].alive = true;
    projectiles[0].x = playerX;
    projectiles[0].y = playerY;
    //if (playerSpeedX < 0 && projectiles[0].x > 0){
    if(!playerFacingRight/* && projectiles[0].x > 0*/) {
        projectiles[0].speed = -missileSpeedX;//-1;
    }
    else
    {
        projectiles[0].speed = missileSpeedX;
    }
    Sound.play("weaponFire", false, soundVolume);
}

function moveMissile(){
    if ((projectiles[0].x < 0 || projectiles[0].x > canvas.width) && projectiles[0].alive == true){
        projectiles[0].alive = false;
    }
    else
    {
        projectiles[0].x += projectiles[0].speed;
    }

}

