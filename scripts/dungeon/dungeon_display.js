const dungeon_view_prepare = $("#dungeon_view_prepare");
const dungeon_view_dungeon = $("#dungeon_view_dungeon");
const dungeon_playerHpSpan = $("#dungeon_playerHpSpan");
const dungeon_playerAtkSpan = $("#dungeon_playerAtkSpan");
const dungeon_playerDefSpan = $("#dungeon_playerDefSpan");
const dungeon_playerYkSpan = $("#dungeon_playerYkSpan");
const dungeon_playerBkSpan = $("#dungeon_playerBkSpan");
const dungeon_playerRkSpan = $("#dungeon_playerRkSpan");
const dungeon_playerWeaponSpan = $("#dungeon_playerWeaponSpan");
const dungeon_playerShieldSpan = $("#dungeon_playerShieldSpan");
const dungeon_playerAccessorySpan = $("#dungeon_playerAccessorySpan");
const dungeon_canvas = document.getElementById("dungeon_canvas"); //JQuery objects are not canvases, so have to resort to old-school JS
const dungeon_infoTitle = $("#dungeon_infoTitle");
const dungeon_infoDescription = $("#dungeon_infoDescription");

var dungeon_floatingTextList = [];

var dungeon_infoPanelPreviousType = dungeon_infoPanelEnum.CELL;
var dungeon_infoPanelPreviousValue = 0;

//Redraws everything
function dungeon_redraw () {
	if (activeTab != "dungeon") {
		return;
    }
    if (dungeon_mode == dungeon_modeEnum.PREPARE) {
        dungeon_view_prepare.show();
        dungeon_view_dungeon.hide();
        dungeon_drawDungeonList();
    } else {
        dungeon_view_prepare.hide();
        dungeon_view_dungeon.show();
        dungeon_updatePlayerStats();
        dungeon_drawCanvas();
        dungeon_updateInfoPanel(dungeon_infoPanelEnum.PREVIOUS);
    }
}

//Draws the list of dungeons
function dungeon_drawDungeonList() {
    if (activeTab != "dungeon") {
		return;
    }
    for (let i = 0; i < dungeon_dungeons.length; i++) {
		if (dungeon_dungeons[i].unlocked) {
            dungeon_dungeons[i].idLink.show();
            let treasureCount = 0;
            dungeon_dungeons[i].treasures.forEach (treasure => {
                if (game.dungeon.treasures[treasure]) {
                    treasureCount++;
                }
            });
            dungeon_dungeons[i].treasureLink.text(treasureCount);
        }
        else {
            dungeon_dungeons[i].idLink.hide();
        }
	}
}

//Redraws the player stats
function dungeon_updatePlayerStats() {
    if (activeTab != "dungeon") {
		return;
    }
    dungeon_playerHpSpan.text(dungeon_player.hp);
    dungeon_playerAtkSpan.text(dungeon_player.atk);
    dungeon_playerDefSpan.text(dungeon_player.def);
    dungeon_playerYkSpan.text(dungeon_player.yellowKeys);
    dungeon_playerBkSpan.text(dungeon_player.blueKeys);
    dungeon_playerRkSpan.text(dungeon_player.redKeys);
    dungeon_playerWeaponSpan.text(dungeon_equipment[dungeon_player.weapon].name);
    dungeon_playerShieldSpan.text(dungeon_equipment[dungeon_player.shield].name);
    dungeon_playerAccessorySpan.text(dungeon_equipment[dungeon_player.accessory].name);
}

