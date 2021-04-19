class ScriptManager {
    activeScripts: Script[];

    private getDelta: () => number;

    constructor(getDelta: () => number) {
        this.activeScripts = [];
        this.getDelta = getDelta;
    }

    update() {
        S.getDelta = this.getDelta;
        S.getScriptManager = () => this;
        for (let i = this.activeScripts.length-1; i >= 0; i--) {
            this.activeScripts[i].update();
            if (this.activeScripts[i].done) {
                this.activeScripts.splice(i, 1);
            }
        }
    }
    
    reset() {
        this.activeScripts = [];
    }

    runScript(script: Script | Script.Function) {
        if (script instanceof Script) {
            if (script.done) return;
        } else {
            script = new Script(script);
        }
        this.activeScripts.push(script);
        return script;
    }

}