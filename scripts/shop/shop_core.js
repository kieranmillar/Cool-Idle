function shop_buy (item) {
    switch (item) {
        case "kingdom":
            if (!game.shop[shop_itemEnum.FEATUREKINGDOM]) {
                game.shop[shop_itemEnum.FEATUREKINGDOM] = 1;
                displayFeatures();
            }
            break;
        case "kingdom_remove":
            if (game.yellowCoins >= 500) {
                if (!game.shop[shop_itemEnum.KINGDOMREMOVE]) {
                    game.shop[shop_itemEnum.KINGDOMREMOVE] = 1;
                    game.yellowCoins -= 500;
                    displayFeatures();
                }
            }
            break;
        case "kingdom_claimTile":
            if (game.yellowCoins >= 500) {
                if (!game.shop[shop_itemEnum.KINGDOMCLAIMTILE]) {
                    game.shop[shop_itemEnum.KINGDOMCLAIMTILE] = 1;
                    game.yellowCoins -= 500;
                    displayFeatures();
                }
            }
            break;
    }
    shop_redraw ();
    save();
}
