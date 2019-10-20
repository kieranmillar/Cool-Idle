var kingdom_buildingFailImage;
var dungeon_playerImage;
var dungeon_chestClosedImage;
var dungeon_chestOpenImage;

//Executes all of the following methods.
function preloadImages () {
    return new Promise (resolve => {
        let kingdomTerrain = preloadKingdomTerrainImages();
        let kingdomBuilding = preloadKingdomBuildingImages();
        let dungeonTerrain = preloadDungeonTerrainImages();
        let dungeonItem = preloadDungeonItemImages();
        let dungeonEnemy = preloadDungeonEnemyImages();
        Promise.all([kingdomTerrain, kingdomBuilding, dungeonTerrain, dungeonItem, dungeonEnemy])
        .then(() => {
            console.log("All images preloaded");
            resolve("All images preloaded");
        });
    });
}

//Pre-loads the terrain images for the kingdom feature so they can be drawn onto a canvas
function preloadKingdomTerrainImages() {
    return new Promise (resolve => {
        let startTime = Date.now();

        let imageLoadedCallback = function () {
            count ++;
            if (count == kingdom_terrain.length) {
                console.log("Kingdom terrain images preloaded - " + (Date.now() - startTime));
                resolve("Kingdom terrain images preloaded");
            }
        };

        let count = 1;
        for (let i = 1; i < kingdom_terrain.length; i++) {
            kingdom_terrain[i].imageCache = new Image();
            kingdom_terrain[i].imageCache.onload = imageLoadedCallback;
            kingdom_terrain[i].imageCache.src = './images/kingdom/' + kingdom_terrain[i].imageLink;
        }
    });
}

//Pre-loads the building images for the kingdom feature so they can be drawn onto a canvas
function preloadKingdomBuildingImages() {
    return new Promise (resolve => {
        let startTime = Date.now();

        let imageLoadedCallback = function () {
            count ++;
            if (count == maxCount) {
                console.log("Kingdom building images preloaded - " + (Date.now() - startTime));
                resolve("Kingdom building images preloaded");
            }
        };

        //Count how many images we need to load
        let count = 1;
        let maxCount = 2; // +1 for fail image
        for (let i = 1; i < kingdom_buildings.length; i++) {
            if (kingdom_buildings[i].singleImage) {
                maxCount ++;
            }
            else {
                if (kingdom_buildings[i].hasOwnProperty("imageCachePlains")) {
                    maxCount ++;
                }
                if (kingdom_buildings[i].hasOwnProperty("imageCacheHills")) {
                    maxCount ++;
                }
                if (kingdom_buildings[i].hasOwnProperty("imageCacheForest")) {
                    maxCount ++;
                }
            }
        }

        //Actually load the images
        for (let i = 1; i < kingdom_buildings.length; i++) {
            if (kingdom_buildings[i].singleImage) {
                kingdom_buildings[i].imageCache = new Image();
                kingdom_buildings[i].imageCache.onload = imageLoadedCallback;
                kingdom_buildings[i].imageCache.src = './images/kingdom/' + kingdom_buildings[i].imageLink();
            }
            else {
                if (kingdom_buildings[i].hasOwnProperty("imageCachePlains")) {
                kingdom_buildings[i].imageCachePlains = new Image();
                kingdom_buildings[i].imageCachePlains.onload = imageLoadedCallback;
                kingdom_buildings[i].imageCachePlains.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.PLAINS);
                }
                if (kingdom_buildings[i].hasOwnProperty("imageCacheHills")) {
                    kingdom_buildings[i].imageCacheHills = new Image();
                    kingdom_buildings[i].imageCacheHills.onload = imageLoadedCallback;
                    kingdom_buildings[i].imageCacheHills.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.HILLS);
                }
                if (kingdom_buildings[i].hasOwnProperty("imageCacheForest")) {
                    kingdom_buildings[i].imageCacheForest = new Image();
                    kingdom_buildings[i].imageCacheForest.onload = imageLoadedCallback;
                    kingdom_buildings[i].imageCacheForest.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.FOREST);
                }
            }
        }
        kingdom_buildingFailImage = new Image();
        kingdom_buildingFailImage.onload = imageLoadedCallback;
        kingdom_buildingFailImage.src = './images/kingdom/building_fail.png';
    });
}

//Pre-loads the terrain images for the dungeon feature so they can be drawn onto a canvas
function preloadDungeonTerrainImages() {
    return new Promise (resolve => {
        let startTime = Date.now();

        let imageLoadedCallback = function () {
            count ++;
            if (count == (dungeon_terrain.length * DUNGEON_TOTALSTYLES) + 3) {//+3 for player and chest images
                console.log("Dungeon terrain images preloaded - " + (Date.now() - startTime));
                resolve("Dungeon terrain images preloaded");
            }
        }

        let count = 0;
        for (let i = 0; i < dungeon_terrain.length; i++) {
            for (let j = 0; j < DUNGEON_TOTALSTYLES; j++) {
                dungeon_terrain[i].imageCache[j] = new Image();
                dungeon_terrain[i].imageCache[j].onload = imageLoadedCallback;
                dungeon_terrain[i].imageCache[j].src = './images/dungeon/' + dungeon_terrain[i].imageLink[j];
            }
        }

        dungeon_playerImage = new Image();
        dungeon_playerImage.onload = imageLoadedCallback;
        dungeon_playerImage.src = './images/dungeon/player.png';

        dungeon_chestClosedImage = new Image();
        dungeon_chestClosedImage.onload = imageLoadedCallback;
        dungeon_chestClosedImage.src = './images/dungeon/chest_closed.png';

        dungeon_chestOpenImage = new Image();
        dungeon_chestOpenImage.onload = imageLoadedCallback;
        dungeon_chestOpenImage.src = './images/dungeon/chest_open.png';
    });
}

//Pre-loads the item images for the dungeon feature so they can be drawn onto a canvas
function preloadDungeonItemImages() {
    return new Promise (resolve => {
        let startTime = Date.now();

        let imageLoadedCallback = function () {
            count ++;
            if (count == dungeon_items.length) {
                console.log("Dungeon item images preloaded - " + (Date.now() - startTime));
                resolve("Dungeon item images preloaded");
            }
        }

        let count = 0;
        for (let i = 0; i < dungeon_items.length; i++) {
            dungeon_items[i].imageCache = new Image();
            dungeon_items[i].imageCache.onload = imageLoadedCallback;
            dungeon_items[i].imageCache.src = './images/dungeon/' + dungeon_items[i].imageLink;
        }
    });
}

//Pre-loads the enemy images for the dungeon feature so they can be drawn onto a canvas
function preloadDungeonEnemyImages() {
    return new Promise (resolve => {
        let startTime = Date.now();

        let imageLoadedCallback = function () {
            count ++;
            if (count == dungeon_enemies.length) {
                console.log("Dungeon enemy images preloaded - " + (Date.now() - startTime));
                resolve("Dungeon enemy images preloaded");
            }
        }

        let count = 0;
        for (let i = 0; i < dungeon_enemies.length; i++) {
            dungeon_enemies[i].imageCache = new Image();
            dungeon_enemies[i].imageCache.onload = imageLoadedCallback;
            dungeon_enemies[i].imageCache.src = './images/dungeon/' + dungeon_enemies[i].imageLink;
        }
    });
}