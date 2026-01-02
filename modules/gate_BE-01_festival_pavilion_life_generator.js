const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const LIFE = path.join(BE01, "life");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(filePath, baseContent = "") {
  if (!fs.existsSync(filePath)) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, baseContent, "utf8");
    console.log("[CREATE]", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  ensureFile(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

function syncSubmissions() {
  const file = path.join(LIFE, "submissionsSync.js");
  const marker = "// LIFE_SUBMISSIONS_SYNC";

  const block = `
// LIFE_SUBMISSIONS_SYNC
// Sync layer for submissions workflow

import {
  createSubmissionWorkflow,
  listSubmissionsWorkflow,
  getSubmissionDetailsWorkflow
} from "../workflow/submissions";

export const submissionsSync = {
  create(globalState, payload) {
    return createSubmissionWorkflow(globalState, payload);
  },
  list(globalState) {
    return listSubmissionsWorkflow(globalState);
  },
  details(globalState, id) {
    return getSubmissionDetailsWorkflow(globalState, id);
  }
};
`;

  appendIfMissing(file, marker, block);
}

function syncJury() {
  const file = path.join(LIFE, "jurySync.js");
  const marker = "// LIFE_JURY_SYNC";

  const block = `
// LIFE_JURY_SYNC
// Sync layer for jury workflow

import {
  listJuryMembersWorkflow,
  assignSubmissionToJuryWorkflow,
  listJuryAssignmentsWorkflow,
  listJuryAssignmentsForUserWorkflow,
  submitJuryVoteWorkflow
} from "../workflow/jury";

export const jurySync = {
  list(globalState) {
    return listJuryMembersWorkflow(globalState);
  },
  assign(globalState, payload) {
    return assignSubmissionToJuryWorkflow(globalState, payload);
  },
  assignments(globalState) {
    return listJuryAssignmentsWorkflow(globalState);
  },
  assignmentsForUser(globalState, userId) {
    return listJuryAssignmentsForUserWorkflow(globalState, userId);
  },
  vote(globalState, payload) {
    return submitJuryVoteWorkflow(globalState, payload);
  }
};
`;

  appendIfMissing(file, marker, block);
}

function syncAwards() {
  const file = path.join(LIFE, "awardsSync.js");
  const marker = "// LIFE_AWARDS_SYNC";

  const block = `
// LIFE_AWARDS_SYNC
// Sync layer for awards workflow

import {
  listAwardCategoriesWorkflow,
  createAwardCategoryWorkflow,
  grantAwardWorkflow
} from "../workflow/awards";

export const awardsSync = {
  list(globalState) {
    return listAwardCategoriesWorkflow(globalState);
  },
  createCategory(globalState, payload) {
    return createAwardCategoryWorkflow(globalState, payload);
  },
  grant(globalState, payload) {
    return grantAwardWorkflow(globalState, payload);
  }
};
`;

  appendIfMissing(file, marker, block);
}

function syncEvents() {
  const file = path.join(LIFE, "eventsSync.js");
  const marker = "// LIFE_EVENTS_SYNC";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

function syncSchedule() {
  const file = path.join(LIFE, "scheduleSync.js");
  const marker = "// LIFE_SCHEDULE_SYNC";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

function runtimeEngine() {
  const file = path.join(LIFE, "runtime.js");
  const marker = "// LIFE_RUNTIME_ENGINE";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

function narrationEngine() {
  const file = path.join(LIFE, "narration.js");
  const marker = "// LIFE_NARRATION_ENGINE";

  const block = `
// LIFE_NARRATION_ENGINE
// Narrative engine for Festival Pavilion

export const festivalNarration = {
  record(globalState, event) {
    globalState.festival = globalState.festival || {};
    globalState.festival.narrative = globalState.festival.narrative || [];

    const story = this.toStory(event);
    if (story) {
      globalState.festival.narrative.push({
        text: story,
        timestamp: Date.now()
      });
    }
  },

  toStory(event) {
    switch (event.type) {
      case "FESTIVAL_SUBMISSION_CREATED":
        return "Nowe zgłoszenie festiwalowe zostało dodane.";

      case "FESTIVAL_JURY_ASSIGNED":
        return "Zgłoszenie zostało przydzielone jurorowi.";

      case "FESTIVAL_JURY_VOTED":
        return "Juror oddał głos na zgłoszenie.";

      case "FESTIVAL_AWARD_CATEGORY_CREATED":
        return "Utworzono nową kategorię nagrody.";

      case "FESTIVAL_AWARD_GRANTED":
        return "Przyznano nagrodę festiwalową.";

      case "FESTIVAL_EVENT_CREATED":
        return "Dodano nowe wydarzenie festiwalowe.";

      case "FESTIVAL_EVENT_UPDATED":
        return "Zaktualizowano wydarzenie festiwalowe.";

      case "FESTIVAL_SCHEDULE_ENTRY_ADDED":
        return "Dodano pozycję do harmonogramu.";

      default:
        return null;
    }
  }
};
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion LIFE Generator ===");

  ensureDir(LIFE);

  syncSubmissions();
  syncJury();
  syncAwards();
  syncEvents();
  syncSchedule();
  runtimeEngine();
  narrationEngine();

  console.log("=== DONE ===");
}

main();
