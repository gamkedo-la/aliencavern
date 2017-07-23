var current_row;
var current_column;
var selectedBrickIndex;
var moveMode = false;
var showControlPanel = false;
var draggedY = 0;

const TOOL_W = 30;
const TOOL_H = 30;

var currentToolTile = alienSquidPic;
var currentToolTileType = ALIEN_SQUID;

var toolState = { gameobjects : 0 , cavernone : 1, caverntwo : 2};
var currentTool = toolState.gameobjects;

var toolOrder = [
    ALIEN_SQUID, ALIEN_BITER, ALIEN_PLANT, ALIEN_PLANT_2,
    CREW, SHIP_PART, FUEL, LAVA, SPIKES, GEYSERS
];

var tileNo = 0;

var sizeOftoolset = toolOrder.length;

function decreaseLevelHeight() {
    cavernGrid = cavernGrid.slice(0, -14);
}

function increaseLevelHeight() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    cavernGrid = cavernGrid.concat(row);
}

function copyLevel() {
    window.prompt("Your level:", JSON.stringify(cavernGrid));
}

function loadLevel() {
    var level = window.prompt("Paste your level below:");
    if (level) {
        cavernGrid = JSON.parse(level);
    }
}

function resetLevel() {
    setLevelForEditor();
//    clearObjects(); objects are not used 
}

// function checkKeysToChangeTile (keyCode){
    
//     for (var i = 0; i < editorKeyToTile.length; i++)
//     {
//         if (keyCode == editorKeyToTile[i].press){
//             removeImgFromBrick();
//             cavernGrid[selectedBrickIndex] = editorKeyToTile[i].tile;
//         }
//     }

// }

function change_tile(changeTo) {
    console.log("change to ", changeTo );
    removeImgFromBrick();
    
    if (typeof changeTo !== 'undefined') {
        cavernGrid[selectedBrickIndex] = changeTo;
        return;     
    }

    if (cavernGrid[selectedBrickIndex] < 8) {
        cavernGrid[selectedBrickIndex] = cavernGrid[selectedBrickIndex] + 1;
    } else if (cavernGrid[selectedBrickIndex] === 8) {
        cavernGrid[selectedBrickIndex] = 20;
    } else if (cavernGrid[selectedBrickIndex] === 20) {
        cavernGrid[selectedBrickIndex] = 24;
    } else if(cavernGrid[selectedBrickIndex] === 24) {
		cavernGrid[selectedBrickIndex] = 21;
	} else if (cavernGrid[selectedBrickIndex] === 21) {
        cavernGrid[selectedBrickIndex] = 30;
    } else if (cavernGrid[selectedBrickIndex] === 30) {
        cavernGrid[selectedBrickIndex] = 31;
    } else {
        cavernGrid[selectedBrickIndex] = 0;
    }
}

function selectTool(){

       if (isMouseInPalette(toolOrder.length)){
        var toolIndex = toolIndexAt(currentMousePos.x, currentMousePos.y - TOOL_H);


        if (currentTool == toolState.gameobjects){
            tileNo = 0;
            imageList.forEach(function(element){
                if(element.theTileNum == toolOrder[toolIndex]){
                    currentToolTile = element.varName;
                    currentToolTileType = element.theTileNum;
                }
            });
            }
        else if (currentTool == toolState.cavernone){
           currentToolTile = cavernTileSheet;
           currentToolTileType = toolOrder[toolIndex];
           tileNo = toolIndex;
        }
    }
}