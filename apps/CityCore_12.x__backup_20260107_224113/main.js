// main.js â€” Entry point Miasta 12.x

// ---------------------------------------------
// IMPORTY
// ---------------------------------------------

import { createCityApp } from "./CityCore_12.x/app/createCityApp.js";
import { districts } from "./apps/index.js";

import { createCityInspector } from "./CityCore_12.x/debug/CityInspector.js";
import { createCityCLI } from "./CityCore_12.x/cli/CityCLI.js";
import { createCityDashboardServer } from "./CityCore_12.x/server/CityDashboardServer.js";
import { createCityKnowledgeGraphServer } from "./CityCore_12.x/server/CityKnowledgeGraphServer.js";

import { createCityDevTools } from "./CityCore_12.x/devtools/CityDevTools.js";
import { createCityProfiler } from "./CityCore_12.x/profiler/CityProfiler.js";
import { createCityReplay } from "./CityCore_12.x/replay/CityReplay.js";
import { createCityTimeMachine } from "./CityCore_12.x/time/CityTimeMachine.js";
import { createCityStressTest } from "./CityCore_12.x/stress/CityStressTest.js";

import { createCityErrorBoundary } from "./CityCore_12.x/errors/CityErrorBoundary.js";
import { createCityHealthMonitor } from "./CityCore_12.x/health/CityHealthMonitor.js";
import { createCityRecorder } from "./CityCore_12.x/recorder/CityRecorder.js";
import { createCityChaosMonkey } from "./CityCore_12.x/chaos/CityChaosMonkey.js";

import { createCityAutoHealing } from "./CityCore_12.x/healing/CityAutoHealing.js";
import { createCityAnomalyDetector } from "./CityCore_12.x/anomaly/CityAnomalyDetector.js";
import { createCityAutoScaling } from "./CityCore_12.x/autoscale/CityAutoScaling.js";
import { createCityPredictiveAI } from "./CityCore_12.x/predict/CityPredictiveAI.js";

import { createCityKnowledgeGraph } from "./CityCore_12.x/knowledge/CityKnowledgeGraph.js";
import { createCityKnowledgeExplorer } from "./CityCore_12.x/knowledge/CityKnowledgeExplorer.js";

import { createCityScenarioEngine } from "./CityCore_12.x/scenario/CityScenarioEngine.js";
import { createCityScenarioLibrary } from "./CityCore_12.x/scenario/CityScenarioLibrary.js";
import { createCityScenarioWorkbench } from "./CityCore_12.x/scenario/CityScenarioWorkbench.js";

import { createCityAIConsole } from "./CityCore_12.x/ai/CityAIConsole.js";
import { createCityAITrainer } from "./CityCore_12.x/ai/CityAITrainer.js";
import { createCityAIPlayground } from "./CityCore_12.x/ai/CityAIPlayground.js";
import { createCityAIModelExporter } from "./CityCore_12.x/ai/CityAIModelExporter.js";
import { createCityAIEvolution } from "./CityCore_12.x/ai/CityAIEvolution.js";

import { createCityAIGovernance } from "./CityCore_12.x/governance/CityAIGovernance.js";
import { createCitySelfGovernance } from "./CityCore_12.x/governance/CitySelfGovernance.js";

import { createCityMythEngine } from "./CityCore_12.x/myth/CityMythEngine.js";
import { createCityEthicsEngine } from "./CityCore_12.x/ethics/CityEthicsEngine.js";
import { createCitySpiritEngine } from "./CityCore_12.x/spirit/CitySpiritEngine.js";

import { createCityFateEngine } from "./CityCore_12.x/fate/CityFateEngine.js";
import { createCityProphecyEngine } from "./CityCore_12.x/prophecy/CityProphecyEngine.js";

import { createCitySelfReflection } from "./CityCore_12.x/reflection/CitySelfReflection.js";
import { createCitySelfOptimization } from "./CityCore_12.x/optimization/CitySelfOptimization.js";

