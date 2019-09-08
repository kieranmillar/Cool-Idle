const kingdom_resourceEnum = {
	RESEARCH: 0,
	LABOUR: 1,
	WOOD: 2
}

var kingdom_resources = [
	{
		name: "Research",
		id: "kingdom_research",
		imageLink: "resource_research.png",
		value: "kingdom_research_amount",
		idLink: null,
		valueLink: null
	},
	{
		name: "Labour Force",
		id: "kingdom_labour",
		imageLink: "resource_labour.png",
		value: "kingdom_labour_amount",
		idLink: null,
		valueLink: null
	},
	{
		name: "Wood",
		id: "kingdom_wood",
		imageLink: "resource_wood.png",
		value: "kingdom_wood_amount",
		idLink: null,
		valueLink: null
	}
];

const kingdom_terrainEnum = {
	INVALID: 0,
    PLAINS: 1,
    FOREST: 2
}

const kingdom_terrain = [
	{
		name: "",
		imageLink: "",
		description: ""
	},
	{
		name: "Plains",
		imageLink: "tile_plains.png",
		description: "<p>Just plain boring.</p>"
	},
	{
		name: "Forest",
		imageLink: "tile_forest.png",
		description: "<p>Wood you believe it, there's trees growing here!</p><p>A good source of wood.</p>"
	}
];

var kingdom_landscape = [
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
	kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST
];

const kingdom_buildingEnum = {
    EMPTY: 0,
    CASTLE: 1,
    WOODCUTTER: 2
}

var kingdom_buildings = [
	{
		idNumber: kingdom_buildingEnum.EMPTY,
		name: "",
		imageLink: "",
		unlocked: false,
		description: ""
	},
	{
		idNumber: kingdom_buildingEnum.CASTLE,
		name: "Castle",
		imageLink: "building_castle.png",
        output: function (i) {
            kingdom_outputs.labour += 1;
            kingdom_outputs.yellowCoins += 1;
            kingdom_outputs.exp += 1;
		},
		unlocked: false,
		description: "<p>You rule your kingdom from your trusty castle. This building cannot be removed or relocated.</p><p>Labour Force + 1</p><p>Yellow Coins + 1</p><p>Exp + 1</p>"
	},
	{
		idNumber: kingdom_buildingEnum.WOODCUTTER,
		name: "Woodcutter's Hut",
		id: "kingdom_woodcutter",
		imageLink: "building_woodcutter.png",
		idLink: null,
		valueLink: null,
		costLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
		requirement: kingdom_terrainEnum.FOREST,
        output: function (i) {
			kingdom_outputs.wood += 1;
			if (kingdom_getTerrainNorth(i) == kingdom_terrainEnum.FOREST) {
				kingdom_outputs.wood += 1;
			}
			if (kingdom_getTerrainEast(i) == kingdom_terrainEnum.FOREST) {
				kingdom_outputs.wood += 1;
			}
			if (kingdom_getTerrainSouth(i) == kingdom_terrainEnum.FOREST) {
				kingdom_outputs.wood += 1;
			}
			if (kingdom_getTerrainWest(i) == kingdom_terrainEnum.FOREST) {
				kingdom_outputs.wood += 1;
			}
		},
		unlocked: true,
		description: "<p>How much wood could a woodcutter cut if the woodcutter could cut wood?</p><p>Depends on how much wood is nearby.</p><p>Can only be placed on forest.</p><p>Wood + 1</p><p>Wood + 1 for each adjacent forest.</p>",
		cost: function() {
			return Math.floor(20 * Math.pow(2, game.kingdom.building[kingdom_buildingEnum.WOODCUTTER]));
		},
		canAfford: function() {
			if (game.kingdom.resource.labour >= this.cost()) {
				return true;
			}
			else {
				return false;
			}
		},
		purchase: function () {
			if (game.kingdom.resource.labour >= this.cost()) {
				game.kingdom.resource.labour -= this.cost();
				game.kingdom.building[kingdom_buildingEnum.WOODCUTTER] ++;
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.LABOUR].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.LABOUR].name + "'/>" + this.cost();
		}
	}
];

var kingdom_outputs = {
    yellowCoins: 0,
    greenCoins: 0,
    exp: 0,
    research: 0,
    labour: 0,
    wood: 0
}

