const creategame = require('./creategame').creategame;
const getgamestate = require('./getgamestate').getgamestate;
const getvalidmoves = require('./getvalidmoves').getvalidmoves;
const submitmove = require('./submitmove').submitmove;
const undomove = require('./undomove').undomove;
const chooseside = require('./chooseside').chooseside;
const choosegoldtolose = require('./choosegoldtolose').choosegoldtolose;
const updategame = require('./updategame').updategame;
const getusers = require('./getusers').getusers;
const getinvites = require('./getinvites').getinvites;
const setwonderpreferences = require('./setwonderpreferences').setwonderpreferences;
const login = require('./login').login;
const getpatchnotes = require('./getpatchnotes').getpatchnotes;
const cleanup = require('./cleanup').cleanup;


function validateExists(obj, name) {
    if (obj === undefined || obj === '') {
        throw new Error(`${name} must be passed in parameters`);
    }
    return obj;
}

function parseFlagList(flagsString) {
    if (!flagsString) {
        return [];
    }
    return flagsString.split(',').map(flag => flag.trim());
}

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    
    let body = '';
    let statusCode = '200';
    let headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET"
    };

    try {
        let operation = event.queryStringParameters.operation;
        let result;
        
        if (operation === 'creategame') {
            let players = validateExists(event.queryStringParameters.players, 'players').split(',');
            let flags = parseFlagList(event.queryStringParameters.flags);
            let extraCards = parseInt(validateExists(event.queryStringParameters.extracards, 'extracards'));
            result = await creategame(players, flags, extraCards);
        } else if (operation === 'getgamestate') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            result = await getgamestate(gameid, player, password_hash);
        } else if (operation === 'getvalidmoves') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let turn = validateExists(event.queryStringParameters.turn, 'turn');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            result = await getvalidmoves(gameid, turn, player, password_hash);
        } else if (operation === 'submitmove') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let turn = validateExists(event.queryStringParameters.turn, 'turn');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            let move = JSON.parse(validateExists(event.queryStringParameters.move, 'move'));
            move = {
                action: validateExists(move.action, 'move.action'),
                card: validateExists(move.card, 'move.card'),
                index: move.index,
                stage: move.stage,
                copyPlayer: move.copyPlayer,
                copyStage: move.copyStage,
                payment: validateExists(move.payment, 'move.payment')
            };
            result = await submitmove(gameid, turn, player, password_hash, move);
        } else if (operation === 'undomove') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let turn = validateExists(event.queryStringParameters.turn, 'turn');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            result = await undomove(gameid, turn, player, password_hash);
        } else if (operation === 'chooseside') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            let side = validateExists(event.queryStringParameters.side, 'side');
            result = await chooseside(gameid, player, password_hash, side);
        } else if (operation === 'choosegoldtolose') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            let turn = validateExists(event.queryStringParameters.turn, 'turn');
            let player = validateExists(event.queryStringParameters.player, 'player');
            let password_hash = event.queryStringParameters.password_hash;
            let gold_to_lose = validateExists(event.queryStringParameters.gold_to_lose, 'gold_to_lose');
            result = await choosegoldtolose(gameid, turn, player, password_hash, gold_to_lose);
        } else if (operation === 'updategame') {
            let gameid = validateExists(event.queryStringParameters.gameid, 'gameid');
            result = await updategame(gameid);
        } else if (operation === 'getusers') {
            let usernames = validateExists(event.queryStringParameters.usernames, 'usernames').split(',');
            result = await getusers(usernames);
        } else if (operation === 'getinvites') {
            let username = validateExists(event.queryStringParameters.username, 'username');
            result = await getinvites(username);
        } else if (operation === 'setwonderpreferences') {
            let username = validateExists(event.queryStringParameters.username, 'username');
            let password_hash = event.queryStringParameters.password_hash;
            let preferences = validateExists(event.queryStringParameters.preferences, 'preferences');
            result = await setwonderpreferences(username, password_hash, preferences);
        } else if (operation === 'login') {
            let username = validateExists(event.queryStringParameters.username, 'username');
            let password_hash = validateExists(event.queryStringParameters.password_hash, 'password_hash');
            result = await login(username, password_hash);
        } else if (operation === 'getpatchnotes') {
            result = await getpatchnotes();
        } else if (operation === 'cleanup') {
            result = await cleanup();
        } else {
            throw new Error(`Undefined operation: ${operation}`);
        }
        
        if (!result) {
            throw new Error('Result is not set');
        }
        
        body = result;
    } catch (err) {
        //console.error(err.message);
        console.error(err.stack);
        //statusCode = '400';
        body = { error: err.message };
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
