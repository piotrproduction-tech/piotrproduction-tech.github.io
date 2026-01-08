// CityCore_12.x/engine/CityEngine.js

export function createCityEngine({ eventBus, cityState, router, eventBridge }) {
  let binding = null;
  let heartbeatTimer = null;

  function start(user, interval = 1000) {
    if (heartbeatTimer) return;

    cityState.markStarted();
    eventBus.emit("city:started", { at: Date.now() });

    const resolved = router.resolve(user);
    binding = eventBridge.switchDistrict(binding, resolved.activeDistrict);

    heartbeatTimer = setInterval(() => {
      const now = Date.now();
      const beat = {
        now,
        last: cityState.getState().lastHeartbeat,
        delta: now - (cityState.getState().lastHeartbeat || now)
      };

      cityState.markHeartbeat();
      eventBus.emit("city:heartbeat", beat);

      const resolvedNow = router.resolve(user);
      if (resolvedNow.activeDistrict?.id !== resolved.activeDistrict?.id) {
        binding = eventBridge.switchDistrict(binding, resolvedNow.activeDistrict);
      }

      binding?.tick(beat);
    }, interval);
  }

  function stop() {
    if (!heartbeatTimer) return;

    clearInterval(heartbeatTimer);
    heartbeatTimer = null;

    binding?.destroy();
    binding = null;

    cityState.markStopped();
    eventBus.emit("city:stopped", { at: Date.now() });
  }

  function getState() {
    return cityState.getState();
  }

  return {
    start,
    stop,
    getState
  };
}

