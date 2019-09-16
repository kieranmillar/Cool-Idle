//This is run once when the game is loaded
//It creates HTML elements for all of the shop items etc. and also calculates things that aren't stored in the game object
function shop_init() {

}

//Buying items from Cool-Mart
//TODO: Genericise this, storing the data in data structures
function shop_buy (item) {
    switch (item) {
        case "kingdom":
            if (!game.shop.features[shop_featureEnum.KINGDOM]) {
                game.shop.features[shop_featureEnum.KINGDOM] = 1;
                displayFeatures();
            }
            break;
        case "kingdom_remove":
            if (game.yellowCoins >= 250) {
                if (!game.shop.kingdom[shop_kingdomEnum.REMOVE]) {
                    game.shop.kingdom[shop_kingdomEnum.REMOVE] = 1;
                    game.yellowCoins -= 250;
                    kingdom_unlocks();
                }
            }
            break;
        case "kingdom_claimTile":
            if (game.yellowCoins >= 250) {
                if (!game.shop.kingdom[shop_kingdomEnum.CLAIMTILE]) {
                    game.shop.kingdom[shop_kingdomEnum.CLAIMTILE] = 1;
                    game.yellowCoins -= 250;
                    kingdom_unlocks();
                }
            }
            break;
    }
    shop_redraw ();
    save();
}
