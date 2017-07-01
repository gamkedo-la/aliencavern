function removeImgFromBrick() {
    squiddies = squiddies.map(function (squid, index) {
        if (squid && isInRange(squid)) {
            squiddies.splice(index, 1);
        }
    });
	
	biters = biters.map(function (biter, index) {
        if (biter && isInRange(biter)) {
            biters.splice(index, 1);
        }
    });

    alienPlants = alienPlants.map(function (plant, index) {
        if (plant && isInRange(plant)) {
            alienPlants.splice(index, 1);
        }
    });

    crew = crew.map(function (buddy, index) {
        if (buddy && isInRange(buddy)) {
            crew.splice(index, 1);
        }
    });

    shipParts = shipParts.map(function (part, index) {
        if (part && isInRange(part)) {
            shipParts.splice(index, 1);
        }
    });
}

function isInRange(object) {
    return mousePosition.x > object.x && mousePosition.x < (object.x + BRICK_W) &&
        mousePosition.y > object.y && mousePosition.y < (object.y + BRICK_H)
}

function getVisibleLevelHeightInPx() {
    return (cavernGrid.length / 14 * 64) - canvas.height - 252;
}