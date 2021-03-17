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
    private readonly TITLE_HEIGHT = 12;
    private readonly TITLE_Y = 5;
    private readonly TITLE_SCALE = 0.12;
    private readonly TITLE_COLOR = 0xFFFFFF;
    private readonly BANNER_HEIGHT = 56;
    private readonly EFFECT_SCALE = 0.32;
    private readonly EFFECT_CLIP_PADDING = 6;
    private readonly EFFECT_HEIGHT = 32;
    private readonly COST_X = 16.5;
    private readonly COST_Y = this.TITLE_HEIGHT + this.BANNER_HEIGHT;
    private readonly COST_SCALE = 0.174;
    private readonly COST_PADDING = 8;
    private readonly PAYMENT_HEIGHT = 32;
    private readonly PAYMENT_SCALE = 0.2;
    private readonly PAYMENT_OFFSET_X = -11;
    private readonly DISCARD_COUNT_TEXT_SIZE = 48;

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
    highlight: HTMLDivElement;

    private allowPlay: boolean;
    private allowBuildStages: number[];
    private allowThrow: boolean;
    private minPlayCost: number;

    private dragging: DraggingData;

    private _width: number;
    get width() { return this._width; }
    private _height: number;
    get height() { return this._height; }
    get effectWidth() { return this.effectClipRect.width; }

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
        let top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - this.TITLE_HEIGHT - this.BANNER_HEIGHT/2;
        let bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - this.TITLE_HEIGHT - this.BANNER_HEIGHT/2;
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
        this.configureValidMoves(Main.gamestate.validMoves);

        this.frontDiv = this.div.appendChild(document.createElement('div'));
        let front = this.frontDiv.appendChild(this.drawFront());
        front.style.transform = `translate(-50%, -${this.PAYMENT_HEIGHT + this.TITLE_HEIGHT + this.BANNER_HEIGHT/2}px)`;
        this.backDiv = this.div.appendChild(document.createElement('div'));
        let back = this.backDiv.appendChild(this.drawBack());
        back.style.transform = `translate(-50%, -${this.TITLE_HEIGHT + this.BANNER_HEIGHT/2}px)`;
        let highlightDiv = this.div.appendChild(document.createElement('div'));
        this.highlight = highlightDiv.appendChild(this.drawHighlight());

        this.flippedT = 0;
        this.effectT = 0;
        this.interactable = false;

        // Dragging
        this.frontDiv.onmousedown = (event: MouseEvent) => {
            if (!this.interactable) return;
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
                        Main.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    let move: API.Move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: Main.gamestate.wonders[Main.player].stages[stage]?.cost?.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    let move: API.Move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    this.select(move);
                } else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.dragging = null;
            } else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_play' };
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_wonder' };
                } else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_throw' };
                } else {
                    this.state = { type: 'dragging_normal' };
                }
            }
        }

        if (this.state.type === 'in_hand') {
            this.xs = this.handPosition.style.left;
            this.ys = this.handPosition.style.top;
            this.zIndex = ZIndices.CARD_HAND;
            this.interactable = this.canBeInteractable();
            this.visualState = this.state.visualState;
        } else if (this.state.type === 'dragging_normal') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'full';
        } else if (this.state.type === 'dragging_play') {
            this.x = Main.scene.mouseX;
            this.y = Main.scene.mouseY;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'effect';
        } else if (this.state.type === 'dragging_wonder') {
            let stage = this.activeWonder.getClosestStageId(Main.scene.mouseX);
            let stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = ZIndices.CARD_WONDER;
            this.interactable = this.canBeInteractable();
            this.visualState = 'flipped';
        } else if (this.state.type === 'dragging_throw') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_play') {
            let effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.x = effectPoint.x;
            this.y = effectPoint.y;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'effect';
        } else if (this.state.type === 'locked_wonder') {
            let stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = ZIndices.CARD_WONDER;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_throw') {
            let discardPoint = Main.scene.discardPile.getDiscardLockPoint();
            this.x = discardPoint.x;
            this.y = discardPoint.y;
            this.zIndex = ZIndices.CARD_DRAGGING;
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

        this.highlight.style.width = `${this._width}px`;
        this.highlight.style.height = `${lerp(this.height - this.PAYMENT_HEIGHT, this.height, this.effectT)}px`;
        this.highlight.style.transform = `translate(-50%, -${lerp(this.TITLE_HEIGHT + this.BANNER_HEIGHT/2, this.EFFECT_HEIGHT/2 + this.EFFECT_CLIP_PADDING, this.effectT)}px)`;

        let alpha: number;
        if (this.state.type.startsWith('locked')) {
            alpha = (Math.sin(Main.time*8) + 1)/2;
        } else if ((this.state.type === 'permanent_effect' || this.state.type === 'permanent_flipped') && this.state.justPlayed) {
            alpha = 1;
        } else {
            alpha = 0;
        }

        this.highlight.style.boxShadow = `inset 0px 0px 0px 4px rgba(255, 0, 0, ${alpha})`;
    }

    select(move: API.Move) {
        let lastSelectedCard = Main.scene.hand.selectedCard;
        if (lastSelectedCard) {
           lastSelectedCard.deselect();
        }

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
    }

    canBeInteractable() {
        if (Main.scene && Main.scene.isPaymentMenuActive) return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow) return false;
        return true;
    }

    addDiscardCountText() {
        let discardCountDiv = this.div.appendChild(document.createElement('div'));
        discardCountDiv.style.position = 'absolute';
        discardCountDiv.style.left = '0%';
        discardCountDiv.style.top = `${this.CARD_HEIGHT/2 - this.TITLE_HEIGHT - this.BANNER_HEIGHT/2}px`;
        let discardCount = discardCountDiv.appendChild(document.createElement('p'));
        discardCount.textContent = `${Main.gamestate.discardedCardCount}`;
        discardCount.style.fontFamily = "'Courier New', Courier, monospace";
        discardCount.style.fontSize = `${this.DISCARD_COUNT_TEXT_SIZE}px`;
        discardCount.style.color = ArtCommon.ageBacksHtml[Main.gamestate.lastDiscardedCardAge];
        discardCount.style.position = 'absolute';
        discardCount.style.transform = 'translate(-50%, -50%)';
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

        let cardBanner = Shapes.filledRect(0, 0, this.CARD_WIDTH, this.TITLE_HEIGHT + this.BANNER_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color));
        cardBanner.mask = cardMask;
        front.addChild(cardBanner);

        let effectContainer = ArtCommon.getArtForEffects(this.apiCard.effects);
        effectContainer.position.set(this.CARD_WIDTH/2, this.TITLE_HEIGHT + this.BANNER_HEIGHT/2);
        effectContainer.scale.set(this.EFFECT_SCALE);
        front.addChild(effectContainer);

        this.fullClipRect = new PIXI.Rectangle(0, -this.PAYMENT_HEIGHT, this.CARD_WIDTH, this.PAYMENT_HEIGHT + this.CARD_HEIGHT);
        let effectBounds = effectContainer.getBounds();
        let effectHalfWidth = Math.max(this.CARD_WIDTH/2 - effectBounds.left, effectBounds.right - this.CARD_WIDTH/2);
        this.effectClipRect = new PIXI.Rectangle(this.CARD_WIDTH/2 - effectHalfWidth - this.EFFECT_CLIP_PADDING, this.TITLE_HEIGHT + this.BANNER_HEIGHT/2 - this.EFFECT_HEIGHT/2 - this.EFFECT_CLIP_PADDING,
                                                 2*effectHalfWidth + 2*this.EFFECT_CLIP_PADDING, this.EFFECT_HEIGHT + 2*this.EFFECT_CLIP_PADDING);

        let title = Shapes.centeredText(this.CARD_WIDTH/2, this.TITLE_Y, this.apiCard.name, this.TITLE_SCALE, this.TITLE_COLOR);
        title.anchor.y = 0;
        front.addChild(title);

        let payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        payment.scale.set(this.PAYMENT_SCALE);
        payment.position.set(this.CARD_WIDTH + this.PAYMENT_OFFSET_X, -this.PAYMENT_HEIGHT/2);
        front.addChild(payment);

        front.position.set(0, this.PAYMENT_HEIGHT);
        return render(front, this.CARD_WIDTH, this.PAYMENT_HEIGHT + this.CARD_HEIGHT);
    }

    private drawBack() {
        let back = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.ageBacks[this.apiCard.age]);
        back.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER,
                                              this.CARD_WIDTH - 2*this.CARD_BORDER, this.CARD_HEIGHT - 2*this.CARD_BORDER,
                                              this.CARD_CORNER_RADIUS - this.CARD_BORDER, ArtCommon.cardBg);
        back.addChild(cardBg);

        return render(back, this.CARD_WIDTH, this.CARD_HEIGHT);
    }

    private drawHighlight() {
        let highlight = document.createElement('div');
        highlight.style.pointerEvents = 'none';
        return highlight;
    }

    static flippedCardForAge(age: number, justPlayed: boolean) {
        let card = new DOMCard(-1, { age: age, name: '', color: 'brown', effects: [] }, undefined, undefined);
        card.state = { type: 'permanent_flipped', justPlayed: justPlayed };
        card.update();
        return card;
    }
}