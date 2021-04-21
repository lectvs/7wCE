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
        this._x = 0;
        this._y = 0;
        this._scale = 1;
        this._zIndex = 0;
        this._visible = true;
        this._alpha = 1;
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        this.setTransform();
    }
    Object.defineProperty(GameElement.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) {
            this._x = value;
            this.div.style.left = this._x + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) {
            this._y = value;
            this.div.style.top = this._y + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "scale", {
        get: function () { return this._scale; },
        set: function (value) {
            this._scale = value;
            this.setTransform();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "zIndex", {
        get: function () { return this._zIndex; },
        set: function (value) {
            this._zIndex = value;
            this.div.style.zIndex = "" + value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "visible", {
        get: function () { return this._visible; },
        set: function (value) {
            this._visible = value;
            this.div.style.visibility = value ? 'visible' : 'hidden';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "alpha", {
        get: function () { return this._alpha; },
        set: function (value) {
            this._alpha = value;
            this.div.style.opacity = "" + this._alpha;
        },
        enumerable: false,
        configurable: true
    });
    GameElement.prototype.addToGame = function (gameDiv) {
        if (gameDiv === void 0) { gameDiv = Main.game; }
        gameDiv.appendChild(this.div);
    };
    GameElement.prototype.removeFromGame = function () {
        if (this.div.parentElement) {
            this.div.parentElement.removeChild(this.div);
        }
    };
    GameElement.prototype.setPosition = function (point) {
        this.x = point.x;
        this.y = point.y;
    };
    GameElement.prototype.setTransform = function () {
        this.div.style.transform = "scale(" + this._scale + ")";
    };
    return GameElement;
}());
/// <reference path="gameElement.ts" />
var ActionButton = /** @class */ (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton(scene) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        var button = _this.div.appendChild(document.createElement('div'));
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
        button.style.width = C.ACTION_BUTTON_WIDTH + "px";
        button.style.height = C.ACTION_BUTTON_HEIGHT + "px";
        button.style.borderRadius = C.ACTION_BUTTON_CORNER_RADIUS + "px";
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
                if (_this.scene.isPaymentMenuActive)
                    _this.scene.paymentDialog.removeFromGame();
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
    function goldGain(oldGold, newGold, payment, negPayment, posPayment) {
        return newGold - oldGold + totalPaymentAmount(payment) - ((negPayment === null || negPayment === void 0 ? void 0 : negPayment.pos) || 0) - ((posPayment === null || posPayment === void 0 ? void 0 : posPayment.neg) || 0);
    }
    API.goldGain = goldGain;
    function getScienceSymbol(card) {
        var e_4, _a;
        try {
            for (var _b = __values(card.effects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var effect = _c.value;
                if (effect.type === 'science')
                    return effect.symbol;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return undefined;
    }
    API.getScienceSymbol = getScienceSymbol;
    function getCardsProducingChain(gamestate, chain) {
        var cards = [];
        for (var cardId in gamestate.cards) {
            var card = gamestate.cards[cardId];
            if (card.chains && contains(card.chains, chain))
                cards.push(card);
        }
        return cards;
    }
    API.getCardsProducingChain = getCardsProducingChain;
    function getCardsConsumingChain(gamestate, chain) {
        var cards = [];
        for (var cardId in gamestate.cards) {
            var card = gamestate.cards[cardId];
            if (card.cost && card.cost.chain === chain)
                cards.push(card);
        }
        return cards;
    }
    API.getCardsConsumingChain = getCardsConsumingChain;
    /* API METHODS */
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
    function chooseside(gameid, player, side, callback) {
        httpRequest(LAMBDA_URL + "?operation=chooseside&gameid=" + gameid + "&player=" + player + "&side=" + side, function (responseJson, error) {
            callback(error);
        });
    }
    API.chooseside = chooseside;
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
    function getusers(usernames, callback) {
        httpRequest(LAMBDA_URL + "?operation=getusers&usernames=" + usernames.join(','), function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson['users'], undefined);
            }
        });
    }
    API.getusers = getusers;
    function getinvites(username, callback) {
        httpRequest(LAMBDA_URL + "?operation=getinvites&username=" + username, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson['gameids'], undefined);
            }
        });
    }
    API.getinvites = getinvites;
    function setwonderpreferences(username, preferences, callback) {
        var preferencesString = preferences.map(function (pref) { return pref.id; }).join(',');
        httpRequest(LAMBDA_URL + "?operation=setwonderpreferences&username=" + username + "&preferences=" + preferencesString, function (responseJson, error) {
            callback(error);
        });
    }
    API.setwonderpreferences = setwonderpreferences;
    function creategame(options, callback) {
        httpRequest(LAMBDA_URL + "?operation=creategame&players=" + options.players.join(',') + "&flags=" + options.flags.join(','), function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson['gameid'], undefined);
            }
        });
    }
    API.creategame = creategame;
    function login(username, password_hash, callback) {
        httpRequest(LAMBDA_URL + "?operation=login&username=" + username + "&password_hash=" + password_hash, function (responseJson, error) {
            callback(error);
        });
    }
    API.login = login;
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
    ArtCommon.goldColor = 0xFBE317;
    ArtCommon.goldColorHtml = '#FBE317';
    ArtCommon.discardPileColor = 0x888888;
    ArtCommon.resourceOuterColor = 0xD89846;
    ArtCommon.selectionColor = 0xFF0000;
    function eloDiffColor(diff) {
        if (diff > 0)
            return '#00FF00';
        if (diff < 0)
            return '#FF0000';
        return '#888888';
    }
    ArtCommon.eloDiffColor = eloDiffColor;
    function domElementForArt(art, scale, padding) {
        if (scale === void 0) { scale = 1; }
        if (padding === void 0) { padding = 0; }
        art.scale.set(art.scale.x * scale, art.scale.y * scale);
        var bounds = art.getBounds();
        art.position.set(art.x - bounds.left + padding, art.y - bounds.top + padding);
        return render(art, bounds.width + 2 * padding, bounds.height + 2 * padding);
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
    function cardBannerForColorHtml(color) {
        if (color === 'brown')
            return '#9F441C';
        if (color === 'grey')
            return '#ADB1B0';
        if (color === 'red')
            return '#D51939';
        if (color === 'green')
            return '#4FA53A';
        if (color === 'blue')
            return '#2A95D7';
        if (color === 'yellow')
            return '#F2AA0C';
        if (color === 'purple')
            return '#7054AB';
        console.error('Could not find color:', color);
        return '#FF00FF';
    }
    ArtCommon.cardBannerForColorHtml = cardBannerForColorHtml;
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
                return goldForCards(effect.color, effect.gold_per_card);
            }
            else if (effect.type === 'gold_and_points_for_cards') {
                return goldAndPointsForCards(effect.color, effect.gold_per_card, effect.points_per_card);
            }
            else if (effect.type === 'gold_and_points_for_stages') {
                return goldAndPointsForStages(effect.gold_per_stage, effect.points_per_stage);
            }
            else if (effect.type === 'points_for_cards') {
                return pointsForCards(effect.color, effect.points_per_card);
            }
            else if (effect.type === 'points_for_stages') {
                return pointsForStages(effect.points_per_stage);
            }
            else if (effect.type === 'points_for_finished_wonder') {
                return pointsForFinishedWonder(effect.points);
            }
            else if (effect.type === 'points_for_self_cards') {
                return pointsForSelfCards(effect.color, effect.points_per_card);
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
    function getShadowForArt(artFactory, type, dx, dy) {
        if (dx === void 0) { dx = 5; }
        if (dy === void 0) { dy = 5; }
        var container = new PIXI.Container();
        var shadow = artFactory();
        var silhouetteFilter = new PIXI.filters.ColorMatrixFilter();
        silhouetteFilter.brightness(type === 'dark' ? 0 : 10, false);
        shadow.filters = [silhouetteFilter, new PIXI.filters.BlurFilter(16 * resolution, 100)];
        shadow.position.set(dx, dy);
        container.addChild(shadow);
        return container;
    }
    ArtCommon.getShadowForArt = getShadowForArt;
    function getShadowForEffects(effects, type, dx, dy) {
        if (dx === void 0) { dx = 5; }
        if (dy === void 0) { dy = 5; }
        return getShadowForArt(function () { return ArtCommon.getArtForEffects(effects); }, type, dx, dy);
    }
    ArtCommon.getShadowForEffects = getShadowForEffects;
    function getArtForCost(cost) {
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
        return combineCostArt(costArts, 16);
    }
    ArtCommon.getArtForCost = getArtForCost;
    function getArtForStageCost(cost) {
        var e_6, _a;
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
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
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
        var e_7, _a;
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (resourceArts_1_1 && !resourceArts_1_1.done && (_a = resourceArts_1.return)) _a.call(resourceArts_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return combineEffectArt(resourceArts, 4);
    }
    ArtCommon.multiResource = multiResource;
    function shield() {
        var sprite = new PIXI.Sprite(PIXI.Texture.from('shield'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
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
        var e_8, _a;
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
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (symbolArts_1_1 && !symbolArts_1_1.done && (_a = symbolArts_1.return)) _a.call(symbolArts_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return combineEffectArt(symbolArts, 4);
    }
    ArtCommon.multiScience = multiScience;
    function victoryPoints(points) {
        var container = new PIXI.Container();
        container.addChild(pointsWreath());
        container.addChild(Shapes.centeredText(0, 0, "" + points, 0.7, 0x000000));
        return container;
    }
    ArtCommon.victoryPoints = victoryPoints;
    function gold(gold) {
        var container = new PIXI.Container();
        container.addChild(goldCoin());
        container.addChild(Shapes.centeredText(0, 0, "" + gold, 0.7, 0x000000));
        return container;
    }
    ArtCommon.gold = gold;
    function tradingPost(direction) {
        var container = new PIXI.Container();
        var coin = gold(1);
        coin.scale.set(0.7);
        coin.position.set(0, -27);
        container.addChild(coin);
        var woodArt = wood();
        woodArt.scale.set(0.5);
        var stoneArt = stone();
        stoneArt.scale.set(0.5);
        var oreArt = ore();
        oreArt.scale.set(0.5);
        var clayArt = clay();
        clayArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-120, -5, 240, 60, 30, cardBannerForColor('brown')));
        var resources = combineEffectArt([woodArt, stoneArt, oreArt, clayArt], 8);
        resources.position.set(0, 25);
        container.addChild(resources);
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(150, 25);
            container.addChild(arrow);
        }
        else if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-150, 25);
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
        var coin = gold(1);
        coin.scale.set(0.7);
        coin.position.set(0, -27);
        container.addChild(coin);
        var glassArt = glass();
        glassArt.scale.set(0.5);
        var loomArt = loom();
        loomArt.scale.set(0.5);
        var pressArt = press();
        pressArt.scale.set(0.5);
        container.addChild(Shapes.filledRoundedRect(-90, -5, 180, 60, 30, cardBannerForColor('grey')));
        var resources = combineEffectArt([glassArt, loomArt, pressArt], 8);
        resources.position.set(0, 25);
        container.addChild(resources);
        var arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(120, 25);
        container.addChild(arrowR);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-120, 25);
        container.addChild(arrowL);
        return container;
    }
    ArtCommon.marketplace = marketplace;
    function goldForCards(color, goldPerCard) {
        var container = new PIXI.Container();
        var card = cardGoldPoints(color, goldPerCard, 0);
        card.scale.set(0.7);
        card.position.set(0, -10);
        container.addChild(card);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 5);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 5);
        container.addChild(arrowR);
        var arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 45);
        container.addChild(arrowD);
        return container;
    }
    ArtCommon.goldForCards = goldForCards;
    function goldAndPointsForCards(color, goldPerCard, pointsPerCard) {
        var container = new PIXI.Container();
        var card = cardGoldPoints(color, goldPerCard, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        return container;
    }
    ArtCommon.goldAndPointsForCards = goldAndPointsForCards;
    function goldAndPointsForStages(goldAmount, pointsAmount) {
        var container = new PIXI.Container();
        container.addChild(pyramidStages());
        var goldCoin = gold(goldAmount);
        goldCoin.scale.set(0.48);
        goldCoin.position.set(-60, 30);
        container.addChild(goldCoin);
        var pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(60, 30);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.goldAndPointsForStages = goldAndPointsForStages;
    function pointsForCards(color, pointsPerCard) {
        var container = new PIXI.Container();
        var card = cardGoldPoints(color, 0, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-85, 20);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(85, 20);
        container.addChild(arrowR);
        return container;
    }
    ArtCommon.pointsForCards = pointsForCards;
    function pointsForStages(pointsAmount) {
        var container = new PIXI.Container();
        var pyramid = pyramidStages();
        pyramid.position.set(0, -15);
        pyramid.scale.set(0.85);
        container.addChild(pyramid);
        var pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(36, 10);
        container.addChild(pointsWreath);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-80, 10);
        container.addChild(arrowL);
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(80, 10);
        container.addChild(arrowR);
        var arrowD = arrowDown();
        arrowD.scale.set(0.4);
        arrowD.position.set(0, 45);
        container.addChild(arrowD);
        return container;
    }
    ArtCommon.pointsForStages = pointsForStages;
    function pointsForFinishedWonder(pointsAmount) {
        var container = new PIXI.Container();
        var pyramid = pyramidFull();
        container.addChild(pyramid);
        var pointsWreath = victoryPoints(pointsAmount);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(40, 30);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForFinishedWonder = pointsForFinishedWonder;
    function pointsForSelfCards(color, pointsPerCard) {
        var container = new PIXI.Container();
        var card = cardGoldPoints(color, 0, pointsPerCard);
        card.scale.set(0.8);
        container.addChild(card);
        return container;
    }
    ArtCommon.pointsForSelfCards = pointsForSelfCards;
    function playLastCard() {
        var container = new PIXI.Container();
        var card1 = cardForEffect(0x686B6A);
        card1.position.set(-35, 0);
        card1.angle = -25;
        container.addChild(card1);
        var check1 = checkMark();
        check1.position.set(-30, -15);
        check1.scale.set(0.7);
        container.addChild(check1);
        var card2 = cardForEffect(0x686B6A);
        card2.position.set(35, 0);
        card2.angle = 25;
        container.addChild(card2);
        var check2 = checkMark();
        check2.position.set(45, -15);
        check2.scale.set(0.7);
        container.addChild(check2);
        return container;
    }
    ArtCommon.playLastCard = playLastCard;
    function buildFromDiscard() {
        var container = new PIXI.Container();
        var backCard = cardForEffect(0x444444);
        backCard.position.set(-15, 0);
        backCard.angle = -20;
        backCard.alpha = 0.8;
        container.addChild(backCard);
        var frontCard = cardForEffect(ArtCommon.cardBannerForColor("grey"));
        container.addChild(frontCard);
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFromDiscard = buildFromDiscard;
    function buildFreeFirstColor() {
        var container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        var colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple'];
        for (var i = 0; i < colors.length; i++) {
            container.addChild(Shapes.filledRect(-31 + 62 / 7 * i, -46, 62 / 7, 92, ArtCommon.cardBannerForColor(colors[i])));
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
        container.addChild(cardForEffect(0x686B6A));
        container.addChild(Shapes.centeredText(0, 14, '\u03B1', 0.56, 0xFFFFFF));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeFirstCard = buildFreeFirstCard;
    function buildFreeLastCard() {
        var container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        container.addChild(Shapes.centeredText(0, 16, '\u03A9', 0.56, 0xFFFFFF));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeLastCard = buildFreeLastCard;
    function wood() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0x6D9F2F));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('wood'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.wood = wood;
    function stone() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0xC3BBBE));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('stone'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.stone = stone;
    function ore() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0x404340));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('ore'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.4);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.ore = ore;
    function clay() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledCircle(0, 0, 44, 0xE35B1E));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('clay'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.clay = clay;
    function glass() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0x36A1D6));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('glass'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.45);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.glass = glass;
    function press() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0xD9A86B));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('press'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.4);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.press = press;
    function loom() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, ArtCommon.resourceOuterColor));
        container.addChild(Shapes.filledOctagon(0, 0, 44, 0xA5186A));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('loom'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.5);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.loom = loom;
    function gear() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('gear'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.gear = gear;
    function tablet() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('tablet'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.tablet = tablet;
    function compass() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('compass'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.compass = compass;
    function cardGoldPoints(color, goldAmount, pointsAmount) {
        var container = new PIXI.Container();
        container.addChild(cardForEffect(ArtCommon.cardBannerForColor(color)));
        if (goldAmount > 0) {
            var goldCoin_1 = gold(goldAmount);
            goldCoin_1.scale.set(0.6);
            goldCoin_1.position.set(-45, 30);
            container.addChild(goldCoin_1);
        }
        if (pointsAmount > 0) {
            var pointsWreath_1 = victoryPoints(pointsAmount);
            pointsWreath_1.scale.set(0.6);
            pointsWreath_1.position.set(45, 30);
            container.addChild(pointsWreath_1);
        }
        return container;
    }
    ArtCommon.cardGoldPoints = cardGoldPoints;
    function cardForEffect(color) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-35, -50, 70, 100, 8, 0xFFFFFF));
        container.addChild(Shapes.filledRoundedRect(-31, -46, 62, 92, 4, color));
        return container;
    }
    ArtCommon.cardForEffect = cardForEffect;
    function pyramidFull() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('pyramid_full'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.pyramidFull = pyramidFull;
    function pyramidStages() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('pyramid_stages'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.pyramidStages = pyramidStages;
    function goldCoin() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('goldcoin'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.goldCoin = goldCoin;
    function pointsWreath() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('pointswreath'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.pointsWreath = pointsWreath;
    function militaryToken(amount) {
        if (amount < 0) {
            return militaryTokenNegative(-amount);
        }
        return militaryTokenPositive(amount);
    }
    ArtCommon.militaryToken = militaryToken;
    function militaryTokenPositive(amount) {
        var container = new PIXI.Container();
        var innerContainer = new PIXI.Container();
        innerContainer.addChild(Shapes.filledRect(-50, -20, 100, 80, 0xCC1D17));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('falcon'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        sprite.position.set(-1, -20);
        innerContainer.addChild(sprite);
        var wreath = pointsWreath();
        wreath.scale.set(0.6);
        wreath.position.set(0, 20);
        innerContainer.addChild(wreath);
        innerContainer.addChild(Shapes.centeredText(0, 20, "" + amount, 0.5, 0x000000));
        innerContainer.scale.set(0.775);
        container.addChild(innerContainer);
        return container;
    }
    ArtCommon.militaryTokenPositive = militaryTokenPositive;
    function militaryTokenNegative(amount) {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledOctagon(0, 0, 50, 0xCC1D17));
        var wreath = pointsWreath();
        wreath.scale.set(0.7);
        container.addChild(wreath);
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0xCC1D17));
        container.addChild(Shapes.centeredText(2, 0, "" + amount, 0.6, 0xCC1D17));
        return container;
    }
    ArtCommon.militaryTokenNegative = militaryTokenNegative;
    function payment(amount) {
        if (!isFinite(amount)) {
            return ArtCommon.X(0xFF0000);
        }
        if (amount === 0) {
            return ArtCommon.checkMark();
        }
        var cost = new PIXI.Container();
        cost.addChild(Shapes.filledCircle(0, 0, 50, ArtCommon.goldColor));
        var goldText = Shapes.centeredText(-70, 0, "" + amount, 1, ArtCommon.goldColor);
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
        var container = new PIXI.Container();
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawRect(-4, -20, 8, 40);
        graphics.endFill();
        graphics.angle = 20;
        container.addChild(graphics);
        return container;
    }
    function arrowLeft() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([45, -40, 35, 0, 45, 40, -45, 0]);
        graphics.endFill();
        return graphics;
    }
    function arrowRight() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([-45, -40, -35, 0, -45, 40, 45, 0]);
        graphics.endFill();
        return graphics;
    }
    function arrowDown() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawPolygon([-40, -35, 0, -25, 40, -35, 0, 35]);
        graphics.endFill();
        return graphics;
    }
    function combineEffectArt(arts, padding) {
        var e_9, _a;
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
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (arts_1_1 && !arts_1_1.done && (_a = arts_1.return)) _a.call(arts_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return container;
    }
    function combineCostArt(arts, padding) {
        var e_10, _a;
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
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (arts_2_1 && !arts_2_1.done && (_a = arts_2.return)) _a.call(arts_2);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return container;
    }
    function combineStageCostArt(arts, padding) {
        var e_11, _a;
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
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (arts_3_1 && !arts_3_1.done && (_a = arts_3.return)) _a.call(arts_3);
            }
            finally { if (e_11) throw e_11.error; }
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
    function chooseSide(wonderChoices) {
        return randInt(0, wonderChoices.length - 1);
    }
    Bot.chooseSide = chooseSide;
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
    function Card(scene, cardId, index, handPosition, activeWonder, validMoves) {
        var _this = _super.call(this) || this;
        _this._flippedT = 0;
        _this._effectT = 0;
        _this._interactable = false;
        _this._checkMarkVisible = true;
        _this.scene = scene;
        _this.index = index;
        _this.apiCardId = cardId;
        _this.apiCard = Main.gamestate.cards[cardId];
        _this.handPosition = handPosition;
        _this.activeWonder = activeWonder;
        _this.targetPosition = new PIXI.Point();
        _this.visualState = 'full';
        _this.state = { type: 'in_hand', visualState: 'full' };
        _this.configureValidMoves(validMoves);
        _this.create(cardId, true);
        // Dragging
        _this.frontDiv.onmousedown = function (event) {
            if (!_this.interactable)
                return;
            if (event.button !== 0)
                return;
            _this.dragging = {
                offsetx: _this.x - Main.mouseX,
                offsety: _this.y - Main.mouseY
            };
        };
        // Popup
        _this.frontDiv.onmousemove = function () {
            if (_this.visualState === 'flipped' || _this.state.type.startsWith('dragging')) {
                _this.scene.stopPopup(_this);
                return;
            }
            var bounds = _this.bounds;
            _this.scene.updatePopup(_this, _this.x + bounds.left, _this.y + bounds.bottom);
        };
        _this.frontDiv.onmouseleave = function () {
            _this.scene.stopPopup(_this);
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
            var bounds = this.bounds;
            this.frontDiv.style.clipPath = "polygon(" + bounds.left + "px " + bounds.top + "px, " + bounds.right + "px " + bounds.top + "px, " + bounds.right + "px " + bounds.bottom + "px, " + bounds.left + "px " + bounds.bottom + "px)";
            this._width = bounds.right - bounds.left;
            this._height = bounds.bottom - bounds.top;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "bounds", {
        get: function () {
            var left = lerp(this.fullClipRect.left, this.effectClipRect.left, this._effectT) - C.CARD_WIDTH / 2;
            var right = lerp(this.fullClipRect.right, this.effectClipRect.right, this._effectT) - C.CARD_WIDTH / 2;
            var top = lerp(this.fullClipRect.top, this.effectClipRect.top, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT / 2;
            var bottom = lerp(this.fullClipRect.bottom, this.effectClipRect.bottom, this._effectT) - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT / 2;
            return new PIXI.Rectangle(left, top, right - left, bottom - top);
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
    Object.defineProperty(Card.prototype, "checkMarkVisible", {
        get: function () { return this._checkMarkVisible; },
        set: function (value) {
            this._checkMarkVisible = value;
            this.checkMark.style.visibility = value ? 'visible' : 'hidden';
        },
        enumerable: false,
        configurable: true
    });
    Card.prototype.create = function (cardId, drawPayment) {
        this.apiCardId = cardId;
        this.apiCard = Main.gamestate.cards[cardId];
        this.cardResource = Resources.getCard(cardId);
        this.fullClipRect = this.cardResource.fullClipRect;
        this.effectClipRect = this.cardResource.effectClipRect;
        this.div.style.transformOrigin = "left top";
        this.frontDiv = this.div.appendChild(document.createElement('div'));
        this.frontDiv.style.transformOrigin = 'left center';
        var front = this.frontDiv.appendChild(this.cardResource.front);
        front.style.transform = "translate(-50%, -" + (C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT / 2) + "px)";
        this.highlightEffect = this.frontDiv.appendChild(this.drawHighlightEffect());
        var payment = this.frontDiv.appendChild(this.drawPayment());
        payment.style.transform = "translate(-50%, -" + (C.CARD_TITLE_HEIGHT + C.CARD_PAYMENT_HEIGHT + C.CARD_BANNER_HEIGHT / 2) + "px)";
        payment.style.visibility = drawPayment ? 'visible' : 'hidden';
        this.backDiv = this.div.appendChild(document.createElement('div'));
        this.backDiv.style.transformOrigin = 'left center';
        this.highlightFlipped = this.backDiv.appendChild(this.drawHighlightFlipped());
        var back = this.backDiv.appendChild(this.cardResource.back);
        back.style.transform = "translate(-50%, -" + (C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT / 2) + "px)";
        this.checkMark = this.backDiv.appendChild(document.createElement('div'));
        this.checkMark.style.position = 'absolute';
        this.checkMark.style.left = '0%';
        this.checkMark.style.top = C.CARD_HEIGHT / 2 - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT / 2 + "px";
        this.checkMark.appendChild(ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.8));
        this.checkMarkVisible = false;
        this.effectT++;
        this.effectT--;
        this.flippedT++;
        this.flippedT--;
    };
    Card.prototype.destroy = function () {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnCard(this.apiCardId, this.cardResource);
        this.cardResource = null;
    };
    Card.prototype.update = function () {
        var _a, _b;
        if (this.dragging) {
            var stage = this.activeWonder.getClosestStageId(Main.mouseX);
            if (!Main.mouseDown || !this.canBeInteractable()) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    var move = { action: 'play', card: this.apiCardId, index: this.index };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        this.scene.startPaymentDialog(this, move);
                    }
                    else {
                        move.payment = { bank: API.minimalBankPayment(move, Main.gamestate.validMoves) };
                        Main.submitMove(move);
                    }
                    this.select(move);
                }
                else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.mouseX, Main.mouseY)) {
                    var move = { action: 'wonder', card: this.apiCardId, index: this.index, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        this.scene.startPaymentDialog(this, move);
                    }
                    else {
                        move.payment = { bank: (_b = (_a = Main.gamestate.wonders[Main.player].stages[stage]) === null || _a === void 0 ? void 0 : _a.cost) === null || _b === void 0 ? void 0 : _b.gold };
                        Main.submitMove(move);
                    }
                    this.select(move);
                }
                else if (this.allowThrow && this.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
                    var move = { action: 'throw', card: this.apiCardId, index: this.index, payment: {} };
                    Main.submitMove(move);
                    this.select(move);
                }
                else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.dragging = null;
            }
            else {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_play' };
                }
                else if (contains(this.allowBuildStages, stage) && this.activeWonder.getStageRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_wonder' };
                }
                else if (this.allowThrow && this.scene.discardPile.getDiscardRegion().contains(Main.mouseX, Main.mouseY)) {
                    this.state = { type: 'dragging_throw' };
                }
                else {
                    this.state = { type: 'dragging_normal' };
                }
            }
        }
        if (this.state.type === 'in_hand') {
            this.targetPosition.set(this.handPosition.x, this.handPosition.y);
            if (Math.abs(this.y - this.targetPosition.y) < 4)
                this.zIndex = C.Z_INDEX_CARD_HAND;
            this.interactable = this.canBeInteractable();
            this.visualState = this.state.visualState;
        }
        else if (this.state.type === 'dragging_normal') {
            this.targetPosition.set(Main.mouseX + this.dragging.offsetx, Main.mouseY + this.dragging.offsety);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'full';
        }
        else if (this.state.type === 'dragging_play') {
            this.targetPosition.set(Main.mouseX, Main.mouseY);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = this.canBeInteractable();
            this.visualState = 'effect';
        }
        else if (this.state.type === 'dragging_wonder') {
            var stage = this.activeWonder.getClosestStageId(Main.mouseX);
            var stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.targetPosition.set(stagePoint.x, stagePoint.y);
            this.zIndex = C.Z_INDEX_CARD_WONDER;
            this.interactable = this.canBeInteractable();
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'dragging_throw') {
            this.targetPosition.set(Main.mouseX + this.dragging.offsetx, Main.mouseY + this.dragging.offsety);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_play') {
            var effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.targetPosition.set(effectPoint.x, effectPoint.y);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'effect';
        }
        else if (this.state.type === 'locked_wonder') {
            var stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.targetPosition.set(stagePoint.x, stagePoint.y);
            this.zIndex = C.Z_INDEX_CARD_WONDER;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_throw') {
            var discardPoint = this.scene.discardPile.getDiscardLockPoint();
            this.targetPosition.set(discardPoint.x, discardPoint.y);
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'full') {
            this.interactable = false;
            this.visualState = 'full';
        }
        else if (this.state.type === 'effect') {
            this.interactable = false;
            this.visualState = 'effect';
        }
        else if (this.state.type === 'flipped') {
            this.interactable = false;
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'in_hand_moving') {
            this.interactable = false;
            this.visualState = 'flipped';
        }
        this.x = lerp(this.x, this.targetPosition.x, 0.25);
        if (Math.abs(this.x - this.targetPosition.x) < 1)
            this.x = this.targetPosition.x;
        this.y = lerp(this.y, this.targetPosition.y, 0.25);
        if (Math.abs(this.y - this.targetPosition.y) < 1)
            this.y = this.targetPosition.y;
        this.updateVisuals();
    };
    Card.prototype.updateVisuals = function () {
        if (this.visualState === 'effect') {
            this.effectT = lerp(this.effectT, 1, 0.25);
        }
        else {
            this.effectT = lerp(this.effectT, 0, 0.25);
        }
        if (this.visualState === 'flipped') {
            this.flippedT = lerp(this.flippedT, 1, 0.25);
        }
        else {
            this.flippedT = lerp(this.flippedT, 0, 0.25);
        }
        var alpha;
        if (this.state.type.startsWith('locked')) {
            alpha = (Math.sin(Main.time * 8) + 1) / 2;
        }
        else if ((this.state.type === 'effect' || this.state.type === 'flipped') && this.state.justPlayed) {
            alpha = 1;
        }
        else {
            alpha = 0;
        }
        this.highlightEffect.style.boxShadow = "inset 0px 0px 0px " + C.CARD_HIGHLIGHT + "px rgba(255, 0, 0, " + alpha + ")";
        this.highlightEffect.style.visibility = this.visualState === 'effect' ? 'visible' : 'hidden';
        this.highlightFlipped.style.backgroundColor = "rgba(255, 0, 0, " + alpha + ")";
        this.highlightFlipped.style.visibility = this.visualState === 'flipped' ? 'visible' : 'hidden';
    };
    Card.prototype.snap = function () {
        this.update();
        this.effectT = (this.visualState === 'effect') ? 1 : 0;
        this.flippedT = (this.visualState === 'flipped') ? 1 : 0;
        this.snapToTarget();
        this.update();
    };
    Card.prototype.snapToTarget = function () {
        this.x = this.targetPosition.x;
        this.y = this.targetPosition.y;
    };
    Card.prototype.select = function (move) {
        var lastSelectedCard = this.scene.hand.selectedCard;
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
        if (this.state.type.startsWith('dragging'))
            return;
        this.state = { type: 'in_hand', visualState: 'full' };
    };
    Card.prototype.configureValidMoves = function (validMoves) {
        var e_12, _a;
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
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (validMoves_4_1 && !validMoves_4_1.done && (_a = validMoves_4.return)) _a.call(validMoves_4);
            }
            finally { if (e_12) throw e_12.error; }
        }
    };
    Card.prototype.canBeInteractable = function () {
        if (this.scene.isPaymentMenuActive)
            return false;
        if (Main.diffing)
            return false;
        if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow)
            return false;
        return true;
    };
    Card.prototype.addDiscardCountText = function () {
        var discardCountDiv = this.div.appendChild(document.createElement('div'));
        discardCountDiv.style.position = 'absolute';
        discardCountDiv.style.left = '0%';
        discardCountDiv.style.top = C.CARD_HEIGHT / 2 - C.CARD_TITLE_HEIGHT - C.CARD_BANNER_HEIGHT / 2 + "px";
        var discardCount = discardCountDiv.appendChild(document.createElement('p'));
        discardCount.textContent = "" + Main.gamestate.discardedCardCount;
        discardCount.style.fontFamily = "'Courier New', Courier, monospace";
        discardCount.style.fontSize = C.CARD_DISCARD_COUNT_TEXT_SIZE + "px";
        discardCount.style.color = ArtCommon.ageBacksHtml[Main.gamestate.lastDiscardedCardAge];
        discardCount.style.position = 'absolute';
        discardCount.style.transform = 'translate(-50%, -50%)';
    };
    Card.prototype.drawPayment = function () {
        var payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity);
        payment.scale.set(C.CARD_PAYMENT_SCALE);
        payment.position.set(C.CARD_WIDTH + C.CARD_PAYMENT_OFFSET_X, C.CARD_PAYMENT_HEIGHT / 2);
        return render(payment, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT);
    };
    Card.prototype.drawHighlightEffect = function () {
        var highlight = document.createElement('div');
        highlight.style.width = this.cardResource.effectClipRect.width + "px";
        highlight.style.height = this.cardResource.effectClipRect.height + "px";
        highlight.style.transform = 'translate(-50%, -50%)';
        highlight.style.position = 'absolute';
        highlight.style.pointerEvents = 'none';
        return highlight;
    };
    Card.prototype.drawHighlightFlipped = function () {
        var highlight = document.createElement('div');
        highlight.style.width = C.CARD_WIDTH + 2 * C.CARD_HIGHLIGHT + "px";
        highlight.style.height = C.CARD_HEIGHT + 2 * C.CARD_HIGHLIGHT + "px";
        highlight.style.borderRadius = C.CARD_CORNER_RADIUS + "px";
        highlight.style.transform = "translate(-50%, " + (-C.CARD_BANNER_HEIGHT / 2 - C.CARD_TITLE_HEIGHT - C.CARD_HIGHLIGHT) + "px)";
        highlight.style.position = 'absolute';
        highlight.style.pointerEvents = 'none';
        return highlight;
    };
    Card.flippedCardForAge = function (scene, age, justPlayed) {
        var card = new Card(scene, -age, 0, undefined, undefined, []);
        card.state = { type: 'flipped', justPlayed: justPlayed };
        card.snap();
        return card;
    };
    return Card;
}(GameElement));
var CardForList = /** @class */ (function (_super) {
    __extends(CardForList, _super);
    function CardForList(scene, cardId, count) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.apiCardId = cardId;
        _this.apiCard = Main.gamestate.cards[cardId];
        _this.count = count;
        _this.create();
        // Popup
        _this.div.onmousemove = function () {
            if (Main.scene.isCurrentlyDragging()) {
                _this.scene.stopPopup(_this);
                return;
            }
            _this.scene.updatePopup(_this, _this.x - C.CARD_LIST_CARD_WIDTH / 2, _this.y + C.CARD_LIST_CARD_HEIGHT / 2);
        };
        _this.div.onmouseleave = function () {
            _this.scene.stopPopup(_this);
        };
        return _this;
    }
    CardForList.prototype.update = function () {
    };
    CardForList.prototype.create = function () {
        this.div.appendChild(this.draw());
        this.div.appendChild(this.drawInfo());
    };
    CardForList.prototype.destroy = function () {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
    };
    CardForList.prototype.draw = function () {
        var cardForList = new PIXI.Container();
        cardForList.addChild(Shapes.filledRect(0, 0, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT, ArtCommon.cardBannerForColor(this.apiCard.color)));
        var effectContainer = new PIXI.Container();
        effectContainer.addChild(ArtCommon.getShadowForEffects(this.apiCard.effects, 'dark'));
        effectContainer.addChild(ArtCommon.getArtForEffects(this.apiCard.effects));
        effectContainer.scale.set(C.CARD_LIST_EFFECT_SCALE);
        effectContainer.position.set(C.CARD_LIST_CARD_WIDTH / 2, C.CARD_LIST_CARD_HEIGHT / 2);
        cardForList.addChild(effectContainer);
        return render(cardForList, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT);
    };
    CardForList.prototype.drawInfo = function () {
        var _a, _b;
        var info = document.createElement('div');
        info.style.position = 'absolute';
        if (this.count > 1) {
            info.appendChild(this.infoText(this.count + " \u00D7", '-60px', '0px'));
        }
        var resourceCost = ((_a = this.apiCard.cost) === null || _a === void 0 ? void 0 : _a.resources) || [];
        var goldCost = ((_b = this.apiCard.cost) === null || _b === void 0 ? void 0 : _b.gold) || 0;
        if (this.apiCard.cost) {
            var currentX = 70;
            var _loop_1 = function (i) {
                var resource = info.appendChild(document.createElement('div'));
                var resourceArt = new PIXI.Container();
                resourceArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.resource(resourceCost[i]); }, 'light'));
                resourceArt.addChild(ArtCommon.resource(resourceCost[i]));
                resource.appendChild(ArtCommon.domElementForArt(resourceArt, 1, 10));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = currentX + "px";
                resource.style.top = "0px";
                currentX += 22;
            };
            for (var i = 0; i < resourceCost.length; i++) {
                _loop_1(i);
            }
            if (goldCost > 0) {
                var gold = info.appendChild(document.createElement('div'));
                var goldArt = new PIXI.Container();
                goldArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.gold(goldCost); }, 'light'));
                goldArt.addChild(ArtCommon.gold(goldCost));
                gold.appendChild(ArtCommon.domElementForArt(goldArt, 1, 10));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = currentX + "px";
                gold.style.top = "0px";
                currentX += 22;
            }
        }
        return info;
    };
    CardForList.prototype.infoText = function (text, xs, ys) {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = C.CARD_LIST_INFO_TEXT_SIZE + "px";
        p.style.color = C.CARD_LIST_INFO_TEXT_COLOR;
        p.style.transform = 'translate(-100%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    };
    return CardForList;
}(GameElement));
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super.call(this) || this;
        _this.width = 400;
        _this.div.className = 'popup';
        return _this;
    }
    Popup.prototype.addToGame = function (gameDiv) {
        var _this = this;
        if (gameDiv === void 0) { gameDiv = Main.game; }
        this.alpha = 0;
        _super.prototype.addToGame.call(this, gameDiv);
        this.currentScript = Main.scriptManager.runScript(S.chain(S.wait(0.7), S.call(function () {
            _this.div.appendChild(_this.draw());
        }), S.doOverTime(0.1, function (t) {
            _this.alpha = t;
        })));
    };
    Popup.prototype.removeFromGame = function () {
        var _this = this;
        if (this.currentScript)
            this.currentScript.stop();
        var startAlpha = this.alpha;
        this.currentScript = Main.scriptManager.runScript(S.chain(S.doOverTime(0.1, function (t) {
            _this.alpha = (1 - t) * startAlpha;
        }), S.call(function () {
            _super.prototype.removeFromGame.call(_this);
        })));
    };
    Popup.prototype.getSource = function () {
        return undefined;
    };
    Popup.prototype.draw = function () {
        return undefined;
    };
    Popup.prototype.infoText = function (text, xs, ys) {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = C.CARD_INFO_TEXT_SIZE + "px";
        p.style.color = C.CARD_INFO_TEXT_COLOR;
        p.style.transform = 'translate(0%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    };
    Popup.prototype.cardName = function (card) {
        return "<span style=\"color:" + ArtCommon.cardBannerForColorHtml(card.color) + "; font-weight:bold\">" + card.name + "</span>";
    };
    return Popup;
}(GameElement));
/// <reference path="./popup.ts" />
var CardInfoPopup = /** @class */ (function (_super) {
    __extends(CardInfoPopup, _super);
    function CardInfoPopup(card) {
        var _this = _super.call(this) || this;
        _this.card = card;
        _this.div.className = 'popup';
        return _this;
    }
    CardInfoPopup.prototype.getSource = function () {
        return this.card;
    };
    CardInfoPopup.prototype.draw = function () {
        var e_13, _a, e_14, _b;
        var _this = this;
        var _c, _d;
        var box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';
        var currentY = 16;
        // Name
        box.appendChild(this.infoText(this.cardName(this.card.apiCard), '10px', currentY + "px"));
        currentY += 24;
        // Cost
        var resourceCost = ((_c = this.card.apiCard.cost) === null || _c === void 0 ? void 0 : _c.resources) || [];
        var goldCost = ((_d = this.card.apiCard.cost) === null || _d === void 0 ? void 0 : _d.gold) || 0;
        var isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText("Cost:" + (isFree ? ' None' : ''), '10px', currentY + "px"));
        if (this.card.apiCard.cost) {
            var currentX = 60;
            var _loop_2 = function (i) {
                var resource = box.appendChild(document.createElement('div'));
                var resourceArt = new PIXI.Container();
                resourceArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.resource(resourceCost[i]); }, 'dark'));
                resourceArt.addChild(ArtCommon.resource(resourceCost[i]));
                resource.appendChild(ArtCommon.domElementForArt(resourceArt, 1, 10));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = currentX + "px";
                resource.style.top = currentY + "px";
                currentX += 22;
            };
            for (var i = 0; i < resourceCost.length; i++) {
                _loop_2(i);
            }
            if (goldCost > 0) {
                var gold = box.appendChild(document.createElement('div'));
                var goldArt = new PIXI.Container();
                goldArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.gold(goldCost); }, 'dark'));
                goldArt.addChild(ArtCommon.gold(goldCost));
                gold.appendChild(ArtCommon.domElementForArt(goldArt, 1, 10));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = currentX + "px";
                gold.style.top = currentY + "px";
                currentX += 22;
            }
            var chain = this.card.apiCard.cost.chain;
            if (chain) {
                var cardsProducingChain = API.getCardsProducingChain(Main.gamestate, chain);
                var cardNames = cardsProducingChain.map(function (card) { return _this.cardName(card); }).join(', ');
                var chainText = this.infoText("(or free chain from " + cardNames + ")", currentX - 4 + "px", currentY + "px");
                chainText.style.fontSize = '10px';
                box.appendChild(chainText);
            }
        }
        currentY += 24;
        // Effects
        box.appendChild(this.infoText('Effects:', '10px', currentY + "px"));
        currentY += 24;
        var effects = this.card.apiCard.effects;
        for (var i = 0; i < effects.length; i++) {
            var effect = box.appendChild(document.createElement('div'));
            var effectArt = new PIXI.Container();
            effectArt.addChild(ArtCommon.getShadowForEffects([effects[i]], 'dark'));
            effectArt.addChild(ArtCommon.getArtForEffects([effects[i]]));
            effect.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
            effect.style.transform = 'scale(0.2)';
            effect.style.position = 'absolute';
            effect.style.left = 10 + effectArt.width / 10 + "px";
            effect.style.top = currentY + "px";
            var description = this.infoText(getDescriptionForEffect(effects[i]), 20 + effectArt.width / 5 + "px", currentY + "px");
            description.style.fontSize = C.CARD_INFO_EFFECT_DESCRIPTION_SIZE + "px";
            description.style.marginRight = '10px';
            box.appendChild(description);
            currentY += 24;
        }
        // Chains
        var chains = this.card.apiCard.chains;
        if (chains && chains.length > 0) {
            currentY += 16;
            box.appendChild(this.infoText('Future chains:', '10px', currentY + "px"));
            currentY += 16;
            try {
                for (var chains_1 = __values(chains), chains_1_1 = chains_1.next(); !chains_1_1.done; chains_1_1 = chains_1.next()) {
                    var chain = chains_1_1.value;
                    var cardsConsumingChain = API.getCardsConsumingChain(Main.gamestate, chain);
                    try {
                        for (var cardsConsumingChain_1 = (e_14 = void 0, __values(cardsConsumingChain)), cardsConsumingChain_1_1 = cardsConsumingChain_1.next(); !cardsConsumingChain_1_1.done; cardsConsumingChain_1_1 = cardsConsumingChain_1.next()) {
                            var card = cardsConsumingChain_1_1.value;
                            box.appendChild(this.infoText("- " + this.cardName(card), '18px', currentY + "px"));
                            currentY += 16;
                        }
                    }
                    catch (e_14_1) { e_14 = { error: e_14_1 }; }
                    finally {
                        try {
                            if (cardsConsumingChain_1_1 && !cardsConsumingChain_1_1.done && (_b = cardsConsumingChain_1.return)) _b.call(cardsConsumingChain_1);
                        }
                        finally { if (e_14) throw e_14.error; }
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (chains_1_1 && !chains_1_1.done && (_a = chains_1.return)) _a.call(chains_1);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        box.style.width = this.width + "px";
        box.style.height = currentY + "px";
        return box;
    };
    return CardInfoPopup;
}(Popup));
var CardListScene = /** @class */ (function () {
    function CardListScene() {
        this.cards = [];
    }
    CardListScene.prototype.update = function () {
        var e_15, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.update();
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_15) throw e_15.error; }
        }
    };
    CardListScene.prototype.create = function () {
        var e_16, _a;
        var deck = Main.gamestate.deck;
        var maxY = 0;
        for (var age = 1; age <= 3; age++) {
            var x = (age - 2) * C.CARD_LIST_CARD_DX;
            var y = 0;
            try {
                for (var _b = (e_16 = void 0, __values(deck[age])), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cardInfo = _c.value;
                    var card = new CardForList(this, cardInfo.id, cardInfo.count);
                    card.x = x;
                    card.y = y;
                    card.addToGame(Main.cardList);
                    y += C.CARD_LIST_CARD_DY;
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_16) throw e_16.error; }
            }
            maxY = Math.max(maxY, y);
        }
        Main.cardList.style.height = maxY + "px";
    };
    CardListScene.prototype.destroy = function () {
    };
    CardListScene.prototype.updatePopup = function (source, x, y) {
        if (this.popup && this.popup.getSource() !== source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
        if (!this.popup) {
            this.popup = new CardInfoPopup(source);
            this.popup.zIndex = C.Z_INDEX_CARD_POPUP;
            this.popup.addToGame(Main.cardList);
        }
        this.popup.x = clamp(x, -window.innerWidth / 2 + window.pageXOffset, window.innerWidth / 2 + window.pageXOffset - this.popup.width);
        this.popup.y = y;
    };
    CardListScene.prototype.stopPopup = function (source) {
        if (this.popup && this.popup.getSource() === source) {
            this.popup.removeFromGame();
        }
    };
    CardListScene.prototype.headerText = function (text, xs, ys) {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = C.CARD_LIST_HEADER_TEXT_SIZE + "px";
        p.style.color = C.CARD_LIST_HEADER_TEXT_COLOR;
        p.style.transform = 'translate(0%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    };
    return CardListScene;
}());
var Scene = /** @class */ (function () {
    function Scene() {
    }
    Scene.prototype.update = function () {
    };
    Scene.prototype.create = function () {
    };
    Scene.prototype.destroy = function () {
    };
    Scene.prototype.updatePopup = function (source, x, y) {
        if (this.popup && this.popup.getSource() !== source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
        if (!this.popup) {
            if (source instanceof Card || source instanceof CardForList) {
                this.popup = new CardInfoPopup(source);
            }
            else if ('name' in source) {
                this.popup = new StartingEffectsInfoPopup(source);
            }
            else {
                this.popup = new StageInfoPopup(source);
            }
            this.popup.zIndex = C.Z_INDEX_CARD_POPUP;
            this.popup.addToGame();
        }
        this.popup.x = clamp(x, -window.innerWidth / 2 + window.pageXOffset, window.innerWidth / 2 + window.pageXOffset - this.popup.width);
        this.popup.y = y;
    };
    Scene.prototype.stopPopup = function (source) {
        if (this.popup && this.popup.getSource() === source) {
            this.popup.removeFromGame();
            this.popup = null;
        }
    };
    Scene.prototype.getWonderPosition = function (index, additionalY) {
        if (additionalY === void 0) { additionalY = 0; }
        var p = Main.gamestate.players.indexOf(Main.player);
        var l = mod(p - 1, Main.gamestate.players.length);
        var r = mod(p + 1, Main.gamestate.players.length);
        if (index === p)
            return new PIXI.Point(0, C.WONDER_TOP_Y + additionalY);
        var i;
        for (i = 0; i < Math.floor((Main.gamestate.players.length - 1) / 2); i++) {
            var dx = (Main.gamestate.players.length === 7 && i === 2) ? C.WONDER_OTHERS_DX_LAST_7P : C.WONDER_OTHERS_DX;
            var y = Main.gamestate.players.length === 4 ? C.WONDER_OTHERS_Y_4P : C.WONDER_OTHERS_Y;
            if (index === l)
                return new PIXI.Point(-dx, y + C.WONDER_OTHERS_DY * i + additionalY);
            if (index === r)
                return new PIXI.Point(dx, y + C.WONDER_OTHERS_DY * i + additionalY);
            l = mod(l - 1, Main.gamestate.players.length);
            r = mod(r + 1, Main.gamestate.players.length);
        }
        if (Main.gamestate.players.length % 2 === 0) {
            var y = Main.gamestate.players.length === 4 ? C.WONDER_LAST_Y_4P : C.WONDER_LAST_Y_6P;
            if (index === l)
                return new PIXI.Point(0, y + additionalY);
        }
        console.log("Wonder position index " + index + " is out of bounds");
        return undefined;
    };
    Scene.prototype.isCurrentlyDragging = function () {
        return false;
    };
    return Scene;
}());
/// <reference path="./scene.ts" />
var ChooseWonderScene = /** @class */ (function (_super) {
    __extends(ChooseWonderScene, _super);
    function ChooseWonderScene() {
        var _this = _super.call(this) || this;
        _this.wonderChoices = [];
        return _this;
    }
    Object.defineProperty(ChooseWonderScene.prototype, "topWonderChoices", {
        get: function () { return this.wonderChoices[Main.gamestate.players.indexOf(Main.player)]; },
        enumerable: false,
        configurable: true
    });
    ChooseWonderScene.prototype.update = function () {
    };
    ChooseWonderScene.prototype.create = function () {
        var gamestate = Main.gamestate;
        var players = Main.gamestate.players;
        var wonderChoices = Main.gamestate.wonderChoices;
        this.wonderChoices = players.map(function (player) { return wonderChoices[player].map(function (wc) { return undefined; }); });
        var p = players.indexOf(Main.player);
        var l = mod(p - 1, players.length);
        var r = mod(p + 1, players.length);
        var additionalY = C.WONDER_SIDE_CHOICE_TOP_ADJUST_DY;
        var finalY = C.WONDER_TOP_Y;
        for (var w = 0; w < wonderChoices[players[p]].length; w++) {
            this.wonderChoices[p][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[p]][w], w, players[p]);
            this.wonderChoices[p][w].setPosition(this.getWonderPosition(p, w * C.WONDER_SIDE_CHOICE_DY + additionalY));
            this.wonderChoices[p][w].addToGame();
            finalY = this.wonderChoices[p][w].y;
        }
        var i;
        for (i = 1; i < Math.floor((players.length - 1) / 2 + 1); i++) {
            for (var w = 0; w < wonderChoices[players[l]].length; w++) {
                this.wonderChoices[l][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[l]][w], w, players[l]);
                this.wonderChoices[l][w].setPosition(this.getWonderPosition(l, w * C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[l][w].addToGame();
                finalY = this.wonderChoices[l][w].y;
            }
            for (var w = 0; w < wonderChoices[players[r]].length; w++) {
                this.wonderChoices[r][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[r]][w], w, players[r]);
                this.wonderChoices[r][w].setPosition(this.getWonderPosition(r, w * C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[r][w].addToGame();
                finalY = this.wonderChoices[r][w].y;
            }
            var maxIndex = Math.max(wonderChoices[players[l]].length, wonderChoices[players[r]].length);
            additionalY += C.WONDER_SIDE_CHOICE_DY * (maxIndex - 1) + C.WONDER_SIDE_CHOICE_GROUP_ADJUST_DY;
            l = mod(l - 1, gamestate.players.length);
            r = mod(r + 1, gamestate.players.length);
        }
        if (players.length % 2 === 0) {
            for (var w = 0; w < wonderChoices[players[l]].length; w++) {
                this.wonderChoices[l][w] = new WonderBoardForChoose(this, gamestate.wonderChoices[players[l]][w], w, players[l]);
                this.wonderChoices[l][w].setPosition(this.getWonderPosition(l, w * C.WONDER_SIDE_CHOICE_DY + additionalY));
                this.wonderChoices[l][w].addToGame();
                finalY = this.wonderChoices[l][w].y;
            }
            additionalY += C.WONDER_SIDE_CHOICE_DY * (wonderChoices[players[l]].length - 1) + C.WONDER_SIDE_CHOICE_GROUP_ADJUST_DY;
        }
        var padding = gamestate.players.length === 3 ? C.GAME_HEIGHT_PADDING_3P : C.GAME_HEIGHT_PADDING_4567P;
        Main.game.style.height = finalY + C.WONDER_BOARD_HEIGHT / 2 + padding + "px";
        if (gamestate.playerData[Main.player].currentMove) {
            this.selectSide(gamestate.playerData[Main.player].currentMove.side);
        }
    };
    ChooseWonderScene.prototype.destroy = function () {
        var e_17, _a, e_18, _b;
        try {
            for (var _c = __values(this.wonderChoices), _d = _c.next(); !_d.done; _d = _c.next()) {
                var wonderChoice = _d.value;
                try {
                    for (var wonderChoice_1 = (e_18 = void 0, __values(wonderChoice)), wonderChoice_1_1 = wonderChoice_1.next(); !wonderChoice_1_1.done; wonderChoice_1_1 = wonderChoice_1.next()) {
                        var wonder = wonderChoice_1_1.value;
                        wonder.destroy();
                    }
                }
                catch (e_18_1) { e_18 = { error: e_18_1 }; }
                finally {
                    try {
                        if (wonderChoice_1_1 && !wonderChoice_1_1.done && (_b = wonderChoice_1.return)) _b.call(wonderChoice_1);
                    }
                    finally { if (e_18) throw e_18.error; }
                }
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_17) throw e_17.error; }
        }
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    };
    ChooseWonderScene.prototype.selectSide = function (side) {
        var topWonderChoices = this.topWonderChoices;
        for (var i = 0; i < topWonderChoices.length; i++) {
            if (i == side)
                topWonderChoices[i].select();
            else
                topWonderChoices[i].deselect();
        }
    };
    return ChooseWonderScene;
}(Scene));
var C = /** @class */ (function () {
    function C() {
    }
    C.Z_INDEX_DISCARD_PILE = -10;
    C.Z_INDEX_DISCARD_CARDS = -9;
    C.Z_INDEX_CARD_HAND = 0;
    C.Z_INDEX_CARD_FLANK = 0;
    C.Z_INDEX_CARD_WONDER = 9;
    C.Z_INDEX_WONDER = 10;
    C.Z_INDEX_CARD_PLAYED = 11;
    C.Z_INDEX_CARD_MOVING = 12;
    C.Z_INDEX_CARD_DRAGGING = 100;
    C.Z_INDEX_MILITARY_OVERLAY = 101;
    C.Z_INDEX_MILITARY_TOKEN = 102;
    C.Z_INDEX_GOLD_COIN = 102;
    C.Z_INDEX_PAYMENT_DIALOG = 1000;
    C.Z_INDEX_CARD_POPUP = 1001;
    C.GAME_HEIGHT_PADDING_3P = 400;
    C.GAME_HEIGHT_PADDING_4567P = 200;
    C.ANIMATION_TURN_REVEAL_TIME = 1;
    C.ANIMATION_TURN_PLAY_TIME = 1;
    C.ANIMATION_MILITARY_FADE_TIME = 0.5;
    C.ANIMATION_MILITARY_WAIT_TIME = 1;
    C.ANIMATION_TOKEN_DISTRIBUTE_TIME = 1;
    C.ANIMATION_GOLD_COIN_MOVE_TIME = 1;
    C.ERROR_BG_COLOR = '#FF0000';
    C.OK_BG_COLOR = '#FFFFFF';
    C.ERROR_TEXT_COLOR = '#FFFFFF';
    C.OK_TEXT_COLOR = '#000000';
    C.ACTION_BUTTON_Y = 220;
    C.ACTION_BUTTON_WIDTH = 100;
    C.ACTION_BUTTON_HEIGHT = 40;
    C.ACTION_BUTTON_CORNER_RADIUS = 8;
    C.CARD_WIDTH = 100;
    C.CARD_HEIGHT = 150;
    C.CARD_CORNER_RADIUS = 8;
    C.CARD_BORDER = 3;
    C.CARD_TITLE_HEIGHT = 8;
    C.CARD_TITLE_Y = 3.75;
    C.CARD_TITLE_SCALE = 0.08;
    C.CARD_TITLE_COLOR = 0xFFFFFF;
    C.CARD_BANNER_HEIGHT = 42;
    C.CARD_EFFECT_SCALE = 0.24;
    C.CARD_EFFECT_CLIP_PADDING = 4.5;
    C.CARD_EFFECT_HEIGHT = 24;
    C.CARD_COST_X = 12.375;
    C.CARD_COST_Y = C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT;
    C.CARD_COST_SCALE = 0.13;
    C.CARD_COST_PADDING = 6;
    C.CARD_PAYMENT_HEIGHT = 24;
    C.CARD_PAYMENT_SCALE = 0.15;
    C.CARD_PAYMENT_OFFSET_X = -8.25;
    C.CARD_HIGHLIGHT = 3;
    C.CARD_DISCARD_COUNT_TEXT_SIZE = 36;
    C.CARD_CENTER_OFFSET_Y = 45;
    C.HAND_Y = 64;
    C.HAND_CARD_DX = C.CARD_WIDTH + 3;
    C.HAND_FLANK_DX = 40;
    C.HAND_FLANK_DY = -100;
    C.HAND_FLANK_SCALE = 0.5;
    C.WONDER_TOP_Y = 440;
    C.WONDER_OTHERS_Y = 500;
    C.WONDER_OTHERS_Y_4P = 720;
    C.WONDER_OTHERS_DX = 470;
    C.WONDER_OTHERS_DY = 330;
    C.WONDER_OTHERS_DX_LAST_7P = 270;
    C.WONDER_LAST_Y_4P = 1040;
    C.WONDER_LAST_Y_6P = 1120;
    C.WONDER_BOARD_WIDTH = 450;
    C.WONDER_BOARD_HEIGHT = 225;
    C.WONDER_BOARD_CORNER_RADIUS = 22.5;
    C.WONDER_BOARD_BORDER = 3;
    C.WONDER_STARTING_EFFECTS_SCALE = 0.24;
    C.WONDER_STARTING_EFFECTS_PADDING = 6;
    C.WONDER_STAGE_MIDDLE_2 = 300;
    C.WONDER_STAGE_MIDDLE_134 = 225;
    C.WONDER_STAGE_DX_4 = 110;
    C.WONDER_STAGE_DX_123 = 144;
    C.WONDER_STAGE_WIDTH = 108;
    C.WONDER_STAGE_HEIGHT = 48;
    C.WONDER_STAGE_CORNER_RADIUS = 13.5;
    C.WONDER_STAGE_EFFECT_SCALE = 0.21;
    C.WONDER_STAGE_COST_OFFSET_X = 7.5;
    C.WONDER_STAGE_COST_OFFSET_Y = 45;
    C.WONDER_STAGE_COST_PADDING = 4.5;
    C.WONDER_STAGE_COST_BORDER = 2.25;
    C.WONDER_STAGE_COST_SCALE = 0.08;
    C.WONDER_STAGE_PAYMENT_OFFSET_X = -7.5;
    C.WONDER_STAGE_PAYMENT_OFFSET_Y = -22;
    C.WONDER_STAGE_PAYMENT_SCALE = 0.12;
    C.WONDER_BUILT_STAGE_OFFSET_Y = -100;
    C.WONDER_PAYMENT_HEIGHT = 24;
    C.WONDER_RESOURCE_ROLL_OFFSET_Y = 22.5;
    C.WONDER_RED_ROLL_X = -150;
    C.WONDER_RED_ROLL_Y = C.WONDER_BOARD_BORDER + C.CARD_EFFECT_CLIP_PADDING + C.CARD_EFFECT_HEIGHT / 2;
    C.WONDER_RED_ROLL_MAX_X = 110;
    C.WONDER_YELLOW_ROLL_Y = -18;
    C.WONDER_PURPLE_ROLL_Y = 18;
    C.WONDER_BLUE_ROLL_Y = -18;
    C.WONDER_GREEN_ROLL_Y = 18;
    C.WONDER_OVERFLOW_ROLL_OFFSET_Y = C.WONDER_RESOURCE_ROLL_OFFSET_Y + 38;
    C.WONDER_SIDEBAR_NAME_X = -13.5;
    C.WONDER_SIDEBAR_NAME_Y = 18;
    C.WONDER_SIDEBAR_NAME_SIZE = 15;
    C.WONDER_SIDEBAR_GOLD_COIN_SCALE = 0.15;
    C.WONDER_SIDEBAR_GOLD_COIN_X = -21;
    C.WONDER_SIDEBAR_GOLD_COIN_Y = 42;
    C.WONDER_SIDEBAR_GOLD_TEXT_X = -33;
    C.WONDER_SIDEBAR_GOLD_TEXT_Y = 42;
    C.WONDER_SIDEBAR_GOLD_TEXT_SIZE = 15;
    C.WONDER_SIDEBAR_POINTS_WREATH_SCALE = 0.15;
    C.WONDER_SIDEBAR_POINTS_WREATH_X = -66;
    C.WONDER_SIDEBAR_POINTS_WREATH_Y = 42;
    C.WONDER_SIDEBAR_POINTS_TEXT_X = -78;
    C.WONDER_SIDEBAR_POINTS_TEXT_Y = 42;
    C.WONDER_SIDEBAR_POINTS_TEXT_SIZE = 15;
    C.WONDER_SIDEBAR_CHECKMARK_SCALE = 0.15;
    C.WONDER_SIDEBAR_CHECKMARK_X = -108;
    C.WONDER_SIDEBAR_CHECKMARK_Y = 39;
    C.WONDER_SIDEBAR_TOKENS_X = -21;
    C.WONDER_SIDEBAR_TOKENS_DX = -18;
    C.WONDER_SIDEBAR_TOKENS_Y = 63;
    C.WONDER_SIDE_CHOICE_DY = C.WONDER_BOARD_HEIGHT + 10;
    C.WONDER_SIDE_CHOICE_TOP_ADJUST_DY = -C.WONDER_SIDE_CHOICE_DY;
    C.WONDER_SIDE_CHOICE_GROUP_ADJUST_DY = -50;
    C.WONDER_OVERLAY_COLOR_NEUTRAL = 0xFFFFFF;
    C.WONDER_OVERLAY_COLOR_VICTORY = 0x80FF80;
    C.WONDER_OVERLAY_COLOR_DEFEAT = 0xFF8080;
    C.WONDER_OVERLAY_ALPHA = 0.7;
    C.WONDER_OVERLAY_SHIELD_X = -57;
    C.WONDER_OVERLAY_SHIELD_SCALE = 0.75;
    C.WONDER_OVERLAY_TEXT_SIZE = 75;
    C.WONDER_OVERLAY_TEXT_COLOR = '#FF0000';
    C.CARD_INFO_TEXT_COLOR = '#000000';
    C.CARD_INFO_TEXT_SIZE = 12;
    C.CARD_INFO_EFFECT_DESCRIPTION_SIZE = 10;
    C.TOKEN_SCALE = 0.15;
    C.GOLD_COIN_SCALE = 0.225;
    C.DISCARD_PILE_X = 0;
    C.DISCARD_PILE_Y = 720;
    C.DISCARD_PILE_AREA_WIDTH = 200;
    C.DISCARD_PILE_AREA_HEIGHT = 240;
    C.DISCARD_PILE_AREA_CORNER_RADIUS = 8;
    C.DISCARD_PILE_AREA_BORDER = 3;
    C.DISCARD_PILE_TITLE_Y = 20;
    C.DISCARD_PILE_TITLE_SCALE = 0.2;
    C.DISCARD_PILE_TITLE_TEXT = "Discard";
    C.PAYMENT_DIALOG_OFFSET_X = -512;
    C.PAYMENT_DIALOG_OFFSET_Y = -330;
    C.PAYMENT_DIALOG_WIDTH = 375;
    C.PAYMENT_DIALOG_EXTRA_HEIGHT = 60;
    C.PAYMENT_DIALOG_CORNER_RADIUS = 8;
    C.PAYMENT_DIALOG_COLOR = '#FFFFFF';
    C.PAYMENT_DIALOG_TITLE = "Payment";
    C.PAYMENT_DIALOG_TITLE_SIZE = 18;
    C.PAYMENT_DIALOG_TITLE_PADDING = 12;
    C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 20;
    C.PAYMENT_DIALOG_PAYMENTS_DY = 37.5;
    C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE = 12;
    C.PAYMENT_DIALOG_PAY_BUTTON_WIDTH = 36;
    C.PAYMENT_DIALOG_PAY_BUTTON_HEIGHT = 24;
    C.PAYMENT_DIALOG_PAY_BUTTON_COLOR = '#000088';
    C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_X = 15;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_Y = 15;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_COLOR = 0x000000;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE = 0.15;
    C.END_SCREEN_PLACEMENTS_Y = 50;
    C.END_SCREEN_NAMES_Y = 80;
    C.END_SCREEN_ELOS_Y = 105;
    C.END_SCREEN_POINTS_Y = 145;
    C.END_SCREEN_POINTS_DX = 110;
    C.END_SCREEN_POINTS_DY = 37.5;
    C.END_SCREEN_SYMBOL_SIZE = 24;
    C.END_SCREEN_TEXT_SIZE = 18;
    C.END_SCREEN_ELO_TEXT_SIZE = 12;
    C.END_SCREEN_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_HEADER_TEXT_SIZE = 24;
    C.CARD_LIST_HEADER_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_CARD_WIDTH = 96;
    C.CARD_LIST_CARD_HEIGHT = 40;
    C.CARD_LIST_EFFECT_SCALE = 0.24;
    C.CARD_LIST_INFO_TEXT_SIZE = 16;
    C.CARD_LIST_INFO_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_CARD_DX = 400;
    C.CARD_LIST_CARD_DY = C.CARD_LIST_CARD_HEIGHT;
    C.SORT_CMP_RESOURCES = function (card1, card2) {
        if (card1.apiCard.color === 'brown' && card2.apiCard.color === 'grey')
            return -1;
        if (card1.apiCard.color === 'grey' && card2.apiCard.color === 'brown')
            return 1;
        return 0;
    };
    C.SORT_CMP_SCIENCE = function (card1, card2) {
        var symbol1 = API.getScienceSymbol(card1.apiCard);
        var symbol2 = API.getScienceSymbol(card2.apiCard);
        if (symbol1 === symbol2)
            return 0;
        if (symbol1 === 'compass')
            return -1;
        if (symbol2 === 'compass')
            return 1;
        if (symbol1 === 'gear')
            return -1;
        if (symbol2 === 'gear')
            return 1;
        return 0;
    };
    return C;
}());
var DiscardPile = /** @class */ (function (_super) {
    __extends(DiscardPile, _super);
    function DiscardPile() {
        var _this = _super.call(this) || this;
        _this.div.appendChild(Resources.DISCARD_PILE);
        _this.zIndex = C.Z_INDEX_DISCARD_PILE;
        return _this;
    }
    DiscardPile.prototype.getDiscardRegion = function () {
        return new PIXI.Rectangle(this.x - C.DISCARD_PILE_AREA_WIDTH / 2, this.y - C.DISCARD_PILE_AREA_HEIGHT / 2, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
    };
    DiscardPile.prototype.getDiscardLockPoint = function () {
        return new PIXI.Point(this.x, this.y - C.CARD_CENTER_OFFSET_Y);
    };
    return DiscardPile;
}(GameElement));
function getDescriptionForEffect(effect) {
    if (effect.type === 'resource') {
        return "Gives " + effect.resource + " each turn";
    }
    else if (effect.type === 'multi_resource') {
        return "Gives one of " + effect.resources + " each turn";
    }
    else if (effect.type === 'shield') {
        return "Military shield";
    }
    else if (effect.type === 'science') {
        return "Science symbol";
    }
    else if (effect.type === 'points') {
        return effect.points + " VP";
    }
    else if (effect.type === 'gold') {
        return effect.gold + " gold";
    }
    else if (effect.type === 'trading_post') {
        return "Pay 1 gold instead of 2 for brown resources traded from your " + (effect.direction === 'neg' ? 'left' : 'right') + " neighbor";
    }
    else if (effect.type === 'marketplace') {
        return "Pay 1 gold instead of 2 for grey resources traded from either neighbor";
    }
    else if (effect.type === 'gold_for_cards') {
        return effect.gold_per_card + " gold for each " + effect.color + " card played by you or your neighbors";
    }
    else if (effect.type === 'gold_and_points_for_cards') {
        return effect.gold_per_card + " gold and " + effect.points_per_card + " VP for each " + effect.color + " card played by you";
    }
    else if (effect.type === 'gold_and_points_for_stages') {
        return effect.gold_per_stage + " gold and " + effect.points_per_stage + " VP for each wonder stage you have built";
    }
    else if (effect.type === 'points_for_cards') {
        return effect.points_per_card + " VP for each " + effect.color + " card played by your neighbors";
    }
    else if (effect.type === 'points_for_stages') {
        return effect.points_per_stage + " VP for each wonder stage you or your neighbors have built";
    }
    else if (effect.type === 'points_for_finished_wonder') {
        return effect.points + " VP if you build all of your wonder stages";
    }
    else if (effect.type === 'points_for_self_cards') {
        return effect.points_per_card + " VP for each " + effect.color + " card played by you";
    }
    else if (effect.type === 'multi_science') {
        return "At the end of the game, becomes the most highest value science symbol for you";
    }
    else if (effect.type === 'play_last_card') {
        return "You may play your last card instead of discarding it at the end of each age";
    }
    else if (effect.type === 'build_from_discard') {
        return "Play one card from the discard pile for free";
    }
    else if (effect.type === 'build_free_first_color') {
        return "You may ignore the cost of any card, provided you have not already played one of the same color";
    }
    else if (effect.type === 'build_free_first_card') {
        return "You may ignore the cost of any card in your first hand of each age";
    }
    else if (effect.type === 'build_free_last_card') {
        return "You may ignore the cost of any card in your last hand of each age";
    }
    console.error('Effect type not found:', effect.type);
    return "Description not found";
}
var EndScreen = /** @class */ (function () {
    function EndScreen() {
    }
    EndScreen.prototype.create = function () {
        var players = Main.gamestate.players;
        players.sort(function (p1, p2) {
            var points1 = Main.gamestate.playerData[p1].pointsDistribution.total;
            var points2 = Main.gamestate.playerData[p2].pointsDistribution.total;
            if (points1 !== points2)
                return points2 - points1;
            var gold1 = Main.gamestate.playerData[p1].gold;
            var gold2 = Main.gamestate.playerData[p2].gold;
            if (gold1 !== gold2)
                return gold2 - gold1;
            return 0;
        });
        var pointsDistributions = players.map(function (player) { return Main.gamestate.playerData[player].pointsDistribution; });
        var pointsTotals = pointsDistributions.map(function (pd) { return "" + pd.total; });
        var golds = players.map(function (player) { return Main.gamestate.playerData[player].gold; });
        var placements = range(1, players.length);
        for (var i = 1; i < players.length; i++) {
            if (pointsDistributions[i].total === pointsDistributions[i - 1].total) {
                pointsTotals[i - 1] += " <span style=\"color:" + ArtCommon.goldColorHtml + "\">(" + golds[i - 1] + ")</span>";
                pointsTotals[i] += " <span style=\"color:" + ArtCommon.goldColorHtml + "\">(" + golds[i] + ")</span>";
                if (golds[i] === golds[i - 1])
                    placements[i] = placements[i - 1];
            }
        }
        var elos = players.map(function (player) {
            var elo = Main.gamestate.playerData[player].elo;
            if (!elo)
                return '--';
            var before = Math.round(elo.before);
            var after = Math.round(elo.after);
            var diff = after - before;
            var sign = (diff >= 0) ? '+' : '';
            return after + " <span style=\"color:" + ArtCommon.eloDiffColor(diff) + "\">(" + sign + diff + ")</span>";
        });
        var endscreen = document.getElementById('endscreen');
        var shield = ArtCommon.shield();
        shield.scale.set(0.25);
        var goldCoin = ArtCommon.goldCoin();
        goldCoin.scale.set(0.25);
        var pyramid = ArtCommon.pyramidFull();
        pyramid.scale.set(0.25);
        var blueCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('blue'));
        blueCard.scale.set(0.25);
        var greenCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('green'));
        greenCard.scale.set(0.25);
        var yellowCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('yellow'));
        yellowCard.scale.set(0.25);
        var purpleCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('purple'));
        purpleCard.scale.set(0.25);
        var x = (-1 - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
        endscreen.appendChild(this.scoreArt(shield, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 0 + "px"));
        endscreen.appendChild(this.scoreArt(goldCoin, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 1 + "px"));
        endscreen.appendChild(this.scoreArt(pyramid, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 2 + "px"));
        endscreen.appendChild(this.scoreArt(blueCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 3 + "px"));
        endscreen.appendChild(this.scoreArt(greenCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 4 + "px"));
        endscreen.appendChild(this.scoreArt(yellowCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 5 + "px"));
        endscreen.appendChild(this.scoreArt(purpleCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 6 + "px"));
        endscreen.appendChild(this.scoreText('Total', C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 7 + "px"));
        for (var i = 0; i < players.length; i++) {
            var x_1 = (i - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
            endscreen.appendChild(this.scoreText("#" + placements[i], C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_PLACEMENTS_Y + "px"));
            endscreen.appendChild(this.scoreText(players[i], C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_NAMES_Y + "px"));
            endscreen.appendChild(this.scoreText("" + elos[i], C.END_SCREEN_ELO_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_ELOS_Y + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].conflict, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 0 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].finance, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 1 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].wonder, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 2 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].civilian, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 3 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].science, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 4 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].commerce, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 5 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsDistributions[i].guild, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 6 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsTotals[i], C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 7 + "px"));
        }
    };
    EndScreen.prototype.destroy = function () {
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    };
    EndScreen.prototype.scoreArt = function (pixiArt, xs, ys) {
        var art = ArtCommon.domElementForArt(pixiArt);
        art.style.position = 'absolute';
        art.style.left = xs;
        art.style.top = ys;
        return art;
    };
    EndScreen.prototype.scoreText = function (text, size, xs, ys) {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = size + "px";
        p.style.color = C.END_SCREEN_TEXT_COLOR;
        p.style.transform = 'translate(-50%, -50%)';
        p.style.position = 'absolute';
        p.style.left = xs;
        p.style.top = ys;
        return p;
    };
    return EndScreen;
}());
/// <reference path="./scene.ts" />
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.wonders = [];
        return _this;
    }
    Object.defineProperty(GameScene.prototype, "hand", {
        get: function () { return this.hands[Main.gamestate.players.indexOf(Main.player)]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "topWonder", {
        get: function () { return this.wonders[Main.gamestate.players.indexOf(Main.player)]; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "isPaymentMenuActive", {
        get: function () { return !!this.paymentDialog; },
        enumerable: false,
        configurable: true
    });
    GameScene.prototype.update = function () {
        var e_19, _a;
        try {
            for (var _b = __values(this.hands), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hand = _c.value;
                hand.update();
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_19) throw e_19.error; }
        }
        this.actionButton.setType(this.isMyTurnToBuildFromDiscard() ? 'reject_discard' : 'undo');
        for (var i = 0; i < this.wonders.length; i++) {
            this.wonders[i].adjustPlaceholdersFor(this.hands[i].playedCard || this.hands[i].selectedCard);
            this.wonders[i].update();
        }
        if (this.discardHand) {
            this.discardHand.update();
        }
        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
    };
    GameScene.prototype.create = function () {
        var gamestate = Main.gamestate;
        var players = Main.gamestate.players;
        var cardsInHand = this.isMyTurnToBuildFromDiscard() ? gamestate.discardedCards : gamestate.hand;
        this.wonders = players.map(function (player) { return undefined; });
        this.hands = players.map(function (player) { return undefined; });
        this.playedCards = players.map(function (player) { return undefined; });
        var p = players.indexOf(Main.player);
        var l = mod(p - 1, players.length);
        var r = mod(p + 1, players.length);
        var finalY = C.WONDER_TOP_Y;
        this.wonders[p] = new Wonder(this, gamestate.wonders[players[p]], players[p]);
        this.wonders[p].setPosition(this.getWonderPosition(p));
        this.wonders[p].addToGame();
        this.hands[p] = new Hand(this, this.getHandPosition(p), { type: 'normal', cardIds: cardsInHand, activeWonder: this.wonders[p], validMoves: Main.gamestate.validMoves });
        this.hands[p].snap();
        finalY = this.wonders[p].y;
        var i;
        for (i = 1; i < Math.floor((players.length - 1) / 2 + 1); i++) {
            this.wonders[l] = new Wonder(this, gamestate.wonders[players[l]], players[l]);
            this.wonders[l].setPosition(this.getWonderPosition(l));
            this.wonders[l].addToGame();
            this.hands[l] = new Hand(this, this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: -1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();
            finalY = this.wonders[l].y;
            this.wonders[r] = new Wonder(this, gamestate.wonders[players[r]], players[r]);
            this.wonders[r].setPosition(this.getWonderPosition(r));
            this.wonders[r].addToGame();
            this.hands[r] = new Hand(this, this.getHandPosition(r), { type: 'back', player: players[r], age: gamestate.age, flankDirection: 1 });
            this.hands[r].state = { type: 'back', moved: !!gamestate.playerData[players[r]].currentMove };
            this.hands[r].scale = C.HAND_FLANK_SCALE;
            this.hands[r].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[r].snap();
            finalY = this.wonders[r].y;
            l = mod(l - 1, gamestate.players.length);
            r = mod(r + 1, gamestate.players.length);
        }
        if (players.length % 2 === 0) {
            this.wonders[l] = new Wonder(this, gamestate.wonders[players[l]], players[l]);
            this.wonders[l].setPosition(this.getWonderPosition(l));
            this.wonders[l].addToGame();
            this.hands[l] = new Hand(this, this.getHandPosition(l), { type: 'back', player: players[l], age: gamestate.age, flankDirection: 1 });
            this.hands[l].state = { type: 'back', moved: !!gamestate.playerData[players[l]].currentMove };
            this.hands[l].scale = C.HAND_FLANK_SCALE;
            this.hands[l].setZIndex(C.Z_INDEX_CARD_FLANK);
            this.hands[l].snap();
            finalY = this.wonders[l].y;
        }
        var padding = gamestate.players.length === 3 ? C.GAME_HEIGHT_PADDING_3P : C.GAME_HEIGHT_PADDING_4567P;
        Main.game.style.height = finalY + C.WONDER_BOARD_HEIGHT / 2 + padding + "px";
        this.militaryOverlays = players.map(function (player) { return undefined; });
        for (var i_1 = 0; i_1 < this.wonders.length; i_1++) {
            this.militaryOverlays[i_1] = new MilitaryOverlay();
            this.militaryOverlays[i_1].x = this.wonders[i_1].x;
            this.militaryOverlays[i_1].y = this.wonders[i_1].y;
            this.militaryOverlays[i_1].addToGame();
        }
        this.actionButton = new ActionButton(this);
        this.actionButton.x = 0;
        this.actionButton.y = C.ACTION_BUTTON_Y;
        this.actionButton.addToGame();
        this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);
        this.discardPile = new DiscardPile();
        this.discardPile.x = C.DISCARD_PILE_X;
        this.discardPile.y = C.DISCARD_PILE_Y;
        this.discardPile.addToGame();
        this.discardHand = new Hand(this, this.discardPile.getDiscardLockPoint(), { type: 'discard', count: this.isMyTurnToBuildFromDiscard() ? 0 : gamestate.discardedCardCount, lastCardAge: gamestate.lastDiscardedCardAge });
        this.discardHand.state = { type: 'back', moved: false };
        this.discardHand.setZIndex(C.Z_INDEX_DISCARD_CARDS);
        this.discardHand.snap();
        this.update();
    };
    GameScene.prototype.destroy = function () {
        var e_20, _a, e_21, _b;
        try {
            for (var _c = __values(this.hands), _d = _c.next(); !_d.done; _d = _c.next()) {
                var hand = _d.value;
                hand.destroy();
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_20) throw e_20.error; }
        }
        try {
            for (var _e = __values(this.wonders), _f = _e.next(); !_f.done; _f = _e.next()) {
                var wonder = _f.value;
                wonder.destroy();
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_21) throw e_21.error; }
        }
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    };
    GameScene.prototype.startPaymentDialog = function (card, move) {
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        this.paymentDialog = new PaymentDialog(this, card, move, this.wonders[Main.gamestate.players.indexOf(Main.player)]);
        this.paymentDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    };
    GameScene.prototype.getSourceSinkPosition = function () {
        return new PIXI.Point(this.discardPile.x, this.discardPile.y);
    };
    GameScene.prototype.getHandOffScreenPoint = function () {
        return new PIXI.Point(0, -Main.getGameY() - 200);
    };
    GameScene.prototype.getHandPosition = function (index) {
        var p = Main.gamestate.players.indexOf(Main.player);
        if (index === p)
            return new PIXI.Point(0, C.HAND_Y);
        var wonderPosition = this.getWonderPosition(index);
        if (wonderPosition.x < 0) {
            return new PIXI.Point(wonderPosition.x - (C.WONDER_BOARD_WIDTH / 2 + C.HAND_FLANK_DX), wonderPosition.y + C.HAND_FLANK_DY);
        }
        return new PIXI.Point(wonderPosition.x + (C.WONDER_BOARD_WIDTH / 2 + C.HAND_FLANK_DX), wonderPosition.y + C.HAND_FLANK_DY);
    };
    GameScene.prototype.isCurrentlyDragging = function () {
        return this.hand && this.hand.cards.some(function (card) { return card.state.type.startsWith('dragging'); });
    };
    GameScene.prototype.isMyTurnToBuildFromDiscard = function () {
        return Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player;
    };
    return GameScene;
}(Scene));
var GameStateDiffer;
(function (GameStateDiffer) {
    function diffChooseSide(gamestate) {
        var result = {
            scripts: []
        };
        diffCurrentWonderSideChoice(gamestate, result);
        return result;
    }
    GameStateDiffer.diffChooseSide = diffChooseSide;
    function diffNonTurn(gamestate, midturn) {
        var e_22, _a;
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
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_22) throw e_22.error; }
        }
        return result;
    }
    GameStateDiffer.diffNonTurn = diffNonTurn;
    function diffTurn(gamestate) {
        var result = diffNonTurn(gamestate, false);
        if (!(Main.scene instanceof GameScene)) {
            return result;
        }
        var scene = Main.scene;
        if (gamestate.turn - Main.gamestate.turn > 1) {
            result.scripts.splice(0);
            return result;
        }
        result.scripts.push(function () {
            var moveScripts, handPosition_1, targetHandPosition_1, discardHandPosition_1, targetDiscardHandPosition_1, lerpt_1, isEndOfAge, currentHandPositions_1, targetHandPosition_2, discardScripts, _loop_3, i, handPosition_2, targetHandPosition_3, discardHandPosition_2, discardTargetPosition_1, lerpt_2, p_1, l_1, r_1, pshields, lshields, rshields, militaryTokenDistributionScripts, hands_1, entryPoint, i_2, startPosition_1, endPosition_1, lerpt_3, i_3, _loop_4, count, currentHandPositions_2, targetHandPositions_1, newHandi_1, lerpt_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        moveScripts = gamestate.players.map(function (player) {
                            return function () {
                                var i, neg, pos, hand, lastMove, selectedCard, paymentScripts, goldGain, card_1, playedPoint_1, card_2, wonderPoint_1, card_3, discardPoint_1;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            i = gamestate.players.indexOf(player);
                                            neg = mod(i - 1, gamestate.players.length);
                                            pos = mod(i + 1, gamestate.players.length);
                                            hand = scene.hands[i];
                                            lastMove = gamestate.playerData[player].lastMove;
                                            if (!lastMove)
                                                return [2 /*return*/];
                                            if (!(player === Main.player)) return [3 /*break*/, 2];
                                            scene.hand.reflectMove(lastMove);
                                            return [5 /*yield**/, __values(S.wait(0.5)())];
                                        case 1:
                                            _c.sent();
                                            selectedCard = scene.hand.selectedCard;
                                            scene.hand.cards.splice(scene.hand.cards.indexOf(selectedCard), 1);
                                            scene.hand.playedCard = selectedCard;
                                            if (selectedCard) {
                                                if (lastMove.action === 'throw') {
                                                    scene.discardHand.cards.push(selectedCard);
                                                }
                                            }
                                            return [3 /*break*/, 4];
                                        case 2:
                                            // Make sure move-cards are extended
                                            if (Main.gamestate.state !== 'DISCARD_MOVE') {
                                                hand.state = { type: 'back', moved: true };
                                            }
                                            return [5 /*yield**/, __values(S.wait(0.5)())];
                                        case 3:
                                            _c.sent();
                                            _c.label = 4;
                                        case 4:
                                            if (API.totalPaymentAmount(lastMove.payment) > 0) {
                                                paymentScripts = [];
                                                if (lastMove.payment.neg) {
                                                    paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(), scene.wonders[neg].getGoldCoinWorldPosition(), lastMove.payment.neg));
                                                }
                                                if (lastMove.payment.pos) {
                                                    paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(), scene.wonders[pos].getGoldCoinWorldPosition(), lastMove.payment.pos));
                                                }
                                                if (lastMove.payment.bank) {
                                                    paymentScripts.push(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(), scene.getSourceSinkPosition(), lastMove.payment.bank));
                                                }
                                                Main.scriptManager.runScript(S.simul.apply(S, __spread(paymentScripts)));
                                            }
                                            goldGain = API.goldGain(Main.gamestate.playerData[player].gold, gamestate.playerData[player].gold, gamestate.playerData[player].lastMove.payment, (_a = gamestate.playerData[gamestate.players[neg]].lastMove) === null || _a === void 0 ? void 0 : _a.payment, (_b = gamestate.playerData[gamestate.players[pos]].lastMove) === null || _b === void 0 ? void 0 : _b.payment);
                                            if (goldGain > 0) {
                                                Main.scriptManager.runScript(animateGoldMovement(scene.getSourceSinkPosition(), scene.wonders[i].getGoldCoinWorldPosition(), goldGain));
                                            }
                                            // Main player will not participate in the below actions
                                            if (player === Main.player)
                                                return [2 /*return*/];
                                            if (!(lastMove.action === 'play')) return [3 /*break*/, 7];
                                            if (Main.gamestate.state === 'DISCARD_MOVE') {
                                                card_1 = scene.discardHand.cards.pop();
                                            }
                                            else {
                                                card_1 = hand.cards.pop();
                                                hand.state = { type: 'back', moved: false };
                                            }
                                            card_1.destroy();
                                            card_1.create(lastMove.card, false);
                                            card_1.state = { type: 'full', justPlayed: false };
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, function (t) { card_1.update(); })())];
                                        case 5:
                                            _c.sent();
                                            scene.hands[i].playedCard = card_1;
                                            card_1.state = { type: 'effect', justPlayed: false };
                                            card_1.zIndex = C.Z_INDEX_CARD_PLAYED;
                                            playedPoint_1 = scene.wonders[i].getNewCardEffectWorldPosition(card_1);
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                    card_1.targetPosition.x = lerp(card_1.targetPosition.x, playedPoint_1.x, Math.pow(t, 2));
                                                    card_1.targetPosition.y = lerp(card_1.targetPosition.y, playedPoint_1.y, Math.pow(t, 2));
                                                    card_1.scale = lerp(card_1.scale, 1, Math.pow(t, 2));
                                                    card_1.update();
                                                })())];
                                        case 6:
                                            _c.sent();
                                            card_1.snap();
                                            return [3 /*break*/, 13];
                                        case 7:
                                            if (!(lastMove.action === 'wonder')) return [3 /*break*/, 10];
                                            card_2 = hand.cards.pop();
                                            hand.state = { type: 'back', moved: false };
                                            card_2.checkMarkVisible = false;
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, function (t) { card_2.update(); })())];
                                        case 8:
                                            _c.sent();
                                            card_2.state = { type: 'flipped', justPlayed: false };
                                            card_2.zIndex = C.Z_INDEX_CARD_WONDER;
                                            wonderPoint_1 = scene.wonders[i].getCardPositionForStage(lastMove.stage);
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                    card_2.targetPosition.x = lerp(card_2.targetPosition.x, wonderPoint_1.x, Math.pow(t, 2));
                                                    card_2.targetPosition.y = lerp(card_2.targetPosition.y, wonderPoint_1.y, Math.pow(t, 2));
                                                    card_2.scale = lerp(card_2.scale, 1, Math.pow(t, 2));
                                                    card_2.update();
                                                })())];
                                        case 9:
                                            _c.sent();
                                            card_2.snap();
                                            return [3 /*break*/, 13];
                                        case 10:
                                            if (!(lastMove.action === 'throw')) return [3 /*break*/, 13];
                                            card_3 = hand.cards.pop();
                                            hand.state = { type: 'back', moved: false };
                                            card_3.checkMarkVisible = false;
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, function (t) { card_3.update(); })())];
                                        case 11:
                                            _c.sent();
                                            card_3.state = { type: 'flipped', justPlayed: false };
                                            card_3.zIndex = C.Z_INDEX_CARD_MOVING;
                                            discardPoint_1 = scene.discardPile.getDiscardLockPoint();
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                    card_3.targetPosition.x = lerp(card_3.targetPosition.x, discardPoint_1.x, Math.pow(t, 2));
                                                    card_3.targetPosition.y = lerp(card_3.targetPosition.y, discardPoint_1.y, Math.pow(t, 2));
                                                    card_3.scale = lerp(card_3.scale, 1, Math.pow(t, 2));
                                                    card_3.update();
                                                })())];
                                        case 12:
                                            _c.sent();
                                            card_3.snap();
                                            scene.discardHand.cards.push(card_3);
                                            _c.label = 13;
                                        case 13: return [2 /*return*/];
                                    }
                                });
                            };
                        });
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(moveScripts))())];
                    case 1:
                        _a.sent();
                        if (!(Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player)) return [3 /*break*/, 5];
                        scene.discardHand = scene.hand;
                        scene.hands[Main.gamestate.players.indexOf(Main.player)] = new Hand(scene, scene.getHandOffScreenPoint(), { type: 'normal', cardIds: Main.gamestate.hand, activeWonder: scene.topWonder, validMoves: Main.gamestate.validMoves });
                        scene.hand.snap();
                        handPosition_1 = scene.hand.getPosition();
                        targetHandPosition_1 = scene.discardHand.getPosition();
                        discardHandPosition_1 = scene.discardHand.getPosition();
                        targetDiscardHandPosition_1 = scene.discardPile.getDiscardLockPoint();
                        scene.discardHand.state = { type: 'back', moved: false };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 2:
                        _a.sent();
                        lerpt_1 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_1 = lerp(lerpt_1, 1, Math.pow(t, 2));
                                scene.hand.x = lerp(handPosition_1.x, targetHandPosition_1.x, lerpt_1);
                                scene.hand.y = lerp(handPosition_1.y, targetHandPosition_1.y, lerpt_1);
                                scene.discardHand.x = lerp(discardHandPosition_1.x, targetDiscardHandPosition_1.x, lerpt_1);
                                scene.discardHand.y = lerp(discardHandPosition_1.y, targetDiscardHandPosition_1.y, lerpt_1);
                            })())];
                    case 3:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        isEndOfAge = gamestate.state === 'GAME_COMPLETE' || gamestate.age !== Main.gamestate.age || gamestate.hand.length < 2;
                        if (!isEndOfAge) return [3 /*break*/, 8];
                        currentHandPositions_1 = scene.hands.map(function (hand) { return hand.getPosition(); });
                        targetHandPosition_2 = scene.discardPile.getDiscardLockPoint();
                        scene.hands.forEach(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        discardScripts = [];
                        _loop_3 = function (i) {
                            if (!contains(gamestate.lastCardPlayers, gamestate.players[i])) {
                                discardScripts.push(function () {
                                    var lerpt;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                lerpt = 0;
                                                return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                                        lerpt = lerp(lerpt, 1, Math.pow(t, 2));
                                                        scene.hands[i].state = { type: 'back', moved: false };
                                                        scene.hands[i].x = lerp(currentHandPositions_1[i].x, targetHandPosition_2.x, lerpt);
                                                        scene.hands[i].y = lerp(currentHandPositions_1[i].y, targetHandPosition_2.y, lerpt);
                                                        scene.hands[i].scale = lerp(scene.hands[i].scale, 1, lerpt);
                                                    })())];
                                            case 1:
                                                _b.sent();
                                                (_a = scene.discardHand.cards).push.apply(_a, __spread(scene.hands[i].cards.splice(0)));
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }
                        };
                        for (i = 0; i < scene.hands.length; i++) {
                            _loop_3(i);
                        }
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(discardScripts))())];
                    case 6:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        if (!(gamestate.state === 'LAST_CARD_MOVE')) return [3 /*break*/, 9];
                        return [3 /*break*/, 36];
                    case 9:
                        if (!(gamestate.state === 'DISCARD_MOVE')) return [3 /*break*/, 14];
                        if (!(gamestate.discardMoveQueue[0] === Main.player)) return [3 /*break*/, 13];
                        // Replace hand with discard pile
                        scene.discardHand.setAllCardState({ type: 'in_hand_moving' });
                        handPosition_2 = scene.hand.getPosition();
                        targetHandPosition_3 = scene.getHandOffScreenPoint();
                        discardHandPosition_2 = scene.discardHand.getPosition();
                        discardTargetPosition_1 = scene.getHandPosition(gamestate.players.indexOf(Main.player));
                        lerpt_2 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_2 = lerp(lerpt_2, 1, Math.pow(t, 2));
                                scene.hand.x = lerp(handPosition_2.x, targetHandPosition_3.x, lerpt_2);
                                scene.hand.y = lerp(handPosition_2.y, targetHandPosition_3.y, lerpt_2);
                                scene.discardHand.x = lerp(discardHandPosition_2.x, discardTargetPosition_1.x, lerpt_2);
                                scene.discardHand.y = lerp(discardHandPosition_2.y, discardTargetPosition_1.y, lerpt_2);
                            })())];
                    case 10:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 11:
                        _a.sent();
                        scene.discardHand.destroy();
                        scene.discardHand.createWithData({ type: 'normal', cardIds: gamestate.discardedCards, activeWonder: scene.topWonder, validMoves: gamestate.validMoves });
                        scene.discardHand.snap();
                        scene.discardHand.state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 12:
                        _a.sent();
                        scene.discardHand.snap();
                        _a.label = 13;
                    case 13: return [3 /*break*/, 36];
                    case 14:
                        if (!isEndOfAge) return [3 /*break*/, 31];
                        p_1 = gamestate.players.indexOf(Main.player);
                        l_1 = mod(p_1 - 1, gamestate.players.length);
                        r_1 = mod(p_1 + 1, gamestate.players.length);
                        pshields = gamestate.playerData[gamestate.players[p_1]].totalShields;
                        lshields = gamestate.playerData[gamestate.players[l_1]].totalShields;
                        rshields = gamestate.playerData[gamestate.players[r_1]].totalShields;
                        // Diff left
                        scene.militaryOverlays[p_1].setShieldDiff(pshields - lshields);
                        scene.militaryOverlays[l_1].setShieldDiff(lshields - pshields);
                        scene.militaryOverlays[p_1].setShields(gamestate.playerData[gamestate.players[p_1]].totalShields);
                        scene.militaryOverlays[l_1].setShields(gamestate.playerData[gamestate.players[l_1]].totalShields);
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                scene.militaryOverlays[p_1].alpha = t;
                                scene.militaryOverlays[l_1].alpha = t;
                            })())];
                    case 15:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(C.ANIMATION_MILITARY_WAIT_TIME)())];
                    case 16:
                        _a.sent();
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                scene.militaryOverlays[p_1].alpha = 1 - t;
                                scene.militaryOverlays[l_1].alpha = 1 - t;
                            })())];
                    case 17:
                        _a.sent();
                        // Diff right
                        scene.militaryOverlays[p_1].setShieldDiff(pshields - rshields);
                        scene.militaryOverlays[r_1].setShieldDiff(rshields - pshields);
                        scene.militaryOverlays[p_1].setShields(gamestate.playerData[gamestate.players[p_1]].totalShields);
                        scene.militaryOverlays[r_1].setShields(gamestate.playerData[gamestate.players[r_1]].totalShields);
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                scene.militaryOverlays[p_1].alpha = t;
                                scene.militaryOverlays[r_1].alpha = t;
                            })())];
                    case 18:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(C.ANIMATION_MILITARY_WAIT_TIME)())];
                    case 19:
                        _a.sent();
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                scene.militaryOverlays[p_1].alpha = 1 - t;
                                scene.militaryOverlays[r_1].alpha = 1 - t;
                            })())];
                    case 20:
                        _a.sent();
                        militaryTokenDistributionScripts = gamestate.players.map(function (player) {
                            var pi = gamestate.players.indexOf(player);
                            var newTokenIndices = [];
                            for (var i = Main.gamestate.playerData[player].militaryTokens.length; i < gamestate.playerData[player].militaryTokens.length; i++) {
                                newTokenIndices.push(i);
                            }
                            return S.simul.apply(S, __spread(newTokenIndices.map(function (i) { return function () {
                                var sourceSink, token, targetPosition, lerpt;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            sourceSink = scene.getSourceSinkPosition();
                                            token = new MilitaryToken(gamestate.playerData[player].militaryTokens[i]);
                                            token.x = sourceSink.x;
                                            token.y = sourceSink.y;
                                            token.addToGame();
                                            targetPosition = scene.wonders[pi].getMilitaryTokenWorldPosition(i);
                                            lerpt = 0;
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                                    lerpt = lerp(lerpt, 1, Math.pow(t, 2));
                                                    token.x = lerp(sourceSink.x, targetPosition.x, lerpt);
                                                    token.y = lerp(sourceSink.y, targetPosition.y, lerpt);
                                                })())];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }; })));
                        });
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(militaryTokenDistributionScripts))())];
                    case 21:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 22:
                        _a.sent();
                        if (!(gamestate.state !== 'GAME_COMPLETE')) return [3 /*break*/, 30];
                        hands_1 = gamestate.players.map(function (player) { return undefined; });
                        entryPoint = scene.getHandOffScreenPoint();
                        hands_1[p_1] = new Hand(scene, entryPoint, { type: 'normal', cardIds: gamestate.hand, activeWonder: scene.topWonder, validMoves: gamestate.validMoves });
                        hands_1[p_1].state = { type: 'back', moved: false };
                        hands_1[p_1].snap();
                        for (i_2 = 0; i_2 < gamestate.players.length; i_2++) {
                            if (i_2 === p_1)
                                continue;
                            hands_1[i_2] = new Hand(scene, entryPoint, { type: 'back', age: gamestate.age, player: gamestate.players[i_2], flankDirection: 1 });
                            hands_1[i_2].state = { type: 'back', moved: false };
                            hands_1[i_2].snap();
                        }
                        hands_1.map(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        startPosition_1 = hands_1[0].getPosition();
                        endPosition_1 = scene.getHandPosition(p_1);
                        lerpt_3 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                var e_23, _a;
                                lerpt_3 = lerp(lerpt_3, 1, Math.pow(t, 2));
                                try {
                                    for (var hands_2 = __values(hands_1), hands_2_1 = hands_2.next(); !hands_2_1.done; hands_2_1 = hands_2.next()) {
                                        var hand = hands_2_1.value;
                                        hand.x = lerp(startPosition_1.x, endPosition_1.x, lerpt_3);
                                        hand.y = lerp(startPosition_1.y, endPosition_1.y, lerpt_3);
                                        hand.update();
                                    }
                                }
                                catch (e_23_1) { e_23 = { error: e_23_1 }; }
                                finally {
                                    try {
                                        if (hands_2_1 && !hands_2_1.done && (_a = hands_2.return)) _a.call(hands_2);
                                    }
                                    finally { if (e_23) throw e_23.error; }
                                }
                            })())];
                    case 23:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 24:
                        _a.sent();
                        i_3 = l_1;
                        _loop_4 = function (count) {
                            var startPosition_2, endPosition_2, lerpt_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        startPosition_2 = hands_1[i_3].getPosition();
                                        endPosition_2 = scene.getHandPosition(i_3);
                                        lerpt_5 = 0;
                                        return [5 /*yield**/, __values(S.doOverTime(0.2, function (t) {
                                                lerpt_5 = lerp(lerpt_5, 1, Math.pow(t, 2));
                                                hands_1[i_3].x = lerp(startPosition_2.x, endPosition_2.x, lerpt_5);
                                                hands_1[i_3].y = lerp(startPosition_2.y, endPosition_2.y, lerpt_5);
                                                hands_1[i_3].scale = lerp(hands_1[i_3].scale, C.HAND_FLANK_SCALE, lerpt_5);
                                                hands_1[i_3].update();
                                            })())];
                                    case 1:
                                        _a.sent();
                                        hands_1[i_3].snap();
                                        i_3 = mod(i_3 - 1, gamestate.players.length);
                                        return [2 /*return*/];
                                }
                            });
                        };
                        count = 0;
                        _a.label = 25;
                    case 25:
                        if (!(count < gamestate.players.length - 1)) return [3 /*break*/, 28];
                        return [5 /*yield**/, _loop_4(count)];
                    case 26:
                        _a.sent();
                        _a.label = 27;
                    case 27:
                        count++;
                        return [3 /*break*/, 25];
                    case 28:
                        scene.hands[p_1] = hands_1[p_1];
                        hands_1[p_1].state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 29:
                        _a.sent();
                        hands_1[p_1].snap();
                        _a.label = 30;
                    case 30: return [3 /*break*/, 36];
                    case 31:
                        currentHandPositions_2 = scene.hands.map(function (hand) { return hand.getPosition(); });
                        targetHandPositions_1 = __spread(currentHandPositions_2);
                        if (Main.gamestate.age % 2 === 0) {
                            targetHandPositions_1.unshift(targetHandPositions_1.pop());
                            newHandi_1 = mod(Main.gamestate.players.indexOf(Main.player) + 1, Main.gamestate.players.length);
                        }
                        else {
                            targetHandPositions_1.push(targetHandPositions_1.shift());
                            newHandi_1 = mod(Main.gamestate.players.indexOf(Main.player) - 1, Main.gamestate.players.length);
                        }
                        scene.hand.state = { type: 'back', moved: false };
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 32:
                        _a.sent();
                        scene.hands.forEach(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        lerpt_4 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_4 = lerp(lerpt_4, 1, Math.pow(t, 2));
                                for (var i = 0; i < scene.hands.length; i++) {
                                    scene.hands[i].x = lerp(currentHandPositions_2[i].x, targetHandPositions_1[i].x, lerpt_4);
                                    scene.hands[i].y = lerp(currentHandPositions_2[i].y, targetHandPositions_1[i].y, lerpt_4);
                                    if (i === newHandi_1) {
                                        scene.hands[i].scale = lerp(scene.hands[i].scale, 1, lerpt_4);
                                    }
                                    else {
                                        scene.hands[i].scale = lerp(scene.hands[i].scale, C.HAND_FLANK_SCALE, lerpt_4);
                                    }
                                }
                            })())];
                    case 33:
                        _a.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 34:
                        _a.sent();
                        scene.hands[newHandi_1].destroy();
                        scene.hands[newHandi_1].createWithData({ type: 'normal', cardIds: gamestate.hand, activeWonder: scene.hand.activeWonder, validMoves: gamestate.validMoves });
                        scene.hands[newHandi_1].snap();
                        scene.hands[newHandi_1].state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 35:
                        _a.sent();
                        scene.hands[newHandi_1].snap();
                        _a.label = 36;
                    case 36: return [2 /*return*/];
                }
            });
        });
        return result;
    }
    GameStateDiffer.diffTurn = diffTurn;
    function diffPoints(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var oldPoints = Main.gamestate.playerData[player].pointsDistribution.total;
        var newPoints = gamestate.playerData[player].pointsDistribution.total;
        var playeri = Main.gamestate.players.indexOf(player);
        if (newPoints === oldPoints)
            return;
        result.scripts.push(function () {
            var pointsText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pointsText = scene.wonders[playeri].pointsText;
                        pointsText.style.color = '#FF0000';
                        return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                                pointsText.textContent = "" + Math.round(lerp(oldPoints, newPoints, t));
                            })())];
                    case 1:
                        _a.sent();
                        pointsText.style.color = '#FFFFFF';
                        return [2 /*return*/];
                }
            });
        });
    }
    function diffGold(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var oldGold = Main.gamestate.playerData[player].gold;
        var newGold = gamestate.playerData[player].gold;
        var playeri = Main.gamestate.players.indexOf(player);
        if (newGold === oldGold)
            return;
        result.scripts.push(function () {
            var goldText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goldText = scene.wonders[playeri].goldText;
                        goldText.style.color = '#FF0000';
                        return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                                goldText.textContent = "" + Math.round(lerp(oldGold, newGold, t));
                            })())];
                    case 1:
                        _a.sent();
                        goldText.style.color = ArtCommon.goldColorHtml;
                        return [2 /*return*/];
                }
            });
        });
    }
    function diffCurrentMove(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var oldMove = Main.gamestate.playerData[player].currentMove;
        var newMove = gamestate.playerData[player].currentMove;
        var playeri = Main.gamestate.players.indexOf(player);
        // Reflect current move.
        if (player === Main.player && !Main.isMoveImmune) {
            result.scripts.push(function () {
                return __generator(this, function (_a) {
                    if (!scene.isPaymentMenuActive) {
                        scene.hand.reflectMove(newMove);
                    }
                    return [2 /*return*/];
                });
            });
            return;
        }
        if (API.eqMove(newMove, oldMove))
            return;
        result.scripts.push(function () {
            return __generator(this, function (_a) {
                if (!oldMove && newMove) {
                    if (Main.gamestate.state !== 'DISCARD_MOVE')
                        scene.hands[playeri].makeMove();
                }
                else {
                    scene.hands[playeri].undoMove();
                }
                return [2 /*return*/];
            });
        });
    }
    function diffCurrentWonderSideChoice(gamestate, result) {
        if (!(Main.scene instanceof ChooseWonderScene))
            return;
        var scene = Main.scene;
        var currentMove = gamestate.playerData[Main.player].currentMove;
        // Reflect current choice.
        if (currentMove && !Main.isMoveImmune) {
            result.scripts.push(function () {
                return __generator(this, function (_a) {
                    scene.selectSide(currentMove.side);
                    return [2 /*return*/];
                });
            });
            return;
        }
    }
    function animateGoldMovement(fromPos, toPos, gold) {
        return S.simul.apply(S, __spread(range(0, gold - 1).map(function (i) { return S.chain(S.wait(0.2 * i), function () {
            var goldCoin, lerpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        goldCoin = new GoldCoin();
                        goldCoin.x = fromPos.x;
                        goldCoin.y = fromPos.y;
                        goldCoin.scale = 0;
                        goldCoin.addToGame();
                        lerpt = 0;
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_GOLD_COIN_MOVE_TIME, function (t) {
                                lerpt = lerp(lerpt, 1, Math.pow(t, 2));
                                goldCoin.x = lerp(fromPos.x, toPos.x, lerpt);
                                goldCoin.y = lerp(fromPos.y, toPos.y, lerpt);
                                goldCoin.scale = 1 - Math.pow((2 * lerpt - 1), 10);
                            })())];
                    case 1:
                        _a.sent();
                        goldCoin.removeFromGame();
                        return [2 /*return*/];
                }
            });
        }); })));
    }
})(GameStateDiffer || (GameStateDiffer = {}));
var GoldCoin = /** @class */ (function (_super) {
    __extends(GoldCoin, _super);
    function GoldCoin() {
        var _this = _super.call(this) || this;
        _this.div.appendChild(_this.draw());
        _this.zIndex = C.Z_INDEX_GOLD_COIN;
        return _this;
    }
    GoldCoin.prototype.draw = function () {
        return ArtCommon.domElementForArt(ArtCommon.goldCoin(), C.GOLD_COIN_SCALE);
    };
    return GoldCoin;
}(GameElement));
var Hand = /** @class */ (function () {
    function Hand(scene, position, handData) {
        this.scene = scene;
        this.state = { type: 'normal' };
        this.x = position.x;
        this.y = position.y;
        this.scale = 1;
        this.createWithData(handData);
    }
    Object.defineProperty(Hand.prototype, "selectedCard", {
        get: function () {
            var e_24, _a;
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.state.type.startsWith('locked')) {
                        return card;
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
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Hand.prototype.update = function () {
        var _a;
        for (var i = 0; i < this.cards.length; i++) {
            var nhp = this.getNormalHandPosition(i);
            (_a = this.cards[i].handPosition) === null || _a === void 0 ? void 0 : _a.set(nhp.x, nhp.y);
            if (this.state.type === 'normal') {
                if (this.cards[i].state.type === 'in_hand_moving') {
                    this.cards[i].state = { type: 'in_hand', visualState: 'full' };
                }
                this.cards[i].scale = this.scale;
            }
            else {
                if (this.cards[i].state.type === 'in_hand') {
                    this.cards[i].state = { type: 'in_hand_moving' };
                }
                // No, this should NOT be an 'else'
                if (this.cards[i].state.type === 'in_hand_moving') {
                    this.cards[i].targetPosition.set(this.x, this.y);
                    this.cards[i].scale = this.scale;
                }
                this.cards[i].checkMarkVisible = (this.state.moved && i === this.cards.length - 1);
            }
            this.cards[i].update();
        }
    };
    Hand.prototype.createWithData = function (handData) {
        this.cards = [];
        this.cardIds = handData.type === 'normal'
            ? handData.cardIds
            : filledArray(handData.type === 'back' ? Main.gamestate.playerData[handData.player].handCount : handData.count, -1);
        this.activeWonder = handData.type === 'normal' ? handData.activeWonder : undefined;
        this.flankDirection = handData.type === 'back' ? handData.flankDirection : 1;
        for (var i = 0; i < this.cardIds.length; i++) {
            var handPosition = this.getNormalHandPosition(i);
            var card = handData.type === 'normal'
                ? new Card(this.scene, this.cardIds[i], i, handPosition, this.activeWonder, handData.validMoves)
                : Card.flippedCardForAge(this.scene, handData.type === 'back' ? handData.age : handData.lastCardAge, false);
            card.x = handPosition.x;
            card.y = handPosition.y;
            card.addToGame();
            this.cards.push(card);
            card.state = { type: 'in_hand', visualState: 'full' };
        }
        if (this.cards.length > 0 && handData.type === 'discard') {
            this.cards[this.cards.length - 1].addDiscardCountText();
        }
    };
    Hand.prototype.destroy = function () {
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].destroy();
            this.cards[i].removeFromGame();
        }
    };
    Hand.prototype.snap = function () {
        this.update();
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].snap();
        }
        this.update();
    };
    Hand.prototype.reflectMove = function (move) {
        var e_25, _a, e_26, _b;
        if (!move || move.action === 'reject') {
            try {
                for (var _c = __values(this.cards), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var card = _d.value;
                    card.deselect();
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_25) throw e_25.error; }
            }
            return;
        }
        var moved = false;
        try {
            for (var _e = __values(this.cards), _f = _e.next(); !_f.done; _f = _e.next()) {
                var card = _f.value;
                if (card.apiCardId === move.card && (move.index === undefined || card.index === move.index)) {
                    console.log('reflecting move', move, 'with card', card);
                    card.select(move);
                    moved = true;
                }
                else {
                    card.deselect();
                }
            }
        }
        catch (e_26_1) { e_26 = { error: e_26_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_26) throw e_26.error; }
        }
        if (!moved)
            console.error('Move not found in hand:', move);
    };
    Hand.prototype.makeMove = function () {
        if (this.state.type === 'back')
            this.state.moved = true;
    };
    Hand.prototype.undoMove = function () {
        if (this.state.type === 'back')
            this.state.moved = false;
    };
    Hand.prototype.setZIndex = function (zIndex) {
        var e_27, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.zIndex = zIndex;
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_27) throw e_27.error; }
        }
    };
    Hand.prototype.setAllCardState = function (state) {
        var e_28, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.state = state;
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_28) throw e_28.error; }
        }
    };
    Hand.prototype.getPosition = function () {
        return new PIXI.Point(this.x, this.y);
    };
    Hand.prototype.getNormalHandPosition = function (cardIndex) {
        var cardsInHand = [];
        for (var i = 0; i < this.cards.length; i++) {
            if (this.cards[i].state.type.startsWith('in_hand')) {
                cardsInHand.push(this.cards[i]);
            }
            else if (i < cardIndex) {
                cardIndex--;
            }
        }
        var position = this.getPosition();
        position.x += (cardIndex - (cardsInHand.length - 1) / 2) * C.HAND_CARD_DX;
        return position;
    };
    return Hand;
}());
var Loader = /** @class */ (function () {
    function Loader(onFinishedLoading) {
        this.resources = [];
        this.onFinishedLoading = onFinishedLoading;
        this.complete = false;
    }
    Object.defineProperty(Loader.prototype, "isLoaded", {
        get: function () {
            var e_29, _a;
            try {
                for (var _b = __values(this.resources), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var resource = _c.value;
                    if (!resource.loaded)
                        return false;
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_29) throw e_29.error; }
            }
            return this.resources.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "loadPercentage", {
        get: function () {
            var e_30, _a;
            if (this.resources.length === 0)
                return 0;
            var loaded = 0;
            try {
                for (var _b = __values(this.resources), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var resource = _c.value;
                    if (resource.loaded)
                        loaded++;
                }
            }
            catch (e_30_1) { e_30 = { error: e_30_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_30) throw e_30.error; }
            }
            return Math.round(loaded / this.resources.length * 100);
        },
        enumerable: false,
        configurable: true
    });
    Loader.prototype.update = function () {
        var e_31, _a;
        if (this.complete)
            return;
        var loaded = this.resources.length > 0;
        try {
            for (var _b = __values(this.resources), _c = _b.next(); !_c.done; _c = _b.next()) {
                var resource = _c.value;
                if (!resource.loaded) {
                    loaded = false;
                    resource.load();
                    break;
                }
            }
        }
        catch (e_31_1) { e_31 = { error: e_31_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_31) throw e_31.error; }
        }
        if (loaded) {
            this.onFinishedLoading();
            this.complete = true;
        }
    };
    Loader.prototype.loadGamestateResources = function () {
        var e_32, _a;
        // Cards
        for (var cardId in Main.gamestate.cards) {
            var card = Main.gamestate.cards[cardId];
            this.loadCard(cardId, card);
        }
        // Flipped card placeholders
        this.loadCard('-1', { age: 1, color: 'brown', name: '', effects: [] });
        this.loadCard('-2', { age: 2, color: 'brown', name: '', effects: [] });
        this.loadCard('-3', { age: 3, color: 'brown', name: '', effects: [] });
        // Wonders
        if (Main.gamestate.state === 'CHOOSE_WONDER_SIDE') {
            for (var player in Main.gamestate.wonderChoices) {
                var wonderChoice = Main.gamestate.wonderChoices[player];
                try {
                    for (var wonderChoice_2 = (e_32 = void 0, __values(wonderChoice)), wonderChoice_2_1 = wonderChoice_2.next(); !wonderChoice_2_1.done; wonderChoice_2_1 = wonderChoice_2.next()) {
                        var wonder = wonderChoice_2_1.value;
                        this.loadWonder(wonder);
                    }
                }
                catch (e_32_1) { e_32 = { error: e_32_1 }; }
                finally {
                    try {
                        if (wonderChoice_2_1 && !wonderChoice_2_1.done && (_a = wonderChoice_2.return)) _a.call(wonderChoice_2);
                    }
                    finally { if (e_32) throw e_32.error; }
                }
            }
        }
        else {
            for (var player in Main.gamestate.wonders) {
                var wonder = Main.gamestate.wonders[player];
                this.loadWonder(wonder);
            }
        }
        // Other
        this.loadDiscardPile();
    };
    Loader.prototype.loadCard = function (id, card) {
        var resource = this.addNewResource();
        resource.load = function () {
            /* FRONT */
            var front = new PIXI.Container();
            var cardBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.cardBannerForColor(card.color));
            front.addChild(cardBase);
            var cardBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER, C.CARD_WIDTH - 2 * C.CARD_BORDER, C.CARD_HEIGHT - 2 * C.CARD_BORDER, C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
            front.addChild(cardBg);
            var cardMask = cardBase.clone();
            front.addChild(cardMask);
            var costContainer = ArtCommon.getArtForCost(card.cost);
            if (costContainer) {
                costContainer.scale.set(C.CARD_COST_SCALE);
                costContainer.position.set(C.CARD_COST_X, C.CARD_COST_Y);
                var costBanner = Shapes.filledRoundedRect(-costContainer.width / 2 - C.CARD_COST_PADDING, -C.CARD_COST_PADDING, costContainer.width + 2 * C.CARD_COST_PADDING, costContainer.height + 2 * C.CARD_COST_PADDING, C.CARD_COST_PADDING, ArtCommon.cardBannerForColor(card.color));
                costBanner.position.set(C.CARD_COST_X, C.CARD_COST_Y);
                costBanner.mask = cardMask;
                front.addChild(costBanner);
                front.addChild(costContainer);
            }
            var cardBanner = Shapes.filledRect(0, 0, C.CARD_WIDTH, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT, ArtCommon.cardBannerForColor(card.color));
            cardBanner.mask = cardMask;
            front.addChild(cardBanner);
            var effectContainer = new PIXI.Container();
            effectContainer.addChild(ArtCommon.getShadowForEffects(card.effects, 'dark'));
            effectContainer.addChild(ArtCommon.getArtForEffects(card.effects));
            effectContainer.position.set(C.CARD_WIDTH / 2, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT / 2);
            effectContainer.scale.set(C.CARD_EFFECT_SCALE);
            front.addChild(effectContainer);
            var fullClipRect = new PIXI.Rectangle(0, -C.CARD_PAYMENT_HEIGHT, C.CARD_WIDTH, C.CARD_HEIGHT + C.CARD_PAYMENT_HEIGHT);
            var effectBounds = effectContainer.getBounds();
            var effectHalfWidth = Math.max(C.CARD_WIDTH / 2 - effectBounds.left, effectBounds.right - C.CARD_WIDTH / 2, C.CARD_EFFECT_HEIGHT / 2);
            var effectClipRect = new PIXI.Rectangle(C.CARD_WIDTH / 2 - effectHalfWidth - C.CARD_EFFECT_CLIP_PADDING, C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT / 2 - C.CARD_EFFECT_HEIGHT / 2 - C.CARD_EFFECT_CLIP_PADDING, 2 * effectHalfWidth + 2 * C.CARD_EFFECT_CLIP_PADDING, C.CARD_EFFECT_HEIGHT + 2 * C.CARD_EFFECT_CLIP_PADDING);
            var title = Shapes.centeredText(C.CARD_WIDTH / 2, C.CARD_TITLE_Y, card.name, C.CARD_TITLE_SCALE, C.CARD_TITLE_COLOR);
            title.anchor.y = 0;
            front.addChild(title);
            /* BACK */
            var back = new PIXI.Container();
            var backBase = Shapes.filledRoundedRect(0, 0, C.CARD_WIDTH, C.CARD_HEIGHT, C.CARD_CORNER_RADIUS, ArtCommon.ageBacks[card.age]);
            back.addChild(backBase);
            var backBg = Shapes.filledRoundedRect(C.CARD_BORDER, C.CARD_BORDER, C.CARD_WIDTH - 2 * C.CARD_BORDER, C.CARD_HEIGHT - 2 * C.CARD_BORDER, C.CARD_CORNER_RADIUS - C.CARD_BORDER, ArtCommon.cardBg);
            back.addChild(backBg);
            Resources.CARD_CACHE[id] = [{
                    front: render(front, C.CARD_WIDTH, C.CARD_HEIGHT),
                    back: render(back, C.CARD_WIDTH, C.CARD_HEIGHT),
                    fullClipRect: fullClipRect,
                    effectClipRect: effectClipRect,
                }];
            resource.loaded = true;
        };
    };
    Loader.prototype.loadWonder = function (wonder) {
        var resource = this.addNewResource();
        resource.load = function () {
            var wonderBoard = new PIXI.Container();
            // Board
            var boardBase = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, wonder.outline_color);
            wonderBoard.addChild(boardBase);
            var boardBg = Shapes.filledRoundedRect(C.WONDER_BOARD_BORDER, C.WONDER_BOARD_BORDER, C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
            wonderBoard.addChild(boardBg);
            var boardBgMask = boardBg.clone();
            wonderBoard.addChild(boardBgMask);
            // Starting effects
            var startingEffectContainer = new PIXI.Container();
            startingEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.starting_effects, 'dark'));
            startingEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.starting_effects));
            startingEffectContainer.scale.set(C.WONDER_STARTING_EFFECTS_SCALE);
            var startingEffectsBounds = startingEffectContainer.getBounds();
            startingEffectContainer.position.set(C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffectContainer.x), C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffectContainer.y));
            startingEffectsBounds = startingEffectContainer.getBounds();
            var startingEffectsPaddedBounds = new PIXI.Rectangle(startingEffectsBounds.left - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.top - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.width + 2 * C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2 * C.WONDER_STARTING_EFFECTS_PADDING);
            var startingEffectBanner = Shapes.filledRect(startingEffectsPaddedBounds.x, startingEffectsPaddedBounds.y, startingEffectsPaddedBounds.width, startingEffectsPaddedBounds.height, ArtCommon.cardBannerForColor(wonder.starting_effect_color));
            startingEffectBanner.mask = boardBgMask;
            wonderBoard.addChild(startingEffectBanner);
            wonderBoard.addChild(startingEffectContainer);
            // Wonder stages    
            var stagesMiddle = wonder.stages.length === 2 ? C.WONDER_STAGE_MIDDLE_2 : C.WONDER_STAGE_MIDDLE_134;
            var stageDX = wonder.stages.length === 4 ? C.WONDER_STAGE_DX_4 : C.WONDER_STAGE_DX_123;
            var stageXs = [];
            for (var i = 0; i < wonder.stages.length; i++) {
                stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1) / 2));
                var stageBase = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH / 2, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT, C.WONDER_STAGE_WIDTH, C.WONDER_STAGE_HEIGHT * 2, C.WONDER_STAGE_CORNER_RADIUS, wonder.outline_color);
                stageBase.mask = boardBgMask;
                stageBase.x = stageXs[i];
                wonderBoard.addChild(stageBase);
                var stageBg = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT + C.WONDER_BOARD_BORDER, C.WONDER_STAGE_WIDTH - 2 * C.WONDER_BOARD_BORDER, C.WONDER_STAGE_HEIGHT * 2 - 2 * C.WONDER_BOARD_BORDER, C.WONDER_STAGE_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
                stageBg.mask = boardBgMask;
                stageBg.x = stageXs[i];
                wonderBoard.addChild(stageBg);
                var stageEffectContainer = new PIXI.Container();
                stageEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.stages[i].effects, 'light'));
                stageEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.stages[i].effects));
                stageEffectContainer.scale.set(C.WONDER_STAGE_EFFECT_SCALE);
                stageEffectContainer.position.set(stageXs[i], C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT / 2);
                wonderBoard.addChild(stageEffectContainer);
                var stageCost = ArtCommon.getArtForStageCost(wonder.stages[i].cost);
                if (stageCost) {
                    stageCost.scale.set(C.WONDER_STAGE_COST_SCALE);
                    stageCost.position.set(stageXs[i] - C.WONDER_STAGE_WIDTH / 2 + C.WONDER_STAGE_COST_OFFSET_X, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_COST_OFFSET_Y);
                    var costBanner = Shapes.filledRoundedRect(-stageCost.width / 2 - C.WONDER_STAGE_COST_PADDING, -C.WONDER_STAGE_COST_PADDING, stageCost.width + 2 * C.WONDER_STAGE_COST_PADDING, stageCost.height + 2 * C.WONDER_STAGE_COST_PADDING, C.WONDER_STAGE_COST_PADDING, wonder.outline_color);
                    costBanner.position.set(stageCost.x, stageCost.y);
                    var costBannerBg = Shapes.filledRoundedRect(-stageCost.width / 2 - (C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), -(C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), stageCost.width + 2 * (C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), stageCost.height + 2 * (C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER), C.WONDER_STAGE_COST_PADDING - C.WONDER_STAGE_COST_BORDER, ArtCommon.wonderBg);
                    costBannerBg.position.set(stageCost.x, stageCost.y);
                    wonderBoard.addChild(costBanner);
                    wonderBoard.addChild(costBannerBg);
                    wonderBoard.addChild(stageCost);
                }
            }
            Resources.WONDER_CACHE[wonder.name + "/" + wonder.side] = [{
                    board: render(wonderBoard, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT),
                    startingEffectsRect: startingEffectsPaddedBounds,
                    stageXs: stageXs,
                }];
            resource.loaded = true;
        };
    };
    Loader.prototype.loadDiscardPile = function () {
        var resource = this.addNewResource();
        resource.load = function () {
            var discardPile = new PIXI.Container();
            discardPile.addChild(Shapes.filledRoundedRect(0, 0, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT, C.DISCARD_PILE_AREA_CORNER_RADIUS, ArtCommon.discardPileColor));
            discardPile.addChild(Shapes.filledRoundedRect(C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_WIDTH - 2 * C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_HEIGHT - 2 * C.DISCARD_PILE_AREA_BORDER, C.DISCARD_PILE_AREA_CORNER_RADIUS - C.DISCARD_PILE_AREA_BORDER, 0x000000));
            discardPile.addChild(Shapes.centeredText(C.DISCARD_PILE_AREA_WIDTH / 2, C.DISCARD_PILE_TITLE_Y, C.DISCARD_PILE_TITLE_TEXT, C.DISCARD_PILE_TITLE_SCALE, ArtCommon.discardPileColor));
            Resources.DISCARD_PILE = render(discardPile, C.DISCARD_PILE_AREA_WIDTH, C.DISCARD_PILE_AREA_HEIGHT);
            resource.loaded = true;
        };
    };
    Loader.prototype.addNewResource = function () {
        var resource = {
            load: undefined,
            loaded: false
        };
        this.resources.push(resource);
        return resource;
    };
    return Loader;
}());
var Main = /** @class */ (function () {
    function Main() {
    }
    Object.defineProperty(Main, "isHost", {
        get: function () { return this.gamestate.host === this.player; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Main, "isMoveImmune", {
        get: function () { return this.moveImmuneTime > 0; },
        enumerable: false,
        configurable: true
    });
    Main.start = function () {
        var _this = this;
        window.addEventListener('mousedown', function () { return _this.mouseDown = true; });
        window.addEventListener('mouseup', function () { return _this.mouseDown = false; });
        window.onmousemove = function (event) {
            event.preventDefault();
            _this.mouseX = event.pageX - window.innerWidth / 2;
            _this.mouseY = event.pageY - Main.getGameY();
        };
        this.mouseDown = false;
        this.game = document.getElementById('game');
        this.cardList = document.getElementById('cardlist');
        this.moveImmuneTime = 0;
        this.scriptManager = new ScriptManager(function () { return _this.delta; });
        var params = new URLSearchParams(window.location.search);
        this.gameid = params.get('gameid');
        var userpass = getCookieUserInfo();
        if (!userpass) {
            window.location.href = './login.html';
            return;
        }
        this.player = userpass.username;
        this.password_hash = userpass.password_hash;
        this.loader = new Loader(function () {
            _this.setupGame();
        });
        PIXI.Ticker.shared.add(function (delta) {
            _this.delta = delta / 60;
            _this.time += _this.delta;
            _this.update();
        });
        if (!this.gameid) {
            Main.error('gameid must be specified in URL parameters');
            return;
        }
        API.getgamestate(this.gameid, this.player, function (gamestate, error) {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                return;
            }
            console.log('Got game state:', gamestate);
            _this.gamestate = gamestate;
            API.getusers(_this.gamestate.players, function (users, error) {
                if (error) {
                    Main.error('Failed to get user info: ' + error);
                    return;
                }
                console.log('Got user info:', users);
                _this.users = users;
                PIXI.Loader.shared.add('wood', 'assets/wood.svg');
                PIXI.Loader.shared.add('stone', 'assets/stone.svg');
                PIXI.Loader.shared.add('ore', 'assets/ore.svg');
                PIXI.Loader.shared.add('clay', 'assets/clay.svg');
                PIXI.Loader.shared.add('glass', 'assets/glass.svg');
                PIXI.Loader.shared.add('press', 'assets/press.svg');
                PIXI.Loader.shared.add('loom', 'assets/loom.svg');
                PIXI.Loader.shared.add('shield', 'assets/shield.svg');
                PIXI.Loader.shared.add('goldcoin', 'assets/goldcoin.svg');
                PIXI.Loader.shared.add('pointswreath', 'assets/pointswreath.svg');
                PIXI.Loader.shared.add('compass', 'assets/compass.svg');
                PIXI.Loader.shared.add('tablet', 'assets/tablet.svg');
                PIXI.Loader.shared.add('gear', 'assets/gear.svg');
                PIXI.Loader.shared.add('pyramid_full', 'assets/pyramid_full.svg');
                PIXI.Loader.shared.add('pyramid_stages', 'assets/pyramid_stages.svg');
                PIXI.Loader.shared.add('falcon', 'assets/falcon.svg');
                PIXI.Loader.shared.load(function (loader, resources) {
                    for (var resource in resources) {
                        Resources.PIXI_TEXTURES[resource] = resources[resource].texture;
                    }
                    _this.loader.loadGamestateResources();
                });
            });
        });
    };
    Main.setupGame = function () {
        this.scene = this.gamestate.state === 'CHOOSE_WONDER_SIDE' ? new ChooseWonderScene() : new GameScene();
        this.scene.create();
        document.getElementById('cardlistelems').style.visibility = 'visible';
        this.cardListScene = new CardListScene();
        this.cardListScene.create();
        this.sendUpdate();
    };
    Main.createEndScreen = function () {
        this.endScreen = new EndScreen();
        this.endScreen.create();
        document.getElementById('endscreen').style.display = 'block';
    };
    Main.update = function () {
        this.loader.update();
        this.moveImmuneTime = clamp(this.moveImmuneTime - Main.delta, 0, Infinity);
        if (this.scene)
            this.scene.update();
        if (this.cardListScene)
            this.cardListScene.update();
        this.scriptManager.update();
        this.setStatus();
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
            else if (Main.gamestate.state === 'CHOOSE_WONDER_SIDE') {
                if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
                    var diffResult = GameStateDiffer.diffChooseSide(gamestate);
                    _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                        _this.gamestate = gamestate;
                        _this.sendUpdate();
                    })));
                }
                else {
                    _this.gamestate = gamestate;
                    _this.scene.destroy();
                    _this.scene = new GameScene();
                    _this.scene.create();
                    _this.sendUpdate();
                }
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
                _this.diffing = true;
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.diffing = false;
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
        var _this = this;
        API.submitmove(Main.gameid, Main.gamestate.turn, Main.player, move, function (error) {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Submitted move:', move);
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.undoMove = function () {
        var _this = this;
        API.undomove(this.gameid, this.gamestate.turn, this.player, function (error) {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Undo move successful');
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.chooseSide = function (side) {
        var _this = this;
        API.chooseside(Main.gameid, Main.player, side, function (error) {
            if (error) {
                Main.error(error);
                return;
            }
            console.log('Chose wonder side:', side);
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.setStatus = function () {
        var status = document.querySelector('#status');
        var statusText = document.querySelector('#status > p');
        if (Main.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.textContent = Main.currentError;
            return;
        }
        if (this.scene) {
            status.style.backgroundColor = C.OK_BG_COLOR;
            status.style.color = C.OK_TEXT_COLOR;
        }
        if (!this.loader.isLoaded) {
            statusText.textContent = "Loading... " + this.loader.loadPercentage + "%";
            return;
        }
        var gamestate = this.gamestate;
        var playerData = gamestate.playerData[this.player];
        if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
            if (playerData.currentMove) {
                statusText.textContent = "Waiting for others to choose their wonder side";
            }
            else {
                statusText.textContent = "You must choose your wonder side";
            }
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
                if (gamestate.lastCardPlayers.length === 1) {
                    statusText.textContent = "Waiting for " + gamestate.lastCardPlayers[0] + " to play their last card";
                }
                else {
                    statusText.textContent = "Waiting for others to play their last cards";
                }
            }
            else {
                statusText.textContent = "You may play your last card";
            }
        }
        else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === this.player) {
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
    Main.updateBotMoves = function () {
        var e_33, _a;
        var _this = this;
        if (!this.isHost)
            return;
        var _loop_5 = function (player) {
            if (player.startsWith('BOT') && !this_1.gamestate.playerData[player].currentMove) {
                var botPlayer_1 = player;
                if (this_1.gamestate.state === 'CHOOSE_WONDER_SIDE') {
                    var side_1 = Bot.chooseSide(this_1.gamestate.wonderChoices[botPlayer_1]);
                    API.chooseside(this_1.gameid, botPlayer_1, side_1, function (error) {
                        if (error) {
                            Main.error(error);
                            return;
                        }
                        console.log('Successfully chose bot wonder side:', side_1);
                    });
                }
                else {
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
            }
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                _loop_5(player);
            }
        }
        catch (e_33_1) { e_33 = { error: e_33_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_33) throw e_33.error; }
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
    Main.mouseX = 0;
    Main.mouseY = 0;
    Main.mouseDown = false;
    Main.time = 0;
    Main.delta = 0;
    return Main;
}());
var MilitaryOverlay = /** @class */ (function (_super) {
    __extends(MilitaryOverlay, _super);
    function MilitaryOverlay() {
        var _this = _super.call(this) || this;
        _this.div.appendChild(_this.draw());
        _this.div.className = 'wonderoverlay';
        _this.setShieldDiff(0);
        _this.setShields(0);
        _this.zIndex = C.Z_INDEX_MILITARY_OVERLAY;
        _this.alpha = 0;
        return _this;
    }
    MilitaryOverlay.prototype.setShieldDiff = function (diff) {
        this.overlayNeutral.style.visibility = (diff === 0) ? 'visible' : 'hidden';
        this.overlayVictory.style.visibility = (diff > 0) ? 'visible' : 'hidden';
        this.overlayDefeat.style.visibility = (diff < 0) ? 'visible' : 'hidden';
    };
    MilitaryOverlay.prototype.setShields = function (shields) {
        this.shieldsText.textContent = "" + shields;
    };
    MilitaryOverlay.prototype.draw = function () {
        var div = document.createElement('div');
        var pixiOverlayNeutral = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_NEUTRAL);
        pixiOverlayNeutral.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayNeutral = div.appendChild(render(pixiOverlayNeutral, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));
        var pixiOverlayVictory = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_VICTORY);
        pixiOverlayVictory.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayVictory = div.appendChild(render(pixiOverlayVictory, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));
        var pixiOverlayDefeat = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, C.WONDER_OVERLAY_COLOR_DEFEAT);
        pixiOverlayDefeat.alpha = C.WONDER_OVERLAY_ALPHA;
        this.overlayDefeat = div.appendChild(render(pixiOverlayDefeat, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT));
        var shield = div.appendChild(ArtCommon.domElementForArt(ArtCommon.shield(), C.WONDER_OVERLAY_SHIELD_SCALE));
        shield.style.position = 'absolute';
        shield.style.left = C.WONDER_OVERLAY_SHIELD_X + "px";
        shield.style.top = '0px';
        var textDiv = div.appendChild(document.createElement('div'));
        textDiv.style.width = '50%';
        textDiv.style.position = 'absolute';
        textDiv.style.transform = 'translate(-100%, 0)';
        this.shieldsText = textDiv.appendChild(document.createElement('p'));
        this.shieldsText.textContent = '0';
        this.shieldsText.style.fontFamily = "'Courier New', Courier, monospace";
        this.shieldsText.style.fontSize = C.WONDER_OVERLAY_TEXT_SIZE + "px";
        this.shieldsText.style.color = C.WONDER_OVERLAY_TEXT_COLOR;
        this.shieldsText.style.width = '100%';
        this.shieldsText.style.textAlign = 'right';
        this.shieldsText.style.transform = 'translate(0, -45%)';
        return div;
    };
    return MilitaryOverlay;
}(GameElement));
var MilitaryToken = /** @class */ (function (_super) {
    __extends(MilitaryToken, _super);
    function MilitaryToken(amount) {
        var _this = _super.call(this) || this;
        _this.amount = amount;
        _this.div.appendChild(_this.draw());
        _this.zIndex = C.Z_INDEX_MILITARY_TOKEN;
        return _this;
    }
    MilitaryToken.prototype.draw = function () {
        return ArtCommon.domElementForArt(ArtCommon.militaryToken(this.amount), C.TOKEN_SCALE);
    };
    return MilitaryToken;
}(GameElement));
var PaymentDialog = /** @class */ (function (_super) {
    __extends(PaymentDialog, _super);
    function PaymentDialog(scene, card, move, activeWonder) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.card = card;
        _this.move = move;
        _this.activeWonder = activeWonder;
        _this.div.appendChild(_this.draw());
        return _this;
    }
    PaymentDialog.prototype.update = function () {
        this.x = this.activeWonder.x + C.PAYMENT_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.PAYMENT_DIALOG_OFFSET_Y;
    };
    PaymentDialog.prototype.draw = function () {
        var _this = this;
        var validPayments = API.minimalPaymentOptions(this.move, Main.gamestate.validMoves);
        var dialogDiv = document.createElement('div');
        dialogDiv.style.width = C.PAYMENT_DIALOG_WIDTH + "px";
        dialogDiv.style.height = validPayments.length * C.PAYMENT_DIALOG_PAYMENTS_DY + C.PAYMENT_DIALOG_EXTRA_HEIGHT + "px";
        dialogDiv.style.backgroundColor = C.PAYMENT_DIALOG_COLOR;
        dialogDiv.style.borderRadius = C.PAYMENT_DIALOG_CORNER_RADIUS + "px";
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = "translate(-50%, -50%)";
        var dialogTitle = dialogDiv.appendChild(this.drawText(C.PAYMENT_DIALOG_TITLE, C.PAYMENT_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = C.PAYMENT_DIALOG_TITLE_PADDING + "px";
        var _a = __read(API.getNeighbors(Main.gamestate, Main.player), 2), negPlayer = _a[0], posPlayer = _a[1];
        var _loop_6 = function (i) {
            var leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = 50 - C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            leftDiv.style.height = C.PAYMENT_DIALOG_PAYMENTS_DY + "px";
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            var middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT + "%";
            middleDiv.style.height = C.PAYMENT_DIALOG_PAYMENTS_DY + "px";
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            var rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = 50 - C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            rightDiv.style.height = C.PAYMENT_DIALOG_PAYMENTS_DY + "px";
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';
            var payment = validPayments[i];
            if (payment.neg) {
                var paymentTextNegP = leftDiv.appendChild(this_2.drawText("<-- " + payment.neg + " to " + negPlayer, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextNegP.style.width = '100%';
                paymentTextNegP.style.textAlign = 'right';
                paymentTextNegP.style.position = 'absolute';
                paymentTextNegP.style.top = '50%';
                paymentTextNegP.style.transform = 'translate(0, -50%)';
            }
            if (payment.pos) {
                var paymentTextPosP = rightDiv.appendChild(this_2.drawText("to " + posPlayer + " " + payment.pos + " -->", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextPosP.style.width = '100%';
                paymentTextPosP.style.textAlign = 'left';
                paymentTextPosP.style.position = 'absolute';
                paymentTextPosP.style.top = '50%';
                paymentTextPosP.style.transform = 'translate(0, -50%)';
            }
            var payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.PAYMENT_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = C.PAYMENT_DIALOG_PAY_BUTTON_WIDTH + "px";
            payButton.style.height = C.PAYMENT_DIALOG_PAY_BUTTON_HEIGHT + "px";
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.onclick = function (event) {
                var trueMove = {
                    action: _this.move.action,
                    card: _this.move.card,
                    index: _this.move.index,
                    stage: _this.move.stage,
                    payment: validPayments[i]
                };
                Main.submitMove(trueMove);
                _this.removeFromGame(true);
            };
        };
        var this_2 = this;
        for (var i = 0; i < validPayments.length; i++) {
            _loop_6(i);
        }
        var closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = "calc(100% - " + C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_X + "px)";
        closeButton.style.top = C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_Y + "px";
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
        var X = ArtCommon.X(C.PAYMENT_DIALOG_CLOSE_BUTTON_COLOR);
        X.scale.set(C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
        X.position.set(100 * C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE, 100 * C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
        closeButton.addChild(X);
        return render(closeButton, 200 * C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE, 200 * C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE);
    };
    PaymentDialog.prototype.removeFromGame = function (success) {
        if (success === void 0) { success = false; }
        _super.prototype.removeFromGame.call(this);
        this.scene.paymentDialog = null;
        if (!success) {
            this.card.deselect();
        }
    };
    return PaymentDialog;
}(GameElement));
var PlayedCardEffectRoll = /** @class */ (function () {
    function PlayedCardEffectRoll(offsetx, offsety, reverse, sortCmp) {
        this.cards = [];
        this.x = 0;
        this.y = 0;
        this.offsetx = offsetx;
        this.offsety = offsety;
        this.reverse = reverse;
        this.sortCmp = sortCmp;
        this.placeholderIndex = -1;
        this.placeholderWidth = 0;
    }
    Object.defineProperty(PlayedCardEffectRoll.prototype, "width", {
        get: function () { return sum(this.cards, function (card) { return card.effectWidth; }); },
        enumerable: false,
        configurable: true
    });
    PlayedCardEffectRoll.prototype.destroy = function () {
        var e_34, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.destroy();
            }
        }
        catch (e_34_1) { e_34 = { error: e_34_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_34) throw e_34.error; }
        }
    };
    PlayedCardEffectRoll.prototype.update = function () {
        var d = this.reverse ? -1 : 1;
        for (var i = 0; i < this.cards.length; i++) {
            this.cards[i].targetPosition.set((i === 0)
                ? this.x + d * this.cards[i].effectWidth / 2
                : this.cards[i].x = this.cards[i - 1].x + d * (this.cards[i - 1].effectWidth / 2 + this.cards[i].effectWidth / 2), this.y);
            if (i === this.placeholderIndex) {
                this.cards[i].targetPosition.x += d * this.placeholderWidth;
            }
            this.cards[i].snapToTarget();
            this.cards[i].update();
        }
    };
    PlayedCardEffectRoll.prototype.canAddCard = function (card, maxWidth) {
        return this.width + card.effectWidth <= maxWidth;
    };
    PlayedCardEffectRoll.prototype.addCard = function (card) {
        var i = this.getSortedIndex(card);
        this.cards.splice(i, 0, card);
        card.zIndex = C.Z_INDEX_CARD_PLAYED;
        this.update();
    };
    PlayedCardEffectRoll.prototype.addPlaceholder = function (card) {
        this.removePlaceholder();
        this.placeholderIndex = this.getSortedIndex(card);
        this.placeholderWidth = card.effectWidth;
    };
    PlayedCardEffectRoll.prototype.removePlaceholder = function () {
        this.placeholderIndex = -1;
        this.placeholderWidth = 0;
    };
    PlayedCardEffectRoll.prototype.getNextPosition = function (card) {
        var d = this.reverse ? -1 : 1;
        var i = this.getSortedIndex(card);
        return new PIXI.Point(this.x + d * (this.widthAtIndex(i) + card.effectWidth / 2), this.y);
    };
    PlayedCardEffectRoll.prototype.getSortedIndex = function (card) {
        if (this.sortCmp) {
            for (var i = 0; i < this.cards.length; i++) {
                if (this.sortCmp(card, this.cards[i]) < 0)
                    return i;
            }
        }
        return this.cards.length;
    };
    PlayedCardEffectRoll.prototype.widthAtIndex = function (i) {
        var s = 0;
        for (var j = 0; j < i; j++) {
            s += this.cards[j].effectWidth;
        }
        return s;
    };
    return PlayedCardEffectRoll;
}());
var renderer = new PIXI.Renderer({ antialias: true, transparent: true });
var resolution = 2 * (window.devicePixelRatio || 1);
function render(object, width, height) {
    renderer.view.width = width * resolution;
    renderer.view.height = height * resolution;
    object.x *= resolution;
    object.y *= resolution;
    object.scale.x *= resolution;
    object.scale.y *= resolution;
    renderer.render(object);
    object.x /= resolution;
    object.y /= resolution;
    object.scale.x /= resolution;
    object.scale.y /= resolution;
    var canvas = cloneCanvas(renderer.view);
    canvas.style.width = width + "px";
    return canvas;
}
var Resources = /** @class */ (function () {
    function Resources() {
    }
    Resources.getCard = function (cardId) {
        if (!this.CARD_CACHE[cardId] || this.CARD_CACHE[cardId].length === 0) {
            console.error("Card id " + cardId + " not found in card cache", this.CARD_CACHE);
            return undefined;
        }
        var cache = this.CARD_CACHE[cardId];
        if (cache.length === 1) {
            return {
                front: cloneCanvas(cache[0].front),
                back: cloneCanvas(cache[0].back),
                fullClipRect: cache[0].fullClipRect.clone(),
                effectClipRect: cache[0].effectClipRect.clone(),
            };
        }
        return cache.pop();
    };
    Resources.returnCard = function (cardId, cardResource) {
        if (!this.CARD_CACHE[cardId]) {
            console.error("Card id " + cardId + " not found in card cache", this.CARD_CACHE);
            return undefined;
        }
        if (!cardResource)
            return;
        this.CARD_CACHE[cardId].push(cardResource);
    };
    Resources.getWonder = function (name, side) {
        var key = name + "/" + side;
        if (!this.WONDER_CACHE[key] || this.WONDER_CACHE[key].length === 0) {
            console.error("Wonder " + key + " not found in wonder cache", this.WONDER_CACHE);
            return undefined;
        }
        var cache = this.WONDER_CACHE[key];
        if (cache.length === 1) {
            return {
                board: cloneCanvas(cache[0].board),
                startingEffectsRect: cache[0].startingEffectsRect.clone(),
                stageXs: cloneArray(cache[0].stageXs),
            };
        }
        return cache.pop();
    };
    Resources.returnWonder = function (name, side, wonderResource) {
        var key = name + "/" + side;
        if (!this.WONDER_CACHE[key] || this.WONDER_CACHE[key].length === 0) {
            console.error("Wonder " + key + " not found in wonder cache", this.WONDER_CACHE);
            return undefined;
        }
        if (!wonderResource)
            return;
        this.WONDER_CACHE[key].push(wonderResource);
    };
    Resources.PIXI_TEXTURES = {};
    Resources.CARD_CACHE = {};
    Resources.WONDER_CACHE = {};
    return Resources;
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
    Shapes.filledOctagon = function (x, y, apothem, color) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.drawStar(x, y, 8, apothem, apothem / Math.cos(Math.PI / 8));
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
/// <reference path="./popup.ts" />
var StageInfoPopup = /** @class */ (function (_super) {
    __extends(StageInfoPopup, _super);
    function StageInfoPopup(stage) {
        var _this = _super.call(this) || this;
        _this.stage = stage;
        _this.div.className = 'popup';
        return _this;
    }
    StageInfoPopup.prototype.getSource = function () {
        return this.stage;
    };
    StageInfoPopup.prototype.draw = function () {
        var _a, _b;
        var box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';
        var currentY = 16;
        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', currentY + "px"));
        currentY += 24;
        // Cost
        var resourceCost = ((_a = this.stage.cost) === null || _a === void 0 ? void 0 : _a.resources) || [];
        var goldCost = ((_b = this.stage.cost) === null || _b === void 0 ? void 0 : _b.gold) || 0;
        var isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText("Cost:" + (isFree ? ' None' : ''), '10px', currentY + "px"));
        if (this.stage.cost) {
            var currentX = 60;
            var _loop_7 = function (i) {
                var resource = box.appendChild(document.createElement('div'));
                var resourceArt = new PIXI.Container();
                resourceArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.resource(resourceCost[i]); }, 'dark'));
                resourceArt.addChild(ArtCommon.resource(resourceCost[i]));
                resource.appendChild(ArtCommon.domElementForArt(resourceArt, 1, 10));
                resource.style.transform = 'scale(0.2)';
                resource.style.position = 'absolute';
                resource.style.left = currentX + "px";
                resource.style.top = currentY + "px";
                currentX += 22;
            };
            for (var i = 0; i < resourceCost.length; i++) {
                _loop_7(i);
            }
            if (goldCost > 0) {
                var gold = box.appendChild(document.createElement('div'));
                var goldArt = new PIXI.Container();
                goldArt.addChild(ArtCommon.getShadowForArt(function () { return ArtCommon.gold(goldCost); }, 'dark'));
                goldArt.addChild(ArtCommon.gold(goldCost));
                gold.appendChild(ArtCommon.domElementForArt(goldArt, 1, 10));
                gold.style.transform = 'scale(0.2)';
                gold.style.position = 'absolute';
                gold.style.left = currentX + "px";
                gold.style.top = currentY + "px";
                currentX += 22;
            }
        }
        currentY += 24;
        // Effects
        box.appendChild(this.infoText('Effects:', '10px', currentY + "px"));
        currentY += 20;
        var effects = this.stage.effects;
        for (var i = 0; i < effects.length; i++) {
            var effect = box.appendChild(document.createElement('div'));
            var effectArt = new PIXI.Container();
            effectArt.addChild(ArtCommon.getShadowForEffects([effects[i]], 'dark'));
            effectArt.addChild(ArtCommon.getArtForEffects([effects[i]]));
            effect.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
            effect.style.transform = 'scale(0.2)';
            effect.style.position = 'absolute';
            effect.style.left = 10 + effectArt.width / 10 + "px";
            effect.style.top = currentY + "px";
            var description = this.infoText(getDescriptionForEffect(effects[i]), 20 + effectArt.width / 5 + "px", currentY + "px");
            description.style.fontSize = C.CARD_INFO_EFFECT_DESCRIPTION_SIZE + "px";
            description.style.marginRight = '10px';
            box.appendChild(description);
            currentY += 24;
        }
        var padding = 10;
        box.style.width = this.width - padding + "px";
        box.style.height = currentY + "px";
        box.style.paddingRight = padding + "px";
        return box;
    };
    return StageInfoPopup;
}(Popup));
/// <reference path="./popup.ts" />
var StartingEffectsInfoPopup = /** @class */ (function (_super) {
    __extends(StartingEffectsInfoPopup, _super);
    function StartingEffectsInfoPopup(wonder) {
        var _this = _super.call(this) || this;
        _this.wonder = wonder;
        _this.div.className = 'popup';
        return _this;
    }
    StartingEffectsInfoPopup.prototype.getSource = function () {
        return this.wonder;
    };
    StartingEffectsInfoPopup.prototype.draw = function () {
        var box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';
        var currentY = 16;
        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Starting Effects</span>', '10px', currentY + "px"));
        currentY += 24;
        // Effects
        box.appendChild(this.infoText('Effects:', '10px', currentY + "px"));
        currentY += 20;
        var effects = this.wonder.starting_effects;
        for (var i = 0; i < effects.length; i++) {
            var effect = box.appendChild(document.createElement('div'));
            var effectArt = new PIXI.Container();
            effectArt.addChild(ArtCommon.getShadowForEffects([effects[i]], 'dark'));
            effectArt.addChild(ArtCommon.getArtForEffects([effects[i]]));
            effect.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
            effect.style.transform = 'scale(0.2)';
            effect.style.position = 'absolute';
            effect.style.left = 10 + effectArt.width / 10 + "px";
            effect.style.top = currentY + "px";
            var description = this.infoText(getDescriptionForEffect(effects[i]), 20 + effectArt.width / 5 + "px", currentY + "px");
            description.style.fontSize = C.CARD_INFO_EFFECT_DESCRIPTION_SIZE + "px";
            description.style.marginRight = '10px';
            box.appendChild(description);
            currentY += 24;
        }
        var padding = 10;
        box.style.width = this.width - padding + "px";
        box.style.height = currentY + "px";
        box.style.paddingRight = padding + "px";
        return box;
    };
    return StartingEffectsInfoPopup;
}(Popup));
function clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
function cloneArray(array) {
    return array.slice();
}
function cloneCanvas(canvas) {
    var newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    newCanvas.getContext('2d').drawImage(canvas, 0, 0);
    newCanvas.style.width = canvas.style.width;
    newCanvas.style.height = canvas.style.height;
    return newCanvas;
}
function contains(array, element) {
    var e_35, _a;
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var e = array_1_1.value;
            if (e === element)
                return true;
        }
    }
    catch (e_35_1) { e_35 = { error: e_35_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_35) throw e_35.error; }
    }
    return false;
}
function filledArray(len, fillWith) {
    var result = [];
    for (var i = 0; i < len; i++) {
        result.push(fillWith);
    }
    return result;
}
function getCookieUserInfo() {
    var cookies = document.cookie.split('; ');
    var usernameCookie = cookies.find(function (l) { return l.startsWith('username='); });
    var passwordHashCookie = cookies.find(function (l) { return l.startsWith('password_hash='); });
    if (!usernameCookie || !passwordHashCookie) {
        return undefined;
    }
    return {
        username: usernameCookie.split('username=')[1],
        password_hash: passwordHashCookie.split('password_hash=')[1]
    };
}
function hash(str) {
    var hash = 0, i, chr;
    if (!str || str.length === 0)
        return '0';
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32-bit integer
    }
    return "" + hash;
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
/** Inclusive */
function randInt(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}
function randElement(array) {
    return array[randInt(0, array.length - 1)];
}
/** Inclusive */
function range(start, end) {
    var result = [];
    for (var i = start; i <= end; i++) {
        result.push(i);
    }
    return result;
}
function sum(array, key) {
    var e_36, _a;
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
    catch (e_36_1) { e_36 = { error: e_36_1 }; }
    finally {
        try {
            if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
        }
        finally { if (e_36) throw e_36.error; }
    }
    return result;
}
/// <reference path="gameElement.ts" />
var Wonder = /** @class */ (function (_super) {
    __extends(Wonder, _super);
    function Wonder(scene, wonder, player) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.wonder = wonder;
        _this.player = player;
        _this.create();
        return _this;
    }
    Wonder.prototype.create = function () {
        var e_37, _a, e_38, _b;
        var _this = this;
        var playerData = Main.gamestate.playerData[this.player];
        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);
        this.stageXs = this.wonderResource.stageXs;
        var boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);
        var payments = boardDiv.appendChild(this.drawPayments());
        payments.style.transform = "translate(-50%, " + (C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + C.WONDER_STAGE_PAYMENT_OFFSET_Y) + "px)";
        var sidebar = this.div.appendChild(this.drawSidebar());
        sidebar.style.left = C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_WIDTH + "px";
        sidebar.style.top = -C.WONDER_BOARD_HEIGHT / 2 + "px";
        this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2, -C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_RESOURCE_ROLL_OFFSET_Y, false, C.SORT_CMP_RESOURCES),
            grey: undefined,
            red: new PlayedCardEffectRoll(C.WONDER_RED_ROLL_X, -C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_RED_ROLL_Y, false, null),
            yellow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_YELLOW_ROLL_Y, false, null),
            purple: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_PURPLE_ROLL_Y, false, null),
            blue: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_BORDER, C.WONDER_BLUE_ROLL_Y, true, null),
            green: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_BORDER, C.WONDER_GREEN_ROLL_Y, true, C.SORT_CMP_SCIENCE),
            overflow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2, -C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_OVERFLOW_ROLL_OFFSET_Y, false, null),
        };
        this.playedCardEffectRolls.grey = this.playedCardEffectRolls.brown;
        try {
            for (var _c = __values(playerData.playedCards), _d = _c.next(); !_d.done; _d = _c.next()) {
                var apiCardId = _d.value;
                var card = new Card(this.scene, apiCardId, -1, undefined, this, []);
                this.addNewCardEffect(card);
                card.addToGame();
            }
        }
        catch (e_37_1) { e_37 = { error: e_37_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_37) throw e_37.error; }
        }
        this.builtWonderCards = [];
        try {
            for (var _e = __values(playerData.stagesBuilt), _f = _e.next(); !_f.done; _f = _e.next()) {
                var stageBuilt = _f.value;
                var justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
                var card = Card.flippedCardForAge(this.scene, stageBuilt.cardAge, justPlayed);
                card.zIndex = C.Z_INDEX_CARD_WONDER;
                this.builtWonderCards.push(card);
                card.addToGame();
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_38) throw e_38.error; }
        }
        // Starting effects popup
        var popupDiv = this.div.appendChild(document.createElement('div'));
        popupDiv.style.position = 'absolute';
        popupDiv.style.left = -C.WONDER_BOARD_WIDTH / 2 + this.wonderResource.startingEffectsRect.left + "px";
        popupDiv.style.top = -C.WONDER_BOARD_HEIGHT / 2 + this.wonderResource.startingEffectsRect.top + "px";
        popupDiv.style.width = this.wonderResource.startingEffectsRect.width + "px";
        popupDiv.style.height = this.wonderResource.startingEffectsRect.height + "px";
        popupDiv.onmousemove = function () {
            if (Main.scene.isCurrentlyDragging()) {
                Main.scene.stopPopup(_this.wonder);
                return;
            }
            Main.scene.updatePopup(_this.wonder, _this.x - C.WONDER_BOARD_WIDTH / 2 + _this.wonderResource.startingEffectsRect.left, _this.y - C.WONDER_BOARD_HEIGHT / 2 + _this.wonderResource.startingEffectsRect.top + _this.wonderResource.startingEffectsRect.height);
        };
        popupDiv.onmouseleave = function () {
            Main.scene.stopPopup(_this.wonder);
        };
        var _loop_8 = function (i) {
            var stageX = this_3.wonderResource.stageXs[i];
            var wonderStage = this_3.wonder.stages[i];
            var popupDiv_1 = this_3.div.appendChild(document.createElement('div'));
            popupDiv_1.style.position = 'absolute';
            popupDiv_1.style.left = -C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2 + "px";
            popupDiv_1.style.top = C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_1.style.width = C.WONDER_STAGE_WIDTH + "px";
            popupDiv_1.style.height = C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_1.onmousemove = function () {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(wonderStage);
                    return;
                }
                Main.scene.updatePopup(wonderStage, _this.x - C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2, _this.y + C.WONDER_BOARD_HEIGHT / 2);
            };
            popupDiv_1.onmouseleave = function () {
                Main.scene.stopPopup(wonderStage);
            };
        };
        var this_3 = this;
        // Stage popups
        for (var i = 0; i < this.wonder.stages.length; i++) {
            _loop_8(i);
        }
        this.zIndex = C.Z_INDEX_WONDER;
    };
    Wonder.prototype.destroy = function () {
        var e_39, _a;
        for (var color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].destroy();
        }
        try {
            for (var _b = __values(this.builtWonderCards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.destroy();
            }
        }
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_39) throw e_39.error; }
        }
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnWonder(this.wonder.name, this.wonder.side, this.wonderResource);
        this.wonderResource = null;
    };
    Wonder.prototype.update = function () {
        for (var color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].x = this.x + this.playedCardEffectRolls[color].offsetx;
            this.playedCardEffectRolls[color].y = this.y + this.playedCardEffectRolls[color].offsety;
            this.playedCardEffectRolls[color].update();
        }
        for (var i = 0; i < this.builtWonderCards.length; i++) {
            this.builtWonderCards[i].targetPosition.set(this.x - C.WONDER_BOARD_WIDTH / 2 + this.stageXs[Main.gamestate.playerData[this.player].stagesBuilt[i].stage], this.y + C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_BUILT_STAGE_OFFSET_Y);
            this.builtWonderCards[i].snapToTarget();
            this.builtWonderCards[i].update();
        }
    };
    Wonder.prototype.getMainRegion = function () {
        return new PIXI.Rectangle(this.x - C.WONDER_BOARD_WIDTH / 2, this.y - C.WONDER_BOARD_HEIGHT / 2, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT);
    };
    Wonder.prototype.getStageRegion = function () {
        return new PIXI.Rectangle(this.x - C.WONDER_BOARD_WIDTH / 2, this.y + C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT, C.WONDER_BOARD_WIDTH, 2 * C.WONDER_STAGE_HEIGHT);
    };
    Wonder.prototype.getClosestStageId = function (posx) {
        var minStage = 0;
        for (var i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x - C.WONDER_BOARD_WIDTH / 2 + this.stageXs[i] - posx) < Math.abs(this.x - C.WONDER_BOARD_WIDTH / 2 + this.stageXs[minStage] - posx)) {
                minStage = i;
            }
        }
        return minStage;
    };
    Wonder.prototype.getCardPositionForStage = function (stage) {
        return new PIXI.Point(this.x - C.WONDER_BOARD_WIDTH / 2 + this.stageXs[stage], this.y + C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_BUILT_STAGE_OFFSET_Y);
    };
    Wonder.prototype.getNewCardEffectWorldPosition = function (card) {
        var color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            return this.playedCardEffectRolls[color].getNextPosition(card);
        }
        else {
            return this.playedCardEffectRolls.overflow.getNextPosition(card);
        }
    };
    Wonder.prototype.getGoldCoinWorldPosition = function () {
        return new PIXI.Point(this.x + C.WONDER_BOARD_WIDTH / 2 + C.WONDER_SIDEBAR_GOLD_COIN_X, this.y - C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_SIDEBAR_GOLD_COIN_Y);
    };
    Wonder.prototype.getMilitaryTokenWorldPosition = function (i) {
        return new PIXI.Point(this.x + C.WONDER_BOARD_WIDTH / 2 + C.WONDER_SIDEBAR_TOKENS_X + C.WONDER_SIDEBAR_TOKENS_DX * i, this.y - C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_SIDEBAR_TOKENS_Y);
    };
    Wonder.prototype.addNewCardEffect = function (card) {
        var playerData = Main.gamestate.playerData[this.player];
        var justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'play' && playerData.lastMove.card === card.apiCardId);
        card.state = { type: 'effect', justPlayed: justPlayed };
        card.snap();
        var color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addCard(card);
        }
        else {
            this.playedCardEffectRolls.overflow.addCard(card);
        }
    };
    Wonder.prototype.adjustPlaceholdersFor = function (card) {
        this.removePlaceholders();
        if (card && (card.state.type === 'effect' || card.state.type === 'locked_play')) {
            this.addPlaceholder(card);
        }
    };
    Wonder.prototype.addPlaceholder = function (card) {
        var color = card.apiCard.color;
        if (this.playedCardEffectRolls[color].canAddCard(card, this.getCardEffectRollMaxWidth(color))) {
            this.playedCardEffectRolls[color].addPlaceholder(card);
        }
    };
    Wonder.prototype.removePlaceholders = function () {
        for (var color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].removePlaceholder();
        }
    };
    Wonder.prototype.getCardEffectRollMaxWidth = function (color) {
        return {
            'brown': C.WONDER_BOARD_WIDTH,
            'grey': C.WONDER_BOARD_WIDTH,
            'red': C.WONDER_RED_ROLL_MAX_X - C.WONDER_RED_ROLL_X,
            'yellow': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
        }[color];
    };
    Wonder.prototype.drawPayments = function () {
        var e_40, _a;
        var wonder = Main.gamestate.wonders[this.player];
        var playerData = Main.gamestate.playerData[this.player];
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
        catch (e_40_1) { e_40 = { error: e_40_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_40) throw e_40.error; }
        }
        var payments = new PIXI.Container();
        for (var i = 0; i < wonder.stages.length; i++) {
            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                var stagePayment = ArtCommon.payment(wonderStageMinCosts[i]);
                stagePayment.scale.set(C.WONDER_STAGE_PAYMENT_SCALE);
                stagePayment.position.set(this.stageXs[i] + C.WONDER_STAGE_PAYMENT_OFFSET_X, 0);
                payments.addChild(stagePayment);
            }
        }
        payments.position.set(C.WONDER_STAGE_WIDTH / 2, C.WONDER_PAYMENT_HEIGHT / 2);
        return render(payments, C.WONDER_BOARD_WIDTH, C.WONDER_PAYMENT_HEIGHT);
    };
    Wonder.prototype.drawSidebar = function () {
        var sidebar = document.createElement('div');
        sidebar.style.width = C.WONDER_BOARD_WIDTH + "px";
        sidebar.style.height = C.WONDER_BOARD_HEIGHT + "px";
        sidebar.style.position = 'absolute';
        var nameElo = this.player in Main.users ? this.player + "<span style=\"font-size: 12px\"> (" + Math.round(Main.users[this.player].elo) + ")</span>" : this.player;
        var nameText = sidebar.appendChild(this.drawSidebarText(nameElo, C.WONDER_SIDEBAR_NAME_SIZE));
        nameText.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_NAME_X + "px";
        nameText.style.top = C.WONDER_SIDEBAR_NAME_Y + "px";
        var goldCoin = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.goldCoin(), C.WONDER_SIDEBAR_GOLD_COIN_SCALE));
        goldCoin.style.position = 'absolute';
        goldCoin.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_GOLD_COIN_X + "px";
        goldCoin.style.top = C.WONDER_SIDEBAR_GOLD_COIN_Y + "px";
        var goldText = sidebar.appendChild(this.drawSidebarText("" + Main.gamestate.playerData[this.player].gold, C.WONDER_SIDEBAR_GOLD_TEXT_SIZE));
        goldText.style.color = ArtCommon.goldColorHtml;
        goldText.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_GOLD_TEXT_X + "px";
        goldText.style.top = C.WONDER_SIDEBAR_GOLD_TEXT_Y + "px";
        this.goldText = goldText.querySelector('p');
        var pointsWreath = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.pointsWreath(), C.WONDER_SIDEBAR_POINTS_WREATH_SCALE));
        pointsWreath.style.position = 'absolute';
        pointsWreath.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_POINTS_WREATH_X + "px";
        pointsWreath.style.top = C.WONDER_SIDEBAR_POINTS_WREATH_Y + "px";
        var pointsText = sidebar.appendChild(this.drawSidebarText("" + Main.gamestate.playerData[this.player].pointsDistribution.total, C.WONDER_SIDEBAR_POINTS_TEXT_SIZE));
        pointsText.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_POINTS_TEXT_X + "px";
        pointsText.style.top = C.WONDER_SIDEBAR_POINTS_TEXT_Y + "px";
        this.pointsText = pointsText.querySelector('p');
        for (var i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            var token = sidebar.appendChild(ArtCommon.domElementForArt(ArtCommon.militaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]), C.TOKEN_SCALE));
            token.style.position = 'absolute';
            token.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_TOKENS_X + C.WONDER_SIDEBAR_TOKENS_DX * i + "px";
            token.style.top = C.WONDER_SIDEBAR_TOKENS_Y + "px";
        }
        return sidebar;
    };
    Wonder.prototype.drawSidebarText = function (text, size) {
        var div = document.createElement('div');
        div.style.width = '50%';
        div.style.position = 'absolute';
        div.style.transform = 'translate(-100%, 0)';
        var p = div.appendChild(document.createElement('p'));
        p.innerHTML = text;
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
/// <reference path="gameElement.ts" />
var WonderBoardForChoose = /** @class */ (function (_super) {
    __extends(WonderBoardForChoose, _super);
    function WonderBoardForChoose(scene, wonder, side, player) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.wonder = wonder;
        _this.side = side;
        _this.player = player;
        _this.create();
        return _this;
    }
    WonderBoardForChoose.prototype.create = function () {
        var _this = this;
        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);
        var boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);
        var sidebar = this.div.appendChild(this.drawSidebar());
        sidebar.style.left = C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_WIDTH + "px";
        sidebar.style.top = -C.WONDER_BOARD_HEIGHT / 2 + "px";
        // Starting effects popup
        var popupDiv = this.div.appendChild(document.createElement('div'));
        popupDiv.style.position = 'absolute';
        popupDiv.style.left = -C.WONDER_BOARD_WIDTH / 2 + this.wonderResource.startingEffectsRect.left + "px";
        popupDiv.style.top = -C.WONDER_BOARD_HEIGHT / 2 + this.wonderResource.startingEffectsRect.top + "px";
        popupDiv.style.width = this.wonderResource.startingEffectsRect.width + "px";
        popupDiv.style.height = this.wonderResource.startingEffectsRect.height + "px";
        popupDiv.onmousemove = function () {
            if (Main.scene.isCurrentlyDragging()) {
                Main.scene.stopPopup(_this.wonder);
                return;
            }
            Main.scene.updatePopup(_this.wonder, _this.x - C.WONDER_BOARD_WIDTH / 2 + _this.wonderResource.startingEffectsRect.left, _this.y - C.WONDER_BOARD_HEIGHT / 2 + _this.wonderResource.startingEffectsRect.top + _this.wonderResource.startingEffectsRect.height);
        };
        popupDiv.onmouseleave = function () {
            Main.scene.stopPopup(_this.wonder);
        };
        var _loop_9 = function (i) {
            var stageX = this_4.wonderResource.stageXs[i];
            var wonderStage = this_4.wonder.stages[i];
            var popupDiv_2 = this_4.div.appendChild(document.createElement('div'));
            popupDiv_2.style.position = 'absolute';
            popupDiv_2.style.left = -C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2 + "px";
            popupDiv_2.style.top = C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_2.style.width = C.WONDER_STAGE_WIDTH + "px";
            popupDiv_2.style.height = C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_2.onmousemove = function () {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(wonderStage);
                    return;
                }
                Main.scene.updatePopup(wonderStage, _this.x - C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2, _this.y + C.WONDER_BOARD_HEIGHT / 2);
            };
            popupDiv_2.onmouseleave = function () {
                Main.scene.stopPopup(wonderStage);
            };
        };
        var this_4 = this;
        // Stage popups
        for (var i = 0; i < this.wonder.stages.length; i++) {
            _loop_9(i);
        }
        // Selection
        if (this.player === Main.player) {
            this.selection = this.drawSelection();
            this.selection.style.visibility = 'hidden';
            this.div.appendChild(this.selection);
            this.div.style.cursor = 'pointer';
            this.div.onclick = function (event) {
                if (event.button !== 0)
                    return;
                Main.chooseSide(_this.side);
                _this.scene.selectSide(_this.side);
            };
        }
        this.zIndex = C.Z_INDEX_WONDER;
    };
    WonderBoardForChoose.prototype.destroy = function () {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnWonder(this.wonder.name, this.wonder.side, this.wonderResource);
        this.wonderResource = null;
    };
    WonderBoardForChoose.prototype.select = function () {
        this.selection.style.visibility = 'visible';
    };
    WonderBoardForChoose.prototype.deselect = function () {
        this.selection.style.visibility = 'hidden';
    };
    WonderBoardForChoose.prototype.drawSelection = function () {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(ArtCommon.selectionColor, 1);
        graphics.drawRoundedRect(0, 0, C.WONDER_BOARD_WIDTH + 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT + 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_CORNER_RADIUS + C.WONDER_BOARD_BORDER);
        graphics.endFill();
        graphics.beginHole();
        graphics.drawRoundedRect(C.WONDER_BOARD_BORDER, C.WONDER_BOARD_BORDER, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS);
        graphics.endHole();
        return render(graphics, C.WONDER_BOARD_WIDTH + 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT + 2 * C.WONDER_BOARD_BORDER);
    };
    WonderBoardForChoose.prototype.drawSidebar = function () {
        var sidebar = document.createElement('div');
        sidebar.style.width = C.WONDER_BOARD_WIDTH + "px";
        sidebar.style.height = C.WONDER_BOARD_HEIGHT + "px";
        sidebar.style.position = 'absolute';
        var nameElo = this.player in Main.users ? this.player + "<span style=\"font-size: 12px\"> (" + Math.round(Main.users[this.player].elo) + ")</span>" : this.player;
        var nameText = sidebar.appendChild(this.drawSidebarText(nameElo, C.WONDER_SIDEBAR_NAME_SIZE));
        nameText.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_NAME_X + "px";
        nameText.style.top = C.WONDER_SIDEBAR_NAME_Y + "px";
        return sidebar;
    };
    WonderBoardForChoose.prototype.drawSidebarText = function (text, size) {
        var div = document.createElement('div');
        div.style.width = '50%';
        div.style.position = 'absolute';
        div.style.transform = 'translate(-100%, 0)';
        var p = div.appendChild(document.createElement('p'));
        p.innerHTML = text;
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = size + "px";
        p.style.color = "#FFFFFF";
        p.style.width = '100%';
        p.style.textAlign = 'right';
        p.style.transform = 'translate(0, -50%)';
        return div;
    };
    return WonderBoardForChoose;
}(GameElement));
var CreateGameSection = /** @class */ (function () {
    function CreateGameSection() {
    }
    CreateGameSection.prototype.create = function () {
        var TOP_Y = 80;
        var DY = 32;
        this.playersElement = document.getElementById('createsectionplayers');
        this.optionsElement = document.getElementById('createsectionoptions');
        // Players
        var players = LobbyMain.user.friends;
        for (var i = 0; i < players.length; i++) {
            this.playersElement.appendChild(this.checkbox('player', players[i], players[i], 32, TOP_Y + DY * i, false));
        }
        this.playersElement.appendChild(this.botbox(32, TOP_Y + DY * players.length));
        // Options
        this.optionsElement.appendChild(this.checkbox('option', 'Use wonder preferences', 'respect_preferences', 32, TOP_Y, true));
    };
    CreateGameSection.prototype.getOptions = function () {
        var players = [LobbyMain.username];
        var flags = [];
        document.querySelectorAll('input[id^=player_]').forEach(function (node) {
            var input = node;
            var player = input.getAttribute('data');
            if (input.checked) {
                players.push(player);
            }
        });
        var bots = document.querySelector('#bots');
        var numBots = parseInt(bots.value);
        for (var i = 1; i <= numBots; i++) {
            players.push("BOT" + i);
        }
        document.querySelectorAll('input[id^=option_]').forEach(function (node) {
            var input = node;
            var flag = input.getAttribute('data');
            if (input.checked) {
                flags.push(flag);
            }
        });
        return {
            players: players,
            flags: flags
        };
    };
    CreateGameSection.prototype.checkbox = function (type, label, data, x, y, checked) {
        var element = document.createElement('div');
        element.className = 'createsectiondata';
        element.style.left = x + "px";
        element.style.top = y + "px";
        var input = document.createElement('input');
        input.id = type + "_" + label;
        input.setAttribute('data', data);
        input.className = 'createsectioninput';
        input.type = 'checkbox';
        input.checked = checked;
        var labelE = document.createElement('label');
        labelE.setAttribute('for', type + "_" + label);
        labelE.className = 'createsectioninputtext';
        labelE.innerText = label;
        labelE.style.left = '20px';
        labelE.style.top = '-2px';
        element.appendChild(input);
        element.appendChild(labelE);
        return element;
    };
    CreateGameSection.prototype.botbox = function (x, y) {
        var element = document.createElement('div');
        element.className = 'createsectiondata';
        element.style.left = x + "px";
        element.style.top = y + "px";
        var input = document.createElement('input');
        input.id = 'bots';
        input.className = 'createsectiontextbox';
        input.type = 'text';
        input.value = '0';
        var labelE = document.createElement('label');
        labelE.setAttribute('for', 'bots');
        labelE.className = 'createsectioninputtext';
        labelE.innerText = 'Bots';
        labelE.style.left = '20px';
        labelE.style.top = '0px';
        element.appendChild(input);
        element.appendChild(labelE);
        return element;
    };
    return CreateGameSection;
}());
var LobbyMain = /** @class */ (function () {
    function LobbyMain() {
    }
    LobbyMain.redirectIfNotLoggedIn = function () {
        if (!getCookieUserInfo()) {
            window.location.href = './login.html';
        }
    };
    LobbyMain.start = function () {
        var _this = this;
        window.addEventListener('mousedown', function () { return _this.mouseDown = true; });
        window.addEventListener('mouseup', function () { return _this.mouseDown = false; });
        window.onmousemove = function (event) {
            event.preventDefault();
            _this.mouseX = event.pageX;
            _this.mouseY = event.pageY;
        };
        this.mouseDown = false;
        this.scriptManager = new ScriptManager(function () { return _this.delta; });
        var userpass = getCookieUserInfo();
        if (!userpass) {
            window.location.href = './login.html';
            return;
        }
        this.username = userpass.username;
        this.password_hash = userpass.password_hash;
        document.getElementsByClassName('userinfo')[0].innerHTML = "Logged in as " + this.username + " (<a class=\"userinfolink\" href=\"\" onclick=\"Login.logout()\">Logout</a>)";
        PIXI.Ticker.shared.add(function (delta) {
            _this.delta = delta / 60;
            _this.update();
        });
        API.getusers([this.username], function (users, error) {
            if (error) {
                _this.error(error, true);
                return;
            }
            if (!users[_this.username]) {
                _this.error("User " + _this.username + " does not exist", true);
                return;
            }
            console.log('Fetched user:', users[_this.username]);
            _this.user = users[_this.username];
            _this.load();
        });
    };
    LobbyMain.load = function () {
        this.wonderPreferenceList = new WonderPreferenceList();
        this.wonderPreferenceList.create();
        this.createGameSection = new CreateGameSection();
        this.createGameSection.create();
        this.getInvites();
    };
    LobbyMain.createGame = function () {
        var _this = this;
        var options = this.createGameSection.getOptions();
        API.creategame(options, function (gameid, error) {
            if (error) {
                _this.error('Failed to create game: ' + error);
                return;
            }
            console.log('Created game with id:', gameid);
            window.location.href = "./game.html?gameid=" + gameid;
        });
        // Disable button for a bit to avoid duplicate game creation
        this.scriptManager.runScript(function () {
            var button;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        button = document.getElementById('createsectionbutton');
                        button.disabled = true;
                        button.style.backgroundColor = '#888888';
                        button.querySelector('p').innerText = 'Creating...';
                        return [5 /*yield**/, __values(S.wait(3)())];
                    case 1:
                        _a.sent();
                        button.disabled = false;
                        button.style.backgroundColor = '#FFFFFF';
                        button.querySelector('p').innerText = 'Create Game';
                        return [2 /*return*/];
                }
            });
        });
    };
    LobbyMain.update = function () {
        this.scriptManager.update();
        if (this.wonderPreferenceList)
            this.wonderPreferenceList.update();
    };
    LobbyMain.sendUpdate = function () {
        var _this = this;
        this.scriptManager.runScript(S.chain(S.wait(2), S.call(function () {
            _this.getInvites();
        })));
    };
    LobbyMain.getInvites = function () {
        var _this = this;
        API.getinvites(this.username, function (gameids, error) {
            if (error) {
                _this.error(error);
                _this.sendUpdate();
                return;
            }
            _this.inviteGameids = gameids;
            _this.setStatus();
            _this.sendUpdate();
        });
    };
    LobbyMain.setWonderPreferences = function (preferences) {
        var _this = this;
        API.setwonderpreferences(this.username, preferences, function (error) {
            if (error) {
                _this.error(error);
                return;
            }
            console.log('Successfully set wonder preferences');
        });
    };
    LobbyMain.setStatus = function () {
        var status = document.querySelector('#status');
        var statusText = document.querySelector('#status > p');
        if (this.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.textContent = this.currentError;
            return;
        }
        status.style.backgroundColor = C.OK_BG_COLOR;
        status.style.color = C.OK_TEXT_COLOR;
        if (this.inviteGameids && this.inviteGameids.length > 0) {
            var links = this.inviteGameids.map(function (gameid) { return "<a href=\"./game.html?gameid=" + gameid + "\">" + gameid + "</a>"; });
            var text = "Current Games: " + links.join(', ');
            if (statusText.innerHTML !== text)
                statusText.innerHTML = text;
        }
        else {
            statusText.textContent = "No current games";
        }
    };
    LobbyMain.error = function (error, fatal) {
        if (fatal === void 0) { fatal = false; }
        console.error(error);
        this.scriptManager.runScript(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        LobbyMain.currentError = error;
                        LobbyMain.setStatus();
                        return [5 /*yield**/, __values(S.wait(3)())];
                    case 1:
                        _a.sent();
                        if (!fatal) {
                            LobbyMain.currentError = undefined;
                            LobbyMain.setStatus();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LobbyMain.delta = 0;
    LobbyMain.mouseX = 0;
    LobbyMain.mouseY = 0;
    LobbyMain.mouseDown = false;
    return LobbyMain;
}());
var WonderPreference = /** @class */ (function (_super) {
    __extends(WonderPreference, _super);
    function WonderPreference(wonderPreferenceList, preference, snapPosition) {
        var _this = _super.call(this) || this;
        _this.wonderPreferenceList = wonderPreferenceList;
        _this.preference = preference;
        _this.snapPosition = snapPosition;
        _this.div.className = 'preferenceelement';
        var p = _this.div.appendChild(document.createElement('p'));
        p.className = 'preferenceelementtext';
        p.innerText = preference.name;
        // Dragging
        _this.div.onmousedown = function (event) {
            if (event.button !== 0)
                return;
            _this.dragging = {
                offsetx: _this.x - LobbyMain.mouseX,
                offsety: _this.y - LobbyMain.mouseY
            };
        };
        return _this;
    }
    WonderPreference.prototype.update = function () {
        if (this.dragging) {
            this.x = LobbyMain.mouseX + this.dragging.offsetx;
            this.y = LobbyMain.mouseY + this.dragging.offsety;
            this.zIndex = C.Z_INDEX_CARD_DRAGGING;
            if (!LobbyMain.mouseDown) {
                this.dragging = null;
                this.wonderPreferenceList.setWonderPreferences();
            }
        }
        else {
            this.x = this.snapPosition.x;
            this.y = this.snapPosition.y;
            this.zIndex = C.Z_INDEX_CARD_HAND;
        }
    };
    WonderPreference.prototype.addToPage = function () {
        this.addToGame(document.getElementById('preferencelist'));
    };
    return WonderPreference;
}(GameElement));
var WonderPreferenceList = /** @class */ (function () {
    function WonderPreferenceList() {
        this.wonderPreferences = [];
    }
    WonderPreferenceList.prototype.update = function () {
        this.wonderPreferences.sort(function (wp1, wp2) { return wp1.y - wp2.y; });
        for (var i = 0; i < this.wonderPreferences.length; i++) {
            this.wonderPreferences[i].snapPosition = this.getPreferenceElementPos(i);
            this.wonderPreferences[i].update();
        }
    };
    WonderPreferenceList.prototype.create = function () {
        this.wonderPreferences = [];
        for (var i = 0; i < LobbyMain.user.wonder_preferences.length; i++) {
            var pos = this.getPreferenceElementPos(i);
            var wonderPreference = new WonderPreference(this, LobbyMain.user.wonder_preferences[i], pos);
            wonderPreference.x = pos.x;
            wonderPreference.y = pos.y;
            wonderPreference.addToPage();
            this.wonderPreferences.push(wonderPreference);
        }
    };
    WonderPreferenceList.prototype.setWonderPreferences = function () {
        LobbyMain.setWonderPreferences(this.wonderPreferences.map(function (wp) { return wp.preference; }));
    };
    WonderPreferenceList.prototype.getPreferenceElementPos = function (i) {
        return new PIXI.Point(0, 32 * i);
    };
    return WonderPreferenceList;
}());
var Login = /** @class */ (function () {
    function Login() {
    }
    Login.start = function () {
        var form = document.getElementById('form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        });
    };
    Login.login = function () {
        var errorp = document.getElementById('error');
        errorp.innerText = '';
        var username = document.forms["form"]["username"].value;
        var password = document.forms["form"]["password"].value;
        if (!username || !password) {
            errorp.innerText = 'Username and password must be provided';
            return;
        }
        var password_hash = hash(password);
        API.login(username, password_hash, function (error) {
            if (error) {
                errorp.innerText = error;
                return;
            }
            document.cookie = "username=" + username + "; max-age=31536000";
            document.cookie = "password_hash=" + password_hash + "; max-age=31536000";
            window.location.href = './';
        });
    };
    Login.logout = function () {
        document.cookie = 'username=; max-age=-99999999';
        document.cookie = 'password_hash=; max-age=-99999999';
        window.location.href = './login.html';
    };
    return Login;
}());
var S;
(function (S) {
    S.getDelta = function () { return 0; };
    S.getScriptManager = function () { return undefined; };
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
            var scriptFunctions_1, scriptFunctions_1_1, scriptFunction, e_41_1;
            var e_41, _a;
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
                        e_41_1 = _b.sent();
                        e_41 = { error: e_41_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (scriptFunctions_1_1 && !scriptFunctions_1_1.done && (_a = scriptFunctions_1.return)) _a.call(scriptFunctions_1);
                        }
                        finally { if (e_41) throw e_41.error; }
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
                        if (!(t + S.getDelta() < duration)) return [3 /*break*/, 3];
                        t += S.getDelta();
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
                        scripts = scriptFunctions.map(function (sf) { return S.getScriptManager().runScript(sf); });
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
    function ScriptManager(getDelta) {
        this.activeScripts = [];
        this.getDelta = getDelta;
    }
    ScriptManager.prototype.update = function () {
        var _this = this;
        S.getDelta = this.getDelta;
        S.getScriptManager = function () { return _this; };
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
