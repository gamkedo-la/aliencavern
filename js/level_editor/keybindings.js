const tab = 9;
const shift = 16;
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
const key_v = 86;
const key_w = 87;
const key_e = 69;
const key_r = 82;
const key_t = 84;
const key_y = 89;
const key_up_arrow = 38;
const key_down_arrow = 40;
const KEY_S = 83;

var editorKeyToTile = [
    {press: key_q, tile: ALIEN_SQUID},
    {press: key_w, tile: ALIEN_PLANT}
    ];
    

function initKeybindings() {
    document.addEventListener('keydown', keyDownBindings);
    document.addEventListener('keyup', keyUpBindings)
}

function keyDownBindings(evt) {
    var key = evt.keyCode;
    checkKeysToChangeTile(key);
    switch(key) {
        case key_0:
            change_tile(0);
            return;
        case key_1:
            change_tile(1);
            return;
        case key_2:
            change_tile(2);
            return;
        case key_3:
            change_tile(3);
            return;
        case key_4:
            change_tile(4);
            return;
        case key_5:
            change_tile(5);
            return;
        case key_6:
            change_tile(6);
            return;
        case key_7:
            change_tile(7);
            return;
        // case key_q:
        //     change_tile(20);
        //     return;
		case key_v:
			change_tile(24);
			return;
        // case key_w:
        //     change_tile(21);
        //     return;
        case key_e:
            change_tile(30);
            return;
        case key_r:
            change_tile(31);
            return;
        case shift:
            moveMode = true;
            return;
        case tab: 
            showControlPanel = true;
            return;
        case key_up_arrow:
            scrollCamera(-500000);
            return;
        case key_down_arrow:
            scrollCamera(500000);
            return;
        case KEY_S:
            currentTool = !currentTool; // FIX ME: this is a quick hack to toggle the pallett
            return; 
    }
}

function keyUpBindings(evt) {
    var key = evt.keyCode;

    switch(key) {
        case shift:
            moveMode = false;
            return;
        case tab:
            showControlPanel = false;
    }
}

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