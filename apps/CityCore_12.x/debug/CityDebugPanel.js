// CityCore_12.x/debug/CityDebugPanel.js

export function createCityDebugPanel({ runtime }) {
  function print() {
    const state = runtime.cityState.getState();
    const router = runtime.router;
    const resolved = router.resolve({});

    console.clear();
    console.log("=== CITY DEBUG PANEL ===");
    console.log("Heartbeat:", state.lastHeartbeat);
    console.log("Started:", state.started);
    console.log("Active District:", state.activeDistrictId);
    console.log("View:", resolved.viewObject?.view);
    console.log("Snapshot:", resolved.viewObject?.snapshot);
    console.log("Immersive:", resolved.immersive);
  }

  function start(interval = 1000) {
    setInterval(print, interval);
  }

  return {
    print,
    start
  };
}

