var kingdom_cells;
var kingdom_currentCell = 40;
var kingdom_buildingStock = [];
var kingdom_placing = 0;
var kingdom_claimedTiles = 0;

function kingdom_init() {
    //Dynamically create resource list
    kingdom_resources.forEach(resource => {
        var newElement = $('<div></div>');
        newElement.attr('id', resource.id);
		newElement.addClass("kingdom_resource");
		newElement.html("<img src = './images/kingdom/" + resource.imageLink + "' alt='" + resource.name + "'/><span id='" + resource.value + "'/></span>");
        $("#kingdom_resourcePanel").append(newElement);
        resource.idLink = $("#" + resource.id);
        resource.valueLink = $("#" + resource.value);
    });

    //Dynamically create terrain map
    let count = 0;
    for (let i = 0; i < 9; i++) {
        var row = $('<div></div>');
        row.addClass("kingdom_tileRow");
        for (let j = 0; j < 9; j++) {
            var cell = $('<div></div>');
            cell.addClass("kingdom_tileCell");
            cell.click({ value: count }, function (event) {kingdom_clickedCell(event.data.value)});
            cell.mouseenter({ value: count }, function (event) {kingdom_mousedOverCell(event.data.value)});
            row.append(cell);
            count ++;
        }
        $("#kingdom_mainGrid").append(row);
    }
    kingdom_cells = $(".kingdom_tileCell");

    $("#kingdom_removeBuildingPanel").mouseenter(function () {kingdom_updateinfoPanel(kingdom_infoPanelEnum.REMOVE, 0)});
    $("#kingdom_claimTilePanel").mouseenter(function () {kingdom_updateinfoPanel(kingdom_infoPanelEnum.CLAIMTILE, 0)});

    //Dynamically create building list
    kingdom_buildings.forEach(building => {
        if (building.name == "Castle" || building.name == "") {
            return;
        }
        var newElement = $('<div></div>');
        newElement.attr('id', building.id);
        newElement.addClass("kingdom_building");
        newElement.mouseenter({ value: building.idNumber }, function (event) {kingdom_mousedOverBuilding(event.data.value)});
        let htmlText = "<div class='kingdom_building_row'><span id='" + building.id + "Stock' class='kingdom_buildingStock'></span><img src = './images/kingdom/" + building.imageLink(kingdom_terrainEnum.PLAINS) + "' alt='" + building.name + "' class='kingdom_buildingImage'/><span class='kingdom_buildingName'>" + building.name + "</span><button type='button' id='" + building.id + "PlaceButton' class='kingdom_placeButton button' onclick='kingdom_pickupBuilding(" + building.idNumber + ")' disabled>Place</button></div>";
        htmlText += "<div class='kingdom_building_row'><span class='kingdom_buildingCost'>";
        for (let i = 0; i < building.cost.length; i ++) {
            htmlText += "<img src = './images/kingdom/" + kingdom_resources[building.cost[i].type].imageLink + "' alt='" + kingdom_resources[building.cost[i].type].name + "'/><span id='" + building.id + kingdom_resources[building.cost[i].type].name + "Cost'></span>";
            building.cost[i].link = $("#" + building.id + kingdom_resources[building.cost[i].type].name + "Cost");
        }
        htmlText += "</span><button type='button' id='" + building.id + "BuildButton' class='kingdom_buildButton button' onclick='kingdom_build(" + building.idNumber + ")' disabled>Build</button></div>";
        newElement.html(htmlText);
        
        $("#kingdom_buildingList").append(newElement);
        building.idLink = $("#" + building.id);
        building.valueLink = $("#" + building.id + "Stock");
        building.buildButtonLink = $("#" + building.id + "BuildButton");
        building.placeButtonLink = $("#" + building.id + "PlaceButton");
        for (let i = 0; i < building.cost.length; i ++) {
            building.cost[i].link = $("#" + building.id + kingdom_resources[building.cost[i].type].name + "Cost");
        }
    });

    //Calculate building stock
    kingdom_buildingStock = [ ...game.kingdom.building ];
    for (let i = 0; i < kingdom_cells.length; i++) {
        if (game.kingdom.constructions[i] != kingdom_buildingEnum.EMPTY && game.kingdom.constructions[i] != kingdom_buildingEnum.CASTLE) {
            kingdom_buildingStock [game.kingdom.constructions[i]] --;
        }
    }

    //Dynamically create upgrade list
    kingdom_upgrades.forEach(upgrade => {
        var newElement = $('<div></div>');
        newElement.attr('id', upgrade.id);
        newElement.addClass("kingdom_upgrade");
        newElement.mouseenter({ value: upgrade.idNumber }, function (event) {kingdom_mousedOverUpgrade(event.data.value)});
        let htmlText = "<div class='kingdom_upgrade_row'><span class='kingdom_upgradeName'>" + upgrade.name + "</span><button type='button' id='" + upgrade.id + "UpgradeButton' class='kingdom_upgradeButton button' onclick='kingdom_purchaseUpgrade(" + upgrade.idNumber + ")' disabled>Purchase</button></div>";
        htmlText += "<div class='kingdom_upgrade_row'><span>";
        for (let i = 0; i < upgrade.cost.length; i ++) {
            htmlText += "<img src = './images/kingdom/" + kingdom_resources[upgrade.cost[i].type].imageLink + "' alt='" + kingdom_resources[upgrade.cost[i].type].name + "'/>" + displayNum(upgrade.cost[i].value);
        }
        htmlText += "</span></div>";
		newElement.html(htmlText);
        
        $("#kingdom_upgradeList").append(newElement);
        upgrade.idLink = $("#" + upgrade.id);
        upgrade.buttonLink = $("#" + upgrade.id + "UpgradeButton");
    });

    kingdom_unlocks();
    kingdom_calculateOutput();
}

