// apps/FE-12__CityOfGate_12.x/src/engine/CityMapEngine.js

export function createCityMapEngine(mapState) {
  return {
    onHeartbeat(beat) {
      mapState.pulse = beat;
    },

    onDistrictChange(districtId) {
      mapState.activeDistrict = districtId;
      mapState.highlight = districtId;
    }
  };
}
