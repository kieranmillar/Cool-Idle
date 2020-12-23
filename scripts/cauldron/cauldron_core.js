var cauldron_magicIncome = 0;

var cauldron_buildingClass = [];
var cauldron_spellClass = [];

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
        htmlText += "<span id='" + building.id + "Description' class='cauldron_buildingDescription'>" + building.description() + "</span></div>";
        htmlText += "<div class='cauldron_building_row cauldron_spread_row'>";
        htmlText += "<span id='" + building.id + "Cost'></span>";
        htmlText += "<button type='button' id='" + building.id + "BuildButton' class='cauldron_buildButton button' onclick='cauldron_build(" + building.idNumber + ")' disabled>Conjure</button></div>";
        newElement.html(htmlText);
    
        $("#cauldron_buildingList").append(newElement);
        cauldron_buildingClass.push(newElement);

        building.idLink = $("#" + building.id);
        building.valueLink = $("#" + building.id + "Stock");
        building.buttonLink = $("#" + building.id + "BuildButton");
        building.descriptionLink = $("#" + building.id + "Description");
        building.cost.link = $("#" + building.id + "Cost");
    });

    //Dynamically create spell list
    cauldron_spells.forEach(spell => {
        var newElement = $('<div></div>');
        newElement.attr('id', spell.id);
        newElement.addClass("cauldron_spell");
        let htmlText = "<div class='cauldron_spell_row'><img src = './images/cauldron/" + spell.imageLink + "' alt='" + spell.name + "'/><span class='cauldron_spellName'>" + spell.name + "</span></div>";
        htmlText += "<span class='cauldron_spellDescription'>" + spell.description + "</span></div>";
        htmlText += "<div class='cauldron_spell_row cauldron_spread_row'>";
        htmlText += "<div>Cost: " + displayNum(spell.cost) + " ✨Magic</div>";
        htmlText += "<button type='button' id='" + spell.id + "SpellButton' class='cauldron_spellButton button' onclick='cauldron_castSpell(" + spell.idNumber + ")' disabled>Cast</button></div>";
		newElement.html(htmlText);
        
        $("#cauldron_spellList").append(newElement);
        cauldron_spellClass.push(newElement);

        spell.idLink = $("#" + spell.id);
        spell.buttonLink = $("#" + spell.id + "SpellButton");
    });

    cauldron_unlocks();
    cauldron_calculateOutput();
}

//This is called by the game loop to trigger all of the once per second updates this feature requires
function cauldron_tick () {
    game.cauldron.magic += cauldron_magicIncome;
}

//Work out what should be unlocked
function cauldron_unlocks() {
    if (game.cauldron.spells[cauldron_spellEnum.LIBRARY]) {
        cauldron_buildings[cauldron_buildingEnum.MAGICBOOK].unlocked = true;
        cauldron_spells[cauldron_spellEnum.BOOKSHELVES].unlocked = true;
        cauldron_spells[cauldron_spellEnum.CRYSTALREFINERY].unlocked = true;
    }
    if (game.cauldron.spells[cauldron_spellEnum.CRYSTALREFINERY]) {
        cauldron_buildings[cauldron_buildingEnum.CRYSTALBALL].unlocked = true;
    }
    if (game.shop.cauldron[shop_cauldronEnum.BRAININAJAR]) {
        cauldron_buildings[cauldron_buildingEnum.BRAININAJAR].unlocked = true;
    }
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

// Returns if you can afford to purchase a spell
function cauldron_getSpellAffordable (spell) {
    if (game.cauldron.magic < cauldron_spells[spell].cost) {
        return false;
    }
    return true;
}

// Purchase a spell, paying its magic cost
function cauldron_castSpell(spell) {
    if (game.cauldron.spells[spell]) {
        return;
    }
    if (!cauldron_getSpellAffordable (spell)) {
        return;
    }
    game.cauldron.magic -= cauldron_spells[spell].cost;
    game.cauldron.spells[spell] = 1;
    cauldron_unlocks();
    cauldron_calculateOutput();
    cauldron_redraw();
    save();
}
