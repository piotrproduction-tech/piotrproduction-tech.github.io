const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TESTS_ROOT = path.join(ROOT, "tests");
const FE01_TESTS = path.join(TESTS_ROOT, "FE-01__Festival_Pavilion");

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

function stressTests() {
  const file = path.join(FE01_TESTS, "festivalEngine.stress.test.js");
  const marker = "// FE_FESTIVAL_ENGINE_STRESS_TESTS";

  const block = `
// FE_FESTIVAL_ENGINE_STRESS_TESTS

const path = require("path");
const { FestivalEngine } = require(path.join(
  __dirname,
  "..",
  "..",
  "apps",
  "FE-01__Festival_Pavilion",
  "core",
  "festivalEngine.js"
));

function randomPulse() {
  return 60 + Math.floor(Math.random() * 120); // 60–180
}

function randomWave() {
  return Math.random(); // 0–1
}

function randomScene() {
  const scenes = [
    "opening",
    "build_up",
    "music_drop",
    "dramatic_climax",
    "chaotic_phase",
    "cooldown"
  ];
  return scenes[Math.floor(Math.random() * scenes.length)];
}

function randomDirectorIntent() {
  const intents = [null, "highlight", "focus", "chaos"];
  return intents[Math.floor(Math.random() * intents.length)];
}

function randomOverlay() {
  const overlays = [null, "FOCUS", "CINEMATIC", "CHAOS", "PEAK"];
  return overlays[Math.floor(Math.random() * overlays.length)];
}

describe("FestivalEngine Stress Test — 10 000 frames", () => {
  let engine;

  beforeEach(() => {
    engine = new FestivalEngine();
  });

  test("runs 10 000 frames without crashing", () => {
    const FRAMES = 10000;

    for (let i = 0; i < FRAMES; i++) {
      const frame = engine.computeFestivalFrame({
        experience: {
          pulse: randomPulse(),
          wave: randomWave(),
          experienceState: { phase: "RANDOM" }
        },
        scenario: {
          activeScene: randomScene(),
          narrativePhase: "dynamic"
        },
        director: {
          mood: "Random",
          intent: randomDirectorIntent()
        },
        uiState: {
          forcedOverlayMode: randomOverlay(),
          forcedScene: Math.random() < 0.02 ? randomScene() : null // 2% override
        },
        audience: {
          energy: 20 + Math.floor(Math.random() * 80)
        }
      });

      expect(frame).toBeDefined();
      expect(frame.visual).toBeDefined();
      expect(frame.scenario).toBeDefined();
      expect(frame.priority).toBeDefined();
      expect(frame.decision).toBeDefined();
    }

    const snapshot = engine.getFestivalSnapshot();
    expect(snapshot.frameIndex).toBe(10000);
  });
});
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalEngine Stress Tests Generator ===");
  ensureDir(TESTS_ROOT);
  ensureDir(FE01_TESTS);
  stressTests();
  console.log("=== DONE ===");
}

main();
