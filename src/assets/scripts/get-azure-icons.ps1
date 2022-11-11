param (
    $icons = 'azure-icons'
)

$iconsPath = ".\src\assets\$icons"
$json = ".\src\assets\$icons\$icons.json"

$all = Get-ChildItem -Path $iconsPath -Recurse -Include *.svg | Select-Object -Property DirectoryName, Name
$all | ConvertTo-Json | Set-Content $json
(Get-Content $json) -replace ':  "(.*)icons\\\\',':  "' | Set-Content $json
(Get-Content $json) -replace '\[','{ "icons": [' | Set-Content $json
(Get-Content $json) -replace '\]',']}' | Set-Content $json
