


// LIFE_SCHEDULE_SYNC
// Sync layer for festival schedule workflow

import {
  listFestivalScheduleWorkflow,
  addToFestivalScheduleWorkflow
} from "../workflow/schedule";

export const scheduleSync = {
  list(globalState) {
    return listFestivalScheduleWorkflow(globalState);
  },
  add(globalState, payload) {
    return addToFestivalScheduleWorkflow(globalState, payload);
  }
};
