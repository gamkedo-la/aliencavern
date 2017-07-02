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

    var cavernPics = []; // loading all pics in to an array

    // var wallRockLeftPic = document.createElement("img");
    // var wallRockRightPic = document.createElement("img");
    // var ridgeRockMiddlePic = document.createElement("img");
    // var ridgeRockLeftPic = document.createElement("img");
    // var ridgeRockRightPic = document.createElement("img");

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

        var imageList = [
            {varName: shipPic, theFile: "./graphics/alternateship.png"},
            {varName: alienSquidPic, theFile: "./graphics/squidSheet.png"},
			{varName: alienBiterPic, theFile: "./graphics/biterSheet.png"},
            {varName: alienPlantPic, theFile: "./graphics/alienPlant1.png"},
            {varName: alienPlantPic2, theFile: "./graphics/alienPlant2.png"},
            {varName: crewPic, theFile: "./graphics/crewNeedsHelp.png"},
            {varName: shipPartPic, theFile: "./graphics/rocketpart.png"},
            {varName: cavernTileSheet,theFile: "./graphics/alien-cavern-tile-sheetV2.png"},
            {cavernType: BKGND_ROCK, theFile: "./graphics/backgroundRock2.png"},
            {varName: projectilePic, theFile: "./graphics/missile1.png"},
            {varName: fuelPic, theFile: "./graphics/fuel_pickup.png"},
            {varName: spikePic, theFile: "./graphics/spikes.png"},
            {varName: lavaPic, theFile: "./graphics/lava.png"},
            {varName: geyserPic, theFile: "./graphics/steam-geyserNoBgnd.png"}
            ];
        
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