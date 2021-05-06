class Main {
    static gameid: string;
    static player: string;
    static password_hash: string;
    static gamestate: API.GameState;
    static users: Dict<API.User>;
    static currentError: string;

    static mouseX: number = 0;
    static mouseY: number = 0;
    static mouseDown: boolean = false;

    static game: HTMLDivElement;
    static cardList: HTMLDivElement;
    static scene: Scene;
    static cardListScene: CardListScene;
    static endScreen: EndScreen;

    static time: number = 0;
    static delta: number = 0;

    static loader: Loader;
    static scriptManager: ScriptManager;

    static moveImmuneTime: number;
    static diffing: boolean;

    static get isHost() { return this.gamestate.host === this.player; }
    static get isMoveImmune() { return this.moveImmuneTime > 0; }

    static start() {
        window.addEventListener('mousedown', () => this.mouseDown = true);
        window.addEventListener('mouseup', () => this.mouseDown = false);

        window.onmousemove = (event: MouseEvent) => {
            event.preventDefault();
            this.mouseX = event.pageX - window.innerWidth/2;
            this.mouseY = event.pageY - Main.getGameY();
        }

        this.mouseDown = false;
        this.game = <HTMLDivElement>document.getElementById('game');
        this.cardList = <HTMLDivElement>document.getElementById('cardlist');
        this.moveImmuneTime = 0;

        this.scriptManager = new ScriptManager(() => this.delta);

        let params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');

        let userpass = getCookieUserInfo();
        if (!userpass) {
            window.location.href = './login.html';
            return;
        }
        this.player = userpass.username;
        this.password_hash = userpass.password_hash;

        this.loader = new Loader(() => {
            this.setupGame();
        });

        PIXI.Ticker.shared.add(delta => {
            this.delta = delta / 60;
            this.time += this.delta;
            this.update();
        });

        if (!this.gameid) {
            Main.error('gameid must be specified in URL parameters');
            return;
        }

        API.getgamestate(this.gameid, this.player, this.password_hash, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                return;
            }

            console.log('Got game state:', gamestate);
            this.gamestate = gamestate;

            API.getusers(this.gamestate.players, (users: Dict<API.User>, error: string) => {
                if (error) {
                    Main.error('Failed to get user info: ' + error);
                    return;
                }

                console.log('Got user info:', users);
                this.users = users;
    
                PIXI.Loader.shared.add('wood', 'assets/wood.svg');
                PIXI.Loader.shared.add('stone', 'assets/stone.svg');
                PIXI.Loader.shared.add('ore', 'assets/ore.svg');
                PIXI.Loader.shared.add('clay', 'assets/clay.svg');
                PIXI.Loader.shared.add('glass', 'assets/glass.svg');
                PIXI.Loader.shared.add('press', 'assets/press.svg');
                PIXI.Loader.shared.add('loom', 'assets/loom.svg');
                PIXI.Loader.shared.add('shield', 'assets/shield.svg');
                PIXI.Loader.shared.add('goldcoin', 'assets/goldcoin.svg');
                PIXI.Loader.shared.add('pointswreath', 'assets/pointswreath.svg');
                PIXI.Loader.shared.add('compass', 'assets/compass.svg');
                PIXI.Loader.shared.add('tablet', 'assets/tablet.svg');
                PIXI.Loader.shared.add('gear', 'assets/gear.svg');
                PIXI.Loader.shared.add('pyramid_full', 'assets/pyramid_full.svg');
                PIXI.Loader.shared.add('pyramid_stages', 'assets/pyramid_stages.svg');
                PIXI.Loader.shared.add('falcon', 'assets/falcon.svg');
                PIXI.Loader.shared.add('mask', 'assets/mask.svg');
                PIXI.Loader.shared.add('unproduced_resource', 'assets/unproduced_resource.svg');
                PIXI.Loader.shared.load((loader: any, resources: Dict<PIXI.LoaderResource>) => {
                    for (let resource in resources) {
                        Resources.PIXI_TEXTURES[resource] = resources[resource].texture;
                    }
                    this.loader.loadGamestateResources();
                });
            });
        });
    }

    static setupGame() {
        this.scene = this.gamestate.state === 'CHOOSE_WONDER_SIDE' ? new ChooseWonderScene() : new GameScene();
        this.scene.create();
        document.getElementById('cardlistelems').style.visibility = 'visible';
        this.cardListScene = new CardListScene();
        this.cardListScene.create();
        this.sendUpdate();
    }

    static createEndScreen() {
        this.endScreen = new EndScreen();
        this.endScreen.create();
        document.getElementById('endscreen').style.display = 'block';
    }

    static update() {
        this.loader.update();
        this.moveImmuneTime = clamp(this.moveImmuneTime - Main.delta, 0, Infinity);

        if (this.scene) this.scene.update();
        if (this.cardListScene) this.cardListScene.update();
        this.scriptManager.update();
        this.setStatus();
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
        API.getgamestate(this.gameid, this.player, this.password_hash, (gamestate: API.GameState, error: string) => {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                this.sendUpdate();
                return;
            }

            if (gamestate.turn < Main.gamestate.turn) {
                Main.error(`Error: local turn (${Main.gamestate.turn}) is greater than the game's (${gamestate.turn})?`);
                this.sendUpdate();
                return;
            } else if (Main.gamestate.state === 'CHOOSE_WONDER_SIDE') {
                if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
                    let diffResult = GameStateDiffer.diffChooseSide(gamestate);
                    this.scriptManager.runScript(S.chain(
                        S.simul(...diffResult.scripts),
                        S.call(() => {
                            this.gamestate = gamestate;
                            this.sendUpdate();
                        })
                    ));
                } else {
                    this.gamestate = gamestate;
                    this.scene.destroy();
                    this.scene = new GameScene();
                    this.scene.create();
                    this.sendUpdate();
                }
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
        API.updategame(this.gameid, (wasUpdate: boolean, error: string) => {
            if (error) {
                this.error(error);
            } else {
                if (wasUpdate) console.log('Updated game');
            }
            this.getGameState();
        });
    }

    static submitMove(move: API.Move) {
        API.submitmove(this.gameid, this.gamestate.turn, this.player, this.password_hash, move, (error: string) => {
            if (error) {
                this.error(error);
                return;
            }
            console.log('Submitted move:', move);
            this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    }

    static undoMove() {
        API.undomove(this.gameid, this.gamestate.turn, this.player, this.password_hash, (error: string) => {
            if (error) {
                this.error(error);
                return;
            }
            console.log('Undo move successful');
            this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    }

    static chooseSide(side: number) {
        API.chooseside(this.gameid, this.player, this.password_hash, side, (error: string) => {
            if (error) {
                this.error(error);
                return;
            }
            console.log('Chose wonder side:', side);
            this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    }

    static setStatus() {
        let status = <HTMLParagraphElement>document.querySelector('#status');
        let statusText = <HTMLParagraphElement>document.querySelector('#status > p');

        if (Main.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.textContent = Main.currentError;
            return;
        } 

        if (this.scene) {
            status.style.backgroundColor = C.OK_BG_COLOR;
            status.style.color = C.OK_TEXT_COLOR;
        }
    
        if (!this.loader.isLoaded) {
            statusText.textContent = `Loading... ${this.loader.loadPercentage}%`;
            return;
        }

        let gamestate = this.gamestate;
        let playerData = gamestate.playerData[this.player];

        if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
            if (playerData.currentMove) {
                statusText.textContent = "Waiting for others to choose their wonder side";
            } else {
                statusText.textContent = "You must choose your wonder side";
            }
        } else if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                statusText.textContent = "Waiting for others to move";
            } else {
                statusText.textContent = "You must play a card";
            }
        } else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                if (gamestate.lastCardPlayers.length === 1) {
                    statusText.textContent = `Waiting for ${gamestate.lastCardPlayers[0]} to play their last card`;
                } else {
                    statusText.textContent = "Waiting for others to play their last cards";
                }
            } else {
                statusText.textContent = "You may play your last card";
            }
        } else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === this.player) {
                statusText.textContent = "You may build a card from the discard pile";
            } else {
                statusText.textContent = `Waiting for ${gamestate.discardMoveQueue[0]} to build a card from the discard pile`;
            }
        } else if (gamestate.state === 'GAME_COMPLETE') {
            statusText.textContent = "Game complete";
        }
    }

    static updateBotMoves() {
        if (!this.isHost) return;
        for (let player of this.gamestate.players) {
            if (player.startsWith('BOT') && !this.gamestate.playerData[player].currentMove) {
                let botPlayer = player;
                if (this.gamestate.state === 'CHOOSE_WONDER_SIDE') {
                    let side = Bot.chooseSide(this.gamestate.wonderChoices[botPlayer]);
                    API.chooseside(this.gameid, botPlayer, undefined, side, (error: string) => {
                        if (error) {
                            this.error(error);
                            return;
                        }
                        console.log('Successfully chose bot wonder side:', side);
                    });
                } else {
                    let turn = this.gamestate.turn;
                    API.getvalidmoves(this.gameid, this.gamestate.turn, botPlayer, undefined, (validMoves: API.Move[], error: string) => {
                        if (error) {
                            this.error(error);
                            return;
                        }
    
                        if (turn !== this.gamestate.turn || validMoves.length === 0) return;
    
                        let move = Bot.getMove(validMoves);
                        API.submitmove(this.gameid, this.gamestate.turn, botPlayer, undefined, move, (error: string) => {
                            if (error) {
                                this.error(error);
                                return;
                            }
                            console.log('Successfully submitted bot move:', move);
                        })
                    });
                }
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
