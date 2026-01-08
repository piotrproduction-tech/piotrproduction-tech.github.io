// CityCore_12.x/profiler/CityProfiler.js

export function createCityProfiler({ app }) {
  const samples = [];

  function measure(label, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    samples.push({
      at: Date.now(),
      label,
      duration: end - start
    });

    return result;
  }

  // Patch district engines
  for (const district of app.runtime.router.districts) {
    const engine = district.engine;

    if (engine.onTick) {
      const original = engine.onTick;
      engine.onTick = (state) =>
        measure(`${district.id}:engine:onTick`, () => original(state));
    }

    if (engine.onHeartbeat) {
      const original = engine.onHeartbeat;
      engine.onHeartbeat = (beat) =>
        measure(`${district.id}:engine:onHeartbeat`, () => original(beat));
    }
  }

  // Patch workflow engines
  for (const district of app.runtime.router.districts) {
    const wf = district.workflows;
    if (wf?.step) {
      const original = wf.step;
      wf.step = (...args) =>
        measure(`${district.id}:workflow:step`, () => original(...args));
    }
  }

  // Patch AI pipelines
  for (const district of app.runtime.router.districts) {
    const ai = district.ai;
    if (ai?.process) {
      const original = ai.process;
      ai.process = (...args) =>
        measure(`${district.id}:ai:process`, () => original(...args));
    }
  }

  function getStats() {
    const grouped = {};

    for (const s of samples) {
      if (!grouped[s.label]) grouped[s.label] = [];
      grouped[s.label].push(s.duration);
    }

    const stats = {};
    for (const label in grouped) {
      const arr = grouped[label];
      stats[label] = {
        count: arr.length,
        avg: arr.reduce((a, b) => a + b, 0) / arr.length,
        max: Math.max(...arr),
        min: Math.min(...arr)
      };
    }

    return stats;
  }

  function printStats() {
    console.log("=== CITY PROFILER ===");
    console.log(JSON.stringify(getStats(), null, 2));
  }

  return {
    samples,
    getStats,
    printStats
  };
}

