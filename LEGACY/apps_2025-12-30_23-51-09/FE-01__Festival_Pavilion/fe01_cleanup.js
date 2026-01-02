const fs = require("fs");
const path = require("path");

const ROOT = __dirname;

// Ścieżki
const PANELS_OLD = path.join(ROOT, "PANELS");
const PANELS_NEW = path.join(ROOT, "panels");

const LEGACY_FILES = [
  "module.html",
  "module.js",
  "README_FE-01.md",
  "README_FE-01__Festival_Pavilion.md"
];

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function movePanelsFolder() {
  if (fs.existsSync(PANELS_OLD)) {
    console.log("🔧 Przenoszę PANELS → panels...");
    ensureDir(PANELS_NEW);

    const files = fs.readdirSync(PANELS_OLD);
    for (const file of files) {
      fs.renameSync(
        path.join(PANELS_OLD, file),
        path.join(PANELS_NEW, file)
      );
    }

    fs.rmdirSync(PANELS_OLD);
    console.log("✅ Folder panels gotowy.");
  } else {
    console.log("✔ Folder panels już jest OK.");
  }
}

function fixExtensions() {
  const files = fs.readdirSync(PANELS_NEW);
  for (const file of files) {
    if (file.endsWith(".js") && !file.endsWith(".jsx")) {
      const oldPath = path.join(PANELS_NEW, file);
      const newPath = path.join(PANELS_NEW, file.replace(".js", ".jsx"));
      fs.renameSync(oldPath, newPath);
      console.log(`🔧 Zmieniono rozszerzenie: ${file} → ${file.replace(".js", ".jsx")}`);
    }
  }
}

function removeLegacyFiles() {
  for (const file of LEGACY_FILES) {
    const filePath = path.join(ROOT, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Usunięto legacy: ${file}`);
    }
  }
}

function fixIndexJs() {
  const indexPath = path.join(ROOT, "index.js");
  if (!fs.existsSync(indexPath)) {
    console.log("⚠️ Brak index.js — pomijam.");
    return;
  }

  let content = fs.readFileSync(indexPath, "utf8");

  // Usuń stary eksport modułu
  content = content.replace(
    /export const FestivalPavilionModule[\s\S]*?};/m,
    ""
  );

  // Usuń podwójne importy z PANELS
  content = content.replace(/from ".\/PANELS\/.*";/g, "");

  // Usuń puste linie
  content = content.replace(/\n{3,}/g, "\n\n");

  fs.writeFileSync(indexPath, content);
  console.log("🔧 Oczyszczono index.js ze starych eksportów i importów.");
}

console.log("🏁 FE‑01 CLEANUP GENERATOR v1 start...");

movePanelsFolder();
fixExtensions();
removeLegacyFiles();
fixIndexJs();

console.log("🎉 FE‑01 CLEANUP zakończony. Moduł jest czysty i zgodny ze standardem.");
