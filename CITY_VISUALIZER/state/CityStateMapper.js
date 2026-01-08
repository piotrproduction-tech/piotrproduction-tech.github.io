class CityStateMapper {
    map(rawState) {
        return {
            districts: rawState.districts || [],
            overlays: rawState.overlays || [],
            highlights: rawState.highlights || [],
            meta: rawState.meta || {}
        };
    }
}
module.exports = CityStateMapper;
