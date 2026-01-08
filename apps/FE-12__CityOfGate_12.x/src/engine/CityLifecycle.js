// apps/FE-12__CityOfGate_12.x/src/engine/CityLifecycle.js

export function createCityLifecycle() {
  let currentDistrict = null;
  let heartbeatRef = null;

  return {
    start({ district, heartbeat }) {
      currentDistrict = district;
      heartbeatRef = heartbeat;

      if (district.engine?.onInit) {
        district.engine.onInit(district.state);
      }

      if (district.engine?.onHeartbeat) {
        district.engine.onHeartbeat(heartbeatRef);
      }

      console.log("🏙️ City started:", district.id);
    },

    stop() {
      if (currentDistrict?.engine?.onStop) {
        currentDistrict.engine.onStop(currentDistrict.state);
      }

      console.log("🛑 City stopped");
    },

    reset() {
      if (currentDistrict?.engine?.onReset) {
        currentDistrict.engine.onReset(currentDistrict.state);
      }

      console.log("🔄 City reset");
    }
  };
}
