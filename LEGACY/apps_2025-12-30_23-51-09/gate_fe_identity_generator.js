const fs = require("fs");
const path = require("path");

// Lista modułów i ich opisów
const MODULE_IDENTITIES = {
    "FE-01__Festival_Pavilion": "Festiwal, certyfikacja dzieł, jury, workflow filmów.",
    "FE-02__Finance_And_Admin": "Budżety, administracja finansowa, audyty.",
    "FE-03__Community_And_Social": "Społeczność, relacje, wydarzenia.",
    "FE-04__Innovation_And_Business": "Startupy, innowacje, projekty biznesowe.",
    "FE-05__Education_And_DAO": "Edukacja, kursy, governance DAO.",
    "FE-06__DAO_Town_Hall": "Głosowania, propozycje, governance.",
    "FE-07__Policy_Engine_RBAC": "Role, uprawnienia, polityki dostępu.",
    "FE-08__Config_IDs_And_Flags": "Konfiguracja systemowa, flagi, ID.",
    "FE-09__Core_Audit": "Logi, bezpieczeństwo, audyty.",
    "FE-13__Grants_Office": "Granty, wnioski, oceny.",
    "FE-15__Budget_Bank": "Tokeny, budżety, transakcje.",
    "FE-16__Admin_Tower": "Zarządzanie miastem.",
    "FE-17__City_Hall": "Centrum obywatelskie.",
    "FE-18__Media_Tower": "Media, publikacje, transmisje.",
    "FE-19__Knowledge_Hub": "Biblioteka, wiedza, AI.",
    "FE-20__Profile_Console": "Profil użytkownika.",
    "FE-21__Marketplace": "Handel, listingi, reputacja.",
    "FE-22__Stream_Square": "Streaming, wydarzenia live.",
    "FE-23__Culture_Gallery": "Galeria sztuki, ekspozycje.",
    "FE-24__Innovation_Hub": "Projekty, R&D.",
    "FE-25__Treasure_Vault": "Tokeny, zasoby, NFT.",
    "FE-26__Wellness_Garden": "Zdrowie, wellbeing.",
    "FE-27__Sports_Arena": "Sport, rywalizacja.",
    "FE-28__Business_District": "Firmy, oferty, współpraca.",
    "FE-29__Grants_Office": "Granty, wnioski, oceny.",
    "FE-30__DAO_Town_Hall": "Głosowania, propozycje, governance.",
    "FE-32__Volunteer_Center": "Wolontariat, akcje społeczne.",
    "FE-33__Marketplace_Street": "Twórcy, listingi, reputacja.",
    "FE-34__Admin_Tower": "Zarządzanie miastem.",
    "FE-35__Governance_Dashboard": "Zarządzanie DAO.",
    "FE-36__Citizen_Console": "Panel obywatela.",
    "FE-37__Immersive_VR_Layer": "VR, immersja.",
    "FE-38__AI_Companion": "Warstwa meta AI.",
    "FE-39__Treasure_Vault": "Tokeny, zasoby, NFT.",
    "FE-40__Innovation_Hub": "Projekty, R&D.",
    "FE-41__Culture_Gallery": "Galeria sztuki, ekspozycje.",
    "FE-42__Sports_Arena": "Sport, rywalizacja.",
    "FE-43__Wellness_Garden": "Zdrowie, wellbeing.",
    "FE-44__Volunteer_Center": "Wolontariat, akcje społeczne.",
    "FE-45__Community_House": "Społeczność, relacje.",
    "FE-46__DAO_Town_Hall": "Głosowania, propozycje, governance.",
    "FE-47__Grants_Office": "Granty, wnioski, oceny.",
    "FE-48__Business_District": "Firmy, oferty, współpraca.",
    "FE-49__Budget_Bank": "Tokeny, budżety, transakcje.",
    "FE-50__Admin_Tower": "Zarządzanie miastem.",
    "FE-51__Education_And_DAO": "Edukacja, kursy, governance DAO.",
    "FE-52__Festival_Hub": "Centrum festiwalowe.",
    "FE-53__Media_Tower": "Media, publikacje, transmisje.",
    "FE-54__Studio_Hub": "Tworzenie treści."
};

// Generator tożsamości
function generateIdentity(moduleFolder) {
    const folderPath = path.join(__dirname, moduleFolder);

    if (!fs.existsSync(folderPath)) return;

    const description = MODULE_IDENTITIES[moduleFolder] || "Moduł systemu CITYOF-GATE.";

    // 1. README
    fs.writeFileSync(
        path.join(folderPath, `README_${moduleFolder}.md`),
        `# ${moduleFolder}\n\n${description}\n\nTożsamość modułu wygenerowana automatycznie.`
    );

    // 2. module.config.json
    const configPath = path.join(folderPath, "module.config.json");
    if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        config.description = description;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    }

    // 3. Panele — nagłówki
    const panels = ["DATA", "FORMS", "RELATIONS", "WORKFLOW", "ANALYTICS", "AI"];
    panels.forEach(panel => {
        const panelPath = path.join(folderPath, "panels", `${panel}.js`);
        if (fs.existsSync(panelPath)) {
            fs.writeFileSync(
                panelPath,
                `export function render(container) {
    container.innerHTML = \`
        <h2>${moduleFolder.replace(/^FE-\d+__/, "").replace(/_/g, " ")} — ${panel}</h2>
        <p>Panel ${panel} dla modułu ${moduleFolder}.</p>
    \`;
}`
            );
        }
    });

    console.log(`🎨 Tożsamość wygenerowana: ${moduleFolder}`);
}

// Uruchomienie generatora
Object.keys(MODULE_IDENTITIES).forEach(generateIdentity);

console.log("🏙️ Generator tożsamości miasta zakończony.");
