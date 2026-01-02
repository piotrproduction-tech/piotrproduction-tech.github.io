const fs = require("fs");
const path = require("path");

// Mapowanie modułów FE → opisy backendowe
const MODULE_IDENTITIES = {
    "FE-01__Festival_Pavilion": "Backend festiwalu: certyfikacja dzieł, jury, workflow filmów.",
    "FE-02__Finance_And_Admin": "Backend finansów: budżety, wnioski, audyty.",
    "FE-03__Community_And_Social": "Backend społeczności: relacje, wydarzenia, aktywność.",
    "FE-04__Innovation_And_Business": "Backend innowacji: startupy, projekty, inkubacja.",
    "FE-05__Education_And_DAO": "Backend edukacji i DAO: kursy, governance.",
    "FE-06__DAO_Town_Hall": "Backend Town Hall: głosowania, propozycje, governance.",
    "FE-07__Policy_Engine_RBAC": "Backend RBAC: role, uprawnienia, polityki.",
    "FE-08__Config_IDs_And_Flags": "Backend konfiguracji systemowej.",
    "FE-09__Core_Audit": "Backend audytów i logów.",
    "FE-13__Grants_Office": "Backend grantów: wnioski, oceny.",
    "FE-15__Budget_Bank": "Backend banku: tokeny, budżety, transakcje.",
    "FE-16__Admin_Tower": "Backend administracji miasta.",
    "FE-17__City_Hall": "Backend centrum obywatelskiego.",
    "FE-18__Media_Tower": "Backend mediów: publikacje, transmisje.",
    "FE-19__Knowledge_Hub": "Backend wiedzy i AI.",
    "FE-20__Profile_Console": "Backend profilu użytkownika.",
    "FE-21__Marketplace": "Backend marketplace: listingi, transakcje, reputacja.",
    "FE-22__Stream_Square": "Backend streamingu.",
    "FE-23__Culture_Gallery": "Backend galerii sztuki.",
    "FE-24__Innovation_Hub": "Backend R&D.",
    "FE-25__Treasure_Vault": "Backend zasobów i tokenów.",
    "FE-26__Wellness_Garden": "Backend wellbeing.",
    "FE-27__Sports_Arena": "Backend sportu i rywalizacji.",
    "FE-28__Business_District": "Backend firm i współpracy.",
    "FE-29__Grants_Office": "Backend grantów.",
    "FE-30__DAO_Town_Hall": "Backend Town Hall.",
    "FE-32__Volunteer_Center": "Backend wolontariatu.",
    "FE-33__Marketplace_Street": "Backend twórców i listingów.",
    "FE-34__Admin_Tower": "Backend administracji.",
    "FE-35__Governance_Dashboard": "Backend governance.",
    "FE-36__Citizen_Console": "Backend obywatela.",
    "FE-37__Immersive_VR_Layer": "Backend VR.",
    "FE-38__AI_Companion": "Backend AI Companion.",
    "FE-39__Treasure_Vault": "Backend zasobów.",
    "FE-40__Innovation_Hub": "Backend R&D.",
    "FE-41__Culture_Gallery": "Backend galerii.",
    "FE-42__Sports_Arena": "Backend sportu.",
    "FE-43__Wellness_Garden": "Backend wellbeing.",
    "FE-44__Volunteer_Center": "Backend wolontariatu.",
    "FE-45__Community_House": "Backend społeczności.",
    "FE-46__DAO_Town_Hall": "Backend Town Hall.",
    "FE-47__Grants_Office": "Backend grantów.",
    "FE-48__Business_District": "Backend biznesu.",
    "FE-49__Budget_Bank": "Backend banku.",
    "FE-50__Admin_Tower": "Backend administracji.",
    "FE-51__Education_And_DAO": "Backend edukacji i DAO.",
    "FE-52__Festival_Hub": "Backend centrum festiwalowego.",
    "FE-53__Media_Tower": "Backend mediów.",
    "FE-54__Studio_Hub": "Backend studia."
};

// Tworzenie folderu jeśli nie istnieje
function ensureDir(pathStr) {
    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr, { recursive: true });
    }
}

// Generowanie backendu dla jednego modułu
function generateBackend(feModule) {
    const beModule = feModule.replace("FE-", "BE-");
    const bePath = path.join(__dirname, beModule);

    ensureDir(bePath);

    const description = MODULE_IDENTITIES[feModule] || "Backend modułu CITYOF-GATE.";

    // README
    const readmePath = path.join(bePath, `README_${beModule}.md`);
    if (!fs.existsSync(readmePath)) {
        fs.writeFileSync(readmePath, `# ${beModule}\n\n${description}\n\nBackend wygenerowany automatycznie.`);
    }

    // module.config.json
    const configPath = path.join(bePath, "module.config.json");
    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify({
            moduleId: beModule,
            description,
            routes: [],
            services: [],
            workflow: [],
            ai: [],
            certificates: []
        }, null, 2));
    }

    // Struktura folderów
    const folders = ["controllers", "services", "routes", "workflow", "ai", "certificates"];
    folders.forEach(folder => ensureDir(path.join(bePath, folder)));

    // Puste pliki
    const files = {
        "controllers/main.controller.js": "// Kontroler główny modułu\n",
        "services/main.service.js": "// Serwisy modułu\n",
        "routes/main.routes.js": "// Trasy modułu\n",
        "workflow/workflow.json": JSON.stringify({ steps: [] }, null, 2),
        "ai/ai.json": JSON.stringify({ functions: [] }, null, 2),
        "certificates/certificates.json": JSON.stringify({ certificates: [] }, null, 2)
    };

    Object.entries(files).forEach(([file, content]) => {
        const filePath = path.join(bePath, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
        }
    });

    console.log(`🔧 Backend wygenerowany: ${beModule}`);
}

// Uruchomienie generatora
const feModules = fs.readdirSync(path.join(__dirname, "..", "apps"))
    .filter(name => name.startsWith("FE-"));

feModules.forEach(generateBackend);

console.log("🏙️ Generator backendowej tożsamości miasta zakończony.");
