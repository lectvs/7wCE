namespace S {
    export function call(callback: () => any) {
        return function*() {
            callback();
        }
    }

    export function chain(...scriptFunctions: Script.Function[]) {
        return function*() {
            for (let scriptFunction of scriptFunctions) {
                yield* scriptFunction();
            }
        }
    }

    export function doOverTime(duration: number, callback: (t: number) => any) {
        return function*() {
            let t = 0;
            while (t < duration) {
                t += Main.delta;
                callback(t/duration);
                yield;
            }
            callback(1);
        }
    }

    export function loop(times: number, scriptFunction: Script.Function) {
        return function*() {
            for (let i = 0; i < times; i++) {
                yield* scriptFunction();
                yield;
            }
        }
    }

    export function simul(...scriptFunctions: Script.Function[]) {
        return function*() {
            let scripts = scriptFunctions.map(sf => Main.scriptManager.runScript(sf));
            while (scripts.some(s => !s.done)) {
                yield;
            }
        }
    }

    export function wait(duration: number) {
        return doOverTime(duration, t => null);
    }
}