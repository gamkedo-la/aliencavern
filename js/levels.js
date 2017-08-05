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
const PLANKTON_FROGGY = 25;
const BALL_ALIEN = 26;
const PLANKTON1 = 27;
const PLANKTON2 = 28;
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
const LEVEL_SIX = 5;
const LEVEL_SEVEN = 6;
const LEVEL_EIGHT = 7;
const LEVEL_NINE = 8;
const LEVEL_TEN = 9;
const MY_LEVEL = 10000;

// Note tiles 0 - 9 are all cavern tiles
// 0 = Background
// for demo / pitch only

var levelGrids = [];
var myLevel = [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1]
;
var myLevelNumber = LEVEL_ONE;

// levelGrids[LEVEL_ONE] = [8,8,8,2,5,0,0,0,7,2,2,2,8,8,1,1,4,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,0,0,0,0,0,0,0,0,0,3,3,1,4,0,41,0,0,0,43,0,0,0,0,0,3,1,4,0,9,0,6,8,5,0,0,0,26,30,3,1,0,0,0,0,0,0,0,0,0,0,0,8,3,1,0,0,32,0,0,0,0,0,0,20,31,3,3,1,0,0,2,2,0,0,0,0,0,7,2,3,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,30,21,0,0,0,24,0,0,0,30,3,3,1,8,8,5,0,0,0,0,0,0,0,8,3,3,1,1,1,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,43,32,0,32,43,0,0,3,3,1,31,21,0,0,6,42,2,42,5,0,0,0,3,1,8,8,0,0,0,0,0,0,0,0,0,0,3,1,3,4,0,0,0,0,20,0,0,21,0,30,3,1,3,4,0,24,0,0,0,0,0,6,2,2,3,1,0,0,0,0,0,0,0,0,0,0,0,3,3,1,0,0,0,0,0,8,8,0,0,0,30,3,3,1,0,0,0,0,0,1,1,0,0,0,8,3,3,1,30,0,0,0,0,0,0,20,0,0,3,3,3,1,8,4,0,0,24,0,0,0,0,0,3,3,3,1,3,4,0,0,0,0,0,0,41,31,3,3,3,1,3,4,0,0,0,0,0,0,8,8,3,3,3,1,4,0,0,0,0,0,0,0,3,3,3,3,3,1,4,0,20,24,0,0,0,8,3,3,3,3,3,1,4,0,0,0,0,0,0,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,1,1,3,1,0,0,0,0,0,0,0,0,0,0,0,1,3,1,8,8,8,0,0,24,0,0,21,0,30,1,3,1,3,3,0,0,0,0,0,6,2,2,2,1,3,1,3,3,0,0,0,0,0,0,0,0,0,1,3,1,3,3,0,0,0,6,5,0,0,0,0,0,3,1,0,0,20,0,0,0,0,0,0,0,30,30,3,1,30,21,30,0,21,0,0,0,0,0,3,3,3,1,8,8,8,8,8,0,0,0,0,3,3,3,3,1,3,3,3,4,0,0,0,0,0,3,3,3,3,1,3,3,4,0,0,0,0,0,0,0,0,0,3,1,3,3,4,0,0,20,24,0,24,0,20,0,3,1,0,0,4,0,0,0,0,0,2,0,0,0,3,1,0,0,4,0,0,0,0,0,0,0,0,0,3,1,0,0,0,0,0,20,24,0,0,0,0,0,3,1,0,0,0,0,0,0,0,0,0,0,31,6,3,1,30,8,0,0,0,0,0,0,7,2,2,3,3,1,8,1,8,8,0,0,0,0,0,0,3,3,3,1,0,0,0,0,0,0,31,0,0,0,3,3,3,1,0,0,20,0,0,6,2,5,0,0,3,3,3,1,0,0,31,20,0,0,0,0,0,0,3,3,3,1,0,0,8,8,0,24,0,20,0,31,3,3,3,1,0,0,1,1,0,20,0,0,3,3,3,3,3,1,0,0,1,1,0,0,0,0,3,3,3,3,3,1,31,21,1,1,21,31,31,21,3,3,3,3,3,1,8,8,1,1,8,8,8,1,1,1,1,1,3]
// ;

var cavernGrid = [];

// ============================================
// THE LEVELS FOR THE GAME - JUL 29 2017  - ZAK
// 


// Easy learning level
levelGrids[LEVEL_ONE] = [1,2,2,2,2,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,31,0,20,0,0,0,0,0,0,0,0,0,1,1,2,2,5,0,0,0,0,0,0,0,0,31,1,1,0,0,0,0,0,0,0,0,0,0,2,8,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,30,0,0,0,0,0,0,0,0,20,0,0,1,1,2,2,0,0,0,0,0,0,0,0,30,0,1,1,0,0,0,0,0,0,0,0,6,8,8,3,1,1,0,0,41,0,0,0,0,0,0,0,0,0,1,1,0,20,9,8,0,0,0,0,0,0,0,0,1,1,0,0,0,20,0,0,0,0,0,20,0,0,1,1,0,31,0,0,0,0,0,0,0,0,0,0,1,1,8,8,0,0,32,0,0,0,0,0,0,0,1,1,0,0,0,0,2,0,0,0,0,30,0,0,1,1,0,0,0,0,0,0,20,0,0,6,3,2,1,1,20,31,41,0,0,0,0,0,0,0,0,0,1,1,8,8,9,8,0,0,0,0,0,0,0,0,1,1,0,0,2,2,0,0,0,0,0,0,0,0,1,1,30,0,0,21,0,0,0,0,6,5,0,0,1,1,8,8,8,8,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,6,2,2,2,1,1,8,8,21,21,0,0,0,20,0,0,0,0,1,1,0,0,21,21,0,0,0,0,0,0,0,0,1,1,32,30,21,21,0,0,0,0,6,2,0,30,1,1,30,31,21,8,0,0,0,0,3,3,3,3,1,1,3,3,3,3,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,32,0,0,30,0,26,0,0,1,1,0,0,6,3,4,0,0,3,4,0,0,0,1,1,0,0,0,0,4,0,0,3,0,0,0,0,1,1,0,0,20,0,4,0,0,3,0,0,0,0,1,1,0,0,0,31,4,0,0,3,30,0,0,0,1,1,0,0,6,3,4,0,0,3,3,3,4,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,30,0,0,0,0,0,0,0,0,1,1,0,0,3,4,0,26,0,0,7,8,8,8,1,1,0,0,3,4,0,0,0,0,0,3,3,3,1,1,0,0,0,0,0,0,0,0,26,0,3,3,1,1,30,0,0,0,0,0,0,8,32,31,30,3,1,1,8,8,5,0,0,0,0,3,8,8,8,3,1,1,0,0,0,0,0,0,0,0,0,0,22,22,1,1,0,0,0,0,0,0,0,0,0,0,22,22,1,1,32,0,20,0,0,0,0,0,22,22,22,32,1,1,3,3,3,5,0,0,0,0,6,2,2,2,1,1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,3,30,0,0,0,0,0,0,0,0,0,30,1,1,3,2,2,2,0,20,0,8,20,0,2,2,1,1,0,0,0,26,0,0,0,26,0,0,0,0,1,1,41,32,0,41,0,30,31,41,31,30,31,41,1,1,9,1,1,9,1,1,1,9,1,1,1,9,1]
;
levelGrids[LEVEL_TWO] = [1,3,3,3,3,1,25,25,25,2,3,3,3,2,1,0,0,24,0,0,25,25,0,24,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,3,0,2,1,25,31,43,0,0,0,0,0,0,25,3,0,2,1,3,3,3,25,0,0,0,0,0,0,0,0,2,1,0,0,0,0,43,0,0,0,0,32,0,30,2,1,0,25,0,0,3,3,3,3,3,42,42,3,2,1,0,25,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,20,0,31,0,30,1,2,1,0,0,0,0,0,0,2,3,3,3,3,3,2,1,3,3,0,0,0,0,2,24,0,0,0,24,2,1,0,0,0,21,0,0,2,0,0,32,0,0,2,1,32,0,0,3,0,0,20,0,0,3,0,0,2,1,3,0,0,0,0,0,24,31,32,3,0,0,2,1,30,0,0,25,0,0,2,3,3,3,0,30,2,1,3,21,0,0,0,0,25,0,0,0,25,3,2,1,30,3,0,0,0,0,25,0,0,0,3,32,2,1,0,32,3,24,0,0,3,3,3,3,0,24,2,1,20,0,0,3,0,0,0,0,0,0,0,25,2,1,0,0,0,0,0,0,0,0,0,25,0,0,2,1,20,0,0,25,22,25,0,0,25,25,0,0,2,1,0,31,3,1,2,3,0,0,42,3,0,0,2,1,30,3,32,31,2,24,0,25,3,3,0,0,2,1,3,24,25,25,2,25,25,25,3,3,0,25,2,1,0,0,0,0,0,0,0,0,0,24,0,0,2,1,25,0,0,20,0,0,0,20,0,0,0,0,2,1,0,25,0,3,25,25,25,3,25,0,0,0,2,1,0,30,0,0,0,32,0,25,0,0,32,0,2,1,0,3,0,0,0,3,0,0,0,25,3,0,2,1,0,0,25,31,25,0,0,30,0,0,0,0,2,1,0,0,0,3,0,0,0,3,0,0,0,0,2,1,0,0,43,30,43,0,0,0,32,32,0,0,2,1,20,0,3,3,3,20,0,24,3,3,25,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,24,24,0,0,0,0,0,0,2,1,0,3,0,0,3,3,0,0,3,3,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,41,0,0,0,0,0,0,0,0,0,0,2,1,0,3,0,0,0,25,0,25,0,0,0,25,2,1,30,3,0,0,0,0,0,24,0,0,0,0,2,1,0,3,3,32,0,25,3,30,3,0,0,0,2,1,0,0,3,1,42,3,3,3,3,0,25,25,2,1,0,25,0,1,0,2,32,0,0,0,0,0,2,1,0,0,0,1,30,2,32,32,0,0,0,0,2,1,0,0,0,1,3,2,30,43,42,0,0,0,2,1,0,25,0,1,3,3,3,3,3,20,0,25,2,1,0,0,0,0,0,0,0,0,3,0,0,0,2,1,31,24,0,30,0,31,24,30,3,25,0,20,2,1,3,3,3,3,3,3,3,3,3,0,0,0,2,1,3,24,24,0,24,24,0,0,24,20,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,30,32,32,0,0,0,0,0,0,0,0,0,2,1,3,3,3,32,32,0,32,0,0,31,0,31,2,1,2,3,3,3,3,3,3,3,3,3,3,1,2]
;
levelGrids[LEVEL_THREE] = [1,2,2,2,1,0,0,1,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,24,0,24,0,0,20,0,0,20,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,43,0,0,0,0,0,0,0,0,1,1,20,32,6,3,42,42,42,43,41,0,0,0,1,1,0,2,3,3,3,3,3,3,9,5,0,24,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,5,0,0,0,0,0,0,0,0,0,0,1,1,3,3,4,0,0,0,0,0,0,0,0,0,1,1,3,4,0,0,0,0,0,0,0,0,0,30,1,1,0,0,0,0,0,0,0,6,2,42,30,8,1,1,32,43,22,0,0,0,0,3,3,3,3,24,1,1,2,2,2,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,31,0,0,0,0,0,0,3,31,0,0,1,1,2,2,2,2,0,0,0,3,3,3,3,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,8,8,8,8,8,8,8,8,8,8,8,8,1]
;
// death drop with symmetrical branches - style 2 (cyan crystals) 
levelGrids[LEVEL_FOUR] = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,43,0,0,0,0,0,0,0,0,0,0,43,2,1,3,43,0,0,0,0,0,0,0,0,43,3,2,1,3,3,43,0,0,0,0,0,0,43,3,3,2,1,3,3,3,43,0,0,0,0,43,3,3,3,2,1,3,3,3,3,0,0,0,0,3,3,3,3,2,1,0,0,0,3,0,0,0,0,3,0,0,0,2,1,30,0,0,3,0,0,0,0,3,0,0,30,2,1,3,43,0,3,0,0,0,0,3,0,43,3,2,1,3,3,0,3,0,0,0,0,3,0,3,3,2,1,3,3,0,0,0,0,0,0,0,0,3,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,3,21,21,21,21,3,0,0,0,2,1,0,0,0,3,3,3,3,3,3,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,32,0,0,0,0,32,0,0,0,2,1,42,42,42,3,3,0,0,3,3,42,42,42,2,1,3,3,3,3,0,0,0,0,3,3,3,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,24,0,0,0,0,0,0,0,0,24,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,43,43,43,43,0,0,0,0,2,1,42,0,0,42,3,3,3,3,3,3,3,3,2,1,42,0,0,42,3,30,0,3,24,0,0,0,2,1,42,0,0,42,3,3,0,3,0,0,0,0,2,1,42,0,0,42,3,0,0,3,0,0,0,0,2,1,42,0,0,42,3,0,20,3,31,0,41,0,2,1,42,0,0,42,3,0,3,3,3,3,3,0,2,1,42,0,0,42,3,0,0,0,0,0,0,0,2,1,42,0,0,42,3,20,0,0,0,0,0,0,2,1,42,0,0,42,3,3,3,3,0,0,3,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,43,43,43,43,0,0,0,0,43,43,43,43,2,1,3,3,3,3,0,0,24,0,3,3,3,3,2,1,0,0,30,3,0,0,0,0,3,30,0,0,2,1,0,3,3,3,0,24,0,0,3,3,3,0,2,1,0,0,0,3,0,0,0,0,3,0,0,0,2,1,3,3,0,3,0,0,20,0,3,0,3,3,2,1,0,0,0,3,0,0,0,0,3,0,0,0,2,1,0,3,3,3,0,20,0,0,3,3,3,0,2,1,0,3,0,0,0,0,0,0,0,0,3,0,2,1,0,3,0,0,0,0,0,0,0,0,3,0,2,1,0,3,0,0,0,43,43,0,0,0,3,0,2,1,0,0,0,0,0,3,3,0,0,0,0,0,2,1,0,0,0,21,3,3,3,3,22,0,0,0,2,1,32,0,0,3,3,3,3,3,3,0,0,32,2,1,3,3,3,3,3,3,3,3,3,3,3,3,2]
;

