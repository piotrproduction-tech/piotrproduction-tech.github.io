export function connectCreatorDistrictToOrchestrator(orchestrator, moduleOrchestrator) {
  orchestrator.registerModule("CreatorDistrict", {
    dispatch: (event) => moduleOrchestrator.dispatch(event)
  });
  console.log("✔ CreatorDistrict podłączony do HyperOrchestratora");
}