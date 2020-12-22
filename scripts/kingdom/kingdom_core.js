const kingdom_GRIDSIZE = 81;

var kingdom_resourceClass = [];
var kingdom_buildingClass = [];
var kingdom_upgradeClass = [];

var kingdom_buildingStock = [];
var kingdom_currentCell = 40;
var kingdom_placing = 0;
var kingdom_claimedTiles = 0;

//This is run once when the game is loaded
//It creates HTML elements for all of the resources/buildings etc. and also calculates things that aren't stored in the game object
function kingdom_init() {
    //Handle the mouse interacting with the canvas
    kingdom_canvas.addEventListener('mousemove', function(evt) {
        var rect = kingdom_canvas.getBoundingClientRect();
        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;
        cell = Math.floor(x / 40) + (Math.floor(y / 40) * 9);
        kingdom_mousedOverCell(cell);
    }, false);

    kingdom_canvas.addEventListener('click', function(evt) {
        var rect = kingdom_canvas.getBoundingClientRect();
        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;
        cell = Math.floor(x / 40) + (Math.floor(y / 40) * 9);
        kingdom_clickedonCell(cell);
    }, false);

    //Dynamically create resource list
    kingdom_resources.forEach(resource => {
        var newElement = $('<div></div>');
        newElement.attr('id', resource.id);
		newElement.addClass("kingdom_resource");
		newElement.html("<img src = './images/kingdom/" + resource.imageLink + "' alt='" + resource.name + "'/><span id='" + resource.value + "'/></span>");
        $("#kingdom_resourcePanel").append(newElement);
        kingdom_resourceClass.push(newElement);
        resource.idLink = $("#" + resource.id);
        resource.valueLink = $("#" + resource.value);
    });

    $("#kingdom_removeBuildingPanel").mouseenter(function () {kingdom_updateInfoPanel(kingdom_infoPanelEnum.REMOVE, 0)});
    $("#kingdom_claimTilePanel").mouseenter(function () {kingdom_updateInfoPanel(kingdom_infoPanelEnum.CLAIMTILE, 0)});

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
        kingdom_buildingClass.push(newElement);

        building.idLink = $("#" + building.id);
        building.valueLink = $("#" + building.id + "Stock");
        building.buildButtonLink = $("#" + building.id + "BuildButton");
        building.placeButtonLink = $("#" + building.id + "PlaceButton");
        for (let i = 0; i < building.cost.length; i ++) {
            building.cost[i].link = $("#" + building.id + kingdom_resources[building.cost[i].type].name + "Cost");
        }
    });
    kingdom_buildingClass.push($("#kingdom_removeBuildingPanel"));
    kingdom_buildingClass.push($("#kingdom_claimTilePanel"));

    //Calculate building stock
    kingdom_buildingStock = [ ...game.kingdom.building ];
    for (let i = 0; i < kingdom_GRIDSIZE; i++) {
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
            htmlText += "<img src = './images/kingdom/" + kingdom_resources[upgrade.cost[i].type].imageLink + "' alt='" + kingdom_resources[upgrade.cost[i].type].name + "'/><span id='" + upgrade.id + kingdom_resources[upgrade.cost[i].type].name + "Cost'>"+ displayNum(upgrade.cost[i].value) + "</span>";
        }
        htmlText += "</span></div>";
		newElement.html(htmlText);
        
        $("#kingdom_upgradeList").append(newElement);
        kingdom_upgradeClass.push(newElement);

        upgrade.idLink = $("#" + upgrade.id);
        upgrade.buttonLink = $("#" + upgrade.id + "UpgradeButton");
    });

    kingdom_unlocks();
    kingdom_calculateOutput();
}

//This is called by the game loop to trigger all of the once per second updates this feature requires
//We try to calculate as much of this as we can outside of the tick loop using kingdom_calculateOutput()
//However buildings that consume/convert other resources can change each tick if they run out of resources
//So we have to handle them here.
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

//Work out what should be unlocked
function kingdom_unlocks() {
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
        kingdom_upgrades[kingdom_upgradeEnum.ROAD].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.ROAD]) {
        kingdom_buildings[kingdom_buildingEnum.ROAD].unlocked = true;
        kingdom_upgrades[kingdom_upgradeEnum.GOLDMINE].unlocked = true;
        kingdom_upgrades[kingdom_upgradeEnum.PUB].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.GOLDMINE]) {
        kingdom_buildings[kingdom_buildingEnum.GOLDMINE].unlocked = true;
    }
    if (game.kingdom.upgrades[kingdom_upgradeEnum.PUB]) {
        kingdom_buildings[kingdom_buildingEnum.PUB].unlocked = true;
        kingdom_upgrades[kingdom_upgradeEnum.HAPPYCITIZENS].unlocked = true;
    }
}

