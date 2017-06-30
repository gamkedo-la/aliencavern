// Alien Artificial Intelligence
// made for Gamkedo by McFunkypants

const ALIEN_MOVE_SPEED = 16; // pixels per second
const ALIEN_MOVE_RANGE = 32; // pixels back and forth

var ai_timestamp = 0;

function updateAliens()
{
	if (!window.squiddies && !window.biters) return; // sanity check
	
	ai_timestamp = performance.now();
	
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

	// how far away are we from our origin (never stray too far away)
	var distanceFromHome = dist(me.x,me.y,me.ai_spawnX,me.ai_spawnY);
	//console.log('AI debug: distanceFromHome='+distanceFromHome)

	// simple sin wave back and forth, with offset so they don't move in phase
	me.x = me.ai_spawnX + (Math.sin(me.ai_spawnY + (ai_timestamp / 314)) * ALIEN_MOVE_SPEED);
}