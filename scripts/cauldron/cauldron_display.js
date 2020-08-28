const cauldron_magic = $("#cauldron_magic");
const cauldron_magicIncomeId = $("#cauldron_magicIncome");

//Redraws everything
function cauldron_redraw () {
	if (activeTab != "cauldron") {
		return;
    }
    cauldron_magic.html(displayNum(game.cauldron.magic));
    cauldron_magicIncomeId.html(displayNum(cauldron_magicIncome));
    cauldron_updateBuildings();
}

//Redraws the buildings in the building panel
function cauldron_updateBuildings () {
	if (activeTab != "cauldron") {
		return;
	}
	cauldron_buildingClass.forEach(building => {
		building.hide();
	});
	for (let i = 0; i < cauldron_buildings.length; i++) {
		if (cauldron_buildings[i].unlocked) {
			cauldron_buildings[i].valueLink.html(game.cauldron.building[i]);
			cauldron_buildings[i].cost.link.html("Cost: " + displayNum(cauldron_getBuildingCost(i)) + " ✨Magic");
			if (cauldron_getBuildingAffordable (i)) {
				$(cauldron_buildings[i].buildButtonLink).prop('disabled', false);
				$(cauldron_buildings[i].buildButtonLink).addClass('clickable');
			}
			else {
				$(cauldron_buildings[i].buildButtonLink).prop('disabled', true);
				$(cauldron_buildings[i].buildButtonLink).removeClass('clickable');
			}
			cauldron_buildings[i].idLink.show();
		}
	}
}