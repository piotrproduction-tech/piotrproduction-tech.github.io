const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const WF = path.join(BE01, "workflow");

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

function workflowSubmissions() {
  const file = path.join(WF, "submissions.js");
  const marker = "// WF_SUBMISSIONS_CORE";

  const block = `
// WF_SUBMISSIONS_CORE
// Core workflow for festival submissions

export function createSubmissionWorkflow(globalState, payload) {
  globalState.festival = globalState.festival || {};
  globalState.festival.submissions = globalState.festival.submissions || [];

  const submission = {
    id: "sub_" + Date.now(),
    title: payload.title,
    director: payload.director,
    category: payload.category,
    synopsis: payload.synopsis,
    createdAt: Date.now(),
    status: "submitted"
  };

  globalState.festival.submissions.push(submission);

  return {
    submission,
    events: [
      {
        type: "FESTIVAL_SUBMISSION_CREATED",
        submissionId: submission.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function listSubmissionsWorkflow(globalState) {
  const submissions = globalState.festival?.submissions || [];
  return { submissions };
}

export function getSubmissionDetailsWorkflow(globalState, id) {
  const submissions = globalState.festival?.submissions || [];
  const found = submissions.find(s => s.id === id);
  return { submission: found || null };
}
`;

  appendIfMissing(file, marker, block);
}

function workflowJury() {
  const file = path.join(WF, "jury.js");
  const marker = "// WF_JURY_CORE";

  const block = `
// WF_JURY_CORE
// Core workflow for jury assignments and voting

export function listJuryMembersWorkflow(globalState) {
  const jury = globalState.festival?.jury || [];
  return { jury };
}

export function assignSubmissionToJuryWorkflow(globalState, { submissionId, juryId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.assignments = globalState.festival.assignments || [];

  const assignment = {
    id: "assign_" + Date.now(),
    submissionId,
    juryId,
    assignedAt: Date.now()
  };

  globalState.festival.assignments.push(assignment);

  return {
    assignment,
    events: [
      {
        type: "FESTIVAL_JURY_ASSIGNED",
        submissionId,
        juryId,
        timestamp: Date.now()
      }
    ]
  };
}

export function listJuryAssignmentsWorkflow(globalState) {
  const assignments = globalState.festival?.assignments || [];
  return { assignments };
}

export function listJuryAssignmentsForUserWorkflow(globalState, userId) {
  const assignments = (globalState.festival?.assignments || []).filter(
    a => a.juryId === userId
  );
  return { assignments };
}

export function submitJuryVoteWorkflow(globalState, { submissionId, score, comment, juryId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.votes = globalState.festival.votes || [];

  const vote = {
    id: "vote_" + Date.now(),
    submissionId,
    score,
    comment,
    juryId,
    votedAt: Date.now()
  };

  globalState.festival.votes.push(vote);

  return {
    vote,
    events: [
      {
        type: "FESTIVAL_JURY_VOTED",
        submissionId,
        juryId,
        score,
        timestamp: Date.now()
      }
    ]
  };
}
`;

  appendIfMissing(file, marker, block);
}

function workflowAwards() {
  const file = path.join(WF, "awards.js");
  const marker = "// WF_AWARDS_CORE";

  const block = `
// WF_AWARDS_CORE
// Core workflow for award categories and granting awards

export function listAwardCategoriesWorkflow(globalState) {
  const cats = globalState.festival?.awardCategories || [];
  return { categories: cats };
}

export function createAwardCategoryWorkflow(globalState, { name, description }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.awardCategories = globalState.festival.awardCategories || [];

  const category = {
    id: "awardcat_" + Date.now(),
    name,
    description,
    createdAt: Date.now()
  };

  globalState.festival.awardCategories.push(category);

  return {
    category,
    events: [
      {
        type: "FESTIVAL_AWARD_CATEGORY_CREATED",
        categoryId: category.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function grantAwardWorkflow(globalState, { categoryId, submissionId }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.awards = globalState.festival.awards || [];

  const award = {
    id: "award_" + Date.now(),
    categoryId,
    submissionId,
    grantedAt: Date.now()
  };

  globalState.festival.awards.push(award);

  return {
    award,
    events: [
      {
        type: "FESTIVAL_AWARD_GRANTED",
        categoryId,
        submissionId,
        timestamp: Date.now()
      }
    ]
  };
}
`;

  appendIfMissing(file, marker, block);
}

function workflowEvents() {
  const file = path.join(WF, "events.js");
  const marker = "// WF_EVENTS_CORE";

  const block = `
// WF_EVENTS_CORE
// Core workflow for festival events

export function listFestivalEventsWorkflow(globalState) {
  const events = globalState.festival?.events || [];
  return { events };
}

export function createFestivalEventWorkflow(globalState, { name, startsAt, endsAt }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.events = globalState.festival.events || [];

  const event = {
    id: "event_" + Date.now(),
    name,
    startsAt,
    endsAt
  };

  globalState.festival.events.push(event);

  return {
    event,
    events: [
      {
        type: "FESTIVAL_EVENT_CREATED",
        eventId: event.id,
        timestamp: Date.now()
      }
    ]
  };
}

export function updateFestivalEventWorkflow(globalState, { id, patch }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.events = globalState.festival.events || [];

  const idx = globalState.festival.events.findIndex(e => e.id === id);
  if (idx === -1) {
    return { event: null };
  }

  globalState.festival.events[idx] = {
    ...globalState.festival.events[idx],
    ...patch,
    updatedAt: Date.now()
  };

  const event = globalState.festival.events[idx];

  return {
    event,
    events: [
      {
        type: "FESTIVAL_EVENT_UPDATED",
        eventId: event.id,
        timestamp: Date.now()
      }
    ]
  };
}
`;

  appendIfMissing(file, marker, block);
}

function workflowSchedule() {
  const file = path.join(WF, "schedule.js");
  const marker = "// WF_SCHEDULE_CORE";

  const block = `
// WF_SCHEDULE_CORE
// Core workflow for festival schedule

export function listFestivalScheduleWorkflow(globalState) {
  const schedule = globalState.festival?.schedule || [];
  return { schedule };
}

export function addToFestivalScheduleWorkflow(globalState, { eventId, slot }) {
  globalState.festival = globalState.festival || {};
  globalState.festival.schedule = globalState.festival.schedule || [];

  const entry = {
    id: "schedule_" + Date.now(),
    eventId,
    slot,
    addedAt: Date.now()
  };

  globalState.festival.schedule.push(entry);

  return {
    entry,
    events: [
      {
        type: "FESTIVAL_SCHEDULE_ENTRY_ADDED",
        eventId,
        slot,
        timestamp: Date.now()
      }
    ]
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion Workflow Generator ===");

  ensureDir(WF);

  workflowSubmissions();
  workflowJury();
  workflowAwards();
  workflowEvents();
  workflowSchedule();

  console.log("=== DONE ===");
}

main();
