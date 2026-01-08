param(
    [Parameter(Mandatory = $true)]
    [string]$ModulePath
)

# Pobierz pełną ścieżkę
$fullPath = Resolve-Path $ModulePath

# Nazwa folderu BE bez znaków specjalnych
$folderName = (Split-Path $fullPath -Leaf) -replace '[^a-zA-Z0-9_\-]', '_'

# Nazwa pliku wynikowego
$OutputFile = "${folderName}_dump.txt"

Write-Host "Zbieram pliki z: $fullPath"
Write-Host "Zapisuję do: $OutputFile"

# Usuń poprzedni plik jeśli istnieje
if (Test-Path $OutputFile) {
    Remove-Item $OutputFile
}

# Przejdź po wszystkich plikach
Get-ChildItem -Path $fullPath -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring($fullPath.Path.Length).TrimStart('\','/')

    Add-Content -Path $OutputFile -Value "===== FILE: $relativePath ====="
    Add-Content -Path $OutputFile -Value ""

    Get-Content -Path $_.FullName | Add-Content -Path $OutputFile

    Add-Content -Path $OutputFile -Value ""
    Add-Content -Path $OutputFile -Value "===== END FILE: $relativePath ====="
    Add-Content -Path $OutputFile -Value ""
}

Write-Host "Gotowe. Zawartość modułu zapisana w: $OutputFile"
