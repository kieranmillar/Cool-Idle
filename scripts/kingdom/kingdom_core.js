var kingdom_cells = $(".kingdom_tileCell");
var kingdom_currentCell = 0;

for (let i = 0; i < kingdom_cells.length; i++) {
	kingdom_cells[i].addEventListener('click', function () {kingdom_clickedCell()});
	kingdom_cells[i].addEventListener('mouseover', function () {kingdom_mousedOverCell(i)});
}

function kingdom_tick () {
    game.kingdom.research += kingdom_outputs.research * game.level;
    game.kingdom.labour += kingdom_outputs.labour * game.level;
    game.kingdom.wood += kingdom_outputs.wood * game.level;
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
                kingdom_buildings[currentConstruction].output();
            }
        }
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