-- SHARED
Config = { 

    Framework = "qb-core",

    -- Models of the fighters. Name or hash
    FighterModels = {238213328, 1082572151, 1404403376, 516505552, -1299428795, -1773858377, 539004493, 1625728984},

    Locations = {
        [1] = {
            -- Location of the fight controller
            gameMaster = {coords = vector3(-148.87371826172,-971.10675048828,21.27684211731-0.98), heading = 90.0, ped = -815646164},

            -- Max bet amount at this location
            maxBetAmount = 24000,

            -- Fighter positions before the fight
            spawnPositions = {
                [1] = {coords = vector3(-151.53042602539,-968.27740478516,21.276865005493-0.98), heading = 160.0},
                [2] = {coords = vector3(-149.92428588867,-968.88201904297,21.276865005493-0.98), heading = 160.0},
            },

            -- Start positions for the fighters
            startPositions = {
                [1] = {coords = vector3(-151.53042602539,-968.27740478516,21.276865005493-0.98), heading = 160.0},
                [2] = {coords = vector3(-149.92428588867,-968.88201904297,21.276865005493-0.98), heading = 160.0},
            },
        },
        [2] = {
            gameMaster = {coords = vector(-157.13, -993.38, 21.28-0.98), heading = 67.5, ped = -815646164},

            maxBetAmount = 24000,

            spawnPositions = {
                [1] = {coords = vector3(-160.38, -996.05, 21.28), heading = 343.4},
                [2] = {coords = vector3(-163.36, -995.05, 21.28), heading = 343.4},
            },

            startPositions = {
                [1] = {coords = vector3(-160.65, -1001.01, 21.28), heading = 160.0},
                [2] = {coords = vector3(-169.24, -998.07, 21.28), heading = 160.0},
            }
        }
    },
}

