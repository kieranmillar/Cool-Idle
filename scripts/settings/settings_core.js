const settingEnum = {
    SCINOTATION: 0,
    KINGDOMLEVELMULTIPLYDISPLAY: 1
}

//Toggle settings
function toggleSetting (setting) {
    if (game.settings[setting] == 0) {
        game.settings[setting] = 1;
    }
    else {
        game.settings[setting] = 0;
    }
    displaySettings();
    save();
}
