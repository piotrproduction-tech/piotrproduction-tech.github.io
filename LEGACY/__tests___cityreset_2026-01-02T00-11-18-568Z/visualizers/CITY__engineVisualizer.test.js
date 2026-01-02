// __tests__/visualizers/CITY__engineVisualizer.test.js

import { cityPulse } from "../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityMood } from "../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityHeatmap } from "../../apps/FE-00__City/heatmap/cityHeatmapEngine.js";

describe("CITY ENGINE VISUALIZER", () => {
  it(
    "simulates city reaction to events",
    async () => {
      console.log("\n=== CITY ENGINE VISUALIZER ===\n");

      cityPulse.subscribe((bpm) => {
        console.log("PULSE UPDATE → bpm:", bpm);
      });

      cityMood.subscribe((mood) => {
        console.log("MOOD UPDATE → mood:", mood);
      });

      cityRhythm.subscribe((rhythm) => {
        console.log("RHYTHM UPDATE → rhythm:", rhythm);
      });

      const events = [
        { type: "creator.post" },
        { type: "marketplace.trade" },
        { type: "street.noise" },
        { type: "festival.show" },
        { type: "community.meeting" }
      ];

      for (const event of events) {
        console.log("\n--- EVENT:", event.type, "---");

        cityPulse.trigger(event);
        cityMood.update(event);
        cityRhythm.update();

        const district = ["north", "south", "east", "west"][Math.floor(Math.random() * 4)];
        cityHeatmap.update(district);

        console.log("HEATMAP:", cityHeatmap.districts);

        await new Promise((res) => setTimeout(res, 300));
      }

      // ⭐ Czekamy aż WSZYSTKIE decay timery się wykonają
      await new Promise((res) => setTimeout(res, 7000));

      console.log("\n=== END CITY VISUALIZER ===\n");

      expect(true).toBe(true);
    },
    15000 // ⭐ ZWIĘKSZONY TIMEOUT TESTU
  );
});
