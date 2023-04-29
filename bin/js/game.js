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
    function GameElement(useTransform) {
        if (useTransform === void 0) { useTransform = false; }
        this._x = 0;
        this._y = 0;
        this._scale = 1;
        this._zIndex = 0;
        this._visible = true;
        this._alpha = 1;
        this.useTransform = useTransform;
        this.div = document.createElement('div');
        this.div.style.position = 'absolute';
        if (this.useTransform) {
            this.div.style.willChange = 'transform';
        }
        this.setTransform();
    }
    Object.defineProperty(GameElement.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) {
            this._x = value;
            this.setTransform();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameElement.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) {
            this._y = value;
            this.setTransform();
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
        if (this.useTransform) {
            this.div.style.transform = "translate(" + this._x + "px, " + this._y + "px) translateZ(0) scale(" + this._scale + ")";
        }
        else {
            this.div.style.left = this._x + "px";
            this.div.style.top = this._y + "px";
            this.div.style.transform = "scale(" + this._scale + ")";
        }
    };
    return GameElement;
}());
/// <reference path="gameElement.ts" />
var ActionButton = /** @class */ (function (_super) {
    __extends(ActionButton, _super);
    function ActionButton(scene) {
        var _this = _super.call(this) || this;
        _this._buttonActive = true;
        _this.scene = scene;
        _this.button = _this.div.appendChild(document.createElement('div'));
        _this.button.style.backgroundColor = 'white';
        _this.button.style.color = 'black';
        _this.button.style.width = C.ACTION_BUTTON_WIDTH + "px";
        _this.button.style.height = C.ACTION_BUTTON_HEIGHT + "px";
        _this.button.style.borderRadius = C.ACTION_BUTTON_CORNER_RADIUS + "px";
        _this.button.style.transform = 'translate(-50%, -50%)';
        _this.button.style.position = 'relative';
        _this.button.style.cursor = 'pointer';
        _this.textElement = _this.button.appendChild(document.createElement('p'));
        _this.textElement.style.fontFamily = "'Courier New', Courier, monospace";
        _this.textElement.style.textAlign = 'center';
        _this.textElement.style.position = 'absolute';
        _this.textElement.style.left = '50%';
        _this.textElement.style.top = '50%';
        _this.textElement.style.transform = 'translate(-50%, -50%)';
        _this.button.onclick = function (event) {
            if (_this.type === 'undo') {
                Main.undoMove();
                if (_this.scene.isPaymentMenuActive)
                    _this.scene.paymentDialog.removeFromGame();
            }
            else if (_this.type === 'reject_discard') {
                Main.submitMove({ action: 'reject', card: -1, payment: {} });
            }
            else if (_this.type === 'accept_future') {
                Main.submitMove({ action: 'accept', card: -1, payment: {} });
            }
        };
        return _this;
    }
    Object.defineProperty(ActionButton.prototype, "buttonActive", {
        get: function () { return this._buttonActive; },
        set: function (value) {
            if (value === this._buttonActive)
                return;
            this._buttonActive = value;
            this.button.style.backgroundColor = this._buttonActive ? 'white' : 'gray';
        },
        enumerable: false,
        configurable: true
    });
    ActionButton.prototype.setType = function (type) {
        this.type = type;
        this.textElement.textContent = {
            'undo': 'Undo',
            'reject_discard': 'No Thanks',
            'accept_future': 'Done',
        }[type];
        var buttonActive = true;
        if (type === 'reject_discard' && !API.canReject(Main.gamestate.validMoves))
            buttonActive = false;
        this.buttonActive = buttonActive;
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
        if (move1.copyPlayer !== move2.copyPlayer)
            return false;
        if (move1.copyStage !== move2.copyStage)
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
        if ((payment1.free_with_zeus || false) !== (payment2.free_with_zeus || false))
            return false;
        if ((payment1.free_with_delphoi || false) !== (payment2.free_with_delphoi || false))
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
        var _b, _c, _d;
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
                if (validMove.copyPlayer !== move.copyPlayer)
                    continue;
                if (validMove.copyStage !== move.copyStage)
                    continue;
                var bankPayment = ((_b = validMove.payment) === null || _b === void 0 ? void 0 : _b.bank) || 0;
                if (!((_c = validMove.payment) === null || _c === void 0 ? void 0 : _c.free_with_zeus) && !((_d = validMove.payment) === null || _d === void 0 ? void 0 : _d.free_with_delphoi) && bankPayment < result)
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
    function isPaymentSelectionNecessary(move, validMoves) {
        var e_2, _a, e_3, _b;
        var _c, _d;
        var matchingMoves = validMoves.filter(function (validMove) { return validMove.action === move.action && validMove.card === move.card && validMove.copyPlayer === move.copyPlayer && validMove.stage === move.stage && validMove.copyStage === move.copyStage; });
        try {
            // If the move is already free...
            for (var matchingMoves_1 = __values(matchingMoves), matchingMoves_1_1 = matchingMoves_1.next(); !matchingMoves_1_1.done; matchingMoves_1_1 = matchingMoves_1.next()) {
                var validMove = matchingMoves_1_1.value;
                if (totalPaymentAmount(validMove.payment) === 0 && !((_c = validMove.payment) === null || _c === void 0 ? void 0 : _c.free_with_zeus) && !((_d = validMove.payment) === null || _d === void 0 ? void 0 : _d.free_with_delphoi)) {
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (matchingMoves_1_1 && !matchingMoves_1_1.done && (_a = matchingMoves_1.return)) _a.call(matchingMoves_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // If move is not free and Olympia or Delphoi power is active...
        if (isZeusActive(matchingMoves) || isDelphoiActive(matchingMoves)) {
            return true;
        }
        try {
            // If move does not require neighbor payment...
            for (var matchingMoves_2 = __values(matchingMoves), matchingMoves_2_1 = matchingMoves_2.next(); !matchingMoves_2_1.done; matchingMoves_2_1 = matchingMoves_2.next()) {
                var validMove = matchingMoves_2_1.value;
                if (totalNeighborPaymentAmount(validMove.payment) === 0) {
                    return false;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (matchingMoves_2_1 && !matchingMoves_2_1.done && (_b = matchingMoves_2.return)) _b.call(matchingMoves_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        // Otherwise, move requires neighbor payment.
        return true;
    }
    API.isPaymentSelectionNecessary = isPaymentSelectionNecessary;
    function isCopyStageSelectionNecessary(stage, validMoves, turretPlayers) {
        var options = copyStageOptions(stage, validMoves);
        if (options.length === 0)
            return false;
        if (options.length > 1)
            return true;
        return contains(turretPlayers, options[0].copyPlayer);
    }
    API.isCopyStageSelectionNecessary = isCopyStageSelectionNecessary;
    function isZeusActive(moves) {
        var e_4, _a;
        var _b;
        try {
            for (var moves_1 = __values(moves), moves_1_1 = moves_1.next(); !moves_1_1.done; moves_1_1 = moves_1.next()) {
                var move = moves_1_1.value;
                if ((_b = move.payment) === null || _b === void 0 ? void 0 : _b.free_with_zeus)
                    return true;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (moves_1_1 && !moves_1_1.done && (_a = moves_1.return)) _a.call(moves_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    }
    API.isZeusActive = isZeusActive;
    function isDelphoiActive(moves) {
        var e_5, _a;
        var _b;
        try {
            for (var moves_2 = __values(moves), moves_2_1 = moves_2.next(); !moves_2_1.done; moves_2_1 = moves_2.next()) {
                var move = moves_2_1.value;
                if ((_b = move.payment) === null || _b === void 0 ? void 0 : _b.free_with_delphoi)
                    return true;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (moves_2_1 && !moves_2_1.done && (_a = moves_2.return)) _a.call(moves_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return false;
    }
    API.isDelphoiActive = isDelphoiActive;
    function canReject(validMoves) {
        return validMoves.find(function (move) { return move.action === 'reject'; }) !== undefined;
    }
    API.canReject = canReject;
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
        var e_6, _a;
        var options = [];
        try {
            for (var validMoves_2 = __values(validMoves), validMoves_2_1 = validMoves_2.next(); !validMoves_2_1.done; validMoves_2_1 = validMoves_2.next()) {
                var validMove = validMoves_2_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                if (validMove.stage !== move.stage)
                    continue;
                if (validMove.copyPlayer !== move.copyPlayer)
                    continue;
                if (validMove.copyStage !== move.copyStage)
                    continue;
                options.push(validMove.payment);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (validMoves_2_1 && !validMoves_2_1.done && (_a = validMoves_2.return)) _a.call(validMoves_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
        options.sort(function (o1, o2) { return totalPaymentAmount(o1) - totalPaymentAmount(o2); });
        for (var i = 0; i < options.length; i++) {
            for (var j = i + 1; j < options.length; j++) {
                var pos_i = options[i].pos || 0;
                var neg_i = options[i].neg || 0;
                var pos_j = options[j].pos || 0;
                var neg_j = options[j].neg || 0;
                var zeus_i = options[i].free_with_zeus;
                var zeus_j = options[j].free_with_zeus;
                var delphoi_i = options[i].free_with_delphoi;
                var delphoi_j = options[j].free_with_delphoi;
                if (pos_i <= pos_j && neg_i <= neg_j && zeus_i === zeus_j && delphoi_i === delphoi_j) {
                    options.splice(j, 1);
                    j--;
                }
            }
        }
        return options;
    }
    API.minimalPaymentOptions = minimalPaymentOptions;
    function copyStageOptions(stage, validMoves) {
        var e_7, _a, e_8, _b;
        var result = [];
        try {
            for (var validMoves_3 = __values(validMoves), validMoves_3_1 = validMoves_3.next(); !validMoves_3_1.done; validMoves_3_1 = validMoves_3.next()) {
                var validMove = validMoves_3_1.value;
                if (validMove.action !== 'wonder')
                    continue;
                if (validMove.stage !== stage)
                    continue;
                if (validMove.copyPlayer === undefined || validMove.copyStage === undefined)
                    continue;
                var inResult = false;
                try {
                    for (var result_1 = (e_8 = void 0, __values(result)), result_1_1 = result_1.next(); !result_1_1.done; result_1_1 = result_1.next()) {
                        var r = result_1_1.value;
                        if (r.copyPlayer === validMove.copyPlayer && r.copyStage === validMove.copyStage)
                            inResult = true;
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (result_1_1 && !result_1_1.done && (_b = result_1.return)) _b.call(result_1);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                if (inResult)
                    continue;
                result.push({ copyPlayer: validMove.copyPlayer, copyStage: validMove.copyStage });
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (validMoves_3_1 && !validMoves_3_1.done && (_a = validMoves_3.return)) _a.call(validMoves_3);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return result;
    }
    API.copyStageOptions = copyStageOptions;
    function goldGain(oldGold, newGold, payment, negPayment, posPayment) {
        return newGold - oldGold + totalPaymentAmount(payment) - ((negPayment === null || negPayment === void 0 ? void 0 : negPayment.pos) || 0) - ((posPayment === null || posPayment === void 0 ? void 0 : posPayment.neg) || 0);
    }
    API.goldGain = goldGain;
    function getScienceSymbol(card) {
        var e_9, _a;
        try {
            for (var _b = __values(card.effects), _c = _b.next(); !_c.done; _c = _b.next()) {
                var effect = _c.value;
                if (effect.type === 'science')
                    return effect.symbol;
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
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
    function getgamestate(gameid, player, password_hash, callback) {
        httpRequest(LAMBDA_URL + "?operation=getgamestate&gameid=" + gameid + "&player=" + player + "&password_hash=" + password_hash, function (responseJson, error) {
            if (!responseJson) {
                callback(undefined, "No gamestate received");
            }
            else if (error) {
                callback(undefined, error);
            }
            else {
                callback(responseJson, undefined);
            }
        });
    }
    API.getgamestate = getgamestate;
    function getvalidmoves(gameid, turn, player, password_hash, callback) {
        httpRequest(LAMBDA_URL + "?operation=getvalidmoves&gameid=" + gameid + "&turn=" + turn + "&player=" + player + "&password_hash=" + password_hash, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else if (!responseJson || !responseJson['validMoves']) {
                callback(undefined, "No valid moves received");
            }
            else {
                callback(responseJson['validMoves'], undefined);
            }
        });
    }
    API.getvalidmoves = getvalidmoves;
    function submitmove(gameid, turn, player, password_hash, move, callback) {
        httpRequest(LAMBDA_URL + "?operation=submitmove&gameid=" + gameid + "&turn=" + turn + "&player=" + player + "&password_hash=" + password_hash + "&move=" + JSON.stringify(move), function (responseJson, error) {
            callback(error);
        });
    }
    API.submitmove = submitmove;
    function undomove(gameid, turn, player, password_hash, callback) {
        httpRequest(LAMBDA_URL + "?operation=undomove&gameid=" + gameid + "&turn=" + turn + "&player=" + player + "&password_hash=" + password_hash, function (responseJson, error) {
            callback(error);
        });
    }
    API.undomove = undomove;
    function chooseside(gameid, player, password_hash, side, callback) {
        httpRequest(LAMBDA_URL + "?operation=chooseside&gameid=" + gameid + "&player=" + player + "&password_hash=" + password_hash + "&side=" + side, function (responseJson, error) {
            callback(error);
        });
    }
    API.chooseside = chooseside;
    function choosegoldtolose(gameid, turn, player, password_hash, gold_to_lose, callback) {
        httpRequest(LAMBDA_URL + "?operation=choosegoldtolose&gameid=" + gameid + "&turn=" + turn + "&player=" + player + "&password_hash=" + password_hash + "&gold_to_lose=" + gold_to_lose, function (responseJson, error) {
            callback(error);
        });
    }
    API.choosegoldtolose = choosegoldtolose;
    function updategame(gameid, callback) {
        httpRequest(LAMBDA_URL + "?operation=updategame&gameid=" + gameid, function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else if (!responseJson || !responseJson['result']) {
                callback(undefined, "No result received");
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
            else if (!responseJson || !responseJson['users']) {
                callback(undefined, "No users received");
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
            else if (!responseJson || !responseJson['gameids']) {
                callback(undefined, "No invites received");
            }
            else {
                callback(responseJson['gameids'], undefined);
            }
        });
    }
    API.getinvites = getinvites;
    function setwonderpreferences(username, password_hash, preferences, callback) {
        var preferencesString = preferences.map(function (pref) { return pref.id; }).join(',');
        httpRequest(LAMBDA_URL + "?operation=setwonderpreferences&username=" + username + "&password_hash=" + password_hash + "&preferences=" + preferencesString, function (responseJson, error) {
            callback(error);
        });
    }
    API.setwonderpreferences = setwonderpreferences;
    function creategame(options, callback) {
        httpRequest(LAMBDA_URL + "?operation=creategame&players=" + options.players.join(',') + "&flags=" + options.flags.join(','), function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else if (!responseJson || !responseJson['gameid']) {
                callback(undefined, "No gameid received");
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
    function getpatchnotes(callback) {
        httpRequest(LAMBDA_URL + "?operation=getpatchnotes", function (responseJson, error) {
            if (error) {
                callback(undefined, error);
            }
            else if (!responseJson || !responseJson['patchNotes']) {
                callback(undefined, "No patch notes received");
            }
            else {
                callback(responseJson['patchNotes'], undefined);
            }
        });
    }
    API.getpatchnotes = getpatchnotes;
    function httpRequest(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function () {
            var _a;
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    if (!json.error && !json.message) {
                        callback(json, undefined);
                    }
                    else {
                        var error = (_a = json.error) !== null && _a !== void 0 ? _a : json.message;
                        callback(undefined, error);
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
    ArtCommon.freeColor = 0x00FF00;
    ArtCommon.affordColor = ArtCommon.goldColor;
    ArtCommon.cantAffordColor = 0xFF0000;
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
        if (color === 'black')
            return 0x444444;
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
        if (color === 'black')
            return '#444444';
        console.error('Could not find color:', color);
        return '#FF00FF';
    }
    ArtCommon.cardBannerForColorHtml = cardBannerForColorHtml;
    function getArtForEffects(effects, padding) {
        if (padding === void 0) { padding = 8; }
        var effectArts = effects.map(function (effect) {
            if (effect.type === 'resource') {
                return resource(effect.resource);
            }
            else if (effect.type === 'multi_resource') {
                return multiResource(effect.resources.split('/'));
            }
            else if (effect.type === 'shields') {
                return shields(effect.shields);
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
            else if (effect.type === 'points_for_negative_tokens') {
                return pointsForNegativeTokens(effect.points_per_token);
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
            else if (effect.type === 'double_trading_post') {
                return tradingPost('both');
            }
            else if (effect.type === 'copy_guild') {
                return copyGuild();
            }
            else if (effect.type === 'build_free_once_per_age') {
                return buildFreeOncePerAge();
            }
            else if (effect.type === 'gold_for_others') {
                return goldForOthers(effect.gold);
            }
            else if (effect.type === 'gold_for_neighbor') {
                return goldForNeighbor(effect.gold, effect.direction);
            }
            else if (effect.type === 'waive_wonder_resource_costs') {
                return waiveWonderResourceCosts();
            }
            else if (effect.type === 'mask') {
                return mask();
            }
            else if (effect.type === 'unproduced_resource') {
                return unproducedResource();
            }
            else if (effect.type === 'duplicate_produced_resource') {
                return duplicateProducedResource();
            }
            else if (effect.type === 'wharf') {
                return wharf(effect.direction);
            }
            else if (effect.type === 'smugglers_cache') {
                return smugglersCache();
            }
            else if (effect.type === 'dove') {
                return dove();
            }
            else if (effect.type === 'gain_military_token') {
                return gainMilitaryToken(effect.token_value);
            }
            else if (effect.type === 'debt_for_neighbor') {
                return debtForNeighbor(effect.direction);
            }
            else if (effect.type === 'gold_for_defeat_tokens') {
                return goldForDefeatTokens(effect.gold_per_token);
            }
            else if (effect.type === 'points_for_victory_tokens') {
                return pointsForVictoryTokens(effect.token_value, effect.points_per_token);
            }
            else if (effect.type === 'gold_and_points_for_victory_tokens') {
                return goldAndPointsForVictoryTokens(effect.gold_per_token, effect.points_per_token);
            }
            else if (effect.type === 'discard_defeat_tokens') {
                return discardDefeatTokens();
            }
            else if (effect.type === 'broken_gold') {
                return brokenGold(effect.gold);
            }
            else if (effect.type === 'broken_gold_for_stages') {
                return brokenGoldForStages(effect.gold_per_stage);
            }
            else if (effect.type === 'broken_gold_for_victory_tokens') {
                return brokenGoldForVictoryTokens(effect.gold_per_token);
            }
            else if (effect.type === 'turret') {
                return turret();
            }
            else if (effect.type === 'shields_for_defeat_tokens') {
                return shieldsForDefeatTokens();
            }
            else if (effect.type === 'points_for_shields') {
                return pointsForShields(effect.points_per_shield);
            }
            else if (effect.type === 'points_for_pairs') {
                return pointsForPairs(effect.points_per_pair);
            }
            else if (effect.type === 'points_for_triplets') {
                return pointsForTriplets(effect.points_per_triplet);
            }
            else if (effect.type === 'points_for_chains') {
                return pointsForChains(effect.points_per_chain);
            }
            else if (effect.type === 'build_free_without_chain') {
                return buildFreeWithoutChain(effect.usages);
            }
            else if (effect.type === 'eye') {
                return eye();
            }
            else if (effect.type === 'see_future') {
                return seeFuture();
            }
            console.error('Effect type not found:', effect.type);
            return effectNotFound();
        });
        return combineEffectArt(effectArts, padding);
    }
    ArtCommon.getArtForEffects = getArtForEffects;
    function getShadowForArt(artFactory, type, dx, dy) {
        if (dx === void 0) { dx = 5; }
        if (dy === void 0) { dy = 5; }
        var container = new PIXI.Container();
        var shadow = artFactory();
        var silhouetteFilter = new SilhouetteFilter(type);
        shadow.filters = [silhouetteFilter, new PIXI.filters.BlurFilter(16 * resolution, 100)];
        shadow.position.set(dx, dy);
        container.addChild(shadow);
        return container;
    }
    ArtCommon.getShadowForArt = getShadowForArt;
    function getShadowForEffects(effects, type, dx, dy, padding) {
        if (dx === void 0) { dx = 5; }
        if (dy === void 0) { dy = 5; }
        if (padding === void 0) { padding = 8; }
        return getShadowForArt(function () { return ArtCommon.getArtForEffects(effects, padding); }, type, dx, dy);
    }
    ArtCommon.getShadowForEffects = getShadowForEffects;
    function getArtForCost(cost) {
        var e_10, _a;
        if (!cost) {
            return undefined;
        }
        var costArts = [];
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        try {
            for (var _b = __values(cost.resources || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var r = _c.value;
                costArts.push(resource(r));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        if (costArts.length === 0) {
            return undefined;
        }
        return combineCostArt(costArts, 16);
    }
    ArtCommon.getArtForCost = getArtForCost;
    function getArtForStageCost(cost) {
        var e_11, _a;
        var costArts = [];
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        try {
            for (var _b = __values(cost.resources || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                var r = _c.value;
                costArts.push(resource(r));
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return combineStageCostArt(costArts, 16);
    }
    ArtCommon.getArtForStageCost = getArtForStageCost;
    function getArtForStageCopy(stage, direction) {
        var container = new PIXI.Container();
        if (stage === 'first') {
            container.addChild(copyStageFirst());
        }
        else if (stage === 'second') {
            container.addChild(copyStageSecond());
        }
        else if (stage === 'last') {
            container.addChild(copyStageLast());
        }
        else {
            console.error('Stage not found:', stage);
            container.addChild(effectNotFound());
        }
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(100, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-100, 0);
            container.addChild(arrow);
        }
        var parentContainer = new PIXI.Container();
        parentContainer.addChild(container);
        var lb = container.getLocalBounds();
        container.x = -lb.x - lb.width / 2;
        return parentContainer;
    }
    ArtCommon.getArtForStageCopy = getArtForStageCopy;
    function getShadowForStageCopy(stage, direction, type, dx, dy) {
        if (dx === void 0) { dx = 5; }
        if (dy === void 0) { dy = 5; }
        return getShadowForArt(function () { return ArtCommon.getArtForStageCopy(stage, direction); }, type, dx, dy);
    }
    ArtCommon.getShadowForStageCopy = getShadowForStageCopy;
    /* EFFECTS */
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
        var e_12, _a;
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
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (resourceArts_1_1 && !resourceArts_1_1.done && (_a = resourceArts_1.return)) _a.call(resourceArts_1);
            }
            finally { if (e_12) throw e_12.error; }
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
        if (symbol === 'astrolabe')
            return astrolabe();
        console.error('Science symbol not found:', symbol);
        return effectNotFound();
    }
    ArtCommon.science = science;
    function multiScience(symbols) {
        var e_13, _a;
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
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (symbolArts_1_1 && !symbolArts_1_1.done && (_a = symbolArts_1.return)) _a.call(symbolArts_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return combineEffectArt(symbolArts, 4);
    }
    ArtCommon.multiScience = multiScience;
    function victoryPoints(points) {
        var container = new PIXI.Container();
        container.addChild(pointsWreath());
        var text = Shapes.centeredText(0, 0, "" + points, 0.8, 0x000000);
        if (("" + points).length > 1) {
            text.scale.set(0.65);
        }
        container.addChild(text);
        return container;
    }
    ArtCommon.victoryPoints = victoryPoints;
    function gold(gold) {
        var container = new PIXI.Container();
        container.addChild(goldCoin());
        var text = Shapes.centeredText(0, 0, "" + gold, 0.8, 0x000000);
        if (("" + gold).length > 1) {
            text.scale.set(0.65);
        }
        container.addChild(text);
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
        if (direction === 'pos' || direction === 'both') {
            var arrow = arrowRight();
            arrow.scale.set(0.5);
            arrow.position.set(150, 25);
            container.addChild(arrow);
        }
        if (direction === 'neg' || direction === 'both') {
            var arrow = arrowLeft();
            arrow.scale.set(0.5);
            arrow.position.set(-150, 25);
            container.addChild(arrow);
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
    function pointsForNegativeTokens(pointsPerToken) {
        var container = new PIXI.Container();
        var token = militaryToken(-1);
        token.scale.set(0.8);
        container.addChild(token);
        var pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.48);
        pointsWreath.position.set(36, 24);
        container.addChild(pointsWreath);
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
    ArtCommon.pointsForNegativeTokens = pointsForNegativeTokens;
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
        container.addChild(rainbowCard());
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
    function buildFreeOncePerAge() {
        var container = new PIXI.Container();
        container.addChild(cardForEffect(0xDDDDDD));
        var cross = X(0xFF0000);
        cross.scale.set(0.3);
        cross.position.set(-30, -20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.buildFreeOncePerAge = buildFreeOncePerAge;
    function copyGuild() {
        var container = new PIXI.Container();
        var card = cardForEffect(ArtCommon.cardBannerForColor('purple'));
        card.position.set(-80, 0);
        container.addChild(card);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.6);
        arrowL.position.set(0, 0);
        container.addChild(arrowL);
        var slashmark = slash();
        slashmark.position.set(50, 0);
        container.addChild(slashmark);
        var arrowR = arrowRight();
        arrowR.scale.set(0.6);
        arrowR.position.set(100, 0);
        container.addChild(arrowR);
        return container;
    }
    ArtCommon.copyGuild = copyGuild;
    function goldForOthers(amount) {
        var container = new PIXI.Container();
        var goldCoin = gold(amount);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(0, 20);
        container.addChild(goldCoin);
        for (var i = -1; i <= 1; i++) {
            var arrow = arrowRight();
            arrow.scale.set(0.3);
            arrow.angle = -90 + 60 * i;
            arrow.position.set(50 * Math.cos(arrow.rotation), 20 + 50 * Math.sin(arrow.rotation));
            container.addChild(arrow);
        }
        return container;
    }
    ArtCommon.goldForOthers = goldForOthers;
    function goldForNeighbor(amount, direction) {
        var container = new PIXI.Container();
        var goldCoin = gold(amount);
        goldCoin.scale.set(0.6);
        container.addChild(goldCoin);
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(60, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-60, 0);
            container.addChild(arrow);
        }
        return container;
    }
    ArtCommon.goldForNeighbor = goldForNeighbor;
    function waiveWonderResourceCosts() {
        var container = new PIXI.Container();
        var pyramid = pyramidStages();
        container.addChild(pyramid);
        var cross = X(0xFF0000);
        cross.scale.set(0.4);
        cross.position.set(-40, 20);
        container.addChild(cross);
        return container;
    }
    ArtCommon.waiveWonderResourceCosts = waiveWonderResourceCosts;
    function mask() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRoundedRect(-130, -30, 260, 80, 40, cardBannerForColor('green')));
        var resources = combineEffectArt([compass(), slash(), tablet(), slash(), gear()], 8);
        resources.scale.set(0.65);
        resources.position.set(0, 10);
        container.addChild(resources);
        var mask = new PIXI.Sprite(PIXI.Texture.from('mask'));
        mask.anchor.set(0.5, 0.5);
        mask.scale.set(0.8);
        mask.position.set(0, -5);
        container.addChild(mask);
        var arrowR = arrowRight();
        arrowR.scale.set(0.5);
        arrowR.position.set(160, 10);
        container.addChild(arrowR);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.5);
        arrowL.position.set(-160, 10);
        container.addChild(arrowL);
        return container;
    }
    ArtCommon.mask = mask;
    function unproducedResource() {
        var container = new PIXI.Container();
        var unproduced = new PIXI.Sprite(PIXI.Texture.from('unproduced_resource'));
        unproduced.anchor.set(0.5, 0.5);
        unproduced.scale.set(0.6);
        unproduced.position.set(-80, 0);
        container.addChild(unproduced);
        var arrow = arrowRight();
        arrow.scale.set(0.4);
        container.addChild(arrow);
        var resource = doubleResourceBack();
        resource.scale.set(0.9);
        resource.position.set(80, 0);
        container.addChild(resource);
        return container;
    }
    ArtCommon.unproducedResource = unproducedResource;
    function duplicateProducedResource() {
        var container = new PIXI.Container();
        var produced = doubleResourceBack();
        produced.scale.set(0.8);
        produced.position.set(-120, 0);
        container.addChild(produced);
        var arrow = arrowRight();
        arrow.scale.set(0.4);
        arrow.position.set(-40, 0);
        container.addChild(arrow);
        var resources = combineEffectArt([doubleResourceBack(), doubleResourceBack()], 8);
        resources.scale.set(0.8);
        resources.position.set(76, 0);
        container.addChild(resources);
        return container;
    }
    ArtCommon.duplicateProducedResource = duplicateProducedResource;
    function wharf(direction) {
        var container = new PIXI.Container();
        var coin = goldCoin();
        coin.scale.set(0.8);
        container.addChild(coin);
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0x000000));
        container.addChild(Shapes.centeredText(2, 0, "1", 0.6, 0x000000));
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(70, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-70, 0);
            container.addChild(arrow);
        }
        return container;
    }
    ArtCommon.wharf = wharf;
    function smugglersCache() {
        var container = new PIXI.Container();
        var resource = doubleResourceBack();
        resource.scale.set(0.5);
        resource.position.set(0, 15);
        container.addChild(resource);
        var coin = goldCoin();
        coin.scale.set(0.6);
        coin.position.set(0, -15);
        container.addChild(coin);
        container.addChild(Shapes.filledRect(-24, -15, 12, 6, 0x000000));
        container.addChild(Shapes.centeredText(2, -16, "1", 0.5, 0x000000));
        var arrowR = arrowRight();
        arrowR.scale.set(0.4);
        arrowR.position.set(70, 15);
        container.addChild(arrowR);
        var arrowL = arrowLeft();
        arrowL.scale.set(0.4);
        arrowL.position.set(-70, 15);
        container.addChild(arrowL);
        return container;
    }
    ArtCommon.smugglersCache = smugglersCache;
    function dove() {
        var sprite = new PIXI.Sprite(PIXI.Texture.from('dove'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
    }
    ArtCommon.dove = dove;
    function gainMilitaryToken(value) {
        return militaryToken(value);
    }
    ArtCommon.gainMilitaryToken = gainMilitaryToken;
    function debtForNeighbor(direction) {
        var container = new PIXI.Container();
        var token = debtToken();
        token.scale.set(0.8);
        container.addChild(token);
        if (direction === 'pos') {
            var arrow = arrowRight();
            arrow.scale.set(0.4);
            arrow.position.set(70, 0);
            container.addChild(arrow);
        }
        if (direction === 'neg') {
            var arrow = arrowLeft();
            arrow.scale.set(0.4);
            arrow.position.set(-70, 0);
            container.addChild(arrow);
        }
        return container;
    }
    ArtCommon.debtForNeighbor = debtForNeighbor;
    function goldForDefeatTokens(goldPerToken) {
        var container = new PIXI.Container();
        var token = militaryTokenNegative(1);
        token.scale.set(0.9);
        container.addChild(token);
        var goldCoin = gold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }
    ArtCommon.goldForDefeatTokens = goldForDefeatTokens;
    function pointsForVictoryTokens(value, pointsPerToken) {
        var container = new PIXI.Container();
        var token = militaryTokenPositive(value);
        token.scale.set(0.9);
        container.addChild(token);
        var pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForVictoryTokens = pointsForVictoryTokens;
    function goldAndPointsForVictoryTokens(goldPerToken, pointsPerToken) {
        var container = new PIXI.Container();
        container.addChild(militaryTokenPositiveBlank());
        var goldCoin = gold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        var pointsWreath = victoryPoints(pointsPerToken);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.goldAndPointsForVictoryTokens = goldAndPointsForVictoryTokens;
    function discardDefeatTokens() {
        var container = new PIXI.Container();
        var token = militaryTokenNegative(1);
        token.scale.set(0.9);
        container.addChild(token);
        var crackk = crack();
        container.addChild(crackk);
        var crackMask = Shapes.filledOctagon(0, 0, 50, 0xFFFFFF);
        crackMask.scale.set(0.9);
        container.addChild(crackMask);
        crackk.mask = crackMask;
        return container;
    }
    ArtCommon.discardDefeatTokens = discardDefeatTokens;
    function brokenGold(gold) {
        var container = new PIXI.Container();
        container.addChild(brokenGoldBlank());
        container.addChild(Shapes.centeredText(0, 0, "" + gold, 1, 0xFF0044));
        return container;
    }
    ArtCommon.brokenGold = brokenGold;
    function brokenGoldBlank() {
        var container = new PIXI.Container();
        container.addChild(goldCoin());
        var crackk = crack();
        container.addChild(crackk);
        var crackMask = Shapes.filledCircle(0, 0, 50, 0xFFFFFF);
        container.addChild(crackMask);
        crackk.mask = crackMask;
        return container;
    }
    ArtCommon.brokenGoldBlank = brokenGoldBlank;
    function brokenGoldForStages(goldPerStage) {
        var container = new PIXI.Container();
        container.addChild(pyramidStages());
        var goldCoin = brokenGold(goldPerStage);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }
    ArtCommon.brokenGoldForStages = brokenGoldForStages;
    function brokenGoldForVictoryTokens(goldPerToken) {
        var container = new PIXI.Container();
        var token = militaryTokenPositiveBlank();
        token.scale.set(0.9);
        container.addChild(token);
        var goldCoin = brokenGold(goldPerToken);
        goldCoin.scale.set(0.6);
        goldCoin.position.set(-45, 30);
        container.addChild(goldCoin);
        return container;
    }
    ArtCommon.brokenGoldForVictoryTokens = brokenGoldForVictoryTokens;
    function shields(shields) {
        if (shields === 5) {
            var dx = 60, dy = 25;
            var container = new PIXI.Container();
            var shields_1 = new PIXI.Container();
            shields_1.addChild(shield()).position.set(-dx, -dy);
            shields_1.addChild(shield()).position.set(dx, -dy);
            shields_1.addChild(shield()).position.set(-2 * dx, dy);
            shields_1.addChild(shield()).position.set(0, dy);
            shields_1.addChild(shield()).position.set(2 * dx, dy);
            shields_1.scale.set(2 / 3);
            container.addChild(shields_1);
            return container;
        }
        return combineEffectArt(range(1, shields).map(function (i) { return shield(); }), 8);
    }
    ArtCommon.shields = shields;
    function shieldsForDefeatTokens() {
        var container = new PIXI.Container();
        var token = militaryTokenNegative(1);
        token.scale.set(0.9);
        token.position.set(0, -5);
        container.addChild(token);
        var shieldArt = shield();
        shieldArt.scale.set(0.4);
        shieldArt.position.set(0, 30);
        container.addChild(shieldArt);
        return container;
    }
    ArtCommon.shieldsForDefeatTokens = shieldsForDefeatTokens;
    function pointsForShields(pointsPerShield) {
        var container = new PIXI.Container();
        var shieldArt = shield();
        shieldArt.scale.set(0.7);
        shieldArt.position.set(0, -5);
        container.addChild(shieldArt);
        var pointsWreath = victoryPoints(pointsPerShield);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(45, 30);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForShields = pointsForShields;
    function pointsForPairs(pointsPerPair) {
        var container = new PIXI.Container();
        var cardContainer = new PIXI.Container();
        var o = 5;
        cardContainer.addChild(Shapes.filledRoundedRect(-85, -60, 170, 120, 10, 0xFFFFFF));
        cardContainer.addChild(Shapes.filledRoundedRect(-85 + o, -60 + o, 170 - 2 * o, 120 - 2 * o, 10 - o, 0x000000));
        var card1 = rainbowCard();
        card1.scale.set(0.9, 1);
        card1.position.set(-40, 0);
        var card2 = rainbowCard();
        card2.scale.set(0.9, 1);
        card2.position.set(40, 0);
        cardContainer.addChild(card1);
        cardContainer.addChild(card2);
        cardContainer.position.set(0, -5);
        container.addChild(cardContainer);
        var pointsWreath = victoryPoints(pointsPerPair);
        pointsWreath.scale.set(0.7);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForPairs = pointsForPairs;
    function pointsForTriplets(pointsPerTriplet) {
        var container = new PIXI.Container();
        var cardContainer = new PIXI.Container();
        var o = 5;
        cardContainer.addChild(Shapes.filledRoundedRect(-125, -60, 250, 120, 10, 0xFFFFFF));
        cardContainer.addChild(Shapes.filledRoundedRect(-125 + o, -60 + o, 250 - 2 * o, 120 - 2 * o, 10 - o, 0x000000));
        var card1 = rainbowCard();
        card1.scale.set(0.9, 1);
        card1.position.set(-80, 0);
        var card2 = rainbowCard();
        card2.scale.set(0.9, 1);
        var card3 = rainbowCard();
        card3.scale.set(0.9, 1);
        card3.position.set(80, 0);
        cardContainer.addChild(card1);
        cardContainer.addChild(card2);
        cardContainer.addChild(card3);
        cardContainer.position.set(0, -5);
        container.addChild(cardContainer);
        var pointsWreath = victoryPoints(pointsPerTriplet);
        pointsWreath.scale.set(0.7);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForTriplets = pointsForTriplets;
    function pointsForChains(pointsPerChain) {
        var container = new PIXI.Container();
        container.addChild(chainedCards());
        var pointsWreath = victoryPoints(pointsPerChain);
        pointsWreath.scale.set(0.6);
        pointsWreath.position.set(0, 40);
        container.addChild(pointsWreath);
        return container;
    }
    ArtCommon.pointsForChains = pointsForChains;
    function buildFreeWithoutChain(usages) {
        var container = new PIXI.Container();
        container.addChild(chainedCards());
        var arrow = arrowRight();
        arrow.scale.set(0.65);
        arrow.position.set(0, 30);
        container.addChild(arrow);
        container.addChild(Shapes.centeredText(-5, 30, usages + "x", 0.25, 0x000000));
        var cross1 = X(0xFF0000);
        cross1.scale.set(0.8);
        cross1.position.set(-80, 0);
        container.addChild(cross1);
        var cross2 = X(0xFF0000);
        cross2.scale.set(0.3);
        cross2.position.set(57, -23);
        container.addChild(cross2);
        return container;
    }
    ArtCommon.buildFreeWithoutChain = buildFreeWithoutChain;
    function eye() {
        var sprite = new PIXI.Sprite(PIXI.Texture.from('eye'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        return sprite;
    }
    ArtCommon.eye = eye;
    function seeFuture() {
        var container = new PIXI.Container();
        var background = Shapes.filledRect(-52.5, -50, 105, 100, 0x000000);
        background.alpha = 0.01;
        container.addChild(background);
        var card1 = cardForEffect(cardBannerForColor('purple'));
        card1.scale.set(0.9);
        card1.position.set(-10, -10);
        var card2 = cardForEffect(cardBannerForColor('black'));
        card2.scale.set(0.9);
        card2.position.set(10, 10);
        container.addChild(card1);
        container.addChild(card2);
        var eyeArt = eye();
        eyeArt.scale.set(0.6);
        eyeArt.position.set(0, 0);
        container.addChild(eyeArt);
        return container;
    }
    ArtCommon.seeFuture = seeFuture;
    /* COMPONENTS */
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
    function astrolabe() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('astrolabe'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.astrolabe = astrolabe;
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
    function rainbowCard() {
        var container = new PIXI.Container();
        container.addChild(cardForEffect(0x686B6A));
        var colors = ['brown', 'grey', 'blue', 'yellow', 'red', 'green', 'purple'];
        for (var i = 0; i < colors.length; i++) {
            container.addChild(Shapes.filledRect(-31 + 62 / 7 * i, -46, 62 / 7, 92, ArtCommon.cardBannerForColor(colors[i])));
        }
        return container;
    }
    ArtCommon.rainbowCard = rainbowCard;
    function chainedCards() {
        var container = new PIXI.Container();
        var card1 = cardForEffect(0x686B6A);
        card1.position.set(-80, 0);
        card1.addChild(Shapes.filledRect(15, -46, 16, 46, 0x343630));
        var card2 = cardForEffect(0x686B6A);
        card2.position.set(80, 0);
        card2.addChild(Shapes.filledRect(-31, -46, 16, 46, 0x343630));
        container.addChild(card1);
        container.addChild(card2);
        var chain = chainlink();
        chain.scale.set(0.55);
        chain.position.set(0, -20);
        container.addChild(chain);
        return container;
    }
    ArtCommon.chainedCards = chainedCards;
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
    function copyStageFirst() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_first'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.copyStageFirst = copyStageFirst;
    function copyStageSecond() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_second'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.copyStageSecond = copyStageSecond;
    function copyStageLast() {
        var container = new PIXI.Container();
        var sprite = new PIXI.Sprite(PIXI.Texture.from('copy_stage_last'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.7);
        container.addChild(sprite);
        return container;
    }
    ArtCommon.copyStageLast = copyStageLast;
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
        container.addChild(militaryTokenPositiveBlank());
        var wreath = pointsWreath();
        wreath.scale.set(0.465);
        wreath.position.set(0, 15.5);
        container.addChild(wreath);
        container.addChild(Shapes.centeredText(0, 15.5, "" + amount, 0.3875, 0x000000));
        return container;
    }
    ArtCommon.militaryTokenPositive = militaryTokenPositive;
    function militaryTokenPositiveBlank() {
        var container = new PIXI.Container();
        var innerContainer = new PIXI.Container();
        innerContainer.addChild(Shapes.filledRect(-50, -20, 100, 80, 0xCC1D17));
        var sprite = new PIXI.Sprite(PIXI.Texture.from('falcon'));
        sprite.anchor.set(0.5, 0.5);
        sprite.scale.set(0.65);
        sprite.position.set(-1, -20);
        innerContainer.addChild(sprite);
        innerContainer.scale.set(0.775);
        container.addChild(innerContainer);
        return container;
    }
    ArtCommon.militaryTokenPositiveBlank = militaryTokenPositiveBlank;
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
    function debtToken() {
        var container = new PIXI.Container();
        container.addChild(debtTokenBlank());
        container.addChild(Shapes.filledRect(-26, 0, 12, 6, 0xCC1D17));
        container.addChild(Shapes.centeredText(2, 0, "1", 0.6, 0xCC1D17));
        return container;
    }
    ArtCommon.debtToken = debtToken;
    function debtTokenBlank() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledRect(-50, -50, 100, 100, 0x444444));
        var wreath = pointsWreath();
        wreath.scale.set(0.7);
        container.addChild(wreath);
        return container;
    }
    ArtCommon.debtTokenBlank = debtTokenBlank;
    function doubleResourceBack() {
        var container = new PIXI.Container();
        container.addChild(Shapes.filledCircle(0, 0, 50, cardBannerForColor('brown')));
        container.addChild(Shapes.filledPolygon(0, 0, [0, -50, 22, -50, 50, -22, 50, 22, 22, 50, 0, 50], cardBannerForColor('grey')));
        return container;
    }
    ArtCommon.doubleResourceBack = doubleResourceBack;
    function crack() {
        var crack = new PIXI.Sprite(PIXI.Texture.from('crack'));
        crack.anchor.set(0.5, 0.5);
        crack.scale.set(0.7);
        return crack;
    }
    ArtCommon.crack = crack;
    function turret() {
        var turret = new PIXI.Sprite(PIXI.Texture.from('turret'));
        turret.anchor.set(0.5, 0.5);
        turret.scale.set(0.7);
        return turret;
    }
    ArtCommon.turret = turret;
    function chainlink() {
        var turret = new PIXI.Sprite(PIXI.Texture.from('chainlink'));
        turret.anchor.set(0.5, 0.5);
        turret.scale.set(0.7);
        return turret;
    }
    ArtCommon.chainlink = chainlink;
    function payment(amount, canChooseFree) {
        var errorColor = canChooseFree ? ArtCommon.freeColor : ArtCommon.cantAffordColor;
        var costColor = canChooseFree ? ArtCommon.freeColor : ArtCommon.affordColor;
        if (!isFinite(amount)) {
            return X(errorColor);
        }
        if (amount === 0) {
            return checkMark();
        }
        var cost = new PIXI.Container();
        cost.addChild(Shapes.filledCircle(0, 0, 50, costColor));
        var goldText = Shapes.centeredText(-70, 0, "" + amount, 1, costColor);
        goldText.anchor.set(1, 0.5);
        cost.addChild(goldText);
        return cost;
    }
    ArtCommon.payment = payment;
    function checkMark() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(ArtCommon.freeColor, 1);
        graphics.drawPolygon([-38, -10, -50, 0, -15, 50, 50, -40, 35, -50, -15, 25]);
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
    function endScreenFinanceMarker() {
        return combineEffectArt([goldCoin(), slash(), debtToken()], 8);
    }
    ArtCommon.endScreenFinanceMarker = endScreenFinanceMarker;
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
        var e_14, _a;
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
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (arts_1_1 && !arts_1_1.done && (_a = arts_1.return)) _a.call(arts_1);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return container;
    }
    function combineCostArt(arts, padding) {
        var e_15, _a;
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
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (arts_2_1 && !arts_2_1.done && (_a = arts_2.return)) _a.call(arts_2);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return container;
    }
    function combineStageCostArt(arts, padding) {
        var e_16, _a;
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
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (arts_3_1 && !arts_3_1.done && (_a = arts_3.return)) _a.call(arts_3);
            }
            finally { if (e_16) throw e_16.error; }
        }
        return container;
    }
    function effectNotFound() {
        return Shapes.filledRect(-50, -50, 100, 100, 0xFF00FF);
    }
})(ArtCommon || (ArtCommon = {}));
var BlurFilter = /** @class */ (function (_super) {
    __extends(BlurFilter, _super);
    function BlurFilter() {
        return _super.call(this, undefined, "\n            varying vec2 vTextureCoord;\n\n            uniform sampler2D uSampler;\n\n            vec4 getColor(float xi, float yi) {\n                float wi = 1.0 / 100.0;\n                float hi = 1.0 / 100.0;\n                vec2 coord = vTextureCoord + vec2(xi*wi + yi*hi);\n                if (coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0 || coord.y > 1.0) {\n                    return vec4(0.0, 0.0, 0.0, 0.0);\n                }\n                return texture2D(uSampler, coord);\n            }\n\n            void main(void){\n                gl_FragColor = getColor(0.0, 0.0);\n\n                const float PI = 3.14159;\n\n                for (float angle = 0.0; angle < 2.0*PI; angle += PI/8.0) {\n                    for (float dist = 1.0; dist <= 4.0; dist += 1.0) {\n                        gl_FragColor += getColor(dist * cos(angle), dist * sin(angle));\n                    }\n                }\n                gl_FragColor /= 1.0 + 16.0 * 4.0;\n            }\n        ", {}) || this;
    }
    return BlurFilter;
}(PIXI.Filter));
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
    function getGoldToLose(gold, goldToLose) {
        return randInt(0, Math.min(gold, goldToLose));
    }
    Bot.getGoldToLose = getGoldToLose;
})(Bot || (Bot = {}));
/// <reference path="gameElement.ts" />
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(scene, cardId, index, points, handPosition, activeWonder, validMoves) {
        var _this = _super.call(this, true) || this;
        _this._flippedT = 0;
        _this._effectT = 0;
        _this._interactable = false;
        _this._checkMarkVisible = true;
        _this.scene = scene;
        _this.index = index;
        _this.apiCardId = cardId;
        _this.apiCard = Main.gamestate.cards[cardId];
        _this.points = points;
        _this.handPosition = handPosition;
        _this.activeWonder = activeWonder;
        _this.targetPosition = new PIXI.Point();
        _this.visualState = 'full';
        _this.state = { type: 'in_hand', visualState: 'full' };
        _this.configureValidMoves(validMoves);
        _this.create(cardId, true);
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
        var _this = this;
        this.apiCardId = cardId;
        this.apiCard = Main.gamestate.cards[cardId];
        this.cardResource = Resources.getCard(cardId);
        this.fullClipRect = this.cardResource.fullClipRect;
        this.effectClipRect = this.cardResource.effectClipRect;
        this.div.className = 'card';
        this.div.style.transformOrigin = "left top";
        this.frontDiv = this.div.appendChild(document.createElement('div'));
        this.frontDiv.style.transformOrigin = 'left center';
        this.frontProxy = this.frontDiv.appendChild(document.createElement('div'));
        this.frontProxy.style.transition = 'filter 1s';
        this.setGrayedOut(false);
        var front = this.frontProxy.appendChild(this.cardResource.front);
        front.style.transform = "translate(-50%, -" + (C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT / 2) + "px)";
        this.highlightEffect = this.frontDiv.appendChild(this.drawHighlightEffect());
        if (this.points !== undefined) {
            var n = ("" + this.points).length;
            this.pointsSummary = this.frontDiv.appendChild(this.drawPointsSummary());
            this.pointsSummary.style.left = this.effectClipRect.width / 2 - C.CARD_POINTS_SUMMARY_WIDTH(n) / 2 + "px";
            this.pointsSummary.style.top = -this.effectClipRect.height / 2 + C.CARD_POINTS_SUMMARY_HEIGHT / 2 + "px";
        }
        this.paymentCanvas = this.frontDiv.appendChild(this.drawPayment());
        this.paymentCanvas.style.transform = "translate(-50%, -" + (C.CARD_TITLE_HEIGHT + C.CARD_PAYMENT_HEIGHT + C.CARD_BANNER_HEIGHT / 2) + "px)";
        this.paymentCanvas.style.visibility = drawPayment ? 'visible' : 'hidden';
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
        // Dragging
        this.frontDiv.onmousedown = function (event) {
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
        this.frontDiv.onmousemove = function () {
            if (_this.visualState === 'flipped' || _this.state.type.startsWith('dragging')) {
                _this.scene.stopPopup(_this);
                return;
            }
            var bounds = _this.bounds;
            _this.scene.updatePopup(_this, _this.x + bounds.left, _this.y + bounds.bottom);
        };
        this.frontDiv.onmouseleave = function () {
            _this.scene.stopPopup(_this);
        };
    };
    Card.prototype.destroy = function () {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        Resources.returnCard(this.apiCardId, this.cardResource);
        this.cardResource = null;
    };
    Card.prototype.convertToPlayed = function () {
        this.div.className = 'playedcard';
        this.zIndex = C.Z_INDEX_CARD_PLAYED;
        this.div.removeChild(this.backDiv);
        this.frontDiv.removeChild(this.paymentCanvas);
    };
    Card.prototype.convertToBuried = function () {
        this.div.className = 'buriedcard';
        this.zIndex = C.Z_INDEX_CARD_WONDER;
        this.div.removeChild(this.frontDiv);
        this.backDiv.removeChild(this.checkMark);
    };
    Card.prototype.convertToDiscarded = function () {
        this.div.className = 'discardedcard';
        this.div.removeChild(this.frontDiv);
        this.backDiv.removeChild(this.highlightFlipped);
        this.backDiv.removeChild(this.checkMark);
    };
    Card.prototype.update = function () {
        var _a, _b, _c, _d;
        if (this.dragging) {
            var stage = this.activeWonder.getClosestStageId(Main.mouseX);
            if (!Main.mouseDown || !this.canBeInteractable()) {
                if (this.allowPlay && this.activeWonder.getMainRegion().contains(Main.mouseX, Main.mouseY)) {
                    var move = { action: 'play', card: this.apiCardId, index: this.index };
                    if (API.isPaymentSelectionNecessary(move, Main.gamestate.validMoves)) {
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
                    if (API.isCopyStageSelectionNecessary(stage, Main.gamestate.validMoves, Main.gamestate.turretPlayers)) {
                        this.scene.startCopyStageDialog(this, move);
                    }
                    else {
                        var options = API.copyStageOptions(stage, Main.gamestate.validMoves);
                        if (options.length > 0) {
                            move.copyPlayer = options[0].copyPlayer;
                            move.copyStage = options[0].copyStage;
                        }
                        if (API.isPaymentSelectionNecessary(move, Main.gamestate.validMoves)) {
                            this.scene.startPaymentDialog(this, move);
                        }
                        else {
                            if (options.length > 0) {
                                move.payment = { bank: (_b = (_a = Main.gamestate.wonders[move.copyPlayer].stages[move.copyStage]) === null || _a === void 0 ? void 0 : _a.cost) === null || _b === void 0 ? void 0 : _b.gold };
                            }
                            else {
                                move.payment = { bank: (_d = (_c = Main.gamestate.wonders[Main.player].stages[stage]) === null || _c === void 0 ? void 0 : _c.cost) === null || _d === void 0 ? void 0 : _d.gold };
                            }
                            Main.submitMove(move);
                        }
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
        this.x = lerpTime(this.x, this.targetPosition.x, 0.25, Main.delta);
        if (Math.abs(this.x - this.targetPosition.x) < 1)
            this.x = this.targetPosition.x;
        this.y = lerpTime(this.y, this.targetPosition.y, 0.25, Main.delta);
        if (Math.abs(this.y - this.targetPosition.y) < 1)
            this.y = this.targetPosition.y;
        this.updateVisuals();
    };
    Card.prototype.updateVisuals = function () {
        if (this.visualState === 'effect') {
            this.effectT = lerpTime(this.effectT, 1, 0.25, Main.delta);
        }
        else {
            this.effectT = lerpTime(this.effectT, 0, 0.25, Main.delta);
        }
        if (this.visualState === 'flipped') {
            this.flippedT = lerpTime(this.flippedT, 1, 0.25, Main.delta);
        }
        else {
            this.flippedT = lerpTime(this.flippedT, 0, 0.25, Main.delta);
        }
        var alpha;
        if (Main.diffing) {
            alpha = 0;
        }
        else if (this.state.type.startsWith('locked')) {
            alpha = (Math.sin(Main.time * 8) + 1) / 2;
        }
        else if ((this.state.type === 'effect' || this.state.type === 'flipped') && this.state.justPlayed) {
            alpha = 1;
        }
        else {
            alpha = 0;
        }
        if (alpha > 0) {
            this.highlightEffect.style.boxShadow = "inset 0px 0px 0px " + C.CARD_HIGHLIGHT + "px rgba(255, 0, 0, " + alpha + ")";
            this.highlightEffect.style.visibility = this.visualState === 'effect' ? 'visible' : 'hidden';
            this.highlightFlipped.style.backgroundColor = "rgba(255, 0, 0, " + alpha + ")";
            this.highlightFlipped.style.visibility = this.visualState === 'flipped' ? 'visible' : 'hidden';
        }
        else {
            this.highlightEffect.style.visibility = 'hidden';
            this.highlightFlipped.style.visibility = 'hidden';
        }
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
        var e_17, _a;
        var _b, _c, _d, _e;
        this.allowPlay = false;
        this.allowBuildStages = [];
        this.allowThrow = false;
        this.minPlayCost = Infinity;
        this.zeusActiveForPlay = false;
        this.delphoiActiveForPlay = false;
        try {
            for (var validMoves_4 = __values(validMoves), validMoves_4_1 = validMoves_4.next(); !validMoves_4_1.done; validMoves_4_1 = validMoves_4.next()) {
                var move = validMoves_4_1.value;
                if (move.card !== this.apiCardId)
                    continue;
                if (move.action === 'play') {
                    this.allowPlay = true;
                    var cost = API.totalPaymentAmount(move.payment);
                    if (!((_b = move.payment) === null || _b === void 0 ? void 0 : _b.free_with_zeus) && !((_c = move.payment) === null || _c === void 0 ? void 0 : _c.free_with_delphoi) && cost < this.minPlayCost)
                        this.minPlayCost = cost;
                    if ((_d = move.payment) === null || _d === void 0 ? void 0 : _d.free_with_zeus)
                        this.zeusActiveForPlay = true;
                    if ((_e = move.payment) === null || _e === void 0 ? void 0 : _e.free_with_delphoi)
                        this.delphoiActiveForPlay = true;
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
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (validMoves_4_1 && !validMoves_4_1.done && (_a = validMoves_4.return)) _a.call(validMoves_4);
            }
            finally { if (e_17) throw e_17.error; }
        }
    };
    Card.prototype.canBeInteractable = function () {
        if (this.scene.isMenuActive)
            return false;
        if (Main.diffing)
            return false;
        if (Main.gamestate.state === 'CHOOSE_GOLD_TO_LOSE')
            return false;
        if (Main.gamestate.state === 'SEE_FUTURE')
            return false;
        //if (!this.allowPlay && this.allowBuildStages.length === 0 && !this.allowThrow) return false;
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
    Card.prototype.isMilitary = function () {
        return this.apiCard.effects.every(function (effect) { return effect.type === 'shields'; });
    };
    Card.prototype.setGrayedOut = function (grayedOut) {
        this.frontProxy.style.filter = grayedOut ? 'grayscale(100%) brightness(50%)' : 'grayscale(0%) brightness(100%)';
    };
    Card.prototype.drawPayment = function () {
        var payment = ArtCommon.payment(this.allowPlay ? this.minPlayCost : Infinity, this.zeusActiveForPlay || this.delphoiActiveForPlay);
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
    Card.prototype.drawPointsSummary = function () {
        var summary = document.createElement('div');
        summary.style.position = 'absolute';
        var container = new PIXI.Container();
        var n = ("" + this.points).length;
        container.addChild(Shapes.filledRect(-C.CARD_POINTS_SUMMARY_WIDTH(n) / 2, -C.CARD_POINTS_SUMMARY_HEIGHT / 2, C.CARD_POINTS_SUMMARY_WIDTH(n), C.CARD_POINTS_SUMMARY_HEIGHT, C.CARD_POINTS_SUMMARY_BACKGROUND_COLOR));
        container.addChild(Shapes.centeredText(0, 0, "" + this.points, 0.1, C.CARD_POINTS_SUMMARY_TEXT_COLOR)).y -= 0.5;
        var pointsElement = summary.appendChild(ArtCommon.domElementForArt(container));
        pointsElement.style.position = 'absolute';
        return summary;
    };
    Card.flippedCardForAge = function (scene, age, justPlayed) {
        var card = new Card(scene, -age, 0, undefined, undefined, undefined, []);
        card.state = { type: 'flipped', justPlayed: justPlayed };
        card.snap();
        return card;
    };
    return Card;
}(GameElement));
var CardForList = /** @class */ (function (_super) {
    __extends(CardForList, _super);
    function CardForList(scene, cardId) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.apiCard = Main.gamestate.cards[cardId];
        _this.div.style.width = C.CARD_LIST_CARD_WIDTH + "px";
        _this.div.style.height = C.CARD_LIST_CARD_HEIGHT + "px";
        // Popup
        _this.div.onmousemove = function () {
            if (Main.scene.isCurrentlyDragging()) {
                _this.scene.stopPopup(_this);
                return;
            }
            _this.scene.updatePopup(_this, _this.x, _this.y + C.CARD_LIST_CARD_HEIGHT);
        };
        _this.div.onmouseleave = function () {
            _this.scene.stopPopup(_this);
        };
        return _this;
    }
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
        var e_18, _a, e_19, _b;
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
            var _loop_1 = function (i) {
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
                _loop_1(i);
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
                        for (var cardsConsumingChain_1 = (e_19 = void 0, __values(cardsConsumingChain)), cardsConsumingChain_1_1 = cardsConsumingChain_1.next(); !cardsConsumingChain_1_1.done; cardsConsumingChain_1_1 = cardsConsumingChain_1.next()) {
                            var card = cardsConsumingChain_1_1.value;
                            box.appendChild(this.infoText("- " + this.cardName(card), '18px', currentY + "px"));
                            currentY += 16;
                        }
                    }
                    catch (e_19_1) { e_19 = { error: e_19_1 }; }
                    finally {
                        try {
                            if (cardsConsumingChain_1_1 && !cardsConsumingChain_1_1.done && (_b = cardsConsumingChain_1.return)) _b.call(cardsConsumingChain_1);
                        }
                        finally { if (e_19) throw e_19.error; }
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (chains_1_1 && !chains_1_1.done && (_a = chains_1.return)) _a.call(chains_1);
                }
                finally { if (e_18) throw e_18.error; }
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
        var e_20, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.update();
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_20) throw e_20.error; }
        }
    };
    CardListScene.prototype.create = function () {
        var e_21, _a;
        var cardList = Main.cardList.appendChild(Resources.CARD_LIST);
        var height = cardList.height / resolution;
        cardList.style.top = height / 2 + C.CARD_LIST_OFFSET_Y + "px";
        Main.cardList.style.height = height + C.CARD_LIST_PADDING + C.CARD_LIST_OFFSET_Y + "px";
        var deck = Main.gamestate.deck;
        for (var age = 1; age <= 3; age++) {
            var x = (age - 2) * C.CARD_LIST_CARD_DX;
            var y = 0;
            try {
                for (var _b = (e_21 = void 0, __values(deck[age])), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cardInfo = _c.value;
                    var card = new CardForList(this, cardInfo.id);
                    card.x = x - C.CARD_LIST_CARD_WIDTH / 2;
                    card.y = y - C.CARD_LIST_CARD_HEIGHT / 2;
                    card.addToGame(Main.cardList);
                    y += C.CARD_LIST_CARD_DY;
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_21) throw e_21.error; }
            }
        }
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
            this.popup = null;
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
var ChooseGoldToLoseDialog = /** @class */ (function (_super) {
    __extends(ChooseGoldToLoseDialog, _super);
    function ChooseGoldToLoseDialog(scene, gold, goldToLose, activeWonder) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.gold = gold;
        _this.goldToLose = goldToLose;
        _this.activeWonder = activeWonder;
        _this.div.appendChild(_this.draw());
        return _this;
    }
    ChooseGoldToLoseDialog.prototype.update = function () {
        this.x = this.activeWonder.x + C.CGTL_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.CGTL_DIALOG_OFFSET_Y;
    };
    ChooseGoldToLoseDialog.prototype.draw = function () {
        var _this = this;
        var maxGoldToLose = Math.min(this.gold, this.goldToLose);
        var dialogDiv = document.createElement('div');
        dialogDiv.style.width = C.CGTL_DIALOG_WIDTH + "px";
        dialogDiv.style.height = (maxGoldToLose + 1) * C.CGTL_DIALOG_PAYMENTS_DY + C.CGTL_DIALOG_EXTRA_HEIGHT + "px";
        dialogDiv.style.backgroundColor = C.CGTL_DIALOG_COLOR;
        dialogDiv.style.borderRadius = C.CGTL_DIALOG_CORNER_RADIUS + "px";
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = "translate(-50%, -50%)";
        var dialogTitle = dialogDiv.appendChild(this.drawText("You've lost " + this.goldToLose + " gold!<br/>You may choose to take debt tokens instead", C.CGTL_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = C.CGTL_DIALOG_TITLE_PADDING + "px";
        this.buttons = [];
        var _loop_2 = function (i) {
            var leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = 50 - C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            leftDiv.style.height = C.CGTL_DIALOG_PAYMENTS_DY + "px";
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            var middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT + "%";
            middleDiv.style.height = C.CGTL_DIALOG_PAYMENTS_DY + "px";
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            var rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = 50 - C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 2 + "%";
            rightDiv.style.height = C.CGTL_DIALOG_PAYMENTS_DY + "px";
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';
            var goldToLose = maxGoldToLose - i;
            if (goldToLose > 0) {
                var goldToLoseText = rightDiv.appendChild(this_1.drawText("Lose " + goldToLose + " gold", C.CGTL_DIALOG_PAYMENTS_TEXT_SIZE));
                goldToLoseText.style.width = '100%';
                goldToLoseText.style.textAlign = 'left';
                goldToLoseText.style.position = 'absolute';
                goldToLoseText.style.top = '50%';
                goldToLoseText.style.transform = 'translate(0, -50%)';
            }
            if (goldToLose < this_1.goldToLose) {
                var debtTokens = this_1.goldToLose - goldToLose;
                var s = debtTokens === 1 ? '' : 's';
                var debtTokensToGainText = leftDiv.appendChild(this_1.drawText("+ " + debtTokens + " debt token" + s, C.CGTL_DIALOG_PAYMENTS_TEXT_SIZE));
                debtTokensToGainText.style.width = '100%';
                debtTokensToGainText.style.textAlign = 'right';
                debtTokensToGainText.style.position = 'absolute';
                debtTokensToGainText.style.top = '50%';
                debtTokensToGainText.style.transform = 'translate(0, -50%)';
            }
            var payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.CGTL_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = C.CGTL_DIALOG_PAY_BUTTON_WIDTH + "px";
            payButton.style.height = C.CGTL_DIALOG_PAY_BUTTON_HEIGHT + "px";
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.onclick = function (event) {
                Main.chooseGoldToLose(goldToLose);
                _this.select(i);
            };
            this_1.buttons.push(payButton);
        };
        var this_1 = this;
        for (var i = 0; i <= maxGoldToLose; i++) {
            _loop_2(i);
        }
        return dialogDiv;
    };
    ChooseGoldToLoseDialog.prototype.select = function (i) {
        for (var j = 0; j < this.buttons.length; j++) {
            if (j === i) {
                this.buttons[j].style.backgroundColor = C.CGTL_DIALOG_PAY_BUTTON_COLOR_SELECTED;
            }
            else {
                this.buttons[j].style.backgroundColor = C.CGTL_DIALOG_PAY_BUTTON_COLOR;
            }
        }
    };
    ChooseGoldToLoseDialog.prototype.drawText = function (text, fontSize) {
        var p = document.createElement('p');
        p.innerHTML = text;
        p.style.textAlign = 'center';
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = fontSize + "px";
        return p;
    };
    ChooseGoldToLoseDialog.prototype.removeFromGame = function () {
        _super.prototype.removeFromGame.call(this);
        this.scene.chooseGoldToLoseDialog = null;
    };
    return ChooseGoldToLoseDialog;
}(GameElement));
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
        var e_22, _a;
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
        try {
            for (var _b = __values(gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                if (gamestate.playerData[player].currentMove) {
                    if (player === Main.player) {
                        this.selectSide(gamestate.playerData[Main.player].currentMove.side);
                    }
                    else {
                        this.setCurrentlyMoved(player, true);
                    }
                }
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_22) throw e_22.error; }
        }
    };
    ChooseWonderScene.prototype.destroy = function () {
        var e_23, _a, e_24, _b;
        try {
            for (var _c = __values(this.wonderChoices), _d = _c.next(); !_d.done; _d = _c.next()) {
                var wonderChoice = _d.value;
                try {
                    for (var wonderChoice_1 = (e_24 = void 0, __values(wonderChoice)), wonderChoice_1_1 = wonderChoice_1.next(); !wonderChoice_1_1.done; wonderChoice_1_1 = wonderChoice_1.next()) {
                        var wonder = wonderChoice_1_1.value;
                        wonder.destroy();
                    }
                }
                catch (e_24_1) { e_24 = { error: e_24_1 }; }
                finally {
                    try {
                        if (wonderChoice_1_1 && !wonderChoice_1_1.done && (_b = wonderChoice_1.return)) _b.call(wonderChoice_1);
                    }
                    finally { if (e_24) throw e_24.error; }
                }
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_23) throw e_23.error; }
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
    ChooseWonderScene.prototype.setCurrentlyMoved = function (player, currentlyMoved) {
        var e_25, _a;
        try {
            for (var _b = __values(this.wonderChoices[Main.gamestate.players.indexOf(player)]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var wonderChoice = _c.value;
                wonderChoice.checkMarkVisible = currentlyMoved;
            }
        }
        catch (e_25_1) { e_25 = { error: e_25_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_25) throw e_25.error; }
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
    C.Z_INDEX_WONDER_TOKENS = 12;
    C.Z_INDEX_CARD_MOVING = 13;
    C.Z_INDEX_CARD_DRAGGING = 100;
    C.Z_INDEX_MILITARY_OVERLAY = 101;
    C.Z_INDEX_GOLD_LOSS_EFFECT = 101;
    C.Z_INDEX_TOKEN_MOVING = 102;
    C.Z_INDEX_GOLD_COIN = 102;
    C.Z_INDEX_PAYMENT_DIALOG = 1000;
    C.Z_INDEX_CGTL_DIALOG = 1001;
    C.Z_INDEX_CARD_POPUP = 1002;
    C.GAME_HEIGHT_PADDING_3P = 400;
    C.GAME_HEIGHT_PADDING_4567P = 300;
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
    C.CARD_EFFECT_MAX_WIDTH = 80;
    C.CARD_COST_X = 12.375;
    C.CARD_COST_Y = C.CARD_TITLE_HEIGHT + C.CARD_BANNER_HEIGHT;
    C.CARD_COST_SCALE = 0.13;
    C.CARD_COST_MAX_HEIGHT = 97;
    C.CARD_COST_PADDING = 6;
    C.CARD_POINTS_SUMMARY_WIDTH = function (n) { return 6 * n + 3; };
    C.CARD_POINTS_SUMMARY_HEIGHT = 11;
    C.CARD_POINTS_SUMMARY_BACKGROUND_COLOR = 0x222222;
    C.CARD_POINTS_SUMMARY_TEXT_COLOR = 0xEEEEEE;
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
    C.WONDER_LAST_Y_4P = 1070;
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
    C.WONDER_RESOURCE_ROLL_INFO_WIDTH = 120;
    C.WONDER_RED_ROLL_X = -150;
    C.WONDER_RED_ROLL_Y = C.WONDER_BOARD_BORDER + C.CARD_EFFECT_CLIP_PADDING + C.CARD_EFFECT_HEIGHT / 2;
    C.WONDER_RED_ROLL_MAX_X = 110;
    C.WONDER_YELLOW_ROLL_Y = function (cities) { return cities ? -6 : -18; };
    C.WONDER_PURPLE_ROLL_Y = function (cities) { return cities ? 28 : 18; };
    C.WONDER_BLUE_ROLL_Y = function (cities) { return cities ? -6 : -18; };
    C.WONDER_GREEN_ROLL_Y = function (cities) { return cities ? 28 : 18; };
    C.WONDER_BLACK_ROLL_Y = -40;
    C.WONDER_OVERFLOW_ROLL_OFFSET_Y = C.WONDER_RESOURCE_ROLL_OFFSET_Y + 38;
    C.WONDER_SIDEBAR_NAME_X = -2;
    C.WONDER_SIDEBAR_NAME_Y = -36;
    C.WONDER_SIDEBAR_NAME_Y_CHOOSE = -15;
    C.WONDER_SIDEBAR_NAME_SIZE = 15;
    C.WONDER_SIDEBAR_GOLD_COIN_SCALE = 0.15;
    C.WONDER_SIDEBAR_GOLD_COIN_X = -10;
    C.WONDER_SIDEBAR_GOLD_COIN_Y = -15;
    C.WONDER_SIDEBAR_GOLD_TEXT_X = -22;
    C.WONDER_SIDEBAR_GOLD_TEXT_Y = -15;
    C.WONDER_SIDEBAR_GOLD_TEXT_SIZE = 15;
    C.WONDER_SIDEBAR_POINTS_WREATH_SCALE = 0.15;
    C.WONDER_SIDEBAR_POINTS_WREATH_X = -55;
    C.WONDER_SIDEBAR_POINTS_WREATH_Y = -15;
    C.WONDER_SIDEBAR_POINTS_TEXT_X = -65;
    C.WONDER_SIDEBAR_POINTS_TEXT_Y = -15;
    C.WONDER_SIDEBAR_POINTS_TEXT_SIZE = 15;
    C.WONDER_SIDEBAR_CHECKMARK_SCALE = 0.15;
    C.WONDER_SIDEBAR_CHECKMARK_X = -108;
    C.WONDER_SIDEBAR_CHECKMARK_Y = 39;
    C.WONDER_SIDEBAR_TOKENS_X = -21;
    C.WONDER_SIDEBAR_MILITARY_TOKENS_Y = 21;
    C.WONDER_SIDEBAR_DEBT_TOKENS_Y = 42;
    C.WONDER_DIPLOMACY_TOKENS_OFFSET_X = 20;
    C.WONDER_DIPLOMACY_TOKENS_DX = 30;
    C.WONDER_MILITARY_TOKENS_OFFSET_X = 0;
    C.WONDER_MILITARY_TOKENS_DX = -18;
    C.WONDER_DEBT_TOKENS_OFFSET_X = 0;
    C.WONDER_DEBT_TOKENS_DX = -18;
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
    C.MILITARY_TOKEN_SCALE = 0.15;
    C.DEBT_TOKEN_SCALE = 0.15;
    C.DIPLOMACY_TOKEN_SCALE = 0.25;
    C.GOLD_COIN_SCALE = 0.225;
    C.DISCARD_PILE_X = 0;
    C.DISCARD_PILE_Y = 750;
    C.DISCARD_PILE_AREA_WIDTH = 200;
    C.DISCARD_PILE_AREA_HEIGHT = 240;
    C.DISCARD_PILE_AREA_CORNER_RADIUS = 8;
    C.DISCARD_PILE_AREA_BORDER = 3;
    C.DISCARD_PILE_TITLE_Y = 20;
    C.DISCARD_PILE_TITLE_SCALE = 0.2;
    C.DISCARD_PILE_TITLE_TEXT = "Graveyard";
    C.PAYMENT_DIALOG_OFFSET_X = -512;
    C.PAYMENT_DIALOG_OFFSET_Y = -330;
    C.PAYMENT_DIALOG_WIDTH = 375;
    C.PAYMENT_DIALOG_EXTRA_HEIGHT = 60;
    C.PAYMENT_DIALOG_CORNER_RADIUS = 8;
    C.PAYMENT_DIALOG_COLOR = '#FFFFFF';
    C.PAYMENT_DIALOG_TITLE = "Payment";
    C.PAYMENT_DIALOG_TITLE_SIZE = 18;
    C.PAYMENT_DIALOG_TITLE_PADDING = 12;
    C.PAYMENT_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 24;
    C.PAYMENT_DIALOG_PAYMENTS_DY = 37.5;
    C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE = 12;
    C.PAYMENT_DIALOG_PAY_BUTTON_WIDTH = 56;
    C.PAYMENT_DIALOG_PAY_BUTTON_HEIGHT = 30;
    C.PAYMENT_DIALOG_PAY_BUTTON_COLOR = '#000088';
    C.PAYMENT_DIALOG_PAY_BUTTON_TEXT_COLOR = '#FFFFFF';
    C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_X = 15;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_OFFSET_Y = 15;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_COLOR = 0x000000;
    C.PAYMENT_DIALOG_CLOSE_BUTTON_SCALE = 0.15;
    C.CGTL_DIALOG_OFFSET_X = -512;
    C.CGTL_DIALOG_OFFSET_Y = -330;
    C.CGTL_DIALOG_WIDTH = 375;
    C.CGTL_DIALOG_EXTRA_HEIGHT = 70;
    C.CGTL_DIALOG_CORNER_RADIUS = 8;
    C.CGTL_DIALOG_COLOR = '#FFFFFF';
    C.CGTL_DIALOG_TITLE_SIZE = 12;
    C.CGTL_DIALOG_TITLE_PADDING = 12;
    C.CGTL_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 24;
    C.CGTL_DIALOG_PAYMENTS_DY = 37.5;
    C.CGTL_DIALOG_PAYMENTS_TEXT_SIZE = 12;
    C.CGTL_DIALOG_PAY_BUTTON_WIDTH = 40;
    C.CGTL_DIALOG_PAY_BUTTON_HEIGHT = 30;
    C.CGTL_DIALOG_PAY_BUTTON_COLOR = '#880000';
    C.CGTL_DIALOG_PAY_BUTTON_COLOR_SELECTED = '#FF0000';
    C.COPY_STAGE_DIALOG_OFFSET_X = -512;
    C.COPY_STAGE_DIALOG_OFFSET_Y = -330;
    C.COPY_STAGE_DIALOG_WIDTH = 375;
    C.COPY_STAGE_DIALOG_EXTRA_HEIGHT = 60;
    C.COPY_STAGE_DIALOG_CORNER_RADIUS = 8;
    C.COPY_STAGE_DIALOG_COLOR = '#FFFFFF';
    C.COPY_STAGE_DIALOG_TITLE = "Choose stage to copy";
    C.COPY_STAGE_DIALOG_TITLE_SIZE = 18;
    C.COPY_STAGE_DIALOG_TITLE_PADDING = 12;
    C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT = 24;
    C.COPY_STAGE_DIALOG_PAYMENTS_DY = 37.5;
    C.COPY_STAGE_DIALOG_PAY_BUTTON_WIDTH = 56;
    C.COPY_STAGE_DIALOG_PAY_BUTTON_HEIGHT = 30;
    C.COPY_STAGE_DIALOG_PAY_BUTTON_COLOR = '#000088';
    C.COPY_STAGE_DIALOG_PAY_BUTTON_TEXT_COLOR = '#FFFFFF';
    C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_X = 15;
    C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_Y = 15;
    C.COPY_STAGE_DIALOG_CLOSE_BUTTON_COLOR = 0x000000;
    C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE = 0.15;
    C.END_SCREEN_PLACEMENTS_Y = 50;
    C.END_SCREEN_NAMES_Y = 80;
    C.END_SCREEN_ELOS_Y = 105;
    C.END_SCREEN_POINTS_Y = 145;
    C.END_SCREEN_POINTS_DX = 120;
    C.END_SCREEN_POINTS_DY = 37.5;
    C.END_SCREEN_SYMBOL_SIZE = 24;
    C.END_SCREEN_TEXT_SIZE = 18;
    C.END_SCREEN_NICE_TEXT_SIZE = 12;
    C.END_SCREEN_ELO_TEXT_SIZE = 12;
    C.END_SCREEN_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_HEADER_TEXT_SIZE = 24;
    C.CARD_LIST_HEADER_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_CARD_WIDTH = 96;
    C.CARD_LIST_CARD_HEIGHT = 40;
    C.CARD_LIST_EFFECT_SCALE = 0.24;
    C.CARD_LIST_EFFECT_MAX_WIDTH = 80;
    C.CARD_LIST_INFO_TEXT_SIZE = 16;
    C.CARD_LIST_INFO_TEXT_COLOR = '#FFFFFF';
    C.CARD_LIST_CARD_DX = 400;
    C.CARD_LIST_CARD_DY = C.CARD_LIST_CARD_HEIGHT;
    C.CARD_LIST_WIDTH = C.CARD_LIST_CARD_DX * 4;
    C.CARD_LIST_OFFSET_Y = -20;
    C.CARD_LIST_PADDING = 200;
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
var CopyStageDialog = /** @class */ (function (_super) {
    __extends(CopyStageDialog, _super);
    function CopyStageDialog(scene, card, move, activeWonder) {
        var _this = _super.call(this) || this;
        _this.scene = scene;
        _this.card = card;
        _this.move = move;
        _this.activeWonder = activeWonder;
        _this.div.appendChild(_this.draw());
        return _this;
    }
    CopyStageDialog.prototype.update = function () {
        this.x = this.activeWonder.x + C.COPY_STAGE_DIALOG_OFFSET_X;
        this.y = this.activeWonder.y + C.COPY_STAGE_DIALOG_OFFSET_Y;
    };
    CopyStageDialog.prototype.draw = function () {
        var _this = this;
        var copyStageOptions = API.copyStageOptions(this.move.stage, Main.gamestate.validMoves);
        var dialogDiv = document.createElement('div');
        dialogDiv.style.width = C.COPY_STAGE_DIALOG_WIDTH + "px";
        dialogDiv.style.height = copyStageOptions.length * C.COPY_STAGE_DIALOG_PAYMENTS_DY + C.COPY_STAGE_DIALOG_EXTRA_HEIGHT + "px";
        dialogDiv.style.backgroundColor = C.COPY_STAGE_DIALOG_COLOR;
        dialogDiv.style.borderRadius = C.COPY_STAGE_DIALOG_CORNER_RADIUS + "px";
        dialogDiv.style.position = 'relative';
        dialogDiv.style.transform = "translate(-50%, -50%)";
        var dialogTitle = dialogDiv.appendChild(this.drawText(C.COPY_STAGE_DIALOG_TITLE, C.COPY_STAGE_DIALOG_TITLE_SIZE));
        dialogTitle.style.padding = C.COPY_STAGE_DIALOG_TITLE_PADDING + "px";
        var _loop_3 = function (i) {
            var e_26, _a;
            var leftDiv = dialogDiv.appendChild(document.createElement('div'));
            leftDiv.style.width = 33 - C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 3 + "%";
            leftDiv.style.height = C.COPY_STAGE_DIALOG_PAYMENTS_DY + "px";
            leftDiv.style.float = 'left';
            leftDiv.style.position = 'relative';
            var middleDiv = dialogDiv.appendChild(document.createElement('div'));
            middleDiv.style.width = C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT + "%";
            middleDiv.style.height = C.COPY_STAGE_DIALOG_PAYMENTS_DY + "px";
            middleDiv.style.float = 'left';
            middleDiv.style.position = 'relative';
            var rightDiv = dialogDiv.appendChild(document.createElement('div'));
            rightDiv.style.width = 67 - 2 * C.COPY_STAGE_DIALOG_PAYMENTS_MID_DIV_WIDTH_PERCENT / 3 + "%";
            rightDiv.style.height = C.COPY_STAGE_DIALOG_PAYMENTS_DY + "px";
            rightDiv.style.float = 'left';
            rightDiv.style.position = 'relative';
            var option = copyStageOptions[i];
            var optionStage = Main.gamestate.wonders[option.copyPlayer].stages[option.copyStage];
            var effectContainer = new PIXI.Container();
            effectContainer.addChild(ArtCommon.getShadowForEffects(optionStage.effects, 'dark'));
            effectContainer.addChild(ArtCommon.getArtForEffects(optionStage.effects));
            var effectDiv = ArtCommon.domElementForArt(effectContainer, 0.25, 20);
            effectDiv.style.transform = 'translate(0%, -50%)';
            effectDiv.style.position = 'absolute';
            effectDiv.style.left = -20 + "px";
            effectDiv.style.top = '50%';
            rightDiv.appendChild(effectDiv);
            var payButton = middleDiv.appendChild(document.createElement('div'));
            payButton.style.backgroundColor = C.COPY_STAGE_DIALOG_PAY_BUTTON_COLOR;
            payButton.style.width = C.COPY_STAGE_DIALOG_PAY_BUTTON_WIDTH + "px";
            payButton.style.height = C.COPY_STAGE_DIALOG_PAY_BUTTON_HEIGHT + "px";
            payButton.style.position = 'absolute';
            payButton.style.left = '50%';
            payButton.style.top = '50%';
            payButton.style.transform = 'translate(-50%, -50%)';
            payButton.style.cursor = 'pointer';
            payButton.style.color = C.COPY_STAGE_DIALOG_PAY_BUTTON_TEXT_COLOR;
            payButton.onclick = function (event) {
                var _a, _b;
                var copyMove = {
                    action: _this.move.action,
                    card: _this.move.card,
                    index: _this.move.index,
                    stage: _this.move.stage,
                    copyPlayer: option.copyPlayer,
                    copyStage: option.copyStage,
                };
                _this.removeFromGame(true);
                if (API.isPaymentSelectionNecessary(copyMove, Main.gamestate.validMoves)) {
                    _this.scene.startPaymentDialog(_this.card, copyMove);
                }
                else {
                    copyMove.payment = { bank: (_b = (_a = Main.gamestate.wonders[option.copyPlayer].stages[option.copyStage]) === null || _a === void 0 ? void 0 : _a.cost) === null || _b === void 0 ? void 0 : _b.gold };
                    Main.submitMove(copyMove);
                }
            };
            var minCost = Infinity;
            try {
                for (var _b = (e_26 = void 0, __values(Main.gamestate.validMoves)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var validMove = _c.value;
                    if (validMove.action !== 'wonder')
                        continue;
                    if (validMove.stage !== this_2.move.stage)
                        continue;
                    if (validMove.copyPlayer !== option.copyPlayer)
                        continue;
                    if (validMove.copyStage !== option.copyStage)
                        continue;
                    var cost = API.totalPaymentAmount(validMove.payment);
                    if (cost < minCost) {
                        minCost = cost;
                    }
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_26) throw e_26.error; }
            }
            var payment = this_2.drawPayment(minCost);
            payment.style.position = 'absolute';
            payment.style.left = '50%';
            payment.style.top = '50%';
            payButton.appendChild(payment);
        };
        var this_2 = this;
        for (var i = 0; i < copyStageOptions.length; i++) {
            _loop_3(i);
        }
        var closeButton = dialogDiv.appendChild(this.drawCloseButton());
        closeButton.style.position = 'absolute';
        closeButton.style.left = "calc(100% - " + C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_X + "px)";
        closeButton.style.top = C.COPY_STAGE_DIALOG_CLOSE_BUTTON_OFFSET_Y + "px";
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function (event) {
            _this.removeFromGame();
        };
        return dialogDiv;
    };
    CopyStageDialog.prototype.drawText = function (text, fontSize) {
        var p = document.createElement('p');
        p.textContent = text;
        p.style.textAlign = 'center';
        p.style.fontFamily = "'Courier New', Courier, monospace";
        p.style.fontSize = fontSize + "px";
        return p;
    };
    CopyStageDialog.prototype.drawPayment = function (minPlayCost) {
        var payment = ArtCommon.payment(minPlayCost, false);
        payment.scale.set(C.CARD_PAYMENT_SCALE);
        payment.position.set(C.CARD_WIDTH / 2 + (payment.getLocalBounds().width / 2 - 50) * C.CARD_PAYMENT_SCALE, C.CARD_PAYMENT_HEIGHT / 2);
        return render(payment, C.CARD_WIDTH, C.CARD_PAYMENT_HEIGHT);
    };
    CopyStageDialog.prototype.drawCloseButton = function () {
        var closeButton = new PIXI.Container();
        var X = ArtCommon.X(C.COPY_STAGE_DIALOG_CLOSE_BUTTON_COLOR);
        X.scale.set(C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
        X.position.set(100 * C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE, 100 * C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
        closeButton.addChild(X);
        return render(closeButton, 200 * C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE, 200 * C.COPY_STAGE_DIALOG_CLOSE_BUTTON_SCALE);
    };
    CopyStageDialog.prototype.removeFromGame = function (success) {
        if (success === void 0) { success = false; }
        _super.prototype.removeFromGame.call(this);
        this.scene.copyStageDialog = null;
        if (!success) {
            this.card.deselect();
        }
    };
    return CopyStageDialog;
}(GameElement));
var DebtToken = /** @class */ (function (_super) {
    __extends(DebtToken, _super);
    function DebtToken() {
        var _this = _super.call(this) || this;
        _this.div.appendChild(_this.draw());
        _this.zIndex = C.Z_INDEX_TOKEN_MOVING;
        return _this;
    }
    DebtToken.prototype.draw = function () {
        return ArtCommon.domElementForArt(ArtCommon.debtToken(), C.DEBT_TOKEN_SCALE);
    };
    return DebtToken;
}(GameElement));
var DiplomacyToken = /** @class */ (function (_super) {
    __extends(DiplomacyToken, _super);
    function DiplomacyToken() {
        var _this = _super.call(this) || this;
        _this.div.appendChild(_this.draw());
        _this.zIndex = C.Z_INDEX_TOKEN_MOVING;
        return _this;
    }
    DiplomacyToken.prototype.draw = function () {
        return ArtCommon.domElementForArt(ArtCommon.dove(), C.DIPLOMACY_TOKEN_SCALE);
    };
    return DiplomacyToken;
}(GameElement));
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
    else if (effect.type === 'shields') {
        var s = effect.shields === 1 ? '' : 's';
        return effect.shields + " military shield" + s;
    }
    else if (effect.type === 'science') {
        return "Science symbol";
    }
    else if (effect.type === 'points') {
        return effect.points + " VP";
    }
    else if (effect.type === 'gold') {
        return "Gain " + effect.gold + " gold";
    }
    else if (effect.type === 'trading_post') {
        return "Pay 1 gold instead of 2 for brown resources traded from your " + (effect.direction === 'neg' ? 'left' : 'right') + " neighbor";
    }
    else if (effect.type === 'marketplace') {
        return "Pay 1 gold instead of 2 for grey resources traded from either neighbor";
    }
    else if (effect.type === 'gold_for_cards') {
        return "Gain " + effect.gold_per_card + " gold for each " + effect.color + " card played by you or your neighbors";
    }
    else if (effect.type === 'gold_and_points_for_cards') {
        return "Gain " + effect.gold_per_card + " gold and " + effect.points_per_card + " VP for each " + effect.color + " card you have played";
    }
    else if (effect.type === 'gold_and_points_for_stages') {
        return "Gain " + effect.gold_per_stage + " gold and " + effect.points_per_stage + " VP for each wonder stage you have built";
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
        return effect.points_per_card + " VP for each " + effect.color + " card you have played";
    }
    else if (effect.type === 'multi_science') {
        return "Any science symbol";
    }
    else if (effect.type === 'play_last_card') {
        return "You may play your last card instead of discarding it at the end of each age";
    }
    else if (effect.type === 'build_from_discard') {
        return "Play one card from the graveyard for free. Conflicts resolve in this order: Halikarnassos -> The Great Wall -> Manneken Pis -> Forging Agency";
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
    else if (effect.type === 'double_trading_post') {
        return "Pay 1 gold instead of 2 for brown resources traded from either neighbor";
    }
    else if (effect.type === 'copy_guild') {
        return "Copy the effect of a guild from either neighbor";
    }
    else if (effect.type === 'points_for_negative_tokens') {
        return effect.points_per_token + " VP for each military defeat token your neighbors have";
    }
    else if (effect.type === 'build_free_once_per_age') {
        return "You may ignore the cost of a single card of your choice per age";
    }
    else if (effect.type === 'gold_for_others') {
        return "All players except you receive " + effect.gold + " gold from the bank";
    }
    else if (effect.type === 'gold_for_neighbor') {
        return "Your " + (effect.direction === 'neg' ? 'left' : 'right') + " neighbor receives " + effect.gold + " gold from the bank";
    }
    else if (effect.type === 'waive_wonder_resource_costs') {
        return "You may ignore the resource costs of your wonder stages (gold costs are unaffected)";
    }
    else if (effect.type === 'mask') {
        return "Copy a science symbol from either neighbor, except astrolabes or multi-symbols. Multiple masks cannot copy the same instance of a symbol";
    }
    else if (effect.type === 'unproduced_resource') {
        return "Gives one of a resource you are not currently producing in your wonder per turn (untradable resources are ignored)";
    }
    else if (effect.type === 'duplicate_produced_resource') {
        return "Gives one extra of a resource you are currently producing in your wonder per turn (untradable resources are ignored)";
    }
    else if (effect.type === 'wharf') {
        return "Pay 1 gold less for a single resource per turn traded from your " + (effect.direction === 'neg' ? 'left' : 'right') + " neighbor";
    }
    else if (effect.type === 'smugglers_cache') {
        return "Pay 1 gold less when buying the starting resource from either neighbor";
    }
    else if (effect.type === 'dove') {
        return "Gain 1 diplomacy token";
    }
    else if (effect.type === 'gain_military_token') {
        return "Gain a military " + (effect.token_value < 0 ? 'defeat' : 'victory') + " token worth " + effect.token_value + " VP";
    }
    else if (effect.type === 'debt_for_neighbor') {
        return "Gives a debt token to your " + (effect.direction === 'neg' ? 'left' : 'right') + " neighbor";
    }
    else if (effect.type === 'gold_for_defeat_tokens') {
        return "Gain " + effect.gold_per_token + " gold for each military defeat token you have";
    }
    else if (effect.type === 'points_for_victory_tokens') {
        return effect.points_per_token + " VP for each " + effect.token_value + "-VP military victory token you have";
    }
    else if (effect.type === 'gold_and_points_for_victory_tokens') {
        return effect.gold_per_token + " gold and " + effect.points_per_token + " VP for each military victory token you have";
    }
    else if (effect.type === 'discard_defeat_tokens') {
        return "Discard all of your current military defeat tokens";
    }
    else if (effect.type === 'broken_gold') {
        return "All players except you lose " + effect.gold + " gold";
    }
    else if (effect.type === 'broken_gold_for_stages') {
        return "All players except you lose " + effect.gold_per_stage + " gold per wonder stage they have built";
    }
    else if (effect.type === 'broken_gold_for_victory_tokens') {
        return "All players except you lose " + effect.gold_per_token + " gold per military victory token they have";
    }
    else if (effect.type === 'turret') {
        return "You may build your wonder stages in any order";
    }
    else if (effect.type === 'shields_for_defeat_tokens') {
        return "Your military defeat tokens count as extra military shields";
    }
    else if (effect.type === 'points_for_shields') {
        return effect.points_per_shield + " VP for each military shield you have";
    }
    else if (effect.type === 'points_for_pairs') {
        return effect.points_per_pair + " VP for each pair of same-color cards you have";
    }
    else if (effect.type === 'points_for_triplets') {
        return effect.points_per_triplet + " VP for each triplet of same-color cards you have";
    }
    else if (effect.type === 'points_for_chains') {
        return effect.points_per_chain + " VP for each pair of chained cards you have";
    }
    else if (effect.type === 'build_free_without_chain') {
        return "You may build for free a chained card even if you do not have the prerequisite card (limited to " + effect.usages + " uses during the game)";
    }
    else if (effect.type === 'eye') {
        return "You may look at your starting hand from the next age";
    }
    else if (effect.type === 'see_future') {
        return "You may look at all of the purple and black cards in the deck";
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
            var d = Main.gamestate.sevenBlundersEnabled ? -1 : 1;
            var points1 = Main.gamestate.playerData[p1].pointsDistribution.total;
            var points2 = Main.gamestate.playerData[p2].pointsDistribution.total;
            if (points1 !== points2)
                return d * (points2 - points1);
            var gold1 = Main.gamestate.playerData[p1].gold;
            var gold2 = Main.gamestate.playerData[p2].gold;
            if (gold1 !== gold2)
                return d * (gold2 - gold1);
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
        // for (let i = 0; i < players.length; i++) {
        //     if (Main.gamestate.playerData[players[i]].pointsDistribution.total === 69) {
        //         pointsTotals[i] += '<br/>nice';
        //     }
        // }
        var elos = players.map(function (player) {
            var elo = Main.gamestate.playerData[player].elo;
            if (!elo)
                return '--';
            var before = Math.round(elo.before);
            var after = Math.round(elo.after);
            var diff = after - before;
            var sixtyNineBonus = '';
            var sixtyNine = Main.gamestate.playerData[player].pointsDistribution.total === 69;
            var sixtyNineSixtyNine = sixtyNine && Main.gamestate.playerData[player].gold === 69;
            if (sixtyNine) {
                var d = sixtyNineSixtyNine ? 69 : 6.9;
                diff -= d;
                sixtyNineBonus = "<span style=\"color:" + ArtCommon.eloDiffColor(d) + "\">+" + d + "</span>";
            }
            var sign = (diff >= 0) ? '+' : '';
            return after + " <span style=\"color:" + ArtCommon.eloDiffColor(diff) + "\">(" + sign + diff + sixtyNineBonus + ")</span>";
        });
        var endscreen = document.getElementById('endscreen');
        var c = Main.gamestate.citiesEnabled;
        var shield = ArtCommon.shield();
        shield.scale.set(0.25);
        var endScreenFinanceMarker = c ? ArtCommon.endScreenFinanceMarker() : ArtCommon.goldCoin();
        endScreenFinanceMarker.scale.set(0.25);
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
        var blackCard = ArtCommon.cardForEffect(ArtCommon.cardBannerForColor('black'));
        blackCard.scale.set(0.25);
        var x = (-1 - (players.length - 1) / 2) * C.END_SCREEN_POINTS_DX;
        endscreen.appendChild(this.scoreArt(shield, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 0 + "px"));
        endscreen.appendChild(this.scoreArt(endScreenFinanceMarker, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 1 + "px"));
        endscreen.appendChild(this.scoreArt(pyramid, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 2 + "px"));
        endscreen.appendChild(this.scoreArt(blueCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 3 + "px"));
        endscreen.appendChild(this.scoreArt(greenCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 4 + "px"));
        endscreen.appendChild(this.scoreArt(yellowCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 5 + "px"));
        endscreen.appendChild(this.scoreArt(purpleCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 6 + "px"));
        if (c)
            endscreen.appendChild(this.scoreArt(blackCard, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 7 + "px"));
        endscreen.appendChild(this.scoreText('Total', C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * (c ? 8 : 7) + "px"));
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
            if (c)
                endscreen.appendChild(this.scoreText("" + pointsDistributions[i].black, C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * 7 + "px"));
            endscreen.appendChild(this.scoreText("" + pointsTotals[i], C.END_SCREEN_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * (c ? 8 : 7) + "px"));
            endscreen.appendChild(this.scoreText("<span style=\"color:" + ArtCommon.eloDiffColor(6.9) + "\">" + (Main.gamestate.playerData[players[i]].pointsDistribution.total === 69 ? 'nice' : '') + "</span>", C.END_SCREEN_NICE_TEXT_SIZE, "calc(50% + " + x_1 + "px)", C.END_SCREEN_POINTS_Y + C.END_SCREEN_POINTS_DY * (c ? 8.5 : 7.5) + "px"));
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
    Object.defineProperty(GameScene.prototype, "isMenuActive", {
        get: function () { return this.isPaymentMenuActive || this.isChooseGoldToLoseMenuActive || this.isCopyStageMenuActive; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "isPaymentMenuActive", {
        get: function () { return !!this.paymentDialog; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "isChooseGoldToLoseMenuActive", {
        get: function () { return !!this.chooseGoldToLoseDialog; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GameScene.prototype, "isCopyStageMenuActive", {
        get: function () { return !!this.copyStageDialog; },
        enumerable: false,
        configurable: true
    });
    GameScene.prototype.update = function () {
        var e_27, _a;
        try {
            for (var _b = __values(this.hands), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hand = _c.value;
                hand.update();
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_27) throw e_27.error; }
        }
        if (this.isMyTurnToSeeFuture()) {
            this.actionButton.setType('accept_future');
        }
        else if (this.isMyTurnToBuildFromDiscard()) {
            this.actionButton.setType('reject_discard');
        }
        else {
            this.actionButton.setType('undo');
        }
        for (var i = 0; i < this.wonders.length; i++) {
            this.wonders[i].adjustPlaceholdersFor(this.hands[i].playedCard || this.hands[i].selectedCard);
            this.wonders[i].update();
        }
        if (this.discardHand) {
            this.discardHand.update();
        }
        if (this.seeFutureHand) {
            this.seeFutureHand.update();
        }
        if (this.paymentDialog) {
            this.paymentDialog.update();
        }
        if (this.chooseGoldToLoseDialog) {
            this.chooseGoldToLoseDialog.update();
        }
        if (this.copyStageDialog) {
            this.copyStageDialog.update();
        }
    };
    GameScene.prototype.create = function () {
        var gamestate = Main.gamestate;
        var players = Main.gamestate.players;
        var cardsInHand;
        if (this.isMyTurnToSeeFuture()) {
            cardsInHand = gamestate.seeFutureCards;
        }
        else if (this.isMyTurnToBuildFromDiscard()) {
            cardsInHand = gamestate.discardedCards;
        }
        else {
            cardsInHand = gamestate.hand;
        }
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
        this.hands[p] = new Hand(this, this.getHandPosition(p), { type: 'normal', cardIds: cardsInHand, activeWonder: this.wonders[p], validMoves: Main.gamestate.validMoves, future: this.isMyTurnToSeeFuture() });
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
        if (gamestate.state !== 'CHOOSE_GOLD_TO_LOSE' && gamestate.state !== 'SEE_FUTURE') {
            this.hand.reflectMove(gamestate.playerData[Main.player].currentMove);
        }
        this.discardPile = new DiscardPile();
        this.discardPile.x = C.DISCARD_PILE_X;
        this.discardPile.y = C.DISCARD_PILE_Y;
        this.discardPile.addToGame();
        this.discardHand = new Hand(this, this.discardPile.getDiscardLockPoint(), { type: 'discard', count: this.isMyTurnToBuildFromDiscard() ? 0 : gamestate.discardedCardCount, lastCardAge: gamestate.lastDiscardedCardAge });
        this.discardHand.state = { type: 'back', moved: false };
        this.discardHand.setZIndex(C.Z_INDEX_DISCARD_CARDS);
        this.discardHand.snap();
        if (gamestate.state === 'CHOOSE_GOLD_TO_LOSE' && contains(gamestate.chooseGoldToLosePlayers, Main.player)) {
            this.startChooseGoldToLoseDialog();
        }
        this.update();
    };
    GameScene.prototype.destroy = function () {
        var e_28, _a, e_29, _b;
        try {
            for (var _c = __values(this.hands), _d = _c.next(); !_d.done; _d = _c.next()) {
                var hand = _d.value;
                hand.destroy();
            }
        }
        catch (e_28_1) { e_28 = { error: e_28_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_28) throw e_28.error; }
        }
        try {
            for (var _e = __values(this.wonders), _f = _e.next(); !_f.done; _f = _e.next()) {
                var wonder = _f.value;
                wonder.destroy();
            }
        }
        catch (e_29_1) { e_29 = { error: e_29_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_29) throw e_29.error; }
        }
        this.paymentDialog = undefined;
        this.chooseGoldToLoseDialog = undefined;
        while (Main.game.firstChild) {
            Main.game.removeChild(Main.game.firstChild);
        }
    };
    GameScene.prototype.startPaymentDialog = function (card, move) {
        if (this.chooseGoldToLoseDialog)
            return;
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        this.paymentDialog = new PaymentDialog(this, card, move, this.topWonder);
        this.paymentDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.paymentDialog.addToGame();
    };
    GameScene.prototype.startChooseGoldToLoseDialog = function () {
        if (this.chooseGoldToLoseDialog)
            return;
        if (this.paymentDialog) {
            this.paymentDialog.removeFromGame();
        }
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        var gold = Main.gamestate.playerData[Main.player].gold;
        var goldToLose = Main.gamestate.playerData[Main.player].goldToLose;
        this.chooseGoldToLoseDialog = new ChooseGoldToLoseDialog(this, gold, goldToLose, this.topWonder);
        this.chooseGoldToLoseDialog.zIndex = C.Z_INDEX_CGTL_DIALOG;
        this.chooseGoldToLoseDialog.addToGame();
    };
    GameScene.prototype.startCopyStageDialog = function (card, move) {
        if (this.chooseGoldToLoseDialog)
            return;
        if (this.paymentDialog)
            return;
        if (this.copyStageDialog) {
            this.copyStageDialog.removeFromGame();
        }
        this.copyStageDialog = new CopyStageDialog(this, card, move, this.topWonder);
        this.copyStageDialog.zIndex = C.Z_INDEX_PAYMENT_DIALOG;
        this.copyStageDialog.addToGame();
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
    GameScene.prototype.isMyTurnToSeeFuture = function () {
        return Main.gamestate.state === 'SEE_FUTURE' && contains(Main.gamestate.seeFuturePlayers, Main.player);
    };
    return GameScene;
}(Scene));
var GameStateDiffer;
(function (GameStateDiffer) {
    function diffChooseSide(gamestate) {
        var result = {
            scripts: []
        };
        diffCurrentWonderSideChoices(gamestate, result);
        return result;
    }
    GameStateDiffer.diffChooseSide = diffChooseSide;
    function diffNonTurn(gamestate, midturn) {
        var e_30, _a;
        var result = {
            scripts: []
        };
        try {
            for (var _b = __values(Main.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                diffPoints(gamestate, player, result);
                diffGold(gamestate, player, result);
                diffDiplomacyPreConflict(gamestate, player, result);
                diffMilitaryTokensPreConflict(gamestate, player, result);
                diffDebtTokens(gamestate, player, result);
                if (midturn && Main.gamestate.state !== 'CHOOSE_GOLD_TO_LOSE' && Main.gamestate.state !== 'SEE_FUTURE')
                    diffCurrentMove(gamestate, player, result);
            }
        }
        catch (e_30_1) { e_30 = { error: e_30_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_30) throw e_30.error; }
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
            var moveScripts, handPosition_1, targetHandPosition_1, discardHandPosition_1, targetDiscardHandPosition_1, lerpt_1, handPosition_2, targetHandPosition_2, lerpt_2, isEndOfAge, currentHandPositions_1, targetHandPosition_3, discardScripts, _loop_4, i, topWonder, goldLossEffect_1, p, handPosition_3, targetHandPosition_4, lerpt_3, handPosition_4, targetHandPosition_5, discardHandPosition_2, discardTargetPosition_1, lerpt_4, p, l, r, militaryShowings, _loop_5, militaryShowings_1, militaryShowings_1_1, showings, e_31_1, militaryTokenDistributionScripts, pointChangeScripts, hands_1, entryPoint, i_2, startPosition_1, endPosition_1, lerpt_5, i_3, _loop_6, count, currentHandPositions_2, targetHandPositions_1, newHandi_1, lerpt_6;
            var e_31, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (Main.gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
                            moveScripts = gamestate.players.map(function (player) {
                                return function () {
                                    var i, lastMove;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                i = gamestate.players.indexOf(player);
                                                lastMove = gamestate.playerData[player].lastMove;
                                                if (!lastMove)
                                                    return [2 /*return*/];
                                                if (!lastMove.gold_to_lose) return [3 /*break*/, 2];
                                                return [5 /*yield**/, __values(animateGoldMovement(scene.wonders[i].getGoldCoinWorldPosition(), scene.getSourceSinkPosition(), lastMove.gold_to_lose)())];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2: return [2 /*return*/];
                                        }
                                    });
                                };
                            });
                            moveScripts.push(S.call(function () { var _a; return (_a = scene.chooseGoldToLoseDialog) === null || _a === void 0 ? void 0 : _a.removeFromGame(); }));
                        }
                        else if (Main.gamestate.state === 'SEE_FUTURE') {
                            // Nothing
                            moveScripts = [];
                        }
                        else {
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
                                                if (!(player === Main.player)) return [3 /*break*/, 6];
                                                scene.hand.reflectMove(lastMove);
                                                return [5 /*yield**/, __values(S.wait(0.5)())];
                                            case 1:
                                                _c.sent();
                                                selectedCard = scene.hand.selectedCard;
                                                scene.hand.cards.splice(scene.hand.cards.indexOf(selectedCard), 1);
                                                scene.hand.playedCard = selectedCard;
                                                if (!selectedCard) return [3 /*break*/, 5];
                                                if (!(lastMove.action === 'play')) return [3 /*break*/, 4];
                                                if (!(selectedCard.isMilitary() && hasDiplomacyTokenAtStartOfTurn(scene, gamestate, player))) return [3 /*break*/, 3];
                                                selectedCard.setGrayedOut(true);
                                                return [5 /*yield**/, __values(S.wait(1)())];
                                            case 2:
                                                _c.sent();
                                                _c.label = 3;
                                            case 3: return [3 /*break*/, 5];
                                            case 4:
                                                if (lastMove.action === 'throw') {
                                                    scene.discardHand.cards.push(selectedCard);
                                                }
                                                _c.label = 5;
                                            case 5: return [3 /*break*/, 8];
                                            case 6:
                                                // Make sure move-cards are extended
                                                if (Main.gamestate.state !== 'DISCARD_MOVE') {
                                                    hand.state = { type: 'back', moved: true };
                                                }
                                                return [5 /*yield**/, __values(S.wait(0.5)())];
                                            case 7:
                                                _c.sent();
                                                _c.label = 8;
                                            case 8:
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
                                                if (!(lastMove.action === 'play')) return [3 /*break*/, 13];
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
                                            case 9:
                                                _c.sent();
                                                scene.hands[i].playedCard = card_1;
                                                card_1.state = { type: 'effect', justPlayed: false };
                                                card_1.zIndex = C.Z_INDEX_CARD_PLAYED;
                                                playedPoint_1 = scene.wonders[i].getNewCardEffectWorldPosition(card_1);
                                                return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                        card_1.targetPosition.x = lerpTime(card_1.targetPosition.x, playedPoint_1.x, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_1.targetPosition.y = lerpTime(card_1.targetPosition.y, playedPoint_1.y, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_1.scale = lerpTime(card_1.scale, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                    })())];
                                            case 10:
                                                _c.sent();
                                                card_1.snap();
                                                if (!(card_1.isMilitary() && hasDiplomacyTokenAtStartOfTurn(scene, gamestate, player))) return [3 /*break*/, 12];
                                                card_1.setGrayedOut(true);
                                                return [5 /*yield**/, __values(S.wait(1)())];
                                            case 11:
                                                _c.sent();
                                                _c.label = 12;
                                            case 12: return [3 /*break*/, 19];
                                            case 13:
                                                if (!(lastMove.action === 'wonder')) return [3 /*break*/, 16];
                                                card_2 = hand.cards.pop();
                                                hand.state = { type: 'back', moved: false };
                                                card_2.checkMarkVisible = false;
                                                return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, function (t) { card_2.update(); })())];
                                            case 14:
                                                _c.sent();
                                                card_2.state = { type: 'flipped', justPlayed: false };
                                                card_2.zIndex = C.Z_INDEX_CARD_WONDER;
                                                wonderPoint_1 = scene.wonders[i].getCardPositionForStage(lastMove.stage);
                                                return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                        card_2.targetPosition.x = lerpTime(card_2.targetPosition.x, wonderPoint_1.x, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_2.targetPosition.y = lerpTime(card_2.targetPosition.y, wonderPoint_1.y, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_2.scale = lerpTime(card_2.scale, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_2.update();
                                                    })())];
                                            case 15:
                                                _c.sent();
                                                card_2.snap();
                                                return [3 /*break*/, 19];
                                            case 16:
                                                if (!(lastMove.action === 'throw')) return [3 /*break*/, 19];
                                                card_3 = hand.cards.pop();
                                                hand.state = { type: 'back', moved: false };
                                                card_3.checkMarkVisible = false;
                                                return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_REVEAL_TIME, function (t) { card_3.update(); })())];
                                            case 17:
                                                _c.sent();
                                                card_3.state = { type: 'flipped', justPlayed: false };
                                                card_3.zIndex = C.Z_INDEX_CARD_MOVING;
                                                discardPoint_1 = scene.discardPile.getDiscardLockPoint();
                                                return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TURN_PLAY_TIME, function (t) {
                                                        card_3.targetPosition.x = lerpTime(card_3.targetPosition.x, discardPoint_1.x, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_3.targetPosition.y = lerpTime(card_3.targetPosition.y, discardPoint_1.y, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_3.scale = lerpTime(card_3.scale, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        card_3.update();
                                                    })())];
                                            case 18:
                                                _c.sent();
                                                card_3.snap();
                                                scene.discardHand.cards.push(card_3);
                                                _c.label = 19;
                                            case 19: return [2 /*return*/];
                                        }
                                    });
                                };
                            });
                        }
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(moveScripts))())];
                    case 1:
                        _b.sent();
                        if (!(Main.gamestate.state === 'DISCARD_MOVE' && Main.gamestate.discardMoveQueue[0] === Main.player)) return [3 /*break*/, 5];
                        // Return discard if it was in your hand
                        scene.discardHand = scene.hand;
                        scene.hands[Main.gamestate.players.indexOf(Main.player)] = new Hand(scene, scene.getHandOffScreenPoint(), { type: 'normal', cardIds: Main.gamestate.hand, activeWonder: scene.topWonder, validMoves: Main.gamestate.validMoves, future: false });
                        scene.hand.snap();
                        handPosition_1 = scene.hand.getPosition();
                        targetHandPosition_1 = scene.discardHand.getPosition();
                        discardHandPosition_1 = scene.discardHand.getPosition();
                        targetDiscardHandPosition_1 = scene.discardPile.getDiscardLockPoint();
                        scene.discardHand.state = { type: 'back', moved: false };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 2:
                        _b.sent();
                        lerpt_1 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_1 = lerpTime(lerpt_1, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                scene.hand.x = lerpTime(handPosition_1.x, targetHandPosition_1.x, Math.tan(Math.PI / 2 * lerpt_1), Main.delta);
                                scene.hand.y = lerpTime(handPosition_1.y, targetHandPosition_1.y, Math.tan(Math.PI / 2 * lerpt_1), Main.delta);
                                scene.discardHand.x = lerpTime(discardHandPosition_1.x, targetDiscardHandPosition_1.x, Math.tan(Math.PI / 2 * lerpt_1), Main.delta);
                                scene.discardHand.y = lerpTime(discardHandPosition_1.y, targetDiscardHandPosition_1.y, Math.tan(Math.PI / 2 * lerpt_1), Main.delta);
                            })())];
                    case 3:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(Main.gamestate.state === 'SEE_FUTURE' && contains(Main.gamestate.seeFuturePlayers, Main.player))) return [3 /*break*/, 9];
                        // Return see-future cards if they were in your hand
                        scene.seeFutureHand = scene.hand;
                        scene.hands[Main.gamestate.players.indexOf(Main.player)] = new Hand(scene, scene.getHandOffScreenPoint(), { type: 'normal', cardIds: Main.gamestate.hand, activeWonder: scene.topWonder, validMoves: Main.gamestate.validMoves, future: false });
                        scene.hand.snap();
                        handPosition_2 = scene.hand.getPosition();
                        targetHandPosition_2 = scene.seeFutureHand.getPosition();
                        return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                                scene.seeFutureHand.setAlpha(1 - t);
                            })())];
                    case 6:
                        _b.sent();
                        lerpt_2 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_2 = lerpTime(lerpt_2, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                scene.hand.x = lerpTime(handPosition_2.x, targetHandPosition_2.x, Math.tan(Math.PI / 2 * lerpt_2), Main.delta);
                                scene.hand.y = lerpTime(handPosition_2.y, targetHandPosition_2.y, Math.tan(Math.PI / 2 * lerpt_2), Main.delta);
                            })())];
                    case 7:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        isEndOfAge = gamestate.state === 'GAME_COMPLETE' || gamestate.age !== Main.gamestate.age || gamestate.hand.length < 2;
                        if (!isEndOfAge) return [3 /*break*/, 12];
                        currentHandPositions_1 = scene.hands.map(function (hand) { return hand.getPosition(); });
                        targetHandPosition_3 = scene.discardPile.getDiscardLockPoint();
                        scene.hands.forEach(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        discardScripts = [];
                        _loop_4 = function (i) {
                            if (!contains(gamestate.lastCardPlayers, gamestate.players[i])) {
                                discardScripts.push(function () {
                                    var lerpt;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                lerpt = 0;
                                                return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                                        lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                        scene.hands[i].state = { type: 'back', moved: false };
                                                        scene.hands[i].x = lerpTime(currentHandPositions_1[i].x, targetHandPosition_3.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                                        scene.hands[i].y = lerpTime(currentHandPositions_1[i].y, targetHandPosition_3.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                                        scene.hands[i].scale = lerpTime(scene.hands[i].scale, 1, Math.tan(Math.PI / 2 * lerpt), Main.delta);
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
                            _loop_4(i);
                        }
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(discardScripts))())];
                    case 10:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12:
                        if (!(Main.gamestate.state === 'SEE_FUTURE' && Main.gamestate.turn === 1)) return [3 /*break*/, 13];
                        return [3 /*break*/, 53];
                    case 13:
                        if (!(gamestate.state === 'CHOOSE_GOLD_TO_LOSE')) return [3 /*break*/, 18];
                        if (!contains(gamestate.chooseGoldToLosePlayers, Main.player)) return [3 /*break*/, 17];
                        topWonder = scene.topWonder;
                        goldLossEffect_1 = new GoldLossEffect(gamestate.playerData[Main.player].goldToLose);
                        goldLossEffect_1.x = topWonder.x;
                        goldLossEffect_1.y = topWonder.y;
                        goldLossEffect_1.addToGame();
                        return [5 /*yield**/, __values(S.doOverTime(2, function (t) {
                                goldLossEffect_1.alpha = t * t;
                                goldLossEffect_1.amplitude = 50 * (1 - t);
                                goldLossEffect_1.update();
                            })())];
                    case 14:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(1)())];
                    case 15:
                        _b.sent();
                        return [5 /*yield**/, __values(S.doOverTime(0.5, function (t) {
                                goldLossEffect_1.alpha = 1 - t;
                                goldLossEffect_1.update();
                            })())];
                    case 16:
                        _b.sent();
                        goldLossEffect_1.removeFromGame();
                        _b.label = 17;
                    case 17: return [3 /*break*/, 53];
                    case 18:
                        if (!(gamestate.state === 'SEE_FUTURE')) return [3 /*break*/, 22];
                        if (!contains(gamestate.seeFuturePlayers, Main.player)) return [3 /*break*/, 21];
                        p = gamestate.players.indexOf(Main.player);
                        handPosition_3 = scene.hand.getPosition();
                        targetHandPosition_4 = scene.getHandOffScreenPoint();
                        lerpt_3 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_3 = lerpTime(lerpt_3, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                scene.hand.x = lerpTime(handPosition_3.x, targetHandPosition_4.x, Math.tan(Math.PI / 2 * lerpt_3), Main.delta);
                                scene.hand.y = lerpTime(handPosition_3.y, targetHandPosition_4.y, Math.tan(Math.PI / 2 * lerpt_3), Main.delta);
                            })())];
                    case 19:
                        _b.sent();
                        scene.seeFutureHand = new Hand(scene, scene.getHandPosition(p), { type: 'normal', cardIds: gamestate.seeFutureCards, activeWonder: scene.wonders[p], validMoves: [], future: true });
                        scene.seeFutureHand.setAlpha(0);
                        scene.seeFutureHand.snap();
                        return [5 /*yield**/, __values(S.doOverTime(1, function (t) {
                                scene.seeFutureHand.setAlpha(t);
                            })())];
                    case 20:
                        _b.sent();
                        _b.label = 21;
                    case 21: return [3 /*break*/, 53];
                    case 22:
                        if (!(gamestate.state === 'LAST_CARD_MOVE')) return [3 /*break*/, 23];
                        return [3 /*break*/, 53];
                    case 23:
                        if (!(gamestate.state === 'DISCARD_MOVE')) return [3 /*break*/, 28];
                        if (!(gamestate.discardMoveQueue[0] === Main.player)) return [3 /*break*/, 27];
                        // Replace hand with discard pile
                        scene.discardHand.setAllCardState({ type: 'in_hand_moving' });
                        handPosition_4 = scene.hand.getPosition();
                        targetHandPosition_5 = scene.getHandOffScreenPoint();
                        discardHandPosition_2 = scene.discardHand.getPosition();
                        discardTargetPosition_1 = scene.getHandPosition(gamestate.players.indexOf(Main.player));
                        lerpt_4 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_4 = lerpTime(lerpt_4, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                scene.hand.x = lerpTime(handPosition_4.x, targetHandPosition_5.x, Math.tan(Math.PI / 2 * lerpt_4), Main.delta);
                                scene.hand.y = lerpTime(handPosition_4.y, targetHandPosition_5.y, Math.tan(Math.PI / 2 * lerpt_4), Main.delta);
                                scene.discardHand.x = lerpTime(discardHandPosition_2.x, discardTargetPosition_1.x, Math.tan(Math.PI / 2 * lerpt_4), Main.delta);
                                scene.discardHand.y = lerpTime(discardHandPosition_2.y, discardTargetPosition_1.y, Math.tan(Math.PI / 2 * lerpt_4), Main.delta);
                            })())];
                    case 24:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 25:
                        _b.sent();
                        scene.discardHand.destroy();
                        scene.discardHand.createWithData({ type: 'normal', cardIds: gamestate.discardedCards, activeWonder: scene.topWonder, validMoves: gamestate.validMoves, future: false });
                        scene.discardHand.snap();
                        scene.discardHand.state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 26:
                        _b.sent();
                        scene.discardHand.snap();
                        _b.label = 27;
                    case 27: return [3 /*break*/, 53];
                    case 28:
                        if (!isEndOfAge) return [3 /*break*/, 48];
                        p = gamestate.players.indexOf(Main.player);
                        l = mod(p - 1, gamestate.players.length);
                        r = mod(p + 1, gamestate.players.length);
                        militaryShowings = getMilitaryShowings(gamestate);
                        _loop_5 = function (showings) {
                            var showingsAnimations;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        showingsAnimations = range(0, showings.length - 1).map(function (i) { return showings[i] ? S.chain(S.call(function () {
                                            var showing = showings[i];
                                            scene.militaryOverlays[i].setType(showing.type);
                                            if (showing.type !== 'diplomacy') {
                                                scene.militaryOverlays[i].setShields(showing.shields);
                                            }
                                        }), S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                            scene.militaryOverlays[i].alpha = t;
                                        }), S.wait(C.ANIMATION_MILITARY_WAIT_TIME), S.doOverTime(C.ANIMATION_MILITARY_FADE_TIME, function (t) {
                                            scene.militaryOverlays[i].alpha = 1 - t;
                                        })) : undefined; }).filter(function (s) { return s; });
                                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(showingsAnimations))())];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _b.label = 29;
                    case 29:
                        _b.trys.push([29, 34, 35, 36]);
                        militaryShowings_1 = __values(militaryShowings), militaryShowings_1_1 = militaryShowings_1.next();
                        _b.label = 30;
                    case 30:
                        if (!!militaryShowings_1_1.done) return [3 /*break*/, 33];
                        showings = militaryShowings_1_1.value;
                        return [5 /*yield**/, _loop_5(showings)];
                    case 31:
                        _b.sent();
                        _b.label = 32;
                    case 32:
                        militaryShowings_1_1 = militaryShowings_1.next();
                        return [3 /*break*/, 30];
                    case 33: return [3 /*break*/, 36];
                    case 34:
                        e_31_1 = _b.sent();
                        e_31 = { error: e_31_1 };
                        return [3 /*break*/, 36];
                    case 35:
                        try {
                            if (militaryShowings_1_1 && !militaryShowings_1_1.done && (_a = militaryShowings_1.return)) _a.call(militaryShowings_1);
                        }
                        finally { if (e_31) throw e_31.error; }
                        return [7 /*endfinally*/];
                    case 36:
                        militaryTokenDistributionScripts = gamestate.players.map(function (player) {
                            var pi = gamestate.players.indexOf(player);
                            var newTokenIndices = [];
                            for (var i = scene.wonders[pi].militaryTokenRack.getTokenCount(); i < gamestate.playerData[player].militaryTokens.length; i++) {
                                newTokenIndices.push(i);
                            }
                            return S.chain.apply(S, __spread(newTokenIndices.map(function (i) { return animateGiveMilitaryToken(scene, gamestate, player, gamestate.playerData[player].militaryTokens[i]); })));
                        });
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(militaryTokenDistributionScripts))())];
                    case 37:
                        _b.sent();
                        pointChangeScripts = gamestate.players.map(function (player) { return animatePointsChange(scene, player, gamestate.playerData[player].pointsDistribution.total); });
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(pointChangeScripts))())];
                    case 38:
                        _b.sent();
                        // Remove diplomacies if applicable
                        return [5 /*yield**/, __values(S.simul.apply(S, __spread(gamestate.diplomacyPlayers.map(function (player) { return function () {
                                var tokens, wonder, token, tokenPos, targetPosition, lerpt;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            tokens = gamestate.playerData[player].diplomacyTokens;
                                            wonder = scene.wonders[gamestate.players.indexOf(player)];
                                            wonder.adjustToDiplomacy(tokens > 0);
                                            token = new DiplomacyToken();
                                            tokenPos = wonder.getDiplomacyTokenPosition(wonder.diplomacyTokenRack.getTokenCount() - 1);
                                            token.x = tokenPos.x;
                                            token.y = tokenPos.y;
                                            token.addToGame();
                                            wonder.diplomacyTokenRack.removeToken(wonder.diplomacyTokenRack.getTokenCount() - 1);
                                            targetPosition = scene.getSourceSinkPosition();
                                            lerpt = 0;
                                            return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                                    lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                    token.x = lerpTime(tokenPos.x, targetPosition.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                                    token.y = lerpTime(tokenPos.y, targetPosition.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                                    token.scale = lerpTime(1, 0, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                                })())];
                                        case 1:
                                            _a.sent();
                                            token.removeFromGame();
                                            return [2 /*return*/];
                                    }
                                });
                            }; })))())];
                    case 39:
                        // Remove diplomacies if applicable
                        _b.sent();
                        if (!(gamestate.state !== 'GAME_COMPLETE')) return [3 /*break*/, 47];
                        hands_1 = gamestate.players.map(function (player) { return undefined; });
                        entryPoint = scene.getHandOffScreenPoint();
                        hands_1[p] = new Hand(scene, entryPoint, { type: 'normal', cardIds: gamestate.hand, activeWonder: scene.topWonder, validMoves: gamestate.validMoves, future: false });
                        hands_1[p].state = { type: 'back', moved: false };
                        hands_1[p].snap();
                        for (i_2 = 0; i_2 < gamestate.players.length; i_2++) {
                            if (i_2 === p)
                                continue;
                            hands_1[i_2] = new Hand(scene, entryPoint, { type: 'back', age: gamestate.age, player: gamestate.players[i_2], flankDirection: 1 });
                            hands_1[i_2].state = { type: 'back', moved: false };
                            hands_1[i_2].snap();
                        }
                        hands_1.map(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        startPosition_1 = hands_1[0].getPosition();
                        endPosition_1 = scene.getHandPosition(p);
                        lerpt_5 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                var e_32, _a;
                                lerpt_5 = lerpTime(lerpt_5, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                try {
                                    for (var hands_2 = __values(hands_1), hands_2_1 = hands_2.next(); !hands_2_1.done; hands_2_1 = hands_2.next()) {
                                        var hand = hands_2_1.value;
                                        hand.x = lerpTime(startPosition_1.x, endPosition_1.x, Math.tan(Math.PI / 2 * lerpt_5), Main.delta);
                                        hand.y = lerpTime(startPosition_1.y, endPosition_1.y, Math.tan(Math.PI / 2 * lerpt_5), Main.delta);
                                        hand.update();
                                    }
                                }
                                catch (e_32_1) { e_32 = { error: e_32_1 }; }
                                finally {
                                    try {
                                        if (hands_2_1 && !hands_2_1.done && (_a = hands_2.return)) _a.call(hands_2);
                                    }
                                    finally { if (e_32) throw e_32.error; }
                                }
                            })())];
                    case 40:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 41:
                        _b.sent();
                        i_3 = l;
                        _loop_6 = function (count) {
                            var startPosition_2, endPosition_2, lerpt_7;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        startPosition_2 = hands_1[i_3].getPosition();
                                        endPosition_2 = scene.getHandPosition(i_3);
                                        lerpt_7 = 0;
                                        return [5 /*yield**/, __values(S.doOverTime(0.2, function (t) {
                                                lerpt_7 = lerpTime(lerpt_7, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                                hands_1[i_3].x = lerpTime(startPosition_2.x, endPosition_2.x, Math.tan(Math.PI / 2 * lerpt_7), Main.delta);
                                                hands_1[i_3].y = lerpTime(startPosition_2.y, endPosition_2.y, Math.tan(Math.PI / 2 * lerpt_7), Main.delta);
                                                hands_1[i_3].scale = lerpTime(hands_1[i_3].scale, C.HAND_FLANK_SCALE, Math.tan(Math.PI / 2 * lerpt_7), Main.delta);
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
                        _b.label = 42;
                    case 42:
                        if (!(count < gamestate.players.length - 1)) return [3 /*break*/, 45];
                        return [5 /*yield**/, _loop_6(count)];
                    case 43:
                        _b.sent();
                        _b.label = 44;
                    case 44:
                        count++;
                        return [3 /*break*/, 42];
                    case 45:
                        scene.hands[p] = hands_1[p];
                        hands_1[p].state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.4)())];
                    case 46:
                        _b.sent();
                        hands_1[p].snap();
                        _b.label = 47;
                    case 47: return [3 /*break*/, 53];
                    case 48:
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
                    case 49:
                        _b.sent();
                        scene.hands.forEach(function (hand) { return hand.setZIndex(C.Z_INDEX_CARD_MOVING); });
                        lerpt_6 = 0;
                        return [5 /*yield**/, __values(S.doOverTime(0.3, function (t) {
                                lerpt_6 = lerpTime(lerpt_6, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                for (var i = 0; i < scene.hands.length; i++) {
                                    scene.hands[i].x = lerpTime(currentHandPositions_2[i].x, targetHandPositions_1[i].x, Math.tan(Math.PI / 2 * lerpt_6), Main.delta);
                                    scene.hands[i].y = lerpTime(currentHandPositions_2[i].y, targetHandPositions_1[i].y, Math.tan(Math.PI / 2 * lerpt_6), Main.delta);
                                    if (i === newHandi_1) {
                                        scene.hands[i].scale = lerpTime(scene.hands[i].scale, 1, Math.tan(Math.PI / 2 * lerpt_6), Main.delta);
                                    }
                                    else {
                                        scene.hands[i].scale = lerpTime(scene.hands[i].scale, C.HAND_FLANK_SCALE, Math.tan(Math.PI / 2 * lerpt_6), Main.delta);
                                    }
                                }
                            })())];
                    case 50:
                        _b.sent();
                        return [5 /*yield**/, __values(S.wait(0.2)())];
                    case 51:
                        _b.sent();
                        scene.hands[newHandi_1].destroy();
                        scene.hands[newHandi_1].createWithData({ type: 'normal', cardIds: gamestate.hand, activeWonder: scene.hand.activeWonder, validMoves: gamestate.validMoves, future: false });
                        scene.hands[newHandi_1].snap();
                        scene.hands[newHandi_1].state = { type: 'normal' };
                        return [5 /*yield**/, __values(S.wait(0.5)())];
                    case 52:
                        _b.sent();
                        scene.hands[newHandi_1].snap();
                        _b.label = 53;
                    case 53: return [2 /*return*/];
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
        if (gamestate.age > Main.gamestate.age || gamestate.state === 'GAME_COMPLETE') {
            newPoints -= sum(gamestate.playerData[player].gainedMilitaryTokensFromConflict, function (token) { return token; });
        }
        if (newPoints === oldPoints)
            return;
        result.scripts.push(animatePointsChange(scene, player, newPoints));
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
                    if (!scene.isMenuActive) {
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
    function diffCurrentWonderSideChoices(gamestate, result) {
        var e_33, _a;
        if (!(Main.scene instanceof ChooseWonderScene))
            return;
        var scene = Main.scene;
        var _loop_7 = function (player) {
            var currentMove = gamestate.playerData[player].currentMove;
            if (player === Main.player) {
                if (currentMove && !Main.isMoveImmune) {
                    result.scripts.push(function () {
                        return __generator(this, function (_a) {
                            scene.selectSide(currentMove.side);
                            return [2 /*return*/];
                        });
                    });
                }
            }
            else {
                result.scripts.push(function () {
                    return __generator(this, function (_a) {
                        scene.setCurrentlyMoved(player, !!currentMove);
                        return [2 /*return*/];
                    });
                });
            }
        };
        try {
            for (var _b = __values(gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                _loop_7(player);
            }
        }
        catch (e_33_1) { e_33 = { error: e_33_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_33) throw e_33.error; }
        }
    }
    function diffDiplomacyPreConflict(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var gainedTokens = gainedDiplomacyTokens(gamestate, player);
        if (gainedTokens <= 0)
            return;
        // Distribute tokens
        var pi = gamestate.players.indexOf(player);
        var newTokenIndices = [];
        for (var i = Main.gamestate.playerData[player].diplomacyTokens; i < Main.gamestate.playerData[player].diplomacyTokens + gainedTokens; i++) {
            newTokenIndices.push(i);
        }
        result.scripts.push(S.chain(S.call(function () {
            scene.wonders[gamestate.players.indexOf(player)].adjustToDiplomacy(hasDiplomacyTokenAtStartOfTurn(scene, gamestate, player));
        }), S.wait(0.5), S.simul.apply(S, __spread(newTokenIndices.map(function (i) { return function () {
            var sourceSink, token, targetPosition, lerpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sourceSink = scene.getSourceSinkPosition();
                        token = new DiplomacyToken();
                        token.x = sourceSink.x;
                        token.y = sourceSink.y;
                        token.addToGame();
                        targetPosition = scene.wonders[pi].getDiplomacyTokenPosition(i);
                        lerpt = 0;
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                            })())];
                    case 1:
                        _a.sent();
                        scene.wonders[gamestate.players.indexOf(player)].addDiplomacyToken();
                        token.removeFromGame();
                        return [2 /*return*/];
                }
            });
        }; }))), S.wait(0.5)));
    }
    function diffMilitaryTokensPreConflict(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var oldTokens = Main.gamestate.playerData[player].militaryTokens;
        var newTokens = gamestate.playerData[player].militaryTokens;
        if (gamestate.age > Main.gamestate.age || gamestate.state === 'GAME_COMPLETE') {
            newTokens = newTokens.slice(0, newTokens.length - gamestate.playerData[player].gainedMilitaryTokensFromConflict.length);
        }
        if (equalsArray(oldTokens, newTokens))
            return;
        // Diff the lists
        var removedIndices = [];
        var addedIndices = [];
        var i = 0, j = 0;
        while (i < oldTokens.length && j < newTokens.length) {
            if (oldTokens[i] === newTokens[j]) {
                i++;
                j++;
                continue;
            }
            removedIndices.push(i);
            i++;
        }
        if (j >= newTokens.length) {
            removedIndices.push.apply(removedIndices, __spread(range(i, oldTokens.length - 1)));
        }
        if (i >= oldTokens.length) {
            addedIndices.push.apply(addedIndices, __spread(range(j, newTokens.length - 1)));
        }
        result.scripts.push(S.chain.apply(S, __spread(removedIndices.sort(function (a, b) { return b - a; }).map(function (i) { return animateRemoveMilitaryToken(scene, gamestate, player, i, oldTokens[i]); }), addedIndices.map(function (j) { return animateGiveMilitaryToken(scene, gamestate, player, newTokens[j]); }))));
    }
    function diffDebtTokens(gamestate, player, result) {
        if (!(Main.scene instanceof GameScene))
            return;
        var scene = Main.scene;
        var oldTokens = Main.gamestate.playerData[player].debtTokens;
        var newTokens = gamestate.playerData[player].debtTokens;
        if (oldTokens >= newTokens)
            return;
        result.scripts.push(S.chain.apply(S, __spread(range(1, newTokens - oldTokens).map(function (j) { return animateGiveDebtToken(scene, gamestate, player); }))));
    }
    function animatePointsChange(scene, player, newPoints) {
        return function () {
            var pointsText, oldPoints;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pointsText = scene.wonders[Main.gamestate.players.indexOf(player)].pointsText;
                        oldPoints = parseInt(pointsText.textContent);
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
        };
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
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                goldCoin.x = lerpTime(fromPos.x, toPos.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                goldCoin.y = lerpTime(fromPos.y, toPos.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
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
    function animateGiveMilitaryToken(scene, gamestate, player, value) {
        return function () {
            var wonder, sourceSink, token, targetPosition, lerpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wonder = scene.wonders[gamestate.players.indexOf(player)];
                        sourceSink = scene.getSourceSinkPosition();
                        token = new MilitaryToken(value);
                        token.x = sourceSink.x;
                        token.y = sourceSink.y;
                        token.addToGame();
                        targetPosition = wonder.getMilitaryTokenWorldPosition(wonder.militaryTokenRack.getTokenCount());
                        lerpt = 0;
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                            })())];
                    case 1:
                        _a.sent();
                        wonder.addMilitaryToken(value);
                        token.removeFromGame();
                        return [2 /*return*/];
                }
            });
        };
    }
    function animateRemoveMilitaryToken(scene, gamestate, player, i, value) {
        return function () {
            var wonder, tokenPos, token, targetPosition, lerpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wonder = scene.wonders[gamestate.players.indexOf(player)];
                        tokenPos = wonder.getMilitaryTokenWorldPosition(i);
                        token = new MilitaryToken(value);
                        token.x = tokenPos.x;
                        token.y = tokenPos.y;
                        token.addToGame();
                        wonder.militaryTokenRack.removeToken(i);
                        targetPosition = scene.getSourceSinkPosition();
                        lerpt = 0;
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                token.x = lerpTime(tokenPos.x, targetPosition.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                token.y = lerpTime(tokenPos.y, targetPosition.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                token.scale = lerpTime(1, 0, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                            })())];
                    case 1:
                        _a.sent();
                        token.removeFromGame();
                        return [2 /*return*/];
                }
            });
        };
    }
    function animateGiveDebtToken(scene, gamestate, player) {
        return function () {
            var wonder, sourceSink, token, targetPosition, lerpt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wonder = scene.wonders[gamestate.players.indexOf(player)];
                        sourceSink = scene.getSourceSinkPosition();
                        token = new DebtToken();
                        token.x = sourceSink.x;
                        token.y = sourceSink.y;
                        token.addToGame();
                        targetPosition = wonder.getDebtTokenWorldPosition(wonder.debtTokenRack.getTokenCount());
                        lerpt = 0;
                        return [5 /*yield**/, __values(S.doOverTime(C.ANIMATION_TOKEN_DISTRIBUTE_TIME, function (t) {
                                lerpt = lerpTime(lerpt, 1, Math.tan(Math.PI / 2 * Math.pow(t, 2)), Main.delta);
                                token.x = lerpTime(sourceSink.x, targetPosition.x, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                                token.y = lerpTime(sourceSink.y, targetPosition.y, Math.tan(Math.PI / 2 * lerpt), Main.delta);
                            })())];
                    case 1:
                        _a.sent();
                        wonder.addDebtToken();
                        token.removeFromGame();
                        return [2 /*return*/];
                }
            });
        };
    }
    function getMilitaryShowings(gamestate) {
        if (gamestate.fightingPlayers.length < 2) {
            return [gamestate.players.map(function (player) { return contains(gamestate.diplomacyPlayers, player) ? { type: 'diplomacy' } : { type: 'tie', shields: gamestate.playerData[player].totalShields - gamestate.playerData[player].shieldsFromGainedDefeatTokens }; })];
        }
        if (contains(gamestate.diplomacyPlayers, Main.player)) {
            var showings = filledMilitaryShowings(gamestate, true, true);
            showings[gamestate.players.indexOf(Main.player)] = { type: 'diplomacy' };
            return [showings];
        }
        else if (gamestate.fightingPlayers.length === 2) {
            var showings = filledMilitaryShowings(gamestate, true, false);
            return [showings];
        }
        else {
            var showings1 = filledMilitaryShowings(gamestate, true, false);
            var showings2 = filledMilitaryShowings(gamestate, false, true);
            return [showings1, showings2];
        }
    }
    function filledMilitaryShowings(gamestate, left, right) {
        var showings = gamestate.players.map(function (player) { return undefined; });
        var p = gamestate.players.indexOf(Main.player);
        var l = p;
        if (left) {
            l = mod(p - 1, gamestate.players.length);
            while (l !== p && contains(gamestate.diplomacyPlayers, gamestate.players[l])) {
                showings[l] = { type: 'diplomacy' };
                l = mod(l - 1, gamestate.players.length);
            }
        }
        var r = p;
        if (right) {
            r = mod(p + 1, gamestate.players.length);
            while (r !== p && contains(gamestate.diplomacyPlayers, gamestate.players[r])) {
                showings[r] = { type: 'diplomacy' };
                r = mod(r + 1, gamestate.players.length);
            }
        }
        var lplayer = gamestate.players[l];
        var rplayer = gamestate.players[r];
        var lshields = gamestate.playerData[lplayer].totalShields - gamestate.playerData[lplayer].shieldsFromGainedDefeatTokens;
        var rshields = gamestate.playerData[rplayer].totalShields - gamestate.playerData[rplayer].shieldsFromGainedDefeatTokens;
        if (lshields > rshields) {
            showings[l] = { type: 'victory', shields: lshields };
            showings[r] = { type: 'defeat', shields: rshields };
        }
        else if (lshields < rshields) {
            showings[l] = { type: 'defeat', shields: lshields };
            showings[r] = { type: 'victory', shields: rshields };
        }
        else {
            showings[l] = { type: 'tie', shields: lshields };
            showings[r] = { type: 'tie', shields: rshields };
        }
        return showings;
    }
    function hasDiplomacyTokenAtStartOfTurn(scene, gamestate, player) {
        return gamestate.playerData[player].diplomacyTokens > 0
            || gainedDiplomacyTokens(gamestate, player) > 0
            || scene.wonders[gamestate.players.indexOf(player)].diplomacyTokenRack.getTokenCount() > 0;
    }
    function gainedDiplomacyTokens(gamestate, player) {
        var diff = gamestate.playerData[player].diplomacyTokens - Main.gamestate.playerData[player].diplomacyTokens;
        if ((gamestate.age > Main.gamestate.age || gamestate.state === 'GAME_COMPLETE') && contains(gamestate.diplomacyPlayers, player)) {
            diff++;
        }
        return diff;
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
var GoldLossEffect = /** @class */ (function (_super) {
    __extends(GoldLossEffect, _super);
    function GoldLossEffect(goldToLose) {
        var _this = _super.call(this) || this;
        _this.amplitude = 0;
        _this.brokenGold = _this.div.appendChild(_this.draw(goldToLose));
        _this.zIndex = C.Z_INDEX_GOLD_LOSS_EFFECT;
        return _this;
    }
    GoldLossEffect.prototype.update = function () {
        this.brokenGold.style.left = randInt(-this.amplitude, this.amplitude) + "px";
        this.brokenGold.style.top = randInt(-this.amplitude, this.amplitude) + "px";
    };
    GoldLossEffect.prototype.draw = function (goldToLose) {
        var brokenGold = ArtCommon.domElementForArt(ArtCommon.brokenGold(goldToLose), 1.5);
        brokenGold.style.position = 'absolute';
        return brokenGold;
    };
    return GoldLossEffect;
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
            var e_34, _a;
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.state.type.startsWith('locked')) {
                        return card;
                    }
                }
            }
            catch (e_34_1) { e_34 = { error: e_34_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_34) throw e_34.error; }
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
                this.cards[i].checkMarkVisible = (Main.gamestate.state !== 'CHOOSE_GOLD_TO_LOSE' && Main.gamestate.state !== 'SEE_FUTURE' && this.state.moved && i === this.cards.length - 1);
            }
            this.cards[i].update();
        }
        if (this.playedCard && !contains(this.cards, this.playedCard)) {
            this.playedCard.update();
        }
    };
    Hand.prototype.createWithData = function (handData) {
        var e_35, _a;
        this.cards = [];
        this.cardIds = handData.type === 'normal'
            ? handData.cardIds
            : filledArray(handData.type === 'back' ? Main.gamestate.playerData[handData.player].handCount : handData.count, -1);
        this.activeWonder = handData.type === 'normal' ? handData.activeWonder : undefined;
        this.flankDirection = handData.type === 'back' ? handData.flankDirection : 1;
        for (var i = 0; i < this.cardIds.length; i++) {
            var handPosition = this.getNormalHandPosition(i);
            var card = handData.type === 'normal'
                ? new Card(this.scene, this.cardIds[i], i, undefined, handPosition, this.activeWonder, handData.validMoves)
                : Card.flippedCardForAge(this.scene, handData.type === 'back' ? handData.age : handData.lastCardAge, false);
            if (handData.type === 'normal' && handData.future) {
                card.destroy();
                card.create(card.apiCardId, false);
            }
            card.x = handPosition.x;
            card.y = handPosition.y;
            card.addToGame();
            this.cards.push(card);
            card.state = { type: 'in_hand', visualState: 'full' };
        }
        if (this.cards.length > 0 && handData.type === 'discard') {
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    card.convertToDiscarded();
                }
            }
            catch (e_35_1) { e_35 = { error: e_35_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_35) throw e_35.error; }
            }
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
        var e_36, _a, e_37, _b;
        if (!move || move.action === 'reject') {
            try {
                for (var _c = __values(this.cards), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var card = _d.value;
                    card.deselect();
                }
            }
            catch (e_36_1) { e_36 = { error: e_36_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_36) throw e_36.error; }
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
        catch (e_37_1) { e_37 = { error: e_37_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_37) throw e_37.error; }
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
        var e_38, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.zIndex = zIndex;
            }
        }
        catch (e_38_1) { e_38 = { error: e_38_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_38) throw e_38.error; }
        }
    };
    Hand.prototype.setAlpha = function (alpha) {
        var e_39, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.alpha = alpha;
            }
        }
        catch (e_39_1) { e_39 = { error: e_39_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_39) throw e_39.error; }
        }
    };
    Hand.prototype.setAllCardState = function (state) {
        var e_40, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.state = state;
            }
        }
        catch (e_40_1) { e_40 = { error: e_40_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_40) throw e_40.error; }
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
            var e_41, _a;
            try {
                for (var _b = __values(this.resources), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var resource = _c.value;
                    if (!resource.loaded)
                        return false;
                }
            }
            catch (e_41_1) { e_41 = { error: e_41_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_41) throw e_41.error; }
            }
            return this.resources.length > 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Loader.prototype, "loadPercentage", {
        get: function () {
            var e_42, _a;
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
            catch (e_42_1) { e_42 = { error: e_42_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_42) throw e_42.error; }
            }
            return Math.round(loaded / this.resources.length * 100);
        },
        enumerable: false,
        configurable: true
    });
    Loader.prototype.update = function () {
        var e_43, _a;
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
        catch (e_43_1) { e_43 = { error: e_43_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_43) throw e_43.error; }
        }
        if (loaded) {
            this.onFinishedLoading();
            this.complete = true;
        }
    };
    Loader.prototype.loadGamestateResources = function () {
        var e_44, _a;
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
                    for (var wonderChoice_2 = (e_44 = void 0, __values(wonderChoice)), wonderChoice_2_1 = wonderChoice_2.next(); !wonderChoice_2_1.done; wonderChoice_2_1 = wonderChoice_2.next()) {
                        var wonder = wonderChoice_2_1.value;
                        this.loadWonder(wonder);
                    }
                }
                catch (e_44_1) { e_44 = { error: e_44_1 }; }
                finally {
                    try {
                        if (wonderChoice_2_1 && !wonderChoice_2_1.done && (_a = wonderChoice_2.return)) _a.call(wonderChoice_2);
                    }
                    finally { if (e_44) throw e_44.error; }
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
        this.loadCardList(Main.gamestate);
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
                costContainer.position.set(C.CARD_COST_X, C.CARD_COST_Y);
                costContainer.scale.set(C.CARD_COST_SCALE);
                if (costContainer.height > C.CARD_COST_MAX_HEIGHT) {
                    costContainer.scale.set(C.CARD_COST_SCALE * C.CARD_COST_MAX_HEIGHT / costContainer.height);
                }
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
            if (effectContainer.width > C.CARD_EFFECT_MAX_WIDTH) {
                effectContainer.scale.set(C.CARD_EFFECT_SCALE * C.CARD_EFFECT_MAX_WIDTH / effectContainer.width);
            }
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
            var _a;
            var wonderBoard = new PIXI.Container();
            var wonderOutlineColorNumber = typeof (wonder.outline_color) === 'string' ? 0xFFFFFF : wonder.outline_color;
            var isRainbow = wonder.outline_color === 'rainbow';
            // Board
            var boardBase = Shapes.filledRoundedRect(0, 0, C.WONDER_BOARD_WIDTH, C.WONDER_BOARD_HEIGHT, C.WONDER_BOARD_CORNER_RADIUS, wonderOutlineColorNumber);
            if (isRainbow)
                boardBase.filters = [new RainbowFilter()];
            wonderBoard.addChild(boardBase);
            var boardBg = Shapes.filledRoundedRect(C.WONDER_BOARD_BORDER, C.WONDER_BOARD_BORDER, C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - 2 * C.WONDER_BOARD_BORDER, C.WONDER_BOARD_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
            wonderBoard.addChild(boardBg);
            var boardBgMask = boardBg.clone();
            wonderBoard.addChild(boardBgMask);
            // Starting effects
            var startingEffectContainer = new PIXI.Container();
            startingEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.starting_effects, 'dark', 5, 5, 24));
            startingEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.starting_effects, 24));
            startingEffectContainer.scale.set(C.WONDER_STARTING_EFFECTS_SCALE);
            var startingEffectsBounds = startingEffectContainer.getBounds();
            startingEffectContainer.position.set(C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.left - startingEffectContainer.x), C.WONDER_BOARD_BORDER + C.WONDER_STARTING_EFFECTS_PADDING - (startingEffectsBounds.top - startingEffectContainer.y));
            startingEffectsBounds = startingEffectContainer.getBounds();
            var startingEffectsPaddedBounds = new PIXI.Rectangle(startingEffectsBounds.left - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.top - C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.width + 2 * C.WONDER_STARTING_EFFECTS_PADDING, startingEffectsBounds.height + 2 * C.WONDER_STARTING_EFFECTS_PADDING);
            var startingEffectBanner = Shapes.filledRect(startingEffectsPaddedBounds.x, startingEffectsPaddedBounds.y, startingEffectsPaddedBounds.width, startingEffectsPaddedBounds.height, typeof (wonder.starting_effect_color) === 'number' ? wonder.starting_effect_color : ArtCommon.cardBannerForColor(wonder.starting_effect_color));
            startingEffectBanner.mask = boardBgMask;
            wonderBoard.addChild(startingEffectBanner);
            wonderBoard.addChild(startingEffectContainer);
            // Wonder stages    
            var stagesMiddle = wonder.stages.length === 2 ? C.WONDER_STAGE_MIDDLE_2 : C.WONDER_STAGE_MIDDLE_134;
            var stageDX = wonder.stages.length === 4 ? C.WONDER_STAGE_DX_4 : C.WONDER_STAGE_DX_123;
            var stageXs = [];
            for (var i = 0; i < wonder.stages.length; i++) {
                stageXs.push(stagesMiddle + stageDX * (i - (wonder.stages.length - 1) / 2));
                var stageBase = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH / 2, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT, C.WONDER_STAGE_WIDTH, C.WONDER_STAGE_HEIGHT * 2, C.WONDER_STAGE_CORNER_RADIUS, wonderOutlineColorNumber);
                stageBase.mask = boardBgMask;
                stageBase.x = stageXs[i];
                if (isRainbow)
                    stageBase.filters = [new RainbowFilter()];
                wonderBoard.addChild(stageBase);
                var stageBg = Shapes.filledRoundedRect(-C.WONDER_STAGE_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT + C.WONDER_BOARD_BORDER, C.WONDER_STAGE_WIDTH - 2 * C.WONDER_BOARD_BORDER, C.WONDER_STAGE_HEIGHT * 2 - 2 * C.WONDER_BOARD_BORDER, C.WONDER_STAGE_CORNER_RADIUS - C.WONDER_BOARD_BORDER, ArtCommon.wonderBg);
                stageBg.mask = boardBgMask;
                stageBg.x = stageXs[i];
                wonderBoard.addChild(stageBg);
                var stageEffectContainer = new PIXI.Container();
                if (wonder.stages[i].copy_stage) {
                    stageEffectContainer.addChild(ArtCommon.getShadowForStageCopy(wonder.stages[i].copy_stage.stage, wonder.stages[i].copy_stage.dir, 'light'));
                    stageEffectContainer.addChild(ArtCommon.getArtForStageCopy(wonder.stages[i].copy_stage.stage, wonder.stages[i].copy_stage.dir));
                }
                else {
                    stageEffectContainer.addChild(ArtCommon.getShadowForEffects(wonder.stages[i].effects, 'light'));
                    stageEffectContainer.addChild(ArtCommon.getArtForEffects(wonder.stages[i].effects));
                }
                stageEffectContainer.scale.set(C.WONDER_STAGE_EFFECT_SCALE);
                stageEffectContainer.position.set(stageXs[i], C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_HEIGHT / 2);
                wonderBoard.addChild(stageEffectContainer);
                var stageCost = ((_a = wonder.stages[i]) === null || _a === void 0 ? void 0 : _a.cost) ? ArtCommon.getArtForStageCost(wonder.stages[i].cost) : undefined;
                if (stageCost) {
                    stageCost.scale.set(C.WONDER_STAGE_COST_SCALE);
                    stageCost.position.set(stageXs[i] - C.WONDER_STAGE_WIDTH / 2 + C.WONDER_STAGE_COST_OFFSET_X, C.WONDER_BOARD_HEIGHT - C.WONDER_STAGE_COST_OFFSET_Y);
                    var costBanner = Shapes.filledRoundedRect(-stageCost.width / 2 - C.WONDER_STAGE_COST_PADDING, -C.WONDER_STAGE_COST_PADDING, stageCost.width + 2 * C.WONDER_STAGE_COST_PADDING, stageCost.height + 2 * C.WONDER_STAGE_COST_PADDING, C.WONDER_STAGE_COST_PADDING, wonderOutlineColorNumber);
                    costBanner.position.set(stageCost.x, stageCost.y);
                    if (isRainbow)
                        costBanner.filters = [new RainbowFilter()];
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
    Loader.prototype.loadCardList = function (gamestate) {
        var resource = this.addNewResource();
        resource.load = function () {
            var e_45, _a;
            var _b, _c;
            var cardList = new PIXI.Container();
            var maxY = 0;
            for (var age = 1; age <= 3; age++) {
                var x = age * C.CARD_LIST_CARD_DX;
                var y = 0;
                try {
                    for (var _d = (e_45 = void 0, __values(gamestate.deck[age])), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var cardInfo = _e.value;
                        var card = gamestate.cards[cardInfo.id];
                        var cardForList = new PIXI.Container();
                        cardForList.addChild(Shapes.filledRect(-C.CARD_LIST_CARD_WIDTH / 2, -C.CARD_LIST_CARD_HEIGHT / 2, C.CARD_LIST_CARD_WIDTH, C.CARD_LIST_CARD_HEIGHT, ArtCommon.cardBannerForColor(card.color)));
                        var effectContainer = new PIXI.Container();
                        effectContainer.addChild(ArtCommon.getShadowForEffects(card.effects, 'dark'));
                        effectContainer.addChild(ArtCommon.getArtForEffects(card.effects));
                        effectContainer.scale.set(C.CARD_LIST_EFFECT_SCALE);
                        if (effectContainer.width > C.CARD_LIST_EFFECT_MAX_WIDTH) {
                            effectContainer.scale.set(C.CARD_LIST_EFFECT_SCALE * C.CARD_LIST_EFFECT_MAX_WIDTH / effectContainer.width);
                        }
                        cardForList.addChild(effectContainer);
                        if (cardInfo.count > 1) {
                            var text = Shapes.centeredText(-60, 0, cardInfo.count + " \u00D7", 0.15, 0xFFFFFF);
                            text.anchor.set(1, 0.5);
                            cardForList.addChild(text);
                        }
                        var resourceCost = ((_b = card.cost) === null || _b === void 0 ? void 0 : _b.resources) || [];
                        var goldCost = ((_c = card.cost) === null || _c === void 0 ? void 0 : _c.gold) || 0;
                        if (card.cost) {
                            var currentX = 70;
                            if (goldCost > 0) {
                                var gold = ArtCommon.gold(goldCost);
                                gold.scale.set(0.2);
                                gold.position.set(currentX, 0);
                                cardForList.addChild(gold);
                                currentX += 22;
                            }
                            for (var i = 0; i < resourceCost.length; i++) {
                                var resource_1 = ArtCommon.resource(resourceCost[i]);
                                resource_1.scale.set(0.2);
                                resource_1.position.set(currentX, 0);
                                cardForList.addChild(resource_1);
                                currentX += 22;
                            }
                        }
                        cardForList.x = x;
                        cardForList.y = y;
                        cardList.addChild(cardForList);
                        y += C.CARD_LIST_CARD_DY;
                    }
                }
                catch (e_45_1) { e_45 = { error: e_45_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_45) throw e_45.error; }
                }
                maxY = Math.max(maxY, y);
            }
            cardList.y += C.CARD_LIST_CARD_HEIGHT / 2;
            Resources.CARD_LIST = render(cardList, C.CARD_LIST_WIDTH, maxY);
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
        API.getgamestate(this.gameid, this.player, this.password_hash, function (gamestate, error) {
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
                PIXI.Loader.shared.add('astrolabe', 'assets/astrolabe.svg');
                PIXI.Loader.shared.add('pyramid_full', 'assets/pyramid_full.svg');
                PIXI.Loader.shared.add('pyramid_stages', 'assets/pyramid_stages.svg');
                PIXI.Loader.shared.add('falcon', 'assets/falcon.svg');
                PIXI.Loader.shared.add('mask', 'assets/mask.svg');
                PIXI.Loader.shared.add('unproduced_resource', 'assets/unproduced_resource.svg');
                PIXI.Loader.shared.add('dove', 'assets/dove.svg');
                PIXI.Loader.shared.add('crack', 'assets/crack.svg');
                PIXI.Loader.shared.add('turret', 'assets/turret.svg');
                PIXI.Loader.shared.add('chainlink', 'assets/chainlink.svg');
                PIXI.Loader.shared.add('eye', 'assets/eye.svg');
                PIXI.Loader.shared.add('copy_stage_first', 'assets/copy_stage_first.svg');
                PIXI.Loader.shared.add('copy_stage_second', 'assets/copy_stage_second.svg');
                PIXI.Loader.shared.add('copy_stage_last', 'assets/copy_stage_last.svg');
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
        API.getgamestate(this.gameid, this.player, this.password_hash, function (gamestate, error) {
            if (error) {
                Main.error('Failed to get game state: ' + error);
                _this.sendUpdate();
                return;
            }
            if (gamestate.turn < Main.gamestate.turn) {
                Main.error("Error: local turn (" + Main.gamestate.turn + ") is greater than the game's (" + gamestate.turn + ")?");
                _this.diffing = false;
                _this.gamestate = gamestate;
                _this.scene.destroy();
                _this.scene.create();
                _this.sendUpdate();
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
        API.updategame(this.gameid, function (wasUpdate, error) {
            if (error) {
                _this.error(error);
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
        API.submitmove(this.gameid, this.gamestate.turn, this.player, this.password_hash, move, function (error) {
            if (error) {
                console.error(move);
                _this.error(error);
                return;
            }
            console.log('Submitted move:', move);
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.undoMove = function () {
        var _this = this;
        API.undomove(this.gameid, this.gamestate.turn, this.player, this.password_hash, function (error) {
            if (error) {
                _this.error(error);
                return;
            }
            console.log('Undo move successful');
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.chooseSide = function (side) {
        var _this = this;
        API.chooseside(this.gameid, this.player, this.password_hash, side, function (error) {
            if (error) {
                _this.error(error);
                return;
            }
            console.log('Chose wonder side:', side);
            _this.moveImmuneTime = 1;
        });
        this.moveImmuneTime = 1;
    };
    Main.chooseGoldToLose = function (gold_to_lose) {
        var _this = this;
        API.choosegoldtolose(this.gameid, this.gamestate.turn, this.player, this.password_hash, gold_to_lose, function (error) {
            if (error) {
                _this.error(error);
                return;
            }
            console.log('Chose gold to lose:', gold_to_lose);
        });
    };
    Main.setStatus = function () {
        var status = document.querySelector('#status');
        var statusText = document.querySelector('#status > p');
        if (Main.currentError) {
            status.style.backgroundColor = C.ERROR_BG_COLOR;
            status.style.color = C.ERROR_TEXT_COLOR;
            statusText.innerHTML = Main.currentError;
            return;
        }
        if (this.scene) {
            status.style.backgroundColor = C.OK_BG_COLOR;
            status.style.color = C.OK_TEXT_COLOR;
        }
        if (!this.loader.isLoaded) {
            statusText.innerHTML = "Loading... " + this.loader.loadPercentage + "%";
            return;
        }
        var gamestate = this.gamestate;
        var playerData = gamestate.playerData[this.player];
        if (gamestate.state === 'CHOOSE_WONDER_SIDE') {
            if (playerData.currentMove) {
                statusText.innerHTML = "Waiting for others to choose their wonder side";
            }
            else {
                statusText.innerHTML = "<span class='statustextactive'>You must choose your wonder side</span>";
            }
        }
        else if (gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
            if (playerData.currentMove || gamestate.playerData[this.player].goldToLose <= 0) {
                var playersLeft = gamestate.chooseGoldToLosePlayers.filter(function (player) { return !gamestate.playerData[player].currentMove; });
                if (playersLeft.length === 1) {
                    statusText.innerHTML = "Waiting for " + playersLeft[0] + " to handle gold loss";
                }
                else {
                    statusText.innerHTML = "Waiting for others to handle gold loss";
                }
            }
            else {
                statusText.innerHTML = "<span class='statustextactive'>You must handle your gold loss</span>";
            }
        }
        else if (gamestate.state === 'SEE_FUTURE') {
            if (playerData.currentMove || !contains(gamestate.seeFuturePlayers, this.player)) {
                var playersLeft = gamestate.seeFuturePlayers.filter(function (player) { return !gamestate.playerData[player].currentMove; });
                if (playersLeft.length === 1) {
                    statusText.innerHTML = "Waiting for " + playersLeft[0] + " to see the future";
                }
                else {
                    statusText.innerHTML = "Waiting for others to see the future";
                }
            }
            else {
                statusText.innerHTML = "<span class='statustextactive'>You are seeing the future</span>";
            }
        }
        else if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                statusText.innerHTML = "Waiting for others to move";
            }
            else {
                statusText.innerHTML = "<span class='statustextactive'>You must play a card</span>";
            }
        }
        else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                var playersLeft = gamestate.lastCardPlayers.filter(function (player) { return !gamestate.playerData[player].currentMove; });
                if (playersLeft.length === 1) {
                    statusText.innerHTML = "Waiting for " + playersLeft[0] + " to play their last card";
                }
                else {
                    statusText.innerHTML = "Waiting for others to play their last cards";
                }
            }
            else {
                statusText.innerHTML = "<span class='statustextactive'>You may play your last card</span>";
            }
        }
        else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === this.player) {
                statusText.innerHTML = "<span class='statustextactive'>You may build a card from the discard pile</span>";
            }
            else {
                statusText.innerHTML = "Waiting for " + gamestate.discardMoveQueue[0] + " to build a card from the discard pile";
            }
        }
        else if (gamestate.state === 'GAME_COMPLETE') {
            statusText.innerHTML = "Game complete";
        }
        if (gamestate.sevenBlundersEnabled) {
            statusText.innerHTML = "7 Blunders: " + statusText.innerHTML;
        }
    };
    Main.updateBotMoves = function () {
        var e_46, _a;
        var _this = this;
        if (!this.isHost)
            return;
        var _loop_8 = function (player) {
            if (player.startsWith('BOT') && !this_3.gamestate.playerData[player].currentMove) {
                var botPlayer_1 = player;
                if (this_3.gamestate.state === 'CHOOSE_WONDER_SIDE') {
                    var side_1 = Bot.chooseSide(this_3.gamestate.wonderChoices[botPlayer_1]);
                    API.chooseside(this_3.gameid, botPlayer_1, undefined, side_1, function (error) {
                        if (error) {
                            _this.error(error);
                            return;
                        }
                        console.log(botPlayer_1, 'successfully chose wonder side:', side_1);
                    });
                }
                else if (this_3.gamestate.state === 'CHOOSE_GOLD_TO_LOSE') {
                    if (this_3.gamestate.playerData[botPlayer_1].goldToLose > 0) {
                        var gold_to_lose_1 = Bot.getGoldToLose(this_3.gamestate.playerData[botPlayer_1].gold, this_3.gamestate.playerData[botPlayer_1].goldToLose);
                        API.choosegoldtolose(this_3.gameid, this_3.gamestate.turn, botPlayer_1, undefined, gold_to_lose_1, function (error) {
                            if (error) {
                                _this.error(error);
                                return;
                            }
                            console.log(botPlayer_1, 'successfully chose gold to lose:', gold_to_lose_1);
                        });
                    }
                }
                else if (this_3.gamestate.state === 'SEE_FUTURE') {
                    if (contains(this_3.gamestate.seeFuturePlayers, botPlayer_1)) {
                        API.submitmove(this_3.gameid, this_3.gamestate.turn, botPlayer_1, undefined, { action: 'accept', card: -1, payment: {} }, function (error) {
                            if (error) {
                                _this.error(error);
                                return;
                            }
                            console.log(botPlayer_1, 'successfully saw the future');
                        });
                    }
                }
                else {
                    var turn_1 = this_3.gamestate.turn;
                    API.getvalidmoves(this_3.gameid, this_3.gamestate.turn, botPlayer_1, undefined, function (validMoves, error) {
                        if (error) {
                            _this.error(error);
                            return;
                        }
                        if (turn_1 !== _this.gamestate.turn || validMoves.length === 0)
                            return;
                        var move = Bot.getMove(validMoves);
                        API.submitmove(_this.gameid, _this.gamestate.turn, botPlayer_1, undefined, move, function (error) {
                            if (error) {
                                _this.error(error);
                                return;
                            }
                            console.log(botPlayer_1, 'successfully submitted move:', move);
                        });
                    });
                }
            }
        };
        var this_3 = this;
        try {
            for (var _b = __values(this.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                _loop_8(player);
            }
        }
        catch (e_46_1) { e_46 = { error: e_46_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_46) throw e_46.error; }
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
        _this.setType('tie');
        _this.setShields(0);
        _this.zIndex = C.Z_INDEX_MILITARY_OVERLAY;
        _this.alpha = 0;
        return _this;
    }
    MilitaryOverlay.prototype.setType = function (type) {
        this.overlayNeutral.style.visibility = (type === 'tie' || type === 'diplomacy') ? 'visible' : 'hidden';
        this.overlayVictory.style.visibility = type === 'victory' ? 'visible' : 'hidden';
        this.overlayDefeat.style.visibility = type === 'defeat' ? 'visible' : 'hidden';
        this.shield.style.visibility = type === 'diplomacy' ? 'hidden' : 'visible';
        this.shieldsText.style.visibility = type === 'diplomacy' ? 'hidden' : 'visible';
        this.dove.style.visibility = type === 'diplomacy' ? 'visible' : 'hidden';
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
        this.shield = div.appendChild(ArtCommon.domElementForArt(ArtCommon.shield(), C.WONDER_OVERLAY_SHIELD_SCALE));
        this.shield.style.position = 'absolute';
        this.shield.style.left = C.WONDER_OVERLAY_SHIELD_X + "px";
        this.shield.style.top = '0px';
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
        this.dove = div.appendChild(ArtCommon.domElementForArt(ArtCommon.dove(), C.WONDER_OVERLAY_SHIELD_SCALE));
        this.dove.style.position = 'absolute';
        this.dove.style.left = '0px';
        this.dove.style.top = '0px';
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
        _this.zIndex = C.Z_INDEX_TOKEN_MOVING;
        return _this;
    }
    MilitaryToken.prototype.draw = function () {
        return ArtCommon.domElementForArt(ArtCommon.militaryToken(this.amount), C.MILITARY_TOKEN_SCALE);
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
        var _loop_9 = function (i) {
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
                var paymentTextNegP = leftDiv.appendChild(this_4.drawText("<-- " + payment.neg + " to " + negPlayer, C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextNegP.style.width = '100%';
                paymentTextNegP.style.textAlign = 'right';
                paymentTextNegP.style.position = 'absolute';
                paymentTextNegP.style.top = '50%';
                paymentTextNegP.style.transform = 'translate(0, -50%)';
            }
            if (payment.pos) {
                var paymentTextPosP = rightDiv.appendChild(this_4.drawText("to " + posPlayer + " " + payment.pos + " -->", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextPosP.style.width = '100%';
                paymentTextPosP.style.textAlign = 'left';
                paymentTextPosP.style.position = 'absolute';
                paymentTextPosP.style.top = '50%';
                paymentTextPosP.style.transform = 'translate(0, -50%)';
            }
            if (payment.free_with_zeus) {
                var paymentTextZeus1 = leftDiv.appendChild(this_4.drawText("Free with", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextZeus1.style.width = '100%';
                paymentTextZeus1.style.textAlign = 'right';
                paymentTextZeus1.style.position = 'absolute';
                paymentTextZeus1.style.top = '50%';
                paymentTextZeus1.style.transform = 'translate(0, -50%)';
                var paymentTextZeus2 = rightDiv.appendChild(this_4.drawText("Olympia :)", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextZeus2.style.width = '100%';
                paymentTextZeus2.style.textAlign = 'left';
                paymentTextZeus2.style.position = 'absolute';
                paymentTextZeus2.style.top = '50%';
                paymentTextZeus2.style.transform = 'translate(0, -50%)';
            }
            if (payment.free_with_delphoi) {
                var paymentTextDelphoi1 = leftDiv.appendChild(this_4.drawText("Free with", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextDelphoi1.style.width = '100%';
                paymentTextDelphoi1.style.textAlign = 'right';
                paymentTextDelphoi1.style.position = 'absolute';
                paymentTextDelphoi1.style.top = '50%';
                paymentTextDelphoi1.style.transform = 'translate(0, -50%)';
                var paymentTextDelphoi2 = rightDiv.appendChild(this_4.drawText("Delphoi :)", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                paymentTextDelphoi2.style.width = '100%';
                paymentTextDelphoi2.style.textAlign = 'left';
                paymentTextDelphoi2.style.position = 'absolute';
                paymentTextDelphoi2.style.top = '50%';
                paymentTextDelphoi2.style.transform = 'translate(0, -50%)';
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
            payButton.style.color = C.PAYMENT_DIALOG_PAY_BUTTON_TEXT_COLOR;
            payButton.onclick = function (event) {
                var trueMove = {
                    action: _this.move.action,
                    card: _this.move.card,
                    index: _this.move.index,
                    stage: _this.move.stage,
                    copyPlayer: _this.move.copyPlayer,
                    copyStage: _this.move.copyStage,
                    payment: validPayments[i]
                };
                Main.submitMove(trueMove);
                _this.removeFromGame(true);
            };
            if (payment.bank) {
                var payButtonText = payButton.appendChild(this_4.drawText(payment.bank + " to bank", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                payButtonText.style.width = '100%';
                payButtonText.style.position = 'absolute';
                payButtonText.style.left = '50%';
                payButtonText.style.top = '50%';
                payButtonText.style.transform = 'translate(-50%, -50%)';
            }
            if (payment.free_with_delphoi) {
                var payButtonText = payButton.appendChild(this_4.drawText(Main.gamestate.playerData[Main.player].buildFreeWithoutChainUsages + " left", C.PAYMENT_DIALOG_PAYMENTS_TEXT_SIZE));
                payButtonText.style.width = '100%';
                payButtonText.style.position = 'absolute';
                payButtonText.style.left = '50%';
                payButtonText.style.top = '50%';
                payButtonText.style.transform = 'translate(-50%, -50%)';
            }
        };
        var this_4 = this;
        for (var i = 0; i < validPayments.length; i++) {
            _loop_9(i);
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
        var e_47, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.destroy();
            }
        }
        catch (e_47_1) { e_47 = { error: e_47_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_47) throw e_47.error; }
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
        card.convertToPlayed();
        this.update();
    };
    PlayedCardEffectRoll.prototype.addPlaceholder = function (card) {
        this.removePlaceholder();
        if (!contains(this.cards, card)) {
            this.placeholderIndex = this.getSortedIndex(card);
            this.placeholderWidth = card.effectWidth;
        }
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
var RainbowFilter = /** @class */ (function (_super) {
    __extends(RainbowFilter, _super);
    function RainbowFilter() {
        return _super.call(this, undefined, "\n            varying vec2 vTextureCoord;\n\n            uniform sampler2D uSampler;\n\n            // Source: https://stackoverflow.com/a/17897228\n            // All components are in the range [0,1], including hue.\n            vec3 hsv2rgb(vec3 c) {\n                vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n                vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n                return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n            }\n\n            void main(void){\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                if (gl_FragColor.a > 0.0) {\n                    float dx = vTextureCoord.x - 0.5;\n                    float dy = vTextureCoord.y - 0.5;\n                    float angle = atan(dy, dx);\n\n                    gl_FragColor.rgb = hsv2rgb(vec3(angle/2.0, 0.6, 0.9));\n                }\n            }\n        ", {}) || this;
    }
    return RainbowFilter;
}(PIXI.Filter));
var renderer = new PIXI.Renderer({ antialias: true, transparent: true });
var resolution = Math.min(2 * (window.devicePixelRatio || 1), 3); // Cap resolution at 3x
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
var SilhouetteFilter = /** @class */ (function (_super) {
    __extends(SilhouetteFilter, _super);
    function SilhouetteFilter(type) {
        return _super.call(this, VERTEX_FILTER, FRAG_SHADER_SILHOUETTE(type)) || this;
    }
    return SilhouetteFilter;
}(PIXI.Filter));
var VERTEX_FILTER = "\n    attribute vec2 aVertexPosition;\n\n    uniform mat3 projectionMatrix;\n\n    varying vec2 vTextureCoord;\n\n    uniform vec4 inputSize;\n    uniform vec4 outputFrame;\n\n    vec4 filterVertexPosition(void) {\n        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;\n\n        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);\n    }\n\n    vec2 filterTextureCoord(void) {\n        return aVertexPosition * (outputFrame.zw * inputSize.zw);\n    }\n\n    void main(void) {\n        gl_Position = filterVertexPosition();\n        vTextureCoord = filterTextureCoord();\n    }\n";
function FRAG_SHADER_SILHOUETTE(type) {
    var value = type === 'dark' ? 0.0 : 1.0;
    return "\n        varying vec2 vTextureCoord;\n\n        uniform sampler2D uSampler;\n\n        void main(void) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            if (gl_FragColor.a > 0.0) {\n                gl_FragColor.rgb = vec3(" + value + ", " + value + ", " + value + ");\n            }\n        }\n    ";
}
/// <reference path="./popup.ts" />
var StageInfoPopup = /** @class */ (function (_super) {
    __extends(StageInfoPopup, _super);
    function StageInfoPopup(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.div.className = 'popup';
        return _this;
    }
    StageInfoPopup.prototype.getSource = function () {
        return this.source;
    };
    StageInfoPopup.prototype.draw = function () {
        return this.source.stage.copy_stage ? this.drawCopyStage() : this.drawNormalStage();
    };
    StageInfoPopup.prototype.drawNormalStage = function () {
        var _a, _b;
        var box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';
        var currentY = 16;
        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', currentY + "px"));
        currentY += 24;
        // Cost
        var resourceCost = ((_a = this.source.stage.cost) === null || _a === void 0 ? void 0 : _a.resources) || [];
        var goldCost = ((_b = this.source.stage.cost) === null || _b === void 0 ? void 0 : _b.gold) || 0;
        var isFree = resourceCost.length === 0 && goldCost === 0;
        box.appendChild(this.infoText("Cost:" + (isFree ? ' None' : ''), '10px', currentY + "px"));
        if (this.source.stage.cost) {
            var currentX = 60;
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
            var _loop_10 = function (i) {
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
                _loop_10(i);
            }
        }
        currentY += 24;
        // Effects
        box.appendChild(this.infoText('Effects:', '10px', currentY + "px"));
        currentY += 20;
        var effects = this.source.stage.effects;
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
    StageInfoPopup.prototype.drawCopyStage = function () {
        var box = document.createElement('div');
        box.style.backgroundColor = '#FFFFFF';
        box.style.position = 'absolute';
        var currentY = 16;
        // Name
        box.appendChild(this.infoText('<span style="font-weight:bold">Wonder Stage</span>', '10px', currentY + "px"));
        currentY += 24;
        var effect = box.appendChild(document.createElement('div'));
        var copyArt = new PIXI.Container();
        copyArt.addChild(ArtCommon.getShadowForStageCopy(this.source.stage.copy_stage.stage, this.source.stage.copy_stage.dir, 'dark'));
        copyArt.addChild(ArtCommon.getArtForStageCopy(this.source.stage.copy_stage.stage, this.source.stage.copy_stage.dir));
        effect.appendChild(ArtCommon.domElementForArt(copyArt, 1, 10));
        effect.style.transform = 'scale(0.2)';
        effect.style.position = 'absolute';
        effect.style.left = 10 + copyArt.width / 10 + "px";
        effect.style.top = currentY + "px";
        var description = this.infoText("Copy the " + this.source.stage.copy_stage.stage + " wonder stage of your " + (this.source.stage.copy_stage.dir === 'neg' ? 'left' : 'right') + " neighbor", 20 + copyArt.width / 5 + "px", currentY + "px");
        description.style.fontSize = C.CARD_INFO_EFFECT_DESCRIPTION_SIZE + "px";
        description.style.marginRight = '10px';
        box.appendChild(description);
        currentY += 24;
        // Stage copy
        var stageBuilt = this.getStageBuilt();
        if (stageBuilt) {
            box.appendChild(this.infoText('Copied Effects:', '10px', currentY + "px"));
            currentY += 20;
            var effects = (stageBuilt.copyPlayer === undefined || stageBuilt.copyStage === undefined)
                ? []
                : Main.gamestate.wonders[stageBuilt.copyPlayer].stages[stageBuilt.copyStage].effects;
            for (var i = 0; i < effects.length; i++) {
                var effect_1 = box.appendChild(document.createElement('div'));
                var effectArt = new PIXI.Container();
                effectArt.addChild(ArtCommon.getShadowForEffects([effects[i]], 'dark'));
                effectArt.addChild(ArtCommon.getArtForEffects([effects[i]]));
                effect_1.appendChild(ArtCommon.domElementForArt(effectArt, 1, 10));
                effect_1.style.transform = 'scale(0.2)';
                effect_1.style.position = 'absolute';
                effect_1.style.left = 10 + effectArt.width / 10 + "px";
                effect_1.style.top = currentY + "px";
                var description_1 = this.infoText(getDescriptionForEffect(effects[i]), 20 + effectArt.width / 5 + "px", currentY + "px");
                description_1.style.fontSize = C.CARD_INFO_EFFECT_DESCRIPTION_SIZE + "px";
                description_1.style.marginRight = '10px';
                box.appendChild(description_1);
                currentY += 24;
            }
        }
        var padding = 10;
        box.style.width = this.width - padding + "px";
        box.style.height = currentY + "px";
        box.style.paddingRight = padding + "px";
        return box;
    };
    StageInfoPopup.prototype.getStageBuilt = function () {
        var e_48, _a;
        try {
            for (var _b = __values(Main.gamestate.playerData[this.source.player].stagesBuilt), _c = _b.next(); !_c.done; _c = _b.next()) {
                var stageBuilt = _c.value;
                if (stageBuilt.stage === this.source.stageIndex) {
                    return stageBuilt;
                }
            }
        }
        catch (e_48_1) { e_48 = { error: e_48_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_48) throw e_48.error; }
        }
        return undefined;
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
var TokenRack = /** @class */ (function (_super) {
    __extends(TokenRack, _super);
    function TokenRack(offsetX, dx, zIndex, getPos) {
        var _this = _super.call(this) || this;
        _this.offsetX = offsetX;
        _this.dx = dx;
        _this.getPos = getPos;
        _this.tokens = [];
        _this.div.className = 'diplomacytokenrack';
        _this.div.style.pointerEvents = 'none';
        _this.zIndex = zIndex;
        return _this;
    }
    TokenRack.prototype.update = function () {
        var pos = this.getPos();
        this.x = pos.x;
        this.y = pos.y;
    };
    TokenRack.prototype.addToken = function (token) {
        token.style.position = 'absolute';
        this.div.appendChild(token);
        this.tokens.push(token);
        this.adjustTokenPositions();
    };
    TokenRack.prototype.removeToken = function (i) {
        var token = this.tokens.pop();
        token.parentElement.removeChild(token);
        this.adjustTokenPositions();
    };
    TokenRack.prototype.getTokenPosition = function (i) {
        return new PIXI.Point(this.x + this.offsetX + this.dx * i, this.y);
    };
    TokenRack.prototype.getTokenCount = function () {
        return this.tokens.length;
    };
    TokenRack.prototype.adjustTokenPositions = function () {
        for (var i = 0; i < this.tokens.length; i++) {
            this.tokens[i].style.left = this.offsetX + this.dx * i + "px";
        }
    };
    return TokenRack;
}(GameElement));
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
    var e_49, _a;
    try {
        for (var array_1 = __values(array), array_1_1 = array_1.next(); !array_1_1.done; array_1_1 = array_1.next()) {
            var e = array_1_1.value;
            if (e === element)
                return true;
        }
    }
    catch (e_49_1) { e_49 = { error: e_49_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_49) throw e_49.error; }
    }
    return false;
}
function equalsArray(array1, array2) {
    if (!array1 && !array2)
        return true;
    if (!array1 || !array2)
        return false;
    if (array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i])
            return false;
    }
    return true;
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
function lerpTime(a, b, t, delta) {
    // From https://www.gamasutra.com/blogs/ScottLembcke/20180404/316046/Improved_Lerp_Smoothing.php
    return lerp(a, b, 1 - Math.pow(2, -100 * t * delta));
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
    var e_50, _a;
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
    catch (e_50_1) { e_50 = { error: e_50_1 }; }
    finally {
        try {
            if (array_2_1 && !array_2_1.done && (_a = array_2.return)) _a.call(array_2);
        }
        finally { if (e_50) throw e_50.error; }
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
        var e_51, _a, e_52, _b;
        var _this = this;
        var playerData = Main.gamestate.playerData[this.player];
        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);
        this.stageXs = this.wonderResource.stageXs;
        this.div.className = 'wonder';
        var boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);
        var payments = boardDiv.appendChild(this.drawPayments());
        payments.style.transform = "translate(-50%, " + (C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + C.WONDER_STAGE_PAYMENT_OFFSET_Y) + "px)";
        payments.style.zIndex = '10000';
        this.sidebar = this.div.appendChild(this.drawSidebar());
        this.sidebar.style.left = C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_WIDTH + "px";
        this.sidebar.style.top = -C.WONDER_BOARD_HEIGHT / 2 + "px";
        // Military tokens
        this.militaryTokenRack = new TokenRack(C.WONDER_MILITARY_TOKENS_OFFSET_X, C.WONDER_MILITARY_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, function () {
            return new PIXI.Point(_this.x + C.WONDER_BOARD_WIDTH / 2 + C.WONDER_SIDEBAR_TOKENS_X, _this.y - C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_SIDEBAR_MILITARY_TOKENS_Y);
        });
        for (var i = 0; i < Main.gamestate.playerData[this.player].militaryTokens.length; i++) {
            this.addMilitaryToken(Main.gamestate.playerData[this.player].militaryTokens[i]);
        }
        this.militaryTokenRack.addToGame();
        // Debt tokens
        this.debtTokenRack = new TokenRack(C.WONDER_DEBT_TOKENS_OFFSET_X, C.WONDER_DEBT_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, function () {
            return new PIXI.Point(_this.x + C.WONDER_BOARD_WIDTH / 2 + C.WONDER_SIDEBAR_TOKENS_X, _this.y - C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_SIDEBAR_DEBT_TOKENS_Y);
        });
        for (var i = 0; i < Main.gamestate.playerData[this.player].debtTokens; i++) {
            this.addDebtToken();
        }
        this.debtTokenRack.addToGame();
        var c = Main.gamestate.citiesEnabled;
        this.playedCardEffectRolls = {
            brown: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2, -C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_RESOURCE_ROLL_OFFSET_Y, false, C.SORT_CMP_RESOURCES),
            grey: undefined,
            red: new PlayedCardEffectRoll(C.WONDER_RED_ROLL_X, -C.WONDER_BOARD_HEIGHT / 2 + C.WONDER_RED_ROLL_Y, false, null),
            yellow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_YELLOW_ROLL_Y(c), false, null),
            purple: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_PURPLE_ROLL_Y(c), false, null),
            blue: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_BORDER, C.WONDER_BLUE_ROLL_Y(c), true, null),
            green: new PlayedCardEffectRoll(C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_BORDER, C.WONDER_GREEN_ROLL_Y(c), true, C.SORT_CMP_SCIENCE),
            black: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2 + C.WONDER_BOARD_BORDER, C.WONDER_BLACK_ROLL_Y, false, null),
            overflow: new PlayedCardEffectRoll(-C.WONDER_BOARD_WIDTH / 2, -C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_OVERFLOW_ROLL_OFFSET_Y, false, null),
        };
        this.playedCardEffectRolls.grey = this.playedCardEffectRolls.brown;
        try {
            for (var _c = __values(playerData.playedCards), _d = _c.next(); !_d.done; _d = _c.next()) {
                var apiCardId = _d.value;
                var points = (apiCardId in playerData.cardPoints && !Main.gamestate.randomizerEnabled) ? playerData.cardPoints[apiCardId] : undefined;
                var card = new Card(this.scene, apiCardId, -1, points, undefined, this, []);
                this.addNewCardEffect(card);
                if (card.isMilitary() && playerData.diplomacyTokens > 0) {
                    card.setGrayedOut(true);
                }
                card.addToGame();
            }
        }
        catch (e_51_1) { e_51 = { error: e_51_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_51) throw e_51.error; }
        }
        this.builtWonderCards = [];
        try {
            for (var _e = __values(playerData.stagesBuilt), _f = _e.next(); !_f.done; _f = _e.next()) {
                var stageBuilt = _f.value;
                var justPlayed = (Main.gamestate.state !== 'GAME_COMPLETE' && playerData.lastMove && playerData.lastMove.action === 'wonder' && playerData.lastMove.stage === stageBuilt.stage);
                var card = Card.flippedCardForAge(this.scene, stageBuilt.cardAge, justPlayed);
                card.convertToBuried();
                card.addToGame();
                this.builtWonderCards.push(card);
            }
        }
        catch (e_52_1) { e_52 = { error: e_52_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_52) throw e_52.error; }
        }
        this.diplomacyTokenRack = new TokenRack(C.WONDER_DIPLOMACY_TOKENS_OFFSET_X, C.WONDER_DIPLOMACY_TOKENS_DX, C.Z_INDEX_WONDER_TOKENS, function () {
            return new PIXI.Point(_this.x + _this.playedCardEffectRolls.red.offsetx
                + _this.playedCardEffectRolls.red.width
                + _this.playedCardEffectRolls.red.placeholderWidth, _this.y + _this.playedCardEffectRolls.red.offsety);
        });
        for (var i = 0; i < playerData.diplomacyTokens; i++) {
            this.addDiplomacyToken();
        }
        this.diplomacyTokenRack.addToGame();
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
        var _loop_11 = function (i) {
            var stageX = this_5.wonderResource.stageXs[i];
            var wonderStage = this_5.wonder.stages[i];
            var stageSource = {
                player: this_5.player,
                stageIndex: i,
                stage: wonderStage,
            };
            var popupDiv_1 = this_5.div.appendChild(document.createElement('div'));
            popupDiv_1.style.position = 'absolute';
            popupDiv_1.style.left = -C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2 + "px";
            popupDiv_1.style.top = C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_1.style.width = C.WONDER_STAGE_WIDTH + "px";
            popupDiv_1.style.height = C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_1.onmousemove = function () {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(stageSource);
                    return;
                }
                Main.scene.updatePopup(stageSource, _this.x - C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2, _this.y + C.WONDER_BOARD_HEIGHT / 2);
            };
            popupDiv_1.onmouseleave = function () {
                Main.scene.stopPopup(stageSource);
            };
        };
        var this_5 = this;
        // Stage popups
        for (var i = 0; i < this.wonder.stages.length; i++) {
            _loop_11(i);
        }
        this.zIndex = C.Z_INDEX_WONDER;
    };
    Wonder.prototype.destroy = function () {
        var e_53, _a;
        for (var color in this.playedCardEffectRolls) {
            this.playedCardEffectRolls[color].destroy();
        }
        try {
            for (var _b = __values(this.builtWonderCards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.destroy();
            }
        }
        catch (e_53_1) { e_53 = { error: e_53_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_53) throw e_53.error; }
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
        this.militaryTokenRack.update();
        this.debtTokenRack.update();
        this.diplomacyTokenRack.update();
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
        return this.militaryTokenRack.getTokenPosition(i);
    };
    Wonder.prototype.getDebtTokenWorldPosition = function (i) {
        return this.debtTokenRack.getTokenPosition(i);
    };
    Wonder.prototype.getDiplomacyTokenPosition = function (i) {
        return this.diplomacyTokenRack.getTokenPosition(i);
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
    Wonder.prototype.adjustToDiplomacy = function (diplomacy) {
        var e_54, _a;
        for (var key in this.playedCardEffectRolls) {
            try {
                for (var _b = (e_54 = void 0, __values(this.playedCardEffectRolls[key].cards)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.isMilitary())
                        card.setGrayedOut(diplomacy);
                }
            }
            catch (e_54_1) { e_54 = { error: e_54_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_54) throw e_54.error; }
            }
        }
    };
    Wonder.prototype.addMilitaryToken = function (value) {
        this.militaryTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.militaryToken(value), C.MILITARY_TOKEN_SCALE));
    };
    Wonder.prototype.addDebtToken = function () {
        this.debtTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.debtToken(), C.DEBT_TOKEN_SCALE));
    };
    Wonder.prototype.addDiplomacyToken = function () {
        this.diplomacyTokenRack.addToken(ArtCommon.domElementForArt(ArtCommon.dove(), C.DIPLOMACY_TOKEN_SCALE));
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
            'brown': C.WONDER_BOARD_WIDTH - C.WONDER_RESOURCE_ROLL_INFO_WIDTH,
            'grey': C.WONDER_BOARD_WIDTH - C.WONDER_RESOURCE_ROLL_INFO_WIDTH,
            'red': C.WONDER_RED_ROLL_MAX_X - C.WONDER_RED_ROLL_X,
            'yellow': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['blue'].width,
            'purple': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['green'].width,
            'blue': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['yellow'].width,
            'green': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER - this.playedCardEffectRolls['purple'].width,
            'black': C.WONDER_BOARD_WIDTH - 2 * C.WONDER_BOARD_BORDER,
        }[color];
    };
    Wonder.prototype.drawPayments = function () {
        var e_55, _a;
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
        catch (e_55_1) { e_55 = { error: e_55_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_55) throw e_55.error; }
        }
        var payments = new PIXI.Container();
        for (var i = 0; i < wonder.stages.length; i++) {
            if (this.player === Main.player && !contains(stageIdsBuilt, i)) {
                var stagePayment = ArtCommon.payment(wonderStageMinCosts[i], false);
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
        _this._checkMarkVisible = true;
        _this.scene = scene;
        _this.wonder = wonder;
        _this.side = side;
        _this.player = player;
        _this.create();
        return _this;
    }
    Object.defineProperty(WonderBoardForChoose.prototype, "checkMarkVisible", {
        get: function () { return this._checkMarkVisible; },
        set: function (value) {
            this._checkMarkVisible = value;
            this.checkMark.style.visibility = value ? 'visible' : 'hidden';
        },
        enumerable: false,
        configurable: true
    });
    WonderBoardForChoose.prototype.create = function () {
        var _this = this;
        this.wonderResource = Resources.getWonder(this.wonder.name, this.wonder.side);
        var boardDiv = this.div.appendChild(document.createElement('div'));
        boardDiv.appendChild(this.wonderResource.board);
        if (this.side === 0) {
            var sidebar = this.div.appendChild(this.drawSidebar());
            sidebar.style.left = C.WONDER_BOARD_WIDTH / 2 - C.WONDER_BOARD_WIDTH + "px";
            sidebar.style.top = -C.WONDER_BOARD_HEIGHT / 2 + "px";
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
        var _loop_12 = function (i) {
            var stageX = this_6.wonderResource.stageXs[i];
            var wonderStage = this_6.wonder.stages[i];
            var stageSource = {
                player: this_6.player,
                stageIndex: i,
                stage: wonderStage,
            };
            var popupDiv_2 = this_6.div.appendChild(document.createElement('div'));
            popupDiv_2.style.position = 'absolute';
            popupDiv_2.style.left = -C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2 + "px";
            popupDiv_2.style.top = C.WONDER_BOARD_HEIGHT / 2 - C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_2.style.width = C.WONDER_STAGE_WIDTH + "px";
            popupDiv_2.style.height = C.WONDER_STAGE_HEIGHT + "px";
            popupDiv_2.onmousemove = function () {
                if (Main.scene.isCurrentlyDragging()) {
                    Main.scene.stopPopup(stageSource);
                    return;
                }
                Main.scene.updatePopup(stageSource, _this.x - C.WONDER_BOARD_WIDTH / 2 + stageX - C.WONDER_STAGE_WIDTH / 2, _this.y + C.WONDER_BOARD_HEIGHT / 2);
            };
            popupDiv_2.onmouseleave = function () {
                Main.scene.stopPopup(stageSource);
            };
        };
        var this_6 = this;
        // Stage popups
        for (var i = 0; i < this.wonder.stages.length; i++) {
            _loop_12(i);
        }
        // Selection
        if (this.player === Main.player) {
            this.selection = this.drawSelection();
            this.selection.style.visibility = 'hidden';
            this.selection.style.pointerEvents = 'none';
            this.div.appendChild(this.selection);
            this.div.style.cursor = 'pointer';
            this.div.onclick = function (event) {
                if (event.button !== 0)
                    return;
                Main.chooseSide(_this.side);
                _this.scene.selectSide(_this.side);
            };
        }
        else {
            this.checkMark = this.drawCheckMark();
            this.checkMark.style.visibility = 'hidden';
            this.div.appendChild(this.checkMark);
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
    WonderBoardForChoose.prototype.drawCheckMark = function () {
        var checkmark = ArtCommon.domElementForArt(ArtCommon.checkMark(), 0.5);
        checkmark.style.position = 'absolute';
        checkmark.style.left = '50%';
        checkmark.style.top = '50%';
        return checkmark;
    };
    WonderBoardForChoose.prototype.drawSidebar = function () {
        var sidebar = document.createElement('div');
        sidebar.style.width = C.WONDER_BOARD_WIDTH + "px";
        sidebar.style.height = C.WONDER_BOARD_HEIGHT + "px";
        sidebar.style.position = 'absolute';
        var nameElo = this.player in Main.users ? this.player + "<span style=\"font-size: 12px\"> (" + Math.round(Main.users[this.player].elo) + ")</span>" : this.player;
        var nameText = sidebar.appendChild(this.drawSidebarText(nameElo, C.WONDER_SIDEBAR_NAME_SIZE));
        nameText.style.left = C.WONDER_BOARD_WIDTH + C.WONDER_SIDEBAR_NAME_X + "px";
        nameText.style.top = C.WONDER_SIDEBAR_NAME_Y_CHOOSE + "px";
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
        this.playersElement = document.getElementById('createsectionplayers');
        this.optionsElement = document.getElementById('createsectionoptions');
        // Players
        var players = LobbyMain.user.friends;
        for (var i = 0; i < players.length; i++) {
            this.playersElement.appendChild(this.checkbox('player', players[i], players[i], 32, TOP_Y + 32 * i, false));
        }
        this.playersElement.appendChild(this.botbox(32, TOP_Y + 32 * players.length));
        // Options
        this.optionsElement.appendChild(this.checkbox('option', 'Vanilla wonders', 'vanilla_wonders', 32, TOP_Y, false));
        this.optionsElement.appendChild(this.checkbox('option', 'Cities expansion', 'cities', 32, TOP_Y + 32, true));
        this.optionsElement.appendChild(this.checkbox('option', 'Use wonder preferences', 'respect_preferences', 32, TOP_Y + 64, true));
        this.optionsElement.appendChild(this.checkbox('option', 'Use elo for draft', 'draft_by_elo', 32, TOP_Y + 116, true));
        this.optionsElement.appendChild(this.checkbox('option', '7 Blunders', 'blunders', 32, TOP_Y + 232, false));
        this.optionsElement.appendChild(this.checkbox('option', 'Randomizer', 'randomizer', 32, TOP_Y + 264, false));
        if (window.location.href.includes('localhost')) {
            this.optionsElement.appendChild(this.checkbox('option', 'Test game', 'test', 32, TOP_Y + 310, true));
        }
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
        labelE.style.width = '200px';
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
        API.getpatchnotes(function (patchnotes, error) {
            if (error) {
                _this.error(error, true);
                return;
            }
            console.log('Fetched patch notes');
            document.getElementById('patchnotescontent').innerHTML = patchnotes;
        });
    };
    LobbyMain.load = function () {
        document.getElementsByClassName('userinfo')[0].innerHTML = "Logged in as " + this.user.username + " | " + Math.round(this.user.elo) + " | <a class=\"userinfolink\" href=\"\" onclick=\"Login.logout()\">Logout</a>";
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
        API.setwonderpreferences(this.username, this.password_hash, preferences, function (error) {
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
            var text = "<span class=\"statustextactive\">Current Games:</span> " + links.join(', ');
            if (statusText.innerHTML !== text)
                statusText.innerHTML = text;
        }
        else {
            statusText.innerHTML = "No current games";
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
        p.innerHTML = preference.name;
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
        return new PIXI.Point(0, 26 * i);
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
            var scriptFunctions_1, scriptFunctions_1_1, scriptFunction, e_56_1;
            var e_56, _a;
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
                        e_56_1 = _b.sent();
                        e_56 = { error: e_56_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (scriptFunctions_1_1 && !scriptFunctions_1_1.done && (_a = scriptFunctions_1.return)) _a.call(scriptFunctions_1);
                        }
                        finally { if (e_56) throw e_56.error; }
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
