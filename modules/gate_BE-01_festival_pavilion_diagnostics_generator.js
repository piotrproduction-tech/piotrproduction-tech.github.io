const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BE01 = path.join(ROOT, "backend", "BE-01__Festival_Pavilion");
const DIAG = path.join(BE01, "diagnostics");

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
// STATUS
//
function statusFile() {
  const file = path.join(DIAG, "status.js");
  const marker = "// DIAG_STATUS";

  const block = `
// DIAG_STATUS
// High-level status of Festival Pavilion

export function getFestivalStatus(globalState) {
  const f = globalState.festival || {};

  return {
    ok: true,
    timestamp: Date.now(),
    submissions: (f.submissions || []).length,
    jury: (f.jury || []).length,
    assignments: (f.assignments || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length,
    schedule: (f.schedule || []).length,
    narrative: (f.narrative || []).length
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// HEARTBEAT
//
function heartbeatFile() {
  const file = path.join(DIAG, "heartbeat.js");
  const marker = "// DIAG_HEARTBEAT";

  const block = `
// DIAG_HEARTBEAT
// Festival Pavilion heartbeat (BPM, mood, load)

export function getFestivalHeartbeat(globalState) {
  const f = globalState.festival || {};

  const bpm = 70 + Math.floor(Math.random() * 25);
  const moods = ["Calm", "Energetic", "Creative", "Tense"];
  const mood = moods[Math.floor(Math.random() * moods.length)];

  const load = {
    submissions: (f.submissions || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length
  };

  return {
    timestamp: Date.now(),
    bpm,
    mood,
    load
  };
}
`;

  appendIfMissing(file, marker, block);
}

//
// TIMELINE
//
function timelineFile() {
  const file = path.join(DIAG, "timeline.js");
  const marker = "// DIAG_TIMELINE";

  const block = `
// DIAG_TIMELINE
// Timeline of festival activity

export function recordFestivalTimeline(globalState) {
  globalState.festival = globalState.festival || {};
  globalState.festival.timeline = globalState.festival.timeline || [];

  const f = globalState.festival;

  const point = {
    timestamp: Date.now(),
    submissions: (f.submissions || []).length,
    votes: (f.votes || []).length,
    awards: (f.awards || []).length,
    events: (f.events || []).length,
    schedule: (f.schedule || []).length
  };

  globalState.festival.timeline.push(point);
  return point;
}

export function getFestivalTimeline(globalState) {
  return globalState.festival?.timeline || [];
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== Festival Pavilion Diagnostics Generator ===");

  ensureDir(DIAG);

  statusFile();
  heartbeatFile();
  timelineFile();

  console.log("=== DONE ===");
}

main();
