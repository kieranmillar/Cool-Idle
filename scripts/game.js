//The game object is the only object that is saved to local storage.
//Anything that should be stored between sessions should be a property of this object.
//Some systems/browsers, particularly on mobile, have small storage space available.
//So we try to save minimal data and recalculate anything else we can when the game loads.

var game = {
    version: 2,
    previousTick: 0,
	exp: 0,
	level: 1,
    yellowCoins: 0,
    blueCoins: 0,
    greenCoins: 0,
    settings: [0, 1, 0],
    shop: {
        features: [0, 0, 0],
        cauldron: [0],
        kingdom: [0, 0]
    },
    cauldron: {
        magic: 10,
        building: [0, 0, 0, 0],
        spells: [0, 0, 0, 0],
    },
    kingdom: {
        resource: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        building: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borders: [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 1, 0, 0, 0,
            0, 0, 1, 2, 2, 2, 1, 0, 0,
            0, 0, 1, 2, 2, 2, 1, 0, 0,
            0, 0, 1, 2, 2, 2, 1, 0, 0,
            0, 0, 0, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        constructions: [
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        upgrades: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    dungeon: {
        weapon: 0,
        shield: 0,
        accessory: 0,
        treasures: [0, 0, 0]
    }
};

//Save the game to local storage
function save()
{
	localStorage.setItem("gameStored", JSON.stringify(game));
}

//Load the game from local storage
function load()
{
    if (localStorage.getItem("gameStored") != null)
	{
        loadedGame = JSON.parse(localStorage.getItem("gameStored"));
        if (loadedGame.version < 2)
        {
            alert("The game has updated with a breaking change since you last played. Your save will now be wiped because this is still in alpha. Sorry!");
            wipe(false);
            return;
        }
        $.extend(true, game, loadedGame);
    }
    else {
        game.previousTick = getTick(); 
    }
}

//Delete save file and reload the page
function wipe(ask) {
    if (ask) {
        var confirmation = confirm("Are you sure you want to permanently erase your savefile?");
    }
    else
    {
        var confirmation = true;
    }
	if(confirmation === true){
		localStorage.clear();
		location.reload(); 
	}
}
