const suffixes = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "Nn", "Dc", "UDc", "DDc", "TDc", "QaDc", "QtDc", "SxDc", "SpDc", "ODc", "NDc", "Vi", "UVi", "DVi", "TVi", "QaVi", "QtVi", "SxVi", "SpVi", "OcVi", "NnVi", "Tg"];
var ticks = 0; // browsers sometimes slow down execution of javascript when not in focus, so there may exist times where we need to execute multiple ticks
const maxTicks = 60;
var ticksSinceSave = 0;
const ticksToSave = 20;
var activeTab = "help";
var id_level = $("#level");
var id_exp = $("#exp");
var id_maxExp = $("#maxExp");
var id_expProgress = $("#expProgress");
var id_yellowCoins = $("#yellowCoins");
var id_greenCoins = $("#greenCoins");
var id_blueCoins = $("#blueCoins");

//A tick is the current date and time, in seconds.
function getTick() {
    return Math.floor (Date.now() / 1000);
}

//This function executes 50 times per second.
//Ticks represent full seconds. Most game logic runs once per tick, while some smooth drawing will occur each execution.
function gameLoop () {
	let currentTick = getTick();
    ticks = currentTick - game.previousTick;
	if (ticks > maxTicks) {
		ticks = maxTicks; // TODO: Replace with offline calculation eventually
    }
    while (ticks > 0) { //If the game is running slowly, we should perform multiple second's worth of updates at once
        // Per second stuff goes here
        if (game.shop.features[shop_featureEnum.KINGDOM] == 1) {
            kingdom_tick();
            if (activeTab == "kingdom") {
                kingdom_updateResources();
                kingdom_updateBuildings();
                kingdom_updateUpgrades();
            }
        }
        ticks --;
        ticksSinceSave ++;
    }
    if (activeTab == "dungeon") {
        dungeon_drawDamageNumbers();
    }
    //TODO: Put topbar display code into its own function, so can update whenever we gain or spend exp or coins
    game.previousTick = currentTick;
    if (ticksSinceSave >= ticksToSave) {
        save();
        ticksSinceSave = 0;
    }
}

//Swapping between feature tabs
function goToLocation (location)
{
    activeTab = location;
    $(".location").hide();
    $(".tab").removeClass("active");
	switch (location) {
		case "help":
            $("#loc_help").show();
            $("#tab_help").addClass("active");
            break;
        case "settings":
            $("#loc_settings").show();
            $("#tab_settings").addClass("active");
            displaySettings ();
            break;
		case "shop":
            $("#loc_shop").show();
            $("#tab_shop").addClass("active");
            shop_redraw ();
			break;
		case "kingdom":
            $("#loc_kingdom").show();
            $("#tab_kingdom").addClass("active");
            kingdom_redraw ();
            break;
        case "dungeon":
            $("#loc_dungeon").show();
            $("#tab_dungeon").addClass("active");
            dungeon_redraw ();
            break;
    }
}

//Figure out and display currently unlocked tabs. Also updates documentation on Help tab
function displayFeatures() {
    $(".tab").hide();
    $("#tab_help").show();
    $("#tab_settings").show();
    $("#tab_shop").show();
    $(".help").hide();
    if (game.shop.features[shop_featureEnum.KINGDOM] == 1) {
        $("#tab_kingdom").show();
        $("#help_kingdom").show();
    }
    if (game.shop.features[shop_featureEnum.DUNGEON] == 1) {
        $("#tab_dungeon").show();
        $("#help_dungeon").show();
    }
}

//Redraws the stats in the top bar
function redrawTopBar() {
    id_level.html(game.level);
    id_exp.html(displayNum(game.exp));
    id_maxExp.html(displayNum(getMaxExp()));
    id_expProgress.attr({
        "value": game.exp,
        "max": getMaxExp ()
    });
    id_yellowCoins.html(displayNum(game.yellowCoins));
    id_blueCoins.html(displayNum(game.blueCoins));
    id_greenCoins.html(displayNum(game.greenCoins));
}

//Call this every time you want to gain Exp as it also handles levelling up and drawing
function gainExp (amount) {
    game.exp += amount;
    let levelledUp = false;
    if (game.exp >= getMaxExp()) {
        levelledUp = true;
    }
    while (game.exp >= getMaxExp()) {
        gainGreenCoins (game.level);
        game.exp -= getMaxExp();
        game.level ++;
    }
    id_exp.html(displayNum(game.exp));
    id_expProgress.attr({
        "value": game.exp,
        "max": getMaxExp ()
    });
    if (levelledUp) {
        id_level.html(game.level);
        id_maxExp.html(displayNum(getMaxExp()));
        if (activeTab == "kingdom") {
            kingdom_updateResources();
            kingdom_updateinfoPanel(kingdom_infoPanelEnum.PREVIOUS);
        }
    }
}

function getMaxExp () {
    return Math.pow(game.level, 2) * 100;
}

function gainYellowCoins (amount) {
    game.yellowCoins += amount;
    id_yellowCoins.html(displayNum(game.yellowCoins));
}

function gainBlueCoins (amount) {
    game.blueCoins += amount;
    id_blueCoins.html(displayNum(game.blueCoins));
}

function gainGreenCoins (amount) {
    game.greenCoins += amount;
    id_greenCoins.html(displayNum(game.greenCoins));
}

//Displays numbers with suffixes. I stole this from Derivative Clicker
function displayNum(num) {
    if (num < 1000) {
        return num;
    }
	if (game.settings[settingEnum.SCINOTATION]) {
        return parseFloat(num).toPrecision(3);
    }
	for(var i = suffixes.length - 1; i >= 0; i--) {
		if(Math.abs(num) >= Math.pow(10, 3*i + 3) * 0.99999) {
            if (i < 4) {
                return parseFloat(num/Math.pow(10, 3*i + 3)).toFixed(2) + suffixes[i];
            }
            else {
                parseFloat(num/Math.pow(10, 3*i + 3)).toFixed(2) + " " + suffixes[i]; //spaces out first four suffixes
            }
		}
    }
    return parseFloat(num).toFixed(2);
}

function checkKey(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    if (activeTab == 'dungeon') {
        switch (event.key) {
            case "Left":
            case "ArrowLeft":
            case "a":
                dungeon_move('east');
                break;
            case "Right":
            case "ArrowRight":
            case "d":
                dungeon_move('west');
                break;
            case "Up":
            case "ArrowUp":
            case "w":
                dungeon_move('north');
                break;
            case "Down":
            case "ArrowDown":
            case "s":
                dungeon_move('south');
                break;
            default:
                return;
        }
    }

    event.preventDefault();
}

//A helpful function for delaying things for e.g. animations
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//This executes when the whole page has finished loading. This is where the code "starts"
$(document).ready(function(){
    var preload = preloadImages();
    load();
    shop_init();
    kingdom_init();
    dungeon_init();
    redrawTopBar();
    displayFeatures();
    goToLocation ("help");
    $("#version").html(game.version);
    window.addEventListener('keydown', checkKey, true);
    preload.then(() => {
        gameLoop();
        setInterval (gameLoop, 20);
        $("#loading").hide();
        $("#game").addClass("flex");
    })
    .catch(() => {
        $("#loading").html("Oh no! something went wrong with preloading images! Totally uncool!");
    });
});
