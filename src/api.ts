namespace API {
    export type GameState = {
        state: 'NORMAL_MOVE' | 'LAST_CARD_MOVE' | 'DISCARD_MOVE' | 'GAME_COMPLETE';
        discardMoveQueue: string[];
        players: string[];
        host: string;
        age: number;
        turn: number;
        playerData: Dict<PlayerData>;
        discardedCardCount: number;
        hand: number[];
        validMoves: Move[];
        cards: Dict<Card>;
        wonders: Dict<Wonder>;
    }

    export type PlayerData = {
        gold: number;
        playedCards: number[];
        stagesBuilt: StageBuilt[];
        militaryTokens: number[];
        handCount: number;
        lastMove?: Move;
        currentMove?: Move;
        pointsDistribution: Dict<number>;
    }

    export type StageBuilt = {
        stage: number;
        cardAge: number;
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
        gold: number;
        resources: string[];
        chain: string;
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
        action: 'play' | 'wonder' | 'throw';
        card: number;
        stage?: number;
        payment?: Payment;
    }

    export type Payment = {
        pos?: number;
        neg?: number;
        bank?: number;
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

    export function totalNeighborPaymentAmount(payment: Payment) {
        if (!payment) return 0;
        return (payment.pos || 0) + (payment.neg || 0);
    }

    export function isNeighborPaymentNecessary(move: Move, validMoves: Move[]) {
        let foundMatchingMove = false;
        for (let validMove of validMoves) {
            if (validMove.action !== move.action) continue;
            if (validMove.card !== move.card) continue;
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
            if (totalNeighborPaymentAmount(validMove.payment) === 0) continue;
            options.push(validMove.payment);
        }

        options.sort((o1, o2) => totalNeighborPaymentAmount(o1) - totalNeighborPaymentAmount(o2));

        console.log(options);

        for (let i = 0; i < options.length; i++) {
            for (let j = i+1; j < options.length; j++) {
                let pos_i = options[i].pos || 0;
                let neg_i = options[i].neg || 0;
                let pos_j = options[j].pos || 0;
                let neg_j = options[j].neg || 0;
                console.log(pos_i, neg_i, pos_j, neg_j)
                if (pos_i <= pos_j && neg_i <= neg_j) {
                    options.splice(j, 1);
                    j--;
                }
            }
        }

        return options;
    }

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

    export function updategame(gameid: string, callback: (wasUpdate: boolean, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=updategame&gameid=${gameid}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson['result'] === "SUCCESS", undefined);
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