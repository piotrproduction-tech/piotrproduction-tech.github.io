// Core logic for Festival Pavilion (BE-01)
// Tu wchodzi logika dzielnicy.



// FESTIVAL_ENGINE_BOOTSTRAP
// Full bootstrap of Festival Pavilion Engine (BE-01)

import { festivalRuntimeEngine } from "../life/runtime";
import { festivalNarration } from "../life/narration";
import { submissionsSync } from "../life/submissionsSync";
import { jurySync } from "../life/jurySync";
import { awardsSync } from "../life/awardsSync";
import { eventsSync } from "../life/eventsSync";
import { scheduleSync } from "../life/scheduleSync";

import { getFestivalStatus } from "../diagnostics/status";
import { getFestivalHeartbeat } from "../diagnostics/heartbeat";
import { recordFestivalTimeline, getFestivalTimeline } from "../diagnostics/timeline";

import { festivalEventRouter } from "../events/router";

export function createFestivalEngine() {
  const globalState = {
    festival: {
      submissions: [],
      jury: [],
      assignments: [],
      votes: [],
      awardCategories: [],
      awards: [],
      events: [],
      schedule: [],
      narrative: [],
      timeline: []
    }
  };

  const engine = {
    state: globalState,

    // Runtime dispatch
    dispatch(action) {
      const result = festivalRuntimeEngine.dispatch(globalState, action);
      festivalRuntimeEngine.applySideEffects(globalState, result);
      recordFestivalTimeline(globalState);
      return result;
    },

    // Direct sync access (if needed)
    submissions: submissionsSync,
    jury: jurySync,
    awards: awardsSync,
    events: eventsSync,
    schedule: scheduleSync,

    // Diagnostics
    status() {
      return getFestivalStatus(globalState);
    },
    heartbeat() {
      return getFestivalHeartbeat(globalState);
    },
    timeline() {
      return getFestivalTimeline(globalState);
    },

    // Events
    router: festivalEventRouter,

    // Narrative
    narrative: festivalNarration
  };

  return engine;
}

// Optional: singleton engine for the process
let singletonEngine = null;

export function getFestivalEngine() {
  if (!singletonEngine) {
    singletonEngine = createFestivalEngine();
  }
  return singletonEngine;
}



// FESTIVAL_ENGINE_EVENTBUS_EXPORT
// Export helper for attaching Festival Pavilion to CityEventBus

import { attachFestivalToCityEventBus } from "../events/listeners.js";

export function registerFestivalWithCityEventBus(cityEventBus) {
  return attachFestivalToCityEventBus(cityEventBus);
}
