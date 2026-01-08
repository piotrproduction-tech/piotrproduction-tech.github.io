// FE-21__MarketplaceDistrict_12.x/core/engine.js

export function createEngine({ eventBus, store, registry, workflows, ai, state }) {
  const internal = {
    started: false,
    lastTick: null
  };

  function start() {
    if (internal.started) return;
    internal.started = true;
    internal.lastTick = Date.now();
    eventBus.emit("engine:started", { at: internal.lastTick });
  }

  function stop() {
    if (!internal.started) return;
    internal.started = false;
    eventBus.emit("engine:stopped", { at: Date.now() });
  }

  function tick(context = {}) {
    if (!internal.started) return;

    const now = Date.now();
    const delta = now - (internal.lastTick || now);
    internal.lastTick = now;

    const snapshot = store.getSnapshot();

    eventBus.emit("engine:tick", { now, delta, snapshot, context });

    workflows.run("heartbeat", { now, delta, snapshot, context });
    ai.process("heartbeat", { now, delta, snapshot, context });
  }

  // 🔥 NEW — FE‑12 lifecycle API
  function onInit(stateLayer) {
    eventBus.emit("engine:init", { state: stateLayer.getCoreState() });
  }

  function onHeartbeat(beat) {
    eventBus.emit("engine:heartbeat", { beat });
  }

  function onTick(stateLayer) {
    const snapshot = stateLayer.getCoreState();
    eventBus.emit("engine:tick:external", { snapshot });
  }

  function onDestroy(stateLayer) {
    eventBus.emit("engine:destroy", { state: stateLayer.getCoreState() });
  }

  function dispatch(action, payload = {}) {
    eventBus.emit("engine:action", { action, payload });
    store.dispatch(action, payload);
  }

  return {
    start,
    stop,
    tick,
    dispatch,
    getState: () => ({ ...internal }),

    // 🔥 NEW — required by CityEventBridge
    onInit,
    onHeartbeat,
    onTick,
    onDestroy
  };
}
