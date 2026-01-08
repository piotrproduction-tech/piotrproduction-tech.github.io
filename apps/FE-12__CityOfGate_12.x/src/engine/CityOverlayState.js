// apps/FE-12__CityOfGate_12.x/src/engine/CityOverlayState.js

export function createCityOverlayState() {
  return {
    visible: false,
    type: null,       // "loading" | "alert" | "transition" | "blackout"
    message: null,
    pulse: 0
  };
}
