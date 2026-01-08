class AIDirector {
    constructor({ profiles, orchestrator }) {
        this.profiles = profiles;
        this.orchestrator = orchestrator;
        this.activeProfile = null;
    }

    loadProfile(name) {
        this.activeProfile = this.profiles.get(name);
    }

    tick(state) {
        if (!this.activeProfile) return;
        const decision = this.activeProfile.evaluate(state);
        if (decision) this.orchestrator.dispatch(decision);
    }
}
module.exports = AIDirector;
