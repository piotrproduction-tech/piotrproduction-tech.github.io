import { jest } from "@jest/globals";
import { createCityMetaEvolution } from "../../meta/CityMetaEvolution.js";

function mockDeps() {
  return {
    app: {},
    selfOptimization: {
      getOptimizations: () => [{ at: Date.now(), issues: {}, actions: [] }]
    },
    selfGovernance: {
      getLawHistory: () => [{ at: Date.now(), changes: [] }]
    },
    collectiveMemory: {
      getCollectiveMemory: () => ({ epochs: [{ at: Date.now() }] })
    },
    selfAwareness: {
      getAwareness: () => ({ level: 0.8 })
    }
  };
}

test("CityMetaEvolution generates proposals over time", () => {
  jest.useFakeTimers();
  const engine = createCityMetaEvolution(mockDeps());
  const before = engine.getMetaEvolution().proposals.length;

  jest.advanceTimersByTime(60000 * 2);

  const after = engine.getMetaEvolution().proposals.length;
  expect(after).toBeGreaterThan(before);
});

