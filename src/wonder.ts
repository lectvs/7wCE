/// <reference path="gameElement.ts" />

class DOMWonder extends GameElement {

    private readonly BOARD_WIDTH = 600;
    private readonly BOARD_HEIGHT = 300;
    private readonly BOARD_CORNER_RADIUS = 30;
    private readonly BOARD_BORDER = 4;
    private readonly STARTING_EFFECTS_SCALE = 0.32;
    private readonly STARTING_EFFECTS_PADDING = 8;
    private readonly STAGE_MIDDLE_2 = 396;
    private readonly STAGE_MIDDLE_134 = 300;
    private readonly STAGE_DX_4 = 147;
    private readonly STAGE_DX_123 = 192;
    private readonly STAGE_WIDTH = 144;
    private readonly STAGE_HEIGHT = 63;
    private readonly STAGE_CORNER_RADIUS = 18;
    private readonly STAGE_EFFECT_SCALE = 0.29;
    private readonly STAGE_COST_OFFSET_X = 10;
    private readonly STAGE_COST_OFFSET_Y = 60;
    private readonly STAGE_COST_PADDING = 6;
    private readonly STAGE_COST_BORDER = 3;
    private readonly STAGE_COST_SCALE = 0.12;
    private readonly STAGE_PAYMENT_OFFSET_X = -10;
    private readonly STAGE_PAYMENT_OFFSET_Y = -13;
    private readonly STAGE_PAYMENT_SCALE = 0.15;

    private player: string;

    stageXs: number[];

    constructor(player: string) {
        super();

        this.player = player;

        let canvas = this.draw();
        this.div.appendChild(canvas);
    }

    private draw() {
        let wonder = Main.gamestate.wonders[this.player];
        let playerData = Main.gamestate.playerData[this.player];

        let wonderBoard = new PIXI.Container();

        // Board
        let boardBase = Shapes.filledRoundedRect(0, 0, this.BOARD_WIDTH, this.BOARD_HEIGHT, this.BOARD_CORNER_RADIUS, wonder.outline_color);
        wonderBoard.addChild(boardBase);

        let boardBg = Shapes.filledRoundedRect(this.BOARD_BORDER, this.BOARD_BORDER,
                                                this.BOARD_WIDTH - 2*this.BOARD_BORDER, this.BOARD_HEIGHT - 2*this.BOARD_BORDER,
                                                this.BOARD_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
        wonderBoard.addChild(boardBg);

        let boardBgMask = boardBg.clone();
        wonderBoard.addChild(boardBgMask);

        // Starting effects
        let startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        startingEffects.scale.set(this.STARTING_EFFECTS_SCALE);
        let startingEffectsBounds = startingEffects.getBounds();
        startingEffects.position.set(this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffects.x),
                                     this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffects.y));

        startingEffectsBounds = startingEffects.getBounds();
        let startingEffectBanner = Shapes.filledRect(startingEffectsBounds.left - this.STARTING_EFFECTS_PADDING, startingEffectsBounds.top - this.STARTING_EFFECTS_PADDING,
                                                     startingEffectsBounds.width + 2*this.STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2*this.STARTING_EFFECTS_PADDING,
                                                     ArtCommon.cardBannerForColor(wonder.starting_effect_color));
        startingEffectBanner.mask = boardBgMask;
        wonderBoard.addChild(startingEffectBanner);
        wonderBoard.addChild(startingEffects);

        // Wonder stages
        let stageIdsBuilt = playerData.stagesBuilt.map(stageBuilt => stageBuilt.stage);
        let wonderStageMinCosts = wonder.stages.map(stage => Infinity);
        for (let validMove of Main.gamestate.validMoves) {
            if (validMove.action !== 'wonder') continue;
            let stage = validMove.stage;
            let cost = API.totalPaymentAmount(validMove.payment);
            if (cost < wonderStageMinCosts[stage]) {
                wonderStageMinCosts[stage] = cost;
            }
        }

        let stagesMiddle = wonder.stages.length === 2 ? this.STAGE_MIDDLE_2 : this.STAGE_MIDDLE_134;
        let stageDX = wonder.stages.length === 4 ? this.STAGE_DX_4 : this.STAGE_DX_123;

        this.stageXs = [];
        for (let i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1)/2));

            let stageBase = Shapes.filledRoundedRect(-this.STAGE_WIDTH/2, this.BOARD_HEIGHT - this.STAGE_HEIGHT,
                                                     this.STAGE_WIDTH, this.STAGE_HEIGHT*2, this.STAGE_CORNER_RADIUS, wonder.outline_color);
            stageBase.mask = boardBgMask;
            stageBase.x = this.stageXs[i];
            wonderBoard.addChild(stageBase);

            let stageBg = Shapes.filledRoundedRect(-this.STAGE_WIDTH/2 + this.BOARD_BORDER, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.BOARD_BORDER,
                                                   this.STAGE_WIDTH - 2*this.BOARD_BORDER, this.STAGE_HEIGHT*2 - 2*this.BOARD_BORDER,
                                                   this.STAGE_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = this.stageXs[i];
            wonderBoard.addChild(stageBg);

            let stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(this.STAGE_EFFECT_SCALE);
            stageEffects.position.set(this.stageXs[i], this.BOARD_HEIGHT - this.STAGE_HEIGHT/2);
            wonderBoard.addChild(stageEffects);

            let stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(this.STAGE_COST_SCALE);
                stageCost.position.set(this.stageXs[i] - this.STAGE_WIDTH/2 + this.STAGE_COST_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_COST_OFFSET_Y);

                let costBanner = Shapes.filledRoundedRect(-stageCost.width/2 - this.STAGE_COST_PADDING, -this.STAGE_COST_PADDING,
                                                          stageCost.width + 2*this.STAGE_COST_PADDING, stageCost.height + 2*this.STAGE_COST_PADDING,
                                                          this.STAGE_COST_PADDING, wonder.outline_color);
                costBanner.position.set(stageCost.x, stageCost.y);

                let costBannerBg = Shapes.filledRoundedRect(-stageCost.width/2 - (this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), -(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER),
                                                            stageCost.width + 2*(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), stageCost.height + 2*(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER),
                                                            this.STAGE_COST_PADDING - this.STAGE_COST_BORDER, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);

                wonderBoard.addChild(costBanner);
                wonderBoard.addChild(costBannerBg);
                wonderBoard.addChild(stageCost);
            }

            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                let stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(this.STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + this.STAGE_WIDTH/2 + this.STAGE_PAYMENT_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.STAGE_PAYMENT_OFFSET_Y);
                wonderBoard.addChild(stagePayment);
            }
        }

        return render(wonderBoard, this.BOARD_WIDTH, this.BOARD_HEIGHT);
    }
}