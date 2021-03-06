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
    function totalNeighborPaymentAmount(payment) {
        if (!payment)
            return 0;
        return (payment.pos || 0) + (payment.neg || 0);
    }
    API.totalNeighborPaymentAmount = totalNeighborPaymentAmount;
    function isNeighborPaymentNecessary(move, validMoves) {
        var e_1, _a;
        var foundMatchingMove = false;
        try {
            for (var validMoves_1 = __values(validMoves), validMoves_1_1 = validMoves_1.next(); !validMoves_1_1.done; validMoves_1_1 = validMoves_1.next()) {
                var validMove = validMoves_1_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                foundMatchingMove = true;
                var totalPayment = totalNeighborPaymentAmount(validMove.payment);
                if (totalPayment === 0)
                    return false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (validMoves_1_1 && !validMoves_1_1.done && (_a = validMoves_1.return)) _a.call(validMoves_1);
            }
            finally { if (e_1) throw e_1.error; }
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
        var e_2, _a;
        var options = [];
        try {
            for (var validMoves_2 = __values(validMoves), validMoves_2_1 = validMoves_2.next(); !validMoves_2_1.done; validMoves_2_1 = validMoves_2.next()) {
                var validMove = validMoves_2_1.value;
                if (validMove.action !== move.action)
                    continue;
                if (validMove.card !== move.card)
                    continue;
                if (totalNeighborPaymentAmount(validMove.payment) === 0)
                    continue;
                options.push(validMove.payment);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (validMoves_2_1 && !validMoves_2_1.done && (_a = validMoves_2.return)) _a.call(validMoves_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        options.sort(function (o1, o2) { return totalNeighborPaymentAmount(o1) - totalNeighborPaymentAmount(o2); });
        console.log(options);
        for (var i = 0; i < options.length; i++) {
            for (var j = i + 1; j < options.length; j++) {
                var pos_i = options[i].pos || 0;
                var neg_i = options[i].neg || 0;
                var pos_j = options[j].pos || 0;
                var neg_j = options[j].neg || 0;
                console.log(pos_i, neg_i, pos_j, neg_j);
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
        var e_3, _a;
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
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (cost.gold) {
            costArts.push(gold(cost.gold));
        }
        return combineCostArt(costArts, 16);
    }
    ArtCommon.getArtForCost = getArtForCost;
    function getArtForStageCost(cost) {
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
        var e_5, _a;
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
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (resourceArts_1_1 && !resourceArts_1_1.done && (_a = resourceArts_1.return)) _a.call(resourceArts_1);
            }
            finally { if (e_5) throw e_5.error; }
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
        var e_6, _a;
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
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (symbolArts_1_1 && !symbolArts_1_1.done && (_a = symbolArts_1.return)) _a.call(symbolArts_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return combineEffectArt(symbolArts, 4);
    }
    ArtCommon.multiScience = multiScience;
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
        var alpha = new PIXI.Text('\u03B1', { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        alpha.anchor.set(0.5, 0.5);
        alpha.position.set(0, 10);
        container.addChild(alpha);
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
        var omega = new PIXI.Text('\u03A9', { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        omega.scale.set(0.8);
        omega.anchor.set(0.5, 0.5);
        omega.position.set(0, 16);
        container.addChild(omega);
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
        var e_7, _a;
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
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (arts_1_1 && !arts_1_1.done && (_a = arts_1.return)) _a.call(arts_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return container;
    }
    function combineCostArt(arts, padding) {
        var e_8, _a;
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
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (arts_2_1 && !arts_2_1.done && (_a = arts_2.return)) _a.call(arts_2);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return container;
    }
    function combineStageCostArt(arts, padding) {
        var e_9, _a;
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
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (arts_3_1 && !arts_3_1.done && (_a = arts_3.return)) _a.call(arts_3);
            }
            finally { if (e_9) throw e_9.error; }
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
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    function Card(cardId, card, handPosition, activeWonder, discardPile) {
        var _this = _super.call(this) || this;
        _this.apiCardId = cardId;
        _this.apiCard = card;
        _this.handPosition = handPosition;
        _this.activeWonder = activeWonder;
        _this.discardPile = discardPile;
        _this.state = { type: 'in_hand', visualState: 'full' };
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
        var _a, _b, _c, _d, _e;
        var dragPosition = (_a = this.dragging) === null || _a === void 0 ? void 0 : _a.data.getLocalPosition(this.parent);
        if (this.dragging) {
            if (!Main.mouseDown) {
                if (this.activeWonder.getMainRegion().contains(dragPosition.x, dragPosition.y)) {
                    var move = { action: 'play', card: this.apiCardId };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(move, 400, 400);
                    }
                    else {
                        move.payment = { bank: (_c = (_b = this.apiCard) === null || _b === void 0 ? void 0 : _b.cost) === null || _c === void 0 ? void 0 : _c.gold };
                        Main.submitMove(move);
                    }
                    //this.select(move);
                }
                else if (this.activeWonder.getStageRegion().contains(dragPosition.x, dragPosition.y)) {
                    var stage = this.activeWonder.getClosestStageId(dragPosition);
                    var move = { action: 'wonder', card: this.apiCardId, stage: stage };
                    if (API.isNeighborPaymentNecessary(move, Main.gamestate.validMoves)) {
                        Main.scene.startPaymentDialog(move, 400, 400);
                    }
                    else {
                        move.payment = { bank: (_e = (_d = Main.gamestate.wonders[Main.player].stages[stage]) === null || _d === void 0 ? void 0 : _d.cost) === null || _e === void 0 ? void 0 : _e.gold };
                        Main.submitMove(move);
                    }
                    //this.select(move);
                }
                else if (this.discardPile.getBounds().contains(dragPosition.x, dragPosition.y)) {
                    var move = { action: 'throw', card: this.apiCardId, payment: {} };
                    Main.submitMove(move);
                    //this.select(move);
                }
                else {
                    this.state = { type: 'in_hand', visualState: 'full' };
                }
                this.state = { type: 'in_hand', visualState: 'full' }; // todo remove this
                this.dragging = null;
            }
            else {
                if (this.activeWonder.getMainRegion().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_play' };
                }
                else if (this.activeWonder.getStageRegion().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_wonder' };
                }
                else if (this.discardPile.getBounds().contains(dragPosition.x, dragPosition.y)) {
                    this.state = { type: 'dragging_throw' };
                }
                else {
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
        }
        else if (this.state.type === 'dragging_normal') {
            this.x = dragPosition.x + this.dragging.offsetx;
            this.y = dragPosition.y + this.dragging.offsety;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'full';
        }
        else if (this.state.type === 'dragging_play') {
            this.x = dragPosition.x;
            this.y = dragPosition.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x / this.scale.x * 0.75;
            this.mainContainer.scale.y = this.activeWonder.scale.y / this.scale.y * 0.75;
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'effect';
        }
        else if (this.state.type === 'dragging_wonder') {
            var stage = this.activeWonder.getClosestStageId(dragPosition);
            var stagePoint = this.activeWonder.getCardPositionForStage(stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x / this.scale.x * 0.66;
            this.mainContainer.scale.y = this.activeWonder.scale.y / this.scale.y * 0.66;
            this.parent.setChildIndex(this, 0);
            this.setInteractable(this.canBeInteractable());
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'dragging_throw') {
            this.x = dragPosition.x + this.dragging.offsetx;
            this.y = dragPosition.y + this.dragging.offsety;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.setInteractable(false);
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_play') {
            var effectPoint = this.activeWonder.getNewCardEffectWorldPosition(this);
            this.x = effectPoint.x;
            this.y = effectPoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x / this.scale.x * 0.75;
            this.mainContainer.scale.y = this.activeWonder.scale.y / this.scale.y * 0.75;
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.setInteractable(false);
            this.visualState = 'effect';
        }
        else if (this.state.type === 'locked_wonder') {
            var stagePoint = this.activeWonder.getCardPositionForStage(this.state.stage);
            this.x = stagePoint.x;
            this.y = stagePoint.y;
            this.mainContainer.scale.x = this.activeWonder.scale.x / this.scale.x * 0.66;
            this.mainContainer.scale.y = this.activeWonder.scale.y / this.scale.y * 0.66;
            this.parent.setChildIndex(this, 0);
            this.setInteractable(false);
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'locked_throw') {
            var discardPoint = new PIXI.Point(this.discardPile.x, this.discardPile.y - 36 * this.scale.y);
            this.x = discardPoint.x;
            this.y = discardPoint.y;
            this.mainContainer.scale.x = 1;
            this.mainContainer.scale.y = 1;
            this.parent.setChildIndex(this, this.parent.children.length - 1);
            this.setInteractable(false);
            this.visualState = 'flipped';
        }
        else if (this.state.type === 'permanent_effect') {
            this.scale.set(0.75);
            this.setInteractable(false);
            this.visualState = 'effect';
            this.effectT = 1;
        }
        else if (this.state.type === 'permanent_flipped') {
            this.scale.set(0.66);
            this.setInteractable(false);
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
        this.stateMask.position.set(lerp(this.fullCardRect.left, this.effectsRect.left, this.effectT), lerp(this.fullCardRect.top, this.effectsRect.top, this.effectT));
        this.stateMask.scale.set(lerp(this.fullCardRect.width, this.effectsRect.width, this.effectT), lerp(this.fullCardRect.height, this.effectsRect.height, this.effectT));
        this.frontContainer.scale.x = lerp(1, 0, Math.min(this.flippedT, 0.5) * 2);
        this.backContainer.scale.x = lerp(0, 1, Math.max(0.5, this.flippedT) * 2 - 1);
    };
    Card.prototype.getWidth = function () {
        return this.stateMask.width * this.scale.x * this.mainContainer.scale.x;
    };
    Card.prototype.getHeight = function () {
        return this.stateMask.height * this.scale.y * this.mainContainer.scale.y;
    };
    Card.prototype.canBeInteractable = function () {
        return !Main.scene || !Main.scene.isPaymentMenuActive;
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
    Card.prototype.setInteractable = function (interactable) {
        this.buttonMode = interactable;
        this.interactive = interactable;
    };
    Card.flippedCardForAge = function (age, activeWonder) {
        var card = new Card(-1, { age: age, name: '', color: 'brown', effects: [] }, new PIXI.Point(), activeWonder, new PIXI.Container());
        card.state = { type: 'permanent_flipped' };
        card.update();
        return card;
    };
    return Card;
}(PIXI.Container));
var GameStateDiffer;
(function (GameStateDiffer) {
    function diffNonTurn(gamestate) {
        var e_10, _a;
        var result = {
            scripts: []
        };
        try {
            for (var _b = __values(Main.gamestate.players), _c = _b.next(); !_c.done; _c = _b.next()) {
                var player = _c.value;
                diffGold(gamestate, player, result);
                diffCurrentMove(gamestate, player, result);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        return result;
    }
    GameStateDiffer.diffNonTurn = diffNonTurn;
    function diffTurn(gamestate) {
        var result = diffNonTurn(gamestate);
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
    function diffGold(gamestate, player, result) {
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
    function diffCurrentMove(gamestate, player, result) {
        var oldMove = Main.gamestate.playerData[player].currentMove;
        var newMove = gamestate.playerData[player].currentMove;
        var playeri = Main.gamestate.players.indexOf(player);
        // Always reflect current move.
        if (player === Main.player) {
            result.scripts.push(function () {
                return __generator(this, function (_a) {
                    Main.scene.hand.reflectMove(newMove);
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
    function Hand(container, cardIds, activeWonder, discardPile) {
        this.cards = [];
        this.collapsed = false;
        for (var i = 0; i < cardIds.length; i++) {
            var card = new Card(cardIds[i], Main.gamestate.cards[cardIds[i]], new PIXI.Point(), activeWonder, discardPile);
            this.cards.push(card);
            container.addChild(card);
            card.state = { type: 'in_hand', visualState: 'full' };
        }
        this.adjustPositions();
    }
    Object.defineProperty(Hand.prototype, "selectedCard", {
        get: function () {
            var e_11, _a;
            try {
                for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var card = _c.value;
                    if (card.state.type.startsWith('locked'))
                        return card;
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    Hand.prototype.update = function () {
        for (var i = 0; i < this.cards.length; i++) {
            if (this.collapsed) {
                this.cards[i].handPosition.x = lerp(this.cards[i].handPosition.x, this.collapsedPosition.x, 0.125);
                this.cards[i].handPosition.y = lerp(this.cards[i].handPosition.y, this.collapsedPosition.y, 0.125);
            }
            else {
                this.cards[i].handPosition.x = lerp(this.cards[i].handPosition.x, this.normalHandPositions[i].x, 0.125);
                this.cards[i].handPosition.y = lerp(this.cards[i].handPosition.y, this.normalHandPositions[i].y, 0.125);
            }
            this.cards[i].update();
        }
    };
    Hand.prototype.adjustPositions = function () {
        var handY = 140;
        var handDX = 136;
        this.normalHandPositions = [];
        this.handPositions = [];
        this.collapsedPosition = new PIXI.Point(Main.width / 2, handY);
        for (var i = 0; i < this.cards.length; i++) {
            var normalHandPosition = new PIXI.Point(Main.width / 2 + handDX * (i - (this.cards.length - 1) / 2), handY);
            this.normalHandPositions.push(normalHandPosition);
            var handPosition = new PIXI.Point(normalHandPosition.x, normalHandPosition.y);
            this.handPositions.push(handPosition);
            this.cards[i].handPosition = handPosition;
            this.cards[i].position.set(handPosition.x, handPosition.y);
            this.cards[i].scale.set(2);
        }
    };
    Hand.prototype.reflectMove = function (move) {
        var e_12, _a, e_13, _b;
        if (!move) {
            try {
                for (var _c = __values(this.cards), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var card = _d.value;
                    card.deselect();
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
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
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_13) throw e_13.error; }
        }
        if (!moved)
            console.error('Move card not found in hand:', move);
    };
    Hand.prototype.collapse = function () {
        this.collapsed = true;
    };
    Hand.prototype.uncollapse = function () {
        this.collapsed = false;
    };
    Hand.prototype.flip = function () {
        var e_14, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                if (card.state.type === 'in_hand')
                    card.state.visualState = 'flipped';
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
    Hand.prototype.unflip = function () {
        var e_15, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                if (card.state.type === 'in_hand')
                    card.state.visualState = 'full';
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
    Hand.prototype.setVisible = function (value) {
        var e_16, _a;
        try {
            for (var _b = __values(this.cards), _c = _b.next(); !_c.done; _c = _b.next()) {
                var card = _c.value;
                card.visible = value;
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_16) throw e_16.error; }
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
    Object.defineProperty(Main, "height", {
        get: function () { return this.app.view.height; },
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
        this.initialized = true;
        this.scene = new Scene();
        this.app.stage.addChild(this.scene.mainContainer);
        this.createScene();
        this.sendUpdate();
    };
    Main.update = function () {
        if (this.scene)
            this.scene.update();
        this.scriptManager.update();
    };
    Main.createScene = function () {
        if (!this.initialized)
            return;
        this.scene.create();
        this.resize();
    };
    Main.adjustPositions = function () {
        if (!this.initialized)
            return;
        this.scene.adjustPositions();
    };
    Main.resize = function () {
        this.adjustPositions();
        var sceneBounds = this.app.stage.getBounds();
        this.app.renderer.resize(window.innerWidth, sceneBounds.y + sceneBounds.height + 400);
        this.adjustPositions();
    };
    Main.sendUpdate = function () {
        var _this = this;
        if (this.gamestate.state === 'GAME_COMPLETE')
            return;
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
            //console.log('Refreshed gamestate:', gamestate);
            if (gamestate.turn < Main.gamestate.turn) {
                Main.error("Error: local turn (" + Main.gamestate.turn + ") is greater than the game's (" + gamestate.turn + ")?");
                _this.sendUpdate();
                return;
            }
            else if (gamestate.turn === Main.gamestate.turn) {
                var diffResult = GameStateDiffer.diffNonTurn(gamestate);
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.gamestate = gamestate;
                    _this.sendUpdate();
                })));
            }
            else {
                var diffResult = GameStateDiffer.diffTurn(gamestate);
                _this.scriptManager.runScript(S.chain(S.simul.apply(S, __spread(diffResult.scripts)), S.call(function () {
                    _this.gamestate = gamestate;
                    _this.createScene();
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
                //this.deselect();
                //Main.undoMove();
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
        var _loop_1 = function (player) {
            if (player.startsWith('BOT') && !this_1.gamestate.playerData[player].currentMove) {
                var botPlayer_1 = player;
                API.getvalidmoves(this_1.gameid, this_1.gamestate.turn, botPlayer_1, function (validMoves, error) {
                    if (error) {
                        Main.error(error);
                        return;
                    }
                    if (validMoves.length === 0)
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
        this.wonderStartY = 700;
        this.wonderDY = 500;
        this.mainContainer = new PIXI.Container();
    }
    Object.defineProperty(Scene.prototype, "isPaymentMenuActive", {
        get: function () {
            return this.paymentMenu && this.paymentMenu.visible;
        },
        enumerable: false,
        configurable: true
    });
    Scene.prototype.update = function () {
        this.setStateText();
        this.hand.update();
        this.discardHand.update();
        var myDiscardTurn = this.myTurnToBuildFromDiscard();
        this.hand.setVisible(!myDiscardTurn);
        this.discardHand.setVisible(myDiscardTurn);
    };
    Scene.prototype.create = function () {
        var gamestate = Main.gamestate;
        var player = Main.player;
        var discardWidth = 250;
        var discardHeight = 300;
        this.mainContainer.removeChildren();
        this.discardPile = new PIXI.Container();
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth / 2, -discardHeight / 2, discardWidth, discardHeight, 10, 0x888888));
        this.discardPile.addChild(Shapes.filledRoundedRect(-discardWidth / 2 + 4, -discardHeight / 2 + 4, discardWidth - 8, discardHeight - 8, 6, 0x000000));
        var discardTitle = new PIXI.Text("Discard", { fontFamily: 'Arial', fontSize: 70, fill: 0x888888 });
        discardTitle.anchor.set(0.5, 0.5);
        discardTitle.scale.set(0.35, 0.35);
        discardTitle.position.set(0, -125);
        this.discardPile.addChild(discardTitle);
        this.mainContainer.addChild(this.discardPile);
        this.wonders = [];
        for (var i = 0; i < gamestate.players.length; i++) {
            var player_1 = gamestate.players[i];
            var wonder = new Wonder(gamestate.wonders[player_1], gamestate.playerData[player_1], player_1);
            this.mainContainer.addChild(wonder);
            this.wonders.push(wonder);
        }
        this.hand = new Hand(this.mainContainer, gamestate.hand, this.wonders[gamestate.players.indexOf(player)], this.discardPile);
        this.hand.reflectMove(gamestate.playerData[player].currentMove);
        this.discardHand = new Hand(this.mainContainer, gamestate.discardedCards || [], this.wonders[gamestate.players.indexOf(player)], this.discardPile);
        this.discardHand.reflectMove(gamestate.playerData[player].currentMove);
        this.paymentMenu = new PIXI.Container();
        this.paymentMenu.visible = false;
        this.mainContainer.addChild(this.paymentMenu);
        this.statusBar = new PIXI.Container();
        this.statusBar.addChild(Shapes.filledRoundedRect(-400, -50, 800, 100, 20, 0xDDDDDD));
        this.mainContainer.addChild(this.statusBar);
        this.statusText = new PIXI.Text("", { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        this.statusText.anchor.set(0.5, 0.5);
        this.statusText.scale.set(0.4, 0.4);
        this.statusText.position.set(0, 22);
        this.statusBar.addChild(this.statusText);
        this.adjustPositions();
        this.setStateText();
        this.update();
    };
    Scene.prototype.adjustPositions = function () {
        var gamestate = Main.gamestate;
        var player = Main.player;
        var wonderScale = 2.5;
        var wonderDX = Main.width / 4;
        var discardY = 1200;
        // WONDERS
        var p = gamestate.players.indexOf(player);
        this.wonders[p].position.set(Main.width / 2, this.wonderStartY);
        this.wonders[p].scale.set(wonderScale);
        var l = mod(p - 1, gamestate.players.length);
        var r = mod(p + 1, gamestate.players.length);
        var i;
        for (i = 1; i < gamestate.players.length / 2; i++) {
            this.wonders[l].position.set(Main.width / 2 - wonderDX, this.wonderStartY + this.wonderDY * i);
            this.wonders[l].scale.set(wonderScale);
            this.wonders[r].position.set(Main.width / 2 + wonderDX, this.wonderStartY + this.wonderDY * i);
            this.wonders[r].scale.set(wonderScale);
            l = mod(l - 1, gamestate.players.length);
            r = mod(r + 1, gamestate.players.length);
        }
        if (gamestate.players.length % 2 === 0) {
            this.wonders[l].position.set(Main.width / 2, this.wonderStartY + this.wonderDY * i);
            this.wonders[l].scale.set(wonderScale);
        }
        // DISCARD PILE
        this.discardPile.position.set(Main.width / 2, discardY);
        this.statusBar.position.set(Main.width / 2, 0);
        this.hand.adjustPositions();
    };
    Scene.prototype.startPaymentDialog = function (move, x, y) {
        var _this = this;
        var validPayments = API.minimalPaymentOptions(move, Main.gamestate.validMoves);
        var paymentsStart = -100;
        var paymentsDX = 50;
        var paymentsDY = 50;
        this.paymentMenu.position.set(x, y);
        this.paymentMenu.removeChildren();
        var paymentTitle = new PIXI.Text("Payment", { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
        paymentTitle.anchor.set(0.5, 0.5);
        paymentTitle.scale.set(0.35, 0.35);
        paymentTitle.position.set(0, -160);
        this.paymentMenu.addChild(paymentTitle);
        var _a = __read(API.getNeighbors(Main.gamestate, Main.player), 2), negPlayer = _a[0], posPlayer = _a[1];
        var _loop_2 = function (i) {
            var payment = validPayments[i];
            if (payment.neg) {
                var paymentTextNeg = new PIXI.Text("<-- " + payment.neg + " to " + negPlayer, { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
                paymentTextNeg.anchor.set(1, 0.5);
                paymentTextNeg.scale.set(0.35, 0.35);
                paymentTextNeg.position.set(-paymentsDX, paymentsStart + i * paymentsDY);
                this_2.paymentMenu.addChild(paymentTextNeg);
            }
            if (payment.pos) {
                var paymentTextPos = new PIXI.Text("to " + posPlayer + " " + payment.pos + " -->", { fontFamily: 'Arial', fontSize: 70, fill: 0x000000 });
                paymentTextPos.anchor.set(0, 0.5);
                paymentTextPos.scale.set(0.35, 0.35);
                paymentTextPos.position.set(paymentsDX, paymentsStart + i * paymentsDY);
                this_2.paymentMenu.addChild(paymentTextPos);
            }
            var paymentButton = Shapes.filledRoundedRect(-28, -20, 56, 40, 8, 0x000088);
            paymentButton.position.set(0, paymentsStart + i * paymentsDY);
            paymentButton.interactive = true;
            paymentButton.buttonMode = true;
            paymentButton.on('click', function () {
                var trueMove = {
                    action: move.action,
                    card: move.card,
                    stage: move.stage,
                    payment: validPayments[i]
                };
                Main.submitMove(trueMove);
                _this.paymentMenu.visible = false;
            });
            this_2.paymentMenu.addChild(paymentButton);
        };
        var this_2 = this;
        for (var i = 0; i < validPayments.length; i++) {
            _loop_2(i);
        }
        var bounds = this.paymentMenu.getLocalBounds();
        var halfWidth = Math.max(Math.abs(bounds.left), Math.abs(bounds.left + bounds.width));
        var margin = 20;
        var closeButton = Shapes.filledRoundedRect(-20, -20, 40, 40, 3, 0xFFFFFF);
        closeButton.position.set(halfWidth - 10, bounds.top + 10);
        this.paymentMenu.addChild(closeButton);
        var X = ArtCommon.X(0x000000);
        X.scale.set(0.3);
        closeButton.addChild(X);
        closeButton.interactive = true;
        closeButton.buttonMode = true;
        closeButton.on('click', function () {
            _this.paymentMenu.visible = false;
        });
        this.paymentMenu.addChildAt(Shapes.filledRoundedRect(-halfWidth - margin, bounds.top - margin, 2 * halfWidth + 2 * margin, bounds.height + 2 * margin + 40, 10, 0xFFFFFF), 0);
        this.paymentMenu.visible = true;
        this.paymentMenu.parent.setChildIndex(this.paymentMenu, this.paymentMenu.parent.children.length - 1);
    };
    Scene.prototype.setStateText = function () {
        var gamestate = Main.gamestate;
        var playerData = gamestate.playerData[Main.player];
        if (gamestate.state === 'NORMAL_MOVE') {
            if (playerData.currentMove) {
                this.statusText.text = "Waiting for others to move";
            }
            else {
                this.statusText.text = "You must play a card";
            }
        }
        else if (gamestate.state === 'LAST_CARD_MOVE') {
            if (playerData.currentMove || gamestate.validMoves.length === 0) {
                this.statusText.text = "Waiting for others to play their last card";
            }
            else {
                this.statusText.text = "You may play your last card";
            }
        }
        else if (gamestate.state === 'DISCARD_MOVE') {
            if (gamestate.discardMoveQueue[0] === Main.player) {
                this.statusText.text = "You may build a card from the discard pile";
            }
            else {
                this.statusText.text = "Waiting for " + gamestate.discardMoveQueue[0] + " to build a card from the discard pile";
            }
        }
        else if (gamestate.state === 'GAME_COMPLETE') {
            this.statusText.text = "Game complete";
        }
    };
    Scene.prototype.myTurnToBuildFromDiscard = function () {
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
function randInt(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
}
function randElement(array) {
    return array[randInt(0, array.length - 1)];
}
function sum(array, key) {
    var e_18, _a;
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
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (array_1_1 && !array_1_1.done && (_a = array_1.return)) _a.call(array_1);
        }
        finally { if (e_18) throw e_18.error; }
    }
    return result;
}
var Wonder = /** @class */ (function (_super) {
    __extends(Wonder, _super);
    function Wonder(wonder, playerData, player) {
        var e_19, _a, e_20, _b;
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
            for (var _c = __values(playerData.playedCards), _d = _c.next(); !_d.done; _d = _c.next()) {
                var cardId = _d.value;
                var card = Main.gamestate.cards[cardId];
                var cardArt = new Card(cardId, card, new PIXI.Point(), _this, new PIXI.Container());
                _this.addNewCardEffect(cardArt);
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_19) throw e_19.error; }
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
            for (var _e = __values(playerData.stagesBuilt), _f = _e.next(); !_f.done; _f = _e.next()) {
                var stageBuilt = _f.value;
                var cardArt = Card.flippedCardForAge(stageBuilt.cardAge, _this);
                cardArt.state = { type: 'permanent_flipped' };
                cardArt.update();
                cardArt.position.set(_this.stageXs[stageBuilt.stage], 5);
                _this.addChildAt(cardArt, 0);
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_20) throw e_20.error; }
        }
        var goldCoin = Shapes.filledCircle(95, -58, 5, 0xFBE317);
        _this.addChild(goldCoin);
        _this.goldText = new PIXI.Text("" + playerData.gold, { fontFamily: 'Arial', fontSize: 70, fill: 0xFFFFFF });
        _this.goldText.anchor.set(1, 0.5);
        _this.goldText.scale.set(0.12);
        _this.goldText.position.set(87, -58);
        _this.addChild(_this.goldText);
        var playerText = new PIXI.Text(player, { fontFamily: 'Arial', fontSize: 70, fill: 0xFFFFFF });
        playerText.anchor.set(1, 0.5);
        playerText.scale.set(0.12);
        playerText.position.set(100, -70);
        _this.addChild(playerText);
        if (player !== Main.player && Main.gamestate.playerData[player].handCount > 0) {
            _this.handRepr = Card.flippedCardForAge(Main.gamestate.age, _this);
            _this.handRepr.scale.set(0.2);
            _this.handRepr.position.set(93, -95);
            _this.moveRepr = Card.flippedCardForAge(Main.gamestate.age, _this);
            _this.moveRepr.scale.set(_this.handRepr.scale.x, _this.handRepr.scale.y);
            _this.moveRepr.position.set(_this.handRepr.x, _this.handRepr.y);
            var checkMark = ArtCommon.checkMark();
            checkMark.scale.set(0.5);
            checkMark.position.set(0, 36);
            _this.moveRepr.addChild(checkMark);
            if (playerData.currentMove) {
                _this.moveRepr.x -= 15;
            }
            _this.addChild(_this.moveRepr);
            _this.addChild(_this.handRepr);
        }
        return _this;
    }
    Wonder.prototype.getMainRegion = function () {
        return new PIXI.Rectangle(this.x + -100 * this.scale.x, this.y + -75 * this.scale.y, 200 * this.scale.x, 100 * this.scale.y);
    };
    Wonder.prototype.getStageRegion = function () {
        return new PIXI.Rectangle(this.x + -100 * this.scale.x, this.y + 25 * this.scale.y, 200 * this.scale.x, 50 * this.scale.y);
    };
    Wonder.prototype.getClosestStageId = function (position) {
        var minStage = 0;
        for (var i = 0; i < this.stageXs.length; i++) {
            if (Math.abs(this.x + this.stageXs[i] * this.scale.x - position.x) < Math.abs(this.x + this.stageXs[minStage] * this.scale.x - position.x)) {
                minStage = i;
            }
        }
        return minStage;
    };
    Wonder.prototype.getCardPositionForStage = function (stage) {
        return new PIXI.Point(this.x + this.stageXs[stage] * this.scale.x, this.y + 5 * this.scale.y);
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
        cardArt.state = { type: 'permanent_effect' };
        cardArt.update();
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
    Wonder.prototype.makeMove = function () {
        var _this = this;
        if (!this.moveRepr || !this.handRepr)
            return;
        Main.scriptManager.runScript(S.doOverTime(0.1, function (t) { return _this.moveRepr.x = _this.handRepr.x - 15 * t; }));
    };
    Wonder.prototype.undoMove = function () {
        var _this = this;
        if (!this.moveRepr || !this.handRepr)
            return;
        Main.scriptManager.runScript(S.doOverTime(0.1, function (t) { return _this.moveRepr.x = _this.handRepr.x - 15 * (1 - t); }));
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
            var scriptFunctions_1, scriptFunctions_1_1, scriptFunction, e_21_1;
            var e_21, _a;
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
                        e_21_1 = _b.sent();
                        e_21 = { error: e_21_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (scriptFunctions_1_1 && !scriptFunctions_1_1.done && (_a = scriptFunctions_1.return)) _a.call(scriptFunctions_1);
                        }
                        finally { if (e_21) throw e_21.error; }
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
