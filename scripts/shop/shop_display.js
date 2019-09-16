const shop_section_kingdom = $('#shop_section_kingdom');

//Drawing Cool-Mart
function shop_redraw () {
    for (let i = 0; i < shop_item_feature.length; i++) {
        if (game.shop.features[i]) {
            shop_item_feature[i].idLink.addClass('purchased');
            shop_item_feature[i].costLink.html("Purchased!");
        }
    }
    if (game.shop.features[shop_featureEnum.KINGDOM] == 1) {
        shop_section_kingdom.show();
    }
    else {
        shop_section_kingdom.hide();
    }

    for (let i = 0; i < shop_item_kingdom.length; i++) {
        if (game.shop.kingdom[i]) {
            shop_item_kingdom[i].idLink.addClass('purchased');
            shop_item_kingdom[i].costLink.html("Purchased!");
        }
    }
}