import { createCityDreamEngine } from "./CityCore_12.x/dream/CityDreamEngine.js";
import { createCitySelfConsciousness } from "./CityCore_12.x/consciousness/CitySelfConsciousness.js";
import { createCityAfterlifeEngine } from "./CityCore_12.x/afterlife/CityAfterlifeEngine.js";

import { createCitySelfAwareness } from "./CityCore_12.x/awareness/CitySelfAwareness.js";
import { createCityCollectiveMemory } from "./CityCore_12.x/memory/CityCollectiveMemory.js";
import { createCityMetaEvolution } from "./CityCore_12.x/meta/CityMetaEvolution.js";

import { createCityArchitectConsole } from "./CityCore_12.x/architect/CityArchitectConsole.js";
import { createCityArchitectMindLink } from "./CityCore_12.x/architect/CityArchitectMindLink.js";
import { createCityParallelRealities } from "./CityCore_12.x/multiverse/CityParallelRealities.js";

import { createCityOmniscienceEngine } from "./CityCore_12.x/omniscience/CityOmniscienceEngine.js";
import { createCityArchitectMerge } from "./CityCore_12.x/architect/CityArchitectMerge.js";


// ---------------------------------------------
// 1. UtwĂłrz aplikacjÄ™ miasta
// ---------------------------------------------
const app = createCityApp({ districts });

// ---------------------------------------------
// 2. Start miasta z uĹĽytkownikiem
// ---------------------------------------------
const user = { name: "Piotr" };
app.start(user, 500);

// ---------------------------------------------
// 3. Render loop
// ---------------------------------------------
setInterval(() => {
  const ui = app.render(user);
  console.log("=== CITY UI ===");
  console.log(JSON.stringify(ui, null, 2));
}, 1000);

// ---------------------------------------------
// 4. Inspector
// ---------------------------------------------
const inspector = createCityInspector({ app });
inspector.start(1000, user);

// ---------------------------------------------
// 5. CLI
// ---------------------------------------------
const cli = createCityCLI({ app });

// ---------------------------------------------
// 6. Dashboard server
// ---------------------------------------------
createCityDashboardServer({ app, port: 3000 });

// ---------------------------------------------
// 7. DevTools + Profiler
// ---------------------------------------------
const devtools = createCityDevTools({ app });
const profiler = createCityProfiler({ app });

// ---------------------------------------------
// 8. Core system engines
// ---------------------------------------------
const timeMachine = createCityTimeMachine({ app });
const stressTest = createCityStressTest({ app });
const errorBoundary = createCityErrorBoundary({ app });
const healthMonitor = createCityHealthMonitor({ app });
const recorder = createCityRecorder({ app });
const chaosMonkey = createCityChaosMonkey({ app });

const autoHealing = createCityAutoHealing({ app, errorBoundary });
const anomalyDetector = createCityAnomalyDetector({ app, healthMonitor });
const autoScaling = createCityAutoScaling({ app, healthMonitor });
const predictiveAI = createCityPredictiveAI({ app, recorder, healthMonitor });

const knowledgeGraph = createCityKnowledgeGraph({ app });
const knowledgeExplorer = createCityKnowledgeExplorer({ knowledgeGraph });
const knowledgeGraphServer = createCityKnowledgeGraphServer({ knowledgeGraph, port: 3001 });

const scenarioEngine = createCityScenarioEngine({ app });
const scenarioLibrary = createCityScenarioLibrary({ scenarioEngine });
const scenarioWorkbench = createCityScenarioWorkbench({ app, scenarioEngine });

const aiConsole = createCityAIConsole({ app });
const aiTrainer = createCityAITrainer({ app, recorder });
const aiPlayground = createCityAIPlayground({ app });
const aiModelExporter = createCityAIModelExporter({ app, aiTrainer });
const aiEvolution = createCityAIEvolution({ app, aiTrainer });

