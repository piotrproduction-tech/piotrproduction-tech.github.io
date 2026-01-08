export function connectCreatorDistrictToCityEngine(cityEngine, module) {
  return {
    pulse: () => cityEngine.pulse(),
    mood: () => cityEngine.mood(),
    rhythm: () => cityEngine.rhythm(),
    heatmap: () => cityEngine.heatmap(),
    sync: () => cityEngine.sync(module)
  };
}