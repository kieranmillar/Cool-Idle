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
	cauldron_updateSpells();
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
			cauldron_buildings[i].descriptionLink.html(cauldron_buildings[i].description());
			cauldron_buildings[i].valueLink.html(game.cauldron.building[i]);
			cauldron_buildings[i].cost.link.html("Cost: " + displayNum(cauldron_getBuildingCost(i)) + " ✨Magic");
			if (cauldron_getBuildingAffordable (i)) {
				$(cauldron_buildings[i].buttonLink).prop('disabled', false);
				$(cauldron_buildings[i].buttonLink).addClass('clickable');
			}
			else {
				$(cauldron_buildings[i].buttonLink).prop('disabled', true);
				$(cauldron_buildings[i].buttonLink).removeClass('clickable');
			}
			cauldron_buildings[i].idLink.show();
		}
	}
}

//Redraws the spells in the spell panel
function cauldron_updateSpells () {
	if (activeTab != "cauldron") {
		return;
	}
	cauldron_spellClass.forEach(spell => {
		spell.hide();
	});
	for (let i = 0; i < cauldron_spells.length; i++) {
		if (cauldron_spells[i].unlocked && game.cauldron.spells[i] == 0) {
			cauldron_spells[i].idLink.show();
			if (cauldron_getSpellAffordable (i)) {
				$(cauldron_spells[i].buttonLink).prop('disabled', false);
				$(cauldron_spells[i].buttonLink).addClass('clickable');
			}
			else {
				$(cauldron_spells[i].buttonLink).prop('disabled', true);
				$(cauldron_spells[i].buttonLink).removeClass('clickable');
			}
		}
	}
}

//Cacluates percentage of total output for display in descriptions
function cauldron_calculatePercentage(buldingType) {
	return ((cauldron_buildings[buldingType].output() * game.cauldron.building[buldingType]) / cauldron_magicIncome * 100).toFixed(2);
}