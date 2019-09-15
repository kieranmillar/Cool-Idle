const kingdom_claimTileCostBase = 500;
const kingdom_claimTileCostFactor = 2;

const kingdom_resourceEnum = {
	RESEARCH: 0,
	LABOUR: 1,
	MILITARY: 2,
	WOOD: 3,
	PLANK: 4,
	STONE: 5
}

var kingdom_resources = [
	{
		idNumber: kingdom_resourceEnum.RESEARCH,
		name: "Research",
		id: "kingdom_research",
		imageLink: "resource_research.png",
		value: "kingdom_research_amount",
		idLink: null,
		valueLink: null
	},
	{
		idNumber: kingdom_resourceEnum.LABOUR,
		name: "Labour",
		id: "kingdom_labour",
		imageLink: "resource_labour.png",
		value: "kingdom_labour_amount",
		idLink: null,
		valueLink: null
	},
	{
		idNumber: kingdom_resourceEnum.MILITARY,
		name: "Military",
		id: "kingdom_military",
		imageLink: "resource_military.png",
		value: "kingdom_military_amount",
		idLink: null,
		valueLink: null
	},
	{
		idNumber: kingdom_resourceEnum.WOOD,
		name: "Wood",
		id: "kingdom_wood",
		imageLink: "resource_wood.png",
		value: "kingdom_wood_amount",
		idLink: null,
		valueLink: null
	},
	{
		idNumber: kingdom_resourceEnum.PLANK,
		name: "Plank",
		id: "kingdom_plank",
		imageLink: "resource_plank.png",
		value: "kingdom_plank_amount",
		idLink: null,
		valueLink: null
	},
	{
		idNumber: kingdom_resourceEnum.STONE,
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
	HILLS: 3,
	WATER: 4
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
	},
	{
		name: "Water",
		imageLink: "tile_water.png",
		description: "<p>It's like rain, except on the ground.</p><p>Most buildings cannot be placed on this tile.</p><p>You probably shouldn't claim this tile until you get a building you can place on it.</p>"
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
	SAWMILL: 5,
	LOGCABIN: 6,
	BARRACKS: 7
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
            kingdom_outputs.resource[kingdom_resourceEnum.LABOUR] += 1;
            kingdom_outputs.yellowCoins += 1;
			kingdom_outputs.exp += 1;
		},
		unlocked: false,
		description: function() {
			let text = "<p>You rule your kingdom from your trusty castle. This building cannot be removed or relocated.</p><p>Labour + 1</p><p>Yellow Coins + 1</p><p>Exp + 1</p>";
			return text;
		}
	},
	{
		idNumber: kingdom_buildingEnum.WOODCUTTER,
		name: "Woodcutter's Hut",
		id: "kingdom_woodcutter",
		imageLink: "building_woodcutter.png",
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
			if (game.kingdom.upgrades[kingdom_upgradeEnum.WOODCUTTERADJACENCY]) {
				if (kingdom_getTerrainNorth(i) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionNorth(i) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainEast(i) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionEast(i) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainSouth(i) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionSouth(i) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainWest(i) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionWest(i) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
			}
		},
		unlocked: true,
		description: function() {
			let text = "<p>How much wood could a woodcutter cut if the woodcutter could cut wood?</p><p>Depends on how much wood is nearby.</p><p><strong>Can only be placed on forest.</strong></p><p>Wood + 1</p>";
			if (game.kingdom.upgrades[kingdom_upgradeEnum.WOODCUTTERADJACENCY]) {
				text += "<p>Wood + 1 for each adjacent unoccupied forest.</p>";
			}
			return text;
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 20,
				factor: 3,
				link: null
			}
		],
		canPlace: function (i) {
			return kingdom_landscape[i] == kingdom_terrainEnum.FOREST;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.SHED,
		name: "Shed",
		id: "kingdom_shed",
		imageLink: "building_shed.png",
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.resource[kingdom_resourceEnum.RESEARCH] += 1;
		},
		unlocked: true,
		description: function() {
			return "<p>All of the best ideas happen when working alone in a shed, unless they involve the use of power tools.</p><p><strong>Can only be placed adjacent to the Castle.</strong></p><p>Research + 1</p>";
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 20,
				factor: 2,
				link: null
			},
			{
				type: kingdom_resourceEnum.WOOD,
				base: 10,
				factor: 5,
				link: null
			}
		],
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
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.QUARRY,
		name: "Quarry",
		id: "kingdom_quarry",
		imageLink: "building_quarry.png",
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.resource[kingdom_resourceEnum.STONE] += 1;
		},
		unlocked: false,
		description: function() {
			return "<p>It's like hunting for buried treasure, if you consider all rocks to be treasure.</p><p><strong>Can only be placed on hills.</strong></p><p>Stone + 1</p>";
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 80,
				factor: 3,
				link: null
			}
		],
		canPlace: function (i) {
			return kingdom_landscape[i] == kingdom_terrainEnum.HILLS;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.SAWMILL,
		name: "Sawmill",
		id: "kingdom_sawmill",
		imageLink: "building_sawmill.png",
		idLink: null,
		valueLink: null,
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
			kingdom_outputs.conversion.sawmill += x;
		},
		unlocked: false,
		description: function() {
			let text = "<p>This building is a cut above the rest.</p><p>Converts 1 Wood into 1 Plank</p>";
			if (game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY]) {
				text += "<p>Doubled effect if adjacent to at least one Woodcutter's Hut.</p>";
			}
			return text;
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 50,
				factor: 4,
				link: null
			},
			{
				type: kingdom_resourceEnum.WOOD,
				base: 50,
				factor: 4,
				link: null
			}
		],
		canPlace: function (i) {
			return true;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.LOGCABIN,
		name: "Log Cabin",
		id: "kingdom_logCabin",
		imageLink: "building_logcabin.png",
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			kingdom_outputs.resource[kingdom_resourceEnum.LABOUR] += 1;
		},
		unlocked: false,
		description: function() {
			return "<p>A place for your worker drones to live. I mean citizens.</p><p>Labour + 1</p>";
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 100,
				factor: 3,
				link: null
			},
			{
				type: kingdom_resourceEnum.WOOD,
				base: 500,
				factor: 3,
				link: null
			},
			{
				type: kingdom_resourceEnum.PLANK,
				base: 200,
				factor: 3,
				link: null
			},
			{
				type: kingdom_resourceEnum.STONE,
				base: 100,
				factor: 3,
				link: null
			}
		],
		canPlace: function (i) {
			return true;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.BARRACKS,
		name: "Barracks",
		id: "kingdom_logCabinbarracks",
		imageLink: "building_barracks.png",
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (i) {
			let x = 1;
			if (kingdom_getConstructionNorth(i) == kingdom_buildingEnum.CASTLE
			|| kingdom_getConstructionEast(i) == kingdom_buildingEnum.CASTLE
			|| kingdom_getConstructionSouth(i) == kingdom_buildingEnum.CASTLE
			|| kingdom_getConstructionWest(i) == kingdom_buildingEnum.CASTLE) {
				x = 2;
			}
			kingdom_outputs.resource[kingdom_resourceEnum.MILITARY] += x;
		},
		unlocked: false,
		description: function() {
			return "<p>This building trains missionaries to spread the word of how great your leadership is, which encourages nearby lands to willingly join your side. Any claims otherwise are biased propoganda from our enemies.</p><p>Military + 1</p><p>Doubled effect if adjacent to the Castle.</p>";
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 200,
				factor: 3,
				link: null
			},
			{
				type: kingdom_resourceEnum.PLANK,
				base: 100,
				factor: 2,
				link: null
			},
			{
				type: kingdom_resourceEnum.STONE,
				base: 300,
				factor: 4,
				link: null
			}
		],
		canPlace: function (i) {
			return true;
		},
		aquatic: false
	}
];

