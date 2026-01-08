import { TestDirectorEngine } from "../MarketplaceStreetDistrict/engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../MarketplaceStreetDistrict/orchestrator/TestOrchestrator.js";

import { connectMarketplaceStreetDistrictToCityEngine } from "./connect_to_city_engine.js";
import { connectMarketplaceStreetDistrictToAIDirector } from "./connect_to_ai_director.js";
import { connectMarketplaceStreetDistrictToOrchestrator } from "./connect_to_orchestrator.js";

export function bootstrapMarketplaceStreetDistrict(cityEngine, aiDirector, orchestrator) {
  const director = new TestDirectorEngine([]);
  const moduleOrchestrator = new TestOrchestrator();

  connectMarketplaceStreetDistrictToCityEngine(cityEngine, director);
  connectMarketplaceStreetDistrictToAIDirector(aiDirector, director);
  connectMarketplaceStreetDistrictToOrchestrator(orchestrator, moduleOrchestrator);

  console.log("=== MarketplaceStreetDistrict gotowy i podłączony do miasta ===");

  return { director, moduleOrchestrator };
}