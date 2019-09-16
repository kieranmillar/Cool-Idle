//Drawing Cool-Mart
function shop_redraw () {
    if (game.shop.features[shop_featureEnum.KINGDOM] == 1) {
        $('#shop_feature_kingdom').addClass('purchased');
        $('#shop_feature_kingdom > .cost').html("Purchased!");
        $('#shop_section_kingdom').show();
    }
    else {
        $('#shop_section_kingdom').hide();
    }
    if (game.shop.kingdom[shop_kingdomEnum.REMOVE] == 1) {
        $('#shop_kingdom_remove').addClass('purchased');
        $('#shop_kingdom_remove > .cost').html("Purchased!");
    }
    if (game.shop.kingdom[shop_kingdomEnum.CLAIMTILE] == 1) {
        $('#shop_kingdom_claimTile').addClass('purchased');
        $('#shop_kingdom_claimTile > .cost').html("Purchased!");
    }
}
