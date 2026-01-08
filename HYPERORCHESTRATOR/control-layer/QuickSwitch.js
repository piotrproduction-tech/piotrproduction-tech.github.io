class QuickSwitch {
    constructor({ director, scenarioEngine }) {
        this.director = director;
        this.scenarioEngine = scenarioEngine;
    }

    switchProfile(name) {
        this.director.loadProfile(name);
    }

    switchScenario(name) {
        this.scenarioEngine.load(name);
    }
}
module.exports = QuickSwitch;
