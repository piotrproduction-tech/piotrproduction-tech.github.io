export function connectMarketplaceStreetDistrictToAIDirector(aiDirector, director) {
  aiDirector.registerModule("MarketplaceStreetDistrict", {
    run: (context, orchestrator) => director.run(context, orchestrator)
  });
  console.log("✔ MarketplaceStreetDistrict podłączony do AI Director");
}