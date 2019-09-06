function shop_redraw () {
    if (game.kingdom.unlocked) {
        $('#shop_kingdom').addClass('purchased');
        $('#shop_kingdom > .cost').html("Purchased!");
    }
}

function shop_buy (item) {
    switch (item) {
        case "kingdom":
            if (!game.kingdom.unlocked) {
                game.kingdom.unlocked = true;
                displayFeatures();
            }
			break;
    }
    shop_redraw ();
}