const shop_costEnum = {
    YELLOWCOINS: 0,
    BLUECOINS: 1,
    GREENCOINS: 2
}

/*Array of data structures for shop cost resources (coins)
-----
idNumber: The idNumber according to its position in the array. shop_costEnum should match this
name: String containing the cost resource name. This only shows up in the image alt text
imageLink: A lambda function that returns the name of the image stored in ../images/ .
-----*/
var shop_costs = [
    {
        idNumber: shop_costEnum.YELLOWCOINS,
        name: "Yellow coins",
        imageLink: "coin_yellow.png"
    },
    {
        idNumber: shop_costEnum.BLUECOINS,
        name: "Blue coins",
        imageLink: "coin_blue.png"
    },
    {
        idNumber: shop_costEnum.GREENCOINS,
        name: "Green coins",
        imageLink: "coin_green.png"
    }
]

const shop_featureEnum = {
    CAULDRON: 0,
    KINGDOM: 1,
    DUNGEON: 2,
}

/*Array of data structures for feature shop items
-----
idNumber: The idNumber according to its position in the array. shop_featureEnum should match this
name: String containing the shop item name.
id: String containing the html id for the container div
description: String containing the html for the description
cost: An array of data objects detailing each cost for this item. An empty array means it's free:
--type: The resource type
--value: The amount of this resource needed to buy it
onPurchase: A lambda function with the code of what should happen when the item is purchased, saving the unlock to the game object and subtracting cost is already handled in shop_buy()
idLink: should be included but set to null. shop_init() will set this to the html container div element so we don't have to search the DOM for it again
costLink: should be included but set to null. shop_init() will set this to the html span element so we don't have to search the DOM for it again
-----*/
var shop_item_feature = [
    {
        idNumber: shop_featureEnum.CAULDRON,
        name: "Cauldron",
        id: "shop_feature_cauldron",
        description: "<p>Gain magic power for spells!</p>",
        cost: [],
        onPurchase: function () {
            displayFeatures();
        },
        idLink: null,
        costLink: null
    },
    {
        idNumber: shop_featureEnum.KINGDOM,
        name: "Kingdom",
        id: "shop_feature_kingdom",
        description: "<p>Build and expand an empire, producing goods every second!</p>",
        cost: [
            {
                type: shop_costEnum.GREENCOINS,
                value: 1
            }
        ],
        onPurchase: function () {
            displayFeatures();
        },
        idLink: null,
        costLink: null
    },
    {
        idNumber: shop_featureEnum.DUNGEON,
        name: "Dungeon",
        id: "shop_feature_dungeon",
        description: "<p>In development. But get hyped!</p>",
        cost: [
            {
                type: shop_costEnum.GREENCOINS,
                value: 9
            }
        ],
        onPurchase: function () {
            displayFeatures();
        },
        idLink: null,
        costLink: null
    }
]

const shop_cauldronEnum = {
    BRAININAJAR: 0
}

/*Array of data structures for cauldron shop items
-----
idNumber: The idNumber according to its position in the array. shop_cauldronEnum should match this
name: String containing the shop item name.
id: String containing the html id for the container div
description: String containing the html for the description
cost: An array of data objects detailing each cost for this item:
--type: The resource type
--value: The amount of this resource needed to buy it
onPurchase: A lambda function with the code of what should happen when the item is purchased, saving the unlock to the game object and subtracting cost is already handled in shop_buy()
idLink: should be included but set to null. shop_init() will set this to the html container div element so we don't have to search the DOM for it again
costLink: should be included but set to null. shop_init() will set this to the html span element so we don't have to search the DOM for it again
-----*/
var shop_item_cauldron = [
    {
        idNumber: shop_cauldronEnum.BRAININAJAR,
        name: "Brain in a Jar",
        id: "shop_cauldron_brainInAJar",
        description: "<p>Unlock a new item that produces kingdom research when purchased.</p>",
        cost: [
            {
                type: shop_costEnum.YELLOWCOINS,
                value: 2500
            }
        ],
        onPurchase: function () {
            cauldron_unlocks();
        },
        idLink: null,
        costLink: null
    }
]

const shop_kingdomEnum = {
    REMOVE: 0,
    CLAIMTILE: 1
}

/*Array of data structures for kingdom shop items
-----
idNumber: The idNumber according to its position in the array. shop_kingdomEnum should match this
name: String containing the shop item name.
id: String containing the html id for the container div
description: String containing the html for the description
cost: An array of data objects detailing each cost for this item:
--type: The resource type
--value: The amount of this resource needed to buy it
onPurchase: A lambda function with the code of what should happen when the item is purchased, saving the unlock to the game object and subtracting cost is already handled in shop_buy()
idLink: should be included but set to null. shop_init() will set this to the html container div element so we don't have to search the DOM for it again
costLink: should be included but set to null. shop_init() will set this to the html span element so we don't have to search the DOM for it again
-----*/
var shop_item_kingdom = [
    {
        idNumber: shop_kingdomEnum.REMOVE,
        name: "Remove Buildings",
        id: "shop_kingdom_remove",
        description: "<p>Unlock the ability to remove buildings you previously placed.</p>",
        cost: [
            {
                type: shop_costEnum.YELLOWCOINS,
                value: 1000
            }
        ],
        onPurchase: function () {
            kingdom_unlocks();
        },
        idLink: null,
        costLink: null
    },
    {
        idNumber: shop_kingdomEnum.CLAIMTILE,
        name: "Claim Tile",
        id: "shop_kingdom_claimTile",
        description: "<p>Unlock the ability to expand your borders by spending military.</p>",
        cost: [
            {
                type: shop_costEnum.YELLOWCOINS,
                value: 1000
            }
        ],
        onPurchase: function () {
            kingdom_unlocks();
        },
        idLink: null,
        costLink: null
    }
]
