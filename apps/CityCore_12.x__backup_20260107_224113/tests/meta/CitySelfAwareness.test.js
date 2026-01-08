import { jest } from "@jest/globals";
import { createCitySelfAwareness } from "../../awareness/CitySelfAwareness.js";

function mockDeps() {
  return {
    selfConsciousness: {
      getConsciousness: () => ({
        narrative: [],
        metaState: { coherence: 1, tension: 0, curiosity: 0.5 }
      })
    },
    selfReflection: {
      getReflections: () => [
        {
          governanceVerdict: { allowed: true },
          ethicsVerdict: { moralScore: 1 }
        }
      ]
    },
    selfOptimization: {},
    selfGovernance: {},
    spiritEngine: { getSpirit: () => ({ mood: "calm" }) },
    mythEngine: { getMyths: () => [] },
    prophecyEngine: { getProphecies: () => [] }
  };
}

test("CitySelfAwareness increases awareness level over time", () => {
  jest.useFakeTimers();
  const engine = createCitySelfAwareness(mockDeps());
  const before = engine.getAwareness().level;

  jest.advanceTimersByTime(9000 * 2);

  const after = engine.getAwareness().level;
  expect(after).toBeGreaterThanOrEqual(before);
});

