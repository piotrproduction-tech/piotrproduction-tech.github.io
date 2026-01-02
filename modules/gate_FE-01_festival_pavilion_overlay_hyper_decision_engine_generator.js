const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const HYPER = path.join(CORE, "hyper");

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

function decisionEngine() {
  const file = path.join(HYPER, "festivalHyperDecisionEngine.js");
  const marker = "// FE_FESTIVAL_HYPER_DECISION_ENGINE";

  const block = `
// FE_FESTIVAL_HYPER_DECISION_ENGINE

// Podejmowanie decyzji na podstawie zwycięzcy priorytetów
export function computeHyperDecision(inputs, priority) {
  const { winner } = priority;

  const {
    scene,
    directorIntent,
    directorMood,
    uiForcedOverlay,
    uiForcedScene,
    pulse,
    wave,
    overlayMode
  } = inputs;

  // Finalne decyzje
  let finalScene = scene;
  let finalOverlay = overlayMode;
  let finalDirectorIntent = directorIntent;

  // 1. Operator ma najwyższy priorytet
  if (winner === "operator") {
    if (uiForcedScene) finalScene = uiForcedScene;
    if (uiForcedOverlay) finalOverlay = uiForcedOverlay;

    return {
      finalScene,
      finalOverlay,
      finalDirectorIntent,
      source: "operator"
    };
  }

  // 2. Scena wygrywa
  if (winner === "scene") {
    // scena pozostaje nadrzędna
    return {
      finalScene,
      finalOverlay,
      finalDirectorIntent,
      source: "scene"
    };
  }

  // 3. Reżyser wygrywa
  if (winner === "director") {
    if (directorIntent === "highlight") finalOverlay = "CINEMATIC";
    if (directorIntent === "focus") finalOverlay = "FOCUS";
    if (directorIntent === "chaos") finalOverlay = "CHAOS";

    return {
      finalScene,
      finalOverlay,
      finalDirectorIntent,
      source: "director"
    };
  }

  // 4. Energia wygrywa
  if (winner === "energy") {
    if (pulse > 140 || wave > 0.85) finalOverlay = "CHAOS";
    else if (pulse > 120 || wave > 0.7) finalOverlay = "PEAK";
    else if (pulse < 60 && wave < 0.25) finalOverlay = "CALM";

    return {
      finalScene,
      finalOverlay,
      finalDirectorIntent,
      source: "energy"
    };
  }

  // 5. Overlay wygrywa (np. CHAOS → utrzymanie)
  if (winner === "overlay") {
    return {
      finalScene,
      finalOverlay,
      finalDirectorIntent,
      source: "overlay"
    };
  }

  // Fallback — nic się nie zmienia
  return {
    finalScene,
    finalOverlay,
    finalDirectorIntent,
    source: "none"
  };
}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalHyperDecisionEngine Generator ===");
  ensureDir(CORE);
  ensureDir(HYPER);
  decisionEngine();
  console.log("=== DONE ===");
}

main();
