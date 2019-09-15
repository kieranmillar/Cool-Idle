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

/*Array of data structures for resources
-----
idNumber: The idNumber according to its position in the array. kingdom_resourceEnum should match this
name: String containing displayed resource name. This only shows up in the image alt text
id: String containing the html id for the container div in the resource panel
imageLink: The name of the image stored in ../images/kingdom/
value: String containing the html id for the span that stores the amount of the resource you have
idLink: should be included but set to null. kingdom_init() will set this to the html container div element so we don't have to search the DOM for it again
valueLink: should be included but set to null. kingdom_init() will set this to the html span element so we don't have to search the DOM for it again
-----*/
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
	WATER: 4,
	VOLCANO: 5
}

//TODO: Eventually the description might want to be a lambda function so we can update later e.g. when we unlock the ability to claim water tiles
/*Array of data structures for terrain
-----
name: String containing displayed resource name.
imageLink: The name of the image stored in ../images/kingdom/
description: The html of the description we want to show in the infopanel when you mouse over an unoccupied tile on the map
-----*/
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
		description: "<p>Wood you believe it, there's trees growing here!</p><p>Is a source of wood.</p>"
	},
	{
		name: "Hills",
		imageLink: "tile_hills.png",
		description: "<p>For when you want to take the high ground.</p>"
	},
	{
		name: "Water",
		imageLink: "tile_water.png",
		description: "<p>It's like rain, except on the ground.</p><p>Is a source of water.</p><p><strong>Most buildings cannot be placed on this tile.</strong></p><p class='kingdom_infoPanel_red'>You do not yet have the means to claim water tiles.</p>"
	},
	{
		name: "Volcano",
		imageLink: "tile_volcano.png",
		description: "<p>Prime real estate for super-villains.</p><p>Is a source of heat.</p><p><strong>Buildings cannot be placed on this tile.</strong></p>"
	}
];

//Stores the map layout. The player cannot change this so no need to store it in the game object.
const kingdom_landscape = [
    kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.WATER, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST,
    
    kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.WATER, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS,
    
    kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS,
    
    kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS,
    
    kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.WATER,
    
    kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER,
    
    kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.FOREST, kingdom_terrainEnum.WATER, kingdom_terrainEnum.VOLCANO, kingdom_terrainEnum.WATER,
    
	kingdom_terrainEnum.HILLS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.PLAINS, kingdom_terrainEnum.HILLS, kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER, kingdom_terrainEnum.WATER
];

const kingdom_buildingEnum = {
    EMPTY: 0,
    CASTLE: 1,
	WOODCUTTER: 2,
	SHED: 3,
	QUARRY: 4,
	SAWMILL: 5,
	LOGCABIN: 6,
	BARRACKS: 7,
	ROAD: 8
}

