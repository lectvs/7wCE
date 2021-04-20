namespace API {
    export type GameState = {
        state: 'CHOOSE_WONDER_SIDE' | 'NORMAL_MOVE' | 'LAST_CARD_MOVE' | 'DISCARD_MOVE' | 'GAME_COMPLETE';
        discardMoveQueue: string[];
        lastCardPlayers: string[];
        players: string[];
        host: string;
        age: number;
        turn: number;
        turnInAge: number;
        deck: Dict<number[]>;
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
        handCount: number;
        lastMove?: Move;
        currentMove?: Move;
        pointsDistribution: PointsDistribution;
        elo?: EloData;
        totalShields: number;
    }

    export type StageBuilt = {
        stage: number;
        cardAge: number;
    }

    export type PointsDistribution = {
        conflict: number;
        finance: number;
        wonder: number;
        civilian: number;
        commerce: number;
        guild: number;
        science: number;
        total: number;
    }

    export type EloData = {
        before: number;
        diff: number;
        after: number;
    }

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
        color?: string;
        gold_per_card?: number;
        gold_per_stage?: number;
        points_per_card?: number;
        points_per_stage?: number;
    }

    export type Wonder = {
        name: string;
        side: string;
        outline_color: number;
        starting_effect_color: string;
        starting_effects: Effect[];
        stages: WonderStage[];
    }

    export type WonderStage = {
        cost: Cost;
        effects: Effect[];
    }

    export type MoveHistory = Dict<Dict<Move>>;

    export type Move = {
        action: 'play' | 'wonder' | 'throw' | 'reject';
        card: number;
        stage?: number;
        payment?: Payment;
        side?: number;
    }

    export type Payment = {
        pos?: number;
        neg?: number;
        bank?: number;
    }

    export type GetUsersResponse = {
        users: Dict<User>;
    }

    export type User = {
        username: string;
        wonder_preferences: WonderPreference[];
        elo: number;
    }

    export type WonderPreference = {
        id: string;
        name: string;
    }

    export type GetInvitesResponse = {
        gameids: string[];
    }

    export function eqMove(move1: Move, move2: Move) {
        if (!move1 && !move2) return true;
        if (!move1 || !move2) return false;
        if (move1.action !== move2.action) return false;
        if (move1.card !== move2.card) return false;
        if (move1.stage !== move2.stage) return false;
        if (move1.stage !== move2.stage) return false;
        return eqPayment(move1.payment, move2.payment);
    }

    export function eqPayment(payment1: Payment, payment2: Payment) {
        if (!payment1 && !payment2) return true;
        if (!payment1 || !payment2) return false;
        if ((payment1.pos || 0) !== (payment2.pos || 0)) return false;
        if ((payment1.neg || 0) !== (payment2.neg || 0)) return false;
        if ((payment1.bank || 0) !== (payment2.bank || 0)) return false;
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
            let bankPayment = validMove.payment?.bank || 0;
            if (bankPayment < result) result = bankPayment;
        }
        return result;
    }

    export function isNeighborPaymentNecessary(move: Move, validMoves: Move[]) {
        let foundMatchingMove = false;
        for (let validMove of validMoves) {
            if (validMove.action !== move.action) continue;
            if (validMove.card !== move.card) continue;
            if (validMove.stage !== move.stage) continue;
            foundMatchingMove = true;
            let totalPayment = totalNeighborPaymentAmount(validMove.payment);
            if (totalPayment === 0) return false;
        }
        if (!foundMatchingMove) return false;
        return true;
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
            if (totalNeighborPaymentAmount(validMove.payment) === 0) continue;
            options.push(validMove.payment);
        }

        options.sort((o1, o2) => totalNeighborPaymentAmount(o1) - totalNeighborPaymentAmount(o2));

        for (let i = 0; i < options.length; i++) {
            for (let j = i+1; j < options.length; j++) {
                let pos_i = options[i].pos || 0;
                let neg_i = options[i].neg || 0;
                let pos_j = options[j].pos || 0;
                let neg_j = options[j].neg || 0;
                if (pos_i <= pos_j && neg_i <= neg_j) {
                    options.splice(j, 1);
                    j--;
                }
            }
        }

        return options;
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
    export function getgamestate(gameid: string, player: string, callback: (gamestate: GameState, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getgamestate&gameid=${gameid}&player=${player}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
            }
        });
    }

    export function getvalidmoves(gameid: string, turn: number, player: string, callback: (validMoves: Move[], error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getvalidmoves&gameid=${gameid}&turn=${turn}&player=${player}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson['validMoves'], undefined);
            }
        });
    }

    export function submitmove(gameid: string, turn: number, player: string, move: Move, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=submitmove&gameid=${gameid}&turn=${turn}&player=${player}&move=${JSON.stringify(move)}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function undomove(gameid: string, turn: number, player: string, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=undomove&gameid=${gameid}&turn=${turn}&player=${player}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function chooseside(gameid: string, player: string, side: number, callback: (error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=chooseside&gameid=${gameid}&player=${player}&side=${side}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    export function updategame(gameid: string, callback: (wasUpdate: boolean, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=updategame&gameid=${gameid}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson['result'] === "SUCCESS", undefined);
            }
        });
    }

    export function getusers(usernames: string[], callback: (response: GetUsersResponse, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getusers&usernames=${usernames.join(',')}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
            }
        });
    }

    export function getinvites(username: string, callback: (result: GetInvitesResponse, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getinvites&username=${username}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
            }
        });
    }

    export function setwonderpreferences(username: string, preferences: WonderPreference[], callback: (error: string) => any) {
        let preferencesString = preferences.map(pref => pref.id).join(',');
        httpRequest(`${LAMBDA_URL}?operation=setwonderpreferences&username=${username}&preferences=${preferencesString}`, (responseJson: any, error: string) => {
            callback(error);
        });
    }

    function httpRequest(url: string, callback: (responseJson: any, error: string) => any) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let json = JSON.parse(xhr.responseText);
                    if (!json.error) {
                        callback(json, undefined);
                    } else {
                        callback(undefined, json.error);
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