//Redraws the canvas
function dungeon_drawCanvas() {
    if (activeTab != "dungeon") {
		return;
    }
	var ctx = dungeon_canvas.getContext("2d");
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 550, 550);
    for (let j = 0; j < 11; j++) {
		for (let i = 0; i < 11; i++) {
            let cellX = dungeon_player.x - 5 + i;
            let cellY = dungeon_player.y - 5 + j;
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
                    ctx.drawImage(dungeon_terrain[dungeon_terrainEnum.FLOOR].imageCache[dungeon_dungeons[dungeon_currentDungeon].style], x, y);
                    let treasure = dungeon_layout[cell] - 1000;
                    if (game.dungeon.treasures[treasure] == 0) {
                        ctx.drawImage(dungeon_chestClosedImage, x, y);
                    }
                    else {
                        ctx.drawImage(dungeon_chestOpenImage, x, y);
                    }
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
    ctx.drawImage(dungeon_playerImage, 250, 250);
}

//Create floating text and add it to the array
function dungeon_createFloatingText(text, colour, x, y) {
    dungeon_floatingTextList.push(new dungeon_floatingText(text, colour, x, y));
}

//An object that stores data for each piece of floating text.
class dungeon_floatingText {
    constructor(value, colour, x, y) {
        this.value = value;
        this.colour = colour;
        this.x = x;
        this.y = y;
        this.lifetime = 50;
    }
}

//Draws floating text, if there are any in the array
function dungeon_drawFloatingText() {
    if (dungeon_floatingTextList.length == 0) {
        return;
    }
    dungeon_drawCanvas();
    var ctx = dungeon_canvas.getContext("2d");
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.globalAlpha = 1;
    let count = 0;
    let speed = 2;
    if (game.settings[settingEnum.DUNGEONBATTLESPEED] == 0) {
        speed = 1;
    }
    dungeon_floatingTextList.forEach(text => {
        ctx.fillStyle = text.colour;
        ctx.fillText(text.value, text.x, text.y);
        ctx.fillStyle = "#000000";
        ctx.strokeText(text.value, text.x, text.y);
        text.y -= speed;
        text.lifetime -= speed;
        if (text.lifetime <= 0) {
            count ++;
        }
    });
    if (count > 0) {
        dungeon_floatingTextList = dungeon_floatingTextList.slice(count, dungeon_floatingTextList.length);
    }
    if (dungeon_floatingTextList.length == 0) {
        dungeon_drawCanvas();
    }
}

//Redraws the infoPanel. Takes two arguments, the infoPanel type, and one optional accompanying value (based on the infoPanel type)
function dungeon_updateInfoPanel (infoPanelType, value) {
    if (activeTab != "dungeon") {
		return;
    }
    //Sometimes we just want to refresh the panel with what we had last time
	if (infoPanelType == dungeon_infoPanelEnum.PREVIOUS) {
		infoPanelType = dungeon_infoPanelPreviousType;
		value = dungeon_infoPanelPreviousValue;
	}
	else {
		dungeon_infoPanelPreviousType = infoPanelType;
		dungeon_infoPanelPreviousValue = value;
    }
    if (infoPanelType == dungeon_infoPanelEnum.CELL) {
        let cell = value;
        if (cell > 0 && cell < dungeon_dungeons[dungeon_currentDungeon].width * dungeon_dungeons[dungeon_currentDungeon].height) {
            //Only update if in map bounds
            let cellValue = dungeon_layout[cell];
            if (cellValue <= 3) {
                // Nothing to say about basic terrain features
                return;
            }
            else if (cellValue < 100) {
                //Other terrain features
                dungeon_infoTitle.html("<img src='" + dungeon_terrain[cellValue].imageCache[dungeon_dungeons[dungeon_currentDungeon].style].src + "' alt='" + dungeon_terrain[cellValue].name + "'/>" + dungeon_terrain[cellValue].name);
		        dungeon_infoDescription.html("<p>" + dungeon_terrain[cellValue].description + "</p>");
            }
            else if (cellValue < 1000) {
                //Items
                let item = cellValue - 100;
                dungeon_infoTitle.html("<img src='" + dungeon_items[item].imageCache.src + "' alt='" + dungeon_items[item].name + "'/>" + dungeon_items[item].name);
		        dungeon_infoDescription.html("<p>" + dungeon_items[item].description + "</p>");
            }
            else if (cellValue < 2000) {
                //Treasures
                let treasure = cellValue - 1000;
                if (game.dungeon.treasures[treasure] == 0) {
                    dungeon_infoTitle.html("<img src='" + dungeon_chestClosedImage.src + "' alt='Closed Treasure Chest'/>Unclaimed Treasure");
		            dungeon_infoDescription.html("<p>Some permanent goodies are waiting for the taking! What could be inside?</p>");
                } else {
                    dungeon_infoTitle.html("<img src='" + dungeon_chestOpenImage.src + "' alt='Open Treasure Chest'/>Empty Treasure Chest");
		            dungeon_infoDescription.html("<p>Somebody has already claimed this treasure! It was you, wasn't it?</p>");
                }
            }
            else {
                //Enemies
                let enemy = cellValue - 2000;

                dungeon_infoTitle.html("<img src='" + dungeon_enemies[enemy].imageCache.src + "' class='dungeon_infoPanelImage' alt='" + dungeon_enemies[enemy].name + "'/>" + dungeon_enemies[enemy].name);

                let htmlText = "<p>" + dungeon_enemies[enemy].description + "</p><p>HP: " + dungeon_enemies[enemy].hp + "</p><p>Attack: " + dungeon_enemies[enemy].atk + "</p><p>Defense: " + dungeon_enemies[enemy].def + "</p><p><img src='./images/exp.png' class='dungeon_infoPanelImage' alt='Experience' />" + dungeon_enemies[enemy].exp + "</p><p><img src='./images/coin_yellow.png' class='dungeon_infoPanelImage' alt='Yellow Coin' />" + dungeon_enemies[enemy].coin;

                let predictedDamage = dungeon_calculateBattleResult(enemy);
                if (predictedDamage == -1) {
                    htmlText += "<p>You can't hurt this! (Defense too high)</p>";
                } else {
                    htmlText += "<p>Predicted damage: " + predictedDamage;
                    let numberOfHits = Math.max(Math.floor(dungeon_enemies[enemy].hp / (dungeon_player.atk - dungeon_enemies[enemy].def)) - 1, 0);
                    if (numberOfHits == 0) {
                        htmlText += "</p>";
                    } else {
                        let damageTakenPerHit = Math.max(dungeon_enemies[enemy].atk - dungeon_player.def, 0);
                        let atkForFasterWin = Math.ceil(dungeon_enemies[enemy].hp / numberOfHits) + dungeon_enemies[enemy].def;
                        htmlText += " (" + damageTakenPerHit + " x " + numberOfHits + ")</p><p>Attack for faster win: " + atkForFasterWin + " (+" + (atkForFasterWin - dungeon_player.atk) +")</p>";
                    }
                }           
		        dungeon_infoDescription.html(htmlText);
            }
        }
    }
}