// cups of doom - style 4 (purple hallways)
levelGrids[LEVEL_FIVE] =[1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,22,0,0,0,0,0,0,0,0,2,1,0,0,0,3,0,0,0,0,0,0,0,0,2,1,0,0,0,3,0,0,30,0,0,0,0,0,2,1,0,0,0,3,5,6,3,5,6,3,0,0,2,1,0,0,0,0,0,0,0,0,0,3,0,0,2,1,0,0,0,0,0,0,0,0,0,3,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,3,3,3,0,0,0,0,0,0,20,0,0,2,1,0,31,3,0,0,0,0,0,0,0,0,0,2,1,0,3,3,0,0,24,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,43,0,0,43,0,0,0,0,0,0,2,1,0,0,3,0,0,3,0,0,0,0,0,0,2,1,0,0,3,32,32,3,0,0,0,0,0,0,2,1,0,0,3,42,42,3,21,30,21,0,0,0,2,1,0,3,3,3,3,3,3,3,3,0,0,0,2,1,0,0,0,0,3,0,0,0,0,0,0,0,2,1,0,0,0,0,3,0,0,0,0,0,0,0,2,1,0,0,0,0,3,0,0,3,3,3,3,3,2,1,0,0,0,0,3,0,0,0,0,0,0,0,2,1,0,0,0,0,3,21,0,0,0,0,0,0,2,1,0,0,0,0,3,3,3,3,3,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,3,31,3,0,0,0,0,0,0,0,0,0,2,1,3,4,3,3,3,3,3,3,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,43,0,43,2,1,0,0,0,0,0,0,0,0,0,3,30,3,2,1,0,0,0,0,0,0,0,0,0,3,4,3,2,1,0,3,0,0,0,3,0,0,0,0,0,0,2,1,0,3,43,32,43,3,0,0,0,0,0,0,2,1,0,3,4,4,4,3,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,24,0,0,0,2,1,0,0,0,0,0,0,43,0,0,0,43,0,2,1,0,0,0,0,0,0,3,0,0,0,3,0,2,1,0,0,0,0,0,0,3,0,31,0,3,0,2,1,0,0,0,0,0,0,3,4,4,4,3,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,24,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,3,0,0,0,0,0,3,0,0,0,0,2,1,0,3,0,0,0,0,0,3,0,0,0,0,2,1,0,3,21,0,0,0,21,3,0,0,0,0,2,1,0,3,3,0,0,0,3,3,0,0,0,0,2,1,0,0,3,0,0,0,3,0,0,0,0,0,2,1,0,0,3,43,0,43,3,0,0,0,0,0,2,1,0,0,3,3,30,3,3,0,0,0,0,0,2,1,4,4,4,4,4,4,4,4,4,4,4,4,2]
;

