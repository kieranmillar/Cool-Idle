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
        resource: {
            research: 0,
            labour: 0,
            wood: 0
        },
        building: {
            woodcutter: 0
        },
        constructions: [
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,

            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.WOODCUTTER, kingdom_buildingEnum.CASTLE, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY
        ]
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
        game = { ...loadedGame };
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