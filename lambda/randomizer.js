const utils = require('./utils');
const cardData = require('./cardData');

const resources = ['wood', 'ore', 'clay', 'stone', 'glass', 'press', 'loom'];
const scienceSymbols = ['tablet', 'gear', 'compass'];
const colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple', 'black'];
const directions = ['neg', 'pos'];

const cards = cardData.getAllCards();
const cardList = Object.keys(cards).map(key => cards[key]);

const randomEffectByType = {
    'resource': {
        effect: (age) => ({ type: 'resource', resource: utils.randElement(resources) }),
        value: (effect) => 2,
        colors: ['brown', 'grey'],
    },
    'multi_resource': {
        effect: (age) => {
            let rs = utils.shuffled(resources);
            let res = `${rs.pop()}/${rs.pop()}`;
            if (age >= 2 && utils.randBool(0.5)) res += `/${rs.pop()}`;
            if (age >= 2 && utils.randBool(0.5)) res += `/${rs.pop()}`;
            return { type: 'multi_resource', resources: res, purchasable: true };
        },
        value: (effect) => 2*effect.resources.split('/').length,
        colors: ['brown', 'grey'],
    },
    'shields': {
        effect: (age) => {
            let shields = utils.clamp(utils.randElementWeighted([age-1, age, age+1], [1, 3, 1]), 1, 3);
            if (age === 3 && utils.randBool(0.1)) shields = 5;
            return { type: 'shields', shields: shields };
        },
        value: (effect) => 2 * effect.shields,
        colors: ['red'],
    },
    'science': {
        effect: (age) => ({ type: 'science', symbol: utils.randElement(scienceSymbols) }),
        value: (effect, age) => 2*age,
        colors: ['green'],
    },
    'points': {
        effect: (age) => ({ type: 'points', points: utils.randInt(1, 2*age+2) }),
        value: (effect) => effect.points,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'gold': {
        effect: (age) => ({ type: 'gold', gold: utils.randInt(3, 3*age+3) }),
        value: (effect) => Math.ceil(effect.gold / 2),
        colors: ['yellow'],
    },
    'trading_post': {
        effect: (age) => ({ type: 'trading_post', direction: utils.randElement(directions) }),
        value: (effect) => 3,
        colors: ['yellow'],
    },
    'marketplace': {
        effect: (age) => ({ type: 'marketplace' }),
        value: (effect) => 3,
        colors: ['yellow'],
    },
    'gold_for_cards': {
        effect: (age) => ({ type: 'gold_for_cards', color: utils.randElement(colors), gold_per_card: utils.randInt(1, 3) }),
        value: (effect) => 3 + effect.gold_per_card,
        colors: ['yellow'],
    },
    'gold_and_points_for_cards': {
        effect: (age) => ({ type: 'gold_and_points_for_cards', color: utils.randElement(colors), gold_per_card: utils.randInt(1, 3), points_per_card: age === 3 ? utils.randInt(1, 2) : 1 }),
        value: (effect) => 3 * effect.points_per_card + effect.gold_per_card,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'gold_and_points_for_stages': {
        effect: (age) => ({ type: 'gold_and_points_for_stages', gold_per_stage: utils.randInt(1, 3), points_per_stage: age === 3 ? utils.randInt(1, 2) : 1 }),
        value: (effect) => 3 * effect.points_per_stage + effect.gold_per_stage,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'points_for_cards': {
        effect: (age) => ({ type: 'points_for_cards', color: utils.randElement(colors), points_per_card: age === 3 ? utils.randInt(1, 2) : 1 }),
        value: (effect) => 5 * effect.points_per_card,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'points_for_stages': {
        effect: (age) => ({ type: 'points_for_stages', points_per_stage: 1 }),
        value: (effect) => 8 * effect.points_per_stage,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'points_for_finished_wonder': {
        effect: (age) => ({ type: 'points_for_finished_wonder', points: utils.randInt(2*age+1, 3*age) }),
        value: (effect) => effect.points,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'points_for_self_cards': {
        effect: (age) => ({ type: 'points_for_self_cards', color: utils.randElement(colors), points_per_card: age === 3 ? utils.randInt(1, 2) : 1 }),
        value: (effect) => 3 * effect.points_per_card,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'multi_science': {
        effect: (age) => {
            let ss = utils.shuffled(scienceSymbols);
            let syms = `${ss.pop()}/${ss.pop()}`;
            if (age === 3 && utils.randBool(0.5)) syms += `/${ss.pop()}`;
            return { type: 'multi_science', symbols: syms };
        },
        value: (effect, age) => 2*age*effect.symbols.split('/').length,
        colors: ['green', 'black', 'purple'],
    },
    'play_last_card': {
        effect: (age) => ({ type: 'play_last_card' }),
        value: (effect) => 3,
        colors: colors,
    },
    'build_from_discard': {
        effect: (age) => ({ type: 'build_from_discard', priority: utils.randInt(0, 100) }),
        value: (effect) => 4,
        colors: colors,
    },
    'build_free_first_color': {
        effect: (age) => ({ type: 'build_free_first_color' }),
        value: (effect) => 3,
        colors: colors,
    },
    'build_free_first_card': {
        effect: (age) => ({ type: 'build_free_first_card' }),
        value: (effect) => 2,
        colors: colors,
    },
    'build_free_last_card': {
        effect: (age) => ({ type: 'build_free_last_card' }),
        value: (effect) => 2,
        colors: colors,
    },
    'double_trading_post': {
        effect: (age) => ({ type: 'double_trading_post' }),
        value: (effect) => 4,
        colors: ['yellow', 'black'],
    },
    'build_free_once_per_age': {
        effect: (age) => ({ type: 'build_free_once_per_age' }),
        value: (effect) => 3,
        colors: colors,
    },
    'gold_for_others': {
        effect: (age) => ({ type: 'gold_for_others', gold: utils.randInt(1, 3) }),
        value: (effect) => -Math.floor(effect.gold / 2),
        colors: colors,
    },
    'gold_for_neighbor': {
        effect: (age) => ({ type: 'gold_for_neighbor', direction: utils.randElement(directions), gold: utils.randInt(1, 3) }),
        value: (effect) => -Math.floor(effect.gold / 3),
        colors: colors,
    },
    'waive_wonder_resource_costs': {
        effect: (age) => ({ type: 'waive_wonder_resource_costs' }),
        value: (effect) => 3,
        colors: colors,
    },
    'mask': {
        effect: (age) => ({ type: 'mask' }),
        value: (effect) => undefined,
        colors: ['green', 'black', 'purple'],
    },
    'unproduced_resource': {
        effect: (age) => ({ type: 'unproduced_resource' }),
        value: (effect) => 4,
        colors: ['yellow', 'black'],
    },
    'duplicate_produced_resource': {
        effect: (age) => ({ type: 'duplicate_produced_resource' }),
        value: (effect) => 4,
        colors: ['yellow', 'black'],
    },
    'wharf': {
        effect: (age) => ({ type: 'wharf', direction: utils.randElement(directions) }),
        value: (effect) => 2,
        colors: ['yellow', 'black'],
    },
    'smugglers_cache': {
        effect: (age) => ({ type: 'smugglers_cache' }),
        value: (effect) => 2,
        colors: ['yellow', 'black'],
    },
    'dove': {
        effect: (age) => ({ type: 'dove' }),
        value: (effect) => 2,
        colors: ['red', 'black', 'purple'],
    },
    'gain_victory_token': {
        effect: (age) => ({ type: 'gain_victory_token', token_value: utils.randInt(1, 5) }),
        value: (effect) => effect.token_value,
        colors: ['blue', 'purple', 'black'],
    },
    'debt_for_neighbor': {
        effect: (age) => ({ type: 'debt_for_neighbor', direction: utils.randElement(directions) }),
        value: (effect) => 1,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'gold_for_defeat_tokens': {
        effect: (age) => ({ type: 'gold_for_defeat_tokens', gold_per_token: utils.randInt(1, 3) }),
        value: (effect) => effect.gold_per_token,
        colors: ['yellow', 'black'],
    },
    'points_for_victory_tokens': {
        effect: (age) => ({ type: 'points_for_victory_tokens', token_value: utils.randElement([1, 3, 5]), points_per_token: utils.randInt(1, 4) }),
        value: (effect) => 2 * effect.points_per_token,
        colors: ['blue', 'purple', 'black'],
    },
    'gold_and_points_for_victory_tokens': {
        effect: (age) => ({ type: 'gold_and_points_for_victory_tokens', gold_per_token: utils.randInt(1, 2), points_per_token: utils.randInt(1, 2) }),
        value: (effect) => 3 * effect.points_per_token + effect.gold_per_token,
        colors: ['blue', 'yellow', 'purple', 'black'],
    },
    'discard_defeat_tokens': {
        effect: (age) => ({ type: 'discard_defeat_tokens' }),
        value: (effect) => 2,
        colors: colors,
    },
    'broken_gold': {
        effect: (age) => ({ type: 'broken_gold', gold: utils.randInt(1, 2*age) }),
        value: (effect) => Math.ceil(effect.gold / 2),
        colors: ['yellow', 'black'],
    },
    'broken_gold_for_stages': {
        effect: (age) => ({ type: 'broken_gold_for_stages', gold_per_stage: utils.randInt(1, 2) }),
        value: (effect) => effect.gold_per_stage,
        colors: ['yellow', 'black'],
    },
    'broken_gold_for_victory_tokens': {
        effect: (age) => ({ type: 'broken_gold_for_victory_tokens', gold_per_token: utils.randInt(1, 2) }),
        value: (effect) => effect.gold_per_token,
        colors: ['yellow', 'black'],
    },
    'turret': {
        effect: (age) => ({ type: 'turret' }),
        value: (effect) => 3,
        colors: colors,
    },
}

const effectCategories = {
    'resource': {
        effects: { 'resource': 8, 'multi_resource': 3, 'unproduced_resource': 0.6, 'duplicate_produced_resource': 0.6 },
        distributions: { '1': 15, '2': 12, '3': 0 },
    },
    'economy': {
        effects: { 'gold': 1, 'trading_post': 1, 'marketplace': 1, 'double_trading_post': 1, 'gold_for_cards': 1, 'wharf': 1, 'smugglers_cache': 1, 'gold_for_defeat_tokens': 1, 'broken_gold': 1,
                   'broken_gold_for_stages': 1, 'broken_gold_for_victory_tokens': 1 },
        distributions: { '1': 5, '2': 4, '3': 0 },
    },
    'military': {
        effects: { 'shields': 1 },
        distributions: { '1': 4, '2': 4, '3': 5 },
    },
    'diplomacy': {
        effects: { 'dove': 1 },
        distributions: { '1': 1, '2': 1, '3': 1 },
    },
    'science': {
        effects: { 'science': 5, 'multi_science': 1, 'mask': 1 },
        distributions: { '1': 5, '2': 5, '3': 7 },
    },
    'points': {
        effects:  { 'points': 7, 'gold_and_points_for_cards': 2, 'gold_and_points_for_stages': 1, 'points_for_cards': 2, 'points_for_stages': 1, 'points_for_finished_wonder': 0.5,
                    'points_for_self_cards': 2, 'gain_victory_token': 1, 'debt_for_neighbor': 1, 'points_for_victory_tokens': 0.5, 'gold_and_points_for_victory_tokens': 0.5,
                    'discard_defeat_tokens': 0.5 },
        distributions: { '1': 5, '2': 5, '3': 21 },
    },
    'utility': {
        effects: { 'play_last_card': 1, 'build_from_discard': 1, 'build_free_first_color': 1, 'build_free_first_card': 1, 'build_free_last_card': 1, 'build_free_once_per_age': 1,
                   'waive_wonder_resource_costs': 1, 'turret': 1 },
        distributions: { '1': 1, '2': 1, '3': 0 },
    },
    'negative': {
        effects: { 'gold_for_others': 1, 'gold_for_neighbor': 1 },
        distributions: { '1': 0, '2': 0, '3': 0 },
    },
}

const agePointGoal = {
    '1': 2,
    '2': 4,
    '3': 6,
}

function randomEffectType(age) {
    let categories = Object.keys(effectCategories);
    let category = utils.randElementWeighted(categories, categories.map(c => effectCategories[c].distributions[age]));
    let effectDistribution = effectCategories[category].effects;
    return utils.randElementWeighted(Object.keys(effectDistribution), Object.keys(effectDistribution).map(k => effectDistribution[k]));
}

function randomNegativeEffectType() {
    let effectDistribution = effectCategories['negative'].effects;
    return utils.randElementWeighted(Object.keys(effectDistribution), Object.keys(effectDistribution).map(k => effectDistribution[k]));
}

function randomEffectForTargetValue(age, minValue, maxValue) {
    if (minValue < -5 && maxValue < 0) {
        return { type: 'points', points: utils.randInt(minValue, maxValue) };
    }

    if (minValue < 0) {
        if (utils.randBool(0.2) && maxValue < 0) return { type: 'points', points: utils.randInt(minValue, maxValue) };
        return randomEffectByType[randomNegativeEffectType()].effect(age);
    }
    
    let iters = 100;
    while (iters > 0) {
        let effectType = randomEffectType(age);
        let effect = randomEffectByType[effectType].effect(age);
        let effectValue = randomEffectByType[effect.type].value(effect, age);
        if (effectValue >= minValue && effectValue <= maxValue) return effect;
        iters--;
    }
    
    return { type: 'points', points: minValue };
}

function randomCost(age) {
    let resourceCost = [];
    if (utils.randBool(0.3)) resourceCost.push(utils.randElement(resources));
    if (age >= 2 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 2 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 3 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 3 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    
    resourceCost.sort((r1, r2) => resources.indexOf(r1) - resources.indexOf(r2));
    
    return {
        resources: resourceCost,
        gold: utils.randBool(0.1) ? utils.randInt(1, age) : undefined,
    };
}

exports.generateDeckForPlayersAge = (players, age) => {
    let deck = [];
    let cardNames = utils.shuffled(cardList.filter(card => card.age === age).map(card => card.name));
    let cardNameIndex = 0;
    for (let i = 0; i < 8*players; i++) {
        let effectType = randomEffectType(age);
        let effects = [randomEffectByType[effectType].effect(age)];
        let color = utils.randElement(randomEffectByType[effectType].colors);
        
        // Adjust value if needed
        let valueDiff = agePointGoal[age] - randomEffectByType[effectType].value(effects[0], age);
        if (valueDiff && valueDiff > 0 && utils.randBool(0.8)) {
            effects.push(randomEffectForTargetValue(age, Math.max(1, valueDiff-2), valueDiff+1));
        }
        
        if (valueDiff && valueDiff < -1 && utils.randBool(0.5)) {
            effects.push(randomEffectForTargetValue(age, valueDiff, -1));
        }
        
        let card = { age: age, name: cardNames[cardNameIndex], color: color, cost: randomCost(age), effects: effects };
        deck.push(card);
        
        cardNameIndex++;
        if (cardNameIndex >= cardNames.length) cardNameIndex = 0;
    }
    return deck;
}

exports.cardsify = (deckForAge) => {
    let result = {};
    let i = 0;
    for (let age = 1; age <= 3; age++) {
        for (let card of deckForAge[age]) {
            result[`${i}`] = card;
            i++;
        }
    }
    return result;
}

exports.getInitialHands = (cards, players) => {
    let numCards = Object.keys(cards).length;
    if (numCards !== 8*3*players) {
        throw new Error(`Invalid number of cards for ${players} players: ${numCards}`);
    }
    
    let result = {};
    
    for (let age = 1; age <= 3; age++) {
        let cardIds = utils.shuffled(utils.range(8*players*(age-1), 8*players*age-1));
        let hands = [];
        for (let i = 0; i < players; i++) {
            let hand = [];
            for (let j = 0; j < 8; j++) {
                hand.push(cardIds.pop());
            }
            hand.sort((c1, c2) => colors.indexOf(cards[c1].color) - colors.indexOf(cards[c2].color));
            hands.push(hand);
        }
        result[`${age}`] = hands;
    }
    
    return result;
}

exports.getDecks = (cards) => {
    let numCards = Object.keys(cards).length;
    let numCardsPerAge = numCards/3;
    
    let result = {};
    
    for (let age = 1; age <= 3; age++) {
        let deck = [];
        for (let i = numCardsPerAge*(age-1); i < numCardsPerAge*age; i++) {
            deck.push({ id: i, count: 1 });
        }
        deck.sort((c1, c2) => colors.indexOf(cards[c1.id].color) - colors.indexOf(cards[c2.id].color));
        result[`${age}`] = deck;
    }
    
    return result;
}

function randomResourceCostsForWonder() {
    let rs = utils.shuffled(resources);
    let cost1 = [rs.pop()];
    cost1.push(utils.randBool(0.5) ? cost1[0] : rs.pop());
    let cost2 = [rs.pop()];
    cost2.push(cost2[0]);
    if (utils.randBool(0.5)) cost2.push(utils.randBool(0.5) ? cost2[0] : rs.pop());
    let cost3 = [rs.pop()];
    cost3.push(cost3[0]);
    if (utils.randBool(0.5)) cost3.push(utils.randBool(0.5) ? cost3[0] : rs.pop());
    let cost4 = [rs.pop()];
    cost4.push(cost4[0]);
    cost4.push(cost4[0]);
    if (utils.randBool(0.5)) cost4.push(utils.randBool(0.5) ? cost4[0] : cost1[0]);
    return [cost1, cost2, cost3, cost4];
}

const agePointWonderStageGoal = {
    '1': 3,
    '2': 5,
    '3': 7
}

const targetValueByStageCount = {
    '1': 7,
    '2': 8,
    '3': 10,
    '4': 15,
}

exports.getRandomWonderChoices = (player) => {
    let x = {
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
    };
    
    let name = player;
    let outline_color = utils.randInt(0x000000, 0xFFFFFF);
    let starting_effect = randomEffectByType['resource'].effect(1);
    let starting_effect_color = ['glass', 'press', 'loom'].includes(starting_effect.resource) ? 'grey' : 'brown';
    
    let stageSets = [];
    
    for (let j = 0; j < 2; j++) {
        let resourceCosts = randomResourceCostsForWonder();
        let stages = [];
        let stageCount = utils.randElementWeighted([1, 2, 3, 4], [1, 3, 8, 1]);
        for (let i = 0; i < stageCount; i++) {
            let age = {
                '1': 3,
                '2': i+2,
                '3': i+1,
                '4': Math.min(i+1, 3),
            }[stageCount];
            let effectType = randomEffectType(age);
            let effects = [randomEffectByType[effectType].effect(age)];
            
            // Adjust value if needed
            let valueDiff = agePointWonderStageGoal[age] - randomEffectByType[effectType].value(effects[0], age);
            if (valueDiff && valueDiff > 0) {
                effects.push(randomEffectForTargetValue(age, valueDiff, valueDiff));
            }
            
            if (valueDiff && valueDiff < 0) {
                effects.push(randomEffectForTargetValue(age, valueDiff, valueDiff));
            }
            
            stages.push({
                cost: { resources: resourceCosts[i] },
                effects: effects,
            });
        }
        stageSets.push(stages);
    }
    
    let totalValue0 = utils.sumArray(stageSets[0], stage => utils.sumArray(stage.effects, effect => randomEffectByType[effect.type].value(effect, 2)));
    let totalValue1 = utils.sumArray(stageSets[1], stage => utils.sumArray(stage.effects, effect => randomEffectByType[effect.type].value(effect, 2)));
    
    if (totalValue0 < targetValueByStageCount[stageSets[0].length] && totalValue1 < targetValueByStageCount[stageSets[1].length]) {
        starting_effect = randomEffectByType['multi_resource'].effect(1);
    }
    
    return [{
        name: name,
        side: 'Day',
        outline_color: outline_color,
        starting_effect_color: starting_effect_color,
        starting_effects: [starting_effect],
        stages: stageSets[0],
    },{
        name: name,
        side: 'Night',
        outline_color: outline_color,
        starting_effect_color: starting_effect_color,
        starting_effects: [starting_effect],
        stages: stageSets[1],
    }];
}