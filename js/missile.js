var missileSpeedX = 4;

function initMissile(){
    projectiles[0] = new GameObject();
    projectiles[0].pic = projectilePic;
    projectiles[0].speed = missileSpeedX;
    projectiles[0].alive = false;
    projectiles[0].radius = 15;
}

function fireMissile(){
    projectiles[0].alive = true;
    projectiles[0].x = playerX;
    projectiles[0].y = playerY;
    if (playerSpeedX < 0 && projectiles[0].x > 0){
        projectiles[0].speed *= -1;
    }
    else
    {
        projectiles[0].speed = 4; // hack until I figure out a neater way of doing this
    }
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

