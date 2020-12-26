var dungeon_player = {
    x: 0,
    y: 0,
    hp: 0,
    atk: 0,
    def: 0,
    yellowKeys: 0,
    blueKeys: 0,
    redKeys: 0,
    weapon: 0,
    shield: 0,
    accessory: 0
};
var dungeon_currentDungeon;
var dungeon_layout = [];
var dungeon_enemyHp = 0;
var dungeon_enemyType = 0;
var dungeon_enemyCell = 0;
var dungeon_busy = false;
var dungeon_noDamageDealt = 0;

const dungeon_modeEnum = {
    PREPARE: 0,
    EXPLORE: 1,
    PUZZLE: 2
};
var dungeon_mode = dungeon_modeEnum.PREPARE;

const dungeon_infoPanelEnum = {
    PREVIOUS: 0,
    CELL: 1
};

//This is run once when the game is loaded
//It creates HTML elements and also calculates things that aren't stored in the game object
function dungeon_init() {
    //Handle the mouse interacting with the canvas
    dungeon_canvas.addEventListener('mousemove', function(evt) {
        var rect = dungeon_canvas.getBoundingClientRect();
        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;
        let cellX = dungeon_player.x + Math.floor(x / 50) - 5;
        let cellY = dungeon_player.y + Math.floor(y / 50) - 5;
        cell = cellX + cellY * dungeon_dungeons[dungeon_currentDungeon].width;
        dungeon_mousedOverCell(cell);
    }, false);

    //Dynamically create dungeon list
    dungeon_dungeons.forEach(dungeon => {
        var newElement = $('<div></div>');
        newElement.attr('id', dungeon.id);
        newElement.addClass("dungeon_dungeonRow");
        let htmlText = "<span class='dungeon_dungeonRowName'>" + dungeon.name + "</span>";
        htmlText += "<span class='dungeon_dungeonRowTreasures'><span id='" + dungeon.id + "Treasures'></span> / " + dungeon.treasures.length + "</span>";
        htmlText += "<button type='button' class='button clickable' onclick='dungeon_explore(" + dungeon.idNumber + ")'>EXPLORE</button>";
        htmlText += "<button type='button' class='button clickable' onclick='dungeon_puzzle(" + dungeon.idNumber + ")'>PUZZLE</button>";
		newElement.html(htmlText);
        $("#dungeon_dungeonList").append(newElement);
        dungeon.idLink = $("#" + dungeon.id);
        dungeon.treasureLink = $("#" + dungeon.id + "Treasures");
    });
}

//Start a new dungeon instance in explore mode. Takes the dungeon idNumber as a parameter
function dungeon_explore(dungeon) {
    dungeon_mode = dungeon_modeEnum.EXPLORE;
    dungeon_busy = false;
    dungeon_currentDungeon = dungeon;
    dungeon_layout = dungeon_dungeons[dungeon].layout.slice();
    dungeon_player.x = dungeon_dungeons[dungeon].startX;
    dungeon_player.y = dungeon_dungeons[dungeon].startY;
    dungeon_player.hp = game.level * 50;
    dungeon_player.atk = 5;
    dungeon_player.def = 0;
    dungeon_player.yellowKeys = 0;
    dungeon_player.blueKeys = 0;
    dungeon_player.redKeys = 0;
    dungeon_player.weapon = dungeon_equipmentEnum.NONE;
    dungeon_player.shield = dungeon_equipmentEnum.NONE;
    dungeon_player.accessory = dungeon_equipmentEnum.NONE;
    dungeon_swapEquipment(game.dungeon.weapon);
    dungeon_swapEquipment(game.dungeon.shield);
    dungeon_swapEquipment(game.dungeon.accessory);
    dungeon_redraw();
}

//Start a new dungeon instance in puzzle mode. Takes the dungeon idNumber as a parameter
function dungeon_puzzle(dungeon) {
    dungeon_mode = dungeon_modeEnum.PUZZLE;
    dungeon_busy = false;
    dungeon_currentDungeon = dungeon;
    dungeon_layout = dungeon_dungeons[dungeon].layout.slice();
    dungeon_player.x = dungeon_dungeons[dungeon].startX;
    dungeon_player.y = dungeon_dungeons[dungeon].startY;
    dungeon_player.hp = dungeon_dungeons[dungeon].puzzleHp;
    dungeon_player.atk = dungeon_dungeons[dungeon].puzzleAtk;
    dungeon_player.def = dungeon_dungeons[dungeon].puzzleDef;
    dungeon_player.yellowKeys = 0;
    dungeon_player.blueKeys = 0;
    dungeon_player.redKeys = 0;
    dungeon_player.weapon = dungeon_equipmentEnum.NONE;
    dungeon_player.shield = dungeon_equipmentEnum.NONE;
    dungeon_player.accessory = dungeon_equipmentEnum.NONE;
    dungeon_swapEquipment(dungeon_dungeons[dungeon].puzzleWeapon);
    dungeon_swapEquipment(dungeon_dungeons[dungeon].puzzleShield);
    dungeon_swapEquipment(dungeon_dungeons[dungeon].puzzleAccessory);
    dungeon_redraw();
}

