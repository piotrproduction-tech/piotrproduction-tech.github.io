import fs from "fs";
import path from "path";

const overlays = [
  "CityHeatmapOverlay",
  "CityPulseOverlay",
  "CityMoodOverlay",
  "CityWeatherOverlay",
  "CityRhythmOverlay",
  "CityBroadcastOverlay",
  "CityMemoryOverlay",
  "CityAIOverlay",
  "CityPersonalityOverlay",
  "CityNarrativeOverlay",
  "CityEconomyOverlay",
  "CityReputationOverlay",
  "CityGovernanceOverlay",
  "CitySimulationOverlay",
  "CityEmergenceOverlay"
];

const baseDir = path.resolve("src/views");

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

function overlayTemplate(name) {
  return `
import React from "react";

export function ${name}({ data }) {
  return (
    <div className="${name}-overlay">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
`;
}

overlays.forEach((name) => {
  const filePath = path.join(baseDir, `${name}.jsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, overlayTemplate(name));
    console.log("✔ Created:", filePath);
  } else {
    console.log("• Exists:", filePath);
  }
});

// Glow file
const glowPath = path.resolve("src/map/cityMapGlow.js");
const glowDir = path.dirname(glowPath);

if (!fs.existsSync(glowDir)) {
  fs.mkdirSync(glowDir, { recursive: true });
}

if (!fs.existsSync(glowPath)) {
  fs.writeFileSync(
    glowPath,
    `export function cityMapGlow(ctx) {
  // minimal glow stub
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}`
  );
  console.log("✔ Created:", glowPath);
} else {
  console.log("• Exists:", glowPath);
}

console.log("\\n✨ All overlays generated.");
