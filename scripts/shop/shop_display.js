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
    if (game.shop[shop_itemEnum.KINGDOMCLAIMTILE] == 1) {
        $('#shop_kingdom_claimTile').addClass('purchased');
        $('#shop_kingdom_claimTile > .cost').html("Purchased!");
    }
}
