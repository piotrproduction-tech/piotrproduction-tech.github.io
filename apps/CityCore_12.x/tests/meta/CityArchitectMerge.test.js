import { jest } from "@jest/globals";
import { createCityArchitectMerge } from "../../architect/CityArchitectMerge.js";

function mockDeps() {
  return {
    mindLink: {
      getMindLink: () => ({ lastPulse: { symbol: "" } })
    },
    architectConsole: {
      ask: q => ({ question: q, answer: "Miasto odpowiada." })
    },
    selfConsciousness: {
      getConsciousness: () => ({ metaState: { coherence: 1, tension: 0 } })
    },
    selfAwareness: { getAwareness: () => ({ level: 0.8 }) },
    omniscienceEngine: {
      getOmniscience: () => ({
        dominantDestiny: "AI intensifies",
        dominantEmotion: "calm",
        dominantDreamSymbol: "symbol",
        dominantProphecy: "proroctwo"
      })
    }
  };
}

test("CityArchitectMerge requires merge to be active for coDecide", () => {
  const merge = createCityArchitectMerge(mockDeps());
  const res = merge.coDecide("Pytanie?");
  expect(res.decision).toBe("merge_not_active");
});

test("CityArchitectMerge coDecide works in merge mode", () => {
  const merge = createCityArchitectMerge(mockDeps());
  merge.enterMerge({ name: "Piotr", intent: "care" });

  const res = merge.coDecide("Czy zmieniamy architektur?");
  expect(res.mergedConclusion).toContain("Architekt i Miasto wsplnie czuj");
});