//Running through the entire map to work out what is being generated every tick would be slow.
//Therefore we try and work out all of the resource incomes any time something changes and store it, so only the end result is read each tick
function kingdom_calculateOutput () {
    kingdom_claimedTiles = -9;
    for (let i = 0; i < game.kingdom.borders.length; i++) {
        //Loop through a number of maps that store important info about the kingdom state
        kingdom_failMap[i] = 0;
        kingdom_roadMap[i] = 0;
        if (game.kingdom.borders[i] == 2) {
            kingdom_claimedTiles ++;
        }
    }
    kingdom_calculateRoadMap ();
    kingdom_calculateFailMap ();
    for (let i = 0; i < kingdom_outputs.resource.length; i++) {
        kingdom_outputs.resource[i] = 0;
    }
    kingdom_outputs.exp = 0;
    kingdom_outputs.yellowCoins = 0;
    Object.keys(kingdom_outputs.conversion).forEach(v => kingdom_outputs.conversion[v] = 0);
    for (let i = 0; i < kingdom_GRIDSIZE; i++) {
        if (kingdom_failMap[i] == 0) {
            const currentConstruction = game.kingdom.constructions[i];
            if (currentConstruction != kingdom_buildingEnum.EMPTY) {
                if (kingdom_buildings[currentConstruction].hasOwnProperty('output')) {
                    kingdom_buildings[currentConstruction].output(i);
                }
            }
        }
    }
}

//Sometimes buildings can fail. e.g. if you place a chain of roads then remove one in the middle.
//This map is read to see which buildings on the map should have their image replaced with the big red X of failure.
var kingdom_failMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
];

//This map stores what tiles count as "adjacent to the Castle", which is extended via roads
var kingdom_roadMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
];

//Calculate the road map
//We use a floodfill from the Castle, pushing any connected roads to a list once and popping them off again until the list is empty.
function kingdom_calculateRoadMap() {
    let roadList = [];
    kingdom_roadMap[40] = 1;
    roadList.push(40);
    while (roadList.length > 0) {
        let currentCell = roadList.pop();
        let northCell = currentCell - 9;
        if (northCell > 0) {
            if (kingdom_roadMap[northCell] == 0) {
                kingdom_roadMap[northCell] = 1;
                if (kingdom_getConstructionNorth(currentCell) == kingdom_buildingEnum.ROAD) {
                    roadList.push(northCell);
                }
            }
        }
        let eastCell = currentCell + 1;
        if (currentCell % 9 < 8) {
            if (kingdom_roadMap[eastCell] == 0) {
                kingdom_roadMap[eastCell] = 1;
                if (kingdom_getConstructionEast(currentCell) == kingdom_buildingEnum.ROAD) {
                    roadList.push(eastCell);
                }
            }
        }
        let southCell = currentCell + 9;
        if (southCell < 81) {
            if (kingdom_roadMap[southCell] == 0) {
                kingdom_roadMap[southCell] = 1;
                if (kingdom_getConstructionSouth(currentCell) == kingdom_buildingEnum.ROAD) {
                    roadList.push(southCell);
                }
            }
        }
        let westCell = currentCell - 1;
        if (currentCell % 9 > 0) {
            if (kingdom_roadMap[westCell] == 0) {
                kingdom_roadMap[westCell] = 1;
                if (kingdom_getConstructionWest(currentCell) == kingdom_buildingEnum.ROAD) {
                    roadList.push(westCell);
                }
            }
        }
    }
}

//Calculate which buildings are non-functional
//Needs to be done before any buildings calculate their output
function kingdom_calculateFailMap() {
    for (let i = 0; i < kingdom_GRIDSIZE; i++) {
        const currentConstruction = game.kingdom.constructions[i];
        if (currentConstruction != kingdom_buildingEnum.EMPTY) {
            if (kingdom_buildings[currentConstruction].hasOwnProperty('failure')) {
                kingdom_buildings[currentConstruction].failure(i);
            }
        }
    }
}

//Returns what terrain is to the North. Returns 0 if at the Northern edge of the map
function kingdom_getTerrainNorth(currentTile) {
    let northTile = currentTile - 9;
    if (northTile > 0) {
        return kingdom_landscape[northTile];
    }
    else {
        return 0;
    }
}

//Returns what building is to the North. Returns 0 if at the Northern edge of the map
function kingdom_getConstructionNorth(currentTile) {
    let northTile = currentTile - 9;
    if (northTile > 0 && kingdom_failMap[northTile] == 0) {
        return game.kingdom.constructions[northTile];
    }
    else {
        return 0;
    }
}

