var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var API;
(function (API) {
    function getgamedata(gameid, callback) {
        httpRequest(LAMBDA_URL + "?operation=getgamedata&gameid=" + gameid, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson, undefined);
            }
        });
    }
    API.getgamedata = getgamedata;
    function getgamestate(gameid, player, callback) {
        httpRequest(LAMBDA_URL + "?operation=getgamestate&gameid=" + gameid + "&player=" + player, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson, undefined);
            }
        });
    }
    API.getgamestate = getgamestate;
    function getmovehistory(gameid, player, callback) {
        httpRequest(LAMBDA_URL + "?operation=getmovehistory&gameid=" + gameid + "&player=" + player, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson, undefined);
            }
        });
    }
    API.getmovehistory = getmovehistory;
    function httpRequest(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    if (!json.error) {
                        callback(json, undefined);
                    }
                    else {
                        callback(undefined, json.error);
                    }
                }
                else {
                    callback(undefined, xhr.statusText);
                }
            }
        };
        xhr.onerror = function () {
            callback(undefined, xhr.statusText);
        };
        xhr.send(null);
    }
    var LAMBDA_URL = 'https://p883xambde.execute-api.us-east-2.amazonaws.com/default/7wCE';
})(API || (API = {}));
var ArtCommon;
(function (ArtCommon) {
    ArtCommon.cardBg = 0x000000;
    ArtCommon.wonderBg = 0x000000;
    ArtCommon.ageBacks = {
        1: 0xB44C20,
        2: 0xF9FDFE,
        3: 0xDE8C60,
    };
    function cardBannerForColor(color) {
        if (color === 'brown')
            return 0x9F441C;
        if (color === 'grey')
            return 0xADB1B0;
        if (color === 'red')
            return 0xD51939;
        if (color === 'green')
            return 0x4FA53A;
        if (color === 'blue')
            return 0x2A95D7;
        if (color === 'yellow')
            return 0xF2AA0C;
        if (color === 'purple')
            return 0x7054AB;
        console.error('Could not find color:', color);
        return 0xFF00FF;
    }
    ArtCommon.cardBannerForColor = cardBannerForColor;
    function getArtForEffects(effects) {
        var effectArts = effects.map(function (effect) {
            if (effect.type === 'resource') {
                return resource(effect.resource);
            }
            else if (effect.type === 'multi_resource') {
                return multiResource(effect.resources.split('/'));
            }
            else if (effect.type === 'shield') {
                return shield();
            }
            else if (effect.type === 'science') {
                return science(effect.symbol);
            }
            else if (effect.type === 'points') {
                return victoryPoints(effect.points);
            }
            else if (effect.type === 'gold') {
                return gold(effect.gold);
            }
            else if (effect.type === 'trading_post') {
                return tradingPost(effect.direction);
            }
            else if (effect.type === 'points_for_cards') {
                return pointsForCards(effect.color);
            }
            console.error('Effect type not found:', effect.type);
            return effectNotFound();
        });
        return combineEffectArt(effectArts, 8);
    }
    ArtCommon.getArtForEffects = getArtForEffects;
    function getArtForCost(cost) {
        var e_1, _a;
        if (!cost) {
            return undefined;
        }
        var costArts = [];
        try {
            for (var _b = __values(cost.resources || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var r = _c.value;
                costArts.push(resource(r));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        return combineCostArt(costArts, 16);
    }
    ArtCommon.getArtForCost = getArtForCost;
    function getArtForStageCost(cost) {
        var e_2, _a;
        if (!cost) {
            return undefined;
        }
        var costArts = [];
        try {
            for (var _b = __values(cost.resources || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var r = _c.value;
                costArts.push(resource(r));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        return combineStageCostArt(costArts, 16);
    }
    ArtCommon.getArtForStageCost = getArtForStageCost;
    function resource(resource) {
        if (resource === 'wood')
            return wood();
        if (resource === 'stone')
            return stone();
        if (resource === 'ore')
            return ore();
        if (resource === 'clay')
            return clay();
        if (resource === 'glass')
            return glass();
        if (resource === 'press')
            return press();
        if (resource === 'loom')
            return loom();
        console.error('Resource not found:', resource);
        return effectNotFound();
    }
    ArtCommon.resource = resource;
    function multiResource(resources) {
        var e_3, _a;
        var resourceArts = resources.map(function (r) { return resource(r); });
        for (var i = resourceArts.length - 1; i >= 1; i--) {
            resourceArts.splice(i, 0, slash());
        }
        try {
            for (var resourceArts_1 = __values(resourceArts), resourceArts_1_1 = resourceArts_1.next(); !resourceArts_1_1.done; resourceArts_1_1 = resourceArts_1.next()) {
                var art = resourceArts_1_1.value;
                if (resources.length === 3) {
                    art.scale.set(0.8);
                }
                else if (resources.length >= 4) {
                    art.scale.set(0.7);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (resourceArts_1_1 && !resourceArts_1_1.done && (_a = resourceArts_1.return)) _a.call(resourceArts_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return combineEffectArt(resourceArts, 4);
    }
    ArtCommon.multiResource = multiResource;
    function shield() {
        return debugEffect(0x81181A);
    }
    ArtCommon.shield = shield;
    function science(symbol) {
        if (symbol === 'gear')
            return gear();
        if (symbol === 'tablet')
            return tablet();
        if (symbol === 'compass')
            return compass();
        console.error('Science symbol not found:', symbol);
        return effectNotFound();
    }
    ArtCommon.science = science;
    function victoryPoints(points) {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFFFFFF));
        var text = new PIXI.Text("" + points, { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        text.anchor.set(0.5, 0.5);
        container.addChild(text);
        return container;
    }
    ArtCommon.victoryPoints = victoryPoints;
    function gold(gold) {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFBE317));
        var text = new PIXI.Text("" + gold, { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        text.anchor.set(0.5, 0.5);
        container.addChild(text);
        return container;
    }
    ArtCommon.gold = gold;
    function tradingPost(direction) {
        var container = new PIXI.Container();
        var woodArt = wood();
        woodArt.scale.set(0.5);
        var stoneArt = stone();
        stoneArt.scale.set(0.5);
        var oreArt = ore();
        oreArt.scale.set(0.5);
        var clayArt = clay();
        clayArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-120, -30, 240, 60, 30, cardBannerForColor('brown')));
        var resources = combineEffectArt([woodArt, stoneArt, oreArt, clayArt], 8);
        container.addChild(resources);
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(150, 0);
            container.addChild(arrow);
        }
        else if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-150, 0);
            container.addChild(arrow);
        }
        else {
            console.error('Trading post direction not found:', direction);
        }
        return container;
    }
    ArtCommon.tradingPost = tradingPost;
    function pointsForCards(color) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-25, -40, 50, 80, 6, ArtCommon.cardBannerForColor(color)));
        var arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-80, 0);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(80, 0);
        container.addChild(arrowR);
        return container;
    }
    ArtCommon.pointsForCards = pointsForCards;
    function wood() {
        return debugEffect(0x6D9F2F);
    }
    ArtCommon.wood = wood;
    function stone() {
        return debugEffect(0xC3BBBE);
    }
    ArtCommon.stone = stone;
    function ore() {
        return debugEffect(0x363936);
    }
    ArtCommon.ore = ore;
    function clay() {
        return debugEffect(0xE35B1E);
    }
    ArtCommon.clay = clay;
    function glass() {
        return debugEffect(0x36A1D6);
    }
    ArtCommon.glass = glass;
    function press() {
        return debugEffect(0xD9A86B);
    }
    ArtCommon.press = press;
    function loom() {
        return debugEffect(0xA5186A);
    }
    ArtCommon.loom = loom;
    function gear() {
        return Shapes.filledCircle(0, 0, 50, 0xB75C30);
    }
    ArtCommon.gear = gear;
    function tablet() {
        var shape = Shapes.filledRoundedRect(-30, -40, 60, 80, 8, 0xC8827A);
        shape.angle = -30;
        return shape;
    }
    ArtCommon.tablet = tablet;
    function compass() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xF0CB6F, 1);
        graphics.drawPolygon([-50, 50, -8, -50, 8, -50, 50, 50, 48, 50, 0, -36, -48, 50]);
        graphics.endFill();
        return graphics;
    }
    ArtCommon.compass = compass;
    function slash() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([0, -20, 12, -20, 0, 20, -12, 20]);
        graphics.endFill();
        return graphics;
    }
    function arrowLeft() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([45, -50, 45, 50, -45, 0]);
        graphics.endFill();
        return graphics;
    }
    function arrowRight() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([-45, -50, -45, 50, 45, 0]);
        graphics.endFill();
        return graphics;
    }
    function combineEffectArt(arts, padding) {
        var e_4, _a;
        var totalArtWidth = sum(arts, function (art) { return art.getBounds().width; }) + padding * (arts.length - 1);
        var container = new PIXI.Container();
        var x = -totalArtWidth / 2;
        try {
            for (var arts_1 = __values(arts), arts_1_1 = arts_1.next(); !arts_1_1.done; arts_1_1 = arts_1.next()) {
                var art = arts_1_1.value;
                var width = art.getBounds().width;
                art.x = x + width / 2;
                container.addChild(art);
                x += width + padding;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (arts_1_1 && !arts_1_1.done && (_a = arts_1.return)) _a.call(arts_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return container;
    }
    function combineCostArt(arts, padding) {
        var e_5, _a;
        var container = new PIXI.Container();
        var y = 0;
        try {
            for (var arts_2 = __values(arts), arts_2_1 = arts_2.next(); !arts_2_1.done; arts_2_1 = arts_2.next()) {
                var art = arts_2_1.value;
                var height = art.getBounds().height;
                art.y = y + height / 2;
                container.addChild(art);
                y += height + padding;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (arts_2_1 && !arts_2_1.done && (_a = arts_2.return)) _a.call(arts_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return container;
    }
    function combineStageCostArt(arts, padding) {
        var e_6, _a;
        if (arts.length >= 4) {
            if (arts.length % 2 === 0) {
                var left = combineStageCostArt(arts.slice(0, arts.length / 2), padding);
                var right = combineStageCostArt(arts.slice(arts.length / 2, arts.length), padding);
                return combineEffectArt([left, right], padding);
            }
            else {
                var first = combineStageCostArt(arts.slice(0, arts.length - 1), padding);
                first.pivot.set(0, first.height / 2);
                var last = arts[arts.length - 1];
                return combineStageCostArt([first, last], padding);
            }
        }
        var container = new PIXI.Container();
        var y = 0;
        try {
            for (var arts_3 = __values(arts), arts_3_1 = arts_3.next(); !arts_3_1.done; arts_3_1 = arts_3.next()) {
                var art = arts_3_1.value;
                var height = art.getBounds().height;
                art.y = y + height / 2;
                container.addChild(art);
                y += height + padding;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (arts_3_1 && !arts_3_1.done && (_a = arts_3.return)) _a.call(arts_3);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return container;
    }
    function effectNotFound() {
        return Shapes.filledRect(-50, -50, 100, 100, 0xFF00FF);
    }
    function debugEffect(color) {
        return Shapes.filledCircle(0, 0, 50, color);
    }
})(ArtCommon || (ArtCommon = {}));
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(card, handPosition, activeWonder, discardPile) {
        var _this = _super.call(this) || this;
        _this.apiCard = card;
        _this.homePosition = handPosition;
        _this.activeWonder = activeWonder;
        _this.discardPile = discardPile;
        _this.isForceEffect = false;
        _this.isForceFlipped = false;
        _this.state = 'full';
        _this.effectT = 0;
        _this.flippedT = 0;
        _this.dragging = null;
        _this.mainContainer = new PIXI.Container();
        _this.frontContainer = new PIXI.Container();
        _this.backContainer = new PIXI.Container();
        var cardBase = Shapes.filledRoundedRect(-33, -14, 66, 100, 6, ArtCommon.cardBannerForColor(card.color));
        _this.frontContainer.addChild(cardBase);
        var o = 2;
        var cardBg = Shapes.filledRoundedRect(-33 + o, -14 + o, 66 - 2 * o, 100 - 2 * o, 6 - o, ArtCommon.cardBg);
        _this.frontContainer.addChild(cardBg);
        var cardMask = cardBase.clone();
        _this.frontContainer.addChild(cardMask);
        var costContainer = ArtCommon.getArtForCost(card.cost);
        if (costContainer) {
            costContainer.scale.set(0.087);
            costContainer.position.set(-25, 14);
            var costBanner = Shapes.filledRoundedRect(-10, -5, 19, costContainer.height + 9, 6, ArtCommon.cardBannerForColor(card.color));
            costBanner.position.set(-25, 14);
            costBanner.mask = cardMask;
            _this.frontContainer.addChild(costBanner);
            _this.frontContainer.addChild(costContainer);
        }
        var cardBanner = Shapes.filledRect(-33, -14, 66, 28, ArtCommon.cardBannerForColor(card.color));
        cardBanner.mask = cardMask;
        _this.frontContainer.addChild(cardBanner);
        _this.fullCardRect = new PIXI.Rectangle(-33, -14, 66, 100);
        var effectContainer = ArtCommon.getArtForEffects(card.effects);
        effectContainer.position.set(0, 0);
        effectContainer.scale.set(0.16);
        _this.frontContainer.addChild(effectContainer);
        var effectsBounds = effectContainer.getBounds();
        var effectPadding = 4;
        _this.effectsRect = new PIXI.Rectangle(effectsBounds.left - effectPadding, effectsBounds.top - effectPadding, effectsBounds.width + 2 * effectPadding, effectsBounds.height + 2 * effectPadding);
        _this.stateMask = Shapes.filledRect(0, 0, 1, 1, 0xFFFFFF);
        _this.frontContainer.addChild(_this.stateMask);
        _this.frontContainer.mask = _this.stateMask;
        var backBase = Shapes.filledRoundedRect(-33, -14, 66, 100, 6, ArtCommon.ageBacks[card.age]);
        _this.backContainer.addChild(backBase);
        var backBg = Shapes.filledRoundedRect(-33 + o, -14 + o, 66 - 2 * o, 100 - 2 * o, 6 - o, ArtCommon.cardBg);
        _this.backContainer.addChild(backBg);
        _this.mainContainer.addChild(_this.frontContainer);
        _this.mainContainer.addChild(_this.backContainer);
        _this.addChild(_this.mainContainer);
        _this.buttonMode = true;
        _this.interactive = true;
        _this.on('pointerdown', function (event) {
            var position = event.data.getLocalPosition(_this.parent);
            _this.dragging = {
                data: event.data,
                offsetx: _this.x - position.x,
                offsety: _this.y - position.y,
            };
        });
        _this.update();
        return _this;
    }
    Card.prototype.update = function () {
        if (!Main.mouseDown && this.dragging) {
            var position = this.dragging.data.getLocalPosition(this.parent);
            this.dragging = null;
            if (this.activeWonder.getMainRegion().contains(position.x, position.y)) {
                this.select(this.activeWonder.getNewCardEffectWorldPosition(this));
                this.setEffect(true);
            }
            else if (this.activeWonder.getStageRegion().contains(position.x, position.y)) {
                this.select(this.activeWonder.getClosestStagePosition(position));
                this.setFlipped(true);
            }
            else if (this.discardPile.getBounds().contains(position.x, position.y)) {
                this.select(new PIXI.Point(this.discardPile.position.x, this.discardPile.position.y - 36 * this.scale.y));
                this.setFlipped(true);
            }
        }
        if (this.lockPosition) {
            this.x = lerp(this.x, this.lockPosition.x, 0.25);
            this.y = lerp(this.y, this.lockPosition.y, 0.25);
        }
        else if (this.dragging) {
            var position = this.dragging.data.getLocalPosition(this.parent);
            if (this.activeWonder.getMainRegion().contains(position.x, position.y)) {
                this.state = 'effect';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height / 2) * this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x / this.scale.x * 0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y / this.scale.y * 0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length - 1);
            }
            else if (this.activeWonder.getStageRegion().contains(position.x, position.y)) {
                this.state = 'flipped';
                var stagePoint = this.activeWonder.getClosestStagePosition(position);
                this.x = lerp(this.x, stagePoint.x, 0.25);
                this.y = lerp(this.y, stagePoint.y, 0.25);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x / this.scale.x * 0.66, this.flippedT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y / this.scale.y * 0.66, this.flippedT);
                this.parent.setChildIndex(this, 0);
            }
            else if (this.discardPile.getBounds().contains(position.x, position.y)) {
                this.state = 'flipped';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height / 2) * this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x / this.scale.x * 0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y / this.scale.y * 0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length - 1);
            }
            else {
                this.state = 'full';
                this.x = position.x + lerp(this.dragging.offsetx, 0, this.effectT);
                this.y = position.y + lerp(this.dragging.offsety, -(this.effectsRect.top + this.effectsRect.height / 2) * this.scale.y, this.effectT);
                this.mainContainer.scale.x = lerp(1, this.activeWonder.scale.x / this.scale.x * 0.75, this.effectT);
                this.mainContainer.scale.y = lerp(1, this.activeWonder.scale.y / this.scale.y * 0.75, this.effectT);
                this.parent.setChildIndex(this, this.parent.children.length - 1);
            }
        }
        else {
            this.x = lerp(this.x, this.homePosition.x, 0.25);
            this.y = lerp(this.y, this.homePosition.y, 0.25);
            this.mainContainer.scale.x = lerp(this.mainContainer.scale.x, 1, 0.25);
            this.mainContainer.scale.y = lerp(this.mainContainer.scale.y, 1, 0.25);
            this.state = 'full';
        }
        if (this.isForceFlipped) {
            this.state = 'flipped';
        }
        else if (this.isForceEffect) {
            this.state = 'effect';
        }
        if (this.state === 'effect') {
            this.effectT += (1 - this.effectT) * 0.25;
        }
        else {
            this.effectT += (0 - this.effectT) * 0.25;
        }
        if (this.state === 'flipped') {
            this.flippedT += (1 - this.flippedT) * 0.25;
        }
        else {
            this.flippedT += (0 - this.flippedT) * 0.25;
        }
        this.stateMask.position.set(lerp(this.fullCardRect.left, this.effectsRect.left, this.effectT), lerp(this.fullCardRect.top, this.effectsRect.top, this.effectT));
        this.stateMask.scale.set(lerp(this.fullCardRect.width, this.effectsRect.width, this.effectT), lerp(this.fullCardRect.height, this.effectsRect.height, this.effectT));
        this.frontContainer.scale.x = 1 - Math.min(this.flippedT, 0.5) * 2;
        this.backContainer.scale.x = Math.max(0.5, this.flippedT) * 2 - 1;
    };
    Card.prototype.getWidth = function () {
        return this.stateMask.width * this.scale.x * this.mainContainer.scale.x;
    };
    Card.prototype.getHeight = function () {
        return this.stateMask.height * this.scale.y * this.mainContainer.scale.y;
    };
    Card.prototype.select = function (lockPosition) {
        if (Main.scene.hand.selectedCard) {
            Main.scene.hand.selectedCard.deselect();
        }
        this.lockPosition = lockPosition;
    };
    Card.prototype.deselect = function () {
        this.lockPosition = null;
        this.setFull();
    };
    Card.prototype.setEffect = function (immediate) {
        this.isForceEffect = true;
        this.state = 'effect';
        if (immediate)
            this.effectT = 1;
        this.buttonMode = false;
        this.interactive = false;
        this.update();
    };
    Card.prototype.setFlipped = function (immediate) {
        this.isForceFlipped = true;
        this.state = 'flipped';
        if (immediate)
            this.flippedT = 1;
        this.buttonMode = false;
        this.interactive = false;
        this.update();
    };
    Card.prototype.setFull = function (immediate) {
        this.isForceFlipped = false;
        this.isForceEffect = false;
        this.state = 'full';
        if (immediate)
            this.flippedT = 0;
        if (immediate)
            this.effectT = 0;
        this.buttonMode = true;
        this.interactive = true;
        this.update();
    };
    return Card;
}(PIXI.Container));
var GameStateDiffer;
(function (GameStateDiffer) {
    function diffNonTurn(gamestate) {
        var e_7, _a;
        var result = {
            scripts: []
        };
        try {
            for (var _b = __values(Main.gamedata.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                diffGold(gamestate, player, result);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return result;
    }
    GameStateDiffer.diffNonTurn = diffNonTurn;
    function diffTurn(gamestate, movehistory) {
        var result = diffNonTurn(gamestate);
        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return;
        }
        var move = movehistory[gamestate.turn - 1][Main.player];
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                if (move.action === 'play') {
                }
                return [2 /*return*/];
            });
        });
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Main.scene.hand.flip();
                        return [5 /*yield**/, __values(S.wait(0.1)())];
                    case 1:
                        _a.sent();
                        Main.scene.hand.collapse();
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 2:
                        _a.sent();
                        Main.scene.hand.uncollapse();
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
        return result;
    }
    GameStateDiffer.diffTurn = diffTurn;
    function diffGold(gamestate, player, result) {
        var oldGold = Main.gamestate.playerData[player].gold;
        var newGold = gamestate.playerData[player].gold;
        var playeri = Main.gamedata.players.indexOf(player);
        if (newGold === oldGold) {
            return;
        }
        result.scripts.push(function () {
            var goldText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goldText = Main.scene.wonders[playeri].goldText;
                        goldText.style.fill = 0xFF0000;
                        return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                                goldText.text = "" + Math.round(lerp(oldGold, newGold, t));
                            })())];
                    case 1:
                        _a.sent();
                        goldText.style.fill = 0xFFFFFF;
                        return [2 /*return*/];
                }
            });
        });
    }
})(GameStateDiffer || (GameStateDiffer = {}));
var Hand = /** @class */ (function () {
    function Hand(container, cards, activeWonder, discardPile) {
        var handY = 120;
        var handDX = 136;
        this.normalHandPositions = [];
        this.homePositions = [];
        this.collapsedPosition = new PIXI.Point(Main.width / 2, handY);
        this.cards = [];
        this.collapsed = false;
        for (var i = 0; i < cards.length; i++) {
            var normalHandPosition = new PIXI.Point(Main.width / 2 + handDX * (i - (cards.length - 1) / 2), handY);
            this.normalHandPositions.push(normalHandPosition);
            var homePosition = new PIXI.Point(normalHandPosition.x, normalHandPosition.y);
            this.homePositions.push(homePosition);
            var card = new Card(cards[i], homePosition, activeWonder, discardPile);
            card.position.set(homePosition.x, homePosition.y);
            card.scale.set(2);
            this.cards.push(card);
            container.addChild(card);
            card.setFlipped(true);
            card.setFull();
        }
    }
    Object.defineProperty(Hand.prototype, "selectedCard", {
        get: function () {
            var e_8, _a;
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.lockPosition)
                        return card;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Hand.prototype.update = function () {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.collapsed) {
                this.cards[i].homePosition.x = lerp(this.cards[i].homePosition.x, this.collapsedPosition.x, 0.125);
                this.cards[i].homePosition.y = lerp(this.cards[i].homePosition.y, this.collapsedPosition.y, 0.125);
            }
            else {
                this.cards[i].homePosition.x = lerp(this.cards[i].homePosition.x, this.normalHandPositions[i].x, 0.125);
                this.cards[i].homePosition.y = lerp(this.cards[i].homePosition.y, this.normalHandPositions[i].y, 0.125);
            }
            this.cards[i].update();
        }
    };
    Hand.prototype.collapse = function () {
        console.log('collapsed');
        this.collapsed = true;
    };
    Hand.prototype.uncollapse = function () {
        console.log('uncollapsed');
        this.collapsed = false;
    };
    Hand.prototype.flip = function () {
        var e_9, _a;
        console.log('flipped');
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.setFlipped();
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
    };
    Hand.prototype.unflip = function () {
        var e_10, _a;
        console.log('unflipped');
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.setFull();
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
    };
    return Hand;
}());
var Main = /** @class */ (function () {
    function Main() {
    }
    Object.defineProperty(Main, "width", {
        get: function () { return this.app.view.width; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(Main, "height", {
        get: function () { return this.app.view.height; },
        enumerable: false,
        configurable: true
    });
    ;
    Main.start = function () {
        var _this = this;
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: 2000,
            antialias: true
        });
        document.body.appendChild(this.app.view);
        window.addEventListener('mousedown', function () { return _this.mouseDown = true; });
        window.addEventListener('mouseup', function () { return _this.mouseDown = false; });
        window.addEventListener('resize', function () { return _this.resize(); });
        this.mouseDown = false;
        this.initialized = false;
        this.scriptManager = new ScriptManager();
        var params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');
        PIXI.Ticker.shared.add(function (delta) {
            _this.delta = delta / 60;
            _this.update();
        });
        API.getgamedata(this.gameid, function (gamedata, error) {
            if (error) {
                Main.error('Failed to get game data: ' + error);
                return;
            }
            API.getgamestate(_this.gameid, _this.player, function (gamestate, error) {
                if (error) {
                    Main.error('Failed to get game state: ' + error);
                    return;
                }
                console.log('Got game data:', gamedata);
                console.log('Got game state:', gamestate);
                _this.setupGame(gamedata, gamestate);
            });
        });
    };
    Main.setupGame = function (gamedata, gamestate) {
        this.gamedata = gamedata;
        this.gamestate = gamestate;
        this.initialized = true;
        this.scene = new Scene();
        this.app.stage.addChild(this.scene.mainContainer);
        this.render();
        this.sendUpdateGameState();
    };
    Main.update = function () {
        if (this.scene)
            this.scene.update();
        this.scriptManager.update();
    };
    Main.render = function () {
        if (!this.initialized)
            return;
        this.scene.render();
    };
    Main.resize = function () {
        this.app.renderer.resize(window.innerWidth, this.height);
        this.render();
    };
    Main.sendUpdateGameState = function () {
        var _this = this;
        this.scriptManager.runScript(S.chain(S.wait(1), S.call(function () { return _this.updateGameState(); })));
    };
    Main.updateGameState = function () {
        var _this = this;
        API.getgamestate(this.gameid, this.player, function (gamestate, error) {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                _this.sendUpdateGameState();
                return;
            }
            console.log('Refreshed gamestate:', gamestate);
            if (gamestate.turn < Main.gamestate.turn) {
                Main.error("Error: local turn (" + Main.gamestate.turn + ") is greater than the game's (" + gamestate.turn + ")?");
                _this.sendUpdateGameState();
                return;
            }
            else if (gamestate.turn === Main.gamestate.turn) {
                var diffResult = GameStateDiffer.diffNonTurn(gamestate);
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.gamestate = gamestate;
                    _this.sendUpdateGameState();
                })));
            }
            else {
                API.getmovehistory(_this.gameid, _this.player, function (movehistory, error) {
                    if (error) {
                        Main.error('Failed to get move history: ' + error);
                        _this.sendUpdateGameState();
                        return;
                    }
                    var diffResult = GameStateDiffer.diffTurn(gamestate, movehistory);
                    _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                        _this.gamestate = gamestate;
                        console.log('reloading');
                        _this.render();
                        _this.sendUpdateGameState();
                    })));
                });
            }
        });
    };
    Main.stop = function () {
        this.scriptManager.reset();
    };
    Main.error = function (text) {
        console.error(text);
        var errorBox = Shapes.filledRect(0, 0, Main.width, 50, 0xFF0000);
        var errorText = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 50, fill: 0x000000 });
        errorText.anchor.set(0.5, 0.5);
        errorText.scale.set(0.5);
        errorText.position.set(Main.width / 2, errorBox.height / 2);
        errorBox.addChild(errorText);
        var app = this.app;
        this.scriptManager.runScript(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorBox.position.set(0, -50);
                        app.stage.addChild(errorBox);
                        return [5 /*yield**/, __values(S.doOverTime(0.1, function (t) { return errorBox.position.y = 50 * t - 50; })())];
                    case 1:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(2)())];
                    case 2:
                        _a.sent();
                        return [5 /*yield**/, __values(S.doOverTime(0.1, function (t) { return errorBox.position.y = -50 * t; })())];
                    case 3:
                        _a.sent();
                        app.stage.removeChild(errorBox);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.delta = 0;
    return Main;
}());
var Scene = /** @class */ (function () {
    function Scene() {
        this.mainContainer = new PIXI.Container();
    }
    Scene.prototype.render = function () {
        var gamedata = Main.gamedata;
        var gamestate = Main.gamestate;
        var player = Main.player;
        var wonderStartY = 600;
        var wonderDX = Main.width / 4;
        var wonderDY = 400;
        var discardY = 1000;
        var discardWidth = 250;
        var discardHeight = 300;
        this.mainContainer.removeChildren();
        this.wonders = gamedata.players.map(function (p) { return undefined; });
        var p = gamedata.players.indexOf(player);
        this.addWonderForPlayer(gamedata, gamestate, p, Main.width / 2, wonderStartY);
        var l = mod(p - 1, gamedata.players.length);
        var r = mod(p + 1, gamedata.players.length);
        var i;
        for (i = 1; i < gamedata.players.length / 2; i++) {
            this.addWonderForPlayer(gamedata, gamestate, l, Main.width / 2 - wonderDX, wonderStartY + wonderDY * i);
            this.addWonderForPlayer(gamedata, gamestate, r, Main.width / 2 + wonderDX, wonderStartY + wonderDY * i);
            l = mod(l - 1, gamedata.players.length);
            r = mod(r + 1, gamedata.players.length);
        }
        if (gamedata.players.length % 2 === 0) {
            this.addWonderForPlayer(gamedata, gamestate, l, Main.width / 2, wonderStartY + wonderDY * i);
        }
        this.discardPile = new PIXI.Container();
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth / 2, -discardHeight / 2, discardWidth, discardHeight, 10, 0x888888));
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth / 2 + 4, -discardHeight / 2 + 4, discardWidth - 8, discardHeight - 8, 6, 0x000000));
        this.discardPile.position.set(Main.width / 2, discardY);
        this.mainContainer.addChild(this.discardPile);
        var handIds = gamestate.playerData[player].hand;
        handIds = __spread(handIds).sort(function (a, b) { return a - b; });
        var handCards = handIds.map(function (id) { return gamedata.cards[id]; });
        this.hand = new Hand(this.mainContainer, handCards, this.wonders[gamedata.players.indexOf(player)], this.discardPile);
    };
    Scene.prototype.update = function () {
        this.hand.update();
    };
    Scene.prototype.addWonderForPlayer = function (gamedata, gamestate, i, x, y) {
        var player = gamedata.players[i];
        var wonder = new Wonder(gamedata.wonders[player], gamestate.playerData[player].playedCards.map(function (id) { return gamedata.cards[id]; }), gamestate.playerData[player].stagesBuilt, gamestate.playerData[player].gold, player);
        wonder.position.set(x, y);
        wonder.scale.set(2.5);
        this.mainContainer.addChild(wonder);
        this.wonders[i] = wonder;
    };
    return Scene;
}());
var Shapes = /** @class */ (function () {
    function Shapes() {
    }
    Shapes.filledCircle = function (x, y, radius, color) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawCircle(x, y, radius);
        graphics.endFill();
        return graphics;
    };
    Shapes.filledRect = function (x, y, width, height, color) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawRect(x, y, width, height);
        graphics.endFill();
        return graphics;
    };
    Shapes.filledRoundedRect = function (x, y, width, height, cornerRadius, color) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawRoundedRect(x, y, width, height, cornerRadius);
        graphics.endFill();
        return graphics;
    };
    return Shapes;
}());
function clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function mod(n, mod) {
    while (n >= mod)
        n -= mod;
    while (n < 0)
        n += mod;
    return n;
}
function sum(array, key) {
    var e_11, _a;
    if (!array || array.length === 0) {
        return 0;
    }
    var result = 0;
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var e = array_1_1.value;
            result += key(e);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_11) throw e_11.error; }
    }
    return result;
}
var Wonder = /** @class */ (function (_super) {
    __extends(Wonder, _super);
    function Wonder(wonder, playedCards, stagesBuilt, gold, player) {
        var e_12, _a, e_13, _b;
        var _this = _super.call(this) || this;
        var wonderColor = 0xFFFFFF;
        var boardBase = Shapes.filledRoundedRect(-100, -50, 200, 100, 8, wonderColor);
        _this.addChild(boardBase);
        var o = 1;
        var boardBg = Shapes.filledRoundedRect(-100 + o, -50 + o, 200 - 2 * o, 100 - 2 * o, 8 - o, ArtCommon.wonderBg);
        _this.addChild(boardBg);
        var boardBgMask = boardBg.clone();
        _this.addChild(boardBgMask);
        var startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        var startingEffectBanner = Shapes.filledRect(-100, -50, 18 + o, 18 + o, ArtCommon.cardBannerForColor(wonder.starting_effect_color));
        startingEffectBanner.mask = boardBgMask;
        _this.addChild(startingEffectBanner);
        startingEffects.scale.set(0.12);
        startingEffects.position.set(-91 + o, -41 + o);
        _this.addChild(startingEffects);
        _this.brownResourceContainer = new PIXI.Container();
        _this.brownResourceContainer.position.set(-100, -65);
        _this.addChild(_this.brownResourceContainer);
        _this.greyResourceContainer = new PIXI.Container();
        _this.greyResourceContainer.position.set(_this.brownResourceContainer.x + _this.brownResourceContainer.width, -65);
        _this.addChild(_this.greyResourceContainer);
        _this.commerceContainer = new PIXI.Container();
        _this.commerceContainer.position.set(-100 + o, -14);
        _this.addChild(_this.commerceContainer);
        _this.guildContainer = new PIXI.Container();
        _this.guildContainer.position.set(-100 + o, 12);
        _this.addChild(_this.guildContainer);
        _this.militaryContainer = new PIXI.Container();
        _this.militaryContainer.position.set(-73, -41 + o);
        _this.addChild(_this.militaryContainer);
        _this.civilianContainer = new PIXI.Container();
        _this.civilianContainer.position.set(100 - o, -14);
        _this.addChild(_this.civilianContainer);
        _this.scienceContainer = new PIXI.Container();
        _this.scienceContainer.position.set(100 - o, 12);
        _this.addChild(_this.scienceContainer);
        try {
            for (var playedCards_1 = __values(playedCards), playedCards_1_1 = playedCards_1.next(); !playedCards_1_1.done; playedCards_1_1 = playedCards_1.next()) {
                var card = playedCards_1_1.value;
                var cardArt = new Card(card, new PIXI.Point(), _this, new PIXI.Container());
                _this.addNewCardEffect(cardArt);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (playedCards_1_1 && !playedCards_1_1.done && (_a = playedCards_1.return)) _a.call(playedCards_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        var stagesMiddle = wonder.stages.length === 2 ? 32 : 0;
        var stageDX = wonder.stages.length === 4 ? 49 : 64;
        _this.stageXs = [];
        for (var i = 0; i < wonder.stages.length; i++) {
            _this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1) / 2));
            var stageBase = Shapes.filledRoundedRect(-24, 29, 48, 100, 6, 0xFFFFFF);
            stageBase.mask = boardBgMask;
            stageBase.x = _this.stageXs[i];
            _this.addChild(stageBase);
            var stageBg = Shapes.filledRoundedRect(-24 + o, 29 + o, 48 - 2 * o, 100 - 2 * o, 6 - o, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = _this.stageXs[i];
            _this.addChild(stageBg);
            var stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(0.10);
            stageEffects.position.set(_this.stageXs[i], 39.5);
            _this.addChild(stageEffects);
            var stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(0.04);
                stageCost.position.set(_this.stageXs[i] - 22, 30);
                var costBanner = Shapes.filledRoundedRect(-stageCost.width / 2 - 2, -2, stageCost.width + 4, stageCost.height + 4, 2, wonderColor);
                costBanner.position.set(stageCost.x, stageCost.y);
                var costBannerBg = Shapes.filledRoundedRect(-stageCost.width / 2 - 1, -1, stageCost.width + 2, stageCost.height + 2, 1, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);
                _this.addChild(costBanner);
                _this.addChild(costBannerBg);
                _this.addChild(stageCost);
            }
        }
        try {
            for (var stagesBuilt_1 = __values(stagesBuilt), stagesBuilt_1_1 = stagesBuilt_1.next(); !stagesBuilt_1_1.done; stagesBuilt_1_1 = stagesBuilt_1.next()) {
                var stageBuilt = stagesBuilt_1_1.value;
                var ageCard = { age: stageBuilt.cardAge, name: '', color: 'brown', effects: [] };
                var cardArt = new Card(ageCard, new PIXI.Point(), _this, new PIXI.Container());
                cardArt.setFlipped(true);
                cardArt.scale.set(0.66);
                cardArt.position.set(_this.stageXs[stageBuilt.stage], 5);
                _this.addChildAt(cardArt, 0);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (stagesBuilt_1_1 && !stagesBuilt_1_1.done && (_b = stagesBuilt_1.return)) _b.call(stagesBuilt_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        var goldCoin = Shapes.filledCircle(95, -58, 5, 0xFBE317);
        _this.addChild(goldCoin);
        _this.goldText = new PIXI.Text("" + gold, { fontFamily: 'Arial', fontSize: 70, fill: 0xFFFFFF });
        _this.goldText.anchor.set(1, 0.5);
        _this.goldText.scale.set(0.12);
        _this.goldText.position.set(87, -58);
        _this.addChild(_this.goldText);
        var playerText = new PIXI.Text("" + player, { fontFamily: 'Arial', fontSize: 70, fill: 0xFFFFFF });
        playerText.anchor.set(1, 0.5);
        playerText.scale.set(0.12);
        playerText.position.set(100, -70);
        _this.addChild(playerText);
        return _this;
    }
    Wonder.prototype.getMainRegion = function () {
        return new PIXI.Rectangle(this.x + -100 * this.scale.x, this.y + -75 * this.scale.y, 200 * this.scale.x, 100 * this.scale.y);
    };
    Wonder.prototype.getStageRegion = function () {
        return new PIXI.Rectangle(this.x + -100 * this.scale.x, this.y + 25 * this.scale.y, 200 * this.scale.x, 50 * this.scale.y);
    };
    Wonder.prototype.getClosestStagePosition = function (position) {
        var minStage = 0;
        for (var i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x + this.stageXs[i] * this.scale.x - position.x) < Math.abs(this.x + this.stageXs[minStage] * this.scale.x - position.x)) {
                minStage = i;
            }
        }
        return new PIXI.Point(this.x + this.stageXs[minStage] * this.scale.x, this.y + 5 * this.scale.y);
    };
    Wonder.prototype.getNewCardEffectWorldPosition = function (cardArt) {
        var color = cardArt.apiCard.color;
        var point;
        if (color === 'brown') {
            point = new PIXI.Point(this.x + (this.brownResourceContainer.x + this.brownResourceContainer.width) * this.scale.x + cardArt.getWidth() / 2, this.y + this.brownResourceContainer.y * this.scale.y);
        }
        else if (color === 'grey') {
            point = new PIXI.Point(this.x + (this.greyResourceContainer.x + this.greyResourceContainer.width) * this.scale.x + cardArt.getWidth() / 2, this.y + this.greyResourceContainer.y * this.scale.y);
        }
        else if (color === 'yellow') {
            point = new PIXI.Point(this.x + (this.commerceContainer.x + this.commerceContainer.width) * this.scale.x + cardArt.getWidth() / 2, this.y + this.commerceContainer.y * this.scale.y);
        }
        else if (color === 'purple') {
            point = new PIXI.Point(this.x + (this.guildContainer.x + this.guildContainer.width) * this.scale.x + cardArt.getWidth() / 2, this.y + this.guildContainer.y * this.scale.y);
        }
        else if (color === 'red') {
            point = new PIXI.Point(this.x + (this.militaryContainer.x + this.militaryContainer.width) * this.scale.x + cardArt.getWidth() / 2, this.y + this.militaryContainer.y * this.scale.y);
        }
        else if (color === 'blue') {
            point = new PIXI.Point(this.x + (this.civilianContainer.x + -this.civilianContainer.width) * this.scale.x - cardArt.getWidth() / 2, this.y + this.civilianContainer.y * this.scale.y);
        }
        else if (color === 'green') {
            point = new PIXI.Point(this.x + (this.scienceContainer.x + -this.scienceContainer.width) * this.scale.x - cardArt.getWidth() / 2, this.y + this.scienceContainer.y * this.scale.y);
        }
        else {
            console.error('Card color not found:', color);
            point = new PIXI.Point(0, 0);
        }
        return point;
    };
    Wonder.prototype.addNewCardEffect = function (cardArt) {
        cardArt.setEffect(true);
        cardArt.scale.set(0.75);
        var color = cardArt.apiCard.color;
        if (color === 'brown') {
            cardArt.position.set(this.brownResourceContainer.width + cardArt.getWidth() / 2, 0);
            this.brownResourceContainer.addChild(cardArt);
            this.greyResourceContainer.x += cardArt.getWidth();
        }
        else if (color === 'grey') {
            cardArt.position.set(this.greyResourceContainer.width + cardArt.getWidth() / 2, 0);
            this.greyResourceContainer.addChild(cardArt);
        }
        else if (color === 'yellow') {
            cardArt.position.set(this.commerceContainer.width + cardArt.getWidth() / 2, 0);
            this.commerceContainer.addChild(cardArt);
        }
        else if (color === 'purple') {
            cardArt.position.set(this.guildContainer.width + cardArt.getWidth() / 2, 0);
            this.guildContainer.addChild(cardArt);
        }
        else if (color === 'red') {
            cardArt.position.set(this.militaryContainer.width + cardArt.getWidth() / 2, 0);
            this.militaryContainer.addChild(cardArt);
        }
        else if (color === 'blue') {
            cardArt.position.set(-this.civilianContainer.width - cardArt.getWidth() / 2, 0);
            this.civilianContainer.addChild(cardArt);
        }
        else if (color === 'green') {
            cardArt.position.set(-this.scienceContainer.width - cardArt.getWidth() / 2, 0);
            this.scienceContainer.addChild(cardArt);
        }
        else {
            console.error('Card color not found:', color);
        }
    };
    return Wonder;
}(PIXI.Container));
var S;
(function (S) {
    function call(callback) {
        return function () {
            return __generator(this, function (_a) {
                callback();
                return [2 /*return*/];
            });
        };
    }
    S.call = call;
    function chain() {
        var scriptFunctions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scriptFunctions[_i] = arguments[_i];
        }
        return function () {
            var scriptFunctions_1, scriptFunctions_1_1, scriptFunction, e_14_1;
            var e_14, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        scriptFunctions_1 = __values(scriptFunctions), scriptFunctions_1_1 = scriptFunctions_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!scriptFunctions_1_1.done) return [3 /*break*/, 4];
                        scriptFunction = scriptFunctions_1_1.value;
                        return [5 /*yield**/, __values(scriptFunction())];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        scriptFunctions_1_1 = scriptFunctions_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_14_1 = _b.sent();
                        e_14 = { error: e_14_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (scriptFunctions_1_1 && !scriptFunctions_1_1.done && (_a = scriptFunctions_1.return)) _a.call(scriptFunctions_1);
                        }
                        finally { if (e_14) throw e_14.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        };
    }
    S.chain = chain;
    function doOverTime(duration, callback) {
        return function () {
            var t;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        t = 0;
                        _a.label = 1;
                    case 1:
                        if (!(t < duration)) return [3 /*break*/, 3];
                        t += Main.delta;
                        callback(t / duration);
                        return [4 /*yield*/];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        callback(1);
                        return [2 /*return*/];
                }
            });
        };
    }
    S.doOverTime = doOverTime;
    function loop(times, scriptFunction) {
        return function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < times)) return [3 /*break*/, 5];
                        return [5 /*yield**/, __values(scriptFunction())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        };
    }
    S.loop = loop;
    function simul() {
        var scriptFunctions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scriptFunctions[_i] = arguments[_i];
        }
        return function () {
            var scripts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scripts = scriptFunctions.map(function (sf) { return Main.scriptManager.runScript(sf); });
                        _a.label = 1;
                    case 1:
                        if (!scripts.some(function (s) { return !s.done; })) return [3 /*break*/, 3];
                        return [4 /*yield*/];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        };
    }
    S.simul = simul;
    function wait(duration) {
        return doOverTime(duration, function (t) { return null; });
    }
    S.wait = wait;
})(S || (S = {}));
var Script = /** @class */ (function () {
    function Script(scriptFunction) {
        this.iterator = this.buildIterator(scriptFunction)();
    }
    Object.defineProperty(Script.prototype, "running", {
        get: function () {
            return !this.paused && !this.done;
        },
        enumerable: false,
        configurable: true
    });
    Script.prototype.update = function () {
        if (!this.running)
            return;
        var result = this.iterator.next();
        if (result.done) {
            this.done = true;
        }
    };
    Script.prototype.finishImmediately = function (maxIters) {
        if (maxIters === void 0) { maxIters = Script.FINISH_IMMEDIATELY_MAX_ITERS; }
        for (var i = 0; i < maxIters && !this.done; i++) {
            this.update();
        }
        if (!this.done) {
            console.error('Warning: script finishImmediately exceeded max iters!', this);
            this.done = true;
        }
    };
    Script.prototype.stop = function () {
        this.done = true;
    };
    Script.prototype.buildIterator = function (scriptFunction) {
        return function () {
            var iterator, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        iterator = scriptFunction();
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 4];
                        result = iterator.next();
                        if (!!result.done) return [3 /*break*/, 3];
                        return [4 /*yield*/];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (result.done)
                            return [3 /*break*/, 4];
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
    };
    Script.FINISH_IMMEDIATELY_MAX_ITERS = 1000000;
    return Script;
}());
(function (Script) {
    function instant(scriptFunction, maxIters) {
        new Script(scriptFunction).finishImmediately(maxIters);
    }
    Script.instant = instant;
})(Script || (Script = {}));
var ScriptManager = /** @class */ (function () {
    function ScriptManager() {
        this.activeScripts = [];
    }
    ScriptManager.prototype.update = function () {
        for (var i = this.activeScripts.length - 1; i >= 0; i--) {
            this.activeScripts[i].update();
            if (this.activeScripts[i].done) {
                this.activeScripts.splice(i, 1);
            }
        }
    };
    ScriptManager.prototype.reset = function () {
        this.activeScripts = [];
    };
    ScriptManager.prototype.runScript = function (script) {
        if (script instanceof Script) {
            if (script.done)
                return;
        }
        else {
            script = new Script(script);
        }
        this.activeScripts.push(script);
        return script;
    };
    return ScriptManager;
}());