function kingdom_tick () {
    for (let i = 0; i < game.kingdom.resource.length; i++) {
        game.kingdom.resource[i] += kingdom_outputs.resource[i] * game.level;
        kingdom_outputs.resourceDisplay[i] = kingdom_outputs.resource[i];
    }
    let totalWoodIncome = (kingdom_outputs.resource[kingdom_resourceEnum.WOOD] - kingdom_outputs.conversion.sawmill) * game.level;
    let totalWoodConsumption = kingdom_outputs.conversion.sawmill * game.level;
    if (totalWoodIncome > 0 || totalWoodConsumption <= game.kingdom.resource[kingdom_resourceEnum.WOOD]) {
        // Turn on wood consumption
        game.kingdom.resource[kingdom_resourceEnum.WOOD] -= kingdom_outputs.conversion.sawmill * game.level;
        kingdom_outputs.resourceDisplay[kingdom_resourceEnum.WOOD] -= kingdom_outputs.conversion.sawmill;
        game.kingdom.resource[kingdom_resourceEnum.PLANK] += kingdom_outputs.conversion.sawmill * game.level;
        kingdom_outputs.resourceDisplay[kingdom_resourceEnum.PLANK] += kingdom_outputs.conversion.sawmill;
    }
    gainYellowCoins(kingdom_outputs.yellowCoins);
    gainExp(kingdom_outputs.exp);
}

function kingdom_unlocks() {
    kingdom_range = 1;
    if (game.kingdom.upgrades[kingdom_upgradeEnum.QUARRY]) {
        kingdom_buildings[kingdom_buildingEnum.QUARRY].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILL]) {
        kingdom_buildings[kingdom_buildingEnum.SAWMILL].unlocked = true;
        kingdom_upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.QUARRY] && game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILL]) {
        kingdom_upgrades[kingdom_upgradeEnum.LOGCABIN].unlocked = true;
        kingdom_upgrades[kingdom_upgradeEnum.BARRACKS].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.LOGCABIN]) {
        kingdom_buildings[kingdom_buildingEnum.LOGCABIN].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.BARRACKS]) {
        kingdom_buildings[kingdom_buildingEnum.BARRACKS].unlocked = true;
    }
}