// wide open empty arena - style 3 (green gradients)
levelGrids[LEVEL_SIX] = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,24,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,30,0,24,0,0,0,0,0,0,0,0,0,2,1,4,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,24,0,24,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,32,0,0,0,0,0,2,1,0,0,0,0,0,0,4,0,0,0,0,0,2,1,31,0,0,0,0,0,0,0,0,0,0,0,2,1,4,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,24,0,0,0,0,0,0,30,2,1,0,0,0,0,0,0,0,0,0,0,0,4,2,1,0,0,0,0,0,0,24,0,0,0,24,0,2,1,0,0,24,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,31,2,1,0,0,0,0,0,0,32,0,0,0,0,4,2,1,0,0,0,0,0,0,4,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,24,0,0,0,0,0,0,0,0,2,1,30,0,0,0,0,0,0,0,0,0,0,0,2,1,4,0,0,0,0,0,0,24,0,0,0,0,2,1,0,0,24,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,24,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,32,0,0,0,0,0,2,1,31,0,0,0,0,0,4,0,0,0,0,30,2,1,4,0,0,0,0,0,0,0,0,0,0,4,2,1,4,0,0,0,24,0,0,0,0,0,24,4,2,1,4,0,0,0,0,0,0,0,0,0,0,4,2,1,4,43,24,43,0,43,0,43,24,43,0,4,2,1,3,3,3,3,3,3,3,3,3,3,3,3,2]
;

