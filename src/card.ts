/// <reference path="gameElement.ts" />

type CardVisualState = 'full' | 'effect' | 'flipped';
type CardState = { type: 'in_hand', visualState: CardVisualState }
                  | { type: 'dragging_normal' | 'dragging_play' | 'dragging_wonder' | 'dragging_throw' }
                  | { type: 'locked_play' | 'locked_throw' }
                  | { type: 'locked_wonder', stage: number }
                  | { type: 'permanent_effect' | 'permanent_flipped', justPlayed: boolean };

type DraggingData = {
    offsetx: number;
    offsety: number;
}

class DOMCard extends GameElement {

    private readonly CARD_WIDTH = 133;
    private readonly CARD_HEIGHT = 200;
    private readonly CARD_CORNER_RADIUS = 12;
    private readonly CARD_BORDER = 4;
    private readonly COST_X = 16.5;
    private readonly COST_Y = 56;
    private readonly COST_SCALE = 0.174;
    private readonly COST_PADDING = 8;
    private readonly BANNER_HEIGHT = 56;
    private readonly EFFECT_SCALE = 0.32;
    private readonly EFFECT_CLIP_PADDING = 8;

    apiCardId: number;
    apiCard: API.Card;
    handPosition: HTMLDivElement;
    activeWonder: DOMWonder;

    visualState: CardVisualState;
    state: CardState;

    fullClipRect: PIXI.Rectangle;
    effectClipRect: PIXI.Rectangle;

    frontDiv: HTMLDivElement;
    backDiv: HTMLDivElement;

    private allowPlay: boolean;
    private allowBuildStages: number[];
    private allowThrow: boolean;
    private minPlayCost: number;

    private dragging: DraggingData;

    private _width: number;
    get width() { return this._width; }
    private _height: number;
    get height() { return this._height; }

    private _flippedT: number;
    get flippedT() { return this._flippedT; }
    set flippedT(value: number) {
        this._flippedT = value;
        if (this._flippedT <= 0.5) {
            this.frontDiv.style.transform = `scaleX(${1 - 2*this._flippedT})`;
            this.backDiv.style.transform = `scaleX(0)`;
        } else {
            this.frontDiv.style.transform = `scaleX(0)`;
            this.backDiv.style.transform = `scaleX(${2*this._flippedT - 1})`;
        }
    }

    private _effectT: number;
    get effectT() { return this._effectT; }
    set effectT(value: number) {
        this._effectT = value;
        let left = lerp(this.fullClipRect.left, this.effectClipRect.left, this._effectT) - this.CARD_WIDTH/2;
        let right = lerp(this.fullClipRect.right, this.effectClipRect.right, this._effectT) - this.CARD_WIDTH/2;
        let top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - this.BANNER_HEIGHT/2;
        let bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - this.BANNER_HEIGHT/2;
        this.frontDiv.style.clipPath = `polygon(${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px)`;
        this._width = right - left;
        this._height = bottom - top;
    }

    private _interactable: boolean;
    get interactable() { return this._interactable; }
    set interactable(value: boolean) {
        this._interactable = value;
        this.div.style.cursor = this._interactable ? 'pointer' : 'default';
    }

    constructor(cardId: number, card: API.Card, handPosition: HTMLDivElement, activeWonder: DOMWonder) {
        super();

        this.apiCardId = cardId;
        this.apiCard = card;
        this.handPosition = handPosition;
        this.activeWonder = activeWonder;

        this.visualState = 'full';
        this.state = { type: 'in_hand', visualState: 'full' };

        this.frontDiv = this.div.appendChild(document.createElement('div'));
        let front = this.frontDiv.appendChild(this.drawFront());
        front.style.transform = `translate(-50%, -${this.BANNER_HEIGHT/2}px)`;
        this.backDiv = this.div.appendChild(document.createElement('div'));
        let back = this.backDiv.appendChild(this.drawBack());
        back.style.transform = `translate(-50%, -${this.BANNER_HEIGHT/2}px)`;

        this.flippedT = 0;
        this.effectT = 0;
        this.interactable = true;
        this.configureValidMoves(Main.gamestate.validMoves);

        // Dragging
        this.frontDiv.onmousedown = (event: MouseEvent) => {
            this.dragging = {
                offsetx: this.x - Main.scene.mouseX,
                offsety: this.y - Main.scene.mouseY
            };
        };
    }

