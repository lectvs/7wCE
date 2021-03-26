/// <reference path="gameElement.ts" />

type CardVisualState = 'full' | 'effect' | 'flipped';
type CardState = { type: 'in_hand', visualState: CardVisualState }
               | { type: 'in_hand_moving' }
               | { type: 'in_discard' }
               | { type: 'dragging_normal' | 'dragging_play' | 'dragging_wonder' | 'dragging_throw' }
               | { type: 'locked_play' | 'locked_throw' }
               | { type: 'locked_wonder', stage: number }
               | { type: 'full' | 'effect' | 'flipped', justPlayed: boolean };

type DraggingData = {
    offsetx: number;
    offsety: number;
}

class Card extends GameElement {

    apiCardId: number;
    apiCard: API.Card;
    handPosition: PIXI.Point;
    activeWonder: Wonder;

    targetPosition: PIXI.Point;

    visualState: CardVisualState;
    state: CardState;

    fullClipRect: PIXI.Rectangle;
    effectClipRect: PIXI.Rectangle;

    frontDiv: HTMLDivElement;
    backDiv: HTMLDivElement;
    private highlight: HTMLDivElement;
    private checkMark: HTMLDivElement;

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

    private _flippedT: number = 0;
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

    private _effectT: number = 0;
    get effectT() { return this._effectT; }
    set effectT(value: number) {
        this._effectT = value;
        let left = lerp(this.fullClipRect.left, this.effectClipRect.left, this._effectT) - C.CARD_WIDTH/2;
        let right = lerp(this.fullClipRect.right, this.effectClipRect.right, this._effectT) - C.CARD_WIDTH/2;
        let top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2;
        let bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2;
        this.frontDiv.style.clipPath = `polygon(${left}px ${top}px, ${right}px ${top}px, ${right}px ${bottom}px, ${left}px ${bottom}px)`;
        this._width = right - left;
        this._height = bottom - top;
    }

    private _interactable: boolean = false;
    get interactable() { return this._interactable; }
    set interactable(value: boolean) {
        this._interactable = value;
        this.div.style.cursor = this._interactable ? 'pointer' : 'default';
    }

    private _checkMarkVisible: boolean = true;
    get checkMarkVisible() { return this._checkMarkVisible; }
    set checkMarkVisible(value: boolean) {
        this._checkMarkVisible = value;
        this.checkMark.style.visibility = value ? 'visible' : 'hidden';
    }

    constructor(cardId: number, card: API.Card, handPosition: PIXI.Point, activeWonder: Wonder, validMoves: API.Move[]) {
        super();

        this.apiCardId = cardId;
        this.apiCard = card;
        this.handPosition = handPosition;
        this.activeWonder = activeWonder;

        this.targetPosition = new PIXI.Point();

        this.visualState = 'full';
        this.state = { type: 'in_hand', visualState: 'full' };
        this.configureValidMoves(validMoves);

        this.create(cardId, card, true);

        // Dragging
        this.frontDiv.onmousedown = (event: MouseEvent) => {
            if (!this.interactable) return;
            if (event.button !== 0) return;
            this.dragging = {
                offsetx: this.x - Main.mouseX,
                offsety: this.y - Main.mouseY
            };
        };
    }

    create(cardId: number, card: API.Card, drawPayment: boolean) {
        this.apiCardId = cardId;
        this.apiCard = card;

        this.div.style.transformOrigin = `left top`;

        this.frontDiv = this.div.appendChild(document.createElement('div'));
        this.frontDiv.style.transformOrigin = 'left center';
        let front = this.frontDiv.appendChild(this.drawFront(drawPayment));
        front.style.transform = `translate(-50%, -${C.CARD_PAYMENT_HEIGHT + C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2}px)`;
        this.backDiv = this.div.appendChild(document.createElement('div'));
        this.backDiv.style.transformOrigin = 'left center';
        let back = this.backDiv.appendChild(this.drawBack());
        back.style.transform = `translate(-50%, -${C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2}px)`;
        let highlightDiv = this.div.appendChild(document.createElement('div'));
        this.highlight = highlightDiv.appendChild(this.drawHighlight());

        this.checkMark = this.backDiv.appendChild(document.createElement('div'));
        this.checkMark.style.position = 'absolute';
        this.checkMark.style.left = '0%';
        this.checkMark.style.top = `${C.CARD_HEIGHT/2 - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2}px`;
        this.checkMark.appendChild(ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.8));
        this.checkMarkVisible = false;

