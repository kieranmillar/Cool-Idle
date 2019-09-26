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
            let cellX = dungeon_player.x - 4 + i;
            let cellY = dungeon_player.y - 4 + j;
            let cell = cellX  + (cellY * dungeon_dungeons[dungeon_currentDungeon].width);
			let x = i * 50;
            let y = j * 50;
            if (cellX >= 0
            && cellX < dungeon_dungeons[dungeon_currentDungeon].width
            && cellY >= 0
            && cellY < dungeon_dungeons[dungeon_currentDungeon].height) {
                if (dungeon_layout[cell] < 100) {
                    //terrain
                    ctx.drawImage(dungeon_terrain[dungeon_terrainEnum.FLOOR].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
                    ctx.drawImage(dungeon_terrain[dungeon_layout[cell]].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
                }
                else if (dungeon_layout[cell] < 1000) {
                    //item
                    ctx.drawImage(dungeon_terrain[dungeon_terrainEnum.FLOOR].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
                    ctx.drawImage(dungeon_items[dungeon_layout[cell] - 100].imageCache, x, y);
                }
            }
            else {
                //cell out of bounds
                ctx.drawImage(dungeon_terrain[dungeon_dungeons[dungeon_currentDungeon].outOfBounds].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
            }
        }
    }
    ctx.drawImage(dungeon_playerImage, 200, 200);
}
