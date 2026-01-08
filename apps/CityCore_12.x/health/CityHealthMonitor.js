// CityCore_12.x/health/CityHealthMonitor.js

export function createCityHealthMonitor({ app }) {
  const metrics = {
    tick: [],
    heartbeat: [],
    workflow: [],
    ai: [],
    events: 0
  };

  function record(label, duration) {
    metrics[label].push(duration);
    if (metrics[label].length > 100) metrics[label].shift();
  }

  // Patch engine tick + heartbeat
  for (const district of app.runtime.router.districts) {
    const engine = district.engine;

    if (engine.onTick) {
      const original = engine.onTick;
      engine.onTick = (state) => {
        const start = performance.now();
        const result = original(state);
        record("tick", performance.now() - start);
        return result;
      };
    }

    if (engine.onHeartbeat) {
      const original = engine.onHeartbeat;
      engine.onHeartbeat = (beat) => {
        const start = performance.now();
        const result = original(beat);
        record("heartbeat", performance.now() - start);
        return result;
      };
    }
  }

  // Patch workflows
  for (const district of app.runtime.router.districts) {
    const wf = district.workflows;
    if (wf?.step) {
      const original = wf.step;
      wf.step = (...args) => {
        const start = performance.now();
        const result = original(...args);
        record("workflow", performance.now() - start);
        return result;
      };
    }
  }

  // Patch AI
  for (const district of app.runtime.router.districts) {
    const ai = district.ai;
    if (ai?.process) {
      const original = ai.process;
      ai.process = (...args) => {
        const start = performance.now();
        const result = original(...args);
        record("ai", performance.now() - start);
        return result;
      };
    }
  }

  // Patch eventBus
  for (const district of app.runtime.router.districts) {
    const eb = district.eventBus;
    const originalEmit = eb.emit;

    eb.emit = (event, payload) => {
      metrics.events++;
      return originalEmit.call(eb, event, payload);
    };
  }

  function getHealth() {
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

    const status = {
      tick: avg(metrics.tick),
      heartbeat: avg(metrics.heartbeat),
      workflow: avg(metrics.workflow),
      ai: avg(metrics.ai),
      events: metrics.events
    };

    let level = "HEALTHY";

    if (status.tick > 10 || status.ai > 15) level = "WARNING";
    if (status.tick > 25 || status.ai > 40) level = "CRITICAL";

    return { level, status };
  }

  return {
    metrics,
    getHealth
  };
}

