// scripts/createModule.mjs
import fs from "fs";
import path from "path";

// ---------------
// 1. Pobierz parametry z linii komend
// ---------------
const [,, moduleId, ...nameParts] = process.argv;

if (!moduleId || nameParts.length === 0) {
    console.error("Użycie: node scripts/createModule.mjs FE-45 \"Module Name\"");
    process.exit(1);
}

const moduleName = nameParts.join(" ");
const safeName = moduleName.replace(/\s+/g, "_");
const folderName = `${moduleId}_${safeName}`;
const modulesRoot = path.join(process.cwd(), "modules");
const moduleFolder = path.join(modulesRoot, folderName);

console.log(`\n[Generator] Tworzę moduł:`);
console.log(`- ID: ${moduleId}`);
console.log(`- Name: ${moduleName}`);
console.log(`- Folder: modules/${folderName}\n`);

// ---------------
// 2. Upewnij się, że istnieje katalog modules/
// ---------------
if (!fs.existsSync(modulesRoot)) {
    console.log("[Generator] Tworzę folder modules/");
    fs.mkdirSync(modulesRoot);
}

// ---------------
// 3. Sprawdź, czy moduł już istnieje
// ---------------
if (fs.existsSync(moduleFolder)) {
    console.error(`[Generator] Folder modules/${folderName} już istnieje. Przerywam.`);
    process.exit(1);
}

// ---------------
// 4. Utwórz folder modułu
// ---------------
fs.mkdirSync(moduleFolder);
console.log(`[Generator] Utworzono folder: modules/${folderName}`);

// ---------------
// 5. Zawartości plików szablonu
// ---------------
const htmlContent = `
<div class="module module-${moduleId}">
    <h2>${moduleName}</h2>

    <div id="module-content">
        <p>Moduł ${moduleId} został poprawnie załadowany.</p>
    </div>
</div>
`.trimStart();

const jsContent = `
console.log("[${moduleId}] JS loaded");

export function init() {
    console.log("[${moduleId}] init()");

    const content = document.getElementById("module-content");
    if (!content) {
        console.error("[${moduleId}] Brak elementu #module-content");
        return;
    }

    content.innerHTML = \`
        <p>Moduł ${moduleId} działa poprawnie.</p>
    \`;
}
`.trimStart();

const cssContent = `
.module-${moduleId} {
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
    margin-top: 20px;
    font-family: Arial, sans-serif;
}
`.trimStart();

const manifestContent = `
{
    "id": "${moduleId}",
    "name": "${moduleName}",
    "version": "1.0.0",
    "author": "Piotr",
    "description": "Moduł ${moduleId} - ${moduleName}",
    "requires": []
}
`.trimStart();

// ---------------
// 6. Zapisz pliki
// ---------------
fs.writeFileSync(path.join(moduleFolder, `${moduleId}.html`), htmlContent, "utf8");
console.log(`[Generator] Utworzono: modules/${folderName}/${moduleId}.html`);

fs.writeFileSync(path.join(moduleFolder, `${moduleId}.js`), jsContent, "utf8");
console.log(`[Generator] Utworzono: modules/${folderName}/${moduleId}.js`);

fs.writeFileSync(path.join(moduleFolder, `${moduleId}.css`), cssContent, "utf8");
console.log(`[Generator] Utworzono: modules/${folderName}/${moduleId}.css`);

fs.writeFileSync(path.join(moduleFolder, "manifest.json"), manifestContent, "utf8");
console.log(`[Generator] Utworzono: modules/${folderName}/manifest.json`);

console.log("\n[Generator] Gotowe. Moduł utworzony.\n");
