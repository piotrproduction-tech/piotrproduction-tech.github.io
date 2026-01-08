/**
 * Marketplace World Manifest 5.0
 * Zawiera listę wszystkich modułów świata Marketplace.
 */

export const MarketplaceWorldManifest = {
  layers: {
    core: ["models", "api", "hooks"],
    engines: [
      "economySimulator",
      "heatmapEngine",
      "achievementEngine",
      "socialEngine",
      "reputationEngine",
      "tokenEngine"
    ],
    world: [
      "worldStateEngine",
      "timeEngine",
      "weatherEngine",
      "randomnessEngine",
      "syncScheduler"
    ],
    sandbox: [
      "sandboxEngine",
      "exportImportEngine",
      "multiInstanceSyncBridge",
      "shardingEngine",
      "multiInstanceRouter",
      "multiCityBridge"
    ],
    devtools: [
      "debugConsole",
      "developerTools"
    ]
  }
};