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
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
	kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST
];

const kingdom_buildingEnum = {
    EMPTY: 0,
    CASTLE: 1,
	WOODCUTTER: 2,
	SHED: 3
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
		description: "<p>How much wood could a woodcutter cut if the woodcutter could cut wood?</p><p>Depends on how much wood is nearby.</p><p><strong>Can only be placed on forest.</strong></p><p>Wood + 1</p><p>Wood + 1 for each adjacent forest.</p>",
		cost: function() {
			return Math.floor(20 * Math.pow(3, game.kingdom.building[this.idNumber]));
		},
		canAfford: function() {
			if (game.kingdom.resource.labour >= this.cost()) {
				return true;
			}
			else {
				return false;
			}
		},
		canPlace: function (i) {
			return kingdom_landscape[i] == kingdom_terrainEnum.FOREST;
		},
		purchase: function () {
			if (this.canAfford()) {
				game.kingdom.resource.labour -= this.cost();
				kingdom_addBuilding(this.idNumber);
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.LABOUR].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.LABOUR].name + "'/>" + displayNum(this.cost());
		}
	},
	{
		idNumber: kingdom_buildingEnum.SHED,
		name: "Shed",
		id: "kingdom_shed",
		imageLink: "building_shed.png",
		idLink: null,
		valueLink: null,
		costLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.research += 1;
		},
		unlocked: true,
		description: "<p>All of the best ideas happen when working alone in a shed, unless they involve the use of power tools.</p><p><strong>Can only be built adjacent to the Castle.</strong></p><p>Research + 1</p>",
		costLabour: function() {
			return Math.floor(30 * Math.pow(2, game.kingdom.building[this.idNumber]));
		},
		costWood: function() {
			return Math.floor(50 * Math.pow(5, game.kingdom.building[this.idNumber]));
		},
		canAfford: function() {
			if (game.kingdom.resource.labour >= this.costLabour() && game.kingdom.resource.wood >= this.costWood()) {
				return true;
			}
			else {
				return false;
			}
		},
		canPlace: function (i) {
			if (kingdom_getConstructionNorth(i) == kingdom_buildingEnum.CASTLE) {
				return true;
			}
			else if (kingdom_getConstructionEast(i) == kingdom_buildingEnum.CASTLE) {
				return true;
			}
			else if (kingdom_getConstructionSouth(i) == kingdom_buildingEnum.CASTLE) {
				return true;
			}
			else if (kingdom_getConstructionWest(i) == kingdom_buildingEnum.CASTLE) {
				return true;
			}
			else {
				return false;
			}
		},
		purchase: function () {
			if (this.canAfford()) {
				game.kingdom.resource.labour -= this.costLabour();
				game.kingdom.resource.wood -= this.costWood();
				kingdom_addBuilding(this.idNumber);
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.LABOUR].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.LABOUR].name + "'/>" + displayNum(this.costLabour()) + "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.WOOD].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.WOOD].name + "'/>" + displayNum(this.costWood());
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

const kingdom_upgradeEnum = {
	QUARRY: 0,
	SAWMILL: 1
}

var kingdom_upgrades = [
	{
		idNumber: kingdom_upgradeEnum.QUARRY,
		name: "Quarry",
		id: "kingdom_upgrade_quarry",
		idLink: null,
		description: "<p>Unlocks a new building that produces stone from hills.</p>",
		cost: function() {
			return 200;
		},
		canAfford: function() {
			if (game.kingdom.resource.research >= this.cost()) {
				return true;
			}
			else {
				return false;
			}
		},
		purchase: function () {
			if (this.canAfford()) {
				game.kingdom.resource.research -= this.cost();
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.RESEARCH].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.RESEARCH].name + "'/>" + displayNum(this.cost());
		}
	},
	{
		idNumber: kingdom_upgradeEnum.SAWMILL,
		name: "Sawmill",
		id: "kingdom_upgrade_sawmill",
		idLink: null,
		description: "<p>Unlocks a new building that produces planks from wood.</p>",
		cost: function() {
			return 200;
		},
		canAfford: function() {
			if (game.kingdom.resource.research >= this.cost()) {
				return true;
			}
			else {
				return false;
			}
		},
		purchase: function () {
			if (this.canAfford()) {
				game.kingdom.resource.research -= this.cost();
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.RESEARCH].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.RESEARCH].name + "'/>" + displayNum(this.cost());
		}
	}
]
