var kingdom_cells;
var kingdom_currentCell = 40;
var kingdom_range = 1;
var kingdom_buildingStock = [];
var kingdom_placing = 0;

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

    //Dynamically create building list
    kingdom_buildings.forEach(building => {
        if (building.name == "Castle" || building.name == "") {
            return;
        }
        var newElement = $('<div></div>');
        newElement.attr('id', building.id);
        newElement.addClass("kingdom_building");
        newElement.mouseenter({ value: building.idNumber }, function (event) {kingdom_mousedOverBuilding(event.data.value)});
        let htmlText = "<div class='kingdom_building_row'><span id='" + building.id + "Stock' class='kingdom_buildingStock'></span><img src = './images/kingdom/" + building.imageLink + "' alt='" + building.name + "' class='kingdom_buildingImage'/><span class='kingdom_buildingName'>" + building.name + "</span><button type='button' id='" + building.id + "PlaceButton' class='kingdom_placeButton button' onclick='kingdom_pickupBuilding(" + building.idNumber + ")' disabled>Place</button></div>";
        htmlText += "<div class='kingdom_building_row'><span id='" + building.id + "Cost' class='kingdom_buildingCost'>" + building.costDescription() + "</span><button type='button' id='" + building.id + "BuildButton' class='kingdom_buildButton button' onclick='kingdom_build(" + building.idNumber + ")' disabled>Build</button></div>";
		newElement.html(htmlText);
        
        $("#kingdom_purchasePanel").append(newElement);
        building.idLink = $("#" + building.id);
        building.valueLink = $("#" + building.id + "Stock");
        building.costLink = $("#" + building.id + "Cost");
        building.buildButtonLink = $("#" + building.id + "BuildButton");
        building.placeButtonLink = $("#" + building.id + "PlaceButton");
    });

    //Calculate building stock
    kingdom_buildingStock = [ ...game.kingdom.building ];
    for (let i = 0; i < kingdom_cells.length; i++) {
        if (game.kingdom.constructions[i] != kingdom_buildingEnum.EMPTY && game.kingdom.constructions[i] != kingdom_buildingEnum.CASTLE) {
            kingdom_buildingStock [game.kingdom.constructions[i]] --;
        }
    }

    kingdom_calculateOutput();
}

function kingdom_tick () {
    game.kingdom.resource.research += kingdom_outputs.research * game.level;
    game.kingdom.resource.labour += kingdom_outputs.labour * game.level;
    game.kingdom.resource.wood += kingdom_outputs.wood * game.level;
    gainYellowCoins(kingdom_outputs.yellowCoins * game.level);
    gainExp(kingdom_outputs.exp * game.level);
}

function kingdom_calculateOutput () {
    Object.keys(kingdom_outputs).forEach(v => kingdom_outputs[v] = 0);
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
    OUTOFRANGE: 0,
    OUTSKIRTS: 1,
    INRANGE: 2
}

function kingdom_cellInRange (x)
{
	let row = Math.floor(x/9);
	let column = x % 9;
	if (Math.abs(row - 4) > kingdom_range + 1 || Math.abs(column - 4) > kingdom_range + 1)
	{
		return kingdom_rangeEnum.OUTOFRANGE;
	}
	else if (Math.abs(row - 4) == kingdom_range + 1 || Math.abs(column - 4) == kingdom_range + 1)
	{
		return kingdom_rangeEnum.OUTSKIRTS;
	}
	else
	{
		return kingdom_rangeEnum.INRANGE;
	}
}

function kingdom_mousedOverCell(cell) {
    if (kingdom_cellInRange(cell) != kingdom_rangeEnum.OUTOFRANGE) {
        kingdom_currentCell = cell;
        kingdom_updateinfoPanel (false, cell);
    }
}

function kingdom_clickedCell(cell) {
	if (game.kingdom.constructions[cell] != kingdom_buildingEnum.EMPTY) {
        //there is a construction on the cell
	}
	else {
        //the cell is unbuilt terrain
        if (kingdom_placing != 0) {
            kingdom_place (cell);
        }
	}
}

function kingdom_mousedOverBuilding(building) {
    kingdom_updateinfoPanel (true, building);
}

function kingdom_build(building) {
    kingdom_buildings[building].purchase();
    save();
    kingdom_updateResources ();
    kingdom_updateBuildings();
}

function kingdom_addBuilding(building) {
    game.kingdom.building[building] ++;
	kingdom_buildingStock[building] ++;
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
    && kingdom_cellInRange(cell) == kingdom_rangeEnum.INRANGE) {
        if (kingdom_buildings[kingdom_placing].canPlace(cell)) {
            game.kingdom.constructions[cell] = kingdom_placing;
            kingdom_buildingStock[kingdom_placing] --;
            kingdom_placing = 0;
            kingdom_calculateOutput();
            kingdom_updateResources();
            kingdom_populateTileImages();
            kingdom_updateBuildings();
            save();
        }
    }
}
