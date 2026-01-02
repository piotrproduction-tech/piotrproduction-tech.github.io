


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



// FE_FESTIVAL_AI_DIRECTOR_MOOD_ENGINE_INTEGRATION
import { updateDirectorMood } from "./director/festivalAIDirectorMoodEngine";

// Przykład użycia:
// const mood = updateDirectorMood({ pulse, wave, narrativePhase, trustLevel });
// state.directorMood = mood;



// FE_FESTIVAL_AI_DIRECTOR_CONFLICT_RESOLVER_INTEGRATION
import { resolveDirectorConflict } from "./director/festivalAIDirectorConflictResolver";

// Przykład użycia:
// const finalDecision = resolveDirectorConflict({
//   orchestratorDecision,
//   autoTunerDecision,
//   scenarioDecision,
//   visualDecision,
//   context: { pulse, trustLevel, narrativePhase }
// });
// state.directorDecision = finalDecision;



// FE_FESTIVAL_AI_DIRECTOR_SYSTEM_INTEGRATION
import { computeDirectorDecision } from "./director/festivalAIDirectorSystem";

// Przykład użycia w HyperOrchestratorze:
// const directorResult = computeDirectorDecision({
//   orchestratorDecision,
//   autoTunerDecision,
//   scenarioDecision,
//   visualDecision,
//   context: { pulse, wave, narrativePhase, trustLevel, reputation }
// });
// state.director = directorResult;



// FE_FESTIVAL_AI_DIRECTOR_MONITOR_DIRECTOR_SYSTEM
// Przykład:
// const director = computeDirectorDecision(...);
// uiState.director = director;



// FE_FESTIVAL_AI_DIRECTOR_AUTO_VISION_INTEGRATION
import { computeVisionMode } from "./festivalAIDirectorAutoVisionEngine";

// Przykład użycia:
// const autoVision = computeVisionMode({
//   pulse,
//   wave,
//   mood: director.mood,
//   narrativePhase,
//   trustLevel
// });
// state.visionMode = manualOverride ?? autoVision;



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
