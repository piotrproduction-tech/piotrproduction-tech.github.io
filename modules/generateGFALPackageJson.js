// modules/generateGFALPackageJson.js
import fs from "fs";
import path from "path";

console.log("=== GENERATOR: GFAL package.json injector ===");

const APPS_DIR = "apps";

// 1. Pobierz wszystkie foldery w apps/
const apps = fs.readdirSync(APPS_DIR).filter((name) => {
  return name.startsWith("GFAL-") && fs.statSync(path.join(APPS_DIR, name)).isDirectory();
});

if (apps.length === 0) {
  console.log("Brak modułów GFAL w folderze apps/");
  process.exit(0);
}

apps.forEach((folder) => {
  const modulePath = path.join(APPS_DIR, folder);
  const pkgPath = path.join(modulePath, "package.json");

  const pkgContent = {
    type: "module"
  };

  if (!fs.existsSync(pkgPath)) {
    // Tworzymy nowy package.json
    fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2));
    console.log(`DODANO package.json → ${folder}`);
  } else {
    // Uzupełniamy istniejący package.json
    const existing = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    existing.type = "module";
    fs.writeFileSync(pkgPath, JSON.stringify(existing, null, 2));
    console.log(`ZAKTUALIZOWANO package.json → ${folder}`);
  }
});

console.log("=== GFAL package.json injector — ZAKOŃCZONE ===");
