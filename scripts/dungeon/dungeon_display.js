const dungeon_canvas = document.getElementById("dungeon_canvas"); //JQuery objects are not canvases, so have to resort to old-school JS

//Redraws everything
function dungeon_redraw () {
	if (activeTab != "dungeon") {
		return;
	}
	dungeon_drawCanvas();
}

//Redraws the canvas
function dungeon_drawCanvas() {
    if (activeTab != "dungeon") {
		return;
	}
	var ctx = dungeon_canvas.getContext("2d");
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 450, 450);
    for (let j = 0; j < 9; j++) {
		for (let i = 0; i < 9; i++) {
            let cellX = dungeon_playerX - 4 + i;
            let cellY = dungeon_playerY - 4 + j;
            let cell = cellX  + (cellY * dungeon_dungeons[dungeon_currentDungeon].width);
			let x = i * 50;
            let y = j * 50;
            if (cellX >= 0
                && cellX < dungeon_dungeons[dungeon_currentDungeon].width
                && cellY >= 0
                && cellY < dungeon_dungeons[dungeon_currentDungeon].height) {
                ctx.drawImage(dungeon_terrain[dungeon_dungeons[dungeon_currentDungeon].layout[cell]].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
            }
            else {
                ctx.drawImage(dungeon_terrain[dungeon_dungeons[dungeon_currentDungeon].outOfBounds].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
            }
        }
    }
}
