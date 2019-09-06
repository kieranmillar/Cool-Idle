function kingdom_redraw () {
	kingdom_updateResources ();
	kingdom_populateTileImages ();
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

function kingdom_updateBuildings () {
	$(".kingdom_building").hide();
	if (kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].unlocked) {
		kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].valueLink.html(game.kingdom.building.woodcutter);
		kingdom_buildings[kingdom_buildingEnum.WOODCUTTER].idLink.show();
	}
}