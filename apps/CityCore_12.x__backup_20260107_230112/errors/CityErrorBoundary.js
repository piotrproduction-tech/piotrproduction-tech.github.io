// CityCore_12.x/errors/CityErrorBoundary.js

export function createCityErrorBoundary({ app }) {
  const errors = [];

  function capture(source, err, context = {}) {
    const entry = {
      at: Date.now(),
      source,
      message: err?.message,
      stack: err?.stack,
      context
    };

    errors.push(entry);
    console.log("[ERROR BOUNDARY]", source, err.message);
  }

  // Patch district engines
  for (const district of app.runtime.router.districts) {
    const engine = district.engine;

    for (const key of ["onInit", "onTick", "onHeartbeat", "onDestroy"]) {
      if (engine[key]) {
        const original = engine[key];
        engine[key] = (...args) => {
          try {
            return original(...args);
          } catch (err) {
            capture(`${district.id}:engine:${key}`, err, { args });
          }
        };
      }
    }
  }

  // Patch workflows
  for (const district of app.runtime.router.districts) {
    const wf = district.workflows;
    if (wf?.step) {
      const original = wf.step;
      wf.step = (...args) => {
        try {
          return original(...args);
        } catch (err) {
          capture(`${district.id}:workflow:step`, err, { args });
        }
      };
    }
  }

  // Patch AI pipeline
  for (const district of app.runtime.router.districts) {
    const ai = district.ai;
    if (ai?.process) {
      const original = ai.process;
      ai.process = (...args) => {
        try {
          return original(...args);
        } catch (err) {
          capture(`${district.id}:ai:process`, err, { args });
        }
      };
    }
  }

  // Patch eventBus
  for (const district of app.runtime.router.districts) {
    const eb = district.eventBus;
    const originalEmit = eb.emit;

    eb.emit = (event, payload) => {
      try {
        return originalEmit.call(eb, event, payload);
      } catch (err) {
        capture(`${district.id}:eventBus:${event}`, err, { payload });
      }
    };
  }

  return {
    errors,
    capture
  };
}