        this.effectT++; this.effectT--;
        this.flippedT++; this.flippedT--;
    }
    
    destroy() {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
    }

    update() {
        if (this.dragging) {
            let stage = this.activeWonder.getClosestStageId(Main.mouseX);
            if (!Main.mouseDown || !this.canBeInteractable()) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'play', card: this.apiCardId };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: Main.gamestate.wonders[Main.player].stages[stage]?.cost?.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    this.select(move);
                } else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.dragging = null;
            } else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_play' };
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_wonder' };
                } else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_throw' };
                } else {
                    this.state = { type: 'dragging_normal' };
                }
            }
        }

        if (this.state.type === 'in_hand') {
            this.targetPosition.set(this.handPosition.x, this.handPosition.y);
            if (Math.abs(this.y - this.targetPosition.y) < 4) this.zIndex = C.Z_INDEX_CARD_HAND;
            this.interactable = this.canBeInteractable();
            this.visualState = this.state.visualState;
        } else if (this.state.type === 'dragging_normal') {
            this.targetPosition.set(Main.mouseX + this.dragging.offsetx, Main.mouseY + this.dragging.offsety);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'full';
        } else if (this.state.type === 'dragging_play') {
            this.targetPosition.set(Main.mouseX, Main.mouseY);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'effect';
        } else if (this.state.type === 'dragging_wonder') {
            let stage = this.activeWonder.getClosestStageId(Main.mouseX);
            let stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.targetPosition.set(stagePoint.x, stagePoint.y);
            this.zIndex = C.Z_INDEX_CARD_WONDER;
            this.interactable = this.canBeInteractable();
            this.visualState = 'flipped';
        } else if (this.state.type === 'dragging_throw') {
            this.targetPosition.set(Main.mouseX + this.dragging.offsetx, Main.mouseY + this.dragging.offsety);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_play') {
            let effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.targetPosition.set(effectPoint.x, effectPoint.y);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'effect';
        } else if (this.state.type === 'locked_wonder') {
            let stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.targetPosition.set(stagePoint.x, stagePoint.y);
            this.zIndex = C.Z_INDEX_CARD_WONDER;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'locked_throw') {
            let discardPoint = Main.scene.discardPile.getDiscardLockPoint();
            this.targetPosition.set(discardPoint.x, discardPoint.y);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'full') {
            this.interactable = false;
            this.visualState = 'full';
        } else if (this.state.type === 'effect') {
            this.interactable = false;
            this.visualState = 'effect';
        } else if (this.state.type === 'flipped') {
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'in_hand_moving') {
            this.zIndex = C.Z_INDEX_CARD_MOVING;
            this.interactable = false;
            this.visualState = 'flipped';
        } else if (this.state.type === 'in_discard') {
            this.zIndex = C.Z_INDEX_DISCARD_CARDS;
            this.interactable = false;
            this.visualState = 'flipped';
        }

        this.x = lerp(this.x, this.targetPosition.x, 0.25);
        if (Math.abs(this.x - this.targetPosition.x) < 1) this.x = this.targetPosition.x;
        this.y = lerp(this.y, this.targetPosition.y, 0.25);
        if (Math.abs(this.y - this.targetPosition.y) < 1) this.y = this.targetPosition.y;

        this.updateVisuals();
    }

    updateVisuals() {
        if (this.visualState === 'effect') {
            this.effectT = lerp(this.effectT, 1, 0.25);
        } else {
            this.effectT = lerp(this.effectT, 0, 0.25);
        }

        if (this.visualState === 'flipped') {
            this.flippedT = lerp(this.flippedT, 1, 0.25);
        } else {
            this.flippedT = lerp(this.flippedT, 0, 0.25);
        }

        let alpha: number;
        if (this.state.type.startsWith('locked')) {
            alpha = (Math.sin(Main.time*8) + 1)/2;
        } else if ((this.state.type === 'effect' || this.state.type === 'flipped') && this.state.justPlayed) {
            alpha = 1;
        } else {
            alpha = 0;
        }

        if (alpha > 0) {
            this.highlight.style.width = `${this._width}px`;
            this.highlight.style.height = `${lerp(this.height - C.CARD_PAYMENT_HEIGHT, this.height, this.effectT)}px`;
            this.highlight.style.transform = `translate(-50%, -${lerp(C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2, C.CARD_EFFECT_HEIGHT/2 + C.CARD_EFFECT_CLIP_PADDING, this.effectT)}px)`;
        }
        this.highlight.style.boxShadow = `inset 0px 0px 0px 4px rgba(255, 0, 0, ${alpha})`;
    }

    snap() {
        this.update();
        this.effectT = (this.visualState === 'effect') ? 1 : 0;
        this.flippedT = (this.visualState === 'flipped') ? 1 : 0;
        this.snapToTarget();
        this.update();
    }

    snapToTarget() {
        this.x = this.targetPosition.x;
        this.y = this.targetPosition.y;
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
        if (this.state.type.startsWith('dragging')) return;
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
        if (Main.diffing) return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow) return false;
        return true;
    }

    addDiscardCountText() {
        let discardCountDiv = this.div.appendChild(document.createElement('div'));
        discardCountDiv.style.position = 'absolute';
        discardCountDiv.style.left = '0%';
        discardCountDiv.style.top = `${C.CARD_HEIGHT/2 - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2}px`;
        let discardCount = discardCountDiv.appendChild(document.createElement('p'));
        discardCount.textContent = `${Main.gamestate.discardedCardCount}`;
        discardCount.style.fontFamily = "'Courier New', Courier, monospace";
        discardCount.style.fontSize = `${C.CARD_DISCARD_COUNT_TEXT_SIZE}px`;
        discardCount.style.color = ArtCommon.ageBacksHtml[Main.gamestate.lastDiscardedCardAge];
        discardCount.style.position = 'absolute';
        discardCount.style.transform = 'translate(-50%, -50%)';
    }

    private drawFront(drawPayment: boolean) {
        let front = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(this.apiCard.color));
        front.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER,
                                              C.CARD_WIDTH - 2*C.CARD_BORDER, C.CARD_HEIGHT - 2*C.CARD_BORDER,
                                              C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
        front.addChild(cardBg);

        let cardMask = cardBase.clone();
        front.addChild(cardMask);

        let costContainer = ArtCommon.getArtForCost(this.apiCard.cost);
        if (costContainer) {
            costContainer.scale.set(C.CARD_COST_SCALE);
            costContainer.position.set(C.CARD_COST_X, C.CARD_COST_Y);

            let costBanner = Shapes.filledRoundedRect(-costContainer.width/2 - C.CARD_COST_PADDING, -C.CARD_COST_PADDING,
                                                      costContainer.width + 2*C.CARD_COST_PADDING, costContainer.height + 2*C.CARD_COST_PADDING,
                                                      C.CARD_COST_PADDING, ArtCommon.cardBannerForColor(this.apiCard.color));
            costBanner.position.set(C.CARD_COST_X, C.CARD_COST_Y);
            costBanner.mask = cardMask;

            front.addChild(costBanner);
            front.addChild(costContainer);
        }

        let cardBanner = Shapes.filledRect(0, 0, C.CARD_WIDTH, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color));
        cardBanner.mask = cardMask;
        front.addChild(cardBanner);

        let effectContainer = ArtCommon.getArtForEffects(this.apiCard.effects);
        effectContainer.position.set(C.CARD_WIDTH/2, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2);
        effectContainer.scale.set(C.CARD_EFFECT_SCALE);
        front.addChild(effectContainer);

        this.fullClipRect = new PIXI.Rectangle(0, -C.CARD_PAYMENT_HEIGHT, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT + C.CARD_HEIGHT);
        let effectBounds = effectContainer.getBounds();
        let effectHalfWidth = Math.max(C.CARD_WIDTH/2 - effectBounds.left, effectBounds.right - C.CARD_WIDTH/2);
        this.effectClipRect = new PIXI.Rectangle(C.CARD_WIDTH/2 - effectHalfWidth - C.CARD_EFFECT_CLIP_PADDING, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2 - C.CARD_EFFECT_HEIGHT/2 - C.CARD_EFFECT_CLIP_PADDING,
                                                 2*effectHalfWidth + 2*C.CARD_EFFECT_CLIP_PADDING, C.CARD_EFFECT_HEIGHT + 2*C.CARD_EFFECT_CLIP_PADDING);

        let title = Shapes.centeredText(C.CARD_WIDTH/2, C.CARD_TITLE_Y, this.apiCard.name, C.CARD_TITLE_SCALE, C.CARD_TITLE_COLOR);
        title.anchor.y = 0;
        front.addChild(title);

        let payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        payment.scale.set(C.CARD_PAYMENT_SCALE);
        payment.position.set(C.CARD_WIDTH + C.CARD_PAYMENT_OFFSET_X, -C.CARD_PAYMENT_HEIGHT/2);
        if (!drawPayment) payment.visible = false;
        front.addChild(payment);

        front.position.set(0, C.CARD_PAYMENT_HEIGHT);
        return render(front, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT + C.CARD_HEIGHT);
    }

    private drawBack() {
        let back = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.ageBacks[this.apiCard.age]);
        back.addChild(cardBase);

        let cardBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER,
                                              C.CARD_WIDTH - 2*C.CARD_BORDER, C.CARD_HEIGHT - 2*C.CARD_BORDER,
                                              C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
        back.addChild(cardBg);

        return render(back, C.CARD_WIDTH, C.CARD_HEIGHT);
    }

    private drawHighlight() {
        let highlight = document.createElement('div');
        highlight.style.pointerEvents = 'none';
        return highlight;
    }

    static flippedCardForAge(age: number, justPlayed: boolean) {
        let card = new Card(-1, { age: age, name: '', color: 'brown', effects: [] }, undefined, undefined, []);
        card.state = { type: 'flipped', justPlayed: justPlayed };
        card.snap();
        return card;
    }
}