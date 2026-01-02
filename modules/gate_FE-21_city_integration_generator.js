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
  console.log("=== FE‑21 → FE‑00 City Integration generator start ===");

  if (!fs.existsSync(FE00)) {
    console.error("[ERROR] FE‑00__City not found:", FE00);
    process.exit(1);
  }

  if (!fs.existsSync(FE21)) {
    console.error("[ERROR] FE‑21__Marketplace not found:", FE21);
    process.exit(1);
  }

  // --- Ensure FE‑00 structure exists ---
  const menuDir = path.join(FE00, "menu");
  const routerDir = path.join(FE00, "router");
  const accessDir = path.join(FE00, "access");
  const mapDir = path.join(FE00, "map");
  const configDir = path.join(FE00, "config");
  const viewsDir = path.join(FE00, "views");

  ensureDir(menuDir);
  ensureDir(routerDir);
  ensureDir(accessDir);
  ensureDir(mapDir);
  ensureDir(configDir);
  ensureDir(viewsDir);

  // --- MENU ---
  const menuFile = path.join(menuDir, "cityMenu.js");
  ensureFile(menuFile, `export const cityMenu = [];`);

  appendIfMissing(
    menuFile,
    "FE-21__Marketplace",
    `cityMenu.push({
  id: "FE-21__Marketplace",
  label: "Marketplace",
  path: "/marketplace",
  icon: "🛒"
});`
  );

  // --- ROUTER ---
  const routerFile = path.join(routerDir, "cityRouter.js");
  ensureFile(routerFile, `export const cityRoutes = [];`);

  appendIfMissing(
    routerFile,
    "/marketplace",
    `cityRoutes.push({
  path: "/marketplace",
  component: require("../../FE-21__Marketplace/views/DashboardView.js").default
});`
  );

  // --- ACCESS ---
  const accessFile = path.join(accessDir, "cityAccess.js");
  ensureFile(accessFile, `export const cityAccess = {};`);

  appendIfMissing(
    accessFile,
    "FE-21__Marketplace",
    `cityAccess["FE-21__Marketplace"] = {
  marketplace: true,
  creator: true,
  street: true
};`
  );

  // --- MAP ---
  const mapFile = path.join(mapDir, "cityMap.js");
  ensureFile(mapFile, `export const cityMap = [];`);

  appendIfMissing(
    mapFile,
    "districtId: 'FE-21'",
    `cityMap.push({
  districtId: "FE-21",
  name: "Marketplace",
  icon: "🛒",
  path: "/marketplace",
  color: "#ffb347"
});`
  );

  // --- DISTRICT REGISTRY ---
  const districtsFile = path.join(configDir, "districts.json");
  ensureFile(districtsFile, "[]");

  const districts = JSON.parse(fs.readFileSync(districtsFile, "utf8"));
  const exists = districts.find(d => d.id === "FE-21");

  if (!exists) {
    districts.push({
      id: "FE-21",
      name: "Marketplace",
      path: "/marketplace",
      type: "district"
    });
    fs.writeFileSync(districtsFile, JSON.stringify(districts, null, 2));
    console.log("[DISTRICT] added FE‑21 to registry");
  }

  // --- CITY HOME ---
  const homeFile = path.join(viewsDir, "CityHome.js");
  ensureFile(homeFile, `export default function CityHome() { return "City Home"; }`);

  appendIfMissing(
    homeFile,
    "Go to Marketplace",
    `export function MarketplaceLink() {
  return (
    <a href="/marketplace" className="city-link">
      🛒 Go to Marketplace
    </a>
  );
}`
  );

  console.log("=== FE‑21 → FE‑00 City Integration generator done ===");
}

if (require.main === module) {
  main();
}