//Swap an equipment item. Argument is the equipment from dungeon_equipmentEnum
function dungeon_swapEquipment(equipment) {
    let oldEquip;
    switch (dungeon_equipment[equipment].type) {
        case dungeon_equipmentTypeEnum.WEAPON:
            oldEquip = dungeon_player.weapon;
            dungeon_player.weapon = equipment;
            break;
        case dungeon_equipmentTypeEnum.SHIELD:
            oldEquip = dungeon_player.shield;
            dungeon_player.shield = equipment;
            break;
        case dungeon_equipmentTypeEnum.ACCESSORY:
            oldEquip = dungeon_player.accessory;
            dungeon_player.accessory = equipment;
            break;
        case dungeon_equipmentTypeEnum.NONE:
        default:
            oldEquip = dungeon_equipmentEnum.NONE;
    }
    if (dungeon_equipment[oldEquip].hasOwnProperty("atk")) {
        dungeon_player.atk -= dungeon_equipment[oldEquip].atk;
    }
    if (dungeon_equipment[equipment].hasOwnProperty("atk")) {
        dungeon_player.atk += dungeon_equipment[equipment].atk;
    }
    if (dungeon_equipment[oldEquip].hasOwnProperty("def")) {
        dungeon_player.def -= dungeon_equipment[oldEquip].def;
    }
    if (dungeon_equipment[equipment].hasOwnProperty("def")) {
        dungeon_player.def += dungeon_equipment[equipment].def;
    }
}

//Move the player. Takes the direction as a parameter, which is a lowercase string of one of the 4 ordinal directions
function dungeon_move (direction) {
    if (dungeon_busy) {
        return;
    }
    let dX = 0;
    let dY = 0;
    switch (direction) {
        case 'north':
            dY = -1;
            break;
        case 'south':
            dY = 1;
            break;
        case 'west':
            dX = -1;
            break;
        case 'east':
            dX = 1;
            break;
    }
    let cellX = dungeon_player.x + dX;
    let cellY = dungeon_player.y + dY;
    let cell = cellX  + (cellY * dungeon_dungeons[dungeon_currentDungeon].width);
    if (cellX >= 0
    && cellX < dungeon_dungeons[dungeon_currentDungeon].width
    && cellY >= 0
    && cellY < dungeon_dungeons[dungeon_currentDungeon].height) {
        if (dungeon_layout[cell] == dungeon_terrainEnum.FLOOR) {
            dungeon_processMove(dX, dY);
        }
        if (dungeon_layout[cell] == dungeon_terrainEnum.GATEYELLOW) {
            if (dungeon_player.yellowKeys > 0) {
                dungeon_player.yellowKeys --;
                dungeon_createFloatingText("Yellow Keys - 1", "#FFFF00", 275, 275);
                dungeon_layout[cell] = dungeon_terrainEnum.FLOOR;
            }
        }
        else if (dungeon_layout[cell] >= 100 && dungeon_layout[cell] < 1000) {
            //item
            dungeon_processMove(dX, dY);
            dungeon_items[dungeon_layout[cell] - 100].effect();
            dungeon_layout[cell] = dungeon_terrainEnum.FLOOR;
        }
        else if (dungeon_layout[cell] >= 1000 && dungeon_layout[cell] < 2000) {
            //treasure
            let treasure = dungeon_layout[cell] - 1000;
            if (game.dungeon.treasures[treasure] == 0) {
                game.dungeon.treasures[treasure] = 1;
                if (dungeon_treasures[treasure].hasOwnProperty("effect")) {
                    dungeon_treasures[treasure].effect();
                }
                modal_open("You found " + dungeon_treasures[treasure].name, dungeon_treasures[treasure].image, dungeon_treasures[treasure].description);
                save();
            }
        }
        else if (dungeon_layout[cell] >= 2000 && dungeon_layout[cell] < 3000) {
            //enemy
            dungeon_startCombat(dungeon_layout[cell] - 2000, cell);
        }
        dungeon_redraw ();
    }
}

//Process movement
function dungeon_processMove(dX, dY) {
    dungeon_player.x += dX;
    dungeon_player.y += dY;
    dungeon_floatingTextList.forEach(text => {
        text.x -= dX * 50;
        text.y -= dY * 50;
    });
}

