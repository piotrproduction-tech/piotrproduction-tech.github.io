import { TestDirectorEngine } from "../MarketplaceDistrict/engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../MarketplaceDistrict/orchestrator/TestOrchestrator.js";

import { connectMarketplaceDistrictToCityEngine } from "./connect_to_city_engine.js";
import { connectMarketplaceDistrictToAIDirector } from "./connect_to_ai_director.js";
import { connectMarketplaceDistrictToOrchestrator } from "./connect_to_orchestrator.js";

export function bootstrapMarketplaceDistrict(cityEngine, aiDirector, orchestrator) {
  const director = new TestDirectorEngine([]);
  const moduleOrchestrator = new TestOrchestrator();

  connectMarketplaceDistrictToCityEngine(cityEngine, director);
  connectMarketplaceDistrictToAIDirector(aiDirector, director);
  connectMarketplaceDistrictToOrchestrator(orchestrator, moduleOrchestrator);

  console.log("=== MarketplaceDistrict gotowy i podłączony do miasta ===");

  return { director, moduleOrchestrator };
}