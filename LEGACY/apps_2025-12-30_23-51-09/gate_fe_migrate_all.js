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

// Usuwanie starych plików FE-XX__*
function cleanOldFiles(folder, prefix) {
    const entries = fs.readdirSync(folder);

    for (let file of entries) {
        if (file.startsWith(prefix)) {
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

    // 1. Usuń stare pliki FE-XX__*
    cleanOldFiles(targetPath, moduleFolder);

    // 2. Skopiuj matkę FE-01
    copyRecursive(TEMPLATE, targetPath);

    // 3. Podmień moduleId i moduleName
    const configPath = path.join(targetPath, "module.config.json");
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

    config.moduleId = moduleFolder;
    config.moduleName = moduleFolder.replace(/^FE-\d+__/, "").replace(/_/g, " ");

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log(`✅ Migracja zakończona: ${moduleFolder}`);
}

// Migracja wszystkich FE-XX poza FE-01 i FE-02
function migrateAll() {
    const entries = fs.readdirSync(__dirname);

    entries.forEach(folder => {
        if (folder.startsWith("FE-") &&
            folder !== "FE-01__Festival_Pavilion" &&
            folder !== "FE-02__Finance_And_Admin") {

            migrateOne(folder);
        }
    });

    console.log("🏙️ Migracja całego miasta zakończona.");
}

migrateAll();
