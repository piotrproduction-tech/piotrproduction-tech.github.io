class CityStateView {
    constructor({ mapper, cache }) {
        this.mapper = mapper;
        this.cache = cache;
    }

    update(rawState) {
        const mapped = this.mapper.map(rawState);
        this.cache.set(mapped);
        return mapped;
    }

    get() {
        return this.cache.get();
    }
}
module.exports = CityStateView;
