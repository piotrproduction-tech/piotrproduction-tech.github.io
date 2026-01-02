// modules/gate_FE-01_FE-00_full_loop_fix_generator.js

import fs from "fs";
import path from "path";

export function generateFestivalCityFullLoopFix() {
  const targetFile = path.join(
    "__tests__",
    "visualizers",
    "FESTIVAL_CITY__full_loop.test.js"
  );

  if (!fs.existsSync(targetFile)) {
    console.error("FULL LOOP test not found:", targetFile);
    return;
  }

  let content = fs.readFileSync(targetFile, "utf8");

  // Jeśli FIX już jest – nic nie rób
  if (content.includes("// === FULL LOOP FIX ===")) {
    console.log("FULL LOOP FIX already present. Skipping.");
    return;
  }

  const fixBlock = `

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
`;

  // Wstrzykujemy FIX tuż przed expect(true).toBe(true);
  const marker = "      expect(true).toBe(true);";
  if (!content.includes(marker)) {
    console.error("Could not find expect(true).Be(true) marker in test file.");
    return;
  }

  content = content.replace(marker, fixBlock + "\n" + marker);

  fs.writeFileSync(targetFile, content, "utf8");
  console.log("FULL LOOP FIX injected into:", targetFile);
}

// AUTO-RUN WHEN EXECUTED DIRECTLY
if (process.argv[1].includes("gate_FE-01_FE-00_full_loop_fix_generator")) {
  generateFestivalCityFullLoopFix();
}
