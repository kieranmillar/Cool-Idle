const cauldron_buildingEnum = {
    SCEPTER: 0,
    MAGICBOOK: 1,
    CRYSTALBALL: 2,
    BRAININAJAR: 3
}

/*Array of data structures for buildings
-----
idNumber: The idNumber according to its position in the array. cauldron_buildingEnum should match this
name: String containing displayed building name.
id: String containing the html id for the container div in the building panel
imageLink: The name of the image stored in ../images/cauldron/
idLink: should be included but set to null. cauldron_init() will set this to the html container div element so we don't have to search the DOM for it again
valueLink: should be included but set to null. cauldron_init() will set this to the html span element so we don't have to search the DOM for it again
buttonLink: should be included but set to null. cauldron_init() will set this to the html button element so we don't have to search the DOM for it again
descriptionLink: should be included but set to null. cauldron_init() will set this to the html description element so we don't have to search the DOM for it again
output: A lambda function that is called by cauldron_calculateOutput(). Returns the amount of magic a single copy of that building will produce.
onPurchase: A lambda function that is called by cauldron_build(). Applies bonus effect when you build a building.
unlocked: Boolean if the building has been unlocked. This should show the unlock state at the start of a new game, cauldron_unlocks() may change it later
description: A lambda function returning the html of the description
cost: A data object detailing the cost for this building:
--base: The amount of magic needed for the first time you build this building
--factor: A multiplier for how much the cost increases each time you build this building
--link: should be included but set to null. cauldron_init() will set this to the html resource value element so we don't have to search the DOM for it again
-----*/
var cauldron_buildings = [
    {
        idNumber: cauldron_buildingEnum.SCEPTER,
        name: "Scepter",
        id: "cauldron_scepter",
        imageLink: "scepter.png",
        idLink: null,
        valueLink: null,
        buttonLink: null,
        descriptionLink: null,
        output: function() {
            return game.level;
        },
        onPurchase: function() {
            gainExp(game.cauldron.building[cauldron_buildingEnum.SCEPTER]);
            gainYellowCoins(game.cauldron.building[cauldron_buildingEnum.SCEPTER]);
            gainBlueCoins(1);
        },
        unlocked: true,
        description: function () {
            return "<p>You can use these to stir the cauldron.</p><p>Generates ✨Magic per second equal to your level.</p><p><strong>Current total: " + displayNum(cauldron_buildings[cauldron_buildingEnum.SCEPTER].output() * game.cauldron.building[cauldron_buildingEnum.SCEPTER]) + " (" + cauldron_calculatePercentage(cauldron_buildingEnum.SCEPTER) + "%) ✨Magic p/s.</strong></p><p>On purchase: 1 EXP and 1 Yellow Coin for each scepter you own, and 1 Blue Coin.</p>"
        },
        cost: {
            base: 10,
            factor: 1.20,
            link: null,
        },
    },
    {
        idNumber: cauldron_buildingEnum.MAGICBOOK,
        name: "Magic Book",
        id: "cauldron_magicBook",
        imageLink: "greenBook.png",
        idLink: null,
        valueLink: null,
        buttonLink: null,
        descriptionLink: null,
        output: function() {
            return 5 + (5 * game.cauldron.spells[cauldron_spellEnum.BOOKSHELVES]);
        },
        onPurchase: function() {
            gainExp(game.cauldron.building[cauldron_buildingEnum.MAGICBOOK] * 5);
            gainYellowCoins(game.cauldron.building[cauldron_buildingEnum.MAGICBOOK] * 5);
            gainBlueCoins(5);
        },
        unlocked: false,
        description: function () {
            return "<p>The book does not contain any spells, but rather is made of magic.</p><p>Generates " + cauldron_buildings[cauldron_buildingEnum.MAGICBOOK].output() + " ✨Magic per second.</p><p><strong>Current total: " + displayNum(cauldron_buildings[cauldron_buildingEnum.MAGICBOOK].output() * game.cauldron.building[cauldron_buildingEnum.MAGICBOOK]) + " (" + cauldron_calculatePercentage(cauldron_buildingEnum.MAGICBOOK) + "%) ✨Magic p/s.</strong></p><p>On purchase: 5 EXP and 5 Yellow Coins for each magic book you own, and 5 Blue Coins.</p>"
        },
        cost: {
            base: 50,
            factor: 1.25,
            link: null,
        },
    },
    {
        idNumber: cauldron_buildingEnum.CRYSTALBALL,
        name: "Crystal Ball",
        id: "cauldron_crystalBall",
        imageLink: "crystalBall.png",
        idLink: null,
        valueLink: null,
        buttonLink: null,
        descriptionLink: null,
        output: function() {
            return 30;
        },
        onPurchase: function() {
            gainExp(game.cauldron.building[cauldron_buildingEnum.CRYSTALBALL] * 30);
            gainYellowCoins(game.cauldron.building[cauldron_buildingEnum.CRYSTALBALL] * 30);
            gainBlueCoins(30);
        },
        unlocked: false,
        description: function () {
            return "<p>Lets you look into the future and steal magic from your future self.</p><p>Generates " + cauldron_buildings[cauldron_buildingEnum.CRYSTALBALL].output() + " ✨Magic per second.</p><p><strong>Current total: " + displayNum(cauldron_buildings[cauldron_buildingEnum.CRYSTALBALL].output() * game.cauldron.building[cauldron_buildingEnum.CRYSTALBALL]) + " (" + cauldron_calculatePercentage(cauldron_buildingEnum.CRYSTALBALL) + "%) ✨Magic p/s.</strong></p><p>On purchase: 30 EXP and 30 Yellow Coins for each crystal ball you own, and 30 Blue Coins.</p>"
        },
        cost: {
            base: 2000,
            factor: 1.30,
            link: null,
        },
    },
    {
        idNumber: cauldron_buildingEnum.BRAININAJAR,
        name: "Brain in a Jar",
        id: "cauldron_brainInAJar",
        imageLink: "brainInAJar.png",
        idLink: null,
        valueLink: null,
        buttonLink: null,
        descriptionLink: null,
        output: function() {
            return 0;
        },
        onPurchase: function() {
            game.kingdom.resource[kingdom_resourceEnum.RESEARCH] += (game.cauldron.building[cauldron_buildingEnum.BRAININAJAR] * 100);
            gainBlueCoins(10);
        },
        unlocked: false,
        description: function () {
            return "<p>Harnessing the power of thinking, literally.</p><p>Generates nothing!</p><p>On purchase: 100 Kingdom Research for each brain in a jar you own, and 10 Blue Coins.</p>"
        },
        cost: {
            base: 10000,
            factor: 1.35,
            link: null,
        },
    }
];

