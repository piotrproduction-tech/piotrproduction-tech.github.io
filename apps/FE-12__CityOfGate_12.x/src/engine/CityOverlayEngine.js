// apps/FE-12__CityOfGate_12.x/src/engine/CityOverlayEngine.js

export function createCityOverlayEngine(state) {
  return {
    onHeartbeat(beat) {
      state.pulse = beat;
    },

    show(type, message = null) {
      state.visible = true;
      state.type = type;
      state.message = message;
    },

    hide() {
      state.visible = false;
      state.type = null;
      state.message = null;
    },

    onDistrictChange(districtId) {
      // Przykład: globalna animacja przejścia
      state.visible = true;
      state.type = "transition";
      state.message = `Entering ${districtId}...`;

      setTimeout(() => {
        state.visible = false;
      }, 600);
    }
  };
}
