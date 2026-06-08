param(
    [int]$ThumbMaxWidth = 720
)

Add-Type -AssemblyName System.Drawing

$sourceRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\images\Photos')).Path
$outputRoot = Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..\images')).Path 'PhotosOptimized'
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' } |
    Select-Object -First 1

function Save-ResizedJpeg {
    param(
        [string]$SourcePath,
        [string]$OutputPath,
        [int]$MaxWidth,
        [long]$Quality
    )

    $image = [System.Drawing.Image]::FromFile($SourcePath)
    try {
        if ($image.PropertyIdList -contains 274) {
            $orientation = [BitConverter]::ToUInt16($image.GetPropertyItem(274).Value, 0)
            switch ($orientation) {
                3 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
                6 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
                8 { $image.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
            }
        }

        $scale = [Math]::Min(1.0, [double]$MaxWidth / [double]$image.Width)
        $targetWidth = [Math]::Max(1, [int][Math]::Round($image.Width * $scale))
        $targetHeight = [Math]::Max(1, [int][Math]::Round($image.Height * $scale))
        $bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)

        try {
            $bitmap.SetResolution(72, 72)
            $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
            try {
                $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
                $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
                $graphics.DrawImage($image, 0, 0, $targetWidth, $targetHeight)
            }
            finally {
                $graphics.Dispose()
            }

            New-Item -ItemType Directory -Force -Path (Split-Path $OutputPath) | Out-Null
            $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
            $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
                [System.Drawing.Imaging.Encoder]::Quality,
                $Quality
            )
            $bitmap.Save($OutputPath, $jpegCodec, $encoderParameters)
        }
        finally {
            $bitmap.Dispose()
        }
    }
    finally {
        $image.Dispose()
    }
}

Get-ChildItem -Path $sourceRoot -Recurse -File -Filter '*.jpg' | ForEach-Object {
    $sourcePrefix = $sourceRoot.TrimEnd('\') + '\'
    $relativePath = $_.FullName.Substring($sourcePrefix.Length)
    Save-ResizedJpeg $_.FullName (Join-Path $outputRoot "thumb\$relativePath") $ThumbMaxWidth 78
}
