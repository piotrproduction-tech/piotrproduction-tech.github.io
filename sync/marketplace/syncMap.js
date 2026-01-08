/**
 * Marketplace Sync Map 5.0
 * Definiuje połączenia Marketplace z innymi modułami miasta
 */

export const MarketplaceSyncMap = {
  creatorHub: "syncCreatorData",
  streetEngine: "syncStreetData",
  eventEngine: "syncEventData",
  festivalEngine: "syncFestivalData",
  scenarioEngine: "syncScenarioData",
  hyperOrchestrator: "syncHyperData",
  dataLake: "archiveMarketplaceData",
  telemetry: "broadcastMarketplaceTelemetry"
};