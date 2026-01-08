export function connectMarketplaceDistrictToOrchestrator(orchestrator, moduleOrchestrator) {
  orchestrator.registerModule("MarketplaceDistrict", {
    dispatch: (event) => moduleOrchestrator.dispatch(event)
  });
  console.log("✔ MarketplaceDistrict podłączony do HyperOrchestratora");
}