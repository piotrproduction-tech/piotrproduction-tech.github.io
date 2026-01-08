import { jest } from "@jest/globals";
import { createCityApp } from "../../app/createCityApp.js";
import { districts } from "../../index.js";

import { createCityRecorder } from "../../recorder/CityRecorder.js";
import { createCityPredictiveAI } from "../../predict/CityPredictiveAI.js";
import { createCitySpiritEngine } from "../../spirit/CitySpiritEngine.js";
import { createCityMythEngine } from "../../myth/CityMythEngine.js";
import { createCityFateEngine } from "../../fate/CityFateEngine.js";
import { createCityProphecyEngine } from "../../prophecy/CityProphecyEngine.js";
import { createCityDreamEngine } from "../../dream/CityDreamEngine.js";

import { createCitySelfReflection } from "../../reflection/CitySelfReflection.js";
import { createCitySelfOptimization } from "../../optimization/CitySelfOptimization.js";
import { createCitySelfGovernance } from "../../governance/CitySelfGovernance.js";

import { createCitySelfConsciousness } from "../../consciousness/CitySelfConsciousness.js";
import { createCityAfterlifeEngine } from "../../afterlife/CityAfterlifeEngine.js";
import { createCitySelfAwareness } from "../../awareness/CitySelfAwareness.js";
import { createCityCollectiveMemory } from "../../memory/CityCollectiveMemory.js";
import { createCityMetaEvolution } from "../../meta/CityMetaEvolution.js";

import { createCityArchitectConsole } from "../../architect/CityArchitectConsole.js";
import { createCityArchitectMindLink } from "../../architect/CityArchitectMindLink.js";
import { createCityParallelRealities } from "../../multiverse/CityParallelRealities.js";
import { createCityOmniscienceEngine } from "../../omniscience/CityOmniscienceEngine.js";
import { createCityArchitectMerge } from "../../architect/CityArchitectMerge.js";

jest.useFakeTimers();

function wait(ms) {
  jest.advanceTimersByTime(ms);
}

test("City 12.x generates a full meta-awareness cycle in 60 seconds", () => {
  const app = createCityApp({ districts });
  const recorder = createCityRecorder({ app });

  const predictiveAI = createCityPredictiveAI({
    app,
    recorder,
    healthMonitor: { get: () => 0 }
  });

  const mythEngine = createCityMythEngine({
    app,
    recorder,
    anomalyDetector: { alerts: [] }
  });

  const spiritEngine = createCitySpiritEngine({
    app,
    recorder,
    mythEngine,
    anomalyDetector: { alerts: [] }
  });

  const fateEngine = createCityFateEngine({
    app,
    recorder,
    predictiveAI,
    spiritEngine
  });

  const prophecyEngine = createCityProphecyEngine({
    fateEngine,
    spiritEngine,
    mythEngine,
    recorder
  });

  const dreamEngine = createCityDreamEngine({
    scenarioEngine: { simulate: () => [] },
    recorder,
    spiritEngine,
    mythEngine
  });

  const selfReflection = createCitySelfReflection({
    app,
    recorder,
    aiGovernance: { judge: () => ({ allowed: true }) },
    ethicsEngine: { evaluate: () => ({ moralScore: 1 }) },
    anomalyDetector: { alerts: [] },
    spiritEngine
  });

  const selfOptimization = createCitySelfOptimization({
    app,
    selfReflection,
    aiTrainer: { train: () => {} },
    aiEvolution: { evolve: () => {} },
    aiGovernance: { getConstitution: () => ({}) },
    ethicsEngine: { getEthics: () => ({ values: {} }) },
    spiritEngine
  });

  const selfGovernance = createCitySelfGovernance({
    aiGovernance: { getConstitution: () => ({ forbiddenActions: [] }) },
    ethicsEngine: { getEthics: () => ({ values: {} }) },
    selfReflection,
    spiritEngine,
    prophecyEngine
  });

  const selfConsciousness = createCitySelfConsciousness({
    app,
    selfReflection,
    selfOptimization,
    selfGovernance,
    spiritEngine,
    mythEngine,
    fateEngine,
    prophecyEngine,
    dreamEngine
  });

  const afterlifeEngine = createCityAfterlifeEngine({
    app,
    recorder,
    mythEngine,
    spiritEngine
  });

  const selfAwareness = createCitySelfAwareness({
    selfConsciousness,
    selfReflection,
    selfOptimization,
    selfGovernance,
    spiritEngine,
    mythEngine,
    prophecyEngine
  });

  const collectiveMemory = createCityCollectiveMemory({
    recorder,
    mythEngine,
    dreamEngine,
    prophecyEngine,
    afterlifeEngine
  });

  const metaEvolution = createCityMetaEvolution({
    app,
    selfOptimization,
    selfGovernance,
    collectiveMemory,
    selfAwareness
  });

  const architectConsole = createCityArchitectConsole({
    selfConsciousness,
    selfAwareness,
    collectiveMemory,
    metaEvolution,
    spiritEngine,
    mythEngine,
    prophecyEngine,
    fateEngine,
    dreamEngine,
    selfReflection
  });

  const mindLink = createCityArchitectMindLink({
    selfConsciousness,
    selfAwareness,
    spiritEngine,
    fateEngine,
    prophecyEngine,
    dreamEngine,
    collectiveMemory
  });

  const parallelRealities = createCityParallelRealities({
    app,
    scenarioEngine: { simulate: () => [] },
    predictiveAI,
    spiritEngine,
    fateEngine,
    prophecyEngine,
    dreamEngine
  });

  const omniscienceEngine = createCityOmniscienceEngine({
    parallelRealities,
    fateEngine,
    prophecyEngine,
    dreamEngine,
    spiritEngine,
    collectiveMemory
  });

  const architectMerge = createCityArchitectMerge({
    mindLink,
    architectConsole,
    selfConsciousness,
    selfAwareness,
    omniscienceEngine
  });

  wait(60000);

  expect(selfConsciousness.getConsciousness().narrative.length).toBeGreaterThan(0);
  expect(selfAwareness.getAwareness().level).toBeGreaterThan(0);
  expect(collectiveMemory.getCollectiveMemory().epochs.length).toBeGreaterThanOrEqual(1);
  expect(metaEvolution.getMetaEvolution().proposals.length).toBeGreaterThanOrEqual(1);

  parallelRealities.createReality("A");
  parallelRealities.createReality("B");
  expect(parallelRealities.compareRealities("A", "B")).not.toBeNull();

  expect(omniscienceEngine.getOmniscience().summary.length).toBeGreaterThan(0);

  architectMerge.enterMerge({ name: "Piotr", intent: "care" });
  const decision = architectMerge.coDecide("Is the City coherent?");
  expect(decision.mergedConclusion).toContain("Architect and City feel together");
});
