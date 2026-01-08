// modules/fixHyperOrchestratorPaths.js
const fs = require("fs");
const path = require("path");

const TEST_DIR = "__tests__";

console.log("=== Fixing HyperOrchestrator paths in __tests__/ ===");

if (!fs.existsSync(TEST_DIR)) {
    console.log("SKIP (no __tests__ directory)");
    process.exit(0);
}

const files = fs.readdirSync(TEST_DIR).filter(f => f.endsWith(".test.js"));

files.forEach(file => {
    const filePath = path.join(TEST_DIR, file);
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    // 🔥 1. Usuń odwołania do apps/FE-05__Festival_HyperOrchestrator
    content = content.replace(
        /require\("\.\.\/apps\/FE-05__Festival_HyperOrchestrator\//g,
        'require("../FE-05__Festival_HyperOrchestrator/'
    );

    // 🔥 2. Zamień wszystkie warianty starej ścieżki na główną
    const variants = [
        "FE-05__Festival_HyperOrchestrator",
        "Festival_HyperOrchestrator",
        "HyperOrchestrator",
        "HYPERORCHESTRATOR"
    ];

    variants.forEach(variant => {
        const regex = new RegExp(`require\\("\\.\\.\\/${variant}\\/`, "g");
        content = content.replace(regex, 'require("../FE-05__Festival_HyperOrchestrator/');
    });

    // 🔥 3. Zamień ścieżki z trzema kropkami (../..) na poprawne ../
    content = content.replace(
        /require\("\.\.\/\.\.\/FE-05__Festival_HyperOrchestrator\//g,
        'require("../FE-05__Festival_HyperOrchestrator/'
    );

    if (content !== original) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log("FIXED:", filePath);
    } else {
        console.log("OK:", filePath);
    }
});

console.log("=== Done fixing HyperOrchestrator paths ===");
