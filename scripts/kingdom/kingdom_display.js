const kingdom_infoTitle = $("#kingdom_infoTitle");
const kingdom_infoDescription = $("#kingdom_infoDescription");
const kingdom_removeBuildingPanelLink = $("#kingdom_removeBuildingPanel");
const kingdom_removeButtonLink = $("#kingdom_removeButton");
const kingdom_claimTilePanelLink = $("#kingdom_claimTilePanel");
const kingdom_claimTileButtonLink = $("#kingdom_claimTileButton");
const kingdom_claimTileLabourCost = $("#kingdom_claimTileLabourCost");
const kingdom_claimTileMilitaryCost = $("#kingdom_claimTileMilitaryCost");

function kingdom_redraw () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_updateResources ();
	kingdom_populateTileImages ();
	kingdom_updateinfoPanel(false, kingdom_currentCell);
	kingdom_updateBuildings ();
	kingdom_updateUpgrades ();
}

function kingdom_populateTileImages () {
	if (activeTab != "kingdom") {
		return;
	}
	for (let i = 0; i < kingdom_cells.length; i++)
	{
		let r = game.kingdom.borders[i];
		if (r == kingdom_rangeEnum.OUTOFBORDERS) {
			kingdom_cells[i].style.visibility = "hidden";
		}
		else if (r == kingdom_rangeEnum.OUTSKIRTS) {
			kingdom_cells[i].style.opacity = "0.5";
			kingdom_cells[i].style.visibility = "visible";
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
	if (activeTab != "kingdom") {
		return;
	}
	$(".kingdom_resource").hide();
	for (let i = 0; i < kingdom_resources.length; i++) {
		if (game.kingdom.resource[i] > 0 || kingdom_outputs.resource[i] != 0) {
			kingdom_resources[i].valueLink.html(kingdom_resourceHtml(game.kingdom.resource[i], kingdom_outputs.resourceDisplay[i]));
			kingdom_resources[i].idLink.show();
		}
	}
}

function kingdom_resourceHtml (total, income) {
	if (activeTab != "kingdom") {
		return;
	}
	let text = displayNum(total);
	if (income != 0)
	{
		text += " (";
		if (income > 0) {
			text += "+";
		}
		text += displayNum(income) + ")";
	}
	return text;
}

function kingdom_updateinfoPanel (infoPanelType, value) {
	if (activeTab != "kingdom") {
		return;
	}
	if (infoPanelType == kingdom_infoPanelEnum.REMOVE) {
		kingdom_infoTitle.html("<img src = './images/kingdom/bulldozer.png' alt='Remove Building'/>Remove Building");
		kingdom_infoDescription.html("<p>Remove a building, returning it to your stock. (You can then place it again later without paying for it again.)</p><p>You cannot remove the Castle.</p>");
	}
	else if (infoPanelType == kingdom_infoPanelEnum.CLAIMTILE) {
		kingdom_infoTitle.html("<img src = './images/kingdom/swords.png' alt='Claim Tile'/>Claim Tile");
		kingdom_infoDescription.html("<p>Fight for more territory! Claim a tile just outside your borders as your own!</p>");
	}
	else if (infoPanelType == kingdom_infoPanelEnum.UPGRADE) {
		kingdom_infoTitle.html(kingdom_upgrades[value].name);
		kingdom_infoDescription.html(kingdom_upgrades[value].description);
	}
	else if (infoPanelType == kingdom_infoPanelEnum.BUILDING) {
		kingdom_updateinfoPanel_building("", value);
	}
	else {
		var terrain = kingdom_landscape[value];
		let titleText = "<img src = './images/kingdom/" + kingdom_terrain[terrain].imageLink + "' alt='" + kingdom_terrain[terrain].name + "'/>" + kingdom_terrain[terrain].name;
		if (game.kingdom.constructions[value] == kingdom_buildingEnum.EMPTY) {
			kingdom_infoTitle.html(titleText);
			let description = kingdom_terrain[terrain].description;
			if (game.kingdom.borders[value] == kingdom_rangeEnum.OUTSKIRTS) {
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
	kingdom_infoDescription.html(kingdom_buildings[building].description());
}

function kingdom_updateBuildings () {
	if (activeTab != "kingdom") {
		return;
	}
	$(".kingdom_building").hide();
	if (game.shop[shop_itemEnum.KINGDOMREMOVE]) {
		kingdom_removeBuildingPanelLink.show();
	}
	if (kingdom_placing == -1) {
		kingdom_removeButtonLink.html('Cancel');
	}
	else {
		kingdom_removeButtonLink.html('Remove');
	}
	if (game.shop[shop_itemEnum.KINGDOMCLAIMTILE]) {
		kingdom_claimTilePanelLink.show();
		let cost = Math.floor(kingdom_claimTileCostBase * Math.pow(kingdom_claimTileCostFactor, kingdom_claimedTiles));
		if (game.kingdom.resource[kingdom_resourceEnum.LABOUR] >= cost && game.kingdom.resource[kingdom_resourceEnum.MILITARY] >= cost) {
			$(kingdom_claimTileButtonLink).prop('disabled', false);
			$(kingdom_claimTileButtonLink).addClass('clickable');
		}
		else {
			$(kingdom_claimTileButtonLink).prop('disabled', true);
			$(kingdom_claimTileButtonLink).removeClass('clickable');
		}
		kingdom_claimTileLabourCost.html(displayNum(cost));
		kingdom_claimTileMilitaryCost.html(displayNum(cost));
	}
	if (kingdom_placing == -2) {
		kingdom_claimTileButtonLink.html('Cancel');
	}
	else {
		kingdom_claimTileButtonLink.html('Claim TIle');
	}
	for (let i = 2; i < kingdom_buildings.length; i++) {
		if (kingdom_buildings[i].unlocked) {
			kingdom_buildings[i].valueLink.html(kingdom_buildingStock[i]);
			for (let j = 0; j < kingdom_buildings[i].cost.length; j ++) {
				kingdom_buildings[i].cost[j].link.html(displayNum(kingdom_getBuildingResourceCost(i, j)));
			}
			if (kingdom_getBuildingAffordable (i)) {
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
			kingdom_buildings[i].idLink.show();
		}
	}
}

function kingdom_updateUpgrades () {
	if (activeTab != "kingdom") {
		return;
	}
	$(".kingdom_upgrade").hide();
	for (let i = 0; i < kingdom_upgrades.length; i++) {
		if (kingdom_upgrades[i].unlocked && game.kingdom.upgrades[i] == 0) {
			kingdom_upgrades[i].idLink.show();
			if (kingdom_getUpgradeAffordable (i)) {
				$(kingdom_upgrades[i].buttonLink).prop('disabled', false);
				$(kingdom_upgrades[i].buttonLink).addClass('clickable');
			}
			else {
				$(kingdom_upgrades[i].buttonLink).prop('disabled', true);
				$(kingdom_upgrades[i].buttonLink).removeClass('clickable');
			}
		}
	}
}