//Returns what terrain is to the East. Returns 0 if at the Eastern edge of the map
function kingdom_getTerrainEast(currentTile) {
    if (currentTile % 9 < 8) {
        return kingdom_landscape[currentTile + 1];
    }
    else {
        return 0;
    }
}

//Returns what building is to the East. Returns 0 if at the Eastern edge of the map
function kingdom_getConstructionEast(currentTile) {
    let eastTile = currentTile + 1;
    if (currentTile % 9 < 8) {
        if (kingdom_failMap[eastTile] == 0) {
            return game.kingdom.constructions[eastTile];
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}

//Returns what terrain is to the South. Returns 0 if at the Southern edge of the map
function kingdom_getTerrainSouth(currentTile) {
    let southTile = currentTile + 9;
    if (southTile < kingdom_GRIDSIZE) {
        return kingdom_landscape[southTile];
    }
    else {
        return 0;
    }
}

//Returns what building is to the South. Returns 0 if at the Southern edge of the map
function kingdom_getConstructionSouth(currentTile) {
    let southTile = currentTile + 9;
    if (southTile < kingdom_GRIDSIZE  && kingdom_failMap[southTile] == 0) {
        return game.kingdom.constructions[southTile];
    }
    else {
        return 0;
    }
}

//Returns what terrain is to the West. Returns 0 if at the Western edge of the map
function kingdom_getTerrainWest(currentTile) {
    if (currentTile % 9 > 0) {
        return kingdom_landscape[currentTile - 1];
    }
    else {
        return 0;
    }
}

//Returns what building is to the West. Returns 0 if at the Western edge of the map
function kingdom_getConstructionWest(currentTile) {
    let westTile = currentTile - 1;
    if (currentTile % 9 > 0) {
        if (kingdom_failMap[westTile] == 0) {
            return game.kingdom.constructions[westTile];
        }
        else {
            return 0;
        }
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
    PREVIOUS: 0,
    CELL: 1,
    BUILDING: 2,
    UPGRADE: 3,
    REMOVE: 4,
    CLAIMTILE: 5
}

//This is called every time you mouse over a map tile. Takes the cell number as an argument
function kingdom_mousedOverCell(cell) {
    if (game.kingdom.borders[cell] != kingdom_rangeEnum.OUTOFBORDERS) {
        kingdom_currentCell = cell;
        kingdom_updateInfoPanel (kingdom_infoPanelEnum.CELL, cell);
    }
}

//This is called when you click on a map tile. Takes the cell number as an argument.
//We store what we're trying to do with that click in the increasingly inaccurately named global variable kingdom_placing.
function kingdom_clickedonCell(cell) {
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

//This is called by kingdom_clickedCell if you were trying to claim that tile to add it to our borders
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
    gainBlueCoins(kingdom_claimedTiles * 10);
    kingdom_redraw();
    save();
}

//This is called by kingdom_clickedCell if you were trying to remove the building on that cell
//It should never be called on cells that don't have buildings on them
function kingdom_removeBuilding(cell) {
    let building = game.kingdom.constructions[cell];
    if (building == kingdom_buildingEnum.CASTLE || building == kingdom_buildingEnum.EMPTY) {
        return;
    }
    game.kingdom.constructions[cell] = kingdom_buildingEnum.EMPTY;
    kingdom_buildingStock[building] ++;
    kingdom_placing = 0;
    kingdom_calculateOutput();
    kingdom_redraw();
    save();
}

//Removes all buildings (except the Castle, of course)
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
    kingdom_redraw();
    save();
}

//This is called if you click on the Remove building button
//It signifies that we want to try and remove a building if we click on a map tile
function kingdom_pickupRemoveBuilding() {
    if (kingdom_placing == -1) {
        kingdom_placing = 0;
    }
    else {
        kingdom_placing = -1;
    }
    kingdom_updateBuildings();
}

//This is called if you click on the Claim Tile button
//It signifies that we want to try and claim a tile if we click on a map tile
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

//This is called if you click on the Place button for a building. It takes the building type as an argument
//It signifies that we want to try and place a building if we click on a map tile
//The type of building is stored in kingdom_placing
function kingdom_pickupBuilding(building) {
    if (kingdom_placing == building) {
        kingdom_placing = 0;
    }
    else {
        kingdom_placing = building;
    }
    kingdom_updateBuildings();
}

//This is called if we mouse over a building on the buildings panel (not a placed building on the map!)
function kingdom_mousedOverBuilding(building) {
    kingdom_updateInfoPanel (kingdom_infoPanelEnum.BUILDING, building);
}

//This is called is we mouse over an upgrade on the buildings panel
function kingdom_mousedOverUpgrade(upgrade) {
    kingdom_updateInfoPanel (kingdom_infoPanelEnum.UPGRADE, upgrade);
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
    kingdom_redraw();
    save();
}

//Try to place a building on a map tile
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
