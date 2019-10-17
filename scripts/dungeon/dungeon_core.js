var dungeon_player = {
    x: 0,
    y: 0,
    hp: 0,
    atk: 0,
    def: 0,
    yellowkeys: 0
};
var dungeon_currentDungeon;
var dungeon_layout = [];
var dungeon_enemyHp = 0;
var dungeon_enemyType = 0;
var dungeon_enemyCell = 0;
var dungeon_busy = false;
var dungeon_noDamageDealt = 0;

//This is run once when the game is loaded
//It creates HTML elements and also calculates things that aren't stored in the game object
function dungeon_init() {
    dungeon_begin(dungeon_dungeonEnum.BOOTCAMP);
}

//Start a new dungeon instance. Takes the dungeon idNumber as a parameter
function dungeon_begin(dungeon) {
    dungeon_busy = false;
    dungeon_currentDungeon = dungeon;
    dungeon_layout = dungeon_dungeons[dungeon].layout.slice();
    dungeon_player.x = dungeon_dungeons[dungeon].startX;
    dungeon_player.y = dungeon_dungeons[dungeon].startY;
    dungeon_player.hp = game.level * 50;
    dungeon_player.atk = 5;
    dungeon_player.def = 0;
    dungeon_player.yellowkeys = 0;
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
        case 'east':
            dX = -1;
            break;
        case 'west':
            dX = 1;
            break;
    }
    let move = false;
    let cellX = dungeon_player.x + dX;
    let cellY = dungeon_player.y + dY;
    let cell = cellX  + (cellY * dungeon_dungeons[dungeon_currentDungeon].width);
    dungeon_damageNumbers.forEach(number => {
        number.x -= dX * 50;
        number.y -= dY * 50;
    });
    if (cellX >= 0
    && cellX < dungeon_dungeons[dungeon_currentDungeon].width
    && cellY >= 0
    && cellY < dungeon_dungeons[dungeon_currentDungeon].height) {
        if (dungeon_layout[cell] == dungeon_terrainEnum.FLOOR) {
            move = true;
        }
        if (dungeon_layout[cell] == dungeon_terrainEnum.GATEYELLOW) {
            if (dungeon_player.yellowkeys > 0) {
                dungeon_player.yellowkeys --;
                dungeon_layout[cell] = dungeon_terrainEnum.FLOOR;
                dungeon_redraw ();
            }
        }
        else if (dungeon_layout[cell] >= 100 && dungeon_layout[cell] < 1000) {
            //item
            dungeon_items[dungeon_layout[cell] - 100].effect();
            dungeon_layout[cell] = dungeon_terrainEnum.FLOOR;
            move = true;
        }
        else if (dungeon_layout[cell] >= 1000 && dungeon_layout[cell] < 2000) {
            //treasure
            
        }
        else if (dungeon_layout[cell] >= 2000 && dungeon_layout[cell] < 3000) {
            //enemy
            dungeon_startCombat(dungeon_layout[cell] - 2000, cell);
        }
        if (move) {
            dungeon_player.x = cellX;
            dungeon_player.y = cellY;
            dungeon_redraw ();
        }
    }
}

//Initiate combat with an enemy. Takes the enemy idNumber and its map cell position as parameters
function dungeon_startCombat (enemyType, cell) {
    dungeon_busy = true;
    dungeon_enemyType = enemyType;
    dungeon_enemyCell = cell;
    dungeon_enemyHp = dungeon_enemies[enemyType].hp;
    dungeon_noDamageDealt = 0;
    dungeon_playerAttacks();
}

//The player attacks in combat
async function dungeon_playerAttacks() {
    var damage = Math.max(0, dungeon_player.atk - dungeon_enemies[dungeon_enemyType].def);
    if (damage > 0) {
        dungeon_enemyHp -= damage;
        let enemyX = ((dungeon_enemyCell % dungeon_dungeons[dungeon_currentDungeon].width) - dungeon_player.x)*50 + 225;
        let enemyY = (Math.floor(dungeon_enemyCell / dungeon_dungeons[dungeon_currentDungeon].width) - dungeon_player.y)*50 + 225;
        dungeon_createDamageNumber(damage, enemyX, enemyY);
    }
    if (dungeon_checkForCombatAbort(damage)) {
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
        dungeon_createDamageNumber(damage, 225, 225);
    }
    if (dungeon_checkForCombatAbort(damage)) {
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
    dungeon_redraw ();
    dungeon_busy = false;
}

//The player loses combat
function dungeon_loseCombat() {
    dungeon_begin(dungeon_currentDungeon);
    dungeon_redraw ();
}