// infestation zone - style 2 (cyan gems)
levelGrids[LEVEL_SEVEN] = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,43,43,43,43,43,43,43,2,1,0,0,0,0,0,3,3,3,3,3,3,3,2,1,0,0,0,0,0,1,2,0,0,0,0,0,2,1,0,0,25,0,0,1,2,30,30,30,0,0,2,1,0,0,0,0,0,1,2,3,3,3,0,0,2,1,0,43,0,0,0,1,2,0,0,0,0,0,2,1,0,3,0,25,0,1,2,0,0,30,30,30,2,1,0,0,0,0,0,1,2,0,0,3,3,3,2,1,0,0,0,0,0,1,2,0,0,0,0,0,2,1,0,25,0,0,0,1,2,30,30,30,0,0,2,1,0,0,0,0,0,1,2,3,3,3,0,0,2,1,0,0,0,43,0,1,2,0,0,0,0,0,2,1,0,0,0,3,0,1,2,0,0,0,0,0,2,1,0,0,0,0,0,1,2,0,0,0,25,0,2,1,0,25,0,0,0,1,2,0,43,0,0,0,2,1,0,0,0,0,0,1,2,0,3,0,0,0,2,1,0,0,0,0,0,1,2,0,0,0,0,0,2,1,0,43,0,0,0,1,2,0,0,0,43,0,2,1,0,3,0,0,0,1,2,0,0,0,3,0,2,1,0,0,0,25,0,1,2,0,0,0,0,0,2,1,0,0,0,0,0,1,2,0,43,0,25,0,2,1,0,43,0,0,0,1,2,0,3,0,0,0,2,1,0,3,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,43,2,1,0,25,0,43,0,0,25,0,0,43,0,3,2,1,0,0,0,3,0,43,0,0,0,3,0,0,2,1,0,0,0,0,0,3,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,25,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,3,3,0,0,3,3,0,0,0,0,0,2,1,0,3,0,0,0,0,3,0,0,0,0,0,2,1,0,3,32,32,32,32,3,0,0,0,0,0,2,1,0,3,3,3,3,3,3,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,25,0,0,0,0,0,0,2,1,0,25,0,0,0,0,0,0,25,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,25,0,0,0,25,0,0,25,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,3,3,0,0,0,0,0,2,1,43,0,0,0,43,1,2,43,0,0,0,43,2,1,3,0,0,0,3,1,2,3,0,0,0,3,2,1,0,0,0,0,0,1,2,0,0,0,0,0,2,1,0,0,24,0,0,1,2,0,0,24,0,0,2,1,0,0,0,0,0,1,2,0,0,0,0,0,2,1,31,32,41,41,30,1,2,30,41,41,32,31,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2]
;

