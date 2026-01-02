// Listener'y zdarzeń dla Festival Pavilion (BE-01)
// Tu podpinamy się pod EventBus / Life Engine.



export function registerListeners(eventBus) {
  eventBus.on("BE-01", (event) => {
    console.log("📡 Event in BE-01:", event);
  });
}



// FESTIVAL_LISTENERS
// Listeners that route events into the runtime engine

import { festivalRuntimeEngine } from "../life/runtime";

export function handleFestivalEvent(globalState, event) {
  const result = festivalRuntimeEngine.dispatch(globalState, {
    type: event.type.replace("FESTIVAL_", ""), // e.g. SUBMISSION_CREATED
    payload: event.payload
  });

  festivalRuntimeEngine.applySideEffects(globalState, result);

  return result;
}

export function attachFestivalListeners(eventBus, globalState) {
  const types = [
    "FESTIVAL_SUBMISSION_CREATED",
    "FESTIVAL_JURY_ASSIGNED",
    "FESTIVAL_JURY_VOTED",
    "FESTIVAL_AWARD_CATEGORY_CREATED",
    "FESTIVAL_AWARD_GRANTED",
    "FESTIVAL_EVENT_CREATED",
    "FESTIVAL_EVENT_UPDATED",
    "FESTIVAL_SCHEDULE_ENTRY_ADDED"
  ];

  for (const t of types) {
    eventBus.on(t, (ev) => handleFestivalEvent(globalState, ev));
  }
}



// FESTIVAL_GLOBAL_EVENTBUS_INTEGRATION
// Attach Festival Pavilion listeners to the global CityEventBus

import { getFestivalEngine } from "../core/index.js";

export function attachFestivalToCityEventBus(cityEventBus) {
  const engine = getFestivalEngine();

  const festivalEvents = [
    "FESTIVAL_SUBMISSION_CREATED",
    "FESTIVAL_JURY_ASSIGNED",
    "FESTIVAL_JURY_VOTED",
    "FESTIVAL_AWARD_CATEGORY_CREATED",
    "FESTIVAL_AWARD_GRANTED",
    "FESTIVAL_EVENT_CREATED",
    "FESTIVAL_EVENT_UPDATED",
    "FESTIVAL_SCHEDULE_ENTRY_ADDED"
  ];

  for (const type of festivalEvents) {
    cityEventBus.on(type, (event) => {
      const result = engine.dispatch({
        type: event.type.replace("FESTIVAL_", ""),
        payload: event.payload
      });

      engine.narrative.record(engine.state, event);
    });
  }

  return true;
}
