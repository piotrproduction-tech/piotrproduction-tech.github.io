// CityCore_12.x/chaos/CityChaosMonkey.js

export function createCityChaosMonkey({ app }) {
  let running = false;
  let timer = null;

  function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function sabotageDistrict(district) {
    const actions = [
      () => district.eventBus.emit("nonexistent_event", { chaos: true }),
      () => district.store?.setSnapshot?.({ corrupted: Math.random() }),
      () => district.workflows?.step?.({ chaos: Math.random() }),
      () => district.ai?.process?.({ corrupted: true }),
      () => app.runtime.router.navigateToDistrict("UNKNOWN_DISTRICT"),
      () => app.runtime.router.navigateToView("INVALID_VIEW"),
      () => { throw new Error("ChaosMonkey: artificial engine failure"); }
    ];

    const action = randomChoice(actions);

    try {
      action();
    } catch (err) {
      console.log("[CHAOS] District failure:", err.message);
    }
  }

  function cycle() {
    const districts = app.runtime.router.districts;
    const district = randomChoice(districts);
    sabotageDistrict(district);
  }

  function start(interval = 300) {
    if (running) return;
    running = true;

    timer = setInterval(cycle, interval);
    console.log("CityChaosMonkey started.");
  }

  function stop() {
    running = false;
    if (timer) clearInterval(timer);
    console.log("CityChaosMonkey stopped.");
  }

  return {
    start,
    stop
  };
}

