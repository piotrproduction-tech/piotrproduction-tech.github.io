// CityCore_12.x/debug/CityInspector.js

export function createCityInspector({ app }) {
  function getResolved(user = {}) {
    return app.runtime.router.resolve(user);
  }

  function printHeader() {
    console.log("====================================");
    console.log("         CITY INSPECTOR 12.x        ");
    console.log("====================================");
  }

  function printHeartbeat() {
    const state = app.runtime.cityState.getState();
    console.log("Heartbeat:", state.lastHeartbeat);
    console.log("Started:", state.started);
  }

  function printDistrict() {
    const state = app.runtime.cityState.getState();
    console.log("Active District:", state.activeDistrictId);
  }

  function printView(user = {}) {
    const resolved = getResolved(user);
    console.log("View:", resolved.viewObject?.view);
    console.log("Snapshot:", resolved.viewObject?.snapshot);
  }

  function printPanels(user = {}) {
    const resolved = getResolved(user);
    console.log("HUD:", resolved.immersive?.hud);
    console.log("Overlay:", resolved.immersive?.overlay);
    console.log("Engine Panel:", resolved.immersive?.engine);
  }

  function printEngine(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("Engine State:", district?.state?.getSnapshot?.());
  }

  function printStore(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("Store Snapshot:", district?.store?.getSnapshot?.());
  }

  function printRegistry(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("Registry:", district?.registry?.list?.());
  }

  function printWorkflows(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("Workflows:", district?.workflows?.debug?.());
  }

  function printAI(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("AI Pipeline:", district?.ai?.debug?.());
  }

  function printEventBus(user = {}) {
    const resolved = getResolved(user);
    const district = resolved.activeDistrict;
    console.log("EventBus Listeners:", district?.eventBus?.debug?.());
  }

  function printAll(user = {}) {
    console.clear();
    printHeader();
    printHeartbeat();
    printDistrict();
    printView(user);
    printPanels(user);
    printEngine(user);
    printStore(user);
    printRegistry(user);
    printWorkflows(user);
    printAI(user);
    printEventBus(user);
  }

  function start(interval = 1000, user = {}) {
    setInterval(() => printAll(user), interval);
  }

  return {
    printAll,
    start,
    printHeartbeat,
    printDistrict,
    printView,
    printPanels,
    printEngine,
    printStore,
    printRegistry,
    printWorkflows,
    printAI,
    printEventBus
  };
}

