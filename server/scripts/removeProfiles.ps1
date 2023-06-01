$files = Get-ChildItem "D:\" | Where-Object { $_.Name -like "*template*" }

for ($i=0; $i -lt $files.Count; $i++) {
    $length = $files[$i].Name.length
    $sid = $files[$i].Name.Substring(5, $length-10)
    try {
    $user = Get-ADUser -Identity $sid
    $UserExists = $true
    }
    catch [Microsoft.ActiveDirectory.Management.ADIdentityResolutionException] {
        Write-Host "User does not exist." + $sid
        $UserExists = $false
        $vhd = "D:\UVHD-" + $sid.Trim() + ".vhdx"

        if (Test-Path -Path $vhd -PathType Leaf) {
            Remove-Item -Path $vhd  -Force 
        }
    }
}