const KEY_TAB = 9;
const key_0 = 48;
const key_1 = 49;
const key_2 = 50;
const key_3 = 51;
const key_4 = 52;
const key_5 = 53;
const key_6 = 54;
const key_7 = 55;
const key_8 = 56;
const key_9 = 57;
const key_q = 81;
const KEY_N = 78;
// const key_v = 86;
// const key_w = 87;
// const key_e = 69;
// const key_r = 82;
// const key_t = 84;
// const key_y = 89;
const key_up_arrow = 38;
const key_down_arrow = 40;

// var editorKeyToTile = [
//     {press: key_q, tile: ALIEN_SQUID},
//     {press: key_w, tile: ALIEN_PLANT},
//     {press: KEY_D, tile: BKGND_ROCK}
//     ];
    

function initKeybindings() {
    document.addEventListener('keydown', keyDownBindings);
    //document.addEventListener('keyup', keyUpBindings)
}

function keyDownBindings(evt) {
    var key = evt.keyCode;
    //checkKeysToChangeTile(key);
    if (gameState != LEVEL_EDITOR){
        return;
    }
    switch(key) {
        case key_0:
            change_tile(BKGND_ROCK);
            break;
        case key_1:
            currentLevel = LEVEL_ONE;
            setLevelForEditor();
            break;
        case key_2:
            currentLevel = LEVEL_TWO;
            setLevelForEditor();
            break;
        case key_3:
            currentLevel = LEVEL_THREE;
            setLevelForEditor();
            break;
        case key_4:
            currentLevel = LEVEL_FOUR;
            setLevelForEditor();
            break;
        case KEY_TAB:
            if (showControlPanel){
                showControlPanel = false;
            }
            else {
                showControlPanel = true;
            }
            break;
        case key_up_arrow:
            scrollCamera(-500000);
            break;
        case key_down_arrow:
            scrollCamera(500000);
            break;
        case KEY_C:
            currentTool = !currentTool;
            break; 
        case KEY_B:
            loadLevel();
            break;
        case KEY_N:
            copyLevel();
            break;

    }
}

// function keyUpBindings(evt) {
//     var key = evt.keyCode;
//     switch(key) {
//         case shift:
//             moveMode = false;
//             return;
//         case KEY_TAB:
//             showControlPanel = false;
//     }
// }

function keysDescription() {
    return [
        "Tab: show control panel",
        "Left click: change tile",
        "Right click: remove tile",
        "Mouse wheel up: scroll level up",
        "Mouse wheel down: scroll level down",
        "Shift + mouse move: scroll up and down",
        "Keys from 1 to 7: change background tile type",
        "Q: squiddie",
		"V: biter",
        "W: plant",
        "E: crew",
        "R: jetpack"
    ]
}