var game = {
    version: 1,
    previousTick: 0,
	exp: 0,
	level: 1,
	yellowCoins: 0,
    greenCoins: 0,
    blueCoins: 0,
    kingdom: {
        unlocked: false,
        resource: {
            research: 0,
            labour: 0,
            wood: 0
        },
        building: {
            woodcutter: 0
        },
        constructions: [
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,

            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.CASTLE, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY,
            
            kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY, kingdom_buildingEnum.EMPTY
        ]
    }
};
