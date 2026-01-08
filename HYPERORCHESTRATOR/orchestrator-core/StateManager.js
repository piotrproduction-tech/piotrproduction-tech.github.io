class StateManager {
    constructor(initialState = {}) {
        this.state = initialState;
    }

    initialize() {}

    update(partialState) {
        this.state = { ...this.state, ...partialState };
    }

    getState() {
        return this.state;
    }
}
module.exports = StateManager;