// maze of cruelty - style 3 (green gradiants)
levelGrids[LEVEL_EIGHT] = [1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,4,2,1,0,0,30,0,0,0,0,0,0,0,0,4,2,1,0,3,4,3,3,3,3,4,3,3,3,3,2,1,0,0,0,0,0,0,0,4,0,0,0,0,2,1,0,0,0,0,0,0,0,4,0,0,0,0,2,1,0,0,24,0,0,0,0,4,31,0,0,0,2,1,0,0,0,0,0,0,0,3,4,3,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,4,4,4,4,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,24,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,20,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,4,4,4,4,4,4,0,0,0,0,0,32,2,1,0,0,0,0,0,4,0,0,0,0,0,42,2,1,0,0,0,0,30,4,4,4,4,0,0,0,2,1,0,0,0,3,4,3,0,0,4,0,0,0,2,1,0,0,0,0,0,0,0,0,4,30,0,0,2,1,0,0,0,0,0,0,0,0,3,4,3,0,2,1,0,0,0,0,0,0,24,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,31,0,0,0,0,0,0,0,4,2,1,0,0,2,4,4,4,4,3,3,3,3,3,2,1,0,0,2,4,1,0,0,0,0,0,0,0,2,1,0,0,2,4,1,0,24,0,0,0,0,0,2,1,32,0,2,4,1,0,0,0,4,0,0,0,2,1,42,0,2,4,1,0,0,0,4,43,30,0,2,1,4,0,2,4,1,0,0,0,4,4,4,0,2,1,4,0,0,0,0,0,0,0,0,0,0,0,2,1,4,3,3,3,4,0,0,0,0,0,0,0,2,1,0,0,30,0,4,0,0,0,0,0,0,0,2,1,0,0,4,0,4,0,0,0,0,25,0,0,2,1,0,0,4,0,4,4,4,4,0,0,0,0,2,1,0,0,4,0,0,0,0,2,0,0,0,32,2,1,0,0,4,0,43,30,43,2,0,0,0,42,2,1,0,0,4,4,3,4,3,4,0,0,0,0,2,1,0,0,25,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,31,0,0,2,1,0,0,0,4,3,3,3,3,3,4,3,0,2,1,0,20,0,4,0,0,0,0,0,0,0,0,2,1,4,4,4,4,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,4,3,3,3,3,4,2,1,0,0,0,0,20,0,4,0,0,20,0,0,2,1,0,0,0,4,4,4,4,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,30,0,2,1,43,43,43,43,43,43,43,43,43,3,4,3,2]
;

