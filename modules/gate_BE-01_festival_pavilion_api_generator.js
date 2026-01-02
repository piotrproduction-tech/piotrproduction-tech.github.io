const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");

function appendIfMissing(filePath, marker, block) {
  if (!fs.existsSync(filePath)) {
    console.log("[ERROR] File not found:", filePath);
    return;
  }
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", filePath, "→ added:", marker);
  } else {
    console.log("[SKIP]", filePath, "already has:", marker);
  }
}

function main() {
  console.log("=== Festival Pavilion BE API Generator ===");

  const apiFile = path.join(BE01, "api", "BE-01Api.js");
  if (!fs.existsSync(apiFile)) {
    console.error("[ERROR] BE-01Api.js not found:", apiFile);
    process.exit(1);
  }

  //
  // 1. SUBMISSIONS ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_SUBMISSIONS",
    `
// BE_API_SUBMISSIONS
export function getFestivalSubmissions(req, res) {
  const submissions = global.festival?.submissions || [];
  res.json(submissions);
}

export function createFestivalSubmission(req, res) {
  const payload = req.body || {};
  const submission = {
    id: "sub_" + Date.now(),
    ...payload,
    createdAt: Date.now(),
    status: "submitted"
  };

  global.festival = global.festival || {};
  global.festival.submissions = global.festival.submissions || [];
  global.festival.submissions.push(submission);

  res.json(submission);
}

export function getSubmissionDetails(req, res) {
  const id = req.params.id;
  const submissions = global.festival?.submissions || [];
  const found = submissions.find(s => s.id === id);
  res.json(found || null);
}
`
  );

  //
  // 2. JURY ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_JURY",
    `
// BE_API_JURY
export function getJuryMembers(req, res) {
  const jury = global.festival?.jury || [];
  res.json(jury);
}

export function assignSubmissionToJury(req, res) {
  const { submissionId, juryId } = req.body || {};

  global.festival = global.festival || {};
  global.festival.assignments = global.festival.assignments || [];

  const assignment = {
    id: "assign_" + Date.now(),
    submissionId,
    juryId,
    assignedAt: Date.now()
  };

  global.festival.assignments.push(assignment);
  res.json(assignment);
}

export function getJuryAssignments(req, res) {
  const assignments = global.festival?.assignments || [];
  res.json(assignments);
}

export function getJuryAssignmentsForCurrent(req, res) {
  const userId = req.user?.id || "jury_default";
  const assignments = (global.festival?.assignments || []).filter(a => a.juryId === userId);
  res.json(assignments);
}

export function submitJuryVote(req, res) {
  const { submissionId, score, comment } = req.body || {};

  global.festival = global.festival || {};
  global.festival.votes = global.festival.votes || [];

  const vote = {
    id: "vote_" + Date.now(),
    submissionId,
    score,
    comment,
    votedAt: Date.now()
  };

  global.festival.votes.push(vote);
  res.json(vote);
}
`
  );

  //
  // 3. AWARDS ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_AWARDS",
    `
// BE_API_AWARDS
export function getAwardCategories(req, res) {
  const cats = global.festival?.awardCategories || [];
  res.json(cats);
}

export function createAwardCategory(req, res) {
  const { name, description } = req.body || {};

  global.festival = global.festival || {};
  global.festival.awardCategories = global.festival.awardCategories || [];

  const category = {
    id: "awardcat_" + Date.now(),
    name,
    description,
    createdAt: Date.now()
  };

  global.festival.awardCategories.push(category);
  res.json(category);
}

export function grantAward(req, res) {
  const { categoryId, submissionId } = req.body || {};

  global.festival = global.festival || {};
  global.festival.awards = global.festival.awards || [];

  const award = {
    id: "award_" + Date.now(),
    categoryId,
    submissionId,
    grantedAt: Date.now()
  };

  global.festival.awards.push(award);
  res.json(award);
}
`
  );

  //
  // 4. EVENTS ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_EVENTS",
    `
// BE_API_EVENTS
export function getFestivalEvents(req, res) {
  const events = global.festival?.events || [];
  res.json(events);
}

export function createFestivalEvent(req, res) {
  const { name, startsAt, endsAt } = req.body || {};

  global.festival = global.festival || {};
  global.festival.events = global.festival.events || [];

  const event = {
    id: "event_" + Date.now(),
    name,
    startsAt,
    endsAt
  };

  global.festival.events.push(event);
  res.json(event);
}

export function updateFestivalEvent(req, res) {
  const id = req.params.id;
  const patch = req.body || {};

  global.festival = global.festival || {};
  global.festival.events = global.festival.events || [];

  const idx = global.festival.events.findIndex(e => e.id === id);
  if (idx === -1) return res.json(null);

  global.festival.events[idx] = {
    ...global.festival.events[idx],
    ...patch,
    updatedAt: Date.now()
  };

  res.json(global.festival.events[idx]);
}
`
  );

  //
  // 5. SCHEDULE ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_SCHEDULE",
    `
// BE_API_SCHEDULE
export function getFestivalSchedule(req, res) {
  const schedule = global.festival?.schedule || [];
  res.json(schedule);
}

export function addToFestivalSchedule(req, res) {
  const { eventId, slot } = req.body || {};

  global.festival = global.festival || {};
  global.festival.schedule = global.festival.schedule || [];

  const entry = {
    id: "schedule_" + Date.now(),
    eventId,
    slot,
    addedAt: Date.now()
  };

  global.festival.schedule.push(entry);
  res.json(entry);
}
`
  );

  //
  // 6. STATS ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_STATS",
    `
// BE_API_STATS
export function getFestivalStats(req, res) {
  const f = global.festival || {};
  res.json({
    submissions: (f.submissions || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    pulseBpm: 72 + Math.floor(Math.random() * 20),
    mood: ["Calm", "Energetic", "Creative", "Tense"][Math.floor(Math.random() * 4)]
  });
}

export function getFestivalStatsTimeline(req, res) {
  global.festival = global.festival || {};
  global.festival.timeline = global.festival.timeline || [];

  const point = {
    timestamp: Date.now(),
    submissions: (global.festival.submissions || []).length,
    votes: (global.festival.votes || []).length,
    awards: (global.festival.awards || []).length
  };

  global.festival.timeline.push(point);
  res.json(global.festival.timeline);
}
`
  );

  //
  // 7. HEATMAP ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_HEATMAP",
    `
// BE_API_HEATMAP
export function getFestivalHeatmap(req, res) {
  const f = global.festival || {};
  const subs = f.submissions || [];
  const votes = f.votes || [];
  const awards = f.awards || [];

  const makeHeat = (arr) =>
    arr.map((item, i) => ({
      label: item.id,
      value: Math.floor(Math.random() * 10),
      max: 10
    }));

  res.json({
    submissions: makeHeat(subs),
    jury: makeHeat(votes),
    awards: makeHeat(awards)
  });
}
`
  );

  //
  // 8. NARRATIVE ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_NARRATIVE",
    `
// BE_API_NARRATIVE
export function getFestivalNarrative(req, res) {
  const stories = global.festival?.narrative || [];
  res.json(stories);
}
`
  );

  //
  // 9. AI PREDICTIONS ENDPOINTS
  //
  appendIfMissing(
    apiFile,
    "// BE_API_AI",
    `
// BE_API_AI
export function getFestivalAIPredictions(req, res) {
  res.json({
    hotCategories: ["Najlepszy Film", "Najlepsza Reżyseria"],
    potentialWinners: ["sub_123", "sub_456"]
  });
}
`
  );

  console.log("=== DONE ===");
}

main();
