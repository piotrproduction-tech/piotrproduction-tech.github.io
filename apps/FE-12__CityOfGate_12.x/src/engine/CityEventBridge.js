// apps/FE-12__CityOfGate_12.x/src/engine/CityEventBridge.js

export function connectDistrictToCity({ engine, state, heartbeat }) {
  if (!engine || !state) {
    console.warn("⚠️ connectDistrictToCity: missing engine or state");
    return { tick() {} };
  }

  if (engine.onHeartbeat) {
    engine.onHeartbeat(heartbeat);
  }

  if (engine.onInit) {
    engine.onInit(state);
  }

  return {
    tick() {
      try {
        if (engine.onTick) {
          engine.onTick(state);
        }
      } catch (err) {
        console.error("❌ District tick error:", err);
      }
    },

    destroy() {
      try {
        if (engine.onDestroy) {
          engine.onDestroy(state);
        }
      } catch (err) {
        console.error("❌ District destroy error:", err);
      }
    }
  };
}
