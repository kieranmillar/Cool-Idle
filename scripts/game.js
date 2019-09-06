var game = {
    previousTick: 0,
	exp: 0,
	level: 1,
	yellowCoins: 0,
    greenCoins: 0,
    blueCoins: 0,
    kingdom: {
        unlocked: false,
        research: 0,
        labour: 0,
        wood: 0,
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