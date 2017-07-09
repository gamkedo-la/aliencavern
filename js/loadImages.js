 var shipPicLoaded = false;
 // var canvas, canvasContext; 
    
  var picsToLoad = 0; // set with imageList
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

  var imageList = [
    {varName: shipPic, theFile: "./graphics/alternateship.png"},
    {varName: alienSquidPic, theFile: "./graphics/squidSheet.png", theTileNum: ALIEN_SQUID},
    {varName: alienBiterPic, theFile: "./graphics/biterSheet.png", theTileNum: ALIEN_BITER},
    {varName: alienPlantPic, theFile: "./graphics/alienPlant1.png", theTileNum: ALIEN_PLANT},
    {varName: alienPlantPic2, theFile: "./graphics/alienPlant2.png", theTileNum: ALIEN_PLANT_2},
    {varName: crewPic, theFile: "./graphics/crewNeedsHelp.png", theTileNum: CREW},
    {varName: shipPartPic, theFile: "./graphics/rocketpart.png", theTileNum: SHIP_PART},
    {varName: cavernTileSheet,theFile: "./graphics/alien-cavern-tile-sheetV2.png"},
    {cavernType: BKGND_ROCK, theFile: "./graphics/backgroundRock2.png"},
    {varName: projectilePic, theFile: "./graphics/missile1.png"},
    {varName: fuelPic, theFile: "./graphics/fuel_pickup.png", theTileNum: FUEL},
    {varName: spikePic, theFile: "./graphics/spikes.png", theTileNum: SPIKES},
    {varName: lavaPic, theFile: "./graphics/lava.png", theTileNum: LAVA},
    {varName: geyserPic, theFile: "./graphics/steam-geyserNoBgnd.png", theTileNum: GEYSERS}
    ];

    var cavernPics = []; // loading all pics in to an array

    function countLoadedImagesAndLaunchIfReady(){
        picsToLoad-- ;
        console.log(picsToLoad);
        if (picsToLoad == 0){
        debug(cavernPics);
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

    /*

const BKGND_ROCK = 0;
const WALL_ROCK_R = 1;
const RIDGE_ROCK_M = 2;
const RIDGE_ROCK_R = 3;
const RIDGE_ROCK_L = 4;
const WALL_ROCK_L = 5
const ALIEN = 6;
const ALIEN_PLANT = 7;
const CREW = 8;
const SHIP_PART = 9;
    */