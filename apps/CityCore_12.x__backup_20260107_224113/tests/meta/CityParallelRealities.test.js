import { jest } from "@jest/globals";
import { createCityParallelRealities } from "../../multiverse/CityParallelRealities.js";

function mockDeps() {
  return {
    app: { render: () => ({ ui: true }) },
    scenarioEngine: {},
    predictiveAI: { predict: () => ({ next: true }) },
    spiritEngine: { getSpirit: () => ({ emotion: "calm", mood: "calm" }) },
    fateEngine: { getFate: () => ({ threads: [] }) },
    prophecyEngine: { getProphecies: () => [{ short: "proroctwo" }] },
    dreamEngine: { getDreams: () => [{ symbol: "sen" }] },

  };
}

test("CityParallelRealities can create and compare realities", () => {
  const engine = createCityParallelRealities(mockDeps());
  engine.createReality("A");
  engine.createReality("B");

  const diff = engine.compareRealities("A", "B");
  expect(diff).toHaveProperty("spirit");
});

