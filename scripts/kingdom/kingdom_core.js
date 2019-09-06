var kingdom_cells;
var kingdom_currentCell = 0;

function kingdom_init() {
    //Dynamically create resource list
    kingdom_resources.forEach(resource => {
        var newElement = $('<div></div>');
        newElement.attr('id', resource.id);
		newElement.addClass("kingdom_resource");
		newElement.html("<img src = './images/kingdom/" + resource.imageLink + "' alt='" + resource.name + "'></img><span id='" + resource.value + "'></span>");
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
            cell.click(function () {kingdom_clickedCell()});
            cell
            .mouseenter({ value: count }, function (event) {kingdom_mousedOverCell(event.data.value)});
            row.append(cell);
            count ++;
        }
        $("#kingdom_mainGrid").append(row);
    }
    kingdom_cells = $(".kingdom_tileCell");

    //Dynamically create building list

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
    for (property in kingdom_outputs) {
        property = 0;
    }
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
    if (southTile < 81) {
        return kingdom_landscape[southTile];
    }
    else {
        return 0;
    }
}

function kingdom_getConstructionSouth(currentTile) {
    let southTile = currentTile + 9;
    if (southTile < 81) {
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

function kingdom_mousedOverCell(x) {
	kingdom_currentCell = x;
}

function kingdom_clickedCell() {
	if (game.kingdom.constructions[kingdom_currentCell] != kingdom_buildingEnum.EMPTY) {
		//there is a construction on the cell
	}
	else {
		//the cell is unbuilt terrain
	}
}
