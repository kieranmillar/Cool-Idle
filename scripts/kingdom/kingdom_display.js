function kingdom_redraw ()
{
    kingdom_populateTileImages ();
}

function kingdom_populateTileImages ()
{
	for (let i = 0; i < kingdom_cells.length; i++)
	{
		kingdom_cells[i].style.opacity = "1";
		kingdom_cells[i].style.visibility = "visible";
		//let kingdom_range = cellInRange (i);
		// if (kingdom_range == 0)
		// {
		// 	kingdom_cells[i].style.visibility = "hidden";
		// }
		// else if (kingdom_range == 1)
		// {
		// 	kingdom_cells[i].style.opacity = "0.5";
		// }
		if (kingdom_constructions[i] != EMPTY)
		{
			let y = kingdom_constructions[i];
			kingdom_cells[i].innerHTML = "<img src = \"./images/kingdom/" + kingdom_buildings[y].imageLink + "\" alt=\"" + kingdom_buildings[y].name + "\">";
		}
		else
		{
			let y = kingdom_landscape[i];
			kingdom_cells[i].innerHTML = "<img src = \"./images/kingdom/" + kingdom_terrain[y].imageLink + "\" alt=\"" + kingdom_terrain[y].name + "\">";
		}
	}
}