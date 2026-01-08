import { jest } from "@jest/globals";
import { createCityCollectiveMemory } from "../../memory/CityCollectiveMemory.js";

function mockDeps() {
  return {
    recorder: { getTimeline: () => [{ at: Date.now(), district: "X" }] },
    mythEngine: { getMyths: () => ["mit"] },
    dreamEngine: { getDreams: () => [{ symbol: "sen" }] },
    prophecyEngine: { getProphecies: () => [{ short: "proroctwo" }] },
    afterlifeEngine: { getAfterlife: () => ({ districts: [], aiEntities: [] }) }
  };
}

test("CityCollectiveMemory creates epochs over time", () => {
  jest.useFakeTimers();
  const engine = createCityCollectiveMemory(mockDeps());
  const before = engine.getCollectiveMemory().epochs.length;

  jest.advanceTimersByTime(45000 * 2);

  const after = engine.getCollectiveMemory().epochs.length;
  expect(after).toBeGreaterThan(before);
});

