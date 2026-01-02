const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const DIRECTOR = path.join(CORE, "director");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function ensureFile(file, base = "") {
  if (!fs.existsSync(file)) {
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, base, "utf8");
    console.log("[CREATE]", file);
  }
}

function appendIfMissing(file, marker, block) {
  ensureFile(file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(file, content + "\n\n" + block, "utf8");
    console.log("[UPDATED]", file, "→", marker);
  }
}

function directorMemory() {
  const file = path.join(DIRECTOR, "festivalAIDirectorMemory.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MEMORY";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MEMORY

// Prosta pamięć w procesie — w przyszłości możesz ją podmienić na persystencję.
const _directorMemory = {
  history: [],
  maxEntries: 200
};

export function rememberDirectorEvent(event) {
  const entry = {
    timestamp: Date.now(),
    ...event
  };

  _directorMemory.history.push(entry);

  if (_directorMemory.history.length > _directorMemory.maxEntries) {
    _directorMemory.history.shift();
  }
}

export function getDirectorHistory(limit = 50) {
  if (!_directorMemory.history.length) return [];
  return _directorMemory.history.slice(-limit);
}

export function getLastDirectorState() {
  if (!_directorMemory.history.length) return null;
  return _directorMemory.history[_directorMemory.history.length - 1];
}
`;

  appendIfMissing(file, marker, block);
}

function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_MEMORY_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_MEMORY_INTEGRATION
import { rememberDirectorEvent } from "./director/festivalAIDirectorMemory";

// Przykład użycia wewnątrz HyperOrchestratora:
// rememberDirectorEvent({
//   type: "SCENARIO_DECISION",
//   profile: activeDirectorProfile,
//   mood,
//   pulse,
//   wave,
//   narrativePhase
// });
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorMemory Generator ===");
  ensureDir(CORE);
  ensureDir(DIRECTOR);
  directorMemory();
  integrateWithHyperOrchestrator();
  console.log("=== DONE ===");
}

main();
