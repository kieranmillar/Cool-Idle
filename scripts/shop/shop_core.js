//Buying items from Cool-Mart
//TODO: Genericise this, storing the data in data structures
function shop_buy (item) {
    switch (item) {
        case "kingdom":
            if (!game.shop[shop_itemEnum.FEATUREKINGDOM]) {
                game.shop[shop_itemEnum.FEATUREKINGDOM] = 1;
                displayFeatures();
            }
            break;
        case "kingdom_remove":
            if (game.yellowCoins >= 250) {
                if (!game.shop[shop_itemEnum.KINGDOMREMOVE]) {
                    game.shop[shop_itemEnum.KINGDOMREMOVE] = 1;
                    game.yellowCoins -= 250;
                    displayFeatures();
                }
            }
            break;
        case "kingdom_claimTile":
            if (game.yellowCoins >= 250) {
                if (!game.shop[shop_itemEnum.KINGDOMCLAIMTILE]) {
                    game.shop[shop_itemEnum.KINGDOMCLAIMTILE] = 1;
                    game.yellowCoins -= 250;
                    kingdom_unlocks();
                    displayFeatures();
                }
            }
            break;
    }
    shop_redraw ();
    save();
}
