namespace Card {
    export type VisualState = 'full' | 'effect' | 'flipped';
    export type State = { type: 'in_hand', visualState: VisualState }
                      | { type: 'dragging_normal' | 'dragging_play' | 'dragging_wonder' | 'dragging_throw' }
                      | { type: 'locked_play' | 'locked_throw' }
                      | { type: 'locked_wonder', stage: number }
                      | { type: 'permanent_effect' | 'permanent_flipped', justPlayed: boolean };
    export type Dragging = {
        data: PIXI.interaction.InteractionData;
        offsetx: number;
        offsety: number;
    }
}

class Card extends PIXI.Container {

    apiCardId: number;
    apiCard: API.Card;
    handPosition: PIXI.Point;

    state: Card.State;
    private visualState: Card.VisualState;

    private activeWonder: Wonder;
    private discardPile: PIXI.Container;

    private dragging: Card.Dragging;

    private effectT: number;
    private flippedT: number;
    private stateMask: PIXI.Graphics;

    private mainContainer: PIXI.Container;
    private frontContainer: PIXI.Container;
    private backContainer: PIXI.Container;
    private paymentContainer: PIXI.Container;

    private effectBorder: PIXI.Graphics;
    private flippedBorder: PIXI.Graphics;

    private fullCardRect: PIXI.Rectangle;
    private effectsRect: PIXI.Rectangle;

    private allowPlay: boolean;
    private allowBuildStages: number[];
    private allowThrow: boolean;
    private minPlayCost: number;

    constructor(cardId: number, card: API.Card, handPosition: PIXI.Point, activeWonder: Wonder, discardPile: PIXI.Container) {
        super();

        this.apiCardId = cardId;
        this.apiCard = card;
        this.handPosition = handPosition;
        this.activeWonder = activeWonder;
        this.discardPile = discardPile;
        this.state = { type: 'in_hand', visualState: 'full' };
        this.effectT = 0;
        this.flippedT = 0;
        this.dragging = null;

        this.mainContainer = new PIXI.Container();
        this.frontContainer = new PIXI.Container();
        this.backContainer = new PIXI.Container();

        let cardBase = Shapes.filledRoundedRect(-33, -14, 66, 100, 6, ArtCommon.cardBannerForColor(card.color));
        this.frontContainer.addChild(cardBase);

        let o = 2;
        let cardBg = Shapes.filledRoundedRect(-33 + o, -14 + o, 66 - 2*o, 100 - 2*o, 6 - o, ArtCommon.cardBg);
        this.frontContainer.addChild(cardBg);

        let cardMask = cardBase.clone();
        this.frontContainer.addChild(cardMask);

        let costContainer = ArtCommon.getArtForCost(card.cost);
        if (costContainer) {
            costContainer.scale.set(0.087);
            costContainer.position.set(-25, 14);

            let costBanner = Shapes.filledRoundedRect(-10, -5, 19, costContainer.height + 9, 6, ArtCommon.cardBannerForColor(card.color));
            costBanner.position.set(-25, 14);
            costBanner.mask = cardMask;

            this.frontContainer.addChild(costBanner);
            this.frontContainer.addChild(costContainer);
        }

        let cardBanner = Shapes.filledRect(-33, -14, 66, 28, ArtCommon.cardBannerForColor(card.color));
        cardBanner.mask = cardMask;
        this.frontContainer.addChild(cardBanner);

        this.fullCardRect = new PIXI.Rectangle(-33, -14, 66, 100);

        let effectContainer = ArtCommon.getArtForEffects(card.effects);
        effectContainer.position.set(0, 0);
        effectContainer.scale.set(0.16);
        this.frontContainer.addChild(effectContainer);

        let effectsBounds = effectContainer.getBounds();
        let effectPadding = 4;
        this.effectsRect = new PIXI.Rectangle(effectsBounds.left - effectPadding, -8 - effectPadding,
                                              effectsBounds.width + 2*effectPadding, 16 + 2*effectPadding);

        this.stateMask = Shapes.filledRect(0, 0, 1, 1, 0xFFFFFF);
        this.frontContainer.addChild(this.stateMask);
        this.frontContainer.mask = this.stateMask;

        let backBase = Shapes.filledRoundedRect(-33, -14, 66, 100, 6, ArtCommon.ageBacks[card.age]);
        this.backContainer.addChild(backBase);

        let backBg = Shapes.filledRoundedRect(-33 + o, -14 + o, 66 - 2*o, 100 - 2*o, 6 - o, ArtCommon.cardBg);
        this.backContainer.addChild(backBg);

        this.effectBorder = new PIXI.Graphics();
        this.effectBorder.beginFill(0xFF0000, 1);
        this.effectBorder.drawRect(this.effectsRect.x, this.effectsRect.y, this.effectsRect.width, this.effectsRect.height);
        this.effectBorder.endFill();
        this.effectBorder.beginHole();
        this.effectBorder.drawRect(this.effectsRect.x + o, this.effectsRect.y + o, this.effectsRect.width - 2*o, this.effectsRect.height - 2*o);
        this.effectBorder.endFill();
        this.frontContainer.addChild(this.effectBorder);
        this.effectBorder.visible = false;

        this.flippedBorder = new PIXI.Graphics();
        this.flippedBorder.beginFill(0xFF0000, 1);
        this.flippedBorder.drawRoundedRect(-33, -14, 66, 100, 6);
        this.flippedBorder.endFill();
        this.flippedBorder.beginHole();
        this.flippedBorder.drawRoundedRect(-33 + o, -14 + o, 66 - 2*o, 100 - 2*o, 6 - o);
        this.flippedBorder.endFill();
        this.backContainer.addChild(this.flippedBorder);
        this.flippedBorder.visible = false;

        this.paymentContainer = new PIXI.Container();
        this.paymentContainer.position.set(33, -14);

        this.mainContainer.addChild(this.frontContainer);
        this.mainContainer.addChild(this.backContainer);
        this.mainContainer.addChild(this.paymentContainer);
        this.addChild(this.mainContainer);

        this.buttonMode = true;
        this.interactive = true;

        this.on('pointerdown', (event: PIXI.interaction.InteractionEvent) => {
            let position = event.data.getLocalPosition(this.parent);
            this.dragging = {
                data: event.data,
                offsetx: this.x - position.x,
                offsety: this.y - position.y,
            };
        });

        this.configureValidMoves(Main.gamestate.validMoves);
        this.update();
    }

