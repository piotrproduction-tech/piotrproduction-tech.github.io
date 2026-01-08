import { jest } from "@jest/globals";
import { createCityArchitectMindLink } from "../../architect/CityArchitectMindLink.js";

function mockDeps() {
  return {
    selfConsciousness: {
      getConsciousness: () => ({ metaState: { coherence: 1, tension: 0 } })
    },
    selfAwareness: { getAwareness: () => ({ level: 0.6 }) },
    spiritEngine: { getSpirit: () => ({ mood: "calm", emotion: "calm" }) },
    fateEngine: { getFate: () => ({ threads: [] }) },
    prophecyEngine: { getProphecies: () => [] },
    dreamEngine: { getDreams: () => [] },
    collectiveMemory: { getCollectiveMemory: () => ({ lastEpoch: null }) }
  };
}

test("CityArchitectMindLink produces pulses over time", () => {
  jest.useFakeTimers();
  const mindLink = createCityArchitectMindLink(mockDeps());
  const before = mindLink.getMindLink().pulses.length;

  jest.advanceTimersByTime(7000 * 2);

  const after = mindLink.getMindLink().pulses.length;
  expect(after).toBeGreaterThan(before);
});

