const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");

const FE00 = path.join(APPS, "FE-00__City");
const FE21 = path.join(APPS, "FE-21__Marketplace");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("[DIR] created:", dir);
  }
}

function ensureFile(filePath, defaultContent) {
  const dir = path.dirname(filePath);
  ensureDir(dir);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent, "utf8");
    console.log("[FILE] created:", filePath);
  }
}

function appendIfMissing(filePath, marker, block) {
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.includes(marker)) {
    fs.writeFileSync(filePath, content + "\n" + block, "utf8");
    console.log("[INTEGRATION] added:", marker);
  } else {
    console.log("[SKIP] already integrated:", marker);
  }
}

function main() {
  console.log("=== FE‑21 → City Map Glow Engine Integration start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE‑21__Marketplace not found:", FE21);
    process.exit(1);
  }

  // 1. Ensure map engine exists
  const mapDir = path.join(FE00, "map");
  ensureDir(mapDir);

  const glowFile = path.join(mapDir, "cityMapGlow.js");
  ensureFile(glowFile, `export const cityMapGlow = {};`);

  // 2. Add FE‑21 glow logic
  appendIfMissing(
    glowFile,
    "FE-21",
    `// Glow logic for FE‑21 Marketplace
cityMapGlow["FE-21"] = {
  active: false,
  intensity: 0,
  lastEvent: null,
  trigger(event) {
    this.active = true;
    this.intensity = 1;
    this.lastEvent = event;

    // fade out after 3 seconds
    setTimeout(() => {
      this.intensity = 0;
      this.active = false;
    }, 3000);
  }
};`
  );

  // 3. Integrate with SuperEngine event feed
  const superEngineIntegrationFile = path.join(FE00, "map", "cityMapGlowListener.js");
  ensureFile(
    superEngineIntegrationFile,
    `import { cityMapGlow } from "./cityMapGlow";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

superEngineClient.subscribe(event => {
  // Marketplace events
  if (event.type.startsWith("marketplace.")) {
    cityMapGlow["FE-21"].trigger(event);
  }

  // Creator events
  if (event.type.startsWith("creator.")) {
    cityMapGlow["FE-21"].trigger(event);
  }

  // Street signals
  if (event.type.startsWith("street.")) {
    cityMapGlow["FE-21"].trigger(event);
  }
});
`
  );

  // 4. Patch City Map UI to show glow
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "FE-21 glow",
    `// FE‑21 glow integration
import { cityMapGlow } from "../map/cityMapGlow";

export function MarketplaceGlow() {
  const glow = cityMapGlow["FE-21"];

  if (!glow || !glow.active) return null;

  return (
    <div className="district-glow" style={{
      boxShadow: \`0 0 \${20 * glow.intensity}px #ffb347\`,
      borderRadius: "12px",
      position: "absolute",
      width: "120px",
      height: "120px",
      left: "200px",
      top: "150px"
    }}>
    </div>
  );
}`
  );

  console.log("=== FE‑21 → City Map Glow Engine Integration done ===");
}

if (require.main === module) {
  main();
}
