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
}
