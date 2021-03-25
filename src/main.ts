class Main {
    static gameid: string;
    static player: string;
    static gamestate: API.GameState;
    static currentError: string;

    static mouseDown: boolean = false;

    static game: HTMLDivElement;
    static scene: Scene;
    static endScreen: EndScreen;

    static time: number = 0;
    static delta: number = 0;

    static scriptManager: ScriptManager;

    static gameWidth: number;
    static gameHeight: number;

    static moveImmuneTime: number;
    static diffing: boolean;

    static get isHost() { return this.gamestate.host === this.player; }
    static get isMoveImmune() { return this.moveImmuneTime > 0; }

    static start() {
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);

        this.mouseDown = false;
        this.game = <HTMLDivElement>document.getElementById('game');
        this.gameWidth = this.game.clientWidth;
        this.gameHeight = this.game.clientHeight;
        this.moveImmuneTime = 0;

        this.scriptManager = new ScriptManager();

        let params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta / 60;
            this.time += this.delta;
            this.update();
        });

        if (!this.gameid || !this.player) {
            Main.error('gameid and player must be specified in URL parameters');
            return;
        }

        API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                return;
            }

            console.log('Got game state:', gamestate);
            this.setupGame(gamestate);
        });
    }

    static setupGame(gamestate: API.GameState) {
        this.gamestate = gamestate;
        this.scene = new Scene();
        this.scene.create();
        this.sendUpdate();
    }

    static createEndScreen() {
        this.endScreen = new EndScreen();
        this.endScreen.create();
        document.getElementById('endscreen').style.display = 'block';
    }

    static update() {
        this.gameWidth = this.game.clientWidth;
        this.gameHeight = this.game.clientHeight;
        this.moveImmuneTime = clamp(this.moveImmuneTime - Main.delta, 0, Infinity);

        if (this.scene) this.scene.update();
        this.scriptManager.update();

        let status = <HTMLParagraphElement>document.querySelector('#status');
        let statusText = <HTMLParagraphElement>document.querySelector('#status > p');
        if (Main.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.textContent = Main.currentError;
        } else if (this.scene) {
            status.style.backgroundColor = C.OK_BG_COLOR;
            status.style.color = C.OK_TEXT_COLOR;
        }
    }

    static sendUpdate() {
        if (this.gamestate.state === 'GAME_COMPLETE') {
            if (!this.endScreen) this.createEndScreen();
            return;
        }
        this.scriptManager.runScript(S.chain(
            S.wait(0.5),
            S.call(() => {
                if (this.isHost) this.updateAndGetGameState();
                else this.getGameState();
                this.updateBotMoves();
            })
        ));
    }

    static getGameState() {
        API.getgamestate(this.gameid, this.player, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                this.sendUpdate();
                return;
            }

            if (gamestate.turn < Main.gamestate.turn) {
                Main.error(`Error: local turn (${Main.gamestate.turn}) is greater than the game's (${gamestate.turn})?`);
                this.sendUpdate();
                return;
            } else if (gamestate.turn === Main.gamestate.turn) {
                let diffResult = GameStateDiffer.diffNonTurn(gamestate, true);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        this.sendUpdate();
                    })
                ));
            } else {
                let diffResult = GameStateDiffer.diffTurn(gamestate);
                this.diffing = true;
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.diffing = false;
                        this.gamestate = gamestate;
                        this.scene.destroy();
                        this.scene.create();
                        this.sendUpdate();

                    })
                ));
            }
        });
    }

    static updateAndGetGameState() {
        API.updategame(Main.gameid, (wasUpdate: boolean, error: string) => {
            if (error) {
                Main.error(error);
            } else {
                if (wasUpdate) console.log('Updated game');
            }
            this.getGameState();
        });
    }

    static submitMove(move: API.Move) {
        API.submitmove(Main.gameid, Main.gamestate.turn, Main.player, move, (error: string) => {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Submitted move:', move);
            this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 2;
    }

    static undoMove() {
        API.undomove(this.gameid, this.gamestate.turn, this.player, (error: string) => {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Undo move successful');
            this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 2;
    }

    static updateBotMoves() {
        if (!this.isHost) return;
        for (let player of this.gamestate.players) {
            if (player.startsWith('BOT') && !this.gamestate.playerData[player].currentMove) {
                let botPlayer = player;
                let turn = this.gamestate.turn;
                API.getvalidmoves(this.gameid, this.gamestate.turn, botPlayer, (validMoves: API.Move[], error: string) => {
                    if (error) {
                        Main.error(error);
                        return;
                    }

                    if (turn !== this.gamestate.turn || validMoves.length === 0) return;

                    let move = Bot.getMove(validMoves);
                    API.submitmove(this.gameid, this.gamestate.turn, botPlayer, move, (error: string) => {
                        if (error) {
                            Main.error(error);
                            return;
                        }
                        console.log('Successfully submitted bot move:', move);
                    })
                });
            }
        }
    }

    static stop() {
        this.scriptManager.reset();
    }

    static error(text: string) {
        console.error(text);
        this.scriptManager.runScript(function*() {
            Main.currentError = text;
            yield* S.wait(3)();
            Main.currentError = undefined;
        });
    }

    static getGameY() {
        return document.getElementById('status').clientHeight
             + document.getElementById('endscreen').clientHeight;
    }
}
