namespace Bot {
    export function chooseSide(wonderChoices: API.Wonder[]) {
        return randInt(0, wonderChoices.length-1);
    }

    export function getMove(validMoves: API.Move[]) {
        let wonderMoves = validMoves.filter(move => move.action === 'wonder');
        let playMoves = validMoves.filter(move => move.action === 'play');
        let throwMoves = validMoves.filter(move => move.action === 'throw');

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

    export function getGoldToLose(gold: number, goldToLose: number) {
        return randInt(0, Math.min(gold, goldToLose));
    }
}