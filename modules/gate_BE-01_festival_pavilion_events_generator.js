const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const EVENTS = path.join(BE01, "events");
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

//
// EMITTERS
//
function emitters() {
  const file = path.join(EVENTS, "emitters.js");
  const marker = "// FESTIVAL_EMITTERS";

  const block = `
// FESTIVAL_EMITTERS
// Emitters for Festival Pavilion events

export function emitSubmissionCreated(submission) {
  return {
    type: "FESTIVAL_SUBMISSION_CREATED",
    submissionId: submission.id,
    payload: submission,
    timestamp: Date.now()
  };
}

export function emitJuryAssigned(assignment) {
  return {
    type: "FESTIVAL_JURY_ASSIGNED",
    submissionId: assignment.submissionId,
    juryId: assignment.juryId,
    payload: assignment,
    timestamp: Date.now()
  };
}

export function emitJuryVoted(vote) {
  return {
    type: "FESTIVAL_JURY_VOTED",
    submissionId: vote.submissionId,
    juryId: vote.juryId,
    score: vote.score,
    payload: vote,
    timestamp: Date.now()
  };
}

export function emitAwardCategoryCreated(category) {
  return {
    type: "FESTIVAL_AWARD_CATEGORY_CREATED",
    categoryId: category.id,
    payload: category,
    timestamp: Date.now()
  };
}

export function emitAwardGranted(award) {
  return {
    type: "FESTIVAL_AWARD_GRANTED",
    categoryId: award.categoryId,
    submissionId: award.submissionId,
    payload: award,
    timestamp: Date.now()
  };
}

export function emitEventCreated(event) {
  return {
    type: "FESTIVAL_EVENT_CREATED",
    eventId: event.id,
    payload: event,
    timestamp: Date.now()
  };
}

export function emitEventUpdated(event) {
  return {
    type: "FESTIVAL_EVENT_UPDATED",
    eventId: event.id,
    payload: event,
    timestamp: Date.now()
  };
}

export function emitScheduleEntryAdded(entry) {
  return {
    type: "FESTIVAL_SCHEDULE_ENTRY_ADDED",
    eventId: entry.eventId,
    slot: entry.slot,
    payload: entry,
    timestamp: Date.now()
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// LISTENERS
//
function listeners() {
  const file = path.join(EVENTS, "listeners.js");
  const marker = "// FESTIVAL_LISTENERS";

  const block = `
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
`;

  appendIfMissing(file, marker, block);
}

//
// EVENT ROUTER (optional but recommended)
//
function router() {
  const file = path.join(EVENTS, "router.js");
  const marker = "// FESTIVAL_EVENT_ROUTER";

  const block = `
// FESTIVAL_EVENT_ROUTER
// Central router for all Festival Pavilion events

import {
  emitSubmissionCreated,
  emitJuryAssigned,
  emitJuryVoted,
  emitAwardCategoryCreated,
  emitAwardGranted,
  emitEventCreated,
  emitEventUpdated,
  emitScheduleEntryAdded
} from "./emitters";

export const festivalEventRouter = {
  submissionCreated(submission) {
    return emitSubmissionCreated(submission);
  },
  juryAssigned(assignment) {
    return emitJuryAssigned(assignment);
  },
  juryVoted(vote) {
    return emitJuryVoted(vote);
  },
  awardCategoryCreated(category) {
    return emitAwardCategoryCreated(category);
  },
  awardGranted(award) {
    return emitAwardGranted(award);
  },
  eventCreated(event) {
    return emitEventCreated(event);
  },
  eventUpdated(event) {
    return emitEventUpdated(event);
  },
  scheduleEntryAdded(entry) {
    return emitScheduleEntryAdded(entry);
  }
};
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion Events Generator ===");

  ensureDir(EVENTS);

  emitters();
  listeners();
  router();

  console.log("=== DONE ===");
}

main();
