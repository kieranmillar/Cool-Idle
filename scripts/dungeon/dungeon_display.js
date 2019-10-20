const dungeon_playerHpSpan = $("#dungeon_playerHpSpan");
const dungeon_canvas = document.getElementById("dungeon_canvas"); //JQuery objects are not canvases, so have to resort to old-school JS

var dungeon_damageNumbers = [];

//Redraws everything
function dungeon_redraw () {
	if (activeTab != "dungeon") {
		return;
    }
    dungeon_playerHpSpan.text(dungeon_player.hp);
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
                else if (dungeon_layout[cell] < 2000) {
                    //treasure
                }
                else if (dungeon_layout[cell] < 3000) {
                    //enemy
                    ctx.drawImage(dungeon_terrain[dungeon_terrainEnum.FLOOR].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
                    ctx.drawImage(dungeon_enemies[dungeon_layout[cell] - 2000].imageCache, x, y);
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

//Create a damage number and add it to the array
function dungeon_createDamageNumber(damage, x, y) {
    dungeon_damageNumbers.push(new dungeon_damageNumber(damage, x, y));
}

//An object that handles drawing damage numbers to the screen. A negative value means healing and is displayed in green.
class dungeon_damageNumber {
    constructor(value, x, y) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.lifetime = 50;
    }
}

//Draws damage numbers, if there are any in the array
function dungeon_drawDamageNumbers() {
    if (dungeon_damageNumbers.length == 0) {
        return;
    }
    dungeon_redraw();
    var ctx = dungeon_canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.globalAlpha = 1;
    let count = 0;
    let speed = 2;
    if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 0) {
        speed = 1;
    }
    dungeon_damageNumbers.forEach(number => {
        if (number.value > 0) {
            ctx.fillStyle = "#FF0000";
        }
        else {
            ctx.fillStyle = "#00FF00";
        }
        ctx.fillText(Math.abs(number.value), number.x, number.y);
        number.y -= speed;
        number.lifetime -= speed;
        if (number.lifetime <= 0) {
            count ++;
        }
    });
    if (count > 0) {
        dungeon_damageNumbers = dungeon_damageNumbers.slice(count, dungeon_damageNumbers.length);
    }
    if (dungeon_damageNumbers.length == 0) {
        dungeon_redraw();
    }
}