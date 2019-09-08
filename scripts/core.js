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

function getTick() {
    return Math.floor (Date.now() / 1000);
}

function gameLoop ()
{
	let currentTick = getTick();
	ticks = currentTick - game.previousTick;
	if (ticks > maxTicks)
	{
		ticks = maxTicks;
	}
	while (ticks > 0)
	{
        // Per second stuff goes here
        if (game.kingdom.unlocked) {
            kingdom_tick();
            if (activeTab = "kingdom") {
                kingdom_updateResources ();
                kingdom_updateBuildings ();
            }
        }
        ticks --;
        ticksSinceSave ++;
    }
    id_level.html(game.level);
    id_exp.html(game.exp);
    id_maxExp.html(getMaxExp());
    id_expProgress.attr({
		"value": game.exp,
		"max": getMaxExp ()
    });
    id_yellowCoins.html(game.yellowCoins);
    id_greenCoins.html(game.greenCoins);
    id_blueCoins.html(game.blueCoins);
    game.previousTick = currentTick;
    if (ticksSinceSave >= ticksToSave) {
        save();
        ticksSinceSave = 0;
    }
}

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
    }
}

function displayFeatures() {
    $(".tab").hide();
    $("#tab_help").show();
    $("#tab_settings").show();
    $("#tab_shop").show();
    $(".help").hide();
    if (game.kingdom.unlocked) {
        $("#tab_kingdom").show();
        $("#help_kingdom").show();
    }
}

function gainExp (amount) {
    game.exp += amount;
    while (game.exp >= getMaxExp()) {
        gainBlueCoins (game.level);
        game.exp -= getMaxExp();
        game.level ++;
    }
}

function getMaxExp () {
    return Math.pow(game.level, 2) * 100;
}

function gainYellowCoins (amount) {
    game.yellowCoins += amount;
}

function gainGreenCoins (amount) {
    game.greenCoins += amount;
}

function gainBlueCoins (amount) {
    game.blueCoins += amount;
}

$(document).ready(function(){
    load();
    displayFeatures();
    kingdom_init();
    goToLocation ("help");
    $("#version").html(game.version);
    gameLoop();
    setInterval (gameLoop, 1000);
});
