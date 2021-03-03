namespace Script {
    export type Function = () => IterableIterator<Script.Function | (() => IterableIterator<Script.Function>)[]>;
}

class Script {
    iterator: IterableIterator<any>;

    paused: boolean;
    done: boolean;

    constructor(scriptFunction: Script.Function) {
        this.iterator = this.buildIterator(scriptFunction)();
    }

    get running() {
        return !this.paused && !this.done;
    }

    update() {
        if (!this.running) return;

        let result = this.iterator.next();
        if (result.done) {
            this.done = true;
        }
    }

    finishImmediately(maxIters: number = Script.FINISH_IMMEDIATELY_MAX_ITERS) {
        for (let i = 0; i < maxIters && !this.done; i++) {
            this.update();
        }
        
        if (!this.done) {
            console.error('Warning: script finishImmediately exceeded max iters!', this);
            this.done = true;
        }
    }

    stop() {
        this.done = true;
    }

    private buildIterator(scriptFunction: Script.Function) {
        return function*() {
            let iterator = scriptFunction();

            while (true) {
                let result = iterator.next();
                if (!result.done) {  // Normal yield statement.
                    yield;
                }
                if (result.done) break;
            }
        };
    }

    static FINISH_IMMEDIATELY_MAX_ITERS = 1000000;
}

namespace Script {
    export function instant(scriptFunction: Script.Function, maxIters?: number) {
        new Script(scriptFunction).finishImmediately(maxIters);
    }
}