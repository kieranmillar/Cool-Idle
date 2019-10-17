//Sets checkbox states in the settings
function displaySettings () {
    if (game.settings[settingEnum.SCINOTATION]) {
		$("#setting_sciNotationBox").prop("checked", true);
	}
	else {
		$("#setting_sciNotationBox").prop("checked", false);
    }
    
    if (game.shop.features[shop_featureEnum.KINGDOM]) {
        $("#setting_kingdomLevelMultiplyDisplay").show();
	}
	else {
		$("#setting_kingdomLevelMultiplyDisplay").hide();
	}
    if (game.settings[settingEnum.KINGDOMLEVELMULTIPLYDISPLAY]) {
		$("#setting_kingdomLevelMultiplyDisplayBox").prop("checked", true);
	}
	else {
		$("#setting_kingdomLevelMultiplyDisplayBox").prop("checked", false);
	}

	if (game.shop.features[shop_featureEnum.DUNGEON]) {
        $("#setting_dungeonBattleSpeedSettings").show();
	}
	else {
		$("#setting_dungeonBattleSpeedSettings").hide();
	}
	if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 0) {
		$("#setting_dungeonBattleSpeedSlow").prop("checked", true);
		$("#setting_dungeonBattleSpeedFast").prop("checked", false);
		$("#setting_dungeonBattleSpeedInstant").prop("checked", false);
	}
	else if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 1){
		$("#setting_dungeonBattleSpeedSlow").prop("checked", false);
		$("#setting_dungeonBattleSpeedFast").prop("checked", true);
		$("#setting_dungeonBattleSpeedInstant").prop("checked", false);
	}
	else {
		$("#setting_dungeonBattleSpeedSlow").prop("checked", false);
		$("#setting_dungeonBattleSpeedFast").prop("checked", false);
		$("#setting_dungeonBattleSpeedInstant").prop("checked", true);
	}
}
