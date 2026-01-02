


// LIFE_RUNTIME_ENGINE
// Central runtime engine for Festival Pavilion

import { submissionsSync } from "./submissionsSync";
import { jurySync } from "./jurySync";
import { awardsSync } from "./awardsSync";
import { eventsSync } from "./eventsSync";
import { scheduleSync } from "./scheduleSync";
import { festivalNarration } from "./narration";

export const festivalRuntimeEngine = {
  dispatch(globalState, action) {
    switch (action.type) {
      case "CREATE_SUBMISSION":
        return submissionsSync.create(globalState, action.payload);

      case "ASSIGN_JURY":
        return jurySync.assign(globalState, action.payload);

      case "JURY_VOTE":
        return jurySync.vote(globalState, action.payload);

      case "CREATE_AWARD_CATEGORY":
        return awardsSync.createCategory(globalState, action.payload);

      case "GRANT_AWARD":
        return awardsSync.grant(globalState, action.payload);

      case "CREATE_EVENT":
        return eventsSync.create(globalState, action.payload);

      case "UPDATE_EVENT":
        return eventsSync.update(globalState, action.payload);

      case "ADD_SCHEDULE_ENTRY":
        return scheduleSync.add(globalState, action.payload);

      default:
        return { events: [] };
    }
  },

  applySideEffects(globalState, result) {
    if (!result?.events) return;

    for (const ev of result.events) {
      festivalNarration.record(globalState, ev);
    }
  }
};
