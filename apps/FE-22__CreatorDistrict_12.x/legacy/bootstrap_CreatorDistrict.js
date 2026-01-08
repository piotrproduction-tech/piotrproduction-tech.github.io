import { TestDirectorEngine } from "../CreatorDistrict/engines/TestDirectorEngine.js";
import { TestOrchestrator } from "../CreatorDistrict/orchestrator/TestOrchestrator.js";

import { connectCreatorDistrictToCityEngine } from "./connect_to_city_engine.js";
import { connectCreatorDistrictToAIDirector } from "./connect_to_ai_director.js";
import { connectCreatorDistrictToOrchestrator } from "./connect_to_orchestrator.js";

export function bootstrapCreatorDistrict(cityEngine, aiDirector, orchestrator) {
  const director = new TestDirectorEngine([]);
  const moduleOrchestrator = new TestOrchestrator();

  connectCreatorDistrictToCityEngine(cityEngine, director);
  connectCreatorDistrictToAIDirector(aiDirector, director);
  connectCreatorDistrictToOrchestrator(orchestrator, moduleOrchestrator);

  console.log("=== CreatorDistrict gotowy i podłączony do miasta ===");

  return { director, moduleOrchestrator };
}