function kingdom_calculateOutput () {
    kingdom_claimedTiles = -9;
    for (let i = 0; i < game.kingdom.borders.length; i++) {
        if (game.kingdom.borders[i] == 2) {
            kingdom_claimedTiles ++;
        }
    }

    for (let i = 0; i < kingdom_outputs.resource.length; i++) {
        kingdom_outputs.resource[i] = 0;
    }
    kingdom_outputs.exp = 0;
    kingdom_outputs.yellowCoins = 0;
    Object.keys(kingdom_outputs.conversion).forEach(v => kingdom_outputs.conversion[v] = 0);
    for (let i = 0; i < kingdom_cells.length; i++) {
        const currentConstruction = game.kingdom.constructions[i];
        if (currentConstruction != kingdom_buildingEnum.EMPTY) {
            if (kingdom_buildings[currentConstruction].hasOwnProperty('output')) {
                kingdom_buildings[currentConstruction].output(i);
            }
        }
    }
}

function kingdom_getTerrainNorth(currentTile) {
    let northTile = currentTile - 9;
    if (northTile > 0) {
        return kingdom_landscape[northTile];
    }
    else {
        return 0;
    }
}

function kingdom_getConstructionNorth(currentTile) {
    let northTile = currentTile - 9;
    if (northTile > 0) {
        return game.kingdom.constructions[northTile];
    }
    else {
        return 0;
    }
}

function kingdom_getTerrainEast(currentTile) {
    if (currentTile % 9 < 8) {
        return kingdom_landscape[currentTile + 1];
    }
    else {
        return 0;
    }
}

function kingdom_getConstructionEast(currentTile) {
    if (currentTile % 9 < 8) {
        return game.kingdom.constructions[currentTile + 1];
    }
    else {
        return 0;
    }
}

function kingdom_getTerrainSouth(currentTile) {
    let southTile = currentTile + 9;
    if (southTile < kingdom_cells.length) {
        return kingdom_landscape[southTile];
    }
    else {
        return 0;
    }
}

function kingdom_getConstructionSouth(currentTile) {
    let southTile = currentTile + 9;
    if (southTile < kingdom_cells.length) {
        return game.kingdom.constructions[southTile];
    }
    else {
        return 0;
    }
}

function kingdom_getTerrainWest(currentTile) {
    if (currentTile % 9 > 0) {
        return kingdom_landscape[currentTile - 1];
    }
    else {
        return 0;
    }
}

function kingdom_getConstructionWest(currentTile) {
    if (currentTile % 9 > 0) {
        return game.kingdom.constructions[currentTile - 1];
    }
    else {
        return 0;
    }
}

const kingdom_rangeEnum = {
    OUTOFBORDERS: 0,
    OUTSKIRTS: 1,
    INBORDERS: 2
}

const kingdom_infoPanelEnum = {
    CELL: 0,
    BUILDING: 1,
    UPGRADE: 2,
    REMOVE: 3,
    CLAIMTILE: 4
}

function kingdom_mousedOverCell(cell) {
    if (game.kingdom.borders[cell] != kingdom_rangeEnum.OUTOFBORDERS) {
        kingdom_currentCell = cell;
        kingdom_updateinfoPanel (kingdom_infoPanelEnum.CELL, cell);
    }
}

function kingdom_clickedCell(cell) {
    if (kingdom_placing == -2) {
        //We are trying to claim a tile
        kingdom_claimTile(cell);
    }
    else if (game.kingdom.constructions[cell] != kingdom_buildingEnum.EMPTY) {
        //there is a construction on the cell
        if (kingdom_placing == -1) {
            kingdom_removeBuilding(cell);
        }
	}
	else {
        //the cell is unbuilt terrain
        if (kingdom_placing > 0) {
            kingdom_place (cell);
        }
	}
}

