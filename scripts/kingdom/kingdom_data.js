const kingdom_resourceEnum = {
	RESEARCH: 0,
	LABOUR: 1,
	WOOD: 2,
	PLANK: 3,
	STONE: 4
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
	},
	{
		name: "Plank",
		id: "kingdom_plank",
		imageLink: "resource_plank.png",
		value: "kingdom_plank_amount",
		idLink: null,
		valueLink: null
	},
	{
		name: "Stone",
		id: "kingdom_stone",
		imageLink: "resource_stone.png",
		value: "kingdom_stone_amount",
		idLink: null,
		valueLink: null
	}
];

const kingdom_terrainEnum = {
	INVALID: 0,
    PLAINS: 1,
	FOREST: 2,
	HILLS: 3
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
	},
	{
		name: "Hills",
		imageLink: "tile_hills.png",
		description: "<p>For when you want to take the high ground.</p>"
	}
];

var kingdom_landscape = [
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
	kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST
];

const kingdom_buildingEnum = {
    EMPTY: 0,
    CASTLE: 1,
	WOODCUTTER: 2,
	SHED: 3,
	QUARRY: 4,
	SAWMILL: 5
}

var kingdom_buildings = [
	{
		idNumber: kingdom_buildingEnum.EMPTY,
		name: "",
		unlocked: false,
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
		description: function() {
			return "<p>You rule your kingdom from your trusty castle. This building cannot be removed or relocated.</p><p>Labour Force + 1</p><p>Yellow Coins + 1</p><p>Exp + 1</p>";
		}
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
			if (game.kingdom.upgrades[kingdom_upgradeEnum.WOODCUTTERADJACENCY]) {
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
			}
		},
		unlocked: true,
		description: function() {
			let text = "<p>How much wood could a woodcutter cut if the woodcutter could cut wood?</p><p>Depends on how much wood is nearby.</p><p><strong>Can only be placed on forest.</strong></p><p>Wood + 1</p>";
			if (game.kingdom.upgrades[kingdom_upgradeEnum.WOODCUTTERADJACENCY]) {
				text += "<p>Wood + 1 for each adjacent forest.</p>";
			}
			return text;
		},
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
		description: function() {
			return "<p>All of the best ideas happen when working alone in a shed, unless they involve the use of power tools.</p><p><strong>Can only be placed adjacent to the Castle.</strong></p><p>Research + 1</p>";
		},
		costLabour: function() {
			return Math.floor(20 * Math.pow(2, game.kingdom.building[this.idNumber]));
		},
		costWood: function() {
			return Math.floor(10 * Math.pow(5, game.kingdom.building[this.idNumber]));
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
	},
	{
		idNumber: kingdom_buildingEnum.QUARRY,
		name: "Quarry",
		id: "kingdom_quarry",
		imageLink: "building_quarry.png",
		idLink: null,
		valueLink: null,
		costLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.stone += 1;
		},
		unlocked: false,
		description: function() {
			return "<p>It's like hunting for buried treasure, if you consider all rocks to be treasure.</p><p><strong>Can only be placed on hills.</strong></p><p>Stone + 1</p>";
		},
		cost: function() {
			return Math.floor(80 * Math.pow(3, game.kingdom.building[this.idNumber]));
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
			return kingdom_landscape[i] == kingdom_terrainEnum.HILLS;
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
		idNumber: kingdom_buildingEnum.SAWMILL,
		name: "Sawmill",
		id: "kingdom_sawmill",
		imageLink: "building_sawmill.png",
		idLink: null,
		valueLink: null,
		costLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			let x = 1;
			if (game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY]) {
				if (kingdom_getConstructionNorth(i) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionEast(i) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionSouth(i) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionWest(i) == kingdom_buildingEnum.WOODCUTTER) {
					x = 2;
				}
			}
			kingdom_outputs.wood -= x;
			kingdom_outputs.plank += x;
		},
		unlocked: false,
		description: function() {
			let text = "<p>This building is a cut above the rest.</p><p>Wood - 1</p><p>Plank + 1</p>";
			if (game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY]) {
				text += "<p>Doubled effect if adjacent to at least one Woodcutter's Hut.</p>";
			}
			return text;
		},
		costLabour: function() {
			return Math.floor(50 * Math.pow(4, game.kingdom.building[this.idNumber]));
		},
		costWood: function() {
			return Math.floor(50 * Math.pow(4, game.kingdom.building[this.idNumber]));
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
			return true;
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
	wood: 0,
	plank: 0,
	stone: 0
}

const kingdom_upgradeEnum = {
	QUARRY: 0,
	SAWMILL: 1,
	WOODCUTTERADJACENCY: 2,
	SAWMILLEFFICIENCY: 3
}

var kingdom_upgrades = [
	{
		idNumber: kingdom_upgradeEnum.QUARRY,
		name: "Quarry",
		id: "kingdom_upgrade_quarry",
		idLink: null,
		buttonLink: null,
		unlocked: true,
		description: "<p>Unlocks a new building that produces stone from hills.</p>",
		cost: function() {
			return 100;
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
				kingdom_buildings[kingdom_buildingEnum.QUARRY].unlocked = true;
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
		buttonLink: null,
		unlocked: true,
		description: "<p>Unlocks a new building that converts wood to planks.</p>",
		cost: function() {
			return 100;
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
				kingdom_buildings[kingdom_buildingEnum.SAWMILL].unlocked = true;
				kingdom_upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY].unlocked = true;
			}
		},
		costDescription: function () {
			return "<img src = './images/kingdom/" + kingdom_resources[kingdom_resourceEnum.RESEARCH].imageLink + "' alt='" + kingdom_resources[kingdom_resourceEnum.RESEARCH].name + "'/>" + displayNum(this.cost());
		}
	},
	{
		idNumber: kingdom_upgradeEnum.WOODCUTTERADJACENCY,
		name: "Woodcutter's Hut Range",
		id: "kingdom_upgrade_woodcutterAdjacency",
		idLink: null,
		buttonLink: null,
		unlocked: true,
		description: "<p>Woodcutter's Huts will produce additional wood for each forest tile adjacent to them.</p>",
		cost: function() {
			return 300;
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
		idNumber: kingdom_upgradeEnum.SAWMILLEFFICIENCY,
		name: "Sawmill Efficiency",
		id: "kingdom_upgrade_sawmillEfficiency",
		idLink: null,
		buttonLink: null,
		unlocked: false,
		description: "<p>Sawmills will convert wood to planks twice as fast if placed next to a Wooductter's Hut.</p>",
		cost: function() {
			return 500;
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