    update() {
        if (this.dragging) {
            let stage = this.activeWonder.getClosestStageId(Main.scene.mouseX);
            if (!Main.mouseDown) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    let move: API.Move = { action: 'play', card: this.apiCardId };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        //Main.scene.startPaymentDialog(move, 400, 400);
                    } else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    let move: API.Move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        //Main.scene.startPaymentDialog(move, 400, 400);
                    } else {
                        move.payment = { bank: Main.gamestate.wonders[Main.player].stages[stage]?.cost?.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } /*else if (this.allowThrow && this.discardPile.getBounds().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    this.select(move);
                }*/ else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.state = { type: 'in_hand', visualState: 'full' }; // todo remove this
                this.dragging = null;
            } else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_play' };
                } else if (/*contains(this.allowBuildStages, stage) &&*/ this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_wonder' };
                } /*else if (this.allowThrow && this.discardPile.getBounds().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_throw' };
                }*/ else {
                    this.state = { type: 'dragging_normal' };
                }
            }
        }

        if (this.state.type === 'in_hand') {
            this.xs = this.handPosition.style.left;
            this.ys = this.handPosition.style.top;
            this.interactable = this.canBeInteractable();
            this.visualState = this.state.visualState;
        } else if (this.state.type === 'dragging_normal') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = 100;
            this.interactable = this.canBeInteractable();
            this.visualState = 'full';
        } else if (this.state.type === 'dragging_play') {
            this.x = Main.scene.mouseX;
            this.y = Main.scene.mouseY;
            this.zIndex = 100;
            this.interactable = this.canBeInteractable();
            this.visualState = 'effect';
        } else if (this.state.type === 'dragging_wonder') {
            let stage = this.activeWonder.getClosestStageId(Main.scene.mouseX);
            let stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = 0;
            this.interactable = this.canBeInteractable();
            this.visualState = 'flipped';
        } else if (this.state.type === 'dragging_throw') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = 100;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_play') {
            let effectPoint = new PIXI.Point(0, 0); //this.activeWonder.getNewCardEffectWorldPosition(this);
            this.x = effectPoint.x;
            this.y = effectPoint.y;
            this.zIndex = 100;
            this.interactable = false;
            this.visualState = 'effect';
        } else if (this.state.type === 'locked_wonder') {
            let stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = 0;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_throw') {
            let discardPoint = new PIXI.Point(0, 0); //new PIXI.Point(this.discardPile.x, this.discardPile.y - 36*this.scale.y);
            this.x = discardPoint.x;
            this.y = discardPoint.y;
            this.zIndex = 100;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'permanent_effect') {
            this.interactable = false;
            this.visualState = 'effect';
            this.effectT = 1;
        } else if (this.state.type === 'permanent_flipped') {
            this.interactable = false;
            this.visualState = 'flipped';
            this.flippedT = 1;
        }

        this.updateVisuals();
    }

    updateVisuals() {
        if (this.visualState === 'effect') {
            this.effectT = 1;
        } else {
            this.effectT = 0;
        }

        if (this.visualState === 'flipped') {
            this.flippedT = 1;
        } else {
            this.flippedT = 0;
        }

        // this.effectBorder.visible = (this.state.type === 'locked_play' || (this.state.type === 'permanent_effect' && this.state.justPlayed));
        // this.flippedBorder.visible = (this.state.type === 'locked_wonder' || this.state.type === 'locked_throw' || (this.state.type === 'permanent_flipped' && this.state.justPlayed));

        // if (this.state.type.startsWith('locked')) {
        //     this.effectBorder.alpha = this.flippedBorder.alpha = (Math.sin(Main.time*8) + 1)/2;
        // } else {
        //     this.effectBorder.alpha = this.flippedBorder.alpha = 1;
        // }
    }

    select(move: API.Move) {
        //let lastSelectedCard = Main.scene.hand.selectedCard;
        //if (lastSelectedCard) {
        //    lastSelectedCard.deselect();
        //}

        if (move.action === 'play') {
            this.state = { type: 'locked_play' };
        } else if (move.action === 'wonder') {
            this.state = { type: 'locked_wonder', stage: move.stage };
        } else if (move.action === 'throw') {
            this.state = { type: 'locked_throw' };
        }
    }

    deselect() {
        this.state = { type: 'in_hand', visualState: 'full' };
    }

    configureValidMoves(validMoves: API.Move[]) {
        this.allowPlay = false;
        this.allowBuildStages = [];
        this.allowThrow = false;
        this.minPlayCost = Infinity;
        for (let move of validMoves) {
            if (move.card !== this.apiCardId) continue;
            if (move.action === 'play') {
                this.allowPlay = true;
                let cost = API.totalPaymentAmount(move.payment);
                if (cost < this.minPlayCost) this.minPlayCost = cost;
            } else if (move.action === 'wonder') {
                if (!contains(this.allowBuildStages, move.stage)) this.allowBuildStages.push(move.stage);
            } else if (move.action === 'throw') {
                this.allowThrow = true;
            }
        }

        // this.paymentContainer.removeChildren();
        // let payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        // payment.scale.set(0.1);
        // payment.position.set(-5, -8);
        // this.paymentContainer.addChild(payment);
    }

    canBeInteractable() {
        //if (Main.scene && Main.scene.isPaymentMenuActive) return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow) return false;
        return true;
    }

    private drawFront() {
        let front = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(this.apiCard.color));
        front.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER,
                                              this.CARD_WIDTH - 2*this.CARD_BORDER, this.CARD_HEIGHT - 2*this.CARD_BORDER,
                                              this.CARD_CORNER_RADIUS - this.CARD_BORDER, ArtCommon.cardBg);
        front.addChild(cardBg);

        let cardMask = cardBase.clone();
        front.addChild(cardMask);

        let costContainer = ArtCommon.getArtForCost(this.apiCard.cost);
        if (costContainer) {
            costContainer.scale.set(this.COST_SCALE);
            costContainer.position.set(this.COST_X, this.COST_Y);

            let costBanner = Shapes.filledRoundedRect(-costContainer.width/2 - this.COST_PADDING, -this.COST_PADDING,
                                                      costContainer.width + 2*this.COST_PADDING, costContainer.height + 2*this.COST_PADDING,
                                                      this.COST_PADDING, ArtCommon.cardBannerForColor(this.apiCard.color));
            costBanner.position.set(this.COST_X, this.COST_Y);
            costBanner.mask = cardMask;

            front.addChild(costBanner);
            front.addChild(costContainer);
        }

        let cardBanner = Shapes.filledRect(0, 0, this.CARD_WIDTH, this.BANNER_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color));
        cardBanner.mask = cardMask;
        front.addChild(cardBanner);

        let effectContainer = ArtCommon.getArtForEffects(this.apiCard.effects);
        effectContainer.position.set(this.CARD_WIDTH/2, this.BANNER_HEIGHT/2);
        effectContainer.scale.set(this.EFFECT_SCALE);
        front.addChild(effectContainer);

        this.fullClipRect = new PIXI.Rectangle(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT);
        let effectBounds = effectContainer.getBounds();
        this.effectClipRect = new PIXI.Rectangle(effectBounds.x - this.EFFECT_CLIP_PADDING, effectBounds.y - this.EFFECT_CLIP_PADDING,
                                                 effectBounds.width + 2*this.EFFECT_CLIP_PADDING, effectBounds.height + 2*this.EFFECT_CLIP_PADDING);

        return render(front, this.CARD_WIDTH, this.CARD_HEIGHT);
    }

    private drawBack() {
        let back = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(this.apiCard.color));
        back.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER,
                                              this.CARD_WIDTH - 2*this.CARD_BORDER, this.CARD_HEIGHT - 2*this.CARD_BORDER,
                                              this.CARD_CORNER_RADIUS - this.CARD_BORDER, ArtCommon.cardBg);
        back.addChild(cardBg);

        return render(back, this.CARD_WIDTH, this.CARD_HEIGHT);
    }
}