var kingdom_outputs = {
    yellowCoins: 0,
	exp: 0,
	resource: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    conversion: {
		sawmill: 0
	},
	resourceDisplay: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

const kingdom_upgradeEnum = {
	QUARRY: 0,
	SAWMILL: 1,
	WOODCUTTERADJACENCY: 2,
	LOGCABIN: 3,
	SAWMILLEFFICIENCY: 4,
	BARRACKS: 5
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
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 100
			}
		]
	},
	{
		idNumber: kingdom_upgradeEnum.SAWMILL,
		name: "Sawmill",
		id: "kingdom_upgrade_sawmill",
		idLink: null,
		buttonLink: null,
		unlocked: true,
		description: "<p>Unlocks a new building that converts wood to planks.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 100
			}
		]
	},
	{
		idNumber: kingdom_upgradeEnum.WOODCUTTERADJACENCY,
		name: "Woodcutter's Hut Range",
		id: "kingdom_upgrade_woodcutterAdjacency",
		idLink: null,
		buttonLink: null,
		unlocked: true,
		description: "<p>Woodcutter's Huts will produce additional wood for each unoccupied forest tile adjacent to them.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 300
			}
		]
	},
	{
		idNumber: kingdom_upgradeEnum.LOGCABIN,
		name: "Log Cabin",
		id: "kingdom_upgrade_logcabin",
		idLink: null,
		buttonLink: null,
		unlocked: false,
		description: "<p>Unlocks a new building that produces labour.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 500
			}
		]
	},
	{
		idNumber: kingdom_upgradeEnum.SAWMILLEFFICIENCY,
		name: "Sawmill Efficiency",
		id: "kingdom_upgrade_sawmillEfficiency",
		idLink: null,
		buttonLink: null,
		unlocked: false,
		description: "<p>Sawmills will convert wood to planks twice as fast if placed adjacent to at least one Woodcutter's Hut.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 500
			}
		]
	},
	{
		idNumber: kingdom_upgradeEnum.BARRACKS,
		name: "Barracks",
		id: "kingdom_upgrade_barracks",
		idLink: null,
		buttonLink: null,
		unlocked: false,
		description: "<p>Unlocks a new building that produces military.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 800
			}
		]
	}
]
