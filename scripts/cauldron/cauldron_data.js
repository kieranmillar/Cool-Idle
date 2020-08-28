const cauldron_buildingEnum = {
    SCEPTER: 0,
}

/*Array of data structures for buildings
-----
idNumber: The idNumber according to its position in the array. cauldron_buildingEnum should match this
name: String containing displayed building name.
id: String containing the html id for the container div in the building panel
imageLink: The name of the image stored in ../images/cauldron/
idLink: should be included but set to null. cauldron_init() will set this to the html container div element so we don't have to search the DOM for it again
valueLink: should be included but set to null. cauldron_init() will set this to the html span element so we don't have to search the DOM for it again
buildButtonLink: should be included but set to null. cauldron_init() will set this to the html build button element so we don't have to search the DOM for it again
output: A lambda function that is called by cauldron_calculateOutput(). Returns the amount of magic a single copy of that building will produce.
onPurchase: A lambda function that is called by cauldron_build(). Applies bonus effect when you build a building.
unlocked: Boolean if the building has been unlocked. This should show the unlock state at the start of a new game, cauldron_unlocks() may change it later
description: A lambda function returning the html of the description
cost: A data objects detailing each resourcethe cost for this building:
--base: The amount of magic needed for the first time you build this building
--factor: A multiplier for how much the cost increases each time you build this building
--link: should be included but set to null. cauldron_init() will set this to the html resource value element so we don't have to search the DOM for it again
-----*/
var cauldron_buildings = [
    {
        idNumber: 0,
        name: "Scepter",
        id: "cauldron_scepter",
        imageLink: "scepter.png",
        idLink: null,
        valueLink: null,
        buildButtonLink: null,
        output: function() {
            return game.level;
        },
        onPurchase: function() {
            gainExp(game.cauldron.building[0]);
            gainYellowCoins(game.cauldron.building[0]);
            gainBlueCoins(1);
        },
        unlocked: true,
        description: function () {
            return "<p>You can use these to stir the cauldron.</p><p>Generates ✨Magic per second equal to your level.</p><p>On purchase: 1 EXP and 1 Yellow Coin for each scepter you own, and 1 Blue Coin.</p>"
        },
        cost: {
            base: 10,
            factor: 1.35,
            link: null,
        },
    },
];