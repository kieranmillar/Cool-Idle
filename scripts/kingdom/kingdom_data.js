const RESEARCH = 0;
const LABOUR = 1;
const WOOD = 2;

var kingdom_resources =
[
	{
		name: "Research",
		imageLink: "resource_research.png",
		amount: 0,
		income: 1
	},
	{
		name: "Labour Force",
		imageLink: "resource_labour.png",
		amount: 0,
		income: 1
	},
	{
		name: "Wood",
		imageLink: "resource_wood.png",
		amount: 0,
		income: 0
	}
];

const PLAINS = 0;
const FOREST = 1;

var kingdom_terrain = 
[
	{
		name: "Plains",
		imageLink: "tile_plains.png"
	},
	{
		name: "Forest",
		imageLink: "tile_forest.png"
	}
];

var kingdom_landscape =
[
	FOREST, FOREST, FOREST, FOREST, FOREST, FOREST, FOREST, FOREST, FOREST,
	FOREST, PLAINS, PLAINS, PLAINS, FOREST, FOREST, FOREST, FOREST, FOREST,
	FOREST, FOREST, FOREST, PLAINS, FOREST, FOREST, FOREST, PLAINS, FOREST,
	FOREST, FOREST, PLAINS, PLAINS, FOREST, PLAINS, FOREST, FOREST, FOREST,
	FOREST, FOREST, FOREST, FOREST, PLAINS, PLAINS, FOREST, FOREST, FOREST,
	FOREST, FOREST, FOREST, FOREST, PLAINS, PLAINS, PLAINS, FOREST, FOREST,
	FOREST, FOREST, FOREST, FOREST, PLAINS, PLAINS, FOREST, FOREST, FOREST,
	FOREST, FOREST, PLAINS, FOREST, FOREST, FOREST, PLAINS, PLAINS, FOREST,
	FOREST, FOREST, PLAINS, FOREST, FOREST, FOREST, FOREST, FOREST, FOREST
];

const EMPTY = 0;
const CASTLE = 1;
const WOODCUTTER = 2;

var kingdom_buildings = 
[
	{
		name: "N/A",
		imageLink: "N/A",
		amountOwned: 0
	},
	{
		name: "Castle",
		imageLink: "building_castle.png",
		amountOwned: 0
	},
	{
		name: "Woodcutter's Hut",
		imageLink: "building_woodcutter.png",
		amountOwned: 0
	}
];

var kingdom_constructions =
[
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, CASTLE, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
	EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY,
];