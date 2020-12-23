const shop_section_cauldron = $('#shop_section_cauldron');
const shop_section_kingdom = $('#shop_section_kingdom');

//Drawing Cool-Mart
function shop_redraw () {
    for (let i = 0; i < shop_item_feature.length; i++) {
        if (game.shop.features[i]) {
            shop_item_feature[i].idLink.addClass('purchased');
            shop_item_feature[i].costLink.html("Purchased!");
        }
    }
    if (game.shop.features[shop_featureEnum.CAULDRON] == 1) {
        for (let i = 0; i < shop_item_cauldron.length; i++) {
            if (game.shop.cauldron[i]) {
                shop_item_cauldron[i].idLink.addClass('purchased');
                shop_item_cauldron[i].costLink.html("Purchased!");
            }
        }
        shop_section_cauldron.show();
    }
    else {
        shop_section_cauldron.hide();
    }

    if (game.shop.features[shop_featureEnum.KINGDOM] == 1) {
        for (let i = 0; i < shop_item_kingdom.length; i++) {
            if (game.shop.kingdom[i]) {
                shop_item_kingdom[i].idLink.addClass('purchased');
                shop_item_kingdom[i].costLink.html("Purchased!");
            }
        }
        shop_section_kingdom.show();
    }
    else {
        shop_section_kingdom.hide();
    }
}