function kingdom_claimTile(cell) {
    if (game.kingdom.borders[cell] != kingdom_rangeEnum.OUTSKIRTS) {
        return;
    }
    if (kingdom_landscape[cell] == kingdom_terrainEnum.WATER && true) { //TODO: Upgrade that lets you claim water tiles
        return;
    }
    let cost = Math.floor(kingdom_claimTileCostBase * Math.pow(kingdom_claimTileCostFactor, kingdom_claimedTiles));
    game.kingdom.resource[kingdom_resourceEnum.LABOUR] -= cost;
    game.kingdom.resource[kingdom_resourceEnum.MILITARY] -= cost;
    game.kingdom.borders[cell] = kingdom_rangeEnum.INBORDERS;
    if (cell > 8) {
        let northTile = cell - 9;
        if (game.kingdom.borders[northTile] == kingdom_rangeEnum.OUTOFBORDERS) {
            game.kingdom.borders[northTile] = kingdom_rangeEnum.OUTSKIRTS;
        }
    }
    if (cell % 9 < 8) {
        let eastTile = cell + 1;
        if (game.kingdom.borders[eastTile] == kingdom_rangeEnum.OUTOFBORDERS) {
            game.kingdom.borders[eastTile] = kingdom_rangeEnum.OUTSKIRTS;
        }
    }
    if (cell < 72) {
        let southTile = cell + 9;
        if (game.kingdom.borders[southTile] == kingdom_rangeEnum.OUTOFBORDERS) {
            game.kingdom.borders[southTile] = kingdom_rangeEnum.OUTSKIRTS;
        }
    }
    if (cell % 9 > 0) {
        let westTile = cell - 1;
        if (game.kingdom.borders[westTile] == kingdom_rangeEnum.OUTOFBORDERS) {
            game.kingdom.borders[westTile] = kingdom_rangeEnum.OUTSKIRTS;
        }
    }
    kingdom_placing = 0;
    kingdom_claimedTiles ++;
    kingdom_updateResources();
    kingdom_populateTileImages();
    kingdom_updateBuildings();
    save();
}

function kingdom_removeBuilding(cell) {
    let building = game.kingdom.constructions[cell];
    if (building == kingdom_buildingEnum.CASTLE || building == kingdom_buildingEnum.EMPTY) {
        return;
    }
    game.kingdom.constructions[cell] = kingdom_buildingEnum.EMPTY;
    kingdom_buildingStock[building] ++;
    kingdom_placing = 0;
    kingdom_calculateOutput();
    kingdom_updateResources();
    kingdom_populateTileImages();
    kingdom_updateBuildings();
    save();
}

function kingdom_removeAllBuildings() {
    for (let i = 0; i < game.kingdom.constructions.length; i ++) {
        let building = game.kingdom.constructions[i];
        if (building == kingdom_buildingEnum.CASTLE || building == kingdom_buildingEnum.EMPTY) {
            continue;
        }
        game.kingdom.constructions[i] = kingdom_buildingEnum.EMPTY;
        kingdom_buildingStock[building] ++;
    }
    kingdom_calculateOutput();
    kingdom_updateResources();
    kingdom_populateTileImages();
    kingdom_updateBuildings();
    save();
}

function kingdom_pickupRemoveBuilding() {
    if (kingdom_placing == -1) {
        kingdom_placing = 0;
    }
    else {
        kingdom_placing = -1;
    }
    kingdom_updateBuildings();
}

function kingdom_pickupClaimTile() {
    let cost = Math.floor(kingdom_claimTileCostBase * Math.pow(kingdom_claimTileCostFactor, kingdom_claimedTiles));
    if (game.kingdom.resource[kingdom_resourceEnum.LABOUR] >= cost && game.kingdom.resource[kingdom_resourceEnum.MILITARY] >= cost) {
        if (kingdom_placing == -2) {
            kingdom_placing = 0;
        }
        else {
            kingdom_placing = -2;
        }
        kingdom_updateBuildings();
    }
}

