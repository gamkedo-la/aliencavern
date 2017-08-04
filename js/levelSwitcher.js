function setTheLevel(){
    cavernGrid = []; // clearn cavern Grid
    cavernGrid = levelGrids[currentLevel].slice(0);
    switch(currentLevel){
        case LEVEL_ONE:
            cavernTileSheet = levelOneTilePic;
            backgroundPicNum = 0;
            break;
        case LEVEL_TWO:
            cavernTileSheet = levelTwoTilePic;
            backgroundPicNum = 1;
            break;
        case LEVEL_THREE:
            cavernTileSheet = levelOneTilePic;
            backgroundPicNum = 0;
            break;
        case LEVEL_FOUR:
            cavernTileSheet = levelTwoTilePic;
            backgroundPicNum = 1;
            break;
        case LEVEL_FIVE:
            cavernTileSheet = levelFourTilePic;
            backgroundPicNum = 3;
            break;
        case LEVEL_SIX:
            cavernTileSheet = levelThreeTilePic;
            backgroundPicNum = 2;
            break;
        case LEVEL_SEVEN:
            cavernTileSheet = levelFourTilePic;
            backgroundPicNum = 3;
            break;
        case LEVEL_EIGHT:
            cavernTileSheet = levelFourTilePic;
            backgroundPicNum = 3;
            break;
        case LEVEL_NINE:
            cavernTileSheet = levelFourTilePic;
            backgroundPicNum = 3;
            break;
        case LEVEL_TEN:
            cavernTileSheet = levelFourTilePic;
            backgroundPicNum = 3;
            break;
    }
}

function setLevelForEditor(){
    var row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var rows = BRICK_ROWS;
    var cavern = [];

    cavernGrid = []; // clearn cavern Grid
    cavernGrid = levelGrids[currentLevel];
    switch(currentLevel){
        case LEVEL_ONE:
            cavernTileSheet = levelOneTilePic;
            row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            break;
        case LEVEL_TWO:
            row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
            cavernTileSheet = levelTwoTilePic;
            break;
        case LEVEL_THREE:
            row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];
            cavernTileSheet = levelThreeTilePic;
            break;
        case LEVEL_FOUR:
            cavernTileSheet = levelFourTilePic;
            row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2];            
            break;
    }

    for (var i = 0; i < rows; i++) {
        cavern = cavern.concat(row);
    }

    cavernGrid = cavern;
}