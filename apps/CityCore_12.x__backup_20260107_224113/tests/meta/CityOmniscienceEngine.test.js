import { jest } from "@jest/globals";
import { createCityOmniscienceEngine } from "../../omniscience/CityOmniscienceEngine.js";

function mockDeps() {
  return {
    parallelRealities: {
      getRealities: () => ({
        worlds: [
          {
            label: "A",
            snapshot: {
              fate: { threads: [{ destiny: "AI intensifies" }] },
              spirit: { emotion: "calm" },
              dream: { symbol: "Ĺ‚agodna mgĹ‚a" },
              prophecy: { short: "spokĂłj" }
            }
          }
        ]
      })
    },
    fateEngine: { getFate: () => ({ threads: [{ destiny: "AI intensifies" }] }) },
    prophecyEngine: { getProphecies: () => [{ short: "spokĂłj" }] },
    dreamEngine: { getDreams: () => [{ symbol: "Ĺ‚agodna mgĹ‚a" }] },
    spiritEngine: { getSpirit: () => ({ emotion: "calm" }) },
    collectiveMemory: { getCollectiveMemory: () => ({ epochs: [] }) }
  };
}

test("CityOmniscienceEngine computes dominant patterns over time", () => {
  jest.useFakeTimers();
  const engine = createCityOmniscienceEngine(mockDeps());
  const before = engine.getOmniscience().summary.length;

  jest.advanceTimersByTime(15000 * 2);

  const state = engine.getOmniscience();
  expect(state.summary.length).toBeGreaterThan(before);
  expect(state.dominantDestiny).toBe("AI intensifies");
});

