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
        case "kingdom_stockExp":
            if (game.yellowCoins >= 2500) {
                if (!game.shop[shop_itemEnum.KINGDOMSTOCKEXP]) {
                    game.shop[shop_itemEnum.KINGDOMSTOCKEXP] = 1;
                    game.yellowCoins -= 2500;
                    displayFeatures();
                }
            }
            break;
    }
    shop_redraw ();
    save();
}
