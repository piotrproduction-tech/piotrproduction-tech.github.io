# ============================================
#  CITYOF-GATE — MODULE SETUP SCRIPT (BE-01 → BE-54)
#  Autor: Copilot + Piotr
#  Cel: Automatyczne tworzenie modułów BE-XX
# ============================================

Write-Host "=== CITYOF-GATE: Tworzenie modułów BE-01 → BE-54 ===" -ForegroundColor Cyan

# 1. Tworzymy folder /modules jeśli nie istnieje
$modulesRoot = "modules"

if (!(Test-Path $modulesRoot)) {
    New-Item -ItemType Directory -Path $modulesRoot | Out-Null
    Write-Host "Utworzono folder: modules"
} else {
    Write-Host "Folder modules już istnieje"
}

# 2. Definicje modułów BE-01 → BE-54 (emoji zastąpione Unicode)
$modules = @(
    @{ id="BE-01"; name="Festival Pavilion"; type="creative"; scope="CITY"; archetype="festival"; symbol="\u{1F3AA}"; color="#FFA500" },
    @{ id="BE-02"; name="Finance & Admin"; type="economy"; scope="CITY"; archetype="finance"; symbol="\u{1F3E6}"; color="#C0C0C0" },
    @{ id="BE-03"; name="Stream Square"; type="creative"; scope="CITY"; archetype="live"; symbol="\u{1F4E1}"; color="#40E0D0" },
    @{ id="BE-04"; name="Marketplace Street"; type="economy"; scope="CITY"; archetype="commerce"; symbol="\u{1F6CD}"; color="#FFD700" },
    @{ id="BE-05"; name="Culture Gallery"; type="creative"; scope="CITY"; archetype="art"; symbol="\u{1F5BC}"; color="#800080" },
    @{ id="BE-06"; name="Education Library"; type="social"; scope="CITY"; archetype="knowledge"; symbol="\u{1F4D8}"; color="#87CEEB" },
    @{ id="BE-07"; name="Community House"; type="social"; scope="CITY"; archetype="community"; symbol="\u{1F3E1}"; color="#32CD32" },
    @{ id="BE-08"; name="DAO Town Hall"; type="governance"; scope="CITY"; archetype="governance"; symbol="\u{1F3DB}"; color="#000080" },
    @{ id="BE-09"; name="Innovation Hub"; type="creative"; scope="CITY"; archetype="innovation"; symbol="\u{1F9EA}"; color="#C0C0C0" },
    @{ id="BE-10"; name="Sports Arena"; type="social"; scope="CITY"; archetype="sports"; symbol="\u{1F3DF}"; color="#FF0000" },
    @{ id="BE-11"; name="Business District"; type="economy"; scope="CITY"; archetype="business"; symbol="\u{1F3E2}"; color="#00008B" },
    @{ id="BE-12"; name="Treasure Vault"; type="utility"; scope="CITY"; archetype="heritage"; symbol="\u{1F5C4}"; color="#800020" },
    @{ id="BE-13"; name="Wellness Garden"; type="social"; scope="CITY"; archetype="wellbeing"; symbol="\u{1F33F}"; color="#90EE90" },
    @{ id="BE-14"; name="Grants Office"; type="economy"; scope="CITY"; archetype="support"; symbol="\u{1F49C}"; color="#800080" },
    @{ id="BE-15"; name="Volunteer Center"; type="social"; scope="CITY"; archetype="empathy"; symbol="\u{1F91D}"; color="#FFC0CB" },
    @{ id="BE-16"; name="Budget Bank"; type="economy"; scope="CITY"; archetype="transparency"; symbol="\u{1F4B8}"; color="#D3D3D3" },
    @{ id="BE-17"; name="Admin Tower"; type="governance"; scope="CITY"; archetype="control"; symbol="\u{1F5FC}"; color="#708090" },
    @{ id="BE-18"; name="Media Hub"; type="creative"; scope="CITY"; archetype="media"; symbol="\u{1F4FA}"; color="#4682B4" }
)
$modules += @(
    @{ id="BE-19"; name="Knowledge Hub"; type="social"; scope="CITY"; archetype="knowledge"; symbol="\u{1F4DA}"; color="#1E90FF" },
    @{ id="BE-20"; name="Profile Console"; type="utility"; scope="USER"; archetype="identity"; symbol="\u{1F464}"; color="#2E8B57" },
    @{ id="BE-21"; name="Marketplace"; type="economy"; scope="USER"; archetype="commerce"; symbol="\u{1F6D2}"; color="#FFD700" },
    @{ id="BE-22"; name="Stream Square (User)"; type="creative"; scope="USER"; archetype="live"; symbol="\u{1F4E1}"; color="#40E0D0" },
    @{ id="BE-23"; name="Culture Gallery (User)"; type="creative"; scope="USER"; archetype="art"; symbol="\u{1F3A8}"; color="#9932CC" },
    @{ id="BE-24"; name="Innovation Hub (User)"; type="creative"; scope="USER"; archetype="innovation"; symbol="\u{1F9EC}"; color="#FF8C00" },
    @{ id="BE-25"; name="Treasure Vault (User)"; type="utility"; scope="USER"; archetype="archive"; symbol="\u{1F5C3}"; color="#8B4513" },
    @{ id="BE-26"; name="Wellness Garden (User)"; type="social"; scope="USER"; archetype="wellbeing"; symbol="\u{1F331}"; color="#7CFC00" },
    @{ id="BE-27"; name="Sports Arena (User)"; type="social"; scope="USER"; archetype="sports"; symbol="\u{26BD}"; color="#DC143C" },
    @{ id="BE-28"; name="Business District (User)"; type="economy"; scope="USER"; archetype="business"; symbol="\u{1F4BC}"; color="#0000CD" },
    @{ id="BE-29"; name="Grants Office (User)"; type="economy"; scope="USER"; archetype="support"; symbol="\u{1F397}"; color="#BA55D3" },
    @{ id="BE-30"; name="DAO Town Hall (User)"; type="governance"; scope="USER"; archetype="governance"; symbol="\u{1F3DB}"; color="#191970" },
    @{ id="BE-31"; name="Community House (User)"; type="social"; scope="USER"; archetype="community"; symbol="\u{1F3D8}"; color="#3CB371" },
    @{ id="BE-32"; name="Volunteer Center (User)"; type="social"; scope="USER"; archetype="empathy"; symbol="\u{1F932}"; color="#CD853F" },
    @{ id="BE-33"; name="Marketplace Street (User)"; type="economy"; scope="USER"; archetype="commerce"; symbol="\u{1F6CD}"; color="#FFD700" },
    @{ id="BE-34"; name="Admin Tower (User)"; type="governance"; scope="USER"; archetype="control"; symbol="\u{1F5FC}"; color="#778899" },
    @{ id="BE-35"; name="Governance Dashboard"; type="governance"; scope="CITY"; archetype="governance"; symbol="\u{1F4CA}"; color="#4B0082" },
    @{ id="BE-36"; name="Citizen Console"; type="utility"; scope="USER"; archetype="identity"; symbol="\u{1F9ED}"; color="#1E90FF" }
)
$modules += @(
    @{ id="BE-37"; name="Immersive VR Layer"; type="creative"; scope="CITY"; archetype="vr"; symbol="\u{1F576}"; color="#483D8B" },
    @{ id="BE-38"; name="AI Companion"; type="utility"; scope="USER"; archetype="ai"; symbol="\u{1F916}"; color="#00CED1" },
    @{ id="BE-39"; name="Treasure Vault (City)"; type="utility"; scope="CITY"; archetype="heritage"; symbol="\u{1F3FA}"; color="#8B4513" },
    @{ id="BE-40"; name="Innovation Hub (City)"; type="creative"; scope="CITY"; archetype="innovation"; symbol="\u{1F52C}"; color="#8A2BE2" },
    @{ id="BE-41"; name="Culture Gallery (City)"; type="creative"; scope="CITY"; archetype="art"; symbol="\u{1F58C}"; color="#6A5ACD" },
    @{ id="BE-42"; name="Sports Arena (City)"; type="social"; scope="CITY"; archetype="sports"; symbol="\u{1F3C5}"; color="#B22222" },
    @{ id="BE-43"; name="Wellness Garden (City)"; type="social"; scope="CITY"; archetype="wellbeing"; symbol="\u{1F33C}"; color="#98FB98" },
    @{ id="BE-44"; name="Volunteer Center (City)"; type="social"; scope="CITY"; archetype="empathy"; symbol="\u{1F49E}"; color="#CD5C5C" },
    @{ id="BE-45"; name="Community House (City)"; type="social"; scope="CITY"; archetype="community"; symbol="\u{1F3E0}"; color="#2E8B57" },
    @{ id="BE-46"; name="DAO Town Hall (City)"; type="governance"; scope="CITY"; archetype="governance"; symbol="\u{2696}"; color="#000080" },
    @{ id="BE-47"; name="Grants Office (City)"; type="economy"; scope="CITY"; archetype="support"; symbol="\u{1F4B0}"; color="#8B008B" },
    @{ id="BE-48"; name="Business District (City)"; type="economy"; scope="CITY"; archetype="business"; symbol="\u{1F3D9}"; color="#1C3FAA" },
    @{ id="BE-49"; name="Budget Bank (City)"; type="economy"; scope="CITY"; archetype="finance"; symbol="\u{1F4B3}"; color="#DAA520" },
    @{ id="BE-50"; name="Admin Tower (City)"; type="governance"; scope="CITY"; archetype="control"; symbol="\u{1F3DB}"; color="#696969" },
    @{ id="BE-51"; name="Education & DAO"; type="governance"; scope="CITY"; archetype="knowledge-governance"; symbol="\u{1F393}"; color="#4169E1" },
    @{ id="BE-52"; name="Festival Hub"; type="creative"; scope="CITY"; archetype="festival"; symbol="\u{1F3AC}"; color="#FF7F50" },
    @{ id="BE-53"; name="Media Tower"; type="creative"; scope="CITY"; archetype="media"; symbol="\u{1F4E1}"; color="#2F4F4F" },
    @{ id="BE-54"; name="Studio Hub"; type="creative"; scope="USER"; archetype="creation"; symbol="\u{1F39B}"; color="#9370DB" }
)

# 3. Tworzenie folderów i plików module.config.json
foreach ($m in $modules) {

    $folderName = "$($m.id)_$($m.name.Replace(' ',''))"
    $folderPath = Join-Path $modulesRoot $folderName

    if (!(Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath | Out-Null
        Write-Host "Utworzono folder: $folderPath"
    }

    $configPath = Join-Path $folderPath "module.config.json"

    $json = @{
        moduleId = $m.id
        name = $m.name
        type = $m.type
        scope = $m.scope
        identity = @{
            archetype = $m.archetype
            symbol = $m.symbol
            color = $m.color
            version = "12.x"
            origin = "AppsScript-Classic"
        }
        capabilities = @{}
        economy = @{}
        reputation = @{}
        access = @{}
        events = @{}
        integrations = @{}
        ui = @{}
    } | ConvertTo-Json -Depth 10

    Set-Content -Path $configPath -Value $json -Encoding UTF8

    Write-Host "  → module.config.json zapisany dla $($m.id)"
}

Write-Host "`n=== GOTOWE: Wszystkie moduły BE-01 → BE-54 zostały wygenerowane ===" -ForegroundColor Green
