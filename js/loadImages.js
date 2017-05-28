 var shipPicLoaded = false;
 // var canvas, canvasContext; 
    
  var picsToLoad = 0; // set with imageList
  var shipPic = document.createElement("img");
    //var car2Pic = document.createElement("img");

    var cavernPics = []; // loading all pics in to an array

    var wallRockLeftPic = document.createElement("img");
    var wallRockRightPic = document.createElement("img");
    var ridgeRockMiddlePic = document.createElement("img");
    var ridgeRockLeftPic = document.createElement("img");
    var ridgeRockRightPic = document.createElement("img");

    var picsToLoad = 0; // set with imageList

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
            {varName: shipPic, theFile: "./graphics/ship.png"},
            {cavernType: BKGND_ROCK, theFile: "./graphics/backgroundRock.png"},
            {cavernType: WALL_ROCK_R, theFile: "./graphics/wallRockRight.png"},
            {cavernType: RIDGE_ROCK_M, theFile: "./graphics/ridgeRockMiddle.png"},
            {cavernType: RIDGE_ROCK_R, theFile: "./graphics/ridgeRockRight.png"},
            {cavernType: RIDGE_ROCK_L, theFile: "./graphics/ridgeRockLeft.png"},
            {cavernType: WALL_ROCK_L, theFile: "./graphics/wallRockLeft.png"},
            {cavernType: ALIEN, theFile: "./graphics/alien1.png"},
            {cavernType: ALIEN_PLANT, theFile: "./graphics/alienPlant.png"},
            {cavernType: CREW, theFile: "./graphics/crew1.png"},
            {cavernType: SHIP_PART, theFile: "./graphics/shipPart1.png"}
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