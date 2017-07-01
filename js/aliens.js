// Alien Artificial Intelligence
// made for Gamkedo by McFunkypants

const ALIEN_MOVE_SPEED = 16; // pixels per second
const ALIEN_MOVE_RANGE = 64; // pixels away from spawn location
const AI_SEEK_RANGE = 200; // player must be nearby to be noticed

var ai_timestamp = 0;
var ai_prev_timestamp = 0;
var ai_seconds_since_last_update = 0;

function updateAliens()
{
	if (!window.squiddies && !window.biters) return; // sanity check

	ai_timestamp = performance.now();
	ai_seconds_since_last_update = ai_timestamp - ai_prev_timestamp;
	ai_prev_timestamp = ai_timestamp;

	squiddies.forEach(alienAI);
	biters.forEach(alienAI);
}

function dist(x1,y1,x2,y2)
{
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}

function alienAI(me)
{
	if (!me.ai_birthday) // ai init required
	{	// remember where we were when we started
		me.ai_birthday = ai_timestamp;
		me.ai_spawnX = me.x;
		me.ai_spawnY = me.y;
	}

	//console.log('AI debug: me.gameObjectType='+me.gameObjectType);

	// how far away are we from our origin (never stray too far away)
	var distanceFromHome = dist(me.x,me.y,me.ai_spawnX,me.ai_spawnY);
	//console.log('AI debug: distanceFromHome='+distanceFromHome)

	var distanceFromPlayer = dist(me.x,me.y,playerX,playerY);
	//console.log('AI debug: distanceFromPlayer='+distanceFromPlayer)

	if (me.gameObjectType == ALIEN_SQUID)
	{
		// console.log('AI debug: ALIEN_SQUID wobble!');
		// simple sin wave back and forth, with offset so they don't move in phase
		me.x = me.ai_spawnX + (Math.sin(me.ai_spawnY + (ai_timestamp / 314)) * ALIEN_MOVE_SPEED);
	}
	else // if (me.gameObjectType == ALIEN_BITER)
	{
		var moveDist = 1; // FIXME TODO framarate independent floating point distances: ai_seconds_since_last_update * ALIEN_MOVE_SPEED;
		// move towards player within a range
		if ((distanceFromHome < ALIEN_MOVE_RANGE) && (distanceFromPlayer < AI_SEEK_RANGE))
		{
			//console.log('AI debug: ALIEN_BITER seeking '+distanceFromPlayer+' until '+distanceFromHome);
			if (me.x < playerX) me.x += moveDist;
			if (me.x > playerX) me.x -= moveDist;
			if (me.y < playerY) me.y += moveDist;
			if (me.y > playerY) me.y -= moveDist;
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