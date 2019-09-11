function shop_redraw () {
    if (game.shop[shop_itemEnum.FEATUREKINGDOM] == 1) {
        $('#shop_kingdom').addClass('purchased');
        $('#shop_kingdom > .cost').html("Purchased!");
        $('#shop_section_kingdom').show();
    }
    else {
        $('#shop_section_kingdom').hide();
    }
    if (game.shop[shop_itemEnum.KINGDOMREMOVE] == 1) {
        $('#shop_kingdom_remove').addClass('purchased');
        $('#shop_kingdom_remove > .cost').html("Purchased!");
    }
}

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
    }
    shop_redraw ();
    save();
}
