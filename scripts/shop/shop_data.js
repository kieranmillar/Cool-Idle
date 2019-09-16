const shop_featureEnum = {
    KINGDOM: 0,
}

const shop_costEnum = {
    YELLOWCOINS: 0,
    BLUECOINS: 1,
    GREENCOINS: 2
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
onPurchase: A lambda function with the code of what should happen when the item is purchased
idLink: should be included but set to null. shop_init() will set this to the html container div element so we don't have to search the DOM for it again
costLink: should be included but set to null. shop_init() will set this to the html span element so we don't have to search the DOM for it again
-----*/
var shop_item_feature = [
    {
        idNumber: shop_featureEnum.KINGDOM,
        name: "Kingdom",
        id: "shop_feature_kingdom",
        description: "<p>Build and expand an empire, producing goods every second!</p>",
        cost: [],
        onPurchase: function () {
            game.shop.features[shop_featureEnum.KINGDOM] = 1;
            displayFeatures();
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
onPurchase: A lambda function with the code of what should happen when the item is purchased
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
                value: 250
            }
        ],
        onPurchase: function () {
            game.shop.kingdom[shop_kingdomEnum.REMOVE] = 1;
            game.yellowCoins -= 250;
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
                value: 250
            }
        ],
        onPurchase: function () {
            game.shop.kingdom[shop_kingdomEnum.CLAIMTILE] = 1;
            game.yellowCoins -= 250;
            kingdom_unlocks();
        },
        idLink: null,
        costLink: null
    }
]
