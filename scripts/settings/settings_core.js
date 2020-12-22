const settingEnum = {
    SCINOTATION: 0,
    KINGDOMLEVELMULTIPLYDISPLAY: 1,
    DUNGEONBATTLESPEED: 2
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
    if (setting == settingEnum.SCINOTATION) {
        redrawTopBar();
        kingdom_refreshUpgradeCosts();
    }
    save();
}

//Change the dungeon battle speed
function setting_changeDungeonSpeed (value) {
    game.settings[settingEnum.DUNGEONBATTLESPEED] = value;
    displaySettings();
    save();
}