var ticks = 0; // browsers sometimes slow down execution of javascript when not in focus, so there may exist times where we need to execute multiple ticks
var maxTicks = 60;
var activeTab = "help";

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
        }
        ticks --;
    }
    $("#level").html(game.level);
    $("#exp").html(game.exp);
    $("#maxExp").html(getMaxExp());
    $("#expProgress").attr({
		"value": game.exp,
		"max": getMaxExp ()
    });
    $("#yellowCoins").html(game.yellowCoins);
    $("#greenCoins").html(game.greenCoins);
    $("#blueCoins").html(game.blueCoins);
    game.previousTick = currentTick;
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
    game.previousTick = getTick();
    displayFeatures();
    kingdom_calculateOutput();
    goToLocation ("help");
    gameLoop();
    setInterval (gameLoop, 1000);
});