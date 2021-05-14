const utils = require('./utils');

const cards = {
    /* Age 1 */
    0:  { age: 1, name: 'Stone Pit',   color: "brown", effects: [{ type: "resource", resource: "stone" }] },
    1:  { age: 1, name: 'Clay Pool',   color: "brown", effects: [{ type: "resource", resource: "clay" }] },
    2:  { age: 1, name: 'Ore Vein',    color: "brown", effects: [{ type: "resource", resource: "ore" }] },
    3:  { age: 1, name: 'Lumber Yard', color: "brown", effects: [{ type: "resource", resource: "wood" }] },
    4:  { age: 1, name: 'Tree Farm',   color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "wood/clay", purchasable: true }] },
    5:  { age: 1, name: 'Excavation',  color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "stone/clay", purchasable: true }] },
    6:  { age: 1, name: 'Clay Pit',    color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "ore/clay", purchasable: true }] },
    7:  { age: 1, name: 'Timber Yard', color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "wood/stone", purchasable: true }] },
    8:  { age: 1, name: 'Forest Cave', color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "wood/ore", purchasable: true }] },
    9:  { age: 1, name: 'Mine',        color: "brown", cost: { gold: 1 }, effects: [{ type: "multi_resource", resources: "stone/ore", purchasable: true }] },
    10: { age: 1, name: 'Loom',        color: "grey", effects: [{ type: "resource", resource: "loom" }] },
    11: { age: 1, name: 'Glassworks',  color: "grey", effects: [{ type: "resource", resource: "glass" }] },
    12: { age: 1, name: 'Press',       color: "grey", effects: [{ type: "resource", resource: "press" }] },
    13: { age: 1, name: 'Theater',     color: "blue", effects: [{ type: "points", points: 3 }], chains: ["mask"] },
    14: { age: 1, name: 'Well',        color: "blue", effects: [{ type: "points", points: 3 }], chains: ["hammer"] },
    15: { age: 1, name: 'Altar',       color: "blue", effects: [{ type: "points", points: 3 }], chains: ["star"] },
    16: { age: 1, name: 'Baths',       color: "blue", cost: { resources: ["stone"] }, effects: [{ type: "points", points: 3 }], chains: ["droplet"] },
    17: { age: 1, name: 'East Trading Post', color: "yellow", effects: [{ type: "trading_post", direction: "pos" }], chains: ["market"] },
    18: { age: 1, name: 'West Trading Post', color: "yellow", effects: [{ type: "trading_post", direction: "neg" }], chains: ["market"] },
    19: { age: 1, name: 'Marketplace', color: "yellow", effects: [{ type: "marketplace" }], chains: ["camel"] },
    20: { age: 1, name: 'Tavern',      color: "yellow", effects: [{ type: "gold", gold: 5 }] },
    21: { age: 1, name: 'Barracks',    color: "red", cost: { resources: ["ore"] }, effects: [{ type: "shield" }] },
    22: { age: 1, name: 'Stockade',    color: "red", cost: { resources: ["wood"] }, effects: [{ type: "shield" }] },
    23: { age: 1, name: 'Guard Tower', color: "red", cost: { resources: ["clay"] }, effects: [{ type: "shield" }] },
    24: { age: 1, name: 'Apothecary',  color: "green", cost: { resources: ["loom"] },  effects: [{ type: "science", symbol: "compass" }], chains: ["horseshoe", "bowl"] },
    25: { age: 1, name: 'Scriptorium', color: "green", cost: { resources: ["press"] }, effects: [{ type: "science", symbol: "tablet" }], chains: ["scales", "book"] },
    26: { age: 1, name: 'Workshop',    color: "green", cost: { resources: ["glass"] }, effects: [{ type: "science", symbol: "gear" }], chains: ["target", "lamp"] },
    /* Age 2 */
    27: { age: 2, name: 'Sawmill',     color: "brown", cost: { gold: 1 }, effects: [{ type: "resource", resource: "wood" }, { type: "resource", resource: "wood" }] },
    28: { age: 2, name: 'Quarry',      color: "brown", cost: { gold: 1 }, effects: [{ type: "resource", resource: "stone" }, { type: "resource", resource: "stone" }] },
    29: { age: 2, name: 'Brickyard',   color: "brown", cost: { gold: 1 }, effects: [{ type: "resource", resource: "clay" }, { type: "resource", resource: "clay" }] },
    30: { age: 2, name: 'Foundry',     color: "brown", cost: { gold: 1 }, effects: [{ type: "resource", resource: "ore" }, { type: "resource", resource: "ore" }] },
    31: { age: 2, name: 'Loom',        color: "grey", effects: [{ type: "resource", resource: "loom" }] },
    32: { age: 2, name: 'Glassworks',  color: "grey", effects: [{ type: "resource", resource: "glass" }] },
    33: { age: 2, name: 'Press',       color: "grey", effects: [{ type: "resource", resource: "press" }] },
    34: { age: 2, name: 'Courthouse',  color: "blue", cost: { resources: ["clay", "clay", "loom"], chain: "scales" }, effects: [{ type: "points", points: 4 }] },
    35: { age: 2, name: 'Statue',      color: "blue", cost: { resources: ["ore", "ore", "wood"], chain: "hammer" }, effects: [{ type: "points", points: 4 }] },
    36: { age: 2, name: 'Temple',      color: "blue", cost: { resources: ["wood", "clay", "glass"] }, effects: [{ type: "points", points: 4 }] },
    37: { age: 2, name: 'Aqueduct',    color: "blue", cost: { resources: ["stone", "stone", "stone"], chain: "droplet" }, effects: [{ type: "points", points: 5 }] },
    38: { age: 2, name: 'Vineyard',    color: "yellow", effects: [{ type: "gold_for_cards", color: "brown", gold_per_card: 1 }] },
    39: { age: 2, name: 'Bazaar',      color: "yellow", effects: [{ type: "gold_for_cards", color: "grey", gold_per_card: 2 }] },
    40: { age: 2, name: 'Forum',       color: "yellow", cost: { resources: ["clay", "clay"], chain: "market" }, effects: [{ type: "multi_resource", resources: "glass/press/loom", purchasable: false }], chains: ["barrel"] },
    41: { age: 2, name: 'Caravansery', color: "yellow", cost: { resources: ["wood", "wood"], chain: "camel" }, effects: [{ type: "multi_resource", resources: "wood/stone/ore/clay", purchasable: false }], chains: ["lighthouse"] },
    42: { age: 2, name: 'Stables',     color: "red", cost: { resources: ["wood", "ore", "clay"], chain: "horseshoe" }, effects: [{ type: "shield" }, { type: "shield" }] },
    43: { age: 2, name: 'Walls',       color: "red", cost: { resources: ["stone", "stone", "stone"] }, effects: [{ type: "shield" }, { type: "shield" }], chains: ["fortress"] },
    44: { age: 2, name: 'Archery Range', color: "red", cost: { resources: ["wood", "wood", "ore"], chain: "target" }, effects: [{ type: "shield" }, { type: "shield" }] },
    45: { age: 2, name: 'Training Ground', color: "red", cost: { resources: ["ore", "ore", "wood"] }, effects: [{ type: "shield" }, { type: "shield" }], chains: ["helmet"] },
    46: { age: 2, name: 'Laboratory',  color: "green", cost: { resources: ["clay", "clay", "press"], chain: "lamp" }, effects: [{ type: "science", symbol: "gear" }], chains: ["planets", "saw"] },
    47: { age: 2, name: 'School',      color: "green", cost: { resources: ["wood", "press"] }, effects: [{ type: "science", symbol: "tablet" }], chains: ["harp", "feather"] },
    48: { age: 2, name: 'Dispensery',  color: "green", cost: { resources: ["ore", "ore", "glass"], chain: "bowl" }, effects: [{ type: "science", symbol: "compass" }], chains: ["bolt", "torch"] },
    49: { age: 2, name: 'Library',     color: "green", cost: { resources: ["stone", "stone", "loom"], chain: "book" }, effects: [{ type: "science", symbol: "tablet" }], chains: ["temple", "scroll"] },
    /* Age 3 */
    50: { age: 3, name: 'Workers Guild', color: "purple", cost: { resources: ["ore", "ore", "wood", "stone", "clay"] }, effects: [{ type: "points_for_cards", color: "brown", points_per_card: 1 }] },
    51: { age: 3, name: 'Craftmens Guild', color: "purple", cost: { resources: ["stone", "stone", "ore", "ore"] }, effects: [{ type: "points_for_cards", color: "grey", points_per_card: 2 }] },
    52: { age: 3, name: 'Traders Guild', color: "purple", cost: { resources: ["glass", "press", "loom"] }, effects: [{ type: "points_for_cards", color: "yellow", points_per_card: 1 }] },
    53: { age: 3, name: 'Philosophers Guild', color: "purple", cost: { resources: ["clay", "clay", "clay", "press", "loom"] }, effects: [{ type: "points_for_cards", color: "green", points_per_card: 1 }] },
    54: { age: 3, name: 'Spies Guild', color: "purple", cost: { resources: ["clay", "clay", "glass"] }, effects: [{ type: "points_for_cards", color: "red", points_per_card: 1 }] },
    55: { age: 3, name: 'Magistrates Guild', color: "purple", cost: { resources: ["wood", "wood", "wood", "stone", "loom"] }, effects: [{ type: "points_for_cards", color: "blue", points_per_card: 1 }] },
    56: { age: 3, name: 'Decorators Guild', color: "purple", cost: { resources: ["ore", "ore", "stone", "loom"] }, effects: [{ type: "points_for_finished_wonder", points: 7 }] },
    57: { age: 3, name: 'Builders Guild', color: "purple", cost: { resources: ["stone", "stone", "stone", "clay", "clay", "glass"] }, effects: [{ type: "points_for_stages", points_per_stage: 1 }] },
    58: { age: 3, name: 'Scientists Guild', color: "purple", cost: { resources: ["wood", "wood", "ore", "ore", "press"] }, effects: [{ type: "multi_science", symbols: "compass/tablet/gear" }] },
    59: { age: 3, name: 'Shipowners Guild', color: "purple", cost: { resources: ["wood", "wood", "wood", "glass", "press"] }, effects: [{ type: "points_for_self_cards", color: "brown", points_per_card: 1 }, { type: "points_for_self_cards", color: "grey", points_per_card: 1 }, { type: "points_for_self_cards", color: "purple", points_per_card: 1 }] },
    60: { age: 3, name: 'Palace',      color: "blue", cost: { resources: ["wood", "stone", "ore", "clay", "glass", "press", "loom"] }, effects: [{ type: "points", points: 8 }] },
    61: { age: 3, name: 'Gardens',     color: "blue", cost: { resources: ["clay", "clay", "wood"], chain: "mask" }, effects: [{ type: "points", points: 5 }] },
    62: { age: 3, name: 'Pantheon',    color: "blue", cost: { resources: ["clay", "clay", "ore", "glass", "press", "loom"], chain: "star" }, effects: [{ type: "points", points: 7 }] },
    63: { age: 3, name: 'Town Hall',   color: "blue", cost: { resources: ["stone", "stone", "ore", "glass"] }, effects: [{ type: "points", points: 6 }] },
    64: { age: 3, name: 'Senate',      color: "blue", cost: { resources: ["wood", "wood", "stone", "ore"], chain: "temple" }, effects: [{ type: "points", points: 6 }] },
    65: { age: 3, name: 'Arena',       color: "yellow", cost: { resources: ["stone", "stone", "ore"], chain: "bolt" }, effects: [{ type: "gold_and_points_for_stages", gold_per_stage: 3, points_per_stage: 1 }] },
    66: { age: 3, name: 'Chamber of Commerce', color: "yellow", cost: { resources: ["clay", "clay", "press"] }, effects: [{ type: "gold_and_points_for_cards", color: "grey", gold_per_card: 2, points_per_card: 2 }] },
    67: { age: 3, name: 'Haven',       color: "yellow", cost: { resources: ["wood", "ore", "loom"], chain: "feather" }, effects: [{ type: "gold_and_points_for_cards", color: "brown", gold_per_card: 1, points_per_card: 1 }] },
    68: { age: 3, name: 'Lighthouse',  color: "yellow", cost: { resources: ["stone", "glass"], chain: "lighthouse" }, effects: [{ type: "gold_and_points_for_cards", color: "yellow", gold_per_card: 1, points_per_card: 1 }] },
    69: { age: 3, name: 'Ludus',       color: "yellow", cost: { resources: ["stone", "ore"] }, effects: [{ type: "gold_and_points_for_cards", color: "red", gold_per_card: 3, points_per_card: 1 }] },
    70: { age: 3, name: 'Circus',      color: "red", cost: { resources: ["stone", "stone", "stone", "ore"], chain: "helmet" }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    71: { age: 3, name: 'Arsenal',     color: "red", cost: { resources: ["wood", "wood", "ore", "loom"] }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    72: { age: 3, name: 'Fortifications', color: "red", cost: { resources: ["ore", "ore", "ore", "clay"], chain: "fortress" }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    73: { age: 3, name: 'Siege Workshop', color: "red", cost: { resources: ["clay", "clay", "clay", "wood"], chain: "saw" }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    74: { age: 3, name: 'Castrum',     color: "red", cost: { resources: ["clay", "clay", "wood", "press"] }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    75: { age: 3, name: 'Observatory', color: "green", cost: { resources: ["ore", "ore", "glass", "loom"], chain: "planets" }, effects: [{ type: "science", symbol: "gear" }] },
    76: { age: 3, name: 'Academy',     color: "green", cost: { resources: ["stone", "stone", "stone", "glass"], chain: "harp" }, effects: [{ type: "science", symbol: "compass" }] },
    77: { age: 3, name: 'University',  color: "green", cost: { resources: ["wood", "wood", "glass", "press"], chain: "scroll" }, effects: [{ type: "science", symbol: "tablet" }] },
    78: { age: 3, name: 'Lodge',       color: "green", cost: { resources: ["clay", "clay", "press", "loom"], chain: "torch" }, effects: [{ type: "science", symbol: "compass" }] },
    79: { age: 3, name: 'Study',       color: "green", cost: { resources: ["wood", "press", "loom"], chain: "feather" }, effects: [{ type: "science", symbol: "gear" }] },
    80: { age: 3, name: 'Strategists Guild', color: "purple", cost: { resources: ["ore", "ore", "stone", "loom"] }, effects: [{ type: "points_for_negative_tokens", points_per_token: 1 }] },
    
    /* Cities */
    /* Age 1 */
    81: { age: 1, name: 'Opium Stash', color: "black", effects: [{ type: "gold", gold: 3 }, { type: "broken_gold", gold: 1 }] },
    82: { age: 1, name: 'Hideout',     color: "black", effects: [{ type: "broken_gold", gold: 1 }, { type: "points", points: 2 }] },
    83: { age: 1, name: 'Customs',     color: "black", effects: [{ type: "gold_for_others", gold: 1 }, { type: "points", points: 4 }] },
    84: { age: 1, name: 'City Gates',  color: "black", cost: { resources: ["wood"], gold: 1 }, effects: [{ type: "points", points: 4 }] },
    85: { age: 1, name: 'Residence',   color: "black", cost: { resources: ["clay"] }, effects: [{ type: "dove" }, { type: "points", points: 1 }] },
    86: { age: 1, name: 'Raider Camp', color: "black", effects: [{ type: "debt_for_neighbor", direction: "neg" }, { type: "gain_victory_token", token_value: 1 }, { type: "debt_for_neighbor", direction: "pos" }] },
    87: { age: 1, name: 'Cells',       color: "black", effects: [{ type: "points_for_victory_tokens", token_value: 1, points_per_token: 2 }] },
    88: { age: 1, name: 'Militia',     color: "black", cost: { gold: 3 }, effects: [{ type: "shield" }, { type: "shield" }] },
    89: { age: 1, name: 'Pigeonhole',  color: "black", cost: { resources: ["ore"], gold: 1 }, effects: [{ type: "mask" }] },
    90: { age: 1, name: 'Dive',        color: "black", effects: [{ type: "gold_for_neighbor", gold: 1, direction: "neg" }, { type: "gold", gold: 6 }, { type: "gold_for_neighbor", gold: 1, direction: "pos" }] },
    91: { age: 1, name: 'Secret Warehouse', color: "black", cost: { gold: 2 }, effects: [{ type: "duplicate_produced_resource" }] },
    92: { age: 1, name: "Smuggler's Cache", color: "black", effects: [{ type: "smugglers_cache" }] },
    93: { age: 1, name: 'W Clandestine Wharf', color: "black", cost: { gold: 1 }, effects: [{ type: "wharf", direction: "neg" }] },
    94: { age: 1, name: 'E Clandestine Wharf', color: "black", cost: { gold: 1 }, effects: [{ type: "wharf", direction: "pos" }] },
    /* Age 2 */
    95: { age: 2, name: 'Opium Den',  color: "black", cost: { resources: ["press"] }, effects: [{ type: "gold", gold: 4 }, { type: "broken_gold", gold: 3 }] },
    96: { age: 2, name: 'Lair',       color: "black", cost: { resources: ["wood", "glass"] }, effects: [{ type: "broken_gold", gold: 2 }, { type: "points", points: 3 }] },
    97: { age: 2, name: 'Trade Center', color: "black", cost: { resources: ["stone", "clay", "press"] }, effects: [{ type: "gold_for_others", gold: 2 }, { type: "points", points: 6 }] },
    98: { age: 2, name: 'Tabularium', color: "black", cost: { resources: ["wood", "ore", "loom"], gold: 2 }, effects: [{ type: "points", points: 6 }] },
    99: { age: 2, name: 'Consulate',   color: "black", cost: { resources: ["clay", "press"] }, effects: [{ type: "dove" }, { type: "points", points: 2 }] },
    100: { age: 2, name: 'Raider Fort', color: "black", cost: { resources: ["ore", "clay"], gold: 1 }, effects: [{ type: "debt_for_neighbor", direction: "neg" }, { type: "gain_victory_token", token_value: 3 }, { type: "debt_for_neighbor", direction: "pos" }] },
    101: { age: 2, name: 'Guardhouse',  color: "black", cost: { resources: ["wood", "ore"], gold: 2 }, effects: [{ type: "points_for_victory_tokens", token_value: 3, points_per_token: 3 }] },
    102: { age: 2, name: 'Mercenaries', color: "black", cost: { resources: ["press"], gold: 4 }, effects: [{ type: "shield" }, { type: "shield" }, { type: "shield" }] },
    103: { age: 2, name: 'Band of Spies', color: "black", cost: { resources: ["stone", "clay"], gold: 2 }, effects: [{ type: "mask" }] },
    104: { age: 2, name: 'Gambling Den', color: "black", cost: { gold: 1 }, effects: [{ type: "gold_for_neighbor", gold: 2, direction: "neg" }, { type: "gold", gold: 9 }, { type: "gold_for_neighbor", gold: 2, direction: "pos" }] },
    105: { age: 2, name: 'Black Market', color: "black", cost: { resources: ["ore", "loom"] }, effects: [{ type: "unproduced_resource" }] },
    106: { age: 2, name: 'Sepulcher',  color: "black", cost: { resources: ["stone", "loom", "glass"] }, effects: [{ type: "broken_gold_for_victory_tokens", gold_per_token: 1 }, { type: "points", points: 4 }] },
    107: { age: 2, name: 'Architect Firm', color: "black", cost: { resources: ["press"], gold: 1 }, effects: [{ type: "waive_wonder_resource_costs" }, { type: "points", points: 2 }] },
    108: { age: 2, name: 'Forging Agency', color: "black", cost: { gold: 2 }, effects: [{ type: "build_from_discard", priority: 50 }] },
    /* Age 3 */
    109: { age: 3, name: 'Opium Distillery',  color: "black", cost: { resources: ["wood", "glass"] }, effects: [{ type: "gold", gold: 5 }, { type: "broken_gold", gold: 5 }] },
    110: { age: 3, name: 'Brotherhood', color: "black", cost: { resources: ["wood", "wood", "ore", "loom"] }, effects: [{ type: "broken_gold", gold: 3 }, { type: "points", points: 4 }] },
    111: { age: 3, name: 'Mint',       color: "black", cost: { resources: ["wood", "wood", "clay", "glass", "loom"] }, effects: [{ type: "gold_for_others", gold: 3 }, { type: "points", points: 8 }] },
    112: { age: 3, name: 'Capitol',    color: "black", cost: { resources: ["stone", "stone", "clay", "clay", "glass", "press"], gold: 2 }, effects: [{ type: "points", points: 8 }] },
    113: { age: 3, name: 'Embassy',    color: "black", cost: { resources: ["stone", "press", "loom"] }, effects: [{ type: "dove" }, { type: "points", points: 3 }] },
    114: { age: 3, name: 'Raider Garrison', color: "black", cost: { resources: ["stone", "stone", "loom"], gold: 2 }, effects: [{ type: "debt_for_neighbor", direction: "neg" }, { type: "gain_victory_token", token_value: 5 }, { type: "debt_for_neighbor", direction: "pos" }] },
    115: { age: 3, name: 'Prison',     color: "black", cost: { resources: ["ore", "ore", "clay", "press"], gold: 2 }, effects: [{ type: "points_for_victory_tokens", token_value: 5, points_per_token: 4 }] },
    116: { age: 3, name: 'Contingent', color: "black", cost: { resources: ["loom"], gold: 5 }, effects: [{ type: "shields", shields: 5 }] },
    117: { age: 3, name: 'Torture Chamber', color: "black", cost: { resources: ["ore", "ore", "glass"], gold: 3 }, effects: [{ type: "mask" }] },
    118: { age: 3, name: 'Slave Market', color: "black", cost: { resources: ["wood", "wood", "ore", "ore"] }, effects: [{ type: "gold_and_points_for_victory_tokens", gold_per_token: 1, points_per_token: 1 }] },
    119: { age: 3, name: 'Memorial',   color: "black", cost: { resources: ["stone", "wood", "loom"] }, effects: [{ type: "gold_for_defeat_tokens", gold_per_token: 2 }, { type: "discard_defeat_tokens" }] },
    120: { age: 3, name: 'Cenotaph',   color: "black", cost: { resources: ["clay", "clay", "stone", "glass", "loom"] }, effects: [{ type: "broken_gold_for_victory_tokens", gold_per_token: 1 }, { type: "points", points: 5 }] },
    121: { age: 3, name: 'Chamber of Builders', color: "black", cost: { resources: ["wood", "clay", "glass", "press"] }, effects: [{ type: "broken_gold_for_stages", gold_per_stage: 1 }, { type: "points", points: 4 }] },
    122: { age: 3, name: 'Secret Network', color: "black", cost: { resources: ["stone", "press"] }, effects: [{ type: "gold_and_points_for_cards", color: "black", gold_per_card: 1, points_per_card: 1 }] },
}

exports.getAllCards = () => {
    return cards;
}

exports.getCardsForPlayersAge = (players, age, citiesEnabled) => {
    let result = [];
    if (age === 1) {
        if (players >= 3) result.push(0, 1, 2, 3, 6, 7, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26);
        if (players >= 4) result.push(2, 3, 5, 14, 20, 23, 25);
        if (players >= 5) result.push(0, 1, 8, 15, 20, 21, 24);
        if (players >= 6) result.push(4, 9, 10, 11, 12, 13, 19);
        if (players >= 7) result.push(14, 16, 17, 18, 20, 22, 26);
        if (citiesEnabled) result.push(81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94);
    }
    if (age === 2) {
        if (players >= 3) result.push(27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 46, 47, 48, 49);
        if (players >= 4) result.push(27, 28, 29, 30, 39, 45, 48);
        if (players >= 5) result.push(31, 32, 33, 34, 41, 42, 46);
        if (players >= 6) result.push(36, 38, 40, 41, 44, 45, 49);
        if (players >= 7) result.push(35, 37, 39, 40, 43, 45, 47);
        if (citiesEnabled) result.push(95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108);
    }
    if (age === 3) {
        if (players >= 3) result.push(50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 80, 60, 61, 62, 63, 64, 65, 67, 68, 71, 72, 73, 75, 76, 77, 78, 79);
        if (players >= 4) result.push(61, 66, 67, 70, 74, 77);
        if (players >= 5) result.push(64, 65, 69, 71, 73, 79);
        if (players >= 6) result.push(62, 63, 66, 68, 70, 78);
        if (players >= 7) result.push(60, 69, 72, 74, 75, 76);
        if (citiesEnabled) result.push(109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122);
        
        // Remove Strategists Guild only in 4P
        if (players === 4) result.splice(result.indexOf(80), 1);
    }
    return result;
}

exports.newHandsForPlayersAge = (players, age, citiesEnabled) => {
    let deck = exports.getCardsForPlayersAge(players, age, citiesEnabled);
    if (age === 3) {
        let guilds = [];
        for (let i = deck.length-1; i >= 0; i--) {
            if (cards[deck[i]].color === 'purple') {
                guilds.push(deck.splice(i, 1)[0]);
            }
        }
        for (let i = 0; i < players + 2; i++) {
            deck.push(guilds.splice(utils.randInt(0, guilds.length-1), 1)[0]);
        }
    }
    
    if (citiesEnabled) {
        let blackCards = [];
        for (let i = deck.length-1; i >= 0; i--) {
            if (cards[deck[i]].color === 'black') {
                blackCards.push(deck.splice(i, 1)[0]);
            }
        }
        for (let i = 0; i < players; i++) {
            deck.push(blackCards.splice(utils.randInt(0, blackCards.length-1), 1)[0]);
        }
    }
    
    if (deck.length % players !== 0) {
        console.log('players:', players, 'deck:', deck)
        throw new Error('Deck cannot be evenly divided between players');
    }
    
    let cardsPerHand = deck.length / players;
    
    let result = [];
    for (let i = 0; i < players; i++) {
        let hand = [];
        for (let j = 0; j < cardsPerHand; j++) {
            hand.push(deck.splice(utils.randInt(0, deck.length-1), 1)[0]);
        }
        hand.sort((a,b) => a - b);
        result.push(hand);
    }
    
    return result;
}