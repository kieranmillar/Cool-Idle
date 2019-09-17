const kingdom_infoTitle = $("#kingdom_infoTitle");
const kingdom_infoDescription = $("#kingdom_infoDescription");
const kingdom_removeBuildingPanelLink = $("#kingdom_removeBuildingPanel");
const kingdom_removeButtonLink = $("#kingdom_removeButton");
const kingdom_claimTilePanelLink = $("#kingdom_claimTilePanel");
const kingdom_claimTileButtonLink = $("#kingdom_claimTileButton");
const kingdom_claimTileLabourCost = $("#kingdom_claimTileLabourCost");
const kingdom_claimTileMilitaryCost = $("#kingdom_claimTileMilitaryCost");
const kingdom_canvas = document.getElementById("kingdom_canvas"); //JQuery objects are not canvases, so have to resort to old-school JS

//Redraws everything, calling every drawing function
function kingdom_redraw () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_updateResources ();
	kingdom_drawCanvas();
	kingdom_updateinfoPanel(false, kingdom_currentCell);
	kingdom_updateBuildings ();
	kingdom_updateUpgrades ();
}

//Redraws the resource panel
function kingdom_updateResources () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_resourceClass.forEach(resource => {
		resource.hide();
	});
	for (let i = 0; i < kingdom_resources.length; i++) {
		if (game.kingdom.resource[i] > 0 || kingdom_outputs.resource[i] != 0) {
			kingdom_resources[i].valueLink.html(kingdom_resourceHtml(game.kingdom.resource[i], kingdom_outputs.resourceDisplay[i]));
			kingdom_resources[i].idLink.show();
		}
	}
}

//Returns the html to be displayed for resource value and income. Takes the value and income as arguments. Called by kingdom_updateResources()
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

//Redraws the canvas (map)
function kingdom_drawCanvas() {
	if (activeTab != "kingdom") {
		return;
	}
	var ctx = kingdom_canvas.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 360, 360);
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			let cell = (i * 9) + j;
			let x = i * 40;
			let y = j * 40;
			let b = game.kingdom.borders[cell];
			if (b == kingdom_rangeEnum.OUTOFBORDERS) {
				continue;
			}
			else if (b == kingdom_rangeEnum.OUTSKIRTS) {
				ctx.globalAlpha = 0.5;
			}
			else {
				ctx.globalAlpha = 1;
			}
			if (game.kingdom.constructions[cell] != kingdom_buildingEnum.EMPTY)
			{
				if (kingdom_failMap[cell] == 1) {
					ctx.drawImage(kingdom_buildingFailImage, x, y);
				}
				else {
					ctx.drawImage(kingdom_buildingImages[game.kingdom.constructions[cell]], x, y);
				}
			}
			else
			{
				ctx.drawImage(kingdom_terrainImages[kingdom_landscape[cell]], x, y);
			}
		}
	}
}

//Redraws the map
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
			if (kingdom_failMap[i] == 1) {
				kingdom_cells.eq(i).html("<img src = './images/kingdom/building_fail.png' alt='Failing Building'>");
			}
			else {
				let y = game.kingdom.constructions[i];
				kingdom_cells.eq(i).html("<img src = './images/kingdom/" + kingdom_buildings[y].imageLink(kingdom_landscape[i]) + "' alt='" + kingdom_buildings[y].name + "'>");
			}
		}
		else
		{
			let y = kingdom_landscape[i];
			kingdom_cells.eq(i).html("<img src = './images/kingdom/" + kingdom_terrain[y].imageLink + "' alt='" + kingdom_terrain[y].name + "'>");
		}
	}
}

//Redraws the infoPanel. Takes two arguments, the infoPanel type, and one optional accompanying value (based on the infoPanel type)
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
		kingdom_updateinfoPanel_building("", value, kingdom_terrainEnum.PLAINS, false);
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
			kingdom_updateinfoPanel_building(titleText, game.kingdom.constructions[value], terrain, kingdom_failMap[value]);
		}
	}
}

//The infoPanel for buildings is more complicated, so this function handles it, setting the dscription html
/*Arguments:
initialTitleText: Will either be an empty string, or contain the image and name of the terrain on the same cell as the building
building: The id of the building
terrain: The id of the terrain, used as some buildings have multiple images based on the terrain the are on
isFailing: Boolean if the building is failing or not, adds an explanation to the top of the description.
*/
function kingdom_updateinfoPanel_building (initialTitleText, building, terrain, isFailing) {
	kingdom_infoTitle.html(initialTitleText + "<img src = './images/kingdom/" + kingdom_buildings[building].imageLink(terrain) + "' alt='" + kingdom_buildings[building].name + "'>" + kingdom_buildings[building].name);
	let text = "";
	if (isFailing) {
		text += "<p class='kingdom_infoPanel_red'>This building is not functioning as a requirement is not being met.</p>";
	}
	kingdom_infoDescription.html(text + kingdom_buildings[building].description());
}

//Redraws the buildings in the building panel
function kingdom_updateBuildings () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_buildingClass.forEach(building => {
		building.hide();
	});
	if (game.shop.kingdom[shop_kingdomEnum.REMOVE]) {
		kingdom_removeBuildingPanelLink.show();
	}
	if (kingdom_placing == -1) {
		kingdom_removeButtonLink.html('Cancel');
	}
	else {
		kingdom_removeButtonLink.html('Remove');
	}
	if (game.shop.kingdom[shop_kingdomEnum.CLAIMTILE]) {
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

//Redraws the upgrades in the building panel
function kingdom_updateUpgrades () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_upgradeClass.forEach(upgrade => {
		upgrade.hide();
	});
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
