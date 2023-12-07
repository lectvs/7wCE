const utils = require('./utils');
const cardData = require('./cardData');

const resources = ['wood', 'ore', 'clay', 'stone', 'glass', 'press', 'loom'];
const scienceSymbols = ['tablet', 'gear', 'compass'];
const colors = utils.colors;
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
        value: (effect, age) => age === 1 ? 3 : 2*effect.resources.split('/').length,
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
        effect: (age) => ({ type: 'science', symbol: utils.randBool(0.05) ? 'astrolabe' : utils.randElement(scienceSymbols) }),
        value: (effect, age) => 2*age,
        colors: ['green'],
    },
    'points': {
        effect: (age) => ({ type: 'points', points: utils.randInt(1, 2*age+2) }),
        value: (effect) => effect.points,
        colors: ['blue', 'black'],
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
        value: (effect, age) => 4*age,
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
    'points_for_negative_tokens': {
        effect: (age) => ({ type: 'points_for_negative_tokens', points_per_token: 1 }),
        value: (effect) => 7 * effect.points_per_stage,
        colors: ['blue', 'yellow', 'purple', 'black'],
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
        effect: (age) => ({ type: 'gold_for_others', gold: utils.clamp(age + utils.randInt(-1, 1), 1, 3) }),
        value: (effect) => -Math.floor(effect.gold / 2),
        colors: colors,
    },
    'gold_for_neighbor': {
        effect: (age) => ({ type: 'gold_for_neighbor', direction: utils.randElement(directions), gold: utils.clamp(age + utils.randInt(-1, 1), 1, 3) }),
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
        value: (effect, age) => 4*age,
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
    'gain_military_token': {
        effect: (age) => ({ type: 'gain_military_token', token_value: utils.randBool(0.2) ? utils.randInt(-2, -1) : utils.randInt(1, 5) }),
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
        effect: (age) => ({ type: 'broken_gold_for_victory_tokens', gold_per_token: 1 }),
        value: (effect) => 2*effect.gold_per_token,
        colors: ['yellow', 'black'],
    },
    'turret': {
        effect: (age) => ({ type: 'turret' }),
        value: (effect) => 3,
        colors: colors,
    },
    'eye': {
        effect: (age) => ({ type: 'eye' }),
        value: (effect) => 2,
        colors: colors,
    },
    'shields_for_defeat_tokens': {
        effect: (age) => ({ type: 'shields_for_defeat_tokens' }),
        value: (effect) => 6,
        colors: colors,
    },
    'points_for_shields': {
        effect: (age) => ({ type: 'points_for_shields', points_per_shield: 1 }),
        value: (effect) => 7,
        colors: colors,
    },
    'points_for_pairs': {
        effect: (age) => ({ type: 'points_for_pairs', points_per_pair: utils.randInt(1, 2) }),
        value: (effect) => effect.points_per_pair * 5,
        colors: colors,
    },
    'points_for_triplets': {
        effect: (age) => ({ type: 'points_for_triplets', points_per_triplet: utils.randInt(2, 3) }),
        value: (effect) => effect.points_per_triplet * 3,
        colors: colors,
    },
}

const effectCategories = {
    'resource': {
        effects: { 'resource': 8, 'multi_resource': 3, 'unproduced_resource': 0.6, 'duplicate_produced_resource': 0.6 },
        distributions: { '1': 10, '2': 8, '3': 0 },
        wonderDistributions: { '1': 1, '2': 1, '3': 0 },
    },
    'economy': {
        effects: { 'gold': 1, 'trading_post': 1, 'marketplace': 1, 'double_trading_post': 1, 'gold_for_cards': 1, 'wharf': 1, 'smugglers_cache': 1, 'gold_for_defeat_tokens': 1, 'broken_gold': 1,
                   'broken_gold_for_stages': 1, 'broken_gold_for_victory_tokens': 0.7 },
        distributions: { '1': 5, '2': 4, '3': 0 },
        wonderDistributions: { '1': 1, '2': 1, '3': 0 },
    },
    'military': {
        effects: { 'shields': 1 },
        distributions: { '1': 4, '2': 4, '3': 5 },
        wonderDistributions: { '1': 0.2, '2': 0.3, '3': 0.1 },
    },
    'diplomacy': {
        effects: { 'dove': 1 },
        distributions: { '1': 0.5, '2': 0.5, '3': 0.3 },
        wonderDistributions: { '1': 0.15, '2': 0.15, '3': 0.15 },
    },
    'science': {
        effects: { 'science': 10 },
        distributions: { '1': 4, '2': 4, '3': 5 },
        wonderDistributions: { '1': 0.1, '2': 0.1, '3': 0.1 },
    },
    'multi_science': {
        effects: { 'multi_science': 1, 'mask': 1 },
        distributions: { '1': 1, '2': 1, '3': 1 },
        wonderDistributions: { '1': 0, '2': 0.4, '3': 0.4 },
    },
    'raw_points': {
        effects:  { 'points': 1 },
        distributions: { '1': 1, '2': 1.5, '3': 7 },
        wonderDistributions: { '1': 1, '2': 1, '3': 2 },
    },
    'points': {
        effects:  { 'gold_and_points_for_cards': 3, 'gold_and_points_for_stages': 1, 'points_for_cards': 2, 'points_for_stages': 1, 'points_for_finished_wonder': 0.5,
                    'points_for_self_cards': 2, 'points_for_negative_tokens': 1, 'gain_military_token': 1, 'debt_for_neighbor': 0.5, 'points_for_victory_tokens': 0.5, 'gold_and_points_for_victory_tokens': 0.5,
                    'discard_defeat_tokens': 0.5, 'points_for_shields': 0.5, 'points_for_pairs': 0.5, 'points_for_triplets': 0.5 },
        distributions: { '1': 3, '2': 3.5, '3': 14 },
        wonderDistributions: { '1': 2, '2': 2, '3': 4 },
    },
    'utility': {
        effects: { 'play_last_card': 1, 'build_free_first_color': 1, 'build_free_first_card': 1, 'build_free_last_card': 1, 'build_free_once_per_age': 1,
                   'waive_wonder_resource_costs': 1, 'turret': 1, 'shields_for_defeat_tokens': 1, 'eye': 1 },
        distributions: { '1': 1, '2': 1, '3': 0 },
        wonderDistributions: { '1': 1, '2': 1, '3': 0 },
    },
    'discard': {
        effects: { 'build_from_discard': 1 },
        distributions: { '1': 0.2, '2': 0.2, '3': 0.2 },
        wonderDistributions: { '1': 0.5, '2': 0.5, '3': 0.5 },
    },
    'negative': {
        effects: { 'gold_for_others': 1, 'gold_for_neighbor': 1 },
        distributions: { '1': 0, '2': 0, '3': 0 },
        wonderDistributions: { '1': 0, '2': 0, '3': 0 },
    },
}

const bannedEffectsByAge = {
    '1': ['multi_science', 'gold_for_defeat_tokens', 'points_for_victory_tokens', 'gold_and_points_for_victory_tokens', 'discard_defeat_tokens', 'broken_gold_for_stages', 'broken_gold_for_victory_tokens'],
    '2': [],
    '3': ['eye'],
}

const agePointGoal = {
    '1': 2,
    '2': 4,
    '3': 6,
}

function randomEffectType(age, forWonder, theme, sevenBlundersEnabled) {
    let categories = Object.keys(effectCategories);
    let category;
    for (let i = 0; i < 1000; i++) {
        category = utils.randElementWeighted(categories, categories.map(c => {
            let dist = forWonder ? effectCategories[c].wonderDistributions[age] : effectCategories[c].distributions[age];
            if (c === theme && dist > 0) {
                if (c === 'diplomacy') {
                    dist = 1.5;
                } else {
                    dist = Math.max(3, dist*3);
                }
            }
            return dist;
        }));
        if (sevenBlundersEnabled && category === 'diplomacy') continue;
        break;
    }
    let effectDistribution = effectCategories[category].effects;
    let effectType;
    for (let i = 0; i < 1000; i++) {
        effectType = utils.randElementWeighted(Object.keys(effectDistribution), Object.keys(effectDistribution).map(k => effectDistribution[k]));
        if (bannedEffectsByAge[age].includes(effectType)) continue;
        break;
    }
    return effectType;
}

function randomNegativeEffectType() {
    let effectDistribution = effectCategories['negative'].effects;
    return utils.randElementWeighted(Object.keys(effectDistribution), Object.keys(effectDistribution).map(k => effectDistribution[k]));
}

function randomEffectForTargetValue(age, minValue, maxValue, forWonder, theme, sevenBlundersEnabled) {
    if (minValue < -5 && maxValue < 0) {
        return { type: 'points', points: utils.randInt(minValue, maxValue) };
    }

    if (minValue < 0) {
        if (utils.randBool(0.4) && maxValue < 0) return { type: 'points', points: utils.randInt(minValue, maxValue) };
        return randomEffectByType[randomNegativeEffectType()].effect(age);
    }
    
    let iters = 100;
    while (iters > 0) {
        let effectType = randomEffectType(age, forWonder, theme, sevenBlundersEnabled);
        let effect = randomEffectByType[effectType].effect(age);
        let effectValue = randomEffectByType[effect.type].value(effect, age);
        if (effectValue >= minValue && effectValue <= maxValue) return effect;
        iters--;
    }
    
    return { type: 'points', points: minValue };
}

function resolveEffects(effects) {
    if (effects.length !== 2) return effects;
    if (effects[0].type === 'points' && effects[1].type === 'points') {
        return [{ type: 'points', points: effects[0].points + effects[1].points }];
    }
    return effects;
}

function randomCost(age) {
    let resourceCost = [];
    if (utils.randBool(0.3)) resourceCost.push(utils.randElement(resources));
    if (age >= 2 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 2 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 3 && resourceCost.length > 0 && utils.randBool(0.7)) resourceCost.push(resourceCost[0]);
    if (age >= 3 && utils.randBool(0.7)) resourceCost.push(utils.randElement(resources));
    if (age >= 3 && utils.randBool(0.3)) resourceCost.push(utils.randElement(resources));
    
    resourceCost.sort((r1, r2) => resources.indexOf(r1) - resources.indexOf(r2));
    
    return {
        resources: resourceCost,
        gold: utils.randBool(0.1) ? utils.randInt(1, age) : undefined,
    };
}

exports.generateDeckForPlayersAge = (players, age, sevenBlundersEnabled, cardsPerHand) => {
    let cardNameParts = cardData.getCardNameParts();
    let usedNames = new Set();
    
    let deck = [];
    for (let i = 0; i < cardsPerHand * players; i++) {
        let effectType = randomEffectType(age, false, undefined, sevenBlundersEnabled);
        deck.push(getCardForAge(effectType, age, getCardName(cardNameParts, usedNames), sevenBlundersEnabled));
    }
    
    if (age === 1 || age === 2) {
        let resourceCards = deck.filter(card => card.effects[0].type === 'resource' || card.effects[0].type === 'multi_resource');
        let nonResourceCards = deck.filter(card => !resourceCards.includes(card));
        if (resourceCards.length > 0 && resourceCards.length < 6) {
            let resourcesToAdd = 6 - resourceCards.length + utils.randInt(0, 1);
            for (let i = 0; i < resourcesToAdd; i++) {
                let cardToReplace = utils.randElement(nonResourceCards);
                nonResourceCards.splice(nonResourceCards.indexOf(cardToReplace), 1);
                deck.splice(deck.indexOf(cardToReplace), 1);
                
                let effectType = utils.randElementWeighted(['resource', 'multi_resource'], [2, 1]);
                deck.push(getCardForAge(effectType, age, getCardName(cardNameParts, usedNames), sevenBlundersEnabled));
            }
        }
    }
    
    return deck;
}

function getCardName(parts, usedCardNames) {
    for (let i = 0; i < 1000; i++) {
        let name;
        if (utils.randBool(0.4)) {
            name = `${utils.randElement(parts.adjectives)} ${utils.randElement(parts.nouns)}`;
        } else if (utils.randBool(0.666)) {
            name = utils.randElement(parts.nouns);
        } else {
            name = `${utils.randElement(parts.nouns)} of ${utils.randElement(parts.ofs)}`;
        }
        
        if (!usedCardNames.has(name) && name.length <= 19) {
            usedCardNames.add(name);
            return name;
        }
    }
    return 'I AM ERROR';
}

function getCardForAge(effectType, age, cardName, sevenBlundersEnabled) {
    let effects = [randomEffectByType[effectType].effect(age)];
    let color = utils.randElement(randomEffectByType[effectType].colors);
    
    // Adjust value if needed
    let valueDiff = agePointGoal[age] - randomEffectByType[effectType].value(effects[0], age);
    if (valueDiff && valueDiff > 0 && utils.randBool(0.8)) {
        effects.push(randomEffectForTargetValue(age, Math.max(1, valueDiff-2), valueDiff+1, false, undefined, sevenBlundersEnabled));
    }
    
    if (valueDiff && valueDiff < -1 && utils.randBool(0.5)) {
        effects.push(randomEffectForTargetValue(age, valueDiff, -1, false, undefined, sevenBlundersEnabled));
    }
    
    // Age 2 override to create double resources
    if (age === 2 && effects[0].type === 'resource') {
        effects = [effects[0], { type: 'resource', resource: utils.randElement(resources) }];
    }
    
    return { age: age, name: cardName, color: color, cost: randomCost(age), effects: resolveEffects(effects) };
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

exports.getInitialHands = (cards, players, cardsPerHand) => {
    let numCards = Object.keys(cards).length;
    if (numCards !== cardsPerHand*3*players) {
        throw new Error(`Invalid number of cards for ${players} players: ${numCards}`);
    }
    
    let result = {};
    
    for (let age = 1; age <= 3; age++) {
        let cardIds = utils.shuffled(utils.range(cardsPerHand*players*(age-1), cardsPerHand*players*age-1));
        let hands = [];
        for (let i = 0; i < players; i++) {
            let hand = [];
            for (let j = 0; j < cardsPerHand; j++) {
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

function getGoldCostByAge(age) {
    if (age === 1) return 2;
    if (age === 2) return utils.randInt(3, 4);
    if (age === 3) return utils.randInt(6, 8);
    return utils.randInt(2, 8);
}

const wonderThemes = [
    'resource',
    'economy',
    'military',
    'diplomacy',
    'multi_science',
    'raw_points',
    'points',
    'utility',
    'discard'
];

exports.getRandomWonderChoices = (player, sevenBlundersEnabled) => {
    let name = player;
    let outline_color = utils.randInt(0x000000, 0xFFFFFF);
    let starting_effect = utils.randBool(0.1) ? { type: 'gold', gold: 4 } : randomEffectByType['resource'].effect(1);
    let starting_effect_color = starting_effect.type === 'gold' ? 'yellow' : (['glass', 'press', 'loom'].includes(starting_effect.resource) ? 'grey' : 'brown');
    
    let stageSets = [];
    
    let theme = utils.randElement(wonderThemes);
    
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
            let effectType = randomEffectType(age, true, theme, sevenBlundersEnabled);
            let effects = [randomEffectByType[effectType].effect(age)];
            
            // Adjust value if needed
            let valueDiff = agePointWonderStageGoal[age] - randomEffectByType[effectType].value(effects[0], age);
            if (valueDiff && valueDiff > 0) {
                effects.push(randomEffectForTargetValue(age, Math.max(0, valueDiff-2), valueDiff, true, theme, sevenBlundersEnabled));
            }
            
            if (valueDiff && valueDiff < 0) {
                effects.push(randomEffectForTargetValue(age, valueDiff, 0, true, theme, sevenBlundersEnabled));
            }
            
            let useGoldCost = utils.randBool(0.05);
            
            stages.push({
                cost: useGoldCost ? { gold: getGoldCostByAge(age) } : { resources: resourceCosts[i] },
                effects: resolveEffects(effects),
            });
        }
        stageSets.push(stages);
    }
    
    let totalValue0 = utils.sumArray(stageSets[0], stage => utils.sumArray(stage.effects, effect => randomEffectByType[effect.type].value(effect, 2)));
    let totalValue1 = utils.sumArray(stageSets[1], stage => utils.sumArray(stage.effects, effect => randomEffectByType[effect.type].value(effect, 2)));
    
    if (totalValue0 < targetValueByStageCount[stageSets[0].length] || totalValue1 < targetValueByStageCount[stageSets[1].length]) {
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