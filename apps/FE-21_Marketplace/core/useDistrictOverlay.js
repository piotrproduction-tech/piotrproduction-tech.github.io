export function useDistrictOverlay() {
  return {
    controller: useDistrictOverlayController(),
    presets: useDistrictOverlayPresetManager(),
    sync: useDistrictOverlayPresetSync(),
    quickSwitch: useDistrictOverlayQuickSwitch(),
    remote: useDistrictOverlayRemoteControl(),
    macro: useDistrictOverlayMacroRecorder(),
    scenario: useDistrictOverlayScenarioEngine(),
    ai: {
      orchestrator: useDistrictOverlayScenarioAIOrchestrator(),
      autoTuner: useDistrictOverlayScenarioAIAutoTuner(),
      hyper: useDistrictOverlayScenarioAIHyperOrchestrator()
    }
  };
}
