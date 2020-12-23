//This is run once when the game is loaded
//It creates HTML elements for all of the shop items etc. and also calculates things that aren't stored in the game object
function shop_init() {
    shop_populateItemList(shop_item_feature, "shop_section_features_list", "features");
    shop_populateItemList(shop_item_cauldron, "shop_section_cauldron_list", "cauldron");
    shop_populateItemList(shop_item_kingdom, "shop_section_kingdom_list", "kingdom");
}

//Creates the items in each section of the shop. Only called by shop_init()
/*Arguments:
itemArray: The array of data objects you want to create. Arrays in javascript are passed by reference
sectionId: The html id name of the section you want to append the created items to. Do not include the #
category: A string containing the category that is passed into shop_buy()
*/
function shop_populateItemList(itemArray, sectionId, category) {
    let count = 0;
    itemArray.forEach(item => {
        var newElement = $('<div></div>');
        newElement.attr('id', item.id);
        newElement.addClass("shop_item");
        newElement.click({ value: count }, function (event) {shop_buy(category, event.data.value)});
        let htmlText = "<h2>" + item.name + "</h2>" + item.description + "<span id='" + item.id + "Cost' class='cost'>Cost: ";
        if (item.cost.length == 0) {
            htmlText += "Free!";
        }
        else {
            for (let i = 0; i < item.cost.length; i ++) {
                htmlText += "<img src = './images/" + shop_costs[item.cost[i].type].imageLink + "' alt='" + shop_costs[item.cost[i].type].name + "'/>" + item.cost[i].value;
            }
        }
        htmlText += "</span>";
        newElement.html(htmlText);
        
        $("#" + sectionId).append(newElement);

        item.idLink = $("#" + item.id);
        item.costLink = $("#" + item.id + "Cost");
        count ++;
    });
}

//Buying items from Cool-Mart
function shop_buy (category, item) {
    //In Javascript arrays are passed by reference so we can perform the same code on different arrays:
    let gameArray;
    let itemArray;
    switch (category) {
        case "features":
            gameArray = game.shop.features;
            itemArray = shop_item_feature;
            break;
        case "cauldron":
            gameArray = game.shop.cauldron;
            itemArray = shop_item_cauldron;
            break;
        case "kingdom":
            gameArray = game.shop.kingdom;
            itemArray = shop_item_kingdom;
            break;
    }
    //Is this already purchased?
    if(gameArray[item] == 1) {
        return;
    }
    //Can we afford to buy this?
    for (let i = 0; i < itemArray[item].cost.length; i ++) {
        switch (itemArray[item].cost[i].type) {
            case shop_costEnum.YELLOWCOINS:
                if (game.yellowCoins < itemArray[item].cost[i].value) {
                    return;
                }
                break;
            case shop_costEnum.BLUECOINS:
                if (game.blueCoins < itemArray[item].cost[i].value) {
                    return;
                }
                break;
            case shop_costEnum.GREENCOINS:
                if (game.greenCoins < itemArray[item].cost[i].value) {
                    return;
                }
                break;
        }
    }
    gameArray[item] = 1;
    itemArray[item].onPurchase();
    for (let i = 0; i < itemArray[item].cost.length; i ++) {
        switch (itemArray[item].cost[i].type) {
            case shop_costEnum.YELLOWCOINS:
                spendYellowCoins(itemArray[item].cost[i].value);
                break;
            case shop_costEnum.BLUECOINS:
                spendBlueCoins(itemArray[item].cost[i].value);
                break;
            case shop_costEnum.GREENCOINS:
                spendGreenCoins(itemArray[item].cost[i].value);
                break;
        }
    }
    shop_redraw();
    save();
}
