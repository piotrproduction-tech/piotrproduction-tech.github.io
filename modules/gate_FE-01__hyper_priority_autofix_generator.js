const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const HYPER_DIR = path.join(
  ROOT,
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "hyper"
);

const TARGET_FILE = path.join(HYPER_DIR, "festivalHyperPriorityResolver.js");

const NEW_RESOLVE_FUNCTION = `
export function resolveHyperPriority(inputs) {
  const { uiState, director, scenario, experience, audience } = inputs;

  // 1. Operator override — najwyższy priorytet
  if (uiState?.forcedOverlayMode || uiState?.forcedScene) {
    return {
      winner: "operator",
      reason: "Operator override",
      weight: 999
    };
  }

  // 2. Director intent
  if (director?.intent) {
    return {
      winner: "director",
      reason: "Director intent",
      weight: 800
    };
  }

  // 3. Scenario change
  if (scenario?.changed) {
    return {
      winner: "scenario",
      reason: "Scenario orchestration",
      weight: 600
    };
  }

  // 4. Experience pulse/wave
  if (experience?.pulse > 140 || experience?.wave > 0.8) {
    return {
      winner: "experience",
      reason: "High pulse/wave",
      weight: 400
    };
  }

  // 5. Audience energy
  if (audience?.energy > 70) {
    return {
      winner: "energy",
      reason: "High audience energy",
      weight: 200
    };
  }

  // 6. Default
  return {
    winner: "default",
    reason: "No strong signal",
    weight: 0
  };
}
`;

function main() {
  console.log("=== Hyper Priority AutoFix Generator ===");

  if (!fs.existsSync(TARGET_FILE)) {
    console.log("[ERROR] Target file not found:", TARGET_FILE);
    return;
  }

  let content = fs.readFileSync(TARGET_FILE, "utf8");

  const regex = /export function resolveHyperPriority[\s\S]*?}\s*$/m;

  if (regex.test(content)) {
    content = content.replace(regex, NEW_RESOLVE_FUNCTION.trim() + "\n");
    console.log("[FIX] Replaced existing resolveHyperPriority in", TARGET_FILE);
  } else {
    content += "\n\n" + NEW_RESOLVE_FUNCTION.trim() + "\n";
    console.log("[FIX] Appended resolveHyperPriority to", TARGET_FILE);
  }

  fs.writeFileSync(TARGET_FILE, content, "utf8");
  console.log("[UPDATED]", TARGET_FILE);
  console.log("=== DONE — Hyper Priority AutoFix Completed ===");
}

main();
