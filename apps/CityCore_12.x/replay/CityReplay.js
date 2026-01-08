// CityCore_12.x/replay/CityReplay.js

export function createCityReplay({ app, logs }) {
  let index = 0;
  let playing = false;
  let timer = null;

  function apply(entry) {
    const { event, data } = entry;

    if (event === "heartbeat") {
      app.runtime.engine.onHeartbeat?.(data);
    }

    if (event.startsWith("eventBus:")) {
      const [, districtId, evt] = event.split(":");
      const district = app.runtime.router.districts.find(d => d.id === districtId);
      district?.eventBus?.emit(evt, data);
    }

    if (event === "district:switch") {
      app.runtime.router.navigateToDistrict(data.to);
    }

    if (event === "view:render") {
      app.runtime.router.navigateToView(data.view);
    }
  }

  function step() {
    if (index >= logs.length) return false;
    apply(logs[index]);
    index++;
    return true;
  }

  function play(interval = 200) {
    if (playing) return;
    playing = true;

    timer = setInterval(() => {
      if (!step()) stop();
    }, interval);
  }

  function stop() {
    playing = false;
    if (timer) clearInterval(timer);
  }

  function reset() {
    stop();
    index = 0;
  }

  function jumpTo(i) {
    reset();
    for (let j = 0; j < i; j++) step();
  }

  function printStatus() {
    console.log("=== CITY REPLAY ===");
    console.log("Index:", index);
    console.log("Playing:", playing);
    console.log("Total logs:", logs.length);
  }

  return {
    play,
    stop,
    reset,
    step,
    jumpTo,
    printStatus
  };
}

