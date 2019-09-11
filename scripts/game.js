//The game object is the only object that is saved to local storage.
//Anything that should be stored between sessions should be placed as a property of this object.

var game = {
    version: 1,
    previousTick: 0,
	exp: 0,
	level: 1,
	yellowCoins: 0,
    greenCoins: 0,
    blueCoins: 0,
    kingdom: {
        unlocked: false,
        resource: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        building: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        constructions: [
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,

            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.CASTLE, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY
        ],
        upgrades: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
};

function save()
{
	localStorage.setItem("gameStored", JSON.stringify(game));
}

function load()
{
    if (localStorage.getItem("gameStored") != null)
	{
		loadedGame = JSON.parse(localStorage.getItem("gameStored"));
        $.extend(true, game, loadedGame);
    }
    else {
        game.previousTick = getTick(); 
    }
}

function wipe() {
	var confirmation = confirm("Are you sure you want to permanently erase your savefile?");
	if(confirmation === true){
		localStorage.clear();
		location.reload(); 
	}
}
