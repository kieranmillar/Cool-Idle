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
description: The description shown in the info panel when you mouse over it.
imageLink: An array containing the names of the image stored in ../images/dungeon/ , one for each style
imageCache: An array containing pre-loaded versions of the image used to draw on the canvas, one for each style
-----*/
const dungeon_terrain = [
    {
        idNumber: dungeon_terrainEnum.FLOOR,
        name: "Floor",
        description: "",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.WALL,
        name: "Wall",
        description: "",
        imageLink: ["wall.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.PITEDGE,
        name: "Pit Edge",
        description: "",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.PIT,
        name: "Pit",
        description: "",
        imageLink: ["floor.png"],
        imageCache: [null]
    },
    {
        idNumber: dungeon_terrainEnum.GATEYELLOW,
        name: "Yellow Gate",
        description: "A locked yellow gate. You must spend a yellow key to open it.",
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
    POTIONHUGE: 7,
    ATKTINY: 8,
    DEFTINY: 9,
    ATKSMALL: 10,
    DEFSMALL: 11,
    ORAGAMISWORD: 12
};

/*Array of data structures for collectable items found in the dungeons
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
            dungeon_createFloatingText("Yellow Keys + 1", "#FFFF00", 275, 275);
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
            dungeon_createFloatingText("Blue Keys + 1", "#0000FF", 275, 275);
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
            dungeon_createFloatingText("Red Keys + 1", "#FF0000", 275, 275);
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
            dungeon_createFloatingText(100, "#00FF00", 275, 275);
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
            dungeon_createFloatingText(500, "#00FF00", 275, 275);
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
            dungeon_createFloatingText(2000, "#00FF00", 275, 275);
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
            dungeon_createFloatingText(10000, "#00FF00", 275, 275);
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
            dungeon_createFloatingText(50000, "#00FF00", 275, 275);
        }
    },
    {
        idNumber: dungeon_itemEnum.ATKTINY,
        name: "Tiny Attack Gem",
        description: "Increases your Attack by 1",
        imageLink: "atk_tiny.png",
        imageCache: null,
        effect: function () {
            dungeon_player.atk += 1;
            dungeon_createFloatingText("Attack + 1", "#FF0000", 275, 275);
        }
    },
    {
        idNumber: dungeon_itemEnum.DEFTINY,
        name: "Tiny Defense Gem",
        description: "Increases your Defense by 1",
        imageLink: "def_tiny.png",
        imageCache: null,
        effect: function () {
            dungeon_player.def += 1;
            dungeon_createFloatingText("Defense + 1", "#0000FF", 275, 275);
        }
    },
    {
        idNumber: dungeon_itemEnum.ATKSMALL,
        name: "Small Attack Gem",
        description: "Increases your Attack by 3",
        imageLink: "atk_small.png",
        imageCache: null,
        effect: function () {
            dungeon_player.atk += 3;
            dungeon_createFloatingText("Attack + 3", "#FF0000", 275, 275);
        }
    },
    {
        idNumber: dungeon_itemEnum.DEFSMALL,
        name: "Tiny Defense Gem",
        description: "Increases your Defense by 3",
        imageLink: "def_small.png",
        imageCache: null,
        effect: function () {
            dungeon_player.def += 3;
            dungeon_createFloatingText("Defense + 3", "#0000FF", 275, 275);
        }
    },
    {
        idNumber: dungeon_itemEnum.ORAGAMISWORD,
        name: "Oragami Sword",
        description: "This carefully folded sword will deliver painful papercuts to your foes.</p><p>Weapon</p><p>Attack + 2",
        imageLink: "oragami_sword.png",
        imageCache: null,
        effect: function () {
            dungeon_swapEquipment(dungeon_equipmentEnum.ORAGAMISWORD);
        }
    }
];

const dungeon_treasureEnum = {
    ORIGAMISWORD: 0,
    BLUECOINS01: 1,
    UNLOCKDUNGEONRIVER: 2
};

/*Array of data structures for treasures
-----
idNumber: The idNumber according to its position in the array. dungeon_treasureEnum should match this
name: String containing displayed treasure name.
image: The image of the treasure stored in ../images/
description: The description of the treasure that is shown when you open the chest
effect: optional - a lambda function with any extra effect that happens immediately upon gaining the treasure.
puzzleDrop: A dungeon_itemEnum of the item dropped by collecting the puzzle piece replacing this treasure in Puzzle Mode
-----*/
const dungeon_treasures = [
    {
        idNumber: dungeon_treasureEnum.ORIGAMISWORD,
        name: "an Origami Sword",
        image: "dungeon/oragami_sword.png",
        description: "This carefully folded sword will deliver painful papercuts to your foes.</p><p><strong>This has been added to your starting equipment inventory.</strong></p><p>Starting equipment can be equiped outside of a dungeon instance and brought into any future dungeon instance. You have unlimited copies, even if you swap equipment inside a dungeon instance, so feel free to use it whenever you want.",
        puzzleDrop: dungeon_itemEnum.ORAGAMISWORD
    },
    {
        idNumber: dungeon_treasureEnum.BLUECOINS01,
        name: "100 Blue Coins",
        image: "coin_blue.png",
        description: "You found a cache of 100 blue coins!",
        effect: function () {
            gainBlueCoins (100);
        },
        puzzleDrop: dungeon_itemEnum.POTIONTINY
    },
    {
        idNumber: dungeon_treasureEnum.UNLOCKDUNGEONRIVER,
        name: "a map to a nearby river",
        image: "dungeon/map.png",
        description: "You find a map to a nearby river, alongside a note asking you not to steal the treasure that they've hidden there.</p><p>Unfortunately for them, they didn't ask nicely enough.</p><p><strong>You have unlocked a new dungeon!</strong>",
        puzzleDrop: dungeon_itemEnum.ATKSMALL
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
exp: The amount of EXP given
coin: The amount of yellow coins given
-----*/
const dungeon_enemies = [
    {
        idNumber: dungeon_enemyEnum.TRAININGDUMMY,
        name: "Training Dummy",
        description: "A large training dummy. Big, bulky, and hurts your hands when you punch it.",
        imageLink: "trainingdummy.png",
        imageCache: null,
        hp: 30,
        atk: 20,
        def: 0,
        exp: 10,
        coin: 10
    },
    {
        idNumber: dungeon_enemyEnum.ARMEDTRAININGDUMMY,
        name: "Armed Training Dummy",
        description: "You thought these dummies were dangerous before? This one has a knife taped to the front of it!",
        imageLink: "armedtrainingdummy.png",
        imageCache: null,
        hp: 30,
        atk: 50,
        def: 0,
        exp: 15,
        coin: 15
    }
];

const dungeon_equipmentEnum = {
    NONE: 0,
    ORAGAMISWORD: 1,
    PAPERBAG: 2
};

const dungeon_equipmentTypeEnum = {
    NONE: 0,
    WEAPON: 1,
    SHIELD: 2,
    ACCESSORY: 3
};

/*Array of data structures for equipment
-----
idNumber: The idNumber according to its position in the array. dungeon_equipmentEnum should match this
name: String containing displayed equipment name.
description: String containing the description
imageLink: The name of the image stored in ../images/dungeon/
imageCache: Containins a pre-loaded version of the image used to draw on the canvas
type: Equipment type, a value of dungeon_equipmentTypeEnum
atk: Optional parameter for the amount of passive ATK bonus
def: Optional parameter for the amount of passive DEF bonus
-----*/
const dungeon_equipment = [
    {
        idNumber: dungeon_equipmentEnum.NONE,
        name: "",
        description: "",
        imageLink: "",
        imageCache: null,
        type: dungeon_equipmentTypeEnum.NONE
    },
    {
        idNumber: dungeon_equipmentEnum.ORAGAMISWORD,
        name: "Oragami Sword",
        description: "This carefully folded sword will deliver painful papercuts to your foes.</p><p>Attack + 2",
        imageLink: "oragami_sword.png",
        imageCache: null,
        type: dungeon_equipmentTypeEnum.WEAPON,
        atk: 2
    },
    {
        idNumber: dungeon_equipmentEnum.PAPERBAG,
        name: "Paper Bag",
        description: "Let's see your opponent fight their way past this!</p><p>Defense + 3",
        imageLink: "",
        imageCache: null,
        type: dungeon_equipmentTypeEnum.SHIELD,
        def: 3
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
puzzleLink: should be included but set to null. dungeon_init() will set this to the html button element so we don't have to search the DOM for it again
unlocked: Boolean if the dungeon has been unlocked. This should show the unlock state at the start of a new game, dungeon_unlocks() may change it later
treasures: An array of treasures that can be found in this dungeon
height: The height of the dungeon layout in cells
width: The width of the dungeon layout in cells
style: Which terrain style this dungeon uses
outOfBounds: What terrain piece you want to display if trying to draw an area that is out of bounds
layout: An array of the dungeon's layout. See the relevant data arrays for more details:
--0-99: terrain structures
--100-999: items
--1000-1999: treasures
--2000-9999: enemies
startX: the x position of the player's start location. 0-indexed
startY: the y position of the player's start location. 0-indexed
puzzleHp: the base hp value for the player in Puzzle Mode
puzzleAtk: the base attack value for the player in Puzzle Mode
puzzleDef: the base defense value for the player in Puzzle Mode
puzzleWeapon: the starting weapon for the player in Puzzle Mode
puzzleShield: the starting shield for the player in Puzzle Mode
puzzleAccessory: the starting accessory for the player in Puzzle Mode
-----*/
const dungeon_dungeons = [
    {
        idNumber: dungeon_dungeonEnum.BOOTCAMP,
        name: "Boot Camp",
        id: "dungeon_bootcamp",
        idLink: null,
        treasureLink: null,
        puzzleLink: null,
        unlocked: true,
        treasures: [
            dungeon_treasureEnum.ORIGAMISWORD,
            dungeon_treasureEnum.BLUECOINS01,
            dungeon_treasureEnum.UNLOCKDUNGEONRIVER
        ],
        height: 19,
        width: 17,
        style: dungeon_styleEnum.BRICK,
        outOfBounds: dungeon_terrainEnum.WALL,
        layout: [
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 103, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 4, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 103, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 0, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 2000, 0, 0, 1, 1, 0, 2000, 0, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0,
            1, 1, 1, 0, 0, 0, 1, 2001, 1, 1, 1, 1, 0, 2001, 0, 1000, 0,
            1, 1, 1, 0, 100, 0, 1, 0, 0, 0, 0, 103, 0, 1, 0, 0, 0,
            1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 2000, 1, 1, 1, 1, 1, 1, 1,
            0, 100, 0, 1, 1, 1, 1, 1, 1, 103, 1, 1, 1, 1, 1, 1, 1,
            108, 0, 109, 1, 1, 0, 0, 0, 0, 0, 2000, 0, 2000, 0, 1, 1, 1,
            0, 103, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1,
            1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 4, 1, 1, 1,
            1, 0, 0, 2000, 0, 0, 1, 1, 2001, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 103, 1, 1, 1, 0, 1001, 0, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 2001, 1, 1, 1, 0, 0, 0, 1, 1,
            1, 1, 1, 1, 0, 1002, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        ],
        startX: 7,
        startY: 0,
        puzzleHp: 250,
        puzzleAtk: 5,
        puzzleDef: 0,
        puzzleWeapon: dungeon_equipmentEnum.NONE,
        puzzleShield: dungeon_equipmentEnum.PAPERBAG,
        puzzleAccessory: dungeon_equipmentEnum.NONE
    }
];
