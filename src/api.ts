namespace API {
    export type GameData = {
        players: string[];
        cards: Dict<Card>;
        wonders: Dict<Wonder>;
    }

    export type GameState = {
        state: 'NORMAL_MOVE' | 'LAST_CARD_MOVE' | 'DISCARD_MOVE' | 'GAME_COMPLETE';
        yourMoveState: 'NOT_MOVED' | 'MOVED';
        discardMoveQueue: string[];
        age: number;
        turn: number;
        playerData: Dict<PlayerData>;
        discardedCardCount: number;
    }

    export type PlayerData = {
        gold: number;
        playedCards: number[];
        stagesBuilt: StageBuilt[];
        militaryTokens: number[];
        hand?: number[];
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
        payment: Payment;
    }

    export type Payment = {
        pos?: number;
        neg?: number;
        bank?: number;
    }

    export function getgamedata(gameid: string, callback: (gamedata: GameData, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getgamedata&gameid=${gameid}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
            }
        });
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

    export function getmovehistory(gameid: string, player: string, callback: (movehistory: MoveHistory, error: string) => any) {
        httpRequest(`${LAMBDA_URL}?operation=getmovehistory&gameid=${gameid}&player=${player}`, (responseJson: any, error: string) => {
            if (error) {
                callback(undefined, error);
            } else {
                callback(responseJson, undefined);
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