export function connectMarketplaceDistrictToAIDirector(aiDirector, director) {
  aiDirector.registerModule("MarketplaceDistrict", {
    run: (context, orchestrator) => director.run(context, orchestrator)
  });
  console.log("✔ MarketplaceDistrict podłączony do AI Director");
}