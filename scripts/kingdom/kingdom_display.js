const kingdom_exp_amount = $("#kingdom_exp_amount");
const kingdom_yellowcoin_amount = $("#kingdom_yellowcoin_amount");
const kingdom_infoTitle = $("#kingdom_infoTitle");
const kingdom_infoDescription = $("#kingdom_infoDescription");
const kingdom_removeBuildingPanelLink = $("#kingdom_removeBuildingPanel");
const kingdom_removeButtonLink = $("#kingdom_removeButton");
const kingdom_claimTilePanelLink = $("#kingdom_claimTilePanel");
const kingdom_claimTileButtonLink = $("#kingdom_claimTileButton");
const kingdom_claimTileLabourCost = $("#kingdom_claimTileLabourCost");
const kingdom_claimTileMilitaryCost = $("#kingdom_claimTileMilitaryCost");
const kingdom_canvas = document.getElementById("kingdom_canvas"); //JQuery objects are not canvases, so have to resort to old-school JS

var kingdom_infoPanelPreviousType = kingdom_infoPanelEnum.CELL;
var kingdom_infoPanelPreviousValue = 40;

//Redraws everything
function kingdom_redraw () {
	if (activeTab != "kingdom") {
		return;
	}
	kingdom_updateResources ();
	kingdom_drawCanvas();
	kingdom_updateInfoPanel(kingdom_infoPanelEnum.PREVIOUS);
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
			kingdom_resources[i].valueLink.html(kingdom_resourceHtml(game.kingdom.resource[i], kingdom_resourceIncomeDisplay(kingdom_outputs.resourceDisplay[i])));
			kingdom_resources[i].idLink.show();
		}
	}
	kingdom_exp_amount.html("(+" + displayNum(kingdom_outputs.exp) + ")");
	kingdom_exp_amount.show();
	kingdom_yellowcoin_amount.html("(+" + displayNum(kingdom_outputs.yellowCoins) + ")");
	kingdom_yellowcoin_amount.show();
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

//If the setting to display resorce income multiplied by your level is on, this does that
function kingdom_resourceIncomeDisplay(value) {
	if (game.settings[settingEnum.KINGDOMLEVELMULTIPLYDISPLAY])
	{
		return displayNum(value * game.level);
	}
	else {
		return displayNum(value);
	}
}

//Redraws the canvas (map)
function kingdom_drawCanvas() {
	if (activeTab != "kingdom") {
		return;
	}
	var ctx = kingdom_canvas.getContext("2d");
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 360, 360);
	for (let j = 0; j < 9; j++) {
		for (let i = 0; i < 9; i++) {
			let cell = i  + (j * 9);
			let x = i * 40;
			let y = j * 40;
			let b = game.kingdom.borders[cell];
			if (b == kingdom_rangeEnum.OUTOFBORDERS) {
				continue;
			}
			else if (b == kingdom_rangeEnum.OUTSKIRTS) {
				ctx.globalAlpha = 0.6;
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
					if (kingdom_buildings[game.kingdom.constructions[cell]].singleImage) {
						ctx.drawImage(kingdom_buildings[game.kingdom.constructions[cell]].imageCache, x, y);
					}
					else {
						switch (kingdom_landscape[cell]) {
							case kingdom_terrainEnum.PLAINS:
								ctx.drawImage(kingdom_buildings[game.kingdom.constructions[cell]].imageCachePlains, x, y);
								break;
							case kingdom_terrainEnum.HILLS:
								ctx.drawImage(kingdom_buildings[game.kingdom.constructions[cell]].imageCacheHills, x, y);
								break;
							case kingdom_terrainEnum.FOREST:
								ctx.drawImage(kingdom_buildings[game.kingdom.constructions[cell]].imageCacheForest, x, y);
								break;
						}
					}
				}
			}
			else
			{
				ctx.drawImage(kingdom_terrain[kingdom_landscape[cell]].imageCache, x, y);
			}
		}
	}
}

//Redraws the infoPanel. Takes two arguments, the infoPanel type, and one optional accompanying value (based on the infoPanel type)
function kingdom_updateInfoPanel (infoPanelType, value) {
	if (activeTab != "kingdom") {
		return;
	}
	//Sometimes we just want to refresh the panel with what we had last time
	if (infoPanelType == kingdom_infoPanelEnum.PREVIOUS) {
		infoPanelType = kingdom_infoPanelPreviousType;
		value = kingdom_infoPanelPreviousValue;
	}
	else {
		kingdom_infoPanelPreviousType = infoPanelType;
		kingdom_infoPanelPreviousValue = value;
	}
	if (infoPanelType == kingdom_infoPanelEnum.REMOVE) {
		kingdom_infoTitle.html("<img src = './images/kingdom/bulldozer.png' alt='Remove Building'/>Remove Building");
		kingdom_infoDescription.html("<p>Remove a building, returning it to your stock. (You can then place it again later without paying for it again.)</p><p>You cannot remove the Castle.</p>");
	}
	else if (infoPanelType == kingdom_infoPanelEnum.CLAIMTILE) {
		kingdom_infoTitle.html("<img src = './images/kingdom/swords.png' alt='Claim Tile'/>Claim Tile");
		kingdom_infoDescription.html("<p>Fight for more territory! Claim a tile just outside your borders as your own!</p><p>Claiming new territory also earns Blue Coins!</p><p>(Next claim: " + (kingdom_claimedTiles + 1) * 10 + " Blue Coins)</p>");
	}
	else if (infoPanelType == kingdom_infoPanelEnum.UPGRADE) {
		kingdom_infoTitle.html(kingdom_upgrades[value].name);
		kingdom_infoDescription.html(kingdom_upgrades[value].description);
	}
	else if (infoPanelType == kingdom_infoPanelEnum.BUILDING) {
		kingdom_updateInfoPanel_building("", value, kingdom_terrainEnum.PLAINS, false);
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
			kingdom_updateInfoPanel_building(titleText, game.kingdom.constructions[value], terrain, kingdom_failMap[value]);
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
function kingdom_updateInfoPanel_building (initialTitleText, building, terrain, isFailing) {
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

//Redraws the upgrade costs, only needed when toggling a display setting
function kingdom_refreshUpgradeCosts () {
	for (let i = 0; i < kingdom_upgrades.length; i++) {
		kingdom_upgrades[i].cost.forEach(costResource => {
			$("#" + kingdom_upgrades[i].id + kingdom_resources[costResource.type].name + "Cost").html(displayNum(costResource.value));
		});
	}
}
