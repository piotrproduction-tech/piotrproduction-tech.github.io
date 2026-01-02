const fs = require("fs");
const path = require("path");

// ŚCIEŻKA DO MATKI (Twoja dokładna)
const TEMPLATE = path.join(__dirname, "FE-01__Festival_Pavilion");

// ŚCIEŻKA DO FOLDERU apps
const APPS = __dirname;

// Funkcja kopiująca folder rekurencyjnie
function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            if (!fs.existsSync(destPath)) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

// Generator modułu FE-XX
function createModule(moduleNumber, moduleName) {
    const moduleId = `FE-${String(moduleNumber).padStart(2, "0")}__${moduleName}`;
    const targetPath = path.join(APPS, moduleId);

    if (fs.existsSync(targetPath)) {
        console.log(`❌ Folder ${moduleId} już istnieje — pomijam.`);
        return;
    }

    console.log(`📁 Tworzę moduł: ${moduleId}`);
    copyRecursive(TEMPLATE, targetPath);

    // Podmiana nazwy modułu w module.config.json
    const configPath = path.join(targetPath, "module.config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    config.moduleId = moduleId;
    config.moduleName = moduleName.replace(/_/g, " ");
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log(`✅ Moduł ${moduleId} gotowy.`);
}

// PRZYKŁAD UŻYCIA
// createModule(2, "Marketplace");
// createModule(3, "DAO");
// createModule(4, "Business_Hub");

console.log("Generator FE gotowy do pracy.");
