const dungeon_terrainEnum = {
    FLOOR: 0,
    WALL: 1,
    PITEDGE: 2,
    PIT: 3,
    GATEYELLOW: 4,
    GATEBLUE: 5,
    GATERED: 6,
    CHESTCLOSED: 7,
    CHESTOPEN: 8
};

const DUNGEON_TOTALSTYLES = 1;
const dungeon_styleEnum = {
    BRICK: 0
};

/*Array of data structures for terrain
-----
idNumber: The idNumber according to its position in the array. dungeon_terrainEnum should match this
name: String containing displayed name.
imageLink: An array containing the names of the image stored in ../images/dungeon/ , one for each style
imageCache: An array containing pre-loaded versions of the image used to draw on the canvas, one for each style
-----*/
var dungeon_terrain = [
    {
        idNumber: dungeon_terrainEnum.FLOOR,
        name: "Floor",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.WALL,
        name: "Wall",
        imageLink: ["wall.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.PITEDGE,
        name: "Pit Edge",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.PIT,
        name: "Pit",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.GATEYELLOW,
        name: "Yellow Gate",
        imageLink: ["gate_yellow.png"],
        imageCache: [null]
    }
];

const dungeon_itemEnum = {
    KEYYELLOW: 0,
    KEYBLUE: 1,
    KEYRED: 2,
    POTIONTINY: 3,
    POTIONSMALL: 4,
    POTIONMEDIUM: 5,
    POTIONLARGE: 6,
    POTIONHUGE: 7
};

/*Array of data structures for collectable temporary items found in the dungeons
-----
idNumber: The idNumber according to its position in the array. dungeon_itemEnum should match this
name: String containing displayed treasure name.
description: The description of the treasure that is shown when you open the chest
imageLink: The name of the image stored in ../images/dungeon/
imageCache: Containins a pre-loaded version of the image used to draw on the canvas
effect: a lambda function with what happens when you collect the item.
-----*/
const dungeon_items = [
    {
        idNumber: dungeon_itemEnum.KEYYELLOW,
        name: "Yellow Key",
        description: "A common key that will open a single yellow gate.",
        imageLink: "key_yellow.png",
        imageCache: null,
        effect: function () {
            dungeon_player.yellowKeys ++;
        }
    },
    {
        idNumber: dungeon_itemEnum.KEYBLUE,
        name: "Blue Key",
        description: "An uncommon key that will open a single blue gate.",
        imageLink: "key_yellow.png",
        imageCache: null,
        effect: function () {
            dungeon_player.blueKeys ++;
        }
    },
    {
        idNumber: dungeon_itemEnum.KEYRED,
        name: "Red Key",
        description: "A rare key that will open a single red gate.",
        imageLink: "key_yellow.png",
        imageCache: null,
        effect: function () {
            dungeon_player.redKeys ++;
        }
    },
    {
        idNumber: dungeon_itemEnum.POTIONTINY,
        name: "Tiny Potion",
        description: "A tiny vial of healing liquid that gives 100 HP.",
        imageLink: "potion_tiny.png",
        imageCache: null,
        effect: function () {
            dungeon_player.hp += 100;
            dungeon_createDamageNumber(-100, 225, 225);
        }
    },
    {
        idNumber: dungeon_itemEnum.POTIONSMALL,
        name: "Small Potion",
        description: "A small healing potion that gives 500 HP.",
        imageLink: "potion_small.png",
        imageCache: null,
        effect: function () {
            dungeon_player.hp += 500;
            dungeon_createDamageNumber(-500, 225, 225);
        }
    },
    {
        idNumber: dungeon_itemEnum.POTIONMEDIUM,
        name: "Medium Potion",
        description: "A regular-sized restorative potion that gives 2,000 HP.",
        imageLink: "potion_medium.png",
        imageCache: null,
        effect: function () {
            dungeon_player.hp += 2000;
            dungeon_createDamageNumber(-2000, 225, 225);
        }
    },
    {
        idNumber: dungeon_itemEnum.POTIONLARGE,
        name: "Large Potion",
        description: "A bumper-sized health potion that gives a massive 10,000 HP!",
        imageLink: "potion_large.png",
        imageCache: null,
        effect: function () {
            dungeon_player.hp += 10000;
            dungeon_createDamageNumber(-10000, 225, 225);
        }
    },
    {
        idNumber: dungeon_itemEnum.POTIONHUGE,
        name: "Huge Potion",
        description: "This absurdly big potion is almost as big as you, and gives a huge 50,000 HP!",
        imageLink: "potion_huge.png",
        imageCache: null,
        effect: function () {
            dungeon_player.hp += 50000;
            dungeon_createDamageNumber(-50000, 225, 225);
        }
    }
];

const dungeon_treasureEnum = {
    ORIGAMISWORD: 0,
    BLUECOINS01: 1
};

/*Array of data structures for treasures
-----
idNumber: The idNumber according to its position in the array. dungeon_treasureEnum should match this
name: String containing displayed treasure name.
description: The description of the treasure that is shown when you open the chest
effect: optional - a lambda function with any extra effect that happens immediately upon gaining the treasure.
-----*/
const dungeon_treasures = [
    {
        idNumber: dungeon_treasureEnum.ORIGAMISWORD,
        name: "an Oragami Sword",
        description: "<p>This carefully folded sword will deliver painful papercuts to your foes.</p><p>You can only change your equipment outside of a dungeon.</p>"
    },
    {
        idNumber: dungeon_treasureEnum.BLUECOINS01,
        name: "100 Blue Coins",
        description: "<p>You found a cache of 100 blue coins!</p>",
        effect: function () {
            gainBlueCoins (100);
        }
    }
];

const dungeon_enemyEnum = {
    TRAININGDUMMY: 0,
    ARMEDTRAININGDUMMY: 1
};

/*Array of data structures for enemies
-----
idNumber: The idNumber according to its position in the array. dungeon_enemyEnum should match this
name: String containing displayed enemy name.
description: Flavour text that displays in the infopanel
imageLink: The name of the image stored in ../images/dungeon/
imageCache: Containins a pre-loaded version of the image used to draw on the canvas
hp: The enemy's HP
atk: The enemy's ATK
def: The enemy's DEF
-----*/
var dungeon_enemies = [
    {
        idNumber: dungeon_enemyEnum.TRAININGDUMMY,
        name: "Training Dummy",
        description: "A large training dummy. Big, bulky, and hurts your hands when you punch it.",
        imageLink: "trainingdummy.png",
        imageCache: null,
        hp: 30,
        atk: 20,
        def: 0
    },
    {
        idNumber: dungeon_enemyEnum.ARMEDTRAININGDUMMY,
        name: "Armed Training Dummy",
        description: "A regular training dummy, but with a small kinfe taped to the front.",
        imageLink: "armedtrainingdummy.png",
        imageCache: null,
        hp: 30,
        atk: 50,
        def: 0
    }
];

const dungeon_dungeonEnum = {
    BOOTCAMP: 0
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
height: The height of the dungeon layout in cells
width: The width of the dungeon layout in cells
style: Which terrain style this dungeon uses
outOfBounds: What terrain piece you want to display if trying to draw an area that is out of bounds
layout: An array of the dungeon's layout. See the relevant data arrays for more details:
--0-9: terrain structures
--10-99: temporary boost items
--100-999: treasures
--1000-9999: enemies
startX: the x position of the player's start location. 0-indexed
startY: the y position of the player's start location. 0-indexed
-----*/
var dungeon_dungeons = [
    {
        idNumber: dungeon_dungeonEnum.BOOTCAMP,
        name: "Boot Camp",
        id: "dungeon_bootcamp",
        idLink: null,
        treasureLink: null,
        unlocked: true,
        treasures: [
            dungeon_treasureEnum.ORIGAMISWORD,
            dungeon_treasureEnum.BLUECOINS1
        ],
        height: 20,
        width: 20,
        style: dungeon_styleEnum.BRICK,
        outOfBounds: dungeon_terrainEnum.WALL,
        layout: [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 2000, 0, 0, 1, 1, 0, 2000, 0, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 1, 2001, 1, 1, 1, 1, 0, 2001, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 0, 100, 0, 1, 0, 0, 0, 0, 103, 0, 1, 0, 0, 0, 1,
            1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2000, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 103, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 1, 1, 1, 1,
            1, 1, 0, 0, 0, 1, 1, 0, 1, 2001, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
            1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
        ],
        startX: 9,
        startY: 0
    }
];
