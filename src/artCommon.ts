namespace ArtCommon {
    export const cardBg = 0x000000;
    export const wonderBg = 0x000000;

    export const ageBacks = {
        1: 0xB44C20,
        2: 0xF9FDFE,
        3: 0xDE8C60,
    };

    export function cardBannerForColor(color: string) {
        if (color === 'brown') return 0x9F441C;
        if (color === 'grey') return 0xADB1B0;
        if (color === 'red') return 0xD51939;
        if (color === 'green') return 0x4FA53A;
        if (color === 'blue') return 0x2A95D7;
        if (color === 'yellow') return 0xF2AA0C;
        if (color === 'purple') return 0x7054AB;
        console.error('Could not find color:', color);
        return 0xFF00FF;
    }

    export function getArtForEffects(effects: API.Effect[]) {
        let effectArts = effects.map(effect => {
            if (effect.type === 'resource') {
                return resource(effect.resource);
            } else if (effect.type === 'multi_resource') {
                return multiResource(effect.resources.split('/'));
            } else if (effect.type === 'shield') {
                return shield();
            } else if (effect.type === 'science') {
                return science(effect.symbol);
            } else if (effect.type === 'points') {
                return victoryPoints(effect.points);
            } else if (effect.type === 'gold') {
                return gold(effect.gold);
            } else if (effect.type === 'trading_post') {
                return tradingPost(effect.direction);
            } else if (effect.type === 'points_for_cards') {
                return pointsForCards(effect.color);
            }
            console.error('Effect type not found:', effect.type);
            return effectNotFound();
        });

        return combineEffectArt(effectArts, 8);
    }

    export function getArtForCost(cost: API.Cost) {
        if (!cost) {
            return undefined;
        }

        let costArts = [];
        for (let r of cost.resources || []) {
            costArts.push(resource(r));
        }

        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }

        return combineCostArt(costArts, 16);
    }

    export function getArtForStageCost(cost: API.Cost) {
        if (!cost) {
            return undefined;
        }

        let costArts = [];
        for (let r of cost.resources || []) {
            costArts.push(resource(r));
        }

        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }

        return combineStageCostArt(costArts, 16);
    }

    export function resource(resource: string) {
        if (resource === 'wood') return wood();
        if (resource === 'stone') return stone();
        if (resource === 'ore') return ore();
        if (resource === 'clay') return clay();
        if (resource === 'glass') return glass();
        if (resource === 'press') return press();
        if (resource === 'loom') return loom();
        console.error('Resource not found:', resource);
        return effectNotFound();
    }

    export function multiResource(resources: string[]) {
        let resourceArts = resources.map(r => resource(r));

        for (let i = resourceArts.length-1; i >= 1; i--) {
            resourceArts.splice(i, 0, slash());
        }

        for (let art of resourceArts) {
            if (resources.length === 3) {
                art.scale.set(0.8);
            } else if (resources.length >= 4) {
                art.scale.set(0.7);
            }
        }

        return combineEffectArt(resourceArts, 4);
    }

    export function shield() {
        return debugEffect(0x81181A);
    }

    export function science(symbol: string) {
        if (symbol === 'gear') return gear();
        if (symbol === 'tablet') return tablet();
        if (symbol === 'compass') return compass();
        console.error('Science symbol not found:', symbol);
        return effectNotFound();
    }

    export function victoryPoints(points: number) {
        let container = new PIXI.Container();
        container.addChild(debugEffect(0xFFFFFF));
        let text = new PIXI.Text(`${points}`, { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
        text.anchor.set(0.5, 0.5);
        container.addChild(text);
        return container;
    }

    export function gold(gold: number) {
        let container = new PIXI.Container();
        container.addChild(debugEffect(0xFBE317));
        let text = new PIXI.Text(`${gold}`, { fontFamily : 'Arial', fontSize: 70, fill : 0x000000 });
        text.anchor.set(0.5, 0.5);
        container.addChild(text);
        return container;
    }

    export function tradingPost(direction: string) {
        let container = new PIXI.Container();
        let woodArt = wood();
        woodArt.scale.set(0.5);
        let stoneArt = stone();
        stoneArt.scale.set(0.5);
        let oreArt = ore();
        oreArt.scale.set(0.5);
        let clayArt = clay();
        clayArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-120, -30, 240, 60, 30, cardBannerForColor('brown')));
        let resources = combineEffectArt([woodArt, stoneArt, oreArt, clayArt], 8);
        container.addChild(resources);
        if (direction === 'pos') {
            let arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(150, 0);
            container.addChild(arrow);
        } else if (direction === 'neg') {
            let arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-150, 0);
            container.addChild(arrow);
        } else {
            console.error('Trading post direction not found:', direction);
        }
        return container;
    }

    export function pointsForCards(color: string) {
        let container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-25, -40, 50, 80, 6, ArtCommon.cardBannerForColor(color)));
        let arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-80, 0);
        container.addChild(arrowL);
        let arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(80, 0);
        container.addChild(arrowR);
        return container;
    }

    export function wood() {
        return debugEffect(0x6D9F2F);
    }

    export function stone() {
        return debugEffect(0xC3BBBE);
    }

    export function ore() {
        return debugEffect(0x363936);
    }

    export function clay() {
        return debugEffect(0xE35B1E);
    }

    export function glass() {
        return debugEffect(0x36A1D6);
    }

    export function press() {
        return debugEffect(0xD9A86B);
    }

    export function loom() {
        return debugEffect(0xA5186A);
    }

    export function gear() {
        return Shapes.filledCircle(0, 0, 50, 0xB75C30);
    }

    export function tablet() {
        let shape = Shapes.filledRoundedRect(-30, -40, 60, 80, 8, 0xC8827A);
        shape.angle = -30;
        return shape;
    }

    export function compass() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xF0CB6F, 1);
        graphics.drawPolygon([ -50, 50, -8, -50, 8, -50, 50, 50, 48, 50, 0, -36, -48, 50 ]);
        graphics.endFill();
        return graphics;
    }

    function slash() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ 0, -20, 12, -20, 0, 20, -12, 20 ]);
        graphics.endFill();
        return graphics;
    }

    function arrowLeft() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ 45, -50, 45, 50, -45, 0 ]);
        graphics.endFill();
        return graphics;
    }

    function arrowRight() {
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([ -45, -50, -45, 50, 45, 0 ]);
        graphics.endFill();
        return graphics;
    }

    function combineEffectArt(arts: PIXI.DisplayObject[], padding: number) {
        let totalArtWidth = sum(arts, art => art.getBounds().width) + padding * (arts.length - 1);

        let container = new PIXI.Container();
        let x = -totalArtWidth/2;
        for (let art of arts) {
            let width = art.getBounds().width;
            art.x = x + width/2;
            container.addChild(art);
            x += width + padding;
        }

        return container;
    }

    function combineCostArt(arts: PIXI.DisplayObject[], padding: number) {
        let container = new PIXI.Container();
        let y = 0;
        for (let art of arts) {
            let height = art.getBounds().height;
            art.y = y + height/2;
            container.addChild(art);
            y += height + padding;
        }

        return container;
    }

    function combineStageCostArt(arts: PIXI.DisplayObject[], padding: number): PIXI.Container {
        if (arts.length >= 4) {
            if (arts.length % 2 === 0) {
                let left = combineStageCostArt(arts.slice(0, arts.length/2), padding);
                let right = combineStageCostArt(arts.slice(arts.length/2, arts.length), padding);
                return combineEffectArt([left, right], padding);
            } else {
                let first = combineStageCostArt(arts.slice(0, arts.length-1), padding);
                first.pivot.set(0, first.height/2);
                let last = arts[arts.length-1];
                return combineStageCostArt([first, last], padding);
            }
        }

        let container = new PIXI.Container();
        let y = 0;
        for (let art of arts) {
            let height = art.getBounds().height;
            art.y = y + height/2;
            container.addChild(art);
            y += height + padding;
        }

        return container;
    }

    function effectNotFound() {
        return Shapes.filledRect(-50, -50, 100, 100, 0xFF00FF);
    }

    function debugEffect(color: number) {
        return Shapes.filledCircle(0, 0, 50, color);
    }
}