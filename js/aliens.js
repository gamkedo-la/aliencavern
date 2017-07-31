// Alien Artificial Intelligence
// made for Gamkedo by McFunkypants

const ALIEN_MOVE_SPEED = 16; // pixels per second
const ALIEN_MOVE_RANGE = 64; // pixels away from spawn location
const AI_SEEK_RANGE = 200; // player must be nearby to be noticed
const WARNING_COOLDOWN = 200;
const ENEMY_DAMAGE_RANGE = 1000;
const ENEMY_DAMAGE_AMOUNT = 100;
const DAMAGE_COOLDOWN_TIMER = 1000;

var ai_timestamp = 0;
var ai_prev_timestamp = 0;
var ai_seconds_since_last_update = 0;
var warningCooldownTimer = 0;
var damageCooldownTimer = 0;

function updateAliens()
{
	if (!window.squiddies && !window.biters && !window.planktonFroggy && window.ballAlien) return; // sanity check

	ai_timestamp = performance.now();
	ai_seconds_since_last_update = ai_timestamp - ai_prev_timestamp;
	ai_prev_timestamp = ai_timestamp;

	squiddies.forEach(alienAI);
	ballAlien.forEach(alienAI);
	biters.forEach(alienAI);
	planktonFroggy.forEach(alienAI);
}

function dist(x1,y1,x2,y2)
{
	return /*Math.sqrt*/((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function alienAI(me)
{
	if (!me.ai_birthday) // ai init required
	{	// remember where we were when we started
		me.ai_birthday = ai_timestamp;
		me.ai_spawnX = me.x;
		me.ai_spawnY = me.y;
	}
	//why update if alien is dead ;)
	if(!me.alive)
		return;

	//console.log('AI debug: me.gameObjectType='+me.gameObjectType);

	// how far away are we from our origin (never stray too far away)
	var distanceFromHome = dist(me.x,me.y,me.ai_spawnX,me.ai_spawnY);
	//console.log('AI debug: distanceFromHome='+distanceFromHome)

	//for some reason the squiddie require increment of its own radius, whereas biter need not
	var distanceFromPlayer = Math.min(dist(me.x + me.radius,me.y + me.radius,playerX,playerY),
										dist(me.x, me.y, playerX, playerY));
	//console.log('AI debug: distanceFromPlayer='+distanceFromPlayer)

	//ensure that the cooldown timer runs regardless of whether the player is near to the enemy or not
	if(damageCooldownTimer > 0) {
		damageCooldownTimer++;
		if(damageCooldownTimer > DAMAGE_COOLDOWN_TIMER) {
			damageCooldownTimer = 0;
		}
		//console.log(damageCooldownTimer);
	}
	
	//check for distance between player and aliens, assuming player gets damage regardless of alien type
	if(distanceFromPlayer <= ENEMY_DAMAGE_RANGE) {
		if(damageCooldownTimer === 0) {
			//console.log("player x, y "+playerX+" , "+playerY+" my x,y "+me.x+" , "+me.y);
			takeDamage(ENEMY_DAMAGE_AMOUNT);
			//temporarily using this sound to indicate taking damage from alien
			if (!Sound.isPlaying('bump')) Sound.play('bump',false,soundVolume);
			damageCooldownTimer++;
		}
	}
	if(warningCooldownTimer == 0) {
		//console.log("player x, y "+playerX+" , "+playerY+" my x,y "+me.x+" , "+me.y);
		//onsole.log(distanceFromPlayer);
	}

	if (me.gameObjectType == ALIEN_SQUID)
	{
		
		//console.log(distanceFromPlayer);
		var oldX = me.x;
		// console.log('AI debug: ALIEN_SQUID wobble!');
		// simple sin wave back and forth, with offset so they don't move in phase
		me.x = me.ai_spawnX + (Math.sin(me.ai_spawnY + (ai_timestamp / 314)) * ALIEN_MOVE_SPEED);
		if(me.x < oldX) me.flip = true;
		else me.flip = false;
	}
	else if (me.gameObjectType == BALL_ALIEN)
	{
		/* 
		What I intend to try for the ball alien:
		* Ball alien initializes as dormant.  Eyes and mouth closed.
		* Player reaches a specific distance in the ball alien's outer radius and then the ball alien
			opens its eyes; startled.
		* Player comes even closer to a specific distance from the ball alien and it opens its eyes, growls, begins a spin-loop, and aggressively chases the player.
		- Dana
		*/

		//console.log(distanceFromPlayer);
		var oldX = me.x;
		// console.log('AI debug: ALIEN_SQUID wobble!');
		// simple sin wave back and forth, with offset so they don't move in phase
		me.x = me.ai_spawnX + (Math.sin(me.ai_spawnY + (ai_timestamp / 628)) * (ALIEN_MOVE_SPEED + 70));
		if(me.x < oldX) me.flip = true;
		else me.flip = false;
	}
	else // if (me.gameObjectType == ALIEN_BITER)
	{
		var moveDist = 1; // FIXME TODO framarate independent floating point distances: ai_seconds_since_last_update * ALIEN_MOVE_SPEED;
		// move towards player within a range
		if (/*(distanceFromHome < ALIEN_MOVE_RANGE * ALIEN_MOVE_RANGE) && *//*me.alive &&*/ (distanceFromPlayer < AI_SEEK_RANGE * AI_SEEK_RANGE))
		{
			//console.log(distanceFromPlayer);
			if(warningCooldownTimer == 0) {
				warningCooldownTimer++;
				party(me.x, me.y, PARTICLE_WARNING_SMALL, 0, 0, 0, 8);
			} else {
				warningCooldownTimer++;
				if(warningCooldownTimer > WARNING_COOLDOWN) {
					warningCooldownTimer = 0;
				}
			}
			
			//console.log('AI debug: ALIEN_BITER seeking '+distanceFromPlayer+' until '+distanceFromHome);
			if (me.x < playerX) {
				me.x += moveDist;
				me.flip = true;
			}
			if (me.x > playerX) {
				me.x -= moveDist;
				me.flip = false;
			}
			if (me.y < playerY && me.y < playerY + player_RADIUS) me.y += moveDist;
			if (me.y > playerY && me.y > playerY - player_RADIUS ) me.y -= moveDist;

			/*if(distanceFromPlayer <= ENEMY_DAMAGE_RANGE) {
				if(damageCooldownTimer === 0) {
					takeDamage(ENEMY_DAMAGE_AMOUNT);
					//playerHealth -= ENEMY_DAMAGE_AMOUNT;
					//temporarily using this sound to indicate taking damage from alien
					if (!Sound.isPlaying('bump')) Sound.play('bump',false,soundVolume);
					damageCooldownTimer++;
				}
			}*/
		}
		else // go back home
		{
			//console.log('AI debug: ALIEN_BITER going home: '+distanceFromHome);
			if (me.x < me.ai_spawnX) me.x += moveDist;
			if (me.x > me.ai_spawnX) me.x -= moveDist;
			if (me.y < me.ai_spawnY) me.y += moveDist;
			if (me.y > me.ai_spawnY) me.y -= moveDist;
		}
		
	}
}