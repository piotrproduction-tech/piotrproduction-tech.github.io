


// LIFE_EVENTS_SYNC
// Sync layer for festival events workflow

import {
  listFestivalEventsWorkflow,
  createFestivalEventWorkflow,
  updateFestivalEventWorkflow
} from "../workflow/events";

export const eventsSync = {
  list(globalState) {
    return listFestivalEventsWorkflow(globalState);
  },
  create(globalState, payload) {
    return createFestivalEventWorkflow(globalState, payload);
  },
  update(globalState, payload) {
    return updateFestivalEventWorkflow(globalState, payload);
  }
};
