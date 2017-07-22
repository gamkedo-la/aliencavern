const BRICK_W = 64;
const BRICK_H = 64;
const BRICK_GAP = 1;
const BRICK_COLS = 14;
const BRICK_ROWS = 54;

const BKGND_ROCK = 0;

const ALIEN_SQUID = 20;
const ALIEN_PLANT = 21;
const ALIEN_PLANT_2 = 22;
const ALIEN_PLANT_3 = 23;
const ALIEN_BITER = 24;
const TILE_FIRST_NON_WALL = ALIEN_SQUID;


const CREW = 30;
const SHIP_PART = 31;
const FUEL = 32;

const GEYSERS = 41;
const LAVA = 42;
const SPIKES = 43;

// Story Level Numbers
const LEVEL_ONE = 0;
const LEVEL_TWO = 1;
const LEVEL_THREE = 2;
const LEVEL_FOUR = 3;
const LEVEL_FIVE = 4;

// Note tiles 0 - 9 are all cavern tiles
// 0 = Background
// for demo / pitch only

var levelGrids = [];

levelGrids[LEVEL_ONE] = [8,8,8,2,5,0,0,0,7,2,2,2,8,8,1,1,4,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,41,0,0,0,43,0,0,0,0,0,3,1,4,0,9,0,6,8,5,0,0,0,0,30,3,1,0,0,0,0,0,0,0,0,0,0,0,8,3,1,0,0,32,0,0,0,0,0,0,20,31,3,3,1,0,0,2,2,0,0,0,0,0,7,2,3,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,30,21,0,0,0,24,0,0,0,30,3,3,1,8,8,5,0,0,0,0,0,0,0,8,3,3,1,1,1,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,43,32,0,32,43,0,0,3,3,1,31,21,0,0,6,42,2,42,5,0,0,0,3,1,8,8,0,0,0,0,0,0,0,0,0,0,3,1,3,4,0,0,0,0,20,0,0,21,0,30,3,1,3,4,0,24,0,0,0,0,0,6,2,2,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,0,8,8,0,0,0,30,3,3,1,0,0,0,0,0,1,1,0,0,0,8,3,3,1,30,0,0,0,0,0,0,20,0,0,3,3,3,1,8,4,0,0,24,0,0,0,0,0,3,3,3,1,3,4,0,0,0,0,0,0,41,31,3,3,3,1,3,4,0,0,0,0,0,0,8,8,3,3,3,1,4,0,0,0,0,0,0,0,3,3,3,3,3,1,4,0,20,24,0,0,0,8,3,3,3,3,3,1,4,0,0,0,0,0,0,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,1,3,1,8,8,8,0,0,24,0,0,21,0,30,1,3,1,3,3,0,0,0,0,0,6,2,2,2,1,3,1,3,3,0,0,0,0,0,0,0,0,0,1,3,1,3,3,0,0,0,6,5,0,0,0,0,0,3,1,0,0,20,0,0,0,0,0,0,0,30,30,3,1,30,21,30,0,21,0,0,0,0,0,3,3,3,1,8,8,8,8,8,0,0,0,0,3,3,3,3,1,3,3,3,4,0,0,0,0,0,3,3,3,3,1,3,3,4,0,0,0,0,0,0,0,0,0,3,1,3,3,4,0,0,20,24,0,24,0,20,0,3,1,0,0,4,0,0,0,0,0,2,0,0,0,3,1,0,0,4,0,0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,20,24,0,0,0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,31,6,3,1,30,8,0,0,0,0,0,0,7,2,2,3,3,1,8,1,8,8,0,0,0,0,0,0,3,3,3,1,0,0,0,0,0,0,31,0,0,0,3,3,3,1,0,0,20,0,0,6,2,5,0,0,3,3,3,1,0,0,31,20,0,0,0,0,0,0,3,3,3,1,0,0,8,8,0,24,0,20,0,31,3,3,3,1,0,0,1,1,0,20,0,0,3,3,3,3,3,1,0,0,1,1,0,0,0,0,3,3,3,3,3,1,31,21,1,1,21,31,31,21,3,3,3,3,3,1,8,8,1,1,8,8,8,1,1,1,1,1,3]
;
levelGrids[LEVEL_TWO] = [1,2,2,2,2,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2,2,2,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,6,8,5,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,8,8,8,8,2,0,0,0,0,8,0,1,1,0,0,0,0,0,0,2,22,0,43,1,0,1,1,0,0,0,0,0,0,1,8,42,2,0,0,1,1,0,0,0,0,0,0,1,1,2,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,0,1,0,1,1,0,0,0,0,1,1,0,0,32,0,42,0,0,0,0,0,0,0,1,1,0,24,43,42,0,0,0,0,0,0,0,0,1,1,0,0,3,1,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,6,1,1,2,2,5,22,21,0,0,22,21,6,2,2,1,1,2,2,2,2,5,0,0,6,2,0,0,0,1,1,2,0,0,0,24,0,0,24,0,0,0,0,1,1,2,20,0,0,0,0,0,0,0,0,0,20,1,1,0,0,0,0,0,30,31,0,0,0,0,24,1,1,42,24,0,0,0,2,2,0,0,0,20,42,1,1,42,42,20,0,0,24,0,0,20,42,42,42,1,1,5,42,42,24,0,0,0,24,42,42,42,5,1,1,5,42,42,42,20,0,0,24,42,42,5,5,1,1,5,5,42,42,32,32,32,42,42,42,5,5,1,1,5,5,5,5,42,32,42,5,5,5,5,5,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1]
;
levelGrids[LEVEL_THREE] = [1,2,2,2,1,0,0,1,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,24,0,24,0,0,20,0,0,20,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,43,0,0,0,0,0,0,0,0,1,1,20,32,6,3,42,42,42,43,41,0,0,0,1,1,0,2,3,3,3,3,3,3,9,5,0,24,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,5,0,0,0,0,0,0,0,0,0,0,1,1,3,3,4,0,0,0,0,0,0,0,0,0,1,1,3,4,0,0,0,0,0,0,0,0,0,30,1,1,0,0,0,0,0,0,0,6,2,42,30,8,1,1,32,43,22,0,0,0,0,3,3,3,3,24,1,1,2,2,2,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,31,0,0,0,0,0,0,3,31,0,0,1,1,2,2,2,2,0,0,0,3,3,3,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1]
;

