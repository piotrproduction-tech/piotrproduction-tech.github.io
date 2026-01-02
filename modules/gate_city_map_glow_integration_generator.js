/**
 * FAZA 4C — KROK 4
 * CITY MAP GLOW INTEGRATION GENERATOR
 *
 * Integruje subtelny glow (A1) z CityMapEngine.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const FE00 = path.join(ROOT, "apps", "FE-00__City");
const CITY_MAP_ENGINE = path.join(FE00, "MAP", "CityMapEngine.js");

function patchCityMapEngine() {
  if (!fs.existsSync(CITY_MAP_ENGINE)) {
    console.log("❌ Nie znaleziono MAP/CityMapEngine.js");
    return;
  }

  let content = fs.readFileSync(CITY_MAP_ENGINE, "utf8");
  let changed = false;

  // 1. Import useTileGlow
  if (!content.includes('useTileGlow')) {
    content = content.replace(
      /from ".\/CityMapAnimations";/,
      'from "./CityMapAnimations";\nimport { useTileGlow } from "./CityMapAnimations";'
    );
    changed = true;
    console.log("📄 Dodano import useTileGlow z CityMapAnimations");
  }

  // 2. Dodanie klasy glow do kafla
  // Szukamy fragmentu z renderowaniem kafla (div / button / tile)
  // Zakładamy, że jest coś w stylu:
  // <div ... className="city-tile" ...>
  if (content.includes("city-tile") && !content.includes("tile-glow")) {
    content = content.replace(
      /className="city-tile"/g,
      'className={["city-tile", glowActive ? "tile-glow" : ""].join(" ")}'
    );
    changed = true;
    console.log("📄 Dodano klasę tile-glow do city-tile");
  }

  // 3. Dodanie hooka useTileGlow(tile.id) w komponencie kafla
  // Szukamy miejsca z mapowaniem kafli: tiles.map(...)
  if (!content.includes("useTileGlow(") && content.includes(".map(")) {
    content = content.replace(
      /(tiles\.map\((.+?)=>\s*\()/,
      `tiles.map(($2) => {
  const glowActive = useTileGlow(tile.id);
  return (`
    );
    changed = true;
    console.log("📄 Dodano wywołanie useTileGlow(tile.id) w mapowaniu kafli");
  }

  if (!changed) {
    console.log("⏭  Brak zmian — wygląda na to, że CityMapEngine.js jest już zintegrowany.");
  } else {
    fs.writeFileSync(CITY_MAP_ENGINE, content);
    console.log("🎉 Zapisano zmiany w MAP/CityMapEngine.js");
  }
}

console.log("🏙️ FAZA 4C — KROK 4: CITY MAP GLOW INTEGRATION START...");
patchCityMapEngine();
console.log("🏁 FAZA 4C — KROK 4: ZAKOŃCZONY.");
