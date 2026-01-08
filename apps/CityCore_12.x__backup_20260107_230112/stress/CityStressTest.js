// CityCore_12.x/stress/CityStressTest.js

export function createCityStressTest({ app }) {
  let running = false;
  let timer = null;

  function randomEvent(district) {
    const events = ["update", "tick", "action", "ai", "workflow"];
    const evt = events[Math.floor(Math.random() * events.length)];

    district.eventBus.emit(evt, {
      value: Math.random(),
      time: Date.now()
    });
  }

  function randomWorkflow(district) {
    if (district.workflows?.step) {
      district.workflows.step({
        load: Math.random(),
        timestamp: Date.now()
      });
    }
  }

  function randomAI(district) {
    if (district.ai?.process) {
      district.ai.process({
        input: Math.random(),
        timestamp: Date.now()
      });
    }
  }

  function cycle() {
    for (const district of app.runtime.router.districts) {
      randomEvent(district);
      randomWorkflow(district);
      randomAI(district);
    }
  }

  function start(interval = 50) {
    if (running) return;
    running = true;

    timer = setInterval(cycle, interval);
    console.log("CityStressTest started.");
  }

  function stop() {
    running = false;
    if (timer) clearInterval(timer);
    console.log("CityStressTest stopped.");
  }

  return {
    start,
    stop
  };
}

