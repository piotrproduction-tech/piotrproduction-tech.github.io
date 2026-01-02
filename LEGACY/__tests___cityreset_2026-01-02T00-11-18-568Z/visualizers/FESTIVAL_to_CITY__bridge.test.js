
// AUTO‑GENERATED: FESTIVAL → CITY BRIDGE VISUALIZER
// This file is generated automatically. Do not edit manually.

import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine.js";

import { cityPulse } from "../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityMood } from "../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityHeatmap } from "../../apps/FE-00__City/heatmap/cityHeatmapEngine.js";

describe("FESTIVAL → CITY BRIDGE VISUALIZER", () => {
  it(
    "sends festival signals into the city engine",
    async () => {
      console.log("\n=== FESTIVAL → CITY BRIDGE VISUALIZER ===\n");

      // CITY DIAGNOSTICS
      cityPulse.subscribe((bpm) => console.log("CITY PULSE →", bpm));
      cityMood.subscribe((mood) => console.log("CITY MOOD →", mood));
      cityRhythm.subscribe((rhythm) => console.log("CITY RHYTHM →", rhythm));

      // FESTIVAL ENGINE
      const festival = new FestivalEngine();

      const inputs = [
        {
          experience: { pulse: 80, wave: 0.6, experienceState: { phase: "RISING" } },
          scenario: { activeScene: null, narrativePhase: "opening" },
          director: { mood: "Calm", intent: "flow" },
          uiState: { forcedOverlayMode: null, forcedScene: null },
          audience: { energy: 70 }
        },
        {
          experience: { pulse: 95, wave: 0.9, experienceState: { phase: "PEAK" } },
          scenario: { activeScene: "main_show", narrativePhase: "climax" },
          director: { mood: "Chaos", intent: "chaos" },
          uiState: { forcedOverlayMode: null, forcedScene: null },
          audience: { energy: 95 }
        },
        {
          experience: { pulse: 60, wave: 0.3, experienceState: { phase: "FALLING" } },
          scenario: { activeScene: "closing", narrativePhase: "ending" },
          director: { mood: "Calm", intent: "soft" },
          uiState: { forcedOverlayMode: null, forcedScene: null },
          audience: { energy: 40 }
        }
      ];

      for (const input of inputs) {
        console.log("\n--- FESTIVAL FRAME INPUT ---");
        console.log(JSON.stringify(input, null, 2));

        const frame = festival.computeFestivalFrame(input);

        console.log("\nFULL FESTIVAL FRAME:");
        console.log(JSON.stringify(frame, null, 2));

        // AUTO‑DETECT MAPPING
        const pulse = frame.experience?.pulse ?? frame.pulse ?? null;
        const wave = frame.experience?.wave ?? frame.wave ?? null;
        const phase = frame.experience?.experienceState?.phase ?? frame.phase ?? null;
        const overlay = frame.visual?.overlay ?? frame.overlay ?? null;
        const energy = frame.audience?.energy ?? frame.energy ?? null;

        const event = {
          type: "festival.frame",
          pulse,
          wave,
          phase,
          overlay,
          energy
        };

        console.log("\nSENDING TO CITY:", event);

        cityPulse.trigger(event);
        cityMood.update(event);
        cityRhythm.update();

        const district = ["north", "south", "east", "west"][Math.floor(Math.random() * 4)];
        cityHeatmap.update(district);

        console.log("CITY HEATMAP:", cityHeatmap.districts);

        await new Promise((res) => setTimeout(res, 400));
      }

      await new Promise((res) => setTimeout(res, 7000));

      console.log("\n=== END FESTIVAL → CITY BRIDGE ===\n");

      expect(true).toBe(true);
    },
    20000
  );
});
