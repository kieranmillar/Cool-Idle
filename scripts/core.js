var ticks = 0; // browsers sometimes slow down execution of javascript when not in focus, so there may exist times where we need to execute multiple ticks
var maxTicks = 60;
var activeTab = "welcome";

function gameLoop ()
{
	let currentTick = Math.floor (Date.now() / 1000);
	ticks = currentTick - game.previousTick;
	if (ticks > maxTicks)
	{
		ticks = maxTicks;
	}
	while (ticks > 0)
	{
        // Per second stuff goes here
        
        ticks --;
	}
	game.previousTick = currentTick;
}

function goToLocation (location)
{
    $(".location").hide();
    $(".tab").removeClass("active");
	switch (location) {
		case "welcome":
            $("#loc_welcome").show();
            $("#tab_welcome").addClass("active");
			break;
		case "shop":
            $("#loc_shop").show();
            $("#tab_shop").addClass("active");
			break;
		case "kingdom":
            $("#loc_kingdom").show();
            $("#tab_kingdom").addClass("active");
			break;
    }
}

$(document).ready(function(){
    game.previousTick = Math.floor (Date.now() / 1000);
    setInterval (gameLoop, 1000);
    goToLocation ("welcome");
    $("#tab_kingdom").hide();
});