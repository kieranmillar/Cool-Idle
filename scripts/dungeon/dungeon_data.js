const dungeon_dungeonEnum = {
    CASTLEBASEMENT = 0
};

/*Array of data structures for dungeons
-----
idNumber: The idNumber according to its position in the array. dungeon_dungeonEnum should match this
name: String containing displayed dungeon name.
id: String containing the html id for the container div in the dungeon list
idLink: should be included but set to null. dungeon_init() will set this to the html container div element so we don't have to search the DOM for it again
treasureLink: should be included but set to null. dungeon_init() will set this to the html container div element so we don't have to search the DOM for it again
unlocked: Boolean if the dungeon has been unlocked. This should show the unlock state at the start of a new game, dungeon_unlocks() may change it later
treasures: An array of treasures that can be found in this dungeon
layout: An array of the dungeon's layout. See the relevant data arrays for more details:
--0-9: terrain structures
--10-99: temporary boost items
--100-999: treasures
--1000-9999: enemies
startX: the x position of the player's start location
startY: the y position of the player's start location
-----*/
var dungeon_dungeons = [
    {
        idNumber: dungeon_dungeonEnum.CASTLEBASEMENT,
        name: "Castle Basement",
        id: "dungeon_castlebasement",
        idLink: null,
        treasureLink: null,
        unlocked: true,
        treasures: [
            dungeon_treasureEnum.ORIGAMISWORD,
            dungeon_treasureEnum.BLUECOINS1
        ],
        layout: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ],
        startX: 4,
        startY: 4
    }
];

const dungeon_treasureEnum = {
    ORIGAMISWORD: 0,
    BLUECOINS1: 1
}

/*Array of data structures for treasures
-----
idNumber: The idNumber according to its position in the array. dungeon_treasureEnum should match this
name: String containing displayed treasure name.
description: The description of the treasure that is shown when you open the chest
-----*/
const dungeon_treasures = [
    {
        idNumber: dungeon_treasureEnum.ORIGAMISWORD,
        name: "an Oragami Sword",
        description: "<p>This sword will deliver deadly papercuts to your foes.</p><p>You can only change your equipment outside of a dungeon.</p>"
    }
];
