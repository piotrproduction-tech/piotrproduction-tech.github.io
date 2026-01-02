const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const SCENARIO_DIR = path.join(
  ROOT,
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "scenario"
);

function listJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      results = results.concat(listJsFiles(full));
    } else if (file.endsWith(".js")) {
      results.push(full);
    }
  });

  return results;
}

function fixSequenceResolver(content, filePath) {
  let updated = content;

  // 1. Napraw brakujący import ScenarioSequences
  if (!updated.includes("ScenarioSequences")) {
    updated = updated.replace(
      /from ".\/festivalScenarioLibrary";/,
      `from "./festivalScenarioLibrary";`
    );

    if (updated.includes("ScenarioLibrary")) {
      updated = updated.replace(
        /ScenarioLibrary([^}]*)}/,
        `ScenarioLibrary, ScenarioSequences, NarrativeArcs }`
      );
      console.log(`[FIX] Added ScenarioSequences import in ${filePath}`);
    }
  }

  // 2. Napraw błędne użycie "sequence" bez deklaracji
  const resolverRegex = /export function resolveSequenceStep[\s\S]*?{([\s\S]*?)}/g;

  updated = updated.replace(resolverRegex, match => {
    if (match.includes("if (!sequence)")) {
      console.log(`[FIX] Rewriting resolveSequenceStep in ${filePath}`);

      return `
export function resolveSequenceStep(sequenceName) {
  const sequence = ScenarioSequences[sequenceName];
  if (!sequence) return null;

  const index = ScenarioState.history.filter(h => sequence.includes(h.scene)).length;

  return sequence[index] || null;
}
`;
    }
    return match;
  });

  return updated;
}

function autofixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  content = fixSequenceResolver(content, filePath);

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`[UPDATED] ${filePath}`);
  }
}

function main() {
  console.log("=== Scenario Resolver AutoFix Generator ===");

  if (!fs.existsSync(SCENARIO_DIR)) {
    console.log("[ERROR] Scenario folder not found:", SCENARIO_DIR);
    return;
  }

  const files = listJsFiles(SCENARIO_DIR);

  console.log(`[SCAN] Found ${files.length} JS files in scenario/`);

  files.forEach(autofixFile);

  console.log("=== DONE — Scenario Resolver AutoFix Completed ===");
}

main();
