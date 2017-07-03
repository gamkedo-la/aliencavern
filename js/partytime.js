/**
 *
 * PARTYTIME!
 *
 * a simple particle system 
 * made for gamkedo by mcfunkypants
 *
 */
 
const DEBUG_PARTICLES = false;

// game-specific particles.png row numbers
const PARTICLE_DUST = 0;
const PARTICLE_PLANT = 1;
const PARTICLE_THRUST = 2;
const PARTICLE_BOOST_L = 3;
const PARTICLE_BOOST_R = 4;
const PARTICLE_EXPLOSION = 5;
const PARTICLE_SQUIDDIE_EXPLOSION = 6;

var particles_enabled = true;
var particle_timestamp = (new Date()).getTime();
var particles = []; // a SpriteList containing all of them
var particle_w = 64;
var particle_h = 64;
var particle_scale = 1; // double the pixels?
var particle_offsetx = -1 * Math.round(particle_w/2) * particle_scale;
var particle_offsety = -1 * Math.round(particle_h/2) * particle_scale;
var particle_spritesheet_framecount = 16; // spritesheet frames per anim
var PARTICLE_FPS = 60; //24;
var PARTICLE_FRAME_MS = 1000/PARTICLE_FPS; // 15 = 60fps - looks fine much slower too
var FAR_AWAY = -999999;

// one huge spritesheet for all particles
var spritesheet_image = null;
var spritesheet_image_finished_loading = false;

/**
 * spawns a spritesheet-based particle animation at these coordinates
 * implements a reuse POOL and only makes new objects when required
 */
function party(x, y, particleType, destX, destY, delayFrames) {

	//console.log('party ' + x + ',' + y);

	if (!particles_enabled) return;
	if (!spritesheet_image_finished_loading) return;

	if (!delayFrames) delayFrames = 0; // deal with undefined

	var p, pnum, pcount;
	if (!particleType) particleType = 0;
	//	particleType = Math.floor(Math.random() * 1.99999); // random cycle between the first two

	for (pnum = 0, pcount = particles.length; pnum < pcount; pnum++)
	{
		p = particles[pnum];
		if (p && p.inactive) {
			break;
		}
	}

	// we need a new particle!
	if (!p || !p.inactive)
	{
		if (DEBUG_PARTICLES) console.log('No inactive particles. Adding particle #' + pcount);

		var particle = { x : FAR_AWAY, y : FAR_AWAY, inactive : true };
		// remember this new particle in our system and reuse
		particles.push(particle);
		p = particle;
	}

	if (p && p.inactive) {
		p.x = x + particle_offsetx; // FIXME: account for scale (eg x4)
		p.y = y + particle_offsety;
		p.particle_type = particleType;
		p.delayFrames = delayFrames; // MS3 - can be delayed by a number of frames
		p.inactive = false;
		p.anim_frame = 0;//particleType * particle_spritesheet_framecount;
		p.anim_start_frame = particleType * particle_spritesheet_framecount;
		p.anim_end_frame = p.anim_start_frame + particle_spritesheet_framecount;
		p.anim_last_tick = particle_timestamp;
		p.next_frame_timestamp = particle_timestamp + PARTICLE_FRAME_MS;
		p.anim_sum_tick = 0;
		p.scale = particle_scale;

		// optionally moving particles
		if (destX && destY) {
			p.moving = true;
			p.destX = destX;
			p.destY = destY;
			// rotate: lookAt(p, destX, destY);
			p.speedX = (destX - x) / particle_spritesheet_framecount;
			p.speedY = (destY - y) / particle_spritesheet_framecount;
		} else {
			p.moving = false;
		}

	}

}

function clearParticles() {
	if (DEBUG_PARTICLES) console.log('clearParticles');
	particles.forEach(function (p) {
		p.x = p.y = FAR_AWAY; // throw offscreen
		p.inactive = true;
	});
}

/**
 * steps the particle effects simulation
 */
var active_particle_count = 0; // how many we updated last frame
function updateParticles()
{
	if (!particles_enabled)	return;

	// get the current time
	particle_timestamp = (new Date()).getTime();

	active_particle_count = 0;

	// animate the particles
	particles.forEach(
		function (p) {
		if (!p.inactive) {

			active_particle_count++;

			if (p.delayFrames>0)
			{
				//log('delaying particle: ' + p.delayFrames)
				p.delayFrames--;
			}
			else // non-delayed particles:
			{
				//p.anim_last_tick = particle_timestamp; // not actually used OPTI

				// moving particles
				if (p.moving) {
					p.x += p.speedX;
					p.y += p.speedY;
				}

				if (p.anim_frame >= p.anim_end_frame) {
					if (DEBUG_PARTICLES) console.log('particle anim ended');
					p.x = p.y = FAR_AWAY; // throw offscreen
					p.inactive = true;
				} else {

					if (particle_timestamp >= p.next_frame_timestamp)
					{
						p.next_frame_timestamp = particle_timestamp + PARTICLE_FRAME_MS;
						p.anim_frame++; // TODO: ping pong anims?
					}

				}
			}
		}
	});
	if ((active_particle_count >0)
		&& (prev_active_particle_count != active_particle_count))
	{
		if (DEBUG_PARTICLES) console.log('Active particles: ' + active_particle_count);
		prev_active_particle_count = active_particle_count;
	}
}
var prev_active_particle_count = 0;

function draw_particles(camerax,cameray)
{
	// if (DEBUG_PARTICLES) console.log('draw_particles');
	if (!camerax) camerax = 0;
	if (!cameray) cameray = 0;

	particles.forEach(
		function (p) {
			if (!p.inactive) // and visible in screen bbox
			{
				if (window.canvasContext) // sanity check
				{
					if (p.particle_type)
					{
						if (DEBUG_PARTICLES) {
							console.log('particle type ' + p.particle_type +
							' sx:' + (p.anim_frame * particle_w) +
							' sy:' + (p.particle_type * particle_h) +
							' wh:' + (particle_w) + ',' + (particle_h) +
							' xy:' + (p.x - camerax) + ',' + (p.y - cameray) + 
							' sc:' + (particle_w * p.scale) + ',' + (particle_h * p.scale));
						}
					} 
					canvasContext.drawImage(spritesheet_image,
					p.anim_frame * particle_w,
					p.particle_type * particle_h,
					particle_w, particle_h,
					p.x - camerax, p.y - cameray,
					particle_w * p.scale, particle_h * p.scale);
				}
			}
		}
	);
}

function init_particles()
{
	if (DEBUG_PARTICLES) console.log('init_particles...');
	spritesheet_image = new Image();
	spritesheet_image.src = 'graphics/particles3.png';
	spritesheet_image.onload = function()	{
		if (DEBUG_PARTICLES) console.log('particle_image loaded.');
		spritesheet_image_finished_loading = true;
	}
	spritesheet_image.onerror = function() {
		if (DEBUG_PARTICLES) console.log('Failed to download particle_image.');
	}
}
