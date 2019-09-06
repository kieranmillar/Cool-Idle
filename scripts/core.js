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

$(document).ready(function(){
    game.previousTick = getTick();
    displayFeatures();
    goToLocation ("help");
    setInterval (gameLoop, 1000);
});