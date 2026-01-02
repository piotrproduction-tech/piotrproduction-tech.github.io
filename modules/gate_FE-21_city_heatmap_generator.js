const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const APPS = path.join(ROOT, "apps");

const FE00 = path.join(APPS, "FE-00__City");

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
  console.log("=== City‑Wide Activity Heatmap generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  // 1. Ensure heatmap engine directory
  const heatmapDir = path.join(FE00, "heatmap");
  ensureDir(heatmapDir);

  // 2. Heatmap engine
  const heatmapEngineFile = path.join(heatmapDir, "cityHeatmapEngine.js");
  ensureFile(
    heatmapEngineFile,
    `export const cityHeatmap = {
  districts: {},
  update(districtId) {
    if (!this.districts[districtId]) {
      this.districts[districtId] = { intensity: 0, lastEvent: null };
    }

    const d = this.districts[districtId];
    d.intensity = Math.min(1, d.intensity + 0.25);
    d.lastEvent = Date.now();

    // decay
    setTimeout(() => {
      d.intensity = Math.max(0, d.intensity - 0.25);
    }, 3000);
  }
};`
  );

  // 3. Listener for SuperEngine events
  const listenerFile = path.join(heatmapDir, "cityHeatmapListener.js");
  ensureFile(
    listenerFile,
    `import { cityHeatmap } from "./cityHeatmapEngine";
import { superEngineClient } from "../../FE-21__Marketplace/utils/SuperEngineClient";

// Map event types to districts
const districtMap = {
  "marketplace": "FE-21",
  "creator": "FE-21",
  "street": "FE-21",
  "festival": "FE-33",
  "community": "FE-03",
  "city": "FE-00"
};

superEngineClient.subscribe(event => {
  const prefix = event.type.split(".")[0];
  const districtId = districtMap[prefix];

  if (districtId) {
    cityHeatmap.update(districtId);
  }
});
`
  );

  // 4. Heatmap UI overlay
  const heatmapViewFile = path.join(FE00, "views", "CityHeatmapOverlay.js");
  ensureFile(
    heatmapViewFile,
    `import { cityHeatmap } from "../heatmap/cityHeatmapEngine";

export default function CityHeatmapOverlay() {
  return (
    <div className="city-heatmap-overlay">
      {Object.entries(cityHeatmap.districts).map(([id, data]) => (
        <div
          key={id}
          className="heatmap-dot"
          style={{
            opacity: data.intensity,
            boxShadow: \`0 0 \${40 * data.intensity}px rgba(255, 80, 0, 0.8)\`,
            position: "absolute",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            left: id === "FE-21" ? "200px" :
                  id === "FE-33" ? "350px" :
                  id === "FE-03" ? "120px" :
                  "50px",
            top: id === "FE-21" ? "150px" :
                 id === "FE-33" ? "220px" :
                 id === "FE-03" ? "300px" :
                 "80px"
          }}
        />
      ))}
    </div>
  );
}`
  );

  // 5. Patch CityMapView to include heatmap overlay
  const mapViewFile = path.join(FE00, "views", "CityMapView.js");
  ensureFile(mapViewFile, `export default function CityMapView() { return "City Map"; }`);

  appendIfMissing(
    mapViewFile,
    "CityHeatmapOverlay",
    `import CityHeatmapOverlay from "./CityHeatmapOverlay";

export function CityMapWithHeatmap() {
  return (
    <div className="city-map-with-heatmap">
      <CityHeatmapOverlay />
    </div>
  );
}`
  );

  console.log("=== City‑Wide Activity Heatmap generator done ===");
}

if (require.main === module) {
  main();
}