function kingdom_mousedOverBuilding(building) {
    kingdom_updateinfoPanel (kingdom_infoPanelEnum.BUILDING, building);
}

function kingdom_mousedOverUpgrade(upgrade) {
    kingdom_updateinfoPanel (kingdom_infoPanelEnum.UPGRADE, upgrade);
}

// Get the scaled cost of a certain resource, based on number of that building already built
function kingdom_getBuildingResourceCost (building, resource) {
    return Math.floor(kingdom_buildings[building].cost[resource].base * Math.pow(kingdom_buildings[building].cost[resource].factor, game.kingdom.building[building]));
}

// Returns if you can afford to build a building
function kingdom_getBuildingAffordable (building) {
    for (let i = 0; i < kingdom_buildings[building].cost.length; i ++) {
        let playerResource = game.kingdom.resource[kingdom_buildings[building].cost[i].type];
        if (playerResource < kingdom_getBuildingResourceCost(building, i)) {
            return false;
        }
    }
    return true;
}

// Build a building, paying its resource cost.
function kingdom_build(building) {
    if (!kingdom_getBuildingAffordable (building)) {
        return;
    }
    for (let i = 0; i < kingdom_buildings[building].cost.length; i ++) {
        game.kingdom.resource[kingdom_buildings[building].cost[i].type] -= kingdom_getBuildingResourceCost(building, i);
    }
    game.kingdom.building[building] ++;
    kingdom_buildingStock[building] ++;
    kingdom_calculateOutput();
    kingdom_updateResources();
    kingdom_updateBuildings();
    kingdom_updateUpgrades();
    save();
}

function kingdom_pickupBuilding(building) {
    if (kingdom_placing == building) {
        kingdom_placing = 0;
    }
    else {
        kingdom_placing = building;
    }
    kingdom_updateBuildings();
}

function kingdom_place(cell) {
    if (kingdom_placing != 0
    && game.kingdom.constructions[cell] == kingdom_buildingEnum.EMPTY
    && game.kingdom.borders[cell] == kingdom_rangeEnum.INBORDERS) {
        if ((kingdom_buildings[kingdom_placing].aquatic == true && kingdom_terrain[cell] == kingdom_terrainEnum.WATER)
        || (kingdom_buildings[kingdom_placing].aquatic == false && kingdom_terrain[cell] != kingdom_terrainEnum.WATER)) {
            if (kingdom_buildings[kingdom_placing].canPlace(cell)) {
                game.kingdom.constructions[cell] = kingdom_placing;
                kingdom_buildingStock[kingdom_placing] --;
                kingdom_placing = 0;
                kingdom_calculateOutput();
                kingdom_redraw();
                save();
            }
        }
    }
}

// Returns if you can afford to purchase an upgrade
function kingdom_getUpgradeAffordable (upgrade) {
    for (let i = 0; i < kingdom_upgrades[upgrade].cost.length; i ++) {
        let playerResource = game.kingdom.resource[kingdom_upgrades[upgrade].cost[i].type];
        if (playerResource < kingdom_upgrades[upgrade].cost[i].value) {
            return false;
        }
    }
    return true;
}

// Purchase an upgrade, paying its resource cost
function kingdom_purchaseUpgrade(upgrade) {
    if (game.kingdom.upgrades[upgrade] == 0) {
        if (!kingdom_getUpgradeAffordable (upgrade)) {
            return;
        }
        for (let i = 0; i < kingdom_upgrades[upgrade].cost.length; i ++) {
            game.kingdom.resource[kingdom_upgrades[upgrade].cost[i].type] -= kingdom_upgrades[upgrade].cost[i].value;
        }
        game.kingdom.upgrades[upgrade] = 1;
        kingdom_unlocks();
        kingdom_calculateOutput();
        kingdom_redraw();
        save();
    }
}
