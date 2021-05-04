/// <reference path="gameElement.ts" />

type CardVisualState = 'full' | 'effect' | 'flipped';
type CardState = { type: 'in_hand', visualState: CardVisualState }
               | { type: 'in_hand_moving' }
               | { type: 'dragging_normal' | 'dragging_play' | 'dragging_wonder' | 'dragging_throw' }
               | { type: 'locked_play' | 'locked_throw' }
               | { type: 'locked_wonder', stage: number }
               | { type: 'full' | 'effect' | 'flipped', justPlayed: boolean };

type DraggingData = {
    offsetx: number;
    offsety: number;
}

class Card extends GameElement {
    private scene: GameScene;

    index: number;
    apiCardId: number;
    apiCard: API.Card;
    cardResource: CardResource;
    points: number;
    handPosition: PIXI.Point;
    activeWonder: Wonder;

    targetPosition: PIXI.Point;

    visualState: CardVisualState;
    state: CardState;

    fullClipRect: PIXI.Rectangle;
    effectClipRect: PIXI.Rectangle;

    frontDiv: HTMLDivElement;
    backDiv: HTMLDivElement;
    private paymentCanvas: HTMLCanvasElement;
    private highlightEffect: HTMLDivElement;
    private highlightFlipped: HTMLDivElement;
    private pointsSummary: HTMLDivElement;
    private checkMark: HTMLDivElement;