    update() {
        let dragPosition = this.dragging?.data.getLocalPosition(this.parent);

        if (this.dragging) {
            let stage = this.activeWonder.getClosestStageId(dragPosition);
            if (!Main.mouseDown) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(dragPosition.x, dragPosition.y)) {
                    let move: API.Move = { action: 'play', card: this.apiCardId };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(move, 400, 400);
                    } else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    //this.select(move);
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(dragPosition.x, dragPosition.y)) {
                    let move: API.Move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(move, 400, 400);
                    } else {
                        move.payment = { bank: Main.gamestate.wonders[Main.player].stages[stage]?.cost?.gold };
                        Main.submitMove(move);
                    }
                    //this.select(move);
                } else if (this.allowThrow && this.discardPile.getBounds().contains(dragPosition.x, dragPosition.y)) {
                    let move: API.Move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    //this.select(move);
                } else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.state = { type: 'in_hand', visualState: 'full' }; // todo remove this
                this.dragging = null;
            } else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_play' };
                } else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_wonder' };
                } else if (this.allowThrow && this.discardPile.getBounds().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_throw' };
                } else {
                    this.state = { type: 'dragging_normal' };
                }
            }
        }

        if (this.state.type === 'in_hand') {
            this.x = this.handPosition.x;
            this.y = this.handPosition.y;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.setInteractable(this.canBeInteractable());
            this.visualState = this.state.visualState;
            this.paymentContainer.scale.y = 1;
        } else if (this.state.type === 'dragging_normal') {
            this.x = dragPosition.x + this.dragging.offsetx;
            this.y = dragPosition.y + this.dragging.offsety;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length-1);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'full';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'dragging_play') {
            this.x = dragPosition.x;
            this.y = dragPosition.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x/this.scale.x*0.75;
            this.mainContainer.scale.y = this.activeWonder.scale.y/this.scale.y*0.75;
            this.parent.setChildIndex(this, this.parent.children.length-1);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'effect';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'dragging_wonder') {
            let stage = this.activeWonder.getClosestStageId(dragPosition);
            let stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x/this.scale.x*0.66;
            this.mainContainer.scale.y = this.activeWonder.scale.y/this.scale.y*0.66;
            this.parent.setChildIndex(this, 0);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'flipped';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'dragging_throw') {
            this.x = dragPosition.x + this.dragging.offsetx;
            this.y = dragPosition.y + this.dragging.offsety;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length-1);
            this.setInteractable(false);
            this.visualState = 'flipped';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'locked_play') {
            let effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.x = effectPoint.x;
            this.y = effectPoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x/this.scale.x*0.75;
            this.mainContainer.scale.y = this.activeWonder.scale.y/this.scale.y*0.75;
            this.parent.setChildIndex(this, this.parent.children.length-1);
            this.setInteractable(false);
            this.visualState = 'effect';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'locked_wonder') {
            let stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x/this.scale.x*0.66;
            this.mainContainer.scale.y = this.activeWonder.scale.y/this.scale.y*0.66;
            this.parent.setChildIndex(this, 0);
            this.setInteractable(false);
            this.visualState = 'flipped';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'locked_throw') {
            let discardPoint = new PIXI.Point(this.discardPile.x, this.discardPile.y - 36*this.scale.y);
            this.x = discardPoint.x;
            this.y = discardPoint.y;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length-1);
            this.setInteractable(false);
            this.visualState = 'flipped';
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'permanent_effect') {
            this.setInteractable(false);
            this.visualState = 'effect';
            this.effectT = 1;
            this.paymentContainer.scale.y = 0;
        } else if (this.state.type === 'permanent_flipped') {
            this.setInteractable(false);
            this.visualState = 'flipped';
            this.flippedT = 1;
            this.paymentContainer.scale.y = 0;
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

        this.stateMask.position.set(lerp(this.fullCardRect.left, this.effectsRect.left, this.effectT), lerp(this.fullCardRect.top, this.effectsRect.top, this.effectT));
        this.stateMask.scale.set(lerp(this.fullCardRect.width, this.effectsRect.width, this.effectT), lerp(this.fullCardRect.height, this.effectsRect.height, this.effectT));

        this.frontContainer.scale.x = lerp(1, 0, Math.min(this.flippedT, 0.5) * 2);
        this.backContainer.scale.x = lerp(0, 1, Math.max(0.5, this.flippedT) * 2 - 1);

        this.effectBorder.visible = (this.state.type === 'locked_play' || (this.state.type === 'permanent_effect' && this.state.justPlayed));
        this.flippedBorder.visible = (this.state.type === 'locked_wonder' || this.state.type === 'locked_throw' || (this.state.type === 'permanent_flipped' && this.state.justPlayed));

        if (this.state.type.startsWith('locked')) {
            this.effectBorder.alpha = this.flippedBorder.alpha = (Math.sin(Main.time*8) + 1)/2;
        } else {
            this.effectBorder.alpha = this.flippedBorder.alpha = 1;
        }
    }

    getEffectRollOffsetX(reverse: boolean) {
        if (reverse) {
            return (this.stateMask.x + this.stateMask.width) * this.scale.x * this.mainContainer.scale.x;
        }
        return -this.stateMask.x * this.scale.x * this.mainContainer.scale.x;
    }

    getWidth() {
        return this.stateMask.width * this.scale.x * this.mainContainer.scale.x;
    }

    getHeight() {
        return this.stateMask.height * this.scale.y * this.mainContainer.scale.y;
    }

    canBeInteractable() {
        if (Main.scene && Main.scene.isPaymentMenuActive) return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow) return false;
        return true;
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

        this.paymentContainer.removeChildren();
        let payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        payment.scale.set(0.1);
        payment.position.set(-5, -8);
        this.paymentContainer.addChild(payment);
    }

    setInteractable(interactable: boolean) {
        this.buttonMode = interactable;
        this.interactive = interactable;
    }

    static flippedCardForAge(age: number, justPlayed: boolean) {
        let card = new Card(-1, { age: age, name: '', color: 'brown', effects: [] }, new PIXI.Point(), null, new PIXI.Container());
        card.state = { type: 'permanent_flipped', justPlayed: justPlayed };
        card.update();
        return card;
    }
}