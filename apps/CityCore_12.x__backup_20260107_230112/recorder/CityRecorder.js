// CityCore_12.x/recorder/CityRecorder.js

export function createCityRecorder({ app }) {
  const timeline = [];

  function record() {
    const resolved = app.runtime.router.resolve({});
    const district = resolved.activeDistrict;

    timeline.push({
      at: Date.now(),
      heartbeat: app.runtime.cityState.getState().lastHeartbeat,
      district: district?.id,
      view: resolved.viewObject?.view,
      snapshot: district?.store?.getSnapshot?.(),
      panels: resolved.immersive,
      workflows: district?.workflows?.debug?.(),
      ai: district?.ai?.debug?.()
    });
  }

  function start(interval = 500) {
    return setInterval(record, interval);
  }

  function getTimeline() {
    return timeline;
  }

  function print() {
    console.log("=== CITY RECORDER TIMELINE ===");
    console.log(JSON.stringify(timeline, null, 2));
  }

  return {
    record,
    start,
    getTimeline,
    print
  };
}

