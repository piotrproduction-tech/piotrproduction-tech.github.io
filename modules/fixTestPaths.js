// modules/fixTestPaths.js
const fs = require("fs");
const path = require("path");

const TEST_DIR = "__tests__";

console.log("=== Fixing test paths in __tests__/ ===");

if (!fs.existsSync(TEST_DIR)) {
    console.log("SKIP (no __tests__ directory)");
    process.exit(0);
}

const files = fs.readdirSync(TEST_DIR).filter(f => f.endsWith(".test.js"));

files.forEach(file => {
    const filePath = path.join(TEST_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // 🔥 Zamiana ../../ na ../
    content = content.replace(/require\("\.\.\/\.\.\//g, 'require("../');

    // 🔥 Zamiana ścieżek typu ../../../ na ../
    content = content.replace(/require\("\.\.\/\.\.\/\.\.\//g, 'require("../');

    // 🔥 Zamiana ścieżek do modułów projektu
    const modules = [
        "AI_Director",
        "SYNC_ENGINE",
        "CITY_VISUALIZER",
        "FE-05__Festival_HyperOrchestrator"
    ];

    modules.forEach(mod => {
        const regex = new RegExp(`require\\("\\.\\.\\/(${mod})`, "g");
        content = content.replace(regex, `require("../$1`);
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("FIXED:", filePath);
    } else {
        console.log("OK:", filePath);
    }
});

console.log("=== Done fixing test paths ===");
