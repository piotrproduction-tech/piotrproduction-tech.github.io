
// AUTO‑GENERATED: FULL LOOP FESTIVAL ↔ CITY VISUALIZER
// This file is generated automatically. Do not edit manually.

import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine.js";

import { cityPulse } from "../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityMood } from "../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityHeatmap } from "../../apps/FE-00__City/heatmap/cityHeatmapEngine.js";

describe("FULL LOOP FESTIVAL ↔ CITY VISUALIZER", () => {
  it(
    "runs a 20‑frame loop between festival and city",
    async () => {
      console.log("\n=== FULL LOOP FESTIVAL ↔ CITY VISUALIZER ===\n");

      const festival = new FestivalEngine();

      // Subskrypcje diagnostyczne CITY
      cityPulse.subscribe((bpm) => console.log("CITY PULSE →", bpm));
      cityMood.subscribe((mood) => console.log("CITY MOOD →", mood));
      cityRhythm.subscribe((rhythm) => console.log("CITY RHYTHM →", rhythm));

      let cityState = {
        pulse: 50,
        mood: "Calm",
        rhythm: "MorningFlow",
        phase: "RISING",
        scene: "silent_moment",
        narrativePhase: "opening",
        crowdEnergy: 60,
        energyWave: 0.4,
        intent: "flow",
        heatmap: { east: 0.2, west: 0.1, north: 0.1, south: 0.1 }
      };

      for (let i = 1; i <= 20; i++) {
        console.log("\n==============================");
        console.log("FRAME", i);
        console.log("==============================");

        console.log("\nCITY → FESTIVAL INPUT:");
        console.log(JSON.stringify(cityState, null, 2));

        // CITY → FESTIVAL
        const festivalInput = {
          experience: {
            pulse: cityState.pulse,
            wave: cityState.energyWave,
            experienceState: { phase: cityState.phase }
          },
          scenario: {
            activeScene: cityState.scene,
            narrativePhase: cityState.narrativePhase
          },
          director: {
            mood: cityState.mood,
            intent: cityState.intent
          },
          uiState: {
            forcedOverlayMode: null,
            forcedScene: null
          },
          audience: {
            energy: cityState.crowdEnergy
          },
          cityHeatmap: cityState.heatmap,
          cityRhythm: cityState.rhythm
        };

        const festivalFrame = festival.computeFestivalFrame(festivalInput);

        console.log("\nFESTIVAL FRAME OUTPUT:");
        console.log(JSON.stringify(festivalFrame, null, 2));

        // FESTIVAL → CITY
        const event = {
          type: "festival.frame",
          pulse: festivalFrame.visual?.pulse ?? 50,
          wave: festivalFrame.visual?.wave ?? 0.4,
          phase: festivalFrame.visual?.phase ?? "RISING",
          overlay: festivalFrame.visual?.overlay ?? null,
          energy: festivalFrame.audience?.energy ?? cityState.crowdEnergy
        };

        console.log("\nFESTIVAL → CITY EVENT:");
        console.log(JSON.stringify(event, null, 2));

        cityPulse.trigger(event);
        cityMood.update(event);
        cityRhythm.update();

        const district = ["north", "south", "east", "west"][Math.floor(Math.random() * 4)];
        cityHeatmap.update(district);

        console.log("CITY HEATMAP:", cityHeatmap.districts);

        // Aktualizacja CITY STATE na podstawie reakcji miasta
        cityState = {
          pulse: event.pulse,
          mood: cityMood.current,
          rhythm: cityRhythm.current,
          phase: event.phase,
          scene: festivalFrame.decision?.finalScene ?? cityState.scene,
          narrativePhase: festivalFrame.scenario?.narrativePhase ?? cityState.narrativePhase,
          crowdEnergy: event.energy,
          energyWave: event.wave,
          intent: festivalFrame.decision?.finalDirectorIntent ?? cityState.intent,
          heatmap: cityHeatmap.districts
        };

        await new Promise((res) => setTimeout(res, 300));
      }

      console.log("\n=== END FULL LOOP FESTIVAL ↔ CITY ===\n");



      // === FULL LOOP FIX ===
      // Wyłączamy wszystkie subskrypcje i timery miasta

      if (cityPulse.clear) cityPulse.clear();
      if (cityMood.clear) cityMood.clear();
      if (cityRhythm.clear) cityRhythm.clear();
      if (cityHeatmap.clear) cityHeatmap.clear();

      // Jeśli masz cityReset v3 — użyj go
      try {
        const { cityResetV3 } = await import("../../apps/FE-00__City/modules/gate_city_reset_v3.js");
        if (cityResetV3) {
          console.log("CITY RESET V3 → OK");
          cityResetV3();
        }
      } catch (e) {
        console.log("CITY RESET V3 not available, skipping.");
      }

      // Wyłącz FESTIVAL ENGINE jeśli ma timery
      if (festival.stop) {
        festival.stop();
      }

      expect(true).toBe(true);
    },
    30000
  );
});
