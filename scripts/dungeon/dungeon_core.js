var dungeon_player = {
    x: 0,
    y: 0,
    yellowkeys: 0
};
var dungeon_currentDungeon;
var dungeon_layout = [];

//This is run once when the game is loaded
//It creates HTML elements and also calculates things that aren't stored in the game object
function dungeon_init() {
    dungeon_begin(dungeon_dungeonEnum.BOOTCAMP);
}

function dungeon_begin(dungeon) {
    dungeon_currentDungeon = dungeon;
    dungeon_layout = dungeon_dungeons[dungeon].layout.slice();
    dungeon_player.x = dungeon_dungeons[dungeon].startX;
    dungeon_player.y = dungeon_dungeons[dungeon].startY;
    dungeon_player.yellowkeys = 0;
}

function dungeon_move (direction) {
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
            dungeon_redraw ();
        }
        if (move) {
            dungeon_player.x = cellX;
            dungeon_player.y = cellY;
            dungeon_redraw ();
        }
    }
}
