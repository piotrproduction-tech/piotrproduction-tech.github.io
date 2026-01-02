const fs = require("fs");
const path = require("path");

// Ścieżka do matki FE-01
const TEMPLATE = path.join(__dirname, "FE-01__Festival_Pavilion");

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
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Funkcja usuwająca stare pliki FE-XX
function cleanOldFiles(folder) {
    const entries = fs.readdirSync(folder);

    for (let file of entries) {
        if (file.startsWith("FE-02__")) {
            fs.unlinkSync(path.join(folder, file));
        }
    }
}

// Migracja jednego modułu
function migrateOne(moduleFolder) {
    const targetPath = path.join(__dirname, moduleFolder);

    if (!fs.existsSync(targetPath)) {
        console.log(`❌ Folder ${moduleFolder} nie istnieje.`);
        return;
    }

    console.log(`🔧 Migracja modułu: ${moduleFolder}`);

    // 1. Usuń stare pliki FE-02__*
    cleanOldFiles(targetPath);

    // 2. Skopiuj matkę FE-01
    copyRecursive(TEMPLATE, targetPath);

    // 3. Podmień moduleId i moduleName
    const configPath = path.join(targetPath, "module.config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    config.moduleId = moduleFolder;
    config.moduleName = moduleFolder.replace("FE-02__", "").replace(/_/g, " ");

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log(`✅ Migracja zakończona: ${moduleFolder}`);
}

// URUCHOMIENIE TESTU
migrateOne("FE-02__Finance_And_Admin");

console.log("Generator migracji FE-02 gotowy.");