var cavernGrid = [];
// var cavernGrid = 
// [8,8,8,2,5,0,0,0,7,2,2,2,8,8,1,1,4,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,41,0,0,0,43,0,0,0,0,0,3,1,4,0,9,0,6,8,5,0,0,0,0,30,3,1,0,0,0,0,0,0,0,0,0,0,0,8,3,1,0,0,32,0,0,0,0,0,0,20,31,3,3,1,0,0,2,2,0,0,0,0,0,7,2,3,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,30,21,0,0,0,24,0,0,0,30,3,3,1,8,8,5,0,0,0,0,0,0,0,8,3,3,1,1,1,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,43,32,0,32,43,0,0,3,3,1,31,21,0,0,6,42,2,42,5,0,0,0,3,1,8,8,0,0,0,0,0,0,0,0,0,0,3,1,3,4,0,0,0,0,20,0,0,21,0,30,3,1,3,4,0,24,0,0,0,0,0,6,2,2,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,0,8,8,0,0,0,30,3,3,1,0,0,0,0,0,1,1,0,0,0,8,3,3,1,30,0,0,0,0,0,0,20,0,0,3,3,3,1,8,4,0,0,24,0,0,0,0,0,3,3,3,1,3,4,0,0,0,0,0,0,41,31,3,3,3,1,3,4,0,0,0,0,0,0,8,8,3,3,3,1,4,0,0,0,0,0,0,0,3,3,3,3,3,1,4,0,20,24,0,0,0,8,3,3,3,3,3,1,4,0,0,0,0,0,0,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,1,3,1,8,8,8,0,0,24,0,0,21,0,30,1,3,1,3,3,0,0,0,0,0,6,2,2,2,1,3,1,3,3,0,0,0,0,0,0,0,0,0,1,3,1,3,3,0,0,0,6,5,0,0,0,0,0,3,1,0,0,20,0,0,0,0,0,0,0,30,30,3,1,30,21,30,0,21,0,0,0,0,0,3,3,3,1,8,8,8,8,8,0,0,0,0,3,3,3,3,1,3,3,3,4,0,0,0,0,0,3,3,3,3,1,3,3,4,0,0,0,0,0,0,0,0,0,3,1,3,3,4,0,0,20,24,0,24,0,20,0,3,1,0,0,4,0,0,0,0,0,2,0,0,0,3,1,0,0,4,0,0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,20,24,0,0,0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,31,6,3,1,30,8,0,0,0,0,0,0,7,2,2,3,3,1,8,1,8,8,0,0,0,0,0,0,3,3,3,1,0,0,0,0,0,0,31,0,0,0,3,3,3,1,0,0,20,0,0,6,2,5,0,0,3,3,3,1,0,0,31,20,0,0,0,0,0,0,3,3,3,1,0,0,8,8,0,24,0,20,0,31,3,3,3,1,0,0,1,1,0,20,0,0,3,3,3,3,3,1,0,0,1,1,0,0,0,0,3,3,3,3,3,1,31,21,1,1,21,31,31,21,3,3,3,3,3,1,8,8,1,1,8,8,8,1,1,1,1,1,3]
// ;
// THE Work IN PROGRESS
// var cavernGrid = 
// [1,2,2,2,1,0,0,1,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,24,0,24,0,0,20,0,0,20,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,43,0,0,0,0,0,0,0,0,1,1,20,32,6,3,42,42,42,43,41,0,0,0,1,1,0,2,3,3,3,3,3,3,9,5,0,24,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,5,0,0,0,0,0,0,0,0,0,0,1,1,3,3,4,0,0,0,0,0,0,0,0,0,1,1,3,4,0,0,0,0,0,0,0,0,0,30,1,1,0,0,0,0,0,0,0,6,2,42,30,8,1,1,32,43,22,0,0,0,0,3,3,3,3,24,1,1,2,2,2,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,31,0,0,0,0,0,0,3,31,0,0,1,1,2,2,2,2,0,0,0,3,3,3,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1]
// ;
// THE PIT OF DESPAIR
// var cavernGrid = 
// [1,2,2,2,2,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,2,2,2,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,6,8,5,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,8,8,8,8,2,0,0,0,0,8,0,1,1,0,0,0,0,0,0,2,22,0,43,1,0,1,1,0,0,0,0,0,0,1,8,42,2,0,0,1,1,0,0,0,0,0,0,1,1,2,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,0,1,0,1,1,0,0,0,0,1,1,0,0,32,0,42,0,0,0,0,0,0,0,1,1,0,24,43,42,0,0,0,0,0,0,0,0,1,1,0,0,3,1,3,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,6,1,1,2,2,5,22,21,0,0,22,21,6,2,2,1,1,2,2,2,2,5,0,0,6,2,0,0,0,1,1,2,0,0,0,24,0,0,24,0,0,0,0,1,1,2,20,0,0,0,0,0,0,0,0,0,20,1,1,0,0,0,0,0,30,31,0,0,0,0,24,1,1,42,24,0,0,0,2,2,0,0,0,20,42,1,1,42,42,20,0,0,24,0,0,20,42,42,42,1,1,5,42,42,24,0,0,0,24,42,42,42,5,1,1,5,42,42,42,20,0,0,24,42,42,5,5,1,1,5,5,42,42,32,32,32,42,42,42,5,5,1,1,5,5,5,5,42,32,42,5,5,5,5,5,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1]
// ;

