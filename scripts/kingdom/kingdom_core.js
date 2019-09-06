var kingdom_cells = $(".kingdom_tileCell");
var kingdom_currentCell = 0;

for (let i = 0; i < kingdom_cells.length; i++)
{
	kingdom_cells[i].addEventListener('click', function () {kingdom_clickedCell()});
	kingdom_cells[i].addEventListener('mouseover', function () {kingdom_mousedOverCell(i)});
}

function kingdom_tick () {

}

function kingdom_calculateOutput () {

}

function kingdom_mousedOverCell(x) {
	kingdom_currentCell = x;
}

function kingdom_clickedCell()
{
	if (kingdom_constructions[kingdom_currentCell] != EMPTY)
	{
		//there is a construction on the cell
	}
	else
	{
		//the cell is unbuilt terrain
	}
}