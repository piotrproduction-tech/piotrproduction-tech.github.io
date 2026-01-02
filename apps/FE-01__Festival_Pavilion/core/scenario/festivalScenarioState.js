


// FE_FESTIVAL_SCENARIO_STATE

// Stan dramaturgii festiwalu
export const ScenarioState = {
  activeScene: null,
  activeSequence: null,
  narrativePhase: "opening",
  sceneStartTime: null,
  sceneDuration: 0,
  history: [],
  triggers: {
    pulse: false,
    wave: false,
    mood: false,
    audience: false,
    manual: false
  }
};

// Reset state
export function resetScenarioState() {
  ScenarioState.activeScene = null;
  ScenarioState.activeSequence = null;
  ScenarioState.narrativePhase = "opening";
  ScenarioState.sceneStartTime = null;
  ScenarioState.sceneDuration = 0;
  ScenarioState.history = [];
  ScenarioState.triggers = {
    pulse: false,
    wave: false,
    mood: false,
    audience: false,
    manual: false
  };
}

// Ustaw aktywną scenę
export function setActiveScene(sceneName) {
  ScenarioState.activeScene = sceneName;
  ScenarioState.sceneStartTime = Date.now();
  ScenarioState.sceneDuration = 0;
  ScenarioState.history.push({
    scene: sceneName,
    timestamp: Date.now()
  });
}

// Ustaw aktywną sekwencję
export function setActiveSequence(sequenceName) {
  ScenarioState.activeSequence = sequenceName;
}

// Ustaw fazę narracyjną
export function setNarrativePhase(phase) {
  ScenarioState.narrativePhase = phase;
}

// Aktualizuj czas trwania sceny
export function updateSceneDuration() {
  if (ScenarioState.sceneStartTime) {
    ScenarioState.sceneDuration = Date.now() - ScenarioState.sceneStartTime;
  }
}

// Ustaw trigger
export function setTrigger(type, value = true) {
  if (ScenarioState.triggers[type] !== undefined) {
    ScenarioState.triggers[type] = value;
  }
}

// Reset triggerów
export function resetTriggers() {
  for (const key in ScenarioState.triggers) {
    ScenarioState.triggers[key] = false;
  }
}
