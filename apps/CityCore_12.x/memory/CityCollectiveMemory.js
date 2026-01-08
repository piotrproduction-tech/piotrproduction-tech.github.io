// CityCore_12.x/memory/CityCollectiveMemory.js

export function createCityCollectiveMemory({
  recorder,
  mythEngine,
  dreamEngine,
  prophecyEngine,
  afterlifeEngine
}) {
  const collectiveMemory = {
    epochs: [],
    lastEpoch: null
  };

  function snapshotEpoch() {
    const timeline = recorder.getTimeline().slice(-20);
    const myths = mythEngine.getMyths().slice(-10);
    const dreams = dreamEngine.getDreams().slice(-5);
    const prophecies = prophecyEngine.getProphecies().slice(-5);
    const afterlife = afterlifeEngine.getAfterlife();

    const epoch = {
      at: Date.now(),
      events: timeline,
      myths,
      dreams,
      prophecies,
      afterlifeSnapshot: afterlife
    };

    collectiveMemory.epochs.push(epoch);
    collectiveMemory.lastEpoch = epoch;
  }

  // Co 45 sekund  nowa epoka
  setInterval(snapshotEpoch, 45000);

  return {
    getCollectiveMemory: () => collectiveMemory
  };
}

