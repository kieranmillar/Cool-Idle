const kingdom_infoTitle = $("#kingdom_infoTitle");
const kingdom_infoDescription = $("#kingdom_infoDescription");
const kingdom_infoOutput = $("#kingdom_infoOutput");
const kingdom_infoAdjacency = $("#kingdom_infoAdjacency");

function kingdom_redraw () {
	kingdom_updateResources ();
	kingdom_populateTileImages ();
	kingdom_updateinfoPanel(false, kingdom_currentCell);
	kingdom_updateBuildings ();
}

function kingdom_populateTileImages () {
	for (let i = 0; i < kingdom_cells.length; i++)
	{
		let r = kingdom_cellInRange (i);
		if (r == kingdom_rangeEnum.OUTOFRANGE) {
			kingdom_cells[i].style.visibility = "hidden";
		}
		else if (r == kingdom_rangeEnum.OUTSKIRTS) {
			kingdom_cells[i].style.opacity = "0.5";
		}
		else {
			kingdom_cells[i].style.opacity = "1";
			kingdom_cells[i].style.visibility = "visible";
		}
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
		kingdom_resources[kingdom_resourceEnum.RESEARCH].valueLink.html(game.kingdom.resource.research + "(+" + kingdom_outputs.research + ")");
		kingdom_resources[kingdom_resourceEnum.RESEARCH].idLink.show();
	}
	if (game.kingdom.resource.labour > 0) {
		kingdom_resources[kingdom_resourceEnum.LABOUR].valueLink.html(game.kingdom.resource.labour + "(+" + kingdom_outputs.labour + ")");
		kingdom_resources[kingdom_resourceEnum.LABOUR].idLink.show();
	}
	if (game.kingdom.resource.wood > 0) {
		kingdom_resources[kingdom_resourceEnum.WOOD].valueLink.html(game.kingdom.resource.wood + "(+" + kingdom_outputs.wood + ")");
		kingdom_resources[kingdom_resourceEnum.WOOD].idLink.show();
	}
}

function kingdom_updateinfoPanel (isBuilding, value) {
	if (isBuilding) {
		kingdom_updateinfoPanel_building("", value);
	}
	else {
		var terrain = kingdom_landscape[value];
		let titleText = "<img src = './images/kingdom/" + kingdom_terrain[terrain].imageLink + "' alt='" + kingdom_terrain[terrain].name + "'>" + kingdom_terrain[terrain].name;
		if (game.kingdom.constructions[value] == kingdom_buildingEnum.EMPTY) {
			kingdom_infoTitle.html(titleText);
			let description = kingdom_terrain[terrain].description;
			if (kingdom_cellInRange(value) == kingdom_rangeEnum.OUTSKIRTS) {
				description += "<p class='kingdom_infoPanel_red'>This tile is outside of your borders. You cannot place buildings on it, but it counts for adjacency bonuses.</p>";
			}
			kingdom_infoDescription.html(description);
		}
		else {
			kingdom_updateinfoPanel_building(titleText, game.kingdom.constructions[value]);
		}
	}
}

function kingdom_updateinfoPanel_building (initialTitleText, building) {
	kingdom_infoTitle.html(initialTitleText + "<img src = './images/kingdom/" + kingdom_buildings[building].imageLink + "' alt='" + kingdom_buildings[building].name + "'>" + kingdom_buildings[building].name);
	kingdom_infoDescription.html(kingdom_buildings[building].description);
}

function kingdom_updateBuildings () {
	$(".kingdom_building").hide();
	for (i = 0; i < kingdom_buildings.length; i++) {
		if (kingdom_buildings[i].unlocked) {
			kingdom_buildings[i].valueLink.html(kingdom_buildingStock[i]);
			kingdom_buildings[i].costLink.html(kingdom_buildings[i].costDescription());
			kingdom_buildings[i].idLink.show();
			if (kingdom_buildings[i].canAfford()) {
				$(kingdom_buildings[i].buildButtonLink).prop('disabled', false);
				$(kingdom_buildings[i].buildButtonLink).addClass('clickable');
			}
			else {
				$(kingdom_buildings[i].buildButtonLink).prop('disabled', true);
				$(kingdom_buildings[i].buildButtonLink).removeClass('clickable');
			}
			if (kingdom_buildingStock[i] > 0) {
				$(kingdom_buildings[i].placeButtonLink).prop('disabled', false);
				$(kingdom_buildings[i].placeButtonLink).addClass('clickable');
			}
			else {
				$(kingdom_buildings[i].placeButtonLink).prop('disabled', true);
				$(kingdom_buildings[i].placeButtonLink).removeClass('clickable');
			}
			if (kingdom_placing == i) {
				$(kingdom_buildings[i].placeButtonLink).html('Cancel');
			}
			else {
				$(kingdom_buildings[i].placeButtonLink).html('Place');
			}
		}
	}
	
}
