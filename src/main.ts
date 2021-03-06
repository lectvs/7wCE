class Main {
    
    static get width() { return this.app.view.width; }
    static get height() { return this.app.view.height; }

    static gameid: string;
    static player: string;
    static gamestate: API.GameState;

    static mouseDown: boolean;

    static app: PIXI.Application;
    static scene: Scene;

    static initialized: boolean;

    static delta: number = 0;

    static scriptManager: ScriptManager;

    static get isHost() { return this.gamestate.host === this.player; }

    static start() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: 2000,
            antialias: true
        });
        
        document.body.appendChild(this.app.view);
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);
        window.addEventListener('resize', () => this.resize());

        this.mouseDown = false;
        this.initialized = false;

        this.scriptManager = new ScriptManager();

        let params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta / 60;
            this.update();
        });

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
        this.initialized = true;

        this.scene = new Scene();
        this.app.stage.addChild(this.scene.mainContainer);
        this.createScene();

        this.sendUpdate();
    }

    static update() {
        if (this.scene) this.scene.update();
        this.scriptManager.update();
    }

    static createScene() {
        if (!this.initialized) return;
        this.scene.create();
        this.resize();
    }

    static adjustPositions() {
        if (!this.initialized) return;
        this.scene.adjustPositions();
    }

    static resize() {
        this.adjustPositions();
        let sceneBounds = this.app.stage.getBounds();
        this.app.renderer.resize(window.innerWidth, sceneBounds.y + sceneBounds.height + 400);
        this.adjustPositions();
    }

    static sendUpdate() {
        if (this.gamestate.state === 'GAME_COMPLETE') return;
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

            //console.log('Refreshed gamestate:', gamestate);

            if (gamestate.turn < Main.gamestate.turn) {
                Main.error(`Error: local turn (${Main.gamestate.turn}) is greater than the game's (${gamestate.turn})?`);
                this.sendUpdate();
                return;
            } else if (gamestate.turn === Main.gamestate.turn) {
                let diffResult = GameStateDiffer.diffNonTurn(gamestate);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        this.sendUpdate();
                    })
                ));
            } else {
                let diffResult = GameStateDiffer.diffTurn(gamestate);
                this.scriptManager.runScript(S.chain(
                    S.simul(...diffResult.scripts),
                    S.call(() => {
                        this.gamestate = gamestate;
                        this.createScene();
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
                //this.deselect();
                //Main.undoMove();
                return;
            }
            console.log('Submitted move:', move);
        });
    }

    static undoMove() {
        API.undomove(this.gameid, this.gamestate.turn, this.player, (error: string) => {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Undo move successful');
        })
    }

    static updateBotMoves() {
        for (let player of this.gamestate.players) {
            if (player.startsWith('BOT') && !this.gamestate.playerData[player].currentMove) {
                let botPlayer = player;
                API.getvalidmoves(this.gameid, this.gamestate.turn, botPlayer, (validMoves: API.Move[], error: string) => {
                    if (error) {
                        Main.error(error);
                        return;
                    }

                    if (validMoves.length === 0) return;

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

        let errorBox = Shapes.filledRect(0, 0, Main.width, 50, 0xFF0000);
        let errorText = new PIXI.Text(text, { fontFamily : 'Arial', fontSize: 50, fill : 0x000000 });
        errorText.anchor.set(0.5, 0.5);
        errorText.scale.set(0.5);
        errorText.position.set(Main.width/2, errorBox.height/2);
        errorBox.addChild(errorText);

        let app = this.app;
        this.scriptManager.runScript(function*() {
            errorBox.position.set(0, -50);
            app.stage.addChild(errorBox);

            yield* S.doOverTime(0.1, t => errorBox.position.y = 50*t-50)();
            yield* S.wait(2)();
            yield* S.doOverTime(0.1, t => errorBox.position.y = -50*t)();

            app.stage.removeChild(errorBox);
        });
    }
}
