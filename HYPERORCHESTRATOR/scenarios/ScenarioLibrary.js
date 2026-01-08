class ScenarioLibrary {
    constructor() {
        this.scenarios = new Map();
    }

    register(name, scenario) {
        this.scenarios.set(name, scenario);
    }

    get(name) {
        return this.scenarios.get(name);
    }
}
module.exports = ScenarioLibrary;
