export function connectMarketplaceStreetDistrictToOrchestrator(orchestrator, moduleOrchestrator) {
  orchestrator.registerModule("MarketplaceStreetDistrict", {
    dispatch: (event) => moduleOrchestrator.dispatch(event)
  });
  console.log("✔ MarketplaceStreetDistrict podłączony do HyperOrchestratora");
}