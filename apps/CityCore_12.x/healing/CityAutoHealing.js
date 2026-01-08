// CityCore_12.x/healing/CityAutoHealing.js

export function createCityAutoHealing({ app, errorBoundary }) {
  const recoveryLog = [];
  const lastHealthySnapshots = new Map();

  // Zapisuj zdrowe snapshoty districtw
  function captureHealthyState() {
    const resolved = app.runtime.router.resolve({});
    const district = resolved.activeDistrict;

    if (district?.store?.getSnapshot) {
      lastHealthySnapshots.set(district.id, district.store.getSnapshot());
    }
  }

  // Wywoywane przy kadym bdzie
  function heal(errorEntry) {
    const { source, context } = errorEntry;

    const districtId = source.split(":")[0];
    const district = app.runtime.router.districts.find(d => d.id === districtId);

    if (!district) return;

    const logEntry = {
      at: Date.now(),
      district: districtId,
      source,
      action: []
    };

    // 1. Reset store
    const healthy = lastHealthySnapshots.get(districtId);
    if (healthy && district.store?.setSnapshot) {
      district.store.setSnapshot(healthy);
      logEntry.action.push("store:restored");
    }

    // 2. Restart workflow engine
    if (district.workflows?.reset) {
      district.workflows.reset();
      logEntry.action.push("workflow:reset");
    }

    // 3. Restart AI pipeline
    if (district.ai?.reset) {
      district.ai.reset();
      logEntry.action.push("ai:reset");
    }

    // 4. Restart engine lifecycle
    if (district.engine?.onInit) {
      try {
        district.engine.onInit();
        logEntry.action.push("engine:reinitialized");
      } catch {}
    }

    recoveryLog.push(logEntry);
    console.log("[AUTOHEAL] District recovered:", districtId);
  }

  // Nasuchuj bdw z ErrorBoundary
  setInterval(() => {
    const errors = errorBoundary.errors;
    if (errors.length > 0) {
      const last = errors[errors.length - 1];
      heal(last);
    }
  }, 500);

  // Zapisuj zdrowe snapshoty co 1 sekund
  setInterval(captureHealthyState, 1000);

  return {
    recoveryLog,
    heal
  };
}

