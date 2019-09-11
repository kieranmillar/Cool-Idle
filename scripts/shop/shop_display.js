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
    if (game.shop[shop_itemEnum.KINGDOMSTOCKEXP] == 1) {
        $('#shop_kingdom_stockExp').addClass('purchased');
        $('#shop_kingdom_stockExp > .cost').html("Purchased!");
    }
}
