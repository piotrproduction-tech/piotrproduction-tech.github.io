
// AUTO‑GENERATED: CITY → FESTIVAL BRIDGE VISUALIZER
// This file is generated automatically. Do not edit manually.

import { FestivalEngine } from "../../apps/FE-01__Festival_Pavilion/core/festivalEngine.js";

import { cityPulse } from "../../apps/FE-00__City/pulse/cityPulseEngine.js";
import { cityMood } from "../../apps/FE-00__City/mood/cityMoodEngine.js";
import { cityRhythm } from "../../apps/FE-00__City/rhythm/cityRhythmEngine.js";
import { cityHeatmap } from "../../apps/FE-00__City/heatmap/cityHeatmapEngine.js";

describe("CITY → FESTIVAL BRIDGE VISUALIZER", () => {
  it(
    "sends city signals into the festival engine",
    async () => {
      console.log("\n=== CITY → FESTIVAL BRIDGE VISUALIZER ===\n");

      // CITY DIAGNOSTICS (podgląd jak miasto oddycha podczas mostka)
      cityPulse.subscribe((bpm) => console.log("CITY PULSE →", bpm));
      cityMood.subscribe((mood) => console.log("CITY MOOD →", mood));
      cityRhythm.subscribe((rhythm) => console.log("CITY RHYTHM →", rhythm));

      const festival = new FestivalEngine();

      // Syntetyczne KLATKI MIASTA → wejście do FESTIVAL ENGINE
      const cityFrames = [
        {
          label: "Morning calm creative",
          pulse: 40,
          mood: "Calm",
          rhythm: "MorningFlow",
          phase: "RISING",
          scene: "silent_moment",
          narrativePhase: "opening",
          crowdEnergy: 50,
          energyWave: 0.3,
          intent: "flow",
          heatmap: { east: 0.2, west: 0.1, north: 0.0, south: 0.0 }
        },
        {
          label: "Midday crowd peak",
          pulse: 80,
          mood: "Chaotic",
          rhythm: "FestivalMode",
          phase: "PEAK",
          scene: "crowd_peak",
          narrativePhase: "climax",
          crowdEnergy: 90,
          energyWave: 0.8,
          intent: "chaos",
          heatmap: { east: 0.7, west: 0.6, north: 0.5, south: 0.4 }
        },
        {
          label: "Evening soft landing",
          pulse: 55,
          mood: "Calm",
          rhythm: "EveningWindDown",
          phase: "FALLING",
          scene: "closing",
          narrativePhase: "ending",
          crowdEnergy: 40,
          energyWave: 0.4,
          intent: "soft",
          heatmap: { east: 0.3, west: 0.2, north: 0.1, south: 0.1 }
        }
      ];

      for (const frame of cityFrames) {
        console.log("\n--- CITY FRAME INPUT ---");
        console.log(JSON.stringify(frame, null, 2));

        // MAPOWANIE CITY → FESTIVAL INPUT
        const festivalInput = {
          experience: {
            pulse: frame.pulse,
            wave: frame.energyWave,
            experienceState: {
              phase: frame.phase
            }
          },
          scenario: {
            activeScene: frame.scene,
            narrativePhase: frame.narrativePhase
          },
          director: {
            mood: frame.mood,
            intent: frame.intent
          },
          uiState: {
            forcedOverlayMode: null,
            forcedScene: null
          },
          audience: {
            energy: frame.crowdEnergy
          },
          // Dodatkowe pole pomocnicze – surowa mapa ciepła miasta
          cityHeatmap: frame.heatmap,
          cityRhythm: frame.rhythm,
          cityLabel: frame.label
        };

        console.log("\nCITY → FESTIVAL INPUT:");
        console.log(JSON.stringify(festivalInput, null, 2));

        const festivalFrame = festival.computeFestivalFrame(festivalInput);

        console.log("\nFESTIVAL FRAME OUTPUT:");
        console.log(JSON.stringify(festivalFrame, null, 2));

        // Krótka, czytelna diagnoza mostka
        const summary = {
          fromCity: {
            label: frame.label,
            pulse: frame.pulse,
            mood: frame.mood,
            rhythm: frame.rhythm,
            phase: frame.phase
          },
          toFestival: {
            finalScene: festivalFrame.decision?.finalScene ?? null,
            finalOverlay: festivalFrame.decision?.finalOverlay ?? null,
            finalDirectorIntent: festivalFrame.decision?.finalDirectorIntent ?? null,
            visualPulse: festivalFrame.visual?.pulse ?? null,
            visualWave: festivalFrame.visual?.wave ?? null,
            visualPhase: festivalFrame.visual?.phase ?? null
          }
        };

        console.log("\nCITY → FESTIVAL SUMMARY:");
        console.log(JSON.stringify(summary, null, 2));

        await new Promise((res) => setTimeout(res, 500));
      }

      await new Promise((res) => setTimeout(res, 4000));

      console.log("\n=== END CITY → FESTIVAL BRIDGE ===\n");

      expect(true).toBe(true);
    },
    20000
  );
});