    private allowPlay: boolean;
    private allowBuildStages: number[];
    private allowThrow: boolean;
    private minPlayCost: number;
    private zeusActiveForPlay: boolean;

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
        let bounds = this.bounds;
        this.frontDiv.style.clipPath = `polygon(${bounds.left}px ${bounds.top}px, ${bounds.right}px ${bounds.top}px, ${bounds.right}px ${bounds.bottom}px, ${bounds.left}px ${bounds.bottom}px)`;
        this._width = bounds.right - bounds.left;
        this._height = bounds.bottom - bounds.top;
    }

    get bounds() {
        let left = lerp(this.fullClipRect.left, this.effectClipRect.left, this._effectT) - C.CARD_WIDTH/2;
        let right = lerp(this.fullClipRect.right, this.effectClipRect.right, this._effectT) - C.CARD_WIDTH/2;
        let top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2;
        let bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT/2;
        return new PIXI.Rectangle(left, top, right-left, bottom-top);
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

    constructor(scene: GameScene, cardId: number, index: number, points: number, handPosition: PIXI.Point, activeWonder: Wonder, validMoves: API.Move[]) {
        super(true);

        this.scene = scene;
        this.index = index;
        this.apiCardId = cardId;
        this.apiCard = Main.gamestate.cards[cardId];
        this.points = points;
        this.handPosition = handPosition;
        this.activeWonder = activeWonder;

        this.targetPosition = new PIXI.Point();

        this.visualState = 'full';
        this.state = { type: 'in_hand', visualState: 'full' };
        this.configureValidMoves(validMoves);

        this.create(cardId, true);

        // Dragging
        this.frontDiv.onmousedown = (event: MouseEvent) => {
            if (!this.interactable) return;
            if (event.button !== 0) return;
            this.dragging = {
                offsetx: this.x - Main.mouseX,
                offsety: this.y - Main.mouseY
            };
        };

        // Popup
        this.frontDiv.onmousemove = () => {
            if (this.visualState === 'flipped' || this.state.type.startsWith('dragging')) {
                this.scene.stopPopup(this);
                return;
            }
            let bounds = this.bounds;
            this.scene.updatePopup(this, this.x + bounds.left, this.y + bounds.bottom);
        };

        this.frontDiv.onmouseleave = () => {
            this.scene.stopPopup(this);
        };
    }

    create(cardId: number, drawPayment: boolean) {
        this.apiCardId = cardId;
        this.apiCard = Main.gamestate.cards[cardId];

        this.cardResource = Resources.getCard(cardId);
        this.fullClipRect = this.cardResource.fullClipRect;
        this.effectClipRect = this.cardResource.effectClipRect;

        this.div.className = 'card';
        this.div.style.transformOrigin = `left top`;

        this.frontDiv = this.div.appendChild(document.createElement('div'));
        this.frontDiv.style.transformOrigin = 'left center';
        let front = this.frontDiv.appendChild(this.cardResource.front);
        front.style.transform = `translate(-50%, -${C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2}px)`;
        this.highlightEffect = this.frontDiv.appendChild(this.drawHighlightEffect());
        if (this.points !== undefined) {
            let n = `${this.points}`.length;
            this.pointsSummary = this.frontDiv.appendChild(this.drawPointsSummary());
            this.pointsSummary.style.left = `${this.effectClipRect.width/2 - C.CARD_POINTS_SUMMARY_WIDTH(n)/2}px`;
            this.pointsSummary.style.top = `${-this.effectClipRect.height/2 + C.CARD_POINTS_SUMMARY_HEIGHT/2}px`;
        }
        this.paymentCanvas = this.frontDiv.appendChild(this.drawPayment());
        this.paymentCanvas.style.transform = `translate(-50%, -${C.CARD_TITLE_HEIGHT + C.CARD_PAYMENT_HEIGHT + C.CARD_BANNER_HEIGHT/2}px)`;
        this.paymentCanvas.style.visibility = drawPayment ? 'visible' : 'hidden';
        this.backDiv = this.div.appendChild(document.createElement('div'));
        this.backDiv.style.transformOrigin = 'left center';
        this.highlightFlipped = this.backDiv.appendChild(this.drawHighlightFlipped());
        let back = this.backDiv.appendChild(this.cardResource.back);
        back.style.transform = `translate(-50%, -${C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT/2}px)`;

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
        Resources.returnCard(this.apiCardId, this.cardResource);
        this.cardResource = null;
    }

    convertToPlayed() {
        this.div.className = 'playedcard';
        this.zIndex = C.Z_INDEX_CARD_PLAYED;
        this.div.removeChild(this.backDiv);
        this.frontDiv.removeChild(this.paymentCanvas);
    }

    convertToBuried() {
        this.div.className = 'buriedcard';
        this.zIndex = C.Z_INDEX_CARD_WONDER;
        this.div.removeChild(this.frontDiv);
        this.backDiv.removeChild(this.checkMark);
    }

    convertToDiscarded() {
        this.div.className = 'discardedcard';
        this.div.removeChild(this.frontDiv);
        this.backDiv.removeChild(this.highlightFlipped);
        this.backDiv.removeChild(this.checkMark);
    }

    update() {
        if (this.dragging) {
            let stage = this.activeWonder.getClosestStageId(Main.mouseX);
            if (!Main.mouseDown || !this.canBeInteractable()) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'play', card: this.apiCardId, index: this.index };
                    if (API.isPaymentSelectionNecessary(move, Main.gamestate.validMoves)) {
                        this.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'wonder', card: this.apiCardId, index: this.index, stage: stage };
                    if (API.isPaymentSelectionNecessary(move, Main.gamestate.validMoves)) {
                        this.scene.startPaymentDialog(this, move);
                    } else {
                        move.payment = { bank: Main.gamestate.wonders[Main.player].stages[stage]?.cost?.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                } else if (this.allowThrow && this.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
                    let move: API.Move = { action: 'throw', card: this.apiCardId, index: this.index, payment: {} };
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
                } else if (this.allowThrow && this.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
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
            let discardPoint = this.scene.discardPile.getDiscardLockPoint();
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
            this.interactable = false;
            this.visualState = 'flipped';
        }

        this.x = lerpTime(this.x, this.targetPosition.x, 0.25, Main.delta);
        if (Math.abs(this.x - this.targetPosition.x) < 1) this.x = this.targetPosition.x;
        this.y = lerpTime(this.y, this.targetPosition.y, 0.25, Main.delta);
        if (Math.abs(this.y - this.targetPosition.y) < 1) this.y = this.targetPosition.y;

        this.updateVisuals();
    }

    updateVisuals() {
        if (this.visualState === 'effect') {
            this.effectT = lerpTime(this.effectT, 1, 0.25, Main.delta);
        } else {
            this.effectT = lerpTime(this.effectT, 0, 0.25, Main.delta);
        }

        if (this.visualState === 'flipped') {
            this.flippedT = lerpTime(this.flippedT, 1, 0.25, Main.delta);
        } else {
            this.flippedT = lerpTime(this.flippedT, 0, 0.25, Main.delta);
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
            this.highlightEffect.style.boxShadow = `inset 0px 0px 0px ${C.CARD_HIGHLIGHT}px rgba(255, 0, 0, ${alpha})`;
            this.highlightEffect.style.visibility = this.visualState === 'effect' ? 'visible' : 'hidden';
            this.highlightFlipped.style.backgroundColor = `rgba(255, 0, 0, ${alpha})`;
            this.highlightFlipped.style.visibility = this.visualState === 'flipped' ? 'visible' : 'hidden';
        } else {
            this.highlightEffect.style.visibility = 'hidden';
            this.highlightFlipped.style.visibility = 'hidden';
        }
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
        let lastSelectedCard = this.scene.hand.selectedCard;
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
        this.zeusActiveForPlay = false;
        for (let move of validMoves) {
            if (move.card !== this.apiCardId) continue;
            if (move.action === 'play') {
                this.allowPlay = true;
                let cost = API.totalPaymentAmount(move.payment);
                if (!move.payment?.free_with_zeus && cost < this.minPlayCost) this.minPlayCost = cost;
                if (move.payment?.free_with_zeus) this.zeusActiveForPlay = true;
            } else if (move.action === 'wonder') {
                if (!contains(this.allowBuildStages, move.stage)) this.allowBuildStages.push(move.stage);
            } else if (move.action === 'throw') {
                this.allowThrow = true;
            }
        }
    }

    canBeInteractable() {
        if (this.scene.isPaymentMenuActive) return false;
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

    private drawPayment() {
        let payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity, this.zeusActiveForPlay);
        payment.scale.set(C.CARD_PAYMENT_SCALE);
        payment.position.set(C.CARD_WIDTH + C.CARD_PAYMENT_OFFSET_X, C.CARD_PAYMENT_HEIGHT/2);

        return render(payment, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT);
    }

    private drawHighlightEffect() {
        let highlight = document.createElement('div');
        highlight.style.width = `${this.cardResource.effectClipRect.width}px`;
        highlight.style.height = `${this.cardResource.effectClipRect.height}px`;
        highlight.style.transform = 'translate(-50%, -50%)';
        highlight.style.position = 'absolute';
        highlight.style.pointerEvents = 'none';
        return highlight;
    }

    private drawHighlightFlipped() {
        let highlight = document.createElement('div');
        highlight.style.width = `${C.CARD_WIDTH + 2*C.CARD_HIGHLIGHT}px`;
        highlight.style.height = `${C.CARD_HEIGHT + 2*C.CARD_HIGHLIGHT}px`;
        highlight.style.borderRadius = `${C.CARD_CORNER_RADIUS}px`;
        highlight.style.transform = `translate(-50%, ${-C.CARD_BANNER_HEIGHT/2 - C.CARD_TITLE_HEIGHT - C.CARD_HIGHLIGHT}px)`;
        highlight.style.position = 'absolute';
        highlight.style.pointerEvents = 'none';
        return highlight;
    }

    private drawPointsSummary() {
        let summary = document.createElement('div');
        summary.style.position = 'absolute';
        let container = new PIXI.Container();
        let n = `${this.points}`.length;
        container.addChild(Shapes.filledRect(-C.CARD_POINTS_SUMMARY_WIDTH(n)/2, -C.CARD_POINTS_SUMMARY_HEIGHT/2,
                                             C.CARD_POINTS_SUMMARY_WIDTH(n), C.CARD_POINTS_SUMMARY_HEIGHT, C.CARD_POINTS_SUMMARY_BACKGROUND_COLOR));
        container.addChild(Shapes.centeredText(0, 0, `${this.points}`, 0.1, C.CARD_POINTS_SUMMARY_TEXT_COLOR)).y -= 0.5;
        let pointsElement = summary.appendChild(ArtCommon.domElementForArt(container));
        pointsElement.style.position = 'absolute';
        return summary;
    }

    static flippedCardForAge(scene: GameScene, age: number, justPlayed: boolean) {
        let card = new Card(scene, -age, 0, undefined, undefined, undefined, []);
        card.state = { type: 'flipped', justPlayed: justPlayed };
        card.snap();
        return card;
    }
}