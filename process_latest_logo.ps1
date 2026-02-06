Add-Type -AssemblyName System.Drawing
$inputPath = "C:/Users/ADMIN/.gemini/antigravity/brain/b450ab44-7d33-4f01-82c6-498d06be39ff/uploaded_media_1770221640312.png"
$outputPath = "d:\vishnu\stat\public\favicon.png"

try {
    Write-Host "Reading image from $inputPath"
    if (-not (Test-Path $inputPath)) {
        throw "Input file not found: $inputPath"
    }

    $img = [System.Drawing.Image]::FromFile($inputPath)
    $width = $img.Width
    $height = $img.Height
    $bmp = New-Object System.Drawing.Bitmap($img)
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)

    # Graphics object to facilitate potential scaling or high-quality drawing if needed, 
    # but for pixel manipulation we iterate.
    
    Write-Host "Processing $width x $height image..."

    for($x=0; $x -lt $width; $x++) {
        for($y=0; $y -lt $height; $y++) {
            $c = $bmp.GetPixel($x, $y)
            
            # Simple brightness check: Dark is background, Light is Logo
            # Assuming the user uploaded a white-on-black or similar image
            $brightness = ($c.R + $c.G + $c.B) / 3
            $alpha = $c.A

            if ($alpha -gt 10) { # If pixel is not already fully transparent
                if ($brightness -lt 50) {
                    # Dark pixel -> Make transparent
                     $newBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                } else {
                    # Light pixel -> Make Pure White
                    # We preserve edge softness (anti-aliasing) by using the original brightness/alpha 
                    # ...Actually, strict "Pure White" usually means solid #FFFFFF. 
                    # But if we lose anti-aliasing it looks jagged.
                    # Let's map brightness to Alpha for the edges? 
                    # Simpler/Safer: Solid White.
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::White)
                }
            } else {
                $newBmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            }
        }
    }

    $newBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Success: Image saved to $outputPath"
} catch {
    Write-Error "Error: $_"
} finally {
    if ($newBmp) { $newBmp.Dispose() }
    if ($bmp) { $bmp.Dispose() }
    if ($img) { $img.Dispose() }
}
