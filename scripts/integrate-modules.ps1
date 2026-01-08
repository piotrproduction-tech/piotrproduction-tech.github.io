# ============================================
#  CITYOF-GATE — AUTO-INTEGRATION SCRIPT
#  Integrates FE-21 and FE-33 into:
#  - CityRouter.js
#  - cityMap.json
#  - DistrictEngine_12.x/districts.js
# ============================================

Write-Host "=== Integrating FE-21 and FE-33 into CityCore_12.x and DistrictEngine_12.x ===" -ForegroundColor Cyan

# --- PATHS ---
$routerPath = "apps/CityCore_12.x/router/CityRouter.js"
$mapPath = "apps/CityCore_12.x/core/MAP/cityMap.json"
$enginePath = "apps/DistrictEngine_12.x/districts.js"

# --- 1. UPDATE MAP (cityMap.json) ---
Write-Host "Updating cityMap.json..."

$mapJson = Get-Content $mapPath -Raw | ConvertFrom-Json

# Add FE-21 and FE-33 if not present
$existingIds = $mapJson.districts | ForEach-Object { $_.id }

if ("FE-21" -notin $existingIds) {
    $mapJson.districts += @{
        id = "FE-21"
        name = "Marketplace"
        type = "marketplace"
        x = 0
        y = 0
    }
}

if ("FE-33" -notin $existingIds) {
    $mapJson.districts += @{
        id = "FE-33"
        name = "Marketplace Street"
        type = "marketplace"
        x = 1
        y = 0
    }
}

$mapJson | ConvertTo-Json -Depth 10 | Set-Content $mapPath -Encoding UTF8

Write-Host "cityMap.json updated."


# --- 2. UPDATE DistrictEngine (districts.js) ---
Write-Host "Updating DistrictEngine..."

$engineContent = Get-Content $enginePath -Raw

# Add FE-21 and FE-33 to districtMap if missing
if ($engineContent -notmatch "FE-21") {
    $engineContent = $engineContent -replace "const districtMap = {", "const districtMap = {\n    \"FE-21\": \"Marketplace\",\n    \"FE-33\": \"Marketplace Street\","
}

Set-Content $enginePath -Value $engineContent -Encoding UTF8

Write-Host "DistrictEngine updated."


# --- 3. UPDATE ROUTER (CityRouter.js) ---
Write-Host "Updating CityRouter.js..."

$routerContent = Get-Content $routerPath -Raw

# Add helper comment block for FE-21 and FE-33
if ($routerContent -notmatch "FE-21") {
    $routerContent = $routerContent + @"

//
// AUTO-INTEGRATED DISTRICTS
// FE-21 Marketplace
// FE-33 Marketplace Street
//

"@
}

Set-Content $routerPath -Value $routerContent -Encoding UTF8

Write-Host "CityRouter.js updated."


Write-Host "`n=== Integration complete. FE-21 and FE-33 are now part of the city. ===" -ForegroundColor Green
