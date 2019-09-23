var dungeon_playerX = 9;
var dungeon_playerY = 0;
var dungeon_currentDungeon = 0;

//This is run once when the game is loaded
//It creates HTML elements and also calculates things that aren't stored in the game object
function dungeon_init() {
    
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
    let cellX = dungeon_playerX + dX;
    let cellY = dungeon_playerY + dY;
    let cell = cellX  + (cellY * dungeon_dungeons[dungeon_currentDungeon].width);
    if (cellX >= 0
    && cellX < dungeon_dungeons[dungeon_currentDungeon].width
    && cellY >= 0
    && cellY < dungeon_dungeons[dungeon_currentDungeon].height) {
        if (dungeon_dungeons[dungeon_currentDungeon].layout[cell] == dungeon_terrainEnum.FLOOR) {
            dungeon_playerX = cellX;
            dungeon_playerY = cellY;
            dungeon_redraw ();
        }
    }
}