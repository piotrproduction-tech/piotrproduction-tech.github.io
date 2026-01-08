// PANELS/HUDPanel.js

export function createHUDPanel({ store, eventBus }) {
  let lastState = {};

  function compute() {
    const snapshot = store.getSnapshot();
    lastState = {
      coreFlags: snapshot.core?.flags || {},
      mood: snapshot.ai?.mood || "unknown"
    };
  }

  function getHUDState() {
    return lastState;
  }

  function refresh() {
    compute();
  }

  function reset() {
    lastState = {};
  }

  // 🔥 optional: auto-refresh on engine tick
  eventBus?.on?.("engine:tick", refresh);
  eventBus?.on?.("engine:init", refresh);

  compute(); // initial

  return {
    getHUDState,
    refresh,
    reset
  };
}
