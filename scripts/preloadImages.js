//Executes all of the following methods.
//TODO: Make all of this asynchronous?
function preloadImages () {
    preloadKingdomImages();
}

var kingdom_buildingFailImage;

//Pre-loads the images for the kingdom feature so they can be drawn onto a canvas
function preloadKingdomImages() {
    //Populate terrain tile images Array (used when drawing the canvas)
    for (let i = 1; i < kingdom_terrain.length; i++) {
        kingdom_terrain[i].imageCache = new Image();
        kingdom_terrain[i].imageCache.src = './images/kingdom/' + kingdom_terrain[i].imageLink;
    }

    //Populate building tile images Array (used when drawing the canvas)
    //TODO: Fix this to accept multiple images per building!
    for (let i = 1; i < kingdom_buildings.length; i++) {
        if (kingdom_buildings[i].hasOwnProperty("imageCache")) {
            kingdom_buildings[i].imageCache = new Image();
            kingdom_buildings[i].imageCache.src = './images/kingdom/' + kingdom_buildings[i].imageLink();
        }
        if (kingdom_buildings[i].hasOwnProperty("imageCachePlains")) {
            kingdom_buildings[i].imageCachePlains = new Image();
            kingdom_buildings[i].imageCachePlains.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.PLAINS);
        }
        if (kingdom_buildings[i].hasOwnProperty("imageCacheHills")) {
            kingdom_buildings[i].imageCacheHills = new Image();
            kingdom_buildings[i].imageCacheHills.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.HILLS);
        }
        if (kingdom_buildings[i].hasOwnProperty("imageCacheForest")) {
            kingdom_buildings[i].imageCacheForest = new Image();
            kingdom_buildings[i].imageCacheForest.src = './images/kingdom/' + kingdom_buildings[i].imageLink(kingdom_terrainEnum.FOREST);
        }
    }
    kingdom_buildingFailImage = new Image();
    kingdom_buildingFailImage.src = './images/kingdom/building_fail.png';
}