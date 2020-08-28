var cauldron_magicIncome = 0;

var cauldron_buildingClass = [];

//This is run once when the game is loaded
//It creates HTML elements and also calculates things that aren't stored in the game object
function cauldron_init() {
    //Dynamically create building list
    cauldron_buildings.forEach(building => {
        var newElement = $('<div></div>');
        newElement.attr('id', building.id);
        newElement.addClass("cauldron_building");
        let htmlText = "<div class='cauldron_building_row'>";
        htmlText += "<span id='" + building.id + "Stock' class='cauldron_buildingStock'></span>";
        htmlText += "<img src = './images/cauldron/" + building.imageLink + "' alt='" + building.name + "' class='cauldron_buildingImage'/>";
        htmlText += "<span class='cauldron_buildingName'>" + building.name + "</span></div>";
        htmlText += "<div class='cauldron_building_row'>";
        htmlText += "<span class='cauldron_buildingDescription'>" + building.description() + "</span></div>";
        htmlText += "<div class='cauldron_building_row cauldron_spread_row'>";
        htmlText += "<span id='" + building.id + "Cost'></span>";
        htmlText += "<button type='button' id='" + building.id + "BuildButton' class='cauldron_buildButton button' onclick='cauldron_build(" + building.idNumber + ")' disabled>Conjure</button></div>";
        newElement.html(htmlText);
    
        $("#cauldron_buildingList").append(newElement);
        cauldron_buildingClass.push(newElement);

        building.idLink = $("#" + building.id);
        building.valueLink = $("#" + building.id + "Stock");
        building.buildButtonLink = $("#" + building.id + "BuildButton");
        building.cost.link = $("#" + building.id + "Cost");
    });

    cauldron_calculateOutput();
}

//This is called by the game loop to trigger all of the once per second updates this feature requires
function cauldron_tick () {
    game.cauldron.magic += cauldron_magicIncome;
}

//We try and work out the magic income any time something changes and store it, so only the end result is read each tick
function cauldron_calculateOutput () {
    cauldron_magicIncome = 0;
    for (i = 0; i < cauldron_buildings.length; i++) {
        if (cauldron_buildings[i].hasOwnProperty('output')) {
            cauldron_magicIncome += cauldron_buildings[i].output() * game.cauldron.building[i];
        }
    }
}

// Get the scaled cost of a building, based on number of that building already built
function cauldron_getBuildingCost (building) {
    return Math.floor(cauldron_buildings[building].cost.base * Math.pow(cauldron_buildings[building].cost.factor, game.cauldron.building[building]));
}

// Returns if you can afford to build a building
function cauldron_getBuildingAffordable (building) {
    if (game.cauldron.magic < cauldron_getBuildingCost (building)) {
        return false;
    }
    return true;
}

// Build a building, paying its cost.
function cauldron_build(building) {
    if (!cauldron_getBuildingAffordable (building)) {
        return;
    }
    game.cauldron.magic -= cauldron_getBuildingCost(building);
    game.cauldron.building[building] ++;
    if (cauldron_buildings[building].hasOwnProperty('onPurchase')) {
        cauldron_buildings[building].onPurchase();
    }
    cauldron_calculateOutput();
    cauldron_redraw();
    save();
}
