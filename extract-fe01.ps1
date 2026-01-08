param(
    [Parameter(Mandatory = $true)]
    [string]$ModulePath
)

$patterns = @(
    "api.js",
    "*bootstrap.js",
    "useFestival*.js",
    "useUserCardData.js",
    "useAdminAccessPanel.js",
    "accessMatrix.js",
    "accessEvaluator.js",
    "Admin*.js",
    "FestivalAIPredictions.js",
    "useFestivalAI.js",
    "FestivalHUD.js",
    "FestivalOverlay.js",
    "FestivalDebugConsole.js",
    "FestivalNotifications.js",
    "FestivalCharts.js",
    "FestivalHeatmap.js",
    "index.js"
)

$OutputFile = "FE-01__EXTRACT.txt"
if (Test-Path $OutputFile) { Remove-Item $OutputFile }

foreach ($pattern in $patterns) {
    Get-ChildItem -Path $ModulePath -Recurse -Filter $pattern | ForEach-Object {
        Add-Content $OutputFile "===== FILE: $($_.FullName) ====="
        Add-Content $OutputFile ""
        Get-Content $_.FullName | Add-Content $OutputFile
        Add-Content $OutputFile ""
        Add-Content $OutputFile "===== END FILE ====="
        Add-Content $OutputFile ""
    }
}

Write-Host "Gotowe. Wynik zapisany w $OutputFile"
