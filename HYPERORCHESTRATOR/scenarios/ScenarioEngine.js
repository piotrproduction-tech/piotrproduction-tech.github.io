class ScenarioEngine {
    constructor({ library, composer, validator }) {
        this.library = library;
        this.composer = composer;
        this.validator = validator;
        this.activeScenario = null;
    }

    load(name) {
        this.activeScenario = this.library.get(name);
    }

    runStep(context) {
        if (!this.activeScenario) return;
        const next = this.activeScenario.next(context);
        if (this.validator.validate(next)) return next;
    }
}
module.exports = ScenarioEngine;