const cauldron_spellEnum = {
    LIBRARY: 0,
    BOOKSHELVES: 1,
    CRYSTALREFINERY: 2
}

/*Array of data structures for spells
-----
idNumber: The idNumber according to its position in the array. cauldron_spellEnum should match this
name: String containing displayed spell name.
id: String containing the html id for the container div in the spell panel
imageLink: The name of the image stored in ../images/cauldron/
idLink: should be included but set to null. cauldron_init() will set this to the html container div element so we don't have to search the DOM for it again
buttonLink: should be included but set to null. cauldron_init() will set this to the html button element so we don't have to search the DOM for it again
unlocked: Boolean if the building has been unlocked. This should show the unlock state at the start of a new game, cauldron_unlocks() may change it later
description: The html of the description
cost: The cost of this spell
-----*/
var cauldron_spells = [
    {
        idNumber: cauldron_spellEnum.LIBRARY,
        name: "Library",
        id: "cauldron_upgrade_library",
        imageLink: "greenBook.png",
        idLink: null,
        buttonLink: null,
        unlocked: true,
        description: "<p>Create a library to store magic books.</p><p>Unlocks a new magic item, Magic Book.</p>",
        cost: 25,
    },
    {
        idNumber: cauldron_spellEnum.BOOKSHELVES,
        name: "Enchanted Bookshelves",
        id: "cauldron_upgrade_bookshelves",
        imageLink: "greenBook.png",
        idLink: null,
        buttonLink: null,
        unlocked: false,
        description: "<p>Construct an enchanted bookshelf to store your enchanted books.</p><p>Increases ouptut of Magic Books to 10 ✨Magic per second.</p>",
        cost: 5000,
    },
    {
        idNumber: cauldron_spellEnum.CRYSTALREFINERY,
        name: "Crystal Refinery",
        id: "cauldron_upgrade_crystalRefinery",
        imageLink: "crystalBall.png",
        idLink: null,
        buttonLink: null,
        unlocked: false,
        description: "<p>Construct a Crystal Refinery to produce crystal balls.</p><p>Unlocks a new magic item, Crystal Ball.</p>",
        cost: 50000,
    }
];