//Initiate combat with an enemy. Takes the enemy idNumber and its map cell position as parameters
function dungeon_startCombat (enemyType, cell) {
    dungeon_busy = true;
    dungeon_enemyType = enemyType;
    dungeon_enemyCell = cell;
    dungeon_enemyHp = dungeon_enemies[enemyType].hp;
    dungeon_noDamageDealt = 0;
    if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 2) {
        let damage = dungeon_calculateBattleResult(enemyType);
        if (damage == -1) {
            dungeon_busy = false;
            return;
        }
        dungeon_player.hp -= damage;
        if (damage > 0) {
            dungeon_createFloatingText(damage, "#FF0000", 275, 275);
        }
        if (dungeon_player.hp > 0) {
            dungeon_winCombat();
        }
        else {
            dungeon_loseCombat();
        }
    }
    else {
        dungeon_playerAttacks();
    }
}

//Pre-calculate the expected damage from engaging in combat. Returns the expected damage, or -1 if the player can't deal damage
function dungeon_calculateBattleResult(enemyType) {
    let playerDamage = Math.max(0, dungeon_player.atk - dungeon_enemies[enemyType].def);
    let enemyDamage = Math.max(0, dungeon_enemies[enemyType].atk - dungeon_player.def);
    if (playerDamage == 0) {
        return -1;
    }
    let numberOfHits = Math.max(Math.floor(dungeon_enemies[enemyType].hp / playerDamage) - 1, 0);
    return enemyDamage * numberOfHits;
}

//The player attacks in combat
async function dungeon_playerAttacks() {
    var damage = Math.max(0, dungeon_player.atk - dungeon_enemies[dungeon_enemyType].def);
    if (damage > 0) {
        dungeon_enemyHp -= damage;
        let enemyX = ((dungeon_enemyCell % dungeon_dungeons[dungeon_currentDungeon].width) - dungeon_player.x)*50 + 275;
        let enemyY = (Math.floor(dungeon_enemyCell / dungeon_dungeons[dungeon_currentDungeon].width) - dungeon_player.y)*50 + 275;
        dungeon_createFloatingText(damage, "#FF0000", enemyX, enemyY);
    }
    if (dungeon_checkForCombatAbort(damage)) {
        dungeon_busy = false;
        return;
    }
    if (dungeon_enemyHp > 0) {
        let sleepTime = 200;
        if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 0) {
            sleepTime = 500;
        }
        await sleep(sleepTime);
        dungeon_enemyAttacks();
    }
    else {
        dungeon_winCombat();
    }
}

//The enemy attacks in combat
async function dungeon_enemyAttacks() {
    var damage = Math.max(0, dungeon_enemies[dungeon_enemyType].atk - dungeon_player.def);
    if (damage > 0) {
        dungeon_player.hp -= damage;
        dungeon_createFloatingText(damage, "#FF0000", 275, 275);
    }
    if (dungeon_checkForCombatAbort(damage)) {
        dungeon_busy = false;
        return;
    }
    if (dungeon_player.hp > 0) {
        let sleepTime = 200;
        if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 0) {
            sleepTime = 500;
        }
        await sleep(sleepTime);
        dungeon_playerAttacks();
    }
    else {
        dungeon_loseCombat();
    }
}

//Check to see if combat should be aborted because both the enemy and player dealt no damage to each other. Takes the damage dealt as a parameter
function dungeon_checkForCombatAbort(damage) {
    if (damage == 0) {
        dungeon_noDamageDealt ++;
        if (dungeon_noDamageDealt == 2) {
            dungeon_busy = false;
            return true;
        }
    }
    else {
        dungeon_noDamageDealt = 0;
    }
    return false;
}

//The player wins combat
function dungeon_winCombat() {
    dungeon_layout[dungeon_enemyCell] = dungeon_terrainEnum.FLOOR;
    gainExp(dungeon_enemies[dungeon_enemyType].exp);
    gainYellowCoins(dungeon_enemies[dungeon_enemyType].coin);
    dungeon_redraw();
    dungeon_busy = false;
}

//The player loses combat
function dungeon_loseCombat() {
    switch (dungeon_mode) {
        case dungeon_modeEnum.EXPLORE:
            dungeon_explore(dungeon_currentDungeon);
            break;
        case dungeon_modeEnum.PUZZLE:
            dungeon_puzzle(dungeon_currentDungeon);
            break;
    }
    dungeon_redraw();
}

//Leave an active dungeon instance
function dungeon_leave() {
    dungeon_mode = dungeon_modeEnum.PREPARE;
    dungeon_redraw();
}

//This is called every time you mouse over a dungeon tile. Takes the cell number as an argument
function dungeon_mousedOverCell(cell) {
    dungeon_updateInfoPanel(dungeon_infoPanelEnum.CELL, cell);
}
