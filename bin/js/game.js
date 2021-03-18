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
var GameElement = /** @class */ (function () {
    function GameElement() {
        this.game = document.getElementById('game');
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
    }
    Object.defineProperty(GameElement.prototype, "x", {
        get: function () {
            return HtmlUtils.cssStylePositionToPixels(this.div.style.left, this.game.clientWidth);
        },
        set: function (value) { this.div.style.left = value + "px"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "y", {
        get: function () {
            return HtmlUtils.cssStylePositionToPixels(this.div.style.top, this.game.clientHeight);
        },
        set: function (value) { this.div.style.top = value + "px"; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "xs", {
        set: function (value) { this.div.style.left = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "ys", {
        set: function (value) { this.div.style.top = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "zIndex", {
        set: function (value) {
            this.div.style.zIndex = "" + value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "visible", {
        get: function () { return this.div.style.visibility !== 'hidden'; },
        set: function (value) {
            this.div.style.visibility = value ? 'visible' : 'hidden';
        },
        enumerable: false,
        configurable: true
    });
    GameElement.prototype.addToGame = function () {
        document.querySelector('#game').appendChild(this.div);
        HTMLCanvasElement;
    };
    GameElement.prototype.removeFromGame = function () {
        if (this.div.parentElement) {
            this.div.parentElement.removeChild(this.div);
        }
    };
    return GameElement;
}());
/// <reference path="gameElement.ts" />
var ActionButton = /** @class */ (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton() {
        var _this = _super.call(this) || this;
        _this.BUTTON_WIDTH = 100;
        _this.BUTTON_HEIGHT = 50;
        _this.BUTTON_CORNER_RADIUS = 8;
        var button = _this.div.appendChild(document.createElement('div'));
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.width = _this.BUTTON_WIDTH + "px";
        button.style.height = _this.BUTTON_HEIGHT + "px";
        button.style.borderRadius = _this.BUTTON_CORNER_RADIUS + "px";
        button.style.transform = 'translate(-50%, -50%)';
        button.style.position = 'relative';
        button.style.cursor = 'pointer';
        _this.textElement = button.appendChild(document.createElement('p'));
        _this.textElement.style.fontFamily = "'Courier New', Courier, monospace";
        _this.textElement.style.textAlign = 'center';
        _this.textElement.style.position = 'absolute';
        _this.textElement.style.left = '50%';
        _this.textElement.style.top = '50%';
        _this.textElement.style.transform = 'translate(-50%, -50%)';
        button.onclick = function (event) {
            if (_this.type === 'undo') {
                Main.undoMove();
                if (Main.scene.isPaymentMenuActive)
                    Main.scene.paymentDialog.removeFromGame();
            }
            else if (_this.type === 'reject_discard') {
                Main.submitMove({ action: 'reject', card: -1, payment: {} });
            }
        };
        return _this;
    }
    ActionButton.prototype.setType = function (type) {
        this.type = type;
        this.textElement.textContent = (type === 'undo') ? 'Undo' : 'No Thanks';
    };
    return ActionButton;
}(GameElement));
var API;
(function (API) {
    function eqMove(move1, move2) {
        if (!move1 && !move2)
            return true;
        if (!move1 || !move2)
            return false;
        if (move1.action !== move2.action)
            return false;
        if (move1.card !== move2.card)
            return false;
        if (move1.stage !== move2.stage)
            return false;
        if (move1.stage !== move2.stage)
            return false;
        return eqPayment(move1.payment, move2.payment);
    }
    API.eqMove = eqMove;
    function eqPayment(payment1, payment2) {
        if (!payment1 && !payment2)
            return true;
        if (!payment1 || !payment2)
            return false;
        if ((payment1.pos || 0) !== (payment2.pos || 0))
            return false;
        if ((payment1.neg || 0) !== (payment2.neg || 0))
            return false;
        if ((payment1.bank || 0) !== (payment2.bank || 0))
            return false;
        return true;
    }
    API.eqPayment = eqPayment;
    function totalPaymentAmount(payment) {
        if (!payment)
            return 0;
        return (payment.pos || 0) + (payment.neg || 0) + (payment.bank || 0);
    }
    API.totalPaymentAmount = totalPaymentAmount;
    function totalNeighborPaymentAmount(payment) {
        if (!payment)
            return 0;
        return (payment.pos || 0) + (payment.neg || 0);
    }
    API.totalNeighborPaymentAmount = totalNeighborPaymentAmount;
    function minimalBankPayment(move, validMoves) {
        var e_1, _a;
        var _b;
        var result = Infinity;
        try {
            for (var validMoves_1 = __values(validMoves), validMoves_1_1 = validMoves_1.next(); !validMoves_1_1.done; validMoves_1_1 = validMoves_1.next()) {
                var validMove = validMoves_1_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                if (validMove.stage !== move.stage)
                    continue;
                var bankPayment = ((_b = validMove.payment) === null || _b === void 0 ? void 0 : _b.bank) || 0;
                if (bankPayment < result)
                    result = bankPayment;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (validMoves_1_1 && !validMoves_1_1.done && (_a = validMoves_1.return)) _a.call(validMoves_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
    API.minimalBankPayment = minimalBankPayment;
    function isNeighborPaymentNecessary(move, validMoves) {
        var e_2, _a;
        var foundMatchingMove = false;
        try {
            for (var validMoves_2 = __values(validMoves), validMoves_2_1 = validMoves_2.next(); !validMoves_2_1.done; validMoves_2_1 = validMoves_2.next()) {
                var validMove = validMoves_2_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                if (validMove.stage !== move.stage)
                    continue;
                foundMatchingMove = true;
                var totalPayment = totalNeighborPaymentAmount(validMove.payment);
                if (totalPayment === 0)
                    return false;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (validMoves_2_1 && !validMoves_2_1.done && (_a = validMoves_2.return)) _a.call(validMoves_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (!foundMatchingMove)
            return false;
        return true;
    }
    API.isNeighborPaymentNecessary = isNeighborPaymentNecessary;
    function getNeighbors(gamestate, player) {
        var neg_index = gamestate.players.indexOf(player) - 1;
        if (neg_index < 0)
            neg_index += gamestate.players.length;
        var pos_index = gamestate.players.indexOf(player) + 1;
        if (pos_index >= gamestate.players.length)
            pos_index -= gamestate.players.length;
        return [gamestate.players[neg_index], gamestate.players[pos_index]];
    }
    API.getNeighbors = getNeighbors;
    function minimalPaymentOptions(move, validMoves) {
        var e_3, _a;
        var options = [];
        try {
            for (var validMoves_3 = __values(validMoves), validMoves_3_1 = validMoves_3.next(); !validMoves_3_1.done; validMoves_3_1 = validMoves_3.next()) {
                var validMove = validMoves_3_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                if (validMove.stage !== move.stage)
                    continue;
                if (totalNeighborPaymentAmount(validMove.payment) === 0)
                    continue;
                options.push(validMove.payment);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (validMoves_3_1 && !validMoves_3_1.done && (_a = validMoves_3.return)) _a.call(validMoves_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        options.sort(function (o1, o2) { return totalNeighborPaymentAmount(o1) - totalNeighborPaymentAmount(o2); });
        for (var i = 0; i < options.length; i++) {
            for (var j = i + 1; j < options.length; j++) {
                var pos_i = options[i].pos || 0;
                var neg_i = options[i].neg || 0;
                var pos_j = options[j].pos || 0;
                var neg_j = options[j].neg || 0;
                if (pos_i <= pos_j && neg_i <= neg_j) {
                    options.splice(j, 1);
                    j--;
                }
            }
        }
        return options;
    }
    API.minimalPaymentOptions = minimalPaymentOptions;
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
    function getvalidmoves(gameid, turn, player, callback) {
        httpRequest(LAMBDA_URL + "?operation=getvalidmoves&gameid=" + gameid + "&turn=" + turn + "&player=" + player, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson['validMoves'], undefined);
            }
        });
    }
    API.getvalidmoves = getvalidmoves;
    function submitmove(gameid, turn, player, move, callback) {
        httpRequest(LAMBDA_URL + "?operation=submitmove&gameid=" + gameid + "&turn=" + turn + "&player=" + player + "&move=" + JSON.stringify(move), function (responseJson, error) {
            callback(error);
        });
    }
    API.submitmove = submitmove;
    function undomove(gameid, turn, player, callback) {
        httpRequest(LAMBDA_URL + "?operation=undomove&gameid=" + gameid + "&turn=" + turn + "&player=" + player, function (responseJson, error) {
            callback(error);
        });
    }
    API.undomove = undomove;
    function updategame(gameid, callback) {
        httpRequest(LAMBDA_URL + "?operation=updategame&gameid=" + gameid, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson['result'] === "SUCCESS", undefined);
            }
        });
    }
    API.updategame = updategame;
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
    ArtCommon.ageBacksHtml = {
        1: '#B44C20',
        2: '#F9FDFE',
        3: '#DE8C60',
    };
    ArtCommon.discardPileColor = 0x888888;
    function domElementForArt(art, scale) {
        if (scale === void 0) { scale = 1; }
        art.scale.set(art.scale.x * scale, art.scale.y * scale);
        var bounds = art.getBounds();
        art.position.set(art.x - bounds.left, art.y - bounds.top);
        return render(art, bounds.width, bounds.height);
    }
    ArtCommon.domElementForArt = domElementForArt;
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
            else if (effect.type === 'marketplace') {
                return marketplace();
            }
            else if (effect.type === 'gold_for_cards') {
                return goldForCards(effect.color);
            }
            else if (effect.type === 'gold_and_points_for_cards') {
                return goldAndPointsForCards(effect.color);
            }
            else if (effect.type === 'gold_and_points_for_stages') {
                return goldAndPointsForStages();
            }
            else if (effect.type === 'points_for_cards') {
                return pointsForCards(effect.color);
            }
            else if (effect.type === 'points_for_stages') {
                return pointsForStages();
            }
            else if (effect.type === 'points_for_finished_wonder') {
                return pointsForFinishedWonder();
            }
            else if (effect.type === 'points_for_self_cards') {
                return pointsForSelfCards(effect.color);
            }
            else if (effect.type === 'multi_science') {
                return multiScience(effect.symbols.split('/'));
            }
            else if (effect.type === 'play_last_card') {
                return playLastCard();
            }
            else if (effect.type === 'build_from_discard') {
                return buildFromDiscard();
            }
            else if (effect.type === 'build_free_first_color') {
                return buildFreeFirstColor();
            }
            else if (effect.type === 'build_free_first_card') {
                return buildFreeFirstCard();
            }
            else if (effect.type === 'build_free_last_card') {
                return buildFreeLastCard();
            }
            console.error('Effect type not found:', effect.type);
            return effectNotFound();
        });
        return combineEffectArt(effectArts, 8);
    }
    ArtCommon.getArtForEffects = getArtForEffects;
    function getArtForCost(cost) {
        var e_4, _a;
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
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        return combineCostArt(costArts, 16);
    }
    ArtCommon.getArtForCost = getArtForCost;
    function getArtForStageCost(cost) {
        var e_5, _a;
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
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
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
        var e_6, _a;
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
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (resourceArts_1_1 && !resourceArts_1_1.done && (_a = resourceArts_1.return)) _a.call(resourceArts_1);
            }
            finally { if (e_6) throw e_6.error; }
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
    function multiScience(symbols) {
        var e_7, _a;
        var symbolArts = symbols.map(function (s) { return science(s); });
        for (var i = symbolArts.length - 1; i >= 1; i--) {
            symbolArts.splice(i, 0, slash());
        }
        try {
            for (var symbolArts_1 = __values(symbolArts), symbolArts_1_1 = symbolArts_1.next(); !symbolArts_1_1.done; symbolArts_1_1 = symbolArts_1.next()) {
                var art = symbolArts_1_1.value;
                art.scale.set(0.8);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (symbolArts_1_1 && !symbolArts_1_1.done && (_a = symbolArts_1.return)) _a.call(symbolArts_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return combineEffectArt(symbolArts, 4);
    }
    ArtCommon.multiScience = multiScience;
    function victoryPoints(points) {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFFFFFF));
        container.addChild(Shapes.centeredText(0, 0, "" + points, 0.7, 0x000000));
        return container;
    }
    ArtCommon.victoryPoints = victoryPoints;
    function gold(gold) {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFBE317));
        container.addChild(Shapes.centeredText(0, 0, "" + gold, 0.7, 0x000000));
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
    function marketplace() {
        var container = new PIXI.Container();
        var glassArt = glass();
        glassArt.scale.set(0.5);
        var loomArt = loom();
        loomArt.scale.set(0.5);
        var pressArt = press();
        pressArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-90, -30, 180, 60, 30, cardBannerForColor('grey')));
        var resources = combineEffectArt([glassArt, loomArt, pressArt], 8);
        container.addChild(resources);
        var arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(120, 0);
        container.addChild(arrowR);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-120, 0);
        container.addChild(arrowL);
        return container;
    }
    ArtCommon.marketplace = marketplace;
    function goldForCards(color) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-20, -48, 40, 60, 4, ArtCommon.cardBannerForColor(color)));
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 0);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 0);
        container.addChild(arrowR);
        var arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 40);
        container.addChild(arrowD);
        return container;
    }
    ArtCommon.goldForCards = goldForCards;
    function goldAndPointsForCards(color) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-25, -40, 50, 80, 8, 0xFFFFFF));
        container.addChild(Shapes.filledRoundedRect(-21, -36, 42, 72, 4, ArtCommon.cardBannerForColor(color)));
        return container;
    }
    ArtCommon.goldAndPointsForCards = goldAndPointsForCards;
    function goldAndPointsForStages() {
        var container = new PIXI.Container();
        container.addChild(pyramidStages());
        return container;
    }
    ArtCommon.goldAndPointsForStages = goldAndPointsForStages;
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
    function pointsForStages() {
        var container = new PIXI.Container();
        var pyramid = pyramidStages();
        pyramid.position.set(0, -20);
        pyramid.scale.set(0.7);
        container.addChild(pyramid);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 0);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 0);
        container.addChild(arrowR);
        var arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 40);
        container.addChild(arrowD);
        return container;
    }
    ArtCommon.pointsForStages = pointsForStages;
    function pointsForFinishedWonder() {
        var container = new PIXI.Container();
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00, 1);
        graphics.drawPolygon([-50, 45, 50, 45, 0, -45]);
        graphics.endFill();
        container.addChild(graphics);
        return container;
    }
    ArtCommon.pointsForFinishedWonder = pointsForFinishedWonder;
    function pointsForSelfCards(color) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-25, -40, 50, 80, 8, 0xFFFFFF));
        container.addChild(Shapes.filledRoundedRect(-21, -36, 42, 72, 4, ArtCommon.cardBannerForColor(color)));
        return container;
    }
    ArtCommon.pointsForSelfCards = pointsForSelfCards;
    function playLastCard() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-65, -50, 60, 100, 8, ArtCommon.cardBannerForColor("grey")));
        container.addChild(Shapes.filledRoundedRect(15, -50, 60, 100, 8, ArtCommon.cardBannerForColor("grey")));
        var check = checkMark();
        check.position.set(50, 0);
        container.addChild(check);
        return container;
    }
    ArtCommon.playLastCard = playLastCard;
    function buildFromDiscard() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-40, -50, 70, 100, 8, 0x888888)).angle = -20;
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, ArtCommon.cardBannerForColor("grey")));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFromDiscard = buildFromDiscard;
    function buildFreeFirstColor() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, ArtCommon.cardBannerForColor("grey")));
        var colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple'];
        for (var i = 0; i < colors.length; i++) {
            container.addChild(Shapes.filledRect(-35 + 10 * i, -50, 10, 100, ArtCommon.cardBannerForColor(colors[i])));
        }
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeFirstColor = buildFreeFirstColor;
    function buildFreeFirstCard() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, ArtCommon.cardBannerForColor("grey")));
        container.addChild(Shapes.centeredText(0, 10, '\u03B1', 0.35, 0x000000));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeFirstCard = buildFreeFirstCard;
    function buildFreeLastCard() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, ArtCommon.cardBannerForColor("grey")));
        container.addChild(Shapes.centeredText(0, 16, '\u03A9', 0.56, 0x000000));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeLastCard = buildFreeLastCard;
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
    function pyramidStages() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00, 1);
        graphics.drawPolygon([0, -48, -16, -20, 16, -20]);
        graphics.drawPolygon([-16, -12, 16, -12, 32, 12, -32, 12]);
        graphics.drawPolygon([-32, 20, 32, 20, 48, 48, -48, 48]);
        graphics.endFill();
        return graphics;
    }
    ArtCommon.pyramidStages = pyramidStages;
    function goldCoin() {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFBE317));
        return container;
    }
    ArtCommon.goldCoin = goldCoin;
    function pointsWreath() {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xFFFFFF));
        return container;
    }
    ArtCommon.pointsWreath = pointsWreath;
    function militaryToken(amount) {
        var container = new PIXI.Container();
        container.addChild(debugEffect(0xD51939));
        container.addChild(Shapes.centeredText(0, 0, "" + amount, 0.7, 0xFFFFFF));
        return container;
    }
    ArtCommon.militaryToken = militaryToken;
    function payment(amount) {
        if (!isFinite(amount)) {
            return ArtCommon.X(0xFF0000);
        }
        if (amount === 0) {
            return ArtCommon.checkMark();
        }
        var cost = new PIXI.Container();
        cost.addChild(Shapes.filledCircle(0, 0, 50, 0xFBE317));
        var goldText = Shapes.centeredText(-70, 0, "" + amount, 1, 0xFBE317);
        goldText.anchor.set(1, 0.5);
        cost.addChild(goldText);
        return cost;
    }
    ArtCommon.payment = payment;
    function checkMark() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x00FF00, 1);
        graphics.drawPolygon([-50, 0, -15, 50, 50, -50, -15, 20]);
        graphics.endFill();
        return graphics;
    }
    ArtCommon.checkMark = checkMark;
    function X(color) {
        var width = 100;
        var thickness = 20;
        var container = new PIXI.Container();
        var barHeight = width * Math.SQRT2;
        var rect1 = Shapes.filledRoundedRect(-thickness / 2, -barHeight / 2, thickness, barHeight, thickness / 4, color);
        rect1.angle = 45;
        var rect2 = Shapes.filledRoundedRect(-thickness / 2, -barHeight / 2, thickness, barHeight, thickness / 4, color);
        rect2.angle = -45;
        container.addChild(rect1);
        container.addChild(rect2);
        return container;
    }
    ArtCommon.X = X;
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
    function arrowDown() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([-50, -45, 50, -45, 0, 45]);
        graphics.endFill();
        return graphics;
    }
    function combineEffectArt(arts, padding) {
        var e_8, _a;
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
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (arts_1_1 && !arts_1_1.done && (_a = arts_1.return)) _a.call(arts_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return container;
    }
    function combineCostArt(arts, padding) {
        var e_9, _a;
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
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (arts_2_1 && !arts_2_1.done && (_a = arts_2.return)) _a.call(arts_2);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return container;
    }
    function combineStageCostArt(arts, padding) {
        var e_10, _a;
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
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (arts_3_1 && !arts_3_1.done && (_a = arts_3.return)) _a.call(arts_3);
            }
            finally { if (e_10) throw e_10.error; }
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
var Bot;
(function (Bot) {
    function getMove(validMoves) {
        var wonderMoves = validMoves.filter(function (move) { return move.action === 'wonder'; });
        var playMoves = validMoves.filter(function (move) { return move.action === 'play'; });
        var throwMoves = validMoves.filter(function (move) { return move.action === 'throw'; });
        if (wonderMoves.length > 0) {
            return randElement(wonderMoves);
        }
        if (playMoves.length > 0) {
            return randElement(playMoves);
        }
        if (throwMoves.length > 0) {
            return randElement(throwMoves);
        }
        return randElement(validMoves);
    }
    Bot.getMove = getMove;
})(Bot || (Bot = {}));
/// <reference path="gameElement.ts" />
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(cardId, card, handPosition, activeWonder) {
        var _this = _super.call(this) || this;
        _this.CARD_WIDTH = 133;
        _this.CARD_HEIGHT = 200;
        _this.CARD_CORNER_RADIUS = 12;
        _this.CARD_BORDER = 4;
        _this.TITLE_HEIGHT = 12;
        _this.TITLE_Y = 5;
        _this.TITLE_SCALE = 0.12;
        _this.TITLE_COLOR = 0xFFFFFF;
        _this.BANNER_HEIGHT = 56;
        _this.EFFECT_SCALE = 0.32;
        _this.EFFECT_CLIP_PADDING = 6;
        _this.EFFECT_HEIGHT = 32;
        _this.COST_X = 16.5;
        _this.COST_Y = _this.TITLE_HEIGHT + _this.BANNER_HEIGHT;
        _this.COST_SCALE = 0.174;
        _this.COST_PADDING = 8;
        _this.PAYMENT_HEIGHT = 32;
        _this.PAYMENT_SCALE = 0.2;
        _this.PAYMENT_OFFSET_X = -11;
        _this.DISCARD_COUNT_TEXT_SIZE = 48;
        _this.apiCardId = cardId;
        _this.apiCard = card;
        _this.handPosition = handPosition;
        _this.activeWonder = activeWonder;
        _this.visualState = 'full';
        _this.state = { type: 'in_hand', visualState: 'full' };
        _this.configureValidMoves(Main.gamestate.validMoves);
        _this.frontDiv = _this.div.appendChild(document.createElement('div'));
        var front = _this.frontDiv.appendChild(_this.drawFront());
        front.style.transform = "translate(-50%, -" + (_this.PAYMENT_HEIGHT + _this.TITLE_HEIGHT + _this.BANNER_HEIGHT / 2) + "px)";
        _this.backDiv = _this.div.appendChild(document.createElement('div'));
        var back = _this.backDiv.appendChild(_this.drawBack());
        back.style.transform = "translate(-50%, -" + (_this.TITLE_HEIGHT + _this.BANNER_HEIGHT / 2) + "px)";
        var highlightDiv = _this.div.appendChild(document.createElement('div'));
        _this.highlight = highlightDiv.appendChild(_this.drawHighlight());
        _this.flippedT = 0;
        _this.effectT = 0;
        _this.interactable = false;
        // Dragging
        _this.frontDiv.onmousedown = function (event) {
            if (!_this.interactable)
                return;
            _this.dragging = {
                offsetx: _this.x - Main.scene.mouseX,
                offsety: _this.y - Main.scene.mouseY
            };
        };
        return _this;
    }
    Object.defineProperty(Card.prototype, "width", {
        get: function () { return this._width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "height", {
        get: function () { return this._height; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "effectWidth", {
        get: function () { return this.effectClipRect.width; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "flippedT", {
        get: function () { return this._flippedT; },
        set: function (value) {
            this._flippedT = value;
            if (this._flippedT <= 0.5) {
                this.frontDiv.style.transform = "scaleX(" + (1 - 2 * this._flippedT) + ")";
                this.backDiv.style.transform = "scaleX(0)";
            }
            else {
                this.frontDiv.style.transform = "scaleX(0)";
                this.backDiv.style.transform = "scaleX(" + (2 * this._flippedT - 1) + ")";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "effectT", {
        get: function () { return this._effectT; },
        set: function (value) {
            this._effectT = value;
            var left = lerp(this.fullClipRect.left, this.effectClipRect.left, this._effectT) - this.CARD_WIDTH / 2;
            var right = lerp(this.fullClipRect.right, this.effectClipRect.right, this._effectT) - this.CARD_WIDTH / 2;
            var top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - this.TITLE_HEIGHT - this.BANNER_HEIGHT / 2;
            var bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - this.TITLE_HEIGHT - this.BANNER_HEIGHT / 2;
            this.frontDiv.style.clipPath = "polygon(" + left + "px " + top + "px, " + right + "px " + top + "px, " + right + "px " + bottom + "px, " + left + "px " + bottom + "px)";
            this._width = right - left;
            this._height = bottom - top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "interactable", {
        get: function () { return this._interactable; },
        set: function (value) {
            this._interactable = value;
            this.div.style.cursor = this._interactable ? 'pointer' : 'default';
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.update = function () {
        var _a, _b;
        if (this.dragging) {
            var stage = this.activeWonder.getClosestStageId(Main.scene.mouseX);
            if (!Main.mouseDown) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    var move = { action: 'play', card: this.apiCardId };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(this, move);
                    }
                    else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                }
                else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    var move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(this, move);
                    }
                    else {
                        move.payment = { bank: (_b = (_a = Main.gamestate.wonders[Main.player].stages[stage]) === null || _a === void 0 ? void 0 : _a.cost) === null || _b === void 0 ? void 0 : _b.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                }
                else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    var move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    this.select(move);
                }
                else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.dragging = null;
            }
            else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_play' };
                }
                else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_wonder' };
                }
                else if (this.allowThrow && Main.scene.discardPile.getDiscardRegion().contains(Main.scene.mouseX, Main.scene.mouseY)) {
                    this.state = { type: 'dragging_throw' };
                }
                else {
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
        }
        else if (this.state.type === 'dragging_normal') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'full';
        }
        else if (this.state.type === 'dragging_play') {
            this.x = Main.scene.mouseX;
            this.y = Main.scene.mouseY;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'effect';
        }
        else if (this.state.type === 'dragging_wonder') {
            var stage = this.activeWonder.getClosestStageId(Main.scene.mouseX);
            var stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = ZIndices.CARD_WONDER;
            this.interactable = this.canBeInteractable();
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'dragging_throw') {
            this.x = Main.scene.mouseX + this.dragging.offsetx;
            this.y = Main.scene.mouseY + this.dragging.offsety;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_play') {
            var effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.x = effectPoint.x;
            this.y = effectPoint.y;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'effect';
        }
        else if (this.state.type === 'locked_wonder') {
            var stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.zIndex = ZIndices.CARD_WONDER;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_throw') {
            var discardPoint = Main.scene.discardPile.getDiscardLockPoint();
            this.x = discardPoint.x;
            this.y = discardPoint.y;
            this.zIndex = ZIndices.CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'permanent_effect') {
            this.interactable = false;
            this.visualState = 'effect';
            this.effectT = 1;
        }
        else if (this.state.type === 'permanent_flipped') {
            this.interactable = false;
            this.visualState = 'flipped';
            this.flippedT = 1;
        }
        this.updateVisuals();
    };
    Card.prototype.updateVisuals = function () {
        if (this.visualState === 'effect') {
            this.effectT = 1;
        }
        else {
            this.effectT = 0;
        }
        if (this.visualState === 'flipped') {
            this.flippedT = 1;
        }
        else {
            this.flippedT = 0;
        }
        this.highlight.style.width = this._width + "px";
        this.highlight.style.height = lerp(this.height - this.PAYMENT_HEIGHT, this.height, this.effectT) + "px";
        this.highlight.style.transform = "translate(-50%, -" + lerp(this.TITLE_HEIGHT + this.BANNER_HEIGHT / 2, this.EFFECT_HEIGHT / 2 + this.EFFECT_CLIP_PADDING, this.effectT) + "px)";
        var alpha;
        if (this.state.type.startsWith('locked')) {
            alpha = (Math.sin(Main.time * 8) + 1) / 2;
        }
        else if ((this.state.type === 'permanent_effect' || this.state.type === 'permanent_flipped') && this.state.justPlayed) {
            alpha = 1;
        }
        else {
            alpha = 0;
        }
        this.highlight.style.boxShadow = "inset 0px 0px 0px 4px rgba(255, 0, 0, " + alpha + ")";
    };
    Card.prototype.select = function (move) {
        var lastSelectedCard = Main.scene.hand.selectedCard;
        if (lastSelectedCard) {
            lastSelectedCard.deselect();
        }
        if (move.action === 'play') {
            this.state = { type: 'locked_play' };
        }
        else if (move.action === 'wonder') {
            this.state = { type: 'locked_wonder', stage: move.stage };
        }
        else if (move.action === 'throw') {
            this.state = { type: 'locked_throw' };
        }
    };
    Card.prototype.deselect = function () {
        this.state = { type: 'in_hand', visualState: 'full' };
    };
    Card.prototype.configureValidMoves = function (validMoves) {
        var e_11, _a;
        this.allowPlay = false;
        this.allowBuildStages = [];
        this.allowThrow = false;
        this.minPlayCost = Infinity;
        try {
            for (var validMoves_4 = __values(validMoves), validMoves_4_1 = validMoves_4.next(); !validMoves_4_1.done; validMoves_4_1 = validMoves_4.next()) {
                var move = validMoves_4_1.value;
                if (move.card !== this.apiCardId)
                    continue;
                if (move.action === 'play') {
                    this.allowPlay = true;
                    var cost = API.totalPaymentAmount(move.payment);
                    if (cost < this.minPlayCost)
                        this.minPlayCost = cost;
                }
                else if (move.action === 'wonder') {
                    if (!contains(this.allowBuildStages, move.stage))
                        this.allowBuildStages.push(move.stage);
                }
                else if (move.action === 'throw') {
                    this.allowThrow = true;
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (validMoves_4_1 && !validMoves_4_1.done && (_a = validMoves_4.return)) _a.call(validMoves_4);
            }
            finally { if (e_11) throw e_11.error; }
        }
    };
    Card.prototype.canBeInteractable = function () {
        if (Main.scene && Main.scene.isPaymentMenuActive)
            return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow)
            return false;
        return true;
    };
    Card.prototype.addDiscardCountText = function () {
        var discardCountDiv = this.div.appendChild(document.createElement('div'));
        discardCountDiv.style.position = 'absolute';
        discardCountDiv.style.left = '0%';
        discardCountDiv.style.top = this.CARD_HEIGHT / 2 - this.TITLE_HEIGHT - this.BANNER_HEIGHT / 2 + "px";
        var discardCount = discardCountDiv.appendChild(document.createElement('p'));
        discardCount.textContent = "" + Main.gamestate.discardedCardCount;
        discardCount.style.fontFamily = "'Courier New', Courier, monospace";
        discardCount.style.fontSize = this.DISCARD_COUNT_TEXT_SIZE + "px";
        discardCount.style.color = ArtCommon.ageBacksHtml[Main.gamestate.lastDiscardedCardAge];
        discardCount.style.position = 'absolute';
        discardCount.style.transform = 'translate(-50%, -50%)';
    };
    Card.prototype.drawFront = function () {
        var front = new PIXI.Container();
        var cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(this.apiCard.color));
        front.addChild(cardBase);
        var cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER, this.CARD_WIDTH - 2 * this.CARD_BORDER, this.CARD_HEIGHT - 2 * this.CARD_BORDER, this.CARD_CORNER_RADIUS - this.CARD_BORDER, ArtCommon.cardBg);
        front.addChild(cardBg);
        var cardMask = cardBase.clone();
        front.addChild(cardMask);
        var costContainer = ArtCommon.getArtForCost(this.apiCard.cost);
        if (costContainer) {
            costContainer.scale.set(this.COST_SCALE);
            costContainer.position.set(this.COST_X, this.COST_Y);
            var costBanner = Shapes.filledRoundedRect(-costContainer.width / 2 - this.COST_PADDING, -this.COST_PADDING, costContainer.width + 2 * this.COST_PADDING, costContainer.height + 2 * this.COST_PADDING, this.COST_PADDING, ArtCommon.cardBannerForColor(this.apiCard.color));
            costBanner.position.set(this.COST_X, this.COST_Y);
            costBanner.mask = cardMask;
            front.addChild(costBanner);
            front.addChild(costContainer);
        }
        var cardBanner = Shapes.filledRect(0, 0, this.CARD_WIDTH, this.TITLE_HEIGHT + this.BANNER_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color));
        cardBanner.mask = cardMask;
        front.addChild(cardBanner);
        var effectContainer = ArtCommon.getArtForEffects(this.apiCard.effects);
        effectContainer.position.set(this.CARD_WIDTH / 2, this.TITLE_HEIGHT + this.BANNER_HEIGHT / 2);
        effectContainer.scale.set(this.EFFECT_SCALE);
        front.addChild(effectContainer);
        this.fullClipRect = new PIXI.Rectangle(0, -this.PAYMENT_HEIGHT, this.CARD_WIDTH, this.PAYMENT_HEIGHT + this.CARD_HEIGHT);
        var effectBounds = effectContainer.getBounds();
        var effectHalfWidth = Math.max(this.CARD_WIDTH / 2 - effectBounds.left, effectBounds.right - this.CARD_WIDTH / 2);
        this.effectClipRect = new PIXI.Rectangle(this.CARD_WIDTH / 2 - effectHalfWidth - this.EFFECT_CLIP_PADDING, this.TITLE_HEIGHT + this.BANNER_HEIGHT / 2 - this.EFFECT_HEIGHT / 2 - this.EFFECT_CLIP_PADDING, 2 * effectHalfWidth + 2 * this.EFFECT_CLIP_PADDING, this.EFFECT_HEIGHT + 2 * this.EFFECT_CLIP_PADDING);
        var title = Shapes.centeredText(this.CARD_WIDTH / 2, this.TITLE_Y, this.apiCard.name, this.TITLE_SCALE, this.TITLE_COLOR);
        title.anchor.y = 0;
        front.addChild(title);
        var payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        payment.scale.set(this.PAYMENT_SCALE);
        payment.position.set(this.CARD_WIDTH + this.PAYMENT_OFFSET_X, -this.PAYMENT_HEIGHT / 2);
        front.addChild(payment);
        front.position.set(0, this.PAYMENT_HEIGHT);
        return render(front, this.CARD_WIDTH, this.PAYMENT_HEIGHT + this.CARD_HEIGHT);
    };
    Card.prototype.drawBack = function () {
        var back = new PIXI.Container();
        var cardBase = Shapes.filledRoundedRect(0, 0, this.CARD_WIDTH, this.CARD_HEIGHT, this.CARD_CORNER_RADIUS, ArtCommon.ageBacks[this.apiCard.age]);
        back.addChild(cardBase);
        var cardBg = Shapes.filledRoundedRect(this.CARD_BORDER, this.CARD_BORDER, this.CARD_WIDTH - 2 * this.CARD_BORDER, this.CARD_HEIGHT - 2 * this.CARD_BORDER, this.CARD_CORNER_RADIUS - this.CARD_BORDER, ArtCommon.cardBg);
        back.addChild(cardBg);
        return render(back, this.CARD_WIDTH, this.CARD_HEIGHT);
    };
    Card.prototype.drawHighlight = function () {
        var highlight = document.createElement('div');
        highlight.style.pointerEvents = 'none';
        return highlight;
    };
    Card.flippedCardForAge = function (age, justPlayed) {
        var card = new Card(-1, { age: age, name: '', color: 'brown', effects: [] }, undefined, undefined);
        card.state = { type: 'permanent_flipped', justPlayed: justPlayed };
        card.update();
        return card;
    };
    return Card;
}(GameElement));
var DiscardPile = /** @class */ (function (_super) {
    __extends(DiscardPile, _super);
    function DiscardPile() {
        var _this = _super.call(this) || this;
        _this.AREA_WIDTH = 250;
        _this.AREA_HEIGHT = 300;
        _this.AREA_CORNER_RADIUS = 10;
        _this.AREA_BORDER = 4;
        _this.TITLE_Y = 25;
        _this.TITLE_SCALE = 0.25;
        _this.TITLE_TEXT = "Discard";
        _this.LOCK_OFFSET_Y = -60;
        _this.div.appendChild(_this.draw());
        _this.zIndex = ZIndices.DISCARD_PILE;
        return _this;
    }
    DiscardPile.prototype.getDiscardRegion = function () {
        return new PIXI.Rectangle(this.x - this.AREA_WIDTH / 2, this.y - this.AREA_HEIGHT / 2, this.AREA_WIDTH, this.AREA_HEIGHT);
    };
    DiscardPile.prototype.getDiscardLockPoint = function () {
        return new PIXI.Point(this.x, this.y + this.LOCK_OFFSET_Y);
    };
    DiscardPile.prototype.draw = function () {
        var discardPile = new PIXI.Container();
        discardPile.addChild(Shapes.filledRoundedRect(0, 0, this.AREA_WIDTH, this.AREA_HEIGHT, this.AREA_CORNER_RADIUS, ArtCommon.discardPileColor));
        discardPile.addChild(Shapes.filledRoundedRect(this.AREA_BORDER, this.AREA_BORDER, this.AREA_WIDTH - 2 * this.AREA_BORDER, this.AREA_HEIGHT - 2 * this.AREA_BORDER, this.AREA_CORNER_RADIUS - this.AREA_BORDER, 0x000000));
        discardPile.addChild(Shapes.centeredText(this.AREA_WIDTH / 2, this.TITLE_Y, this.TITLE_TEXT, this.TITLE_SCALE, ArtCommon.discardPileColor));
        return render(discardPile, this.AREA_WIDTH, this.AREA_HEIGHT);
    };
    return DiscardPile;
}(GameElement));
var EndScreen = /** @class */ (function () {
    function EndScreen() {
        this.POSITIONS_Y = 50;
        this.NAMES_Y = 80;
        this.POINTS_Y = 130;
        this.POINTS_DX = 100;
        this.POINTS_DY = 50;
    }
    EndScreen.prototype.create = function () {
        var players = Main.gamestate.players;
        players.sort(function (p1, p2) { return Main.gamestate.playerData[p2].pointsDistribution.total - Main.gamestate.playerData[p1].pointsDistribution.total; });
        var pointsDistributions = players.map(function (player) { return Main.gamestate.playerData[player].pointsDistribution; });
        var endscreen = document.getElementById('endscreen');
        var x = (-1 - (players.length - 1) / 2) * this.POINTS_DX;
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('red')), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 0 + "px"));
        endscreen.appendChild(this.scoreArt(Shapes.filledCircle(0, 0, 16, 0xFBE317), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 1 + "px"));
        endscreen.appendChild(this.scoreArt(Shapes.filledPolygon(0, 0, [-18, 16, 18, 16, 0, -16], 0xFFFF00), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 2 + "px"));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('green')), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 3 + "px"));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('yellow')), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 4 + "px"));
        endscreen.appendChild(this.scoreArt(Shapes.filledRect(0, 0, 32, 32, ArtCommon.cardBannerForColor('purple')), "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 5 + "px"));
        endscreen.appendChild(this.scoreText('Total', "calc(50% + " + x + "px)", this.POINTS_Y + this.POINTS_DY * 6 + "px"));
        for (var i = 0; i < players.length; i++) {
            var x_1 = (i - (players.length - 1) / 2) * this.POINTS_DX;
            endscreen.appendChild(this.scoreText("#" + (i + 1), "calc(50% + " + x_1 + "px)", this.POSITIONS_Y + "px"));
            endscreen.appendChild(this.scoreText(players[i], "calc(50% + " + x_1 + "px)", this.NAMES_Y + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].conflict, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 0 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].finance, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 1 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].wonder, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 2 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].science, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 3 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].commerce, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 4 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].guild, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 5 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].total, "calc(50% + " + x_1 + "px)", this.POINTS_Y + this.POINTS_DY * 6 + "px"));
        }
    };
    EndScreen.prototype.destroy = function () {
        var game = document.getElementById('game');
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        }
    };
    EndScreen.prototype.scoreArt = function (pixiArt, xs, ys) {
        var art = ArtCommon.domElementForArt(pixiArt);
        art.style.position = 'absolute';
        art.style.left = xs;
        art.style.top = ys;
        return art;
    };
    EndScreen.prototype.scoreText = function (text, xs, ys) {
        var p = document.createElement('p');
        p.textContent = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = '24px';
        p.style.color = "#FFFFFF";
        p.style.transform = 'translate(-50%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    };
    return EndScreen;
}());
var GameStateDiffer;
(function (GameStateDiffer) {
    function diffNonTurn(gamestate, midturn) {
        var e_12, _a;
        var result = {
            scripts: []
        };
        try {
            for (var _b = __values(Main.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                diffPoints(gamestate, player, result);
                diffGold(gamestate, player, result);
                if (midturn)
                    diffCurrentMove(gamestate, player, result);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        return result;
    }
    GameStateDiffer.diffNonTurn = diffNonTurn;
    function diffTurn(gamestate) {
        var result = diffNonTurn(gamestate, false);
        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return;
        }
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
        // result.scripts.push(function*() {
        //     Main.scene.hand.flip();
        //     yield* S.wait(0.1)();
        //     Main.scene.hand.collapse();
        //     yield* S.wait(0.5)();
        //     Main.scene.hand.uncollapse();
        //     yield* S.wait(0.5)();
        // });
        return result;
    }
    GameStateDiffer.diffTurn = diffTurn;
    function diffPoints(gamestate, player, result) {
        var oldPoints = Main.gamestate.playerData[player].pointsDistribution.total;
        var newPoints = gamestate.playerData[player].pointsDistribution.total;
        var playeri = Main.gamestate.players.indexOf(player);
        if (newPoints === oldPoints)
            return;
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //let pointsText = Main.scene.wonders[playeri].pointsText;
                    //pointsText.style.fill = 0xFF0000;
                    return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                            //    pointsText.text = `${Math.round(lerp(oldPoints, newPoints, t))}`;
                        })())];
                    case 1:
                        //let pointsText = Main.scene.wonders[playeri].pointsText;
                        //pointsText.style.fill = 0xFF0000;
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function diffGold(gamestate, player, result) {
        var oldGold = Main.gamestate.playerData[player].gold;
        var newGold = gamestate.playerData[player].gold;
        var playeri = Main.gamestate.players.indexOf(player);
        if (newGold === oldGold)
            return;
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //let goldText = Main.scene.wonders[playeri].goldText;
                    //goldText.style.fill = 0xFF0000;
                    return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                            //    goldText.text = `${Math.round(lerp(oldGold, newGold, t))}`;
                        })())];
                    case 1:
                        //let goldText = Main.scene.wonders[playeri].goldText;
                        //goldText.style.fill = 0xFF0000;
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function diffCurrentMove(gamestate, player, result) {
        var oldMove = Main.gamestate.playerData[player].currentMove;
        var newMove = gamestate.playerData[player].currentMove;
        var playeri = Main.gamestate.players.indexOf(player);
        // Always reflect current move.
        if (player === Main.player) {
            result.scripts.push(function () {
                return __generator(this, function (_a) {
                    if (!Main.scene.isPaymentMenuActive) {
                        Main.scene.hand.reflectMove(newMove);
                    }
                    return [2 /*return*/];
                });
            });
            return;
        }
        if (API.eqMove(newMove, oldMove))
            return;
        result.scripts.push(function () {
            var wonder;
            return __generator(this, function (_a) {
                wonder = Main.scene.wonders[playeri];
                if (!oldMove && newMove) {
                    wonder.makeMove();
                }
                else {
                    wonder.undoMove();
                }
                return [2 /*return*/];
            });
        });
    }
})(GameStateDiffer || (GameStateDiffer = {}));
var Hand = /** @class */ (function () {
    function Hand(cardIds, activeWonder) {
        this.HAND_Y = 150;
        this.CARD_DX = 137;
        this.cardIds = cardIds;
        this.activeWonder = activeWonder;
        this.create();
    }
    Object.defineProperty(Hand.prototype, "selectedCard", {
        get: function () {
            var e_13, _a;
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.state.type.startsWith('locked')) {
                        return card;
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_13) throw e_13.error; }
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Hand.prototype.update = function () {
        var e_14, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.update();
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_14) throw e_14.error; }
        }
    };
    Hand.prototype.create = function () {
        this.handPositions = [];
        this.cards = [];
        for (var i = 0; i < this.cardIds.length; i++) {
            var handPosition = document.createElement('div');
            handPosition.style.left = "calc(50% + " + (i - (this.cardIds.length - 1) / 2) * this.CARD_DX + "px)";
            handPosition.style.top = this.HAND_Y + "px";
            var card = new Card(this.cardIds[i], Main.gamestate.cards[this.cardIds[i]], handPosition, this.activeWonder);
            card.xs = handPosition.style.left;
            card.ys = handPosition.style.top;
            card.addToGame();
            this.cards.push(card);
            card.state = { type: 'in_hand', visualState: 'full' };
        }
    };
    Hand.prototype.reflectMove = function (move) {
        var e_15, _a, e_16, _b;
        if (!move || move.action === 'reject') {
            try {
                for (var _c = __values(this.cards), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var card = _d.value;
                    card.deselect();
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_15) throw e_15.error; }
            }
            return;
        }
        var moved = false;
        try {
            for (var _e = __values(this.cards), _f = _e.next(); !_f.done; _f = _e.next()) {
                var card = _f.value;
                if (card.apiCardId === move.card) {
                    card.select(move);
                    moved = true;
                }
                else {
                    card.deselect();
                }
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_16) throw e_16.error; }
        }
        if (!moved)
            console.error('Move card not found in hand:', move);
    };
    return Hand;
}());
var HtmlUtils;
(function (HtmlUtils) {
    function cssStylePositionToPixels(xy, parent_wh) {
        if (xy.endsWith('px')) {
            return parseFloat(xy.substring(0, xy.length - 2).trim());
        }
        if (xy.endsWith('%')) {
            return parseFloat(xy.substring(0, xy.length - 1).trim()) / 100 * parent_wh;
        }
        if (xy.startsWith('calc')) {
            var inner = xy.substring(5, xy.length - 1).trim();
            var innerPlus = inner.split('+');
            if (innerPlus.length === 2) {
                return cssStylePositionToPixels(innerPlus[0].trim(), parent_wh) + cssStylePositionToPixels(innerPlus[1].trim(), parent_wh);
            }
            var innerMinus = inner.split('-');
            if (innerMinus.length === 2) {
                return cssStylePositionToPixels(innerMinus[0].trim(), parent_wh) - cssStylePositionToPixels(innerMinus[1].trim(), parent_wh);
            }
        }
        return undefined;
    }
    HtmlUtils.cssStylePositionToPixels = cssStylePositionToPixels;
})(HtmlUtils || (HtmlUtils = {}));
var Main = /** @class */ (function () {
    function Main() {
    }
    Object.defineProperty(Main, "initialized", {
        get: function () { return !!this.scene; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main, "isHost", {
        get: function () { return this.gamestate.host === this.player; },
        enumerable: false,
        configurable: true
    });
    Main.start = function () {
        var _this = this;
        window.addEventListener('mousedown', function () { return _this.mouseDown = true; });
        window.addEventListener('mouseup', function () { return _this.mouseDown = false; });
        this.mouseDown = false;
        this.scriptManager = new ScriptManager();
        var params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        this.player = params.get('player');
        PIXI.Ticker.shared.add(function (delta) {
            _this.delta = delta / 60;
            _this.time += _this.delta;
            _this.update();
        });
        API.getgamestate(this.gameid, this.player, function (gamestate, error) {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                return;
            }
            console.log('Got game state:', gamestate);
            _this.setupGame(gamestate);
        });
    };
    Main.setupGame = function (gamestate) {
        this.gamestate = gamestate;
        this.scene = new Scene();
        this.scene.create();
        this.sendUpdate();
    };
    Main.createEndScreen = function () {
        this.endScreen = new EndScreen();
        this.endScreen.create();
        document.getElementById('endscreen').style.display = 'block';
    };
    Main.update = function () {
        if (this.scene)
            this.scene.update();
        this.scriptManager.update();
    };
    Main.sendUpdate = function () {
        var _this = this;
        if (this.gamestate.state === 'GAME_COMPLETE') {
            if (!this.endScreen)
                this.createEndScreen();
            return;
        }
        this.scriptManager.runScript(S.chain(S.wait(0.5), S.call(function () {
            if (_this.isHost)
                _this.updateAndGetGameState();
            else
                _this.getGameState();
            _this.updateBotMoves();
        })));
    };
    Main.getGameState = function () {
        var _this = this;
        API.getgamestate(this.gameid, this.player, function (gamestate, error) {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                _this.sendUpdate();
                return;
            }
            if (gamestate.turn < Main.gamestate.turn) {
                Main.error("Error: local turn (" + Main.gamestate.turn + ") is greater than the game's (" + gamestate.turn + ")?");
                _this.sendUpdate();
                return;
            }
            else if (gamestate.turn === Main.gamestate.turn) {
                var diffResult = GameStateDiffer.diffNonTurn(gamestate, true);
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.gamestate = gamestate;
                    _this.sendUpdate();
                })));
            }
            else {
                var diffResult = GameStateDiffer.diffTurn(gamestate);
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.gamestate = gamestate;
                    _this.scene.destroy();
                    _this.scene.create();
                    _this.sendUpdate();
                })));
            }
        });
    };
    Main.updateAndGetGameState = function () {
        var _this = this;
        API.updategame(Main.gameid, function (wasUpdate, error) {
            if (error) {
                Main.error(error);
            }
            else {
                if (wasUpdate)
                    console.log('Updated game');
            }
            _this.getGameState();
        });
    };
    Main.submitMove = function (move) {
        API.submitmove(Main.gameid, Main.gamestate.turn, Main.player, move, function (error) {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Submitted move:', move);
        });
    };
    Main.undoMove = function () {
        API.undomove(this.gameid, this.gamestate.turn, this.player, function (error) {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Undo move successful');
        });
    };
    Main.updateBotMoves = function () {
        var e_17, _a;
        var _this = this;
        if (!this.isHost)
            return;
        var _loop_1 = function (player) {
            if (player.startsWith('BOT') && !this_1.gamestate.playerData[player].currentMove) {
                var botPlayer_1 = player;
                var turn_1 = this_1.gamestate.turn;
                API.getvalidmoves(this_1.gameid, this_1.gamestate.turn, botPlayer_1, function (validMoves, error) {
                    if (error) {
                        Main.error(error);
                        return;
                    }
                    if (turn_1 !== _this.gamestate.turn || validMoves.length === 0)
                        return;
                    var move = Bot.getMove(validMoves);
                    API.submitmove(_this.gameid, _this.gamestate.turn, botPlayer_1, move, function (error) {
                        if (error) {
                            Main.error(error);
                            return;
                        }
                        console.log('Successfully submitted bot move:', move);
                    });
                });
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                _loop_1(player);
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_17) throw e_17.error; }
        }
    };
    Main.stop = function () {
        this.scriptManager.reset();
    };
    Main.error = function (text) {
        console.error(text);
        this.scriptManager.runScript(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Main.currentError = text;
                        return [5 /*yield**/, __values(S.wait(3)())];
                    case 1:
                        _a.sent();
                        Main.currentError = undefined;
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.getGameY = function () {
        return document.getElementById('status').clientHeight
            + document.getElementById('endscreen').clientHeight;
    };
    Main.mouseDown = false;
    Main.time = 0;
    Main.delta = 0;
    return Main;
}());
var PaymentDialog = /** @class */ (function (_super) {
    __extends(PaymentDialog, _super);
    function PaymentDialog(card, move, activeWonder) {
        var _this = _super.call(this) || this;
        _this.OFFSET_X = -600;
        _this.OFFSET_Y = -100;
        _this.DIALOG_WIDTH = 500;
        _this.DIALOG_EXTRA_HEIGHT = 80;
        _this.DIALOG_CORNER_RADIUS = 10;
        _this.DIALOG_COLOR = '#FFFFFF';
        _this.TITLE = "Payment";
        _this.TITLE_SIZE = 24;
        _this.TITLE_PADDING = 16;
        _this.PAYMENTS_MID_DIV_WIDTH_PERCENT = 20;
        _this.PAYMENTS_DY = 50;
        _this.PAYMENTS_TEXT_SIZE = 16;
        _this.PAY_BUTTON_WIDTH = 48;
        _this.PAY_BUTTON_HEIGHT = 32;
        _this.PAY_BUTTON_COLOR = '#000088';
        _this.card = card;
        _this.move = move;
        _this.activeWonder = activeWonder;
        _this.div.appendChild(_this.draw());
        return _this;
    }
    PaymentDialog.prototype.update = function () {
        this.x = this.activeWonder.x + this.OFFSET_X;
        this.y = this.activeWonder.y + this.OFFSET_Y;
    };
    PaymentDialog.prototype.draw = function () {
        var _this = this;
        var validPayments = API.minimalPaymentOptions(this.move, Main.gamestate.validMoves);
        var dialogDiv = document.createElement('div');
        dialogDiv.style.width = this.DIALOG_WIDTH + "px";
        dialogDiv.style.height = validPayments.length * this.PAYMENTS_DY + this.DIALOG_EXTRA_HEIGHT + "px";
        dialogDiv.style.backgroundColor = this.DIALOG_COLOR;
        dialogDiv.style.borderRadius = this.DIALOG_CORNER_RADIUS + "px";
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = "translate(-50%, -50%)";
        var dialogTitle = dialogDiv.appendChild(this.drawText(this.TITLE, this.TITLE_SIZE));
        dialogTitle.style.padding = this.TITLE_PADDING + "px";
        var _a = __read(API.getNeighbors(Main.gamestate, Main.player), 2), negPlayer = _a[0], posPlayer = _a[1];
        var _loop_2 = function (i) {
            var leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = 50 - this_2.PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            leftDiv.style.height = this_2.PAYMENTS_DY + "px";
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            var middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = this_2.PAYMENTS_MID_DIV_WIDTH_PERCENT + "%";
            middleDiv.style.height = this_2.PAYMENTS_DY + "px";
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            var rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = 50 - this_2.PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            rightDiv.style.height = this_2.PAYMENTS_DY + "px";
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';
            var payment = validPayments[i];
            if (payment.neg) {
                var paymentTextNegP = leftDiv.appendChild(this_2.drawText("<-- " + payment.neg + " to " + negPlayer, this_2.PAYMENTS_TEXT_SIZE));
                paymentTextNegP.style.width = '100%';
                paymentTextNegP.style.textAlign = 'right';
                paymentTextNegP.style.position = 'absolute';
                paymentTextNegP.style.top = '50%';
                paymentTextNegP.style.transform = 'translate(0, -50%)';
            }
            if (payment.pos) {
                var paymentTextPosP = rightDiv.appendChild(this_2.drawText("to " + posPlayer + " " + payment.pos + " -->", this_2.PAYMENTS_TEXT_SIZE));
                paymentTextPosP.style.width = '100%';
                paymentTextPosP.style.textAlign = 'left';
                paymentTextPosP.style.position = 'absolute';
                paymentTextPosP.style.top = '50%';
                paymentTextPosP.style.transform = 'translate(0, -50%)';
            }
            var payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = this_2.PAY_BUTTON_COLOR;
            payButton.style.width = this_2.PAY_BUTTON_WIDTH + "px";
            payButton.style.height = this_2.PAY_BUTTON_HEIGHT + "px";
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.onclick = function (event) {
                var trueMove = {
                    action: _this.move.action,
                    card: _this.move.card,
                    stage: _this.move.stage,
                    payment: validPayments[i]
                };
                Main.submitMove(trueMove);
                _this.removeFromGame(true);
            };
        };
        var this_2 = this;
        for (var i = 0; i < validPayments.length; i++) {
            _loop_2(i);
        }
        var closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = 'calc(100% - 20px)';
        closeButton.style.top = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function (event) {
            _this.removeFromGame();
        };
        return dialogDiv;
    };
    PaymentDialog.prototype.drawText = function (text, fontSize) {
        var p = document.createElement('p');
        p.textContent = text;
        p.style.textAlign = 'center';
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = fontSize + "px";
        return p;
    };
    PaymentDialog.prototype.drawCloseButton = function () {
        var closeButton = new PIXI.Container();
        var X = ArtCommon.X(0x000000);
        X.scale.set(0.2);
        X.position.set(18, 18);
        closeButton.addChild(X);
        return render(closeButton, 36, 36);
    };
    PaymentDialog.prototype.removeFromGame = function (success) {
        if (success === void 0) { success = false; }
        _super.prototype.removeFromGame.call(this);
        Main.scene.paymentDialog = null;
        if (!success) {
            this.card.deselect();
        }
    };
    return PaymentDialog;
}(GameElement));
var PlayedCardEffectRoll = /** @class */ (function () {
    function PlayedCardEffectRoll(offsetx, offsety, reverse) {
        this.cards = [];
        this.x = 0;
        this.y = 0;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.reverse = reverse;
    }
    Object.defineProperty(PlayedCardEffectRoll.prototype, "width", {
        get: function () { return sum(this.cards, function (card) { return card.effectWidth; }); },
        enumerable: false,
        configurable: true
    });
    PlayedCardEffectRoll.prototype.update = function () {
        var d = this.reverse ? -1 : 1;
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].x = (i === 0)
                ? this.x + d * this.cards[i].effectWidth / 2
                : this.cards[i].x = this.cards[i - 1].x + d * (this.cards[i - 1].effectWidth / 2 + this.cards[i].effectWidth / 2);
            this.cards[i].y = this.y;
            this.cards[i].update();
        }
    };
    PlayedCardEffectRoll.prototype.canAddCard = function (card, maxWidth) {
        return this.width + card.effectWidth <= maxWidth;
    };
    PlayedCardEffectRoll.prototype.addCard = function (card) {
        card.zIndex = ZIndices.CARD_PLAYED;
        this.cards.push(card);
        this.update();
    };
    PlayedCardEffectRoll.prototype.getNextPosition = function (card) {
        var d = this.reverse ? -1 : 1;
        return new PIXI.Point(this.x + d * (this.width + card.effectWidth / 2), this.y);
    };
    return PlayedCardEffectRoll;
}());
var renderer = new PIXI.Renderer({ antialias: true, transparent: true });
function render(object, width, height) {
    renderer.view.width = width;
    renderer.view.height = height;
    renderer.render(object);
    return cloneCanvas(renderer.view);
}
var Scene = /** @class */ (function () {
    function Scene() {
        this.WONDER_START_Y = 650;
        this.WONDER_DX = 500;
        this.WONDER_DY = 500;
        this.ACTION_BUTTON_Y = 360;
        this.ERROR_BG_COLOR = '#FF0000';
        this.OK_BG_COLOR = '#FFFFFF';
        this.ERROR_TEXT_COLOR = '#FFFFFF';
        this.OK_TEXT_COLOR = '#000000';
        this.mouseX = 0;
        this.mouseY = 0;
        this.wonders = [];
    }
    Object.defineProperty(Scene.prototype, "isPaymentMenuActive", {
        get: function () { return !!this.paymentDialog; },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.update = function () {
        var e_18, _a;
        this.hand.update();
        this.actionButton.setType(this.isMyTurnToBuildFromDiscard() ? 'reject_discard' : 'undo');
        try {
            for (var _b = __values(this.wonders), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wonder = _c.value;
                wonder.update();
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_18) throw e_18.error; }
        }
        if (this.topDiscardCard) {
            var discardPoint = this.discardPile.getDiscardLockPoint();
            this.topDiscardCard.x = discardPoint.x;
            this.topDiscardCard.y = discardPoint.y;
        }
        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
        this.setStatus();
    };
    Scene.prototype.create = function () {
        var _this = this;
        var gamestate = Main.gamestate;
        var players = Main.gamestate.players;
        document.getElementById('game').style.height = this.WONDER_START_Y + this.WONDER_DY * Math.ceil((gamestate.players.length + 1) / 2) + "px";
        this.wonders = players.map(function (player) { return undefined; });
        var p = players.indexOf(Main.player);
        var l = mod(p - 1, players.length);
        var r = mod(p + 1, players.length);
        var playerWonder = new Wonder(Main.player);
        playerWonder.xs = '50%';
        playerWonder.y = this.WONDER_START_Y;
        playerWonder.addToGame();
        this.wonders[p] = playerWonder;
        var i;
        for (i = 1; i < Math.floor((players.length - 1) / 2 + 1); i++) {
            var wonder_l = new Wonder(players[l]);
            wonder_l.xs = "calc(50% - " + this.WONDER_DX + "px)";
            wonder_l.y = this.WONDER_START_Y + this.WONDER_DY * i;
            wonder_l.addToGame();
            this.wonders[l] = wonder_l;
            var wonder_r = new Wonder(players[r]);
            wonder_r.xs = "calc(50% + " + this.WONDER_DX + "px)";
            wonder_r.y = this.WONDER_START_Y + this.WONDER_DY * i;
            wonder_r.addToGame();
            this.wonders[r] = wonder_r;
            l = mod(l - 1, gamestate.players.length);
            r = mod(r + 1, gamestate.players.length);
        }
        if (players.length % 2 === 0) {
            var lastWonder = new Wonder(players[l]);
            lastWonder.xs = '50%';
            lastWonder.y = this.WONDER_START_Y + this.WONDER_DY * i;
            lastWonder.addToGame();
            this.wonders[l] = lastWonder;
        }
        this.actionButton = new ActionButton();
        this.actionButton.xs = '50%';
        this.actionButton.y = this.ACTION_BUTTON_Y;
        this.actionButton.addToGame();
        var cardsInHand;
        if (this.isMyTurnToBuildFromDiscard()) {
            cardsInHand = gamestate.discardedCards;
        }
        else if (gamestate.state === 'DISCARD_MOVE') {
            cardsInHand = [];
        }
        else {
            cardsInHand = gamestate.hand;
        }
        this.hand = new Hand(cardsInHand, this.wonders[p]);
        this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);
        this.discardPile = new DiscardPile();
        this.discardPile.xs = '50%';
        this.discardPile.y = this.WONDER_START_Y + this.WONDER_DY;
        this.discardPile.addToGame();
        if (gamestate.discardedCardCount > 0) {
            this.topDiscardCard = Card.flippedCardForAge(gamestate.lastDiscardedCardAge, false);
            this.topDiscardCard.addDiscardCountText();
            this.topDiscardCard.addToGame();
        }
        document.getElementById('game').onmousemove = function (event) {
            event.preventDefault();
            _this.mouseX = event.pageX;
            _this.mouseY = event.pageY - Main.getGameY();
        };
        this.update();
    };
    Scene.prototype.destroy = function () {
        var game = document.getElementById('game');
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        }
    };
    Scene.prototype.startPaymentDialog = function (card, move) {
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        this.paymentDialog = new PaymentDialog(card, move, this.wonders[Main.gamestate.players.indexOf(Main.player)]);
        this.paymentDialog.zIndex = ZIndices.PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    };
    Scene.prototype.setStatus = function () {
        var gamestate = Main.gamestate;
        var playerData = gamestate.playerData[Main.player];
        var status = document.querySelector('#status');
        var statusText = document.querySelector('#status > p');
        if (Main.currentError) {
            status.style.backgroundColor = this.ERROR_BG_COLOR;
            status.style.color = this.ERROR_TEXT_COLOR;
        }
        else {
            status.style.backgroundColor = this.OK_BG_COLOR;
            status.style.color = this.OK_TEXT_COLOR;
        }
        if (Main.currentError) {
            statusText.textContent = Main.currentError;
        }
        else if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                statusText.textContent = "Waiting for others to move";
            }
            else {
                statusText.textContent = "You must play a card";
            }
        }
        else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                statusText.textContent = "Waiting for others to play their last card";
            }
            else {
                statusText.textContent = "You may play your last card";
            }
        }
        else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === Main.player) {
                statusText.textContent = "You may build a card from the discard pile";
            }
            else {
                statusText.textContent = "Waiting for " + gamestate.discardMoveQueue[0] + " to build a card from the discard pile";
            }
        }
        else if (gamestate.state === 'GAME_COMPLETE') {
            statusText.textContent = "Game complete";
        }
    };
    Scene.prototype.isMyTurnToBuildFromDiscard = function () {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
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
    Shapes.filledPolygon = function (x, y, points, color) {
        var shiftedPoints = [];
        for (var i = 0; i < points.length; i++) {
            shiftedPoints.push(points[i] + (i % 2 === 0 ? x : y));
        }
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawPolygon(shiftedPoints);
        graphics.endFill();
        return graphics;
    };
    Shapes.centeredText = function (x, y, text, scale, color) {
        var pixiText = new PIXI.Text(text, { fontFamily: 'Courier New', fontWeight: 'bold', fontSize: 100, fill: color });
        pixiText.anchor.set(0.5, 0.5);
        pixiText.scale.set(scale);
        pixiText.position.set(x, y);
        return pixiText;
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
function cloneCanvas(canvas) {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext('2d').drawImage(canvas, 0, 0);
    return newCanvas;
}
function contains(array, element) {
    var e_19, _a;
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var e = array_1_1.value;
            if (e === element)
                return true;
        }
    }
    catch (e_19_1) { e_19 = { error: e_19_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_19) throw e_19.error; }
    }
    return false;
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
function randInt(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}
function randElement(array) {
    return array[randInt(0, array.length - 1)];
}
function sum(array, key) {
    var e_20, _a;
    if (!array || array.length === 0) {
        return 0;
    }
    var result = 0;
    try {
        for (var array_2 = __values(array), array_2_1 = array_2.next(); !array_2_1.done; array_2_1 = array_2.next()) {
            var e = array_2_1.value;
            result += key(e);
        }
    }
    catch (e_20_1) { e_20 = { error: e_20_1 }; }
    finally {
        try {
            if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
        }
        finally { if (e_20) throw e_20.error; }
    }
    return result;
}
/// <reference path="gameElement.ts" />
var Wonder = /** @class */ (function (_super) {
    __extends(Wonder, _super);
    function Wonder(player) {
        var e_21, _a, e_22, _b;
        var _this = _super.call(this) || this;
        _this.BOARD_WIDTH = 600;
        _this.BOARD_HEIGHT = 300;
        _this.BOARD_CORNER_RADIUS = 30;
        _this.BOARD_BORDER = 4;
        _this.STARTING_EFFECTS_SCALE = 0.32;
        _this.STARTING_EFFECTS_PADDING = 8;
        _this.STAGE_MIDDLE_2 = 396;
        _this.STAGE_MIDDLE_134 = 300;
        _this.STAGE_DX_4 = 147;
        _this.STAGE_DX_123 = 192;
        _this.STAGE_WIDTH = 144;
        _this.STAGE_HEIGHT = 63;
        _this.STAGE_CORNER_RADIUS = 18;
        _this.STAGE_EFFECT_SCALE = 0.29;
        _this.STAGE_COST_OFFSET_X = 10;
        _this.STAGE_COST_OFFSET_Y = 60;
        _this.STAGE_COST_PADDING = 6;
        _this.STAGE_COST_BORDER = 3;
        _this.STAGE_COST_SCALE = 0.12;
        _this.STAGE_PAYMENT_OFFSET_X = -10;
        _this.STAGE_PAYMENT_OFFSET_Y = -13;
        _this.STAGE_PAYMENT_SCALE = 0.15;
        _this.BUILT_STAGE_OFFSET_Y = -130;
        _this.RESOURCE_ROLL_OFFSET_Y = 30;
        _this.RED_ROLL_X = -200;
        _this.RED_ROLL_Y = _this.BOARD_BORDER + 22;
        _this.RED_ROLL_MAX_X = 150;
        _this.YELLOW_ROLL_Y = -24;
        _this.PURPLE_ROLL_Y = 24;
        _this.BLUE_ROLL_Y = -24;
        _this.GREEN_ROLL_Y = 24;
        _this.OVERFLOW_ROLL_START_Y = -288;
        _this.OVERFLOW_ROLL_DY = -54;
        _this.SIDEBAR_WIDTH = 600;
        _this.SIDEBAR_NAME_X = -18;
        _this.SIDEBAR_NAME_Y = 25;
        _this.SIDEBAR_GOLD_COIN_X = -28;
        _this.SIDEBAR_GOLD_COIN_Y = 25;
        _this.SIDEBAR_GOLD_TEXT_X = -43;
        _this.SIDEBAR_GOLD_TEXT_Y = 55;
        _this.SIDEBAR_POINTS_COIN_X = -88;
        _this.SIDEBAR_POINTS_COIN_Y = 55;
        _this.SIDEBAR_POINTS_TEXT_X = -103;
        _this.SIDEBAR_POINTS_TEXT_Y = 55;
        _this.SIDEBAR_CHECKMARK_X = -145;
        _this.SIDEBAR_CHECKMARK_Y = 52;
        _this.SIDEBAR_TOKENS_X = -28;
        _this.SIDEBAR_TOKENS_DX = -24;
        _this.SIDEBAR_TOKENS_Y = 85;
        _this.player = player;
        var playerData = Main.gamestate.playerData[_this.player];
        var boardDiv = _this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(_this.draw());
        var sidebar = _this.div.appendChild(_this.drawSidebar());
        sidebar.style.left = _this.BOARD_WIDTH / 2 - _this.SIDEBAR_WIDTH + "px";
        sidebar.style.top = -_this.BOARD_HEIGHT / 2 + "px";
        _this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-_this.BOARD_WIDTH / 2, -_this.BOARD_HEIGHT / 2 - _this.RESOURCE_ROLL_OFFSET_Y, false),
            grey: undefined,
            red: new PlayedCardEffectRoll(_this.RED_ROLL_X, -_this.BOARD_HEIGHT / 2 + _this.RED_ROLL_Y, false),
            yellow: new PlayedCardEffectRoll(-_this.BOARD_WIDTH / 2 + _this.BOARD_BORDER, _this.YELLOW_ROLL_Y, false),
            purple: new PlayedCardEffectRoll(-_this.BOARD_WIDTH / 2 + _this.BOARD_BORDER, _this.PURPLE_ROLL_Y, false),
            blue: new PlayedCardEffectRoll(_this.BOARD_WIDTH / 2 - _this.BOARD_BORDER, _this.BLUE_ROLL_Y, true),
            green: new PlayedCardEffectRoll(_this.BOARD_WIDTH / 2 - _this.BOARD_BORDER, _this.GREEN_ROLL_Y, true),
        };
        _this.playedCardEffectRolls.grey = _this.playedCardEffectRolls.brown;
        _this.overflowCardEffectRolls = [];
        _this.pushNewOverflowCardEffectRoll();
        try {
            for (var _c = __values(playerData.playedCards), _d = _c.next(); !_d.done; _d = _c.next()) {
                var apiCardId = _d.value;
                var apiCard = Main.gamestate.cards[apiCardId];
                var card = new Card(apiCardId, apiCard, undefined, _this);
                _this.addNewCardEffect(card);
                card.addToGame();
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_21) throw e_21.error; }
        }
        _this.builtWonderCards = [];
        try {
            for (var _e = __values(playerData.stagesBuilt), _f = _e.next(); !_f.done; _f = _e.next()) {
                var stageBuilt = _f.value;
                var justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
                var card = Card.flippedCardForAge(stageBuilt.cardAge, justPlayed);
                card.zIndex = ZIndices.CARD_WONDER;
                _this.builtWonderCards.push(card);
                card.addToGame();
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_22) throw e_22.error; }
        }
        _this.zIndex = ZIndices.WONDER;
        return _this;
    }
    Wonder.prototype.update = function () {
        var e_23, _a;
        for (var color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].x = this.x + this.playedCardEffectRolls[color].offsetx;
            this.playedCardEffectRolls[color].y = this.y + this.playedCardEffectRolls[color].offsety;
            this.playedCardEffectRolls[color].update();
        }
        try {
            for (var _b = __values(this.overflowCardEffectRolls), _c = _b.next(); !_c.done; _c = _b.next()) {
                var overflowCardEffectRoll = _c.value;
                overflowCardEffectRoll.x = this.x + overflowCardEffectRoll.offsetx;
                overflowCardEffectRoll.y = this.y + overflowCardEffectRoll.offsety;
                overflowCardEffectRoll.update();
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_23) throw e_23.error; }
        }
        for (var i = 0; i < this.builtWonderCards.length; i++) {
            this.builtWonderCards[i].x = this.x - this.BOARD_WIDTH / 2 + this.stageXs[Main.gamestate.playerData[this.player].stagesBuilt[i].stage];
            this.builtWonderCards[i].y = this.y + this.BOARD_HEIGHT / 2 + this.BUILT_STAGE_OFFSET_Y;
            this.builtWonderCards[i].update();
        }
    };
    Wonder.prototype.getMainRegion = function () {
        return new PIXI.Rectangle(this.x - this.BOARD_WIDTH / 2, this.y - this.BOARD_HEIGHT / 2, this.BOARD_WIDTH, this.BOARD_HEIGHT - this.STAGE_HEIGHT);
    };
    Wonder.prototype.getStageRegion = function () {
        return new PIXI.Rectangle(this.x - this.BOARD_WIDTH / 2, this.y + this.BOARD_HEIGHT / 2 - this.STAGE_HEIGHT, this.BOARD_WIDTH, 2 * this.STAGE_HEIGHT);
    };
    Wonder.prototype.getClosestStageId = function (posx) {
        var minStage = 0;
        for (var i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x - this.BOARD_WIDTH / 2 + this.stageXs[i] - posx) < Math.abs(this.x - this.BOARD_WIDTH / 2 + this.stageXs[minStage] - posx)) {
                minStage = i;
            }
        }
        return minStage;
    };
    Wonder.prototype.getCardPositionForStage = function (stage) {
        return new PIXI.Point(this.x - this.BOARD_WIDTH / 2 + this.stageXs[stage], this.y + this.BOARD_HEIGHT / 2 + this.BUILT_STAGE_OFFSET_Y);
    };
    Wonder.prototype.getNewCardEffectWorldPosition = function (card) {
        var color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            return this.playedCardEffectRolls[color].getNextPosition(card);
        }
        else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, this.BOARD_WIDTH)) {
                this.pushNewOverflowCardEffectRoll();
            }
            return this.overflowCardEffectRolls[0].getNextPosition(card);
        }
    };
    Wonder.prototype.addNewCardEffect = function (card) {
        var playerData = Main.gamestate.playerData[this.player];
        var justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'play' && playerData.lastMove.card === card.apiCardId);
        card.state = { type: 'permanent_effect', justPlayed: justPlayed };
        var color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addCard(card);
        }
        else {
            if (!this.overflowCardEffectRolls[0].canAddCard(card, this.BOARD_WIDTH)) {
                this.pushNewOverflowCardEffectRoll();
            }
            this.overflowCardEffectRolls[0].addCard(card);
        }
    };
    Wonder.prototype.makeMove = function () {
        this.moveIndicatorCheck.style.visibility = 'visible';
    };
    Wonder.prototype.undoMove = function () {
        this.moveIndicatorCheck.style.visibility = 'hidden';
    };
    Wonder.prototype.getCardEffectRollMaxWidth = function (color) {
        return {
            'brown': this.BOARD_WIDTH,
            'grey': this.BOARD_WIDTH,
            'red': this.RED_ROLL_MAX_X - this.RED_ROLL_X,
            'yellow': this.BOARD_WIDTH - 2 * this.BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': this.BOARD_WIDTH - 2 * this.BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': this.BOARD_WIDTH - 2 * this.BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': this.BOARD_WIDTH - 2 * this.BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
        }[color];
    };
    Wonder.prototype.pushNewOverflowCardEffectRoll = function () {
        var roll = new PlayedCardEffectRoll(-this.BOARD_WIDTH / 2, this.OVERFLOW_ROLL_START_Y + this.OVERFLOW_ROLL_DY * (this.overflowCardEffectRolls.length - 1), false);
        this.overflowCardEffectRolls.unshift(roll);
    };
    Wonder.prototype.draw = function () {
        var e_24, _a;
        var wonder = Main.gamestate.wonders[this.player];
        var playerData = Main.gamestate.playerData[this.player];
        var wonderBoard = new PIXI.Container();
        // Board
        var boardBase = Shapes.filledRoundedRect(0, 0, this.BOARD_WIDTH, this.BOARD_HEIGHT, this.BOARD_CORNER_RADIUS, wonder.outline_color);
        wonderBoard.addChild(boardBase);
        var boardBg = Shapes.filledRoundedRect(this.BOARD_BORDER, this.BOARD_BORDER, this.BOARD_WIDTH - 2 * this.BOARD_BORDER, this.BOARD_HEIGHT - 2 * this.BOARD_BORDER, this.BOARD_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
        wonderBoard.addChild(boardBg);
        var boardBgMask = boardBg.clone();
        wonderBoard.addChild(boardBgMask);
        // Starting effects
        var startingEffects = ArtCommon.getArtForEffects(wonder.starting_effects);
        startingEffects.scale.set(this.STARTING_EFFECTS_SCALE);
        var startingEffectsBounds = startingEffects.getBounds();
        startingEffects.position.set(this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffects.x), this.BOARD_BORDER + this.STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffects.y));
        startingEffectsBounds = startingEffects.getBounds();
        var startingEffectBanner = Shapes.filledRect(startingEffectsBounds.left - this.STARTING_EFFECTS_PADDING, startingEffectsBounds.top - this.STARTING_EFFECTS_PADDING, startingEffectsBounds.width + 2 * this.STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2 * this.STARTING_EFFECTS_PADDING, ArtCommon.cardBannerForColor(wonder.starting_effect_color));
        startingEffectBanner.mask = boardBgMask;
        wonderBoard.addChild(startingEffectBanner);
        wonderBoard.addChild(startingEffects);
        // Wonder stages
        var stageIdsBuilt = playerData.stagesBuilt.map(function (stageBuilt) { return stageBuilt.stage; });
        var wonderStageMinCosts = wonder.stages.map(function (stage) { return Infinity; });
        try {
            for (var _b = __values(Main.gamestate.validMoves), _c = _b.next(); !_c.done; _c = _b.next()) {
                var validMove = _c.value;
                if (validMove.action !== 'wonder')
                    continue;
                var stage = validMove.stage;
                var cost = API.totalPaymentAmount(validMove.payment);
                if (cost < wonderStageMinCosts[stage]) {
                    wonderStageMinCosts[stage] = cost;
                }
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_24) throw e_24.error; }
        }
        var stagesMiddle = wonder.stages.length === 2 ? this.STAGE_MIDDLE_2 : this.STAGE_MIDDLE_134;
        var stageDX = wonder.stages.length === 4 ? this.STAGE_DX_4 : this.STAGE_DX_123;
        this.stageXs = [];
        for (var i = 0; i < wonder.stages.length; i++) {
            this.stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1) / 2));
            var stageBase = Shapes.filledRoundedRect(-this.STAGE_WIDTH / 2, this.BOARD_HEIGHT - this.STAGE_HEIGHT, this.STAGE_WIDTH, this.STAGE_HEIGHT * 2, this.STAGE_CORNER_RADIUS, wonder.outline_color);
            stageBase.mask = boardBgMask;
            stageBase.x = this.stageXs[i];
            wonderBoard.addChild(stageBase);
            var stageBg = Shapes.filledRoundedRect(-this.STAGE_WIDTH / 2 + this.BOARD_BORDER, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.BOARD_BORDER, this.STAGE_WIDTH - 2 * this.BOARD_BORDER, this.STAGE_HEIGHT * 2 - 2 * this.BOARD_BORDER, this.STAGE_CORNER_RADIUS - this.BOARD_BORDER, ArtCommon.wonderBg);
            stageBg.mask = boardBgMask;
            stageBg.x = this.stageXs[i];
            wonderBoard.addChild(stageBg);
            var stageEffects = ArtCommon.getArtForEffects(wonder.stages[i].effects);
            stageEffects.scale.set(this.STAGE_EFFECT_SCALE);
            stageEffects.position.set(this.stageXs[i], this.BOARD_HEIGHT - this.STAGE_HEIGHT / 2);
            wonderBoard.addChild(stageEffects);
            var stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
            if (stageCost) {
                stageCost.scale.set(this.STAGE_COST_SCALE);
                stageCost.position.set(this.stageXs[i] - this.STAGE_WIDTH / 2 + this.STAGE_COST_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_COST_OFFSET_Y);
                var costBanner = Shapes.filledRoundedRect(-stageCost.width / 2 - this.STAGE_COST_PADDING, -this.STAGE_COST_PADDING, stageCost.width + 2 * this.STAGE_COST_PADDING, stageCost.height + 2 * this.STAGE_COST_PADDING, this.STAGE_COST_PADDING, wonder.outline_color);
                costBanner.position.set(stageCost.x, stageCost.y);
                var costBannerBg = Shapes.filledRoundedRect(-stageCost.width / 2 - (this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), -(this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), stageCost.width + 2 * (this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), stageCost.height + 2 * (this.STAGE_COST_PADDING - this.STAGE_COST_BORDER), this.STAGE_COST_PADDING - this.STAGE_COST_BORDER, ArtCommon.wonderBg);
                costBannerBg.position.set(stageCost.x, stageCost.y);
                wonderBoard.addChild(costBanner);
                wonderBoard.addChild(costBannerBg);
                wonderBoard.addChild(stageCost);
            }
            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                var stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(this.STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + this.STAGE_WIDTH / 2 + this.STAGE_PAYMENT_OFFSET_X, this.BOARD_HEIGHT - this.STAGE_HEIGHT + this.STAGE_PAYMENT_OFFSET_Y);
                wonderBoard.addChild(stagePayment);
            }
        }
        return render(wonderBoard, this.BOARD_WIDTH, this.BOARD_HEIGHT);
    };
    Wonder.prototype.drawSidebar = function () {
        var sidebar = document.createElement('div');
        sidebar.style.width = this.SIDEBAR_WIDTH + "px";
        sidebar.style.height = this.BOARD_HEIGHT + "px";
        sidebar.style.position = 'absolute';
        var nameText = sidebar.appendChild(this.drawSidebarText(this.player, 20));
        nameText.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_NAME_X + "px";
        nameText.style.top = this.SIDEBAR_NAME_Y + "px";
        var goldCoin = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.goldCoin(), 0.2));
        goldCoin.style.position = 'absolute';
        goldCoin.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_GOLD_COIN_X + "px";
        goldCoin.style.top = this.SIDEBAR_GOLD_COIN_Y + "px";
        var goldText = sidebar.appendChild(this.drawSidebarText("" + Main.gamestate.playerData[this.player].gold, 20));
        goldText.style.color = '#FBE317';
        goldText.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_GOLD_TEXT_X + "px";
        goldText.style.top = this.SIDEBAR_GOLD_TEXT_Y + "px";
        var pointsWreath = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.pointsWreath(), 0.2));
        pointsWreath.style.position = 'absolute';
        pointsWreath.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_POINTS_COIN_X + "px";
        pointsWreath.style.top = this.SIDEBAR_POINTS_COIN_Y + "px";
        var pointsText = sidebar.appendChild(this.drawSidebarText("" + Main.gamestate.playerData[this.player].pointsDistribution.total, 20));
        pointsText.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_POINTS_TEXT_X + "px";
        pointsText.style.top = this.SIDEBAR_POINTS_TEXT_Y + "px";
        this.moveIndicatorCheck = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.2));
        this.moveIndicatorCheck.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_CHECKMARK_X + "px";
        this.moveIndicatorCheck.style.top = this.SIDEBAR_CHECKMARK_Y + "px";
        this.moveIndicatorCheck.style.visibility = 'hidden';
        for (var i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            var token = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.militaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]), 0.2));
            token.style.position = 'absolute';
            token.style.left = this.SIDEBAR_WIDTH + this.SIDEBAR_TOKENS_X + this.SIDEBAR_TOKENS_DX * i + "px";
            token.style.top = this.SIDEBAR_TOKENS_Y + "px";
        }
        return sidebar;
    };
    Wonder.prototype.drawSidebarText = function (text, size) {
        var div = document.createElement('div');
        div.style.width = '50%';
        div.style.position = 'absolute';
        div.style.transform = 'translate(-100%, 0)';
        var p = div.appendChild(document.createElement('p'));
        p.textContent = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = size + "px";
        p.style.color = "#FFFFFF";
        p.style.width = '100%';
        p.style.textAlign = 'right';
        p.style.transform = 'translate(0, -50%)';
        return div;
    };
    return Wonder;
}(GameElement));
var ZIndices;
(function (ZIndices) {
    ZIndices.DISCARD_PILE = -10;
    ZIndices.DISCARD_CARDS = -9;
    ZIndices.CARD_HAND = 0;
    ZIndices.CARD_WONDER = 9;
    ZIndices.WONDER = 10;
    ZIndices.CARD_PLAYED = 11;
    ZIndices.CARD_DRAGGING = 100;
    ZIndices.PAYMENT_DIALOG = 1000;
})(ZIndices || (ZIndices = {}));
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
            var scriptFunctions_1, scriptFunctions_1_1, scriptFunction, e_25_1;
            var e_25, _a;
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
                        e_25_1 = _b.sent();
                        e_25 = { error: e_25_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (scriptFunctions_1_1 && !scriptFunctions_1_1.done && (_a = scriptFunctions_1.return)) _a.call(scriptFunctions_1);
                        }
                        finally { if (e_25) throw e_25.error; }
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
