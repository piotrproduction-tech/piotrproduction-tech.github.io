class CityStateCache {
    constructor() {
        this.state = null;
    }

    set(state) {
        this.state = state;
    }

    get() {
        return this.state;
    }
}
module.exports = CityStateCache;
