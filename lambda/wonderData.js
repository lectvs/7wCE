let utils = require('./utils');

const wonders = {
    '0': {
        name: 'Giza',
        side: 'Day',
        outline_color: 0x9F441C,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "stone" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["clay", "clay", "loom"] }, effects: [{ type: 'points', points: 5 }] },
            { cost: { resources: ["stone", "stone", "stone", "stone"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '1': {
        name: 'Giza',
        side: 'Night',
        outline_color: 0x9F441C,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "stone" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["stone", "stone", "stone"] }, effects: [{ type: 'points', points: 5 }] },
            { cost: { resources: ["clay", "clay", "clay"] }, effects: [{ type: 'points', points: 5 }] },
            { cost: { resources: ["stone", "stone", "stone", "stone", "press"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '2': {
        name: 'Ephesos',
        side: 'Day',
        outline_color: 0xD9A86B,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "press" }],
        stages: [
            { cost: { resources: ["clay", "clay"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'gold', gold: 9 }] },
            { cost: { resources: ["ore", "ore", "glass"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '3': {
        name: 'Ephesos',
        side: 'Night',
        outline_color: 0xD9A86B,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "press" }],
        stages: [
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'gold', gold: 4 }, { type: 'points', points: 2 }] },
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'gold', gold: 4 }, { type: 'points', points: 3 }] },
            { cost: { resources: ["ore", "ore", "loom"] }, effects: [{ type: 'gold', gold: 4 }, { type: 'points', points: 5 }] },
        ]
    },
    '4': {
        name: 'Rhodos',
        side: 'Day',
        outline_color: 0x888888,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "ore" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["clay", "clay", "clay"] }, effects: [{ type: 'shields', shields: 2 }] },
            { cost: { resources: ["ore", "ore", "ore"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '5': {
        name: 'Rhodos',
        side: 'Night',
        outline_color: 0x888888,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "ore" }],
        stages: [
            { cost: { resources: ["stone", "stone", "stone"] }, effects: [{ type: 'shields', shields: 1 }, { type: 'gold', gold: 3 }, { type: 'points', points: 3 }] },
            { cost: { resources: ["ore", "ore", "ore", "ore"] }, effects: [{ type: 'shields', shields: 1 }, { type: 'gold', gold: 4 }, { type: 'points', points: 4 }] },
        ]
    },
    '6': {
        name: 'Alexandria',
        side: 'Day',
        outline_color: 0x3185D8,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "glass" }],
        stages: [
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["ore", "ore"] }, effects: [{ type: "multi_resource", resources: "wood/stone/ore/clay", purchasable: false }] },
            { cost: { resources: ["press", "loom"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '7': {
        name: 'Alexandria',
        side: 'Night',
        outline_color: 0x3185D8,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "glass" }],
        stages: [
            { cost: { resources: ["clay", "clay"] }, effects: [{ type: "multi_resource", resources: "wood/stone/ore/clay", purchasable: false }] },
            { cost: { resources: ["ore", "ore", "ore"] }, effects: [{ type: "multi_resource", resources: "glass/press/loom", purchasable: false }] },
            { cost: { resources: ["wood", "wood", "wood", "wood"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '8': {
        name: 'Olympia',
        side: 'Day',
        outline_color: 0xFFFFFF,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "clay" }],
        stages: [
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'build_free_first_color' }] },
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 5 }] },
            { cost: { resources: ["clay", "clay", "clay"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '9': {
        name: 'Olympia',
        side: 'Night',
        outline_color: 0xFFFFFF,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "clay" }],
        stages: [
            { cost: { resources: ["ore", "ore"] }, effects: [{ type: 'build_free_first_card' }, { type: 'points', points: 2 }] },
            { cost: { resources: ["clay", "clay", "clay"] }, effects: [{ type: 'build_free_last_card' }, { type: 'points', points: 3 }] },
            { cost: { resources: ["glass", "press", "loom"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '10': {
        name: 'Babylon',
        side: 'Day',
        outline_color: 0x2E7A0D,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "wood" }],
        stages: [
            { cost: { resources: ["clay", "clay"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["ore", "ore", "loom"] }, effects: [{ type: "multi_science", symbols: "compass/tablet/gear" }] },
            { cost: { resources: ["wood", "wood", "wood", "wood"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '11': {
        name: 'Babylon',
        side: 'Night',
        outline_color: 0x2E7A0D,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "wood" }],
        stages: [
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'play_last_card' }] },
            { cost: { resources: ["clay", "clay", "clay", "glass"] }, effects: [{ type: "multi_science", symbols: "compass/tablet/gear" }] },
        ]
    },
    '12': {
        name: 'Halikarnassos',
        side: 'Day',
        outline_color: 0x4F00B7,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "loom" }],
        stages: [
            { cost: { resources: ["clay", "clay"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["ore", "ore"] }, effects: [{ type: 'build_from_discard', priority: 100 }] },
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '13': {
        name: 'Halikarnassos',
        side: 'Night',
        outline_color: 0x4F00B7,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "loom" }],
        stages: [
            { cost: { resources: ["ore", "ore"] }, effects: [{ type: 'build_from_discard', priority: 100 }, { type: 'points', points: 2 }] },
            { cost: { resources: ["clay", "clay", "clay"] }, effects: [{ type: 'build_from_discard', priority: 100 }, { type: 'points', points: 1 }] },
            { cost: { resources: ["glass", "press"] }, effects: [{ type: 'build_from_discard', priority: 100 }] },
        ]
    },
    '14': {
        name: 'Olympia',
        side: 'A',
        outline_color: 0xFFFFFF,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "wood" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'build_free_once_per_age' }] },
            { cost: { resources: ["ore", "ore"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '15': {
        name: 'Olympia',
        side: 'B',
        outline_color: 0xFFFFFF,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "wood" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'double_trading_post' }] },
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'points', points: 5 }] },
            { cost: { resources: ["loom", "ore", "ore"] }, effects: [{ type: 'copy_guild' }] },
        ]
    },
    '16': {
        name: 'Byzantium',
        side: 'Day',
        outline_color: 0xFF70BA,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "stone" }],
        stages: [
            { cost: { resources: ["ore", "clay"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { resources: ["wood", "wood", "press"] }, effects: [{ type: 'dove' }, { type: 'points', points: 4 }] },
            { cost: { resources: ["clay", "clay", "glass", "loom"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '17': {
        name: 'Byzantium',
        side: 'Night',
        outline_color: 0xFF70BA,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "stone" }],
        stages: [
            { cost: { resources: ["wood", "ore", "press"] }, effects: [{ type: 'dove' }, { type: 'points', points: 4 }] },
            { cost: { resources: ["ore", "ore", "glass", "loom"] }, effects: [{ type: 'dove' }, { type: 'points', points: 6 }] },
        ]
    },
    '18': {
        name: 'Petra',
        side: 'Day',
        outline_color: 0xFF5533,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "clay" }],
        stages: [
            { cost: { resources: ["wood", "stone"] }, effects: [{ type: 'points', points: 3 }] },
            { cost: { gold: 5 }, effects: [{ type: 'points', points: 7 }] },
            { cost: { resources: ["stone", "stone", "wood", "press"] }, effects: [{ type: 'points', points: 7 }] },
        ]
    },
    '19': {
        name: 'Petra',
        side: 'Night',
        outline_color: 0xFF5533,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "clay" }],
        stages: [
            { cost: { resources: ["ore", "ore", "clay", "clay"] }, effects: [{ type: 'broken_gold', gold: 2 }, { type: 'points', points: 3 }] },
            { cost: { gold: 10 }, effects: [{ type: 'points', points: 14 }] },
        ]
    },
    '20': {
        name: 'The Great Wall',
        side: 'A',
        outline_color: 0xD89000,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "loom" }, { type: "turret" }],
        stages: [
            { cost: { resources: ["wood", "wood"] }, effects: [{ type: 'gold', gold: 8 }] },
            { cost: { resources: ["press", "glass", "clay"] }, effects: [{ type: "multi_science", symbols: "compass/tablet/gear" }] },
            { cost: { resources: ["stone", "stone", "stone"] }, effects: [{ type: 'shields', shields: 2 }] },
            { cost: { resources: ["ore", "ore", "ore"] }, effects: [{ type: 'build_from_discard', priority: 75 }] },
        ]
    },
    '21': {
        name: 'The Great Wall',
        side: 'B',
        outline_color: 0xD89000,
        starting_effect_color: "grey",
        starting_effects: [{ type: "resource", resource: "loom" }, { type: "turret" }],
        stages: [
            { cost: { resources: ["press", "wood"] }, effects: [{ type: "gold_for_neighbor", gold: 2, direction: "neg" }, { type: "gold", gold: 8 }, { type: "gold_for_neighbor", gold: 2, direction: "pos" }] },
            { cost: { resources: ["ore", "clay", "clay"] }, effects: [{ type: "mask" }] },
            { cost: { resources: ["press", "wood", "wood"] }, effects: [{ type: 'dove' }, { type: 'broken_gold', gold: 2 }] },
            { cost: { resources: ["stone", "stone"] }, effects: [{ type: 'unproduced_resource' }] },
        ]
    },
    '22': {
        name: 'Manneken Pis',
        side: 'A',
        outline_color: 0xF2AA0C,
        starting_effect_color: "yellow",
        starting_effects: [{ type: "gold", gold: 4 }],
        stages: [
            { effects: [], copy_stage: { stage: 'first', dir: 'neg' } },
            { effects: [], copy_stage: { stage: 'second', dir: 'pos' } },
            { effects: [], copy_stage: { stage: 'last', dir: 'neg' } },
        ]
    },
    '23': {
        name: 'Manneken Pis',
        side: 'B',
        outline_color: 0xF2AA0C,
        starting_effect_color: "yellow",
        starting_effects: [{ type: "gold", gold: 4 }],
        stages: [
            { cost: { resources: ["glass", "press", "loom", "ore", "clay", "stone", "wood"] }, effects: [{ type: 'gold', gold: 7 }, { type: 'points', points: 7 }, { type: 'shields', shields: 1 }] },
        ]
    },
    '100': {
        name: 'Test',
        side: 'A',
        outline_color: 0x00BB00,
        starting_effect_color: "brown",
        starting_effects: [{ type: "resource", resource: "wood" }],
        stages: [
            { cost: { resources: ["wood"] }, effects: [{ type: 'build_from_discard', priority: 100 }] },
            { cost: { resources: ["wood"] }, effects: [{ type: 'build_from_discard', priority: 100 }] },
            { cost: { resources: ["wood"] }, effects: [{ type: 'build_from_discard', priority: 100 }] },
            { effects: [{ type: 'build_from_discard', priority: 100 }] },
        ]
    },
}

