const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE01 = path.join(ROOT, "apps", "FE-01__Festival_Pavilion");
const CORE = path.join(FE01, "core");
const COMPONENTS = path.join(FE01, "components");

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

//
// 1. Vision Orchestrator core
//
function visionOrchestratorCore() {
  const file = path.join(CORE, "festivalAIDirectorVisionOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR

import { computeDirectorDecision } from "./director/festivalAIDirectorSystem";
import { computeVisionMode, VisionModes } from "./festivalAIDirectorAutoVisionEngine";

// Główna funkcja: spina DirectorSystem + AutoVision + UI
export function computeDirectorVisionState({
  orchestratorDecision,
  autoTunerDecision,
  scenarioDecision,
  visualDecision,
  context,
  uiState
}) {
  const director = computeDirectorDecision({
    orchestratorDecision,
    autoTunerDecision,
    scenarioDecision,
    visualDecision,
    context
  });

  const { pulse, wave, narrativePhase, trustLevel } = context || {};
  const mood = director.mood;

  const autoVision = computeVisionMode({
    pulse,
    wave,
    mood,
    narrativePhase,
    trustLevel
  });

  const visionMode = uiState?.visionModeOverride || autoVision;

  return {
    director,
    visionMode,
    autoVision,
    override: uiState?.visionModeOverride || null
  };
}

// Helper: czy dany tryb jest aktywny
export function isVisionModeActive(visionState, mode) {
  if (!visionState) return false;
  return visionState.visionMode === mode;
}
`;

  appendIfMissing(file, marker, block);
}

//
// 2. Integracja z HyperOrchestrator
//
function integrateWithHyperOrchestrator() {
  const file = path.join(CORE, "festivalHyperOrchestrator.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR_INTEGRATION";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR_INTEGRATION
import { computeDirectorVisionState } from "./festivalAIDirectorVisionOrchestrator";

// Przykład w głównym ticku:
// const visionState = computeDirectorVisionState({
//   orchestratorDecision,
//   autoTunerDecision,
//   scenarioDecision,
//   visualDecision,
//   context: { pulse, wave, narrativePhase, trustLevel, reputation },
//   uiState
// });
// state.director = visionState.director;
// state.visionMode = visionState.visionMode;
`;

  appendIfMissing(file, marker, block);
}

//
// 3. Integracja z HyperSuite (renderowanie HUD/HUD Ultra/Vision Overlay)
//
function integrateWithHyperSuite() {
  const file = path.join(COMPONENTS, "FestivalOverlayScenarioAIHyperSuite.js");
  const marker = "// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR_UI";

  const block = `
// FE_FESTIVAL_AI_DIRECTOR_VISION_ORCHESTRATOR_UI
import { FestivalOverlayAIDirectorHUD } from "./FestivalOverlayAIDirectorHUD";
import { FestivalOverlayAIDirectorHUDUltra } from "./FestivalOverlayAIDirectorHUDUltra";
import { FestivalOverlayAIDirectorVisionOverlay } from "./FestivalOverlayAIDirectorVisionOverlay";
import { FestivalOverlayAIDirectorVisionModeSwitcher } from "./FestivalOverlayAIDirectorVisionModeSwitcher";
import { VisionModes } from "../core/festivalAIDirectorAutoVisionEngine";

// Przykładowy szkic integracji w komponencie HyperSuite:
//
// const [visionMode, setVisionMode] = useState("OFF");
// const [visionOverride, setVisionOverride] = useState(null);
//
// const handleVisionModeChange = (mode) => {
//   setVisionMode(mode);
//   setVisionOverride(mode === "AUTO" ? null : mode);
// };
//
// <FestivalOverlayAIDirectorVisionModeSwitcher
//   mode={visionMode}
//   onChange={handleVisionModeChange}
// />
//
// {visionMode === VisionModes.HUD && (
//   <FestivalOverlayAIDirectorHUD director={director} />
// )}
//
// {visionMode === VisionModes.HUD_ULTRA && (
//   <FestivalOverlayAIDirectorHUDUltra director={director} />
// )}
//
// {visionMode === VisionModes.VISION && (
//   <FestivalOverlayAIDirectorVisionOverlay director={director} />
// )}
`;

  appendIfMissing(file, marker, block);
}

function main() {
  console.log("=== FestivalAIDirectorVisionOrchestrator Generator ===");
  ensureDir(CORE);
  ensureDir(COMPONENTS);
  visionOrchestratorCore();
  integrateWithHyperOrchestrator();
  integrateWithHyperSuite();
  console.log("=== DONE ===");
}

main();
