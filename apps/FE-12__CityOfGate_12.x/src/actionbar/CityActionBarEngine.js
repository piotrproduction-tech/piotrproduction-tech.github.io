// apps/FE-12__CityOfGate_12.x/src/actionbar/CityActionBarEngine.js

export function createCityActionBarEngine(state) {
  return {
    onHeartbeat(beat) {
      state.pulse = beat;
    },

    onDistrictChange(districtId) {
      state.activeDistrict = districtId;
      this.setActionsForDistrict(districtId);
    },

    setActionsForDistrict(districtId) {
      switch (districtId) {
        case "marketplace":
          state.actions = [
            { id: "buy", label: "Buy" },
            { id: "sell", label: "Sell" }
          ];
          break;

        case "creator":
          state.actions = [
            { id: "create", label: "Create" },
            { id: "publish", label: "Publish" }
          ];
          break;

        case "street":
          state.actions = [
            { id: "walk", label: "Walk" },
            { id: "observe", label: "Observe" }
          ];
          break;

        default:
          state.actions = [];
      }
    }
  };
}
