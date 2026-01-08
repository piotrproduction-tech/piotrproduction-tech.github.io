import { jest } from "@jest/globals";
import { createCityArchitectConsole } from "../../architect/CityArchitectConsole.js";

function mockDeps() {
  return {
    selfConsciousness: {
      getConsciousness: () => ({ metaState: { coherence: 1, tension: 0 } }),
      getNarrative: () => []
    },
    selfAwareness: { getAwareness: () => ({ level: 0.5 }) },
    collectiveMemory: { getCollectiveMemory: () => ({ epochs: [] }) },
    metaEvolution: { getMetaEvolution: () => ({ proposals: [] }) },
    spiritEngine: {
      getSpirit: () => ({ mood: "calm", emotion: "calm", archetype: "guardian" })
    },
    mythEngine: { getMyths: () => ["mit"] },
    prophecyEngine: { getProphecies: () => [{ short: "proroctwo" }] },
    fateEngine: { getFate: () => ({ threads: [{ destiny: "AI intensifies" }] }) },
    dreamEngine: { getDreams: () => [{ symbol: "sen" }] },
    selfReflection: { getReflections: () => [{ insight: "refleksja" }] }
  };
}

test("CityArchitectConsole answers questions", () => {
  const consoleAPI = createCityArchitectConsole(mockDeps());
  const res = consoleAPI.ask("Jak siÄ™ czujesz?");
  expect(res).toHaveProperty("answer");
  expect(typeof res.answer).toBe("string");
});