/*Array of data structures for buildings
-----
idNumber: The idNumber according to its position in the array. kingdom_buildingEnum should match this
name: String containing displayed building name.
id: String containing the html id for the container div in the building panel
imageLink: A lambda function that returns the name of the image stored in ../images/kingdom/ . Takes the terrain type as an argument
idLink: should be included but set to null. kingdom_init() will set this to the html container div element so we don't have to search the DOM for it again
valueLink: should be included but set to null. kingdom_init() will set this to the html span element so we don't have to search the DOM for it again
buildButtonLink: should be included but set to null. kingdom_init() will set this to the html build button element so we don't have to search the DOM for it again
placeButtonLink: should be included but set to null. kingdom_init() will set this to the html place button element so we don't have to search the DOM for it again
output: A lambda function that is called by kingdom_calculateOutput(). Takes the cell number as an argument. Should set the appropriate values in kindom_outputs, and also update kingdom_failMap if the building is non-functional
unlocked: Boolean if the building has been unlocked. This should show the unlock state at the start of a new game, kingdom_unlocks() may change it later
description: A lambda function returning the html of the description we want to show in the infopanel when you mouse over it on the building panel or map
cost: An array of data objects detailing each resource cost for this building:
--type: The resource type
--base: The amount of this resource needed for the first time you build this building
--factor: A multiplier for how much the cost of this resource increases each time you build this building
--link: should be included but set to null. kingdom_init() will set this to the html resource value element so we don't have to search the DOM for it again
canPlace: A lambda function returning true or false if the building can be placed on a tile. Takes the tile as an argument. Determining if it can be placed on water is done elsewhere. If can be placed on any terrain (except water or the volcano), just immediately return true.
aquatic: Boolean if this building is placed on water or not.
-----*/
var kingdom_buildings = [
	{
		idNumber: kingdom_buildingEnum.EMPTY,
		name: "",
		unlocked: false,
	},
	{
		idNumber: kingdom_buildingEnum.CASTLE,
		name: "Castle",
		imageLink: function (terrain) {
			return "building_castle.png";
		},
        output: function (cell) {
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
		imageLink: function (terrain) {
			return "building_woodcutter.png";
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
			kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
			if (game.kingdom.upgrades[kingdom_upgradeEnum.WOODCUTTERADJACENCY]) {
				if (kingdom_getTerrainNorth(cell) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionNorth(cell) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainEast(cell) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionEast(cell) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainSouth(cell) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionSouth(cell) == kingdom_buildingEnum.EMPTY) {
					kingdom_outputs.resource[kingdom_resourceEnum.WOOD] += 1;
				}
				if (kingdom_getTerrainWest(cell) == kingdom_terrainEnum.FOREST
				&& kingdom_getConstructionWest(cell) == kingdom_buildingEnum.EMPTY) {
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
		canPlace: function (cell) {
			return kingdom_landscape[cell] == kingdom_terrainEnum.FOREST;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.SHED,
		name: "Shed",
		id: "kingdom_shed",
		imageLink: function (terrain) {
			switch (terrain) {
				case kingdom_terrainEnum.HILLS:
					return "building_shed_hills.png";
					break;
				case kingdom_terrainEnum.FOREST:
					return "building_shed_forest.png";
					break;
				case kingdom_terrainEnum.PLAINS:
				default:
					return "building_shed_plains.png";
					break;
			}
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
			if (kingdom_roadMap[cell] == 1) {
				kingdom_outputs.resource[kingdom_resourceEnum.RESEARCH] += 1;
			}
			else {
				kingdom_failMap[cell] = 1;
			}
		},
		unlocked: true,
		description: function() {
			return "<p>All of the best ideas happen when working alone in a shed, unless they involve the use of power tools.</p>" + kingdom_getCastleAdjacentRequirementText() + "<p>Research + 1</p>";
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
		canPlace: function (cell) {
			return kingdom_roadMap[cell] == 1;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.QUARRY,
		name: "Quarry",
		id: "kingdom_quarry",
		imageLink: function (terrain) {
			return "building_quarry.png";
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
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
		canPlace: function (cell) {
			return kingdom_landscape[cell] == kingdom_terrainEnum.HILLS;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.SAWMILL,
		name: "Sawmill",
		id: "kingdom_sawmill",
		imageLink: function (terrain) {
			switch (terrain) {
				case kingdom_terrainEnum.HILLS:
					return "building_sawmill_hills.png";
					break;
				case kingdom_terrainEnum.FOREST:
					return "building_sawmill_forest.png";
					break;
				case kingdom_terrainEnum.PLAINS:
				default:
					return "building_sawmill_plains.png";
					break;
			}
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
			let x = 1;
			if (game.kingdom.upgrades[kingdom_upgradeEnum.SAWMILLEFFICIENCY]) {
				if (kingdom_getConstructionNorth(cell) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionEast(cell) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionSouth(cell) == kingdom_buildingEnum.WOODCUTTER
				|| kingdom_getConstructionWest(cell) == kingdom_buildingEnum.WOODCUTTER) {
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
		canPlace: function (cell) {
			return true;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.LOGCABIN,
		name: "Log Cabin",
		id: "kingdom_logCabin",
		imageLink: function (terrain) {
			switch (terrain) {
				case kingdom_terrainEnum.HILLS:
					return "building_logcabin_hills.png";
					break;
				case kingdom_terrainEnum.FOREST:
					return "building_logcabin_forest.png";
					break;
				case kingdom_terrainEnum.PLAINS:
				default:
					return "building_logcabin_plains.png";
					break;
			}
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
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
		canPlace: function (cell) {
			return true;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.BARRACKS,
		name: "Barracks",
		id: "kingdom_barracks",
		imageLink: function (terrain) {
			switch (terrain) {
				case kingdom_terrainEnum.HILLS:
					return "building_barracks_hills.png";
					break;
				case kingdom_terrainEnum.FOREST:
					return "building_barracks_forest.png";
					break;
				case kingdom_terrainEnum.PLAINS:
				default:
					return "building_barracks_plains.png";
					break;
			}
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
			let x = 1;
			if (kingdom_roadMap[cell] == 1) {
				x = 2;
			}
			kingdom_outputs.resource[kingdom_resourceEnum.MILITARY] += x;
		},
		unlocked: false,
		description: function() {
			return "<p>This building trains missionaries to spread the word of how great your leadership is, which encourages nearby lands to willingly join your side. Any claims otherwise are biased propoganda from our enemies.</p><p>Military + 1</p><p>Doubled effect " + kingdom_getCastleAdjacentBonusText() + "</p>";
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
		canPlace: function (cell) {
			return true;
		},
		aquatic: false
	},
	{
		idNumber: kingdom_buildingEnum.ROAD,
		name: "Road",
		id: "kingdom_road",
		imageLink: function (terrain) {
			switch (terrain) {
				case kingdom_terrainEnum.HILLS:
					return "building_road_hills.png";
					break;
				case kingdom_terrainEnum.FOREST:
					return "building_road_forest.png";
					break;
				case kingdom_terrainEnum.PLAINS:
				default:
					return "building_road_plains.png";
					break;
			}
		},
		idLink: null,
		valueLink: null,
		buildButtonLink: null,
		placeButtonLink: null,
        output: function (cell) {
			if (kingdom_roadMap[cell] != 1) {
				kingdom_failMap[cell] = 1;
			}
		},
		unlocked: false,
		description: function() {
			return "<p>Follow the grey stone road.</p><p>Any building adjacent to a road counts as being adjacent to the Castle, provided the road ultimately links back to the Castle.</p><p>Any road that does not link back to the Castle has no effect.</p>" + kingdom_getCastleAdjacentRequirementText();
		},
		cost: [
			{
				type: kingdom_resourceEnum.LABOUR,
				base: 250,
				factor: 2,
				link: null
			},
			{
				type: kingdom_resourceEnum.STONE,
				base: 500,
				factor: 3,
				link: null
			}
		],
		canPlace: function (cell) {
			return kingdom_roadMap[cell] == 1;
		},
		aquatic: false
	}
];

//Returns html for use in the infoPanels if placing next to the Castle or its road network is a requirement
function kingdom_getCastleAdjacentRequirementText() {
	let text = "<p><strong>Can only be placed adjacent to the Castle";
	if (game.kingdom.upgrades[kingdom_upgradeEnum.ROAD]) {
		text += " or a road network connected to the Castle";
	}
	text += ".</strong></p>";
	return text;
}

//Returns text for use in the infoPanels if placing next to the Castle or its road network provides a bonus but is not required
function kingdom_getCastleAdjacentBonusText() {
	let text = "if adjacent to the Castle";
	if (game.kingdom.upgrades[kingdom_upgradeEnum.ROAD]) {
		text += " or a road network connected to the Castle";
	}
	text += ".";
	return text;
}

//This object stores the data for income each tick.
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
	BARRACKS: 5,
	ROAD: 6
}

/*Array of data structures for upgrades
-----
idNumber: The idNumber according to its position in the array. kingdom_upgradeEnum should match this
name: String containing displayed upgrade name.
id: String containing the html id for the container div in the building panel
idLink: should be included but set to null. kingdom_init() will set this to the html container div element so we don't have to search the DOM for it again
buttonLink: should be included but set to null. kingdom_init() will set this to the html Purchase button element so we don't have to search the DOM for it again
unlocked: Boolean if the upgrade has been unlocked. This should show the unlock state at the start of a new game, kingdom_unlocks() may change it later
description: The html of the description we want to show in the infopanel when you mouse over it on the building panel
cost: An array of data objects detailing each resource cost for this building:
--type: The resource type
--value: The amount of this resource needed to buy it
-----*/
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
	},
	{
		idNumber: kingdom_upgradeEnum.ROAD,
		name: "Roads",
		id: "kingdom_upgrade_road",
		idLink: null,
		buttonLink: null,
		unlocked: false,
		description: "<p>Unlocks a new building that creates a road network from the Castle. Buildings adjacent to a road that leads back to the Castle can be considered adjacent to the Castle.</p>",
		cost: [
			{
				type: kingdom_resourceEnum.RESEARCH,
				value: 5000
			}
		]
	}
]
