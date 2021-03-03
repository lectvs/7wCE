namespace Card {
    export type State = 'full' | 'effect' | 'flipped';
    export type Dragging = {
        data: PIXI.interaction.InteractionData;
        offsetx: number;
        offsety: number;
    }
}

class Card extends PIXI.Container {

    apiCard: API.Card;
    homePosition: PIXI.Point;
    private activeWonder: Wonder;
    private discardPile: PIXI.Container;
    private isForceEffect: boolean;
    private isForceFlipped: boolean;

    private state: Card.State;
    private dragging: Card.Dragging;

    private effectT: number;
    private flippedT: number;
    private stateMask: PIXI.Graphics;

    private mainContainer: PIXI.Container;
    private frontContainer: PIXI.Container;
    private backContainer: PIXI.Container;

    fullCardRect: PIXI.Rectangle;
    effectsRect: PIXI.Rectangle;

    lockPosition: PIXI.Point;

    constructor(card: API.Card, handPosition: PIXI.Point, activeWonder: Wonder, discardPile: PIXI.Container) {
        super();

        this.apiCard = card;
        this.homePosition = handPosition;
        this.activeWonder = activeWonder;
        this.discardPile = discardPile;
        this.isForceEffect = false;
        this.isForceFlipped = false;
        this.state = 'full';
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
        this.effectsRect = new PIXI.Rectangle(effectsBounds.left - effectPadding, effectsBounds.top - effectPadding,
                                              effectsBounds.width + 2*effectPadding, effectsBounds.height + 2*effectPadding);

        this.stateMask = Shapes.filledRect(0, 0, 1, 1, 0xFFFFFF);
        this.frontContainer.addChild(this.stateMask);
        this.frontContainer.mask = this.stateMask;

        let backBase = Shapes.filledRoundedRect(-33, -14, 66, 100, 6, ArtCommon.ageBacks[card.age]);
        this.backContainer.addChild(backBase);

        let backBg = Shapes.filledRoundedRect(-33 + o, -14 + o, 66 - 2*o, 100 - 2*o, 6 - o, ArtCommon.cardBg);
        this.backContainer.addChild(backBg);

        this.mainContainer.addChild(this.frontContainer);
        this.mainContainer.addChild(this.backContainer);
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

        this.update();
    }

    update() {
        if (!Main.mouseDown && this.dragging) {
            let position = this.dragging.data.getLocalPosition(this.parent);
            this.dragging = null;
            if (this.activeWonder.getMainRegion().contains(position.x, position.y)) {
                this.select(this.activeWonder.getNewCardEffectWorldPosition(this));
                this.setEffect(true);
            } else if (this.activeWonder.getStageRegion().contains(position.x, position.y)) {
                this.select(this.activeWonder.getClosestStagePosition(position));
                this.setFlipped(true);
            } else if (this.discardPile.getBounds().contains(position.x, position.y)) {
                this.select(new PIXI.Point(this.discardPile.position.x, this.discardPile.position.y - 36*this.scale.y));
                this.setFlipped(true);
            }
        }
        
        if (this.lockPosition) {
            this.x = lerp(this.x, this.lockPosition.x, 0.25);
            this.y = lerp(this.y, this.lockPosition.y, 0.25);
        } else if (this.dragging) {
            let position = this.dragging.data.getLocalPosition(this.parent);

            if (this.activeWonder.getMainRegion().contains(position.x, position.y)) {
                this.state = 'effect';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height/2)*this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x/this.scale.x*0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y/this.scale.y*0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length-1);
            } else if (this.activeWonder.getStageRegion().contains(position.x, position.y)) {
                this.state = 'flipped';
                let stagePoint = this.activeWonder.getClosestStagePosition(position);
                this.x = lerp(this.x, stagePoint.x, 0.25);
                this.y = lerp(this.y, stagePoint.y, 0.25);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x/this.scale.x*0.66, this.flippedT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y/this.scale.y*0.66, this.flippedT);
                this.parent.setChildIndex(this, 0);
            } else if (this.discardPile.getBounds().contains(position.x, position.y)) {
                this.state = 'flipped';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height/2)*this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x/this.scale.x*0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y/this.scale.y*0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length-1);
            } else {
                this.state = 'full';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height/2)*this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x/this.scale.x*0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y/this.scale.y*0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length-1);
            }
        } else {
            this.x = lerp(this.x, this.homePosition.x, 0.25);
            this.y = lerp(this.y, this.homePosition.y, 0.25);
            this.mainContainer.scale.x = lerp(this.mainContainer.scale.x, 1, 0.25);
            this.mainContainer.scale.y = lerp(this.mainContainer.scale.y, 1, 0.25);
            this.state = 'full';
        }

        if (this.isForceFlipped) {
            this.state = 'flipped';
        } else if (this.isForceEffect) {
            this.state = 'effect';
        }

        if (this.state === 'effect') {
            this.effectT += (1-this.effectT)*0.25;
        } else {
            this.effectT += (0-this.effectT)*0.25;
        }

        if (this.state === 'flipped') {
            this.flippedT += (1-this.flippedT)*0.25;
        } else {
            this.flippedT += (0-this.flippedT)*0.25;
        }

        this.stateMask.position.set(lerp(this.fullCardRect.left, this.effectsRect.left, this.effectT), lerp(this.fullCardRect.top, this.effectsRect.top, this.effectT));
        this.stateMask.scale.set(lerp(this.fullCardRect.width, this.effectsRect.width, this.effectT), lerp(this.fullCardRect.height, this.effectsRect.height, this.effectT));

        this.frontContainer.scale.x = 1 - Math.min(this.flippedT, 0.5) * 2;
        this.backContainer.scale.x = Math.max(0.5, this.flippedT) * 2 - 1;
    }

    getWidth() {
        return this.stateMask.width * this.scale.x * this.mainContainer.scale.x;
    }

    getHeight() {
        return this.stateMask.height * this.scale.y * this.mainContainer.scale.y;
    }

    select(lockPosition: PIXI.Point) {
        if (Main.scene.hand.selectedCard) {
            Main.scene.hand.selectedCard.deselect();
        }
        this.lockPosition = lockPosition;
    }

    deselect() {
        this.lockPosition = null;
        this.setFull();
    }

    setEffect(immediate?: boolean) {
        this.isForceEffect = true;
        this.state = 'effect';
        if (immediate) this.effectT = 1;
        this.buttonMode = false;
        this.interactive = false;
        this.update();
    }

    setFlipped(immediate?: boolean) {
        this.isForceFlipped = true;
        this.state = 'flipped';
        if (immediate) this.flippedT = 1;
        this.buttonMode = false;
        this.interactive = false;
        this.update();
    }

    setFull(immediate?: boolean) {
        this.isForceFlipped = false;
        this.isForceEffect = false;
        this.state = 'full';
        if (immediate) this.flippedT = 0;
        if (immediate) this.effectT = 0;
        this.buttonMode = true;
        this.interactive = true;
        this.update();
    }
}