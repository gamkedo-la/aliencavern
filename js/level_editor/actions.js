function decreaseLevelHeight() {
    cavernGrid = cavernGrid.slice(0, -14)
}

function increaseLevelHeight() {
    var row = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
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
    drawDefaultCavern();
    clearObjects();
}

function change_tile(changeTo) {
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
