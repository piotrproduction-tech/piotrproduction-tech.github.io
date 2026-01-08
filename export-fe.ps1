param(
    [Parameter(Mandatory = $true)]
    [string[]]$ModulePaths
)

foreach ($ModulePath in $ModulePaths) {

    $fullPath = Resolve-Path $ModulePath

    $folderName = (Split-Path $fullPath -Leaf) -replace '[^a-zA-Z0-9_\-]', '_'

    $OutputFile = "${folderName}_dump.txt"

    Write-Host "Zbieram pliki z: $fullPath"
    Write-Host "Zapisuję do: $OutputFile"

    if (Test-Path $OutputFile) {
        Remove-Item $OutputFile
    }

    Get-ChildItem -Path $fullPath -Recurse -File | ForEach-Object {
        $relativePath = $_.FullName.Substring($fullPath.Path.Length).TrimStart('\','/')

        Add-Content -Path $OutputFile -Value "===== FILE: $relativePath ====="
        Add-Content -Path $OutputFile -Value ""

        Get-Content -Path $_.FullName | Add-Content -Path $OutputFile

        Add-Content -Path $OutputFile -Value ""
        Add-Content -Path $OutputFile -Value "===== END FILE: $relativePath ====="
        Add-Content -Path $OutputFile -Value ""
    }

    Write-Host "Gotowe: $OutputFile"
}