//
// ============================================

// GAME OBJECT TEST LEVEL

// levelGrids[LEVEL_ONE] = [1,2,2,2,2,0,0,0,0,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,31,0,20,0,0,0,0,0,0,0,0,0,1,1,2,2,5,0,0,0,0,0,0,0,0,31,1,1,0,0,0,0,0,0,0,0,0,0,2,8,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,30,0,0,0,0,0,0,0,0,20,0,0,1,1,2,2,0,0,0,0,0,0,0,0,30,0,1,1,0,0,0,0,0,0,0,0,6,8,8,3,1,1,0,0,41,0,0,0,0,0,0,0,0,0,1,1,0,20,9,8,0,0,0,0,0,0,0,0,1,1,0,0,0,20,0,0,0,0,0,20,0,0,1,1,0,31,0,0,0,0,0,0,0,0,0,0,1,1,8,8,0,0,32,0,0,0,0,0,0,0,1,1,0,0,0,0,2,0,0,0,0,30,0,0,1,1,0,0,0,0,0,0,20,0,0,6,3,2,1,1,20,31,41,0,0,0,0,0,0,0,0,0,1,1,8,8,9,8,0,0,0,0,0,0,0,0,1,1,0,0,2,2,0,0,0,0,0,0,0,0,1,1,30,0,0,21,0,0,0,0,6,5,0,0,1,1,8,8,8,8,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,6,2,2,2,1,1,8,8,21,21,0,0,0,20,0,0,0,0,1,1,0,0,21,21,0,0,0,0,0,0,0,0,1,1,32,30,21,21,0,0,0,0,6,2,0,30,1,1,30,31,21,8,0,0,0,0,3,3,3,3,1,1,3,3,3,3,0,0,0,0,0,0,0,0,1,1,0,0,0,0,27,0,0,27,0,0,28,0,1,1,0,0,28,0,0,0,0,0,27,0,0,0,1,1,0,0,0,0,32,27,0,30,0,26,0,0,1,1,0,28,6,3,4,0,0,3,4,0,0,0,1,1,0,0,0,0,4,0,28,3,0,0,0,0,1,1,28,0,20,0,4,0,0,3,0,0,0,28,1,1,0,0,0,31,4,0,28,3,30,0,0,0,1,1,0,0,6,3,4,28,0,3,3,3,4,0,1,1,0,0,0,0,0,0,0,0,28,0,28,0,1,1,0,0,0,30,0,0,0,0,0,0,0,0,1,1,0,0,3,4,0,26,0,0,7,8,8,8,1,1,0,0,3,4,0,0,0,0,0,3,3,3,1,1,0,0,0,0,0,0,0,0,26,0,3,3,1,1,30,0,0,0,0,0,0,8,32,31,30,3,1,1,8,8,5,0,0,0,0,3,8,8,8,3,1,1,0,0,0,0,0,0,0,0,0,0,22,22,1,1,0,0,0,0,0,0,0,0,0,0,22,22,1,1,32,0,20,0,0,0,0,0,22,22,22,32,1,1,3,3,3,5,0,0,0,0,6,2,2,2,1,1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,3,30,0,0,0,0,0,0,0,0,0,30,1,1,3,2,2,2,0,20,0,8,20,0,2,2,1,1,0,0,0,26,0,0,0,26,0,0,0,0,1,1,41,32,0,41,0,30,31,41,31,30,31,41,1,1,9,1,1,9,1,1,1,9,1,1,1,9,1]
// ;
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

//plankton froggy test [1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,25,0,0,0,25,25,0,0,2,1,0,0,0,0,25,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,25,25,0,0,0,0,2,1,0,25,0,0,25,0,0,0,0,25,0,0,2,1,0,25,0,0,25,0,25,25,0,0,0,0,2,1,0,0,0,25,0,0,25,0,25,0,0,0,2,1,0,0,0,25,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,0,0,0,0,0,0,0,0,0,0,0,2]