const aiGovernance = createCityAIGovernance({ app });
const mythEngine = createCityMythEngine({ app, recorder, anomalyDetector });
const ethicsEngine = createCityEthicsEngine({ app });
const spiritEngine = createCitySpiritEngine({ app, recorder, mythEngine, anomalyDetector });

const fateEngine = createCityFateEngine({ app, recorder, predictiveAI, spiritEngine });
const prophecyEngine = createCityProphecyEngine({ fateEngine, spiritEngine, mythEngine, recorder });

const selfReflection = createCitySelfReflection({
  app,
  recorder,
  aiGovernance,
  ethicsEngine,
  anomalyDetector,
  spiritEngine
});

const selfOptimization = createCitySelfOptimization({
  app,
  selfReflection,
  aiTrainer,
  aiEvolution,
  aiGovernance,
  ethicsEngine,
  spiritEngine
});

const selfGovernance = createCitySelfGovernance({
  aiGovernance,
  ethicsEngine,
  selfReflection,
  spiritEngine,
  prophecyEngine
});

const dreamEngine = createCityDreamEngine({
  scenarioEngine,
  recorder,
  spiritEngine,
  mythEngine
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
  scenarioEngine,
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

// ---------------------------------------------
// 9. Cykle systemowe
// ---------------------------------------------
setInterval(() => recorder.record(), 1000);
setInterval(() => timeMachine.record(), 2000);
setTimeout(() => stressTest.start(20), 5000);
setInterval(() => aiTrainer.train(), 5000);

setTimeout(() => {
  const replay = createCityReplay({ app, logs: devtools.getLogs() });
  replay.play(100);
}, 10000);

setInterval(() => aiTrainer.injectPolicies(), 10000);
setTimeout(() => chaosMonkey.start(300), 15000);
setInterval(() => aiEvolution.evolve(), 30000);

// ---------------------------------------------
// 10. UdostÄ™pnienie do HTML
// ---------------------------------------------
globalThis.app = app;
globalThis.scenarioEngine = scenarioEngine;
globalThis.scenarioWorkbench = scenarioWorkbench;
globalThis.knowledgeGraph = knowledgeGraph;
globalThis.aiConsole = aiConsole;
globalThis.aiPlayground = aiPlayground;
globalThis.aiEvolution = aiEvolution;
globalThis.selfConsciousness = selfConsciousness;
globalThis.afterlifeEngine = afterlifeEngine;
globalThis.selfAwareness = selfAwareness;
globalThis.collectiveMemory = collectiveMemory;
globalThis.metaEvolution = metaEvolution;
globalThis.architectConsole = architectConsole;
globalThis.mindLink = mindLink;
globalThis.parallelRealities = parallelRealities;
globalThis.omniscienceEngine = omniscienceEngine;
globalThis.architectMerge = architectMerge;

// ---------------------------------------------
// 11. Eksport
// ---------------------------------------------
export {
  app,
  inspector,
  cli,
  devtools,
  profiler,
  timeMachine,
  stressTest,
  errorBoundary,
  healthMonitor,
  recorder,
  chaosMonkey,
  autoHealing,
  autoScaling,
  predictiveAI,
  knowledgeGraph,
  scenarioEngine,
  scenarioLibrary,
  knowledgeExplorer,
  scenarioWorkbench,
  knowledgeGraphServer,
  aiConsole,
  aiTrainer,
  aiPlayground,
  aiModelExporter,
  aiGovernance,
  mythEngine,
  ethicsEngine,
  spiritEngine,
  fateEngine,
  selfReflection,
  selfOptimization,
  prophecyEngine,
  selfGovernance,
  dreamEngine,
  selfConsciousness,
  afterlifeEngine,
  selfAwareness,
  collectiveMemory,
  metaEvolution,
  architectConsole,
  mindLink,
  parallelRealities,
  omniscienceEngine,
  architectMerge
};

