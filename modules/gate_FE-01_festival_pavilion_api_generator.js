const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");

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
  console.log("=== Festival Pavilion API Generator ===");

  const apiFile = path.join(FE01, "api.js");
  if (!fs.existsSync(apiFile)) {
    console.error("[ERROR] api.js not found:", apiFile);
    process.exit(1);
  }

  //
  // 1. SUBMISSIONS API
  //
  appendIfMissing(
    apiFile,
    "// API_SUBMISSIONS",
    `
// API_SUBMISSIONS
export async function getFestivalSubmissions() {
  const res = await fetch("/api/festival/submissions");
  return res.json();
}

export async function createFestivalSubmission(payload) {
  const res = await fetch("/api/festival/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getSubmissionDetails(id) {
  const res = await fetch("/api/festival/submissions/" + id);
  return res.json();
}
`
  );

  //
  // 2. JURY API
  //
  appendIfMissing(
    apiFile,
    "// API_JURY",
    `
// API_JURY
export async function getJuryMembers() {
  const res = await fetch("/api/festival/jury");
  return res.json();
}

export async function assignSubmissionToJury(submissionId, juryId) {
  const res = await fetch("/api/festival/jury/assign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId, juryId })
  });
  return res.json();
}

export async function getJuryAssignments() {
  const res = await fetch("/api/festival/jury/assignments");
  return res.json();
}

export async function getJuryAssignmentsForCurrent() {
  const res = await fetch("/api/festival/jury/my-assignments");
  return res.json();
}

export async function submitJuryVote(submissionId, score, comment) {
  const res = await fetch("/api/festival/jury/vote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ submissionId, score, comment })
  });
  return res.json();
}
`
  );

  //
  // 3. AWARDS API
  //
  appendIfMissing(
    apiFile,
    "// API_AWARDS",
    `
// API_AWARDS
export async function getAwardCategories() {
  const res = await fetch("/api/festival/awards/categories");
  return res.json();
}

export async function createAwardCategory(name, description) {
  const res = await fetch("/api/festival/awards/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description })
  });
  return res.json();
}

export async function grantAward(categoryId, submissionId) {
  const res = await fetch("/api/festival/awards/grant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryId, submissionId })
  });
  return res.json();
}
`
  );

  //
  // 4. EVENTS API
  //
  appendIfMissing(
    apiFile,
    "// API_EVENTS",
    `
// API_EVENTS
export async function getFestivalEvents() {
  const res = await fetch("/api/festival/events");
  return res.json();
}

export async function createFestivalEvent(name, startsAt, endsAt) {
  const res = await fetch("/api/festival/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, startsAt, endsAt })
  });
  return res.json();
}

export async function updateFestivalEvent(id, patch) {
  const res = await fetch("/api/festival/events/" + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch)
  });
  return res.json();
}
`
  );

  //
  // 5. SCHEDULE API
  //
  appendIfMissing(
    apiFile,
    "// API_SCHEDULE",
    `
// API_SCHEDULE
export async function getFestivalSchedule() {
  const res = await fetch("/api/festival/schedule");
  return res.json();
}

export async function addToFestivalSchedule(eventId, slot) {
  const res = await fetch("/api/festival/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventId, slot })
  });
  return res.json();
}
`
  );

  //
  // 6. STATS API
  //
  appendIfMissing(
    apiFile,
    "// API_STATS",
    `
// API_STATS
export async function getFestivalStats() {
  const res = await fetch("/api/festival/stats");
  return res.json();
}

export async function getFestivalStatsTimeline() {
  const res = await fetch("/api/festival/stats/timeline");
  return res.json();
}
`
  );

  //
  // 7. HEATMAP API
  //
  appendIfMissing(
    apiFile,
    "// API_HEATMAP",
    `
// API_HEATMAP
export async function getFestivalHeatmap() {
  const res = await fetch("/api/festival/heatmap");
  return res.json();
}
`
  );

  //
  // 8. NARRATIVE API
  //
  appendIfMissing(
    apiFile,
    "// API_NARRATIVE",
    `
// API_NARRATIVE
export async function getFestivalNarrative() {
  const res = await fetch("/api/festival/narrative");
  return res.json();
}
`
  );

  //
  // 9. AI PREDICTIONS API
  //
  appendIfMissing(
    apiFile,
    "// API_AI",
    `
// API_AI
export async function getFestivalAIPredictions() {
  const res = await fetch("/api/festival/ai/predictions");
  return res.json();
}
`
  );

  console.log("=== DONE ===");
}

main();
