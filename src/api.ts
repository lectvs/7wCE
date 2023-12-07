namespace API {
    export type GameState = {
        state: 'CHOOSE_WONDER_SIDE' | 'NORMAL_MOVE' | 'LAST_CARD_MOVE' | 'DISCARD_MOVE' | 'CHOOSE_GOLD_TO_LOSE' | 'SEE_FUTURE' | 'GAME_COMPLETE';
        citiesEnabled: boolean;
        sevenBlundersEnabled: boolean;
        randomizerEnabled: boolean;
        hideDeck: boolean;
        discardMoveQueue: string[];
        lastCardPlayers: string[];
        chooseGoldToLosePlayers: string[];
        seeFuturePlayers: string[];
        seeFutureCards: number[];
        turretPlayers: string[];
        fightingPlayers?: string[];
        diplomacyPlayers?: string[];
        players: string[];
        host: string;
        age: number;
        turn: number;
        turnInAge: number;
        deck: Deck;
        playerData: Dict<PlayerData>;
        discardedCards?: number[]
        discardedCardCount: number;
        lastDiscardedCardAge: number;
        hand: number[];
        validMoves: Move[];
        cards: Dict<Card>;
        wonders: Dict<Wonder>;
        wonderChoices?: Dict<Wonder[]>;
    }

    export type PlayerData = {
        gold: number;
        playedCards: number[];
        stagesBuilt: StageBuilt[];
        militaryTokens: number[];
        gainedMilitaryTokensFromConflict?: number[];
        debtTokens: number;
        goldToLose: number;
        diplomacyTokens: number;
        handCount: number;
        zeusUsed: boolean;
        buildFreeWithoutChainUsages: boolean;
        lastMove?: Move;
        currentMove?: Move;
        pointsDistribution: PointsDistribution;
        elo?: EloData;
        totalShields: number;
        shieldsFromGainedDefeatTokens: number;
        cardPoints: Dict<number>;
    }

    export type StageBuilt = {
        stage: number;
        cardAge: number;
        copyPlayer?: string;
        copyStage?: number;
    }

    export type PointsDistribution = {
        conflict: number;
        finance: number;
        wonder: number;
        civilian: number;
        commerce: number;
        guild: number;
        science: number;
        black: number;
        total: number;
    }

    export type EloData = {
        before: number;
        diff: number;
        after: number;
    }

    export type Deck = Dict<{
        id: number;
        count: number;
    }[]>

    export type Card = {
        age: number;
        name: string;
        color: string;
        cost?: Cost;
        effects: Effect[];
        chains?: string[];
    }

    export type Cost = {
        gold?: number;
        resources?: string[];
        chain?: string;
    }

    export type Effect = {
        type: string;
        resource?: string;
        resources?: string;
        purchasable?: boolean;
        symbol?: string;
        symbols?: string;
        direction?: string;
        gold?: number;
        points?: number;
        shields?: number;
        color?: string;
        gold_per_card?: number;
        gold_per_stage?: number;
        gold_per_token?: number;
        points_per_card?: number;
        points_per_stage?: number;
        points_per_token?: number;
        points_per_shield?: number;
        points_per_pair?: number;
        points_per_triplet?: number;
        points_per_chain?: number;
        usages?: number;
        token_value?: number;
        priority?: number;
    }

    export type Wonder = {
        name: string;
        side: string;
        outline_color: string | number;
        starting_effect_color: string | number;
        starting_effects: Effect[];
        stages: WonderStage[];
    }

    export type WonderStage = {
        cost: Cost;
        effects: Effect[];
        copy_stage?: CopyStageProperties;
    }

    export type CopyStageProperties = {
        stage: 'first' | 'second' | 'last';
        dir: 'pos' | 'neg';
    }

    export type Move = {
        action: 'play' | 'wonder' | 'throw' | 'reject' | 'accept';
        card: number;
        index?: number;
        stage?: number;
        payment?: Payment;
        side?: number;
        gold_to_lose?: number;
        copyPlayer?: string;
        copyStage?: number;
    }

    export type Payment = {
        pos?: number;
        neg?: number;
        bank?: number;
        free_with_zeus?: boolean;
        free_with_delphoi?: boolean;
    }

    export type User = {
        username: string;
        wonder_preferences: WonderPreference[];
        elo: number;
        friends: string[];
    }

    export type WonderPreference = {
        id: string;
        name: string;
    }

    export type CreateGameOptions = {
        players: string[];
        flags: string[];
        extraCards: number;
    }

    export function eqMove(move1: Move, move2: Move) {
        if (!move1 && !move2) return true;
        if (!move1 || !move2) return false;
        if (move1.action !== move2.action) return false;
        if (move1.card !== move2.card) return false;
        if (move1.stage !== move2.stage) return false;
        if (move1.stage !== move2.stage) return false;
        if (move1.copyPlayer !== move2.copyPlayer) return false;
        if (move1.copyStage !== move2.copyStage) return false;
        return eqPayment(move1.payment, move2.payment);
    }

    export function eqPayment(payment1: Payment, payment2: Payment) {
        if (!payment1 && !payment2) return true;
        if (!payment1 || !payment2) return false;
        if ((payment1.pos || 0) !== (payment2.pos || 0)) return false;
        if ((payment1.neg || 0) !== (payment2.neg || 0)) return false;
        if ((payment1.bank || 0) !== (payment2.bank || 0)) return false;
        if ((payment1.free_with_zeus || false) !== (payment2.free_with_zeus || false)) return false;
        if ((payment1.free_with_delphoi || false) !== (payment2.free_with_delphoi || false)) return false;
        return true;
    }

    export function totalPaymentAmount(payment: Payment) {
        if (!payment) return 0;
        return (payment.pos || 0) + (payment.neg || 0) + (payment.bank || 0);
    }

    export function totalNeighborPaymentAmount(payment: Payment) {
        if (!payment) return 0;
        return (payment.pos || 0) + (payment.neg || 0);
    }

    export function minimalBankPayment(move: Move, validMoves: Move[]) {
        let result = Infinity;
        for (let validMove of validMoves) {
            if (validMove.action !== move.action) continue;
            if (validMove.card !== move.card) continue;
            if (validMove.stage !== move.stage) continue;
            if (validMove.copyPlayer !== move.copyPlayer) continue;
            if (validMove.copyStage !== move.copyStage) continue;
            let bankPayment = validMove.payment?.bank || 0;
            if (!validMove.payment?.free_with_zeus && !validMove.payment?.free_with_delphoi && bankPayment < result) result = bankPayment;
        }
        return result;
    }

    export function isPaymentSelectionNecessary(move: Move, validMoves: Move[]) {
        let matchingMoves = validMoves.filter(validMove => validMove.action === move.action && validMove.card === move.card && validMove.copyPlayer === move.copyPlayer && validMove.stage === move.stage && validMove.copyStage === move.copyStage);

        // If the move is already free...
        for (let validMove of matchingMoves) {
            if (totalPaymentAmount(validMove.payment) === 0 && !validMove.payment?.free_with_zeus && !validMove.payment?.free_with_delphoi) {
                return false;
            }
        }

        // If move is not free and Olympia or Delphoi power is active...
        if (isZeusActive(matchingMoves) || isDelphoiActive(matchingMoves)) {
            return true;
        }

        // If move does not require neighbor payment...
        for (let validMove of matchingMoves) {
            if (totalNeighborPaymentAmount(validMove.payment) === 0) {
                return false;
            }
        }

        // Otherwise, move requires neighbor payment.
        return true;
    }

    export function isCopyStageSelectionNecessary(stage: number, validMoves: Move[], turretPlayers: string[]) {
        let options = copyStageOptions(stage, validMoves);
        if (options.length === 0) return false;
        if (options.length > 1) return true;
        return contains(turretPlayers, options[0].copyPlayer);
    }

    export function isZeusActive(moves: Move[]) {
        for (let move of moves) {
            if (move.payment?.free_with_zeus) return true;
        }
        return false;
    }

    export function isDelphoiActive(moves: Move[]) {
        for (let move of moves) {
            if (move.payment?.free_with_delphoi) return true;
        }
        return false;
    }

    export function canReject(validMoves: Move[]) {
        return validMoves.find(move => move.action === 'reject') !== undefined;
    }

    export function getNeighbors(gamestate: GameState, player: string) {
        let neg_index = gamestate.players.indexOf(player)-1;
        if (neg_index < 0) neg_index += gamestate.players.length;

        let pos_index = gamestate.players.indexOf(player)+1;
        if (pos_index >= gamestate.players.length) pos_index -= gamestate.players.length;
        
        return [gamestate.players[neg_index], gamestate.players[pos_index]];
    }

    export function minimalPaymentOptions(move: Move, validMoves: Move[]) {
        let options: Payment[] = [];
        for (let validMove of validMoves) {
            if (validMove.action !== move.action) continue;
            if (validMove.card !== move.card) continue;
            if (validMove.stage !== move.stage) continue;
            if (validMove.copyPlayer !== move.copyPlayer) continue;
            if (validMove.copyStage !== move.copyStage) continue;
            options.push(validMove.payment);
        }

        options.sort((o1, o2) => totalPaymentAmount(o1) - totalPaymentAmount(o2));

        for (let i = 0; i < options.length; i++) {
            for (let j = i+1; j < options.length; j++) {
                let pos_i = options[i].pos || 0;
                let neg_i = options[i].neg || 0;
                let pos_j = options[j].pos || 0;
                let neg_j = options[j].neg || 0;
                let zeus_i = options[i].free_with_zeus;
                let zeus_j = options[j].free_with_zeus;
                let delphoi_i = options[i].free_with_delphoi;
                let delphoi_j = options[j].free_with_delphoi;
                if (pos_i <= pos_j && neg_i <= neg_j && zeus_i === zeus_j && delphoi_i === delphoi_j) {
                    options.splice(j, 1);
                    j--;
                }
            }
        }

        return options;
    }

    export function copyStageOptions(stage: number, validMoves: Move[]) {
        let result: { copyPlayer: string, copyStage: number }[] = [];
        for (let validMove of validMoves) {
            if (validMove.action !== 'wonder') continue;
            if (validMove.stage !== stage) continue;
            if (validMove.copyPlayer === undefined || validMove.copyStage === undefined) continue;
            let inResult = false;
            for (let r of result) {
                if (r.copyPlayer === validMove.copyPlayer && r.copyStage === validMove.copyStage) inResult = true;
            }
            if (inResult) continue;
            result.push({ copyPlayer: validMove.copyPlayer, copyStage: validMove.copyStage });
        }
        return result;
    }

    export function goldGain(oldGold: number, newGold: number, payment: Payment, negPayment: Payment, posPayment: Payment) {
        return newGold - oldGold + totalPaymentAmount(payment) - (negPayment?.pos || 0) - (posPayment?.neg || 0);
    }

    export function getScienceSymbol(card: Card) {
        for (let effect of card.effects) {
            if (effect.type === 'science') return effect.symbol;
        }
        return undefined;
    }

    export function getCardsProducingChain(gamestate: GameState, chain: string) {
        let cards: Card[] = [];
        for (let cardId in gamestate.cards) {
            let card = gamestate.cards[cardId];
            if (card.chains && contains(card.chains, chain)) cards.push(card);
        }
        return cards;
    }

    export function getCardsConsumingChain(gamestate: GameState, chain: string) {
        let cards: Card[] = [];
        for (let cardId in gamestate.cards) {
            let card = gamestate.cards[cardId];
            if (card.cost && card.cost.chain === chain) cards.push(card);
        }
        return cards;
    }

    /* API METHODS */
    export function getgamestate(gameid: string, player: string, password_hash: string, callback: (gamestate: GameState, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getgamestate&gameid=${gameid}&player=${player}&password_hash=${password_hash}`, (responseJson: any, error: string) => {
            if (!responseJson) {
                callback(undefined, "No gamestate received");
            } else if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
            }
        });
    }

    export function getvalidmoves(gameid: string, turn: number, player: string, password_hash: string, callback: (validMoves: Move[], error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getvalidmoves&gameid=${gameid}&turn=${turn}&player=${player}&password_hash=${password_hash}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['validMoves']) {
                callback(undefined, "No valid moves received");
            } else {
                callback(responseJson['validMoves'], undefined);
            }
        });
    }

    export function submitmove(gameid: string, turn: number, player: string, password_hash: string, move: Move, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=submitmove&gameid=${gameid}&turn=${turn}&player=${player}&password_hash=${password_hash}&move=${JSON.stringify(move)}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function undomove(gameid: string, turn: number, player: string, password_hash: string, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=undomove&gameid=${gameid}&turn=${turn}&player=${player}&password_hash=${password_hash}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function chooseside(gameid: string, player: string, password_hash: string, side: number, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=chooseside&gameid=${gameid}&player=${player}&password_hash=${password_hash}&side=${side}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function choosegoldtolose(gameid: string, turn: number, player: string, password_hash: string, gold_to_lose: number, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=choosegoldtolose&gameid=${gameid}&turn=${turn}&player=${player}&password_hash=${password_hash}&gold_to_lose=${gold_to_lose}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function updategame(gameid: string, callback: (wasUpdate: boolean, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=updategame&gameid=${gameid}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['result']) {
                callback(undefined, "No result received");
            } else {
                callback(responseJson['result'] === "SUCCESS", undefined);
            }
        });
    }

    export function getusers(usernames: string[], callback: (users: Dict<User>, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getusers&usernames=${usernames.join(',')}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['users']) {
                callback(undefined, "No users received");
            } else {
                callback(responseJson['users'], undefined);
            }
        });
    }

    export function getinvites(username: string, callback: (gameids: string[], error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getinvites&username=${username}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['gameids']) {
                callback(undefined, "No invites received");
            } else {
                callback(responseJson['gameids'], undefined);
            }
        });
    }

    export function setwonderpreferences(username: string, password_hash: string, preferences: WonderPreference[], callback: (error: string) => any) {
        let preferencesString = preferences.map(pref => pref.id).join(',');
        httpRequest(`${LAMBDA_URL}?operation=setwonderpreferences&username=${username}&password_hash=${password_hash}&preferences=${preferencesString}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function creategame(options: CreateGameOptions, callback: (gameid: string, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=creategame&players=${options.players.join(',')}&flags=${options.flags.join(',')}&extracards=${options.extraCards}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['gameid']) {
                callback(undefined, "No gameid received");
            } else {
                callback(responseJson['gameid'], undefined);
            }
        });
    }

    export function login(username: string, password_hash: string, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=login&username=${username}&password_hash=${password_hash}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }
    
    export function getpatchnotes(callback: (patchnotes: string, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getpatchnotes`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else if (!responseJson || !responseJson['patchNotes']) {
                callback(undefined, "No patch notes received");
            } else {
                callback(responseJson['patchNotes'], undefined);
            }
        });
    }

    function httpRequest(url: string, callback: (responseJson: any, error: string) => any) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.responseText);
                    if (!json.error && !json.message) {
                        callback(json, undefined);
                    } else {
                        let error = json.error ?? json.message;
                        callback(undefined, error);
                    }
                } else {
                    callback(undefined, xhr.statusText);
                }
            }
        };
        xhr.onerror = function () {
            callback(undefined, xhr.statusText);
        };
        xhr.send(null);
    }

    const LAMBDA_URL = 'https://p883xambde.execute-api.us-east-2.amazonaws.com/default/7wCE';
}