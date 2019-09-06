const kingdom_infoTitle = $("#kingdom_infoTitle");
const kingdom_infoDescription = $("#kingdom_infoDescription");
const kingdom_infoOutput = $("#kingdom_infoOutput");
const kingdom_infoAdjacency = $("#kingdom_infoAdjacency");

function kingdom_redraw () {
	kingdom_updateResources ();
	kingdom_populateTileImages ();
	kingdom_updateinfoPanel ();
	kingdom_updateBuildings ();
}

function kingdom_populateTileImages () {
	for (let i = 0; i < kingdom_cells.length; i++)
	{
		kingdom_cells[i].style.opacity = "1";
		kingdom_cells[i].style.visibility = "visible";
		//let kingdom_range = cellInRange (i);
		// if (kingdom_range == 0)
		// {
		// 	kingdom_cells[i].style.visibility = "hidden";
		// }
		// else if (kingdom_range == 1)
		// {
		// 	kingdom_cells[i].style.opacity = "0.5";
		// }
		if (game.kingdom.constructions[i] != kingdom_buildingEnum.EMPTY)
		{
			let y = game.kingdom.constructions[i];
			kingdom_cells.eq(i).html("<img src = './images/kingdom/" + kingdom_buildings[y].imageLink + "' alt='" + kingdom_buildings[y].name + "'>");
		}
		else
		{
			let y = kingdom_landscape[i];
			kingdom_cells.eq(i).html("<img src = './images/kingdom/" + kingdom_terrain[y].imageLink + "' alt='" + kingdom_terrain[y].name + "'>");
		}
	}
}

function kingdom_updateResources () {
	$(".kingdom_resource").hide();
	if (game.kingdom.resource.research > 0) {
		kingdom_resources[kingdom_resourceEnum.RESEARCH].valueLink.html(game.kingdom.resource.research);
		kingdom_resources[kingdom_resourceEnum.RESEARCH].idLink.show();
	}
	if (game.kingdom.resource.labour > 0) {
		kingdom_resources[kingdom_resourceEnum.LABOUR].valueLink.html(game.kingdom.resource.labour);
		kingdom_resources[kingdom_resourceEnum.LABOUR].idLink.show();
	}
	if (game.kingdom.resource.wood > 0) {
		kingdom_resources[kingdom_resourceEnum.WOOD].valueLink.html(game.kingdom.resource.wood);
		kingdom_resources[kingdom_resourceEnum.WOOD].idLink.show();
	}
}

function kingdom_updateinfoPanel () {
	if (game.kingdom.constructions[kingdom_currentCell] == kingdom_buildingEnum.EMPTY) {
		// Show Terrain
		var terrain = kingdom_landscape[kingdom_currentCell];
		kingdom_infoTitle.html("<img src = './images/kingdom/" + kingdom_terrain[terrain].imageLink + "' alt='" + kingdom_terrain[terrain].name + "'>" + kingdom_terrain[terrain].name);
		kingdom_infoDescription.html(kingdom_terrain[terrain].description);
		kingdom_infoOutput.hide();
		kingdom_infoAdjacency.hide();
	}
	else {
		//Show Building
		var building = game.kingdom.constructions[kingdom_currentCell];
		kingdom_infoTitle.html("<img src = './images/kingdom/" + kingdom_buildings[building].imageLink + "' alt='" + kingdom_buildings[building].name + "'>" + kingdom_buildings[building].name);
		kingdom_infoDescription.html(kingdom_buildings[building].description);
		if (kingdom_buildings[building].hasOwnProperty("outputInfo")) {
			kingdom_infoOutput.html(kingdom_buildings[building].outputInfo());
			kingdom_infoOutput.show();
		}
		else {
			kingdom_infoOutput.hide();
		}
		if (kingdom_buildings[building].hasOwnProperty("adjacencyInfo")) {
			kingdom_infoAdjacency.html(kingdom_buildings[building].adjacencyInfo());
			kingdom_infoAdjacency.show();
		}
		else {
			kingdom_infoAdjacency.hide();
		}
	}
}

function kingdom_updateBuildings () {
	$(".kingdom_building").hide();
	if (kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].unlocked) {
		kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].valueLink.html(game.kingdom.building.woodcutter);
		kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].idLink.show();
	}
}