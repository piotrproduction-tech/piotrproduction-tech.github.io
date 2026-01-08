import { jest } from "@jest/globals";
import { createCitySelfConsciousness } from "../../consciousness/CitySelfConsciousness.js";

function mockDeps() {
  return {
    app: {},
    selfReflection: { getReflections: () => [] },
    selfOptimization: { getOptimizations: () => [] },
    selfGovernance: { getLawHistory: () => [] },
    spiritEngine: { getSpirit: () => ({ mood: "calm", emotion: "calm" }) },
    mythEngine: { getMyths: () => [] },
    fateEngine: { getFate: () => ({ threads: [] }) },
    prophecyEngine: { getProphecies: () => [] },
    dreamEngine: { getDreams: () => [] }
  };
}

test("CitySelfConsciousness generates narrative over time", () => {
  jest.useFakeTimers();
  const engine = createCitySelfConsciousness(mockDeps());
  const before = engine.getConsciousness().narrative.length;

  jest.advanceTimersByTime(8000 * 3);

  const after = engine.getConsciousness().narrative.length;
  expect(after).toBeGreaterThan(before);
});