const wonderGroups = {
    '0': {
        name: 'Giza',
        wonders: [0, 1]
    },
    '1': {
        name: 'Ephesos',
        wonders: [2, 3]
    },
    '2': {
        name: 'Rhodos',
        wonders: [4, 5]
    },
    '3': {
        name: 'Alexandria',
        wonders: [6, 7]
    },
    '4': {
        name: 'Olympia',
        wonders: [8, 9]
    },
    '5': {
        name: 'Babylon',
        wonders: [10, 11]
    },
    '6': {
        name: 'Halikarnassos',
        wonders: [12, 13]
    },
    '7': {
        name: 'Olympia (Old Ed.)',
        wonders: [14, 15]
    },
    '8': {
        name: 'Byzantium',
        wonders: [16, 17]
    },
    '9': {
        name: 'Petra',
        wonders: [18, 19]
    },
}

exports.idsToWonderPreferences = (ids) => {
    ids = utils.cloneArray(ids);
    for (let id of Object.keys(wonderGroups)) {
        if (!ids.includes(id)) {
            ids.push(id);
        }
    }
    return ids.map(id => ({ id, name: wonderGroups[id].name }));
}

exports.getWonderChoicesForPlayers = (players, wonderPreferences, isDebug) => {
    // Select wonders to use
    let wonderGroupIds = Object.keys(wonderGroups);
    //wonderGroupIds.splice(wonderGroupIds.indexOf('10'), 1);  // Remove placeholders (uncomment when there are new placeholders)
    wonderGroupIds = utils.shuffled(wonderGroupIds);
    wonderGroupIds.splice(0, wonderGroupIds.length - players.length - 1);  // Use {players+1} wonders in the pool
    
    // Assign wonders to players in the order they are passed in
    let result = {};
    for (let player of players) {
        let preferredWonderIndex = utils.randInt(0, wonderGroupIds.length-1);
        if (player in wonderPreferences) {
            for (let pref of wonderPreferences[player]) {
                let i = wonderGroupIds.indexOf(pref);
                if (i >= 0) {
                    preferredWonderIndex = i;
                    break;
                }
            }
        }
        
        let preferredWonderId = wonderGroupIds.splice(preferredWonderIndex, 1)[0];
        let wonderGroup = wonderGroups[preferredWonderId];
        result[player] = wonderGroup.wonders.map(id => wonders[id]);
    }
    
    if (isDebug) {
        result['Dartm'] = [wonders['22']];
        //result['BOT1'] = [wonders['22']];
        result['BOT2'] = [wonders['20']];
    }
    
    return result;
}