//var cavernGrid = [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,31,42,42,42,0,0,0,0,0,0,0,1,1,0,31,31,0,0,0,20,0,0,0,0,0,1,1,0,31,31,0,20,0,20,0,0,0,0,0,1,1,0,31,0,0,20,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,20,0,0,0,0,0,1,1,0,0,0,0,0,20,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,20,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,20,0,20,0,0,0,1,1,0,0,0,0,0,0,0,0,20,0,0,0,1,1,0,0,0,0,0,0,20,0,0,0,0,0,1,1,0,0,0,0,0,0,0,20,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,5,0,0,0,0,0,0,0,1,1,1,30,0,0,0,0,0,0,0,0,0,0,1,1,1,8,8,8,2,2,2,5,0,0,7,2,1,1,1,8,8,8,2,2,2,0,0,0,0,3,1,1,3,3,0,1,1,32,22,0,0,24,30,1,1,1,3,0,0,1,1,1,8,0,0,0,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,0,0,0,0,8,0,1,1,0,20,0,0,0,0,0,0,20,0,8,0,1,1,0,0,0,8,0,8,0,0,0,0,0,0,1,1,0,0,8,0,0,0,0,0,0,0,0,0,1,1,0,8,0,0,0,0,0,0,0,0,8,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,8,0,8,0,8,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,8,0,0,1,1,0,0,0,0,20,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,20,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1];
