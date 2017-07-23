
var shipPicLoaded = false;
 // var canvas, canvasContext; 

var cavernPics = []; // loading all pics in to an array

var levelOneTilePic = document.createElement("img");
var levelTwoTilePic = document.createElement("img");
var levelThreeTilePic = document.createElement("img");
var levelFourTilePic = document.createElement("img");

var picsToLoad = 0; // set with imageList
var titleBG = document.createElement("img");
var frontCavPic = document.createElement("img");
var logoPic = document.createElement("img");
var menuPanel = document.createElement("img");
var shipPic = document.createElement("img");
var alienSquidPic = document.createElement("img");
var alienBiterPic = document.createElement("img");
var alienPlantPic = document.createElement("img");
var alienPlantPic2 = document.createElement("img");
var crewPic = document.createElement("img");
var shipPartPic = document.createElement("img");
var cavernTileSheet = document.createElement("img");
var projectilePic = document.createElement("img");
var fuelPic = document.createElement("img");
var spikePic = document.createElement("img");
var lavaPic = document.createElement("img");
var geyserPic = document.createElement("img");
var planktonFroggyPic = document.createElement("img");

var imageList = [
    {varName: titleBG, theFile: "./graphics/titleBackGround.png"},
    {varName: frontCavPic, theFile: "./graphics/frontCaverns.png"},
    {varName: logoPic, theFile: "./graphics/logo.png"},
	{varName: menuPanel, theFile: "./graphics/menuPanel.png"},
    {varName: shipPic, theFile: "./graphics/alternateship.png"},
    {varName: alienSquidPic, theFile: "./graphics/squidSheet.png", theTileNum: ALIEN_SQUID},
    {varName: alienBiterPic, theFile: "./graphics/biterSheet.png", theTileNum: ALIEN_BITER},
    {varName: alienPlantPic, theFile: "./graphics/alienPlant1.png", theTileNum: ALIEN_PLANT},
    {varName: alienPlantPic2, theFile: "./graphics/alienPlant2.png", theTileNum: ALIEN_PLANT_2},
    {varName: crewPic, theFile: "./graphics/crewNeedsHelp.png", theTileNum: CREW},
    {varName: shipPartPic, theFile: "./graphics/rocketpart.png", theTileNum: SHIP_PART},
    {varName: levelOneTilePic,theFile: "./graphics/alien-cavern-tile-sheetV2.png"},
    {varName: levelTwoTilePic, theFile: "./graphics/tilesets/ice_tiles.png"},
    {varName: levelThreeTilePic, theFile: "./graphics/tilesets/green_fade_tiles.png"},
    {varName: levelFourTilePic, theFile: "./graphics/tilesets/purpletombtiles.png"},
    {cavernType: 0, theFile: "./graphics/backgroundRock2.png"},
    {cavernType: 1, theFile: "./graphics/tilesets/icebackground.png"},
    {cavernType: 2, theFile: "./graphics/tilesets/darkbackground.png"},
    {cavernType: 3, theFile: "./graphics/tilesets/tombbackground.png"},
    {varName: projectilePic, theFile: "./graphics/missile1.png"},
    {varName: fuelPic, theFile: "./graphics/fuel_pickup.png", theTileNum: FUEL},
    {varName: spikePic, theFile: "./graphics/spikes.png", theTileNum: SPIKES},
    {varName: lavaPic, theFile: "./graphics/lava.png", theTileNum: LAVA},
    {varName: geyserPic, theFile: "./graphics/steam-geyserNoBgnd.png", theTileNum: GEYSERS},
    {varName: planktonFroggyPic, theFile: "./graphics/planktonFroggy.png", theTileNum: PLANKTON_FROGGY}
];



    function countLoadedImagesAndLaunchIfReady(){
        picsToLoad-- ;
        console.log(picsToLoad);
        if (picsToLoad == 0){
        startGame();
        }
    }

    function beginLoadingImage(imgVar, fileName){
        imgVar.onload = countLoadedImagesAndLaunchIfReady;
        imgVar.src = fileName;
    }

    function loadImageForCavern( cavernCode, fileName){
        cavernPics[cavernCode] = document.createElement("img");
        beginLoadingImage(cavernPics[cavernCode],fileName); 
    }

    function loadImages(){
        
        picsToLoad = imageList.length;

        for (var i=0;i < imageList.length; i++)
        {
            if (imageList[i].varName != undefined){
                beginLoadingImage(imageList[i].varName, imageList[i].theFile);
            } else 
            {
                loadImageForCavern( imageList[i].cavernType, imageList[i].theFile);
            }
        }   
    }
