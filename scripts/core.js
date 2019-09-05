var ticks = 0; // browsers sometimes slow down execution of javascript when not in focus, so there may exist times where we need to execute multiple ticks
var maxTicks = 60;

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

$(document).ready(function(){
    game.previousTick = Math.floor (Date.now() / 1000);
    setInterval (gameLoop, 1000);
});