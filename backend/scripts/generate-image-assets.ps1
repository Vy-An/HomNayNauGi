Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$imageRoot = Join-Path $root "public/images"

New-Item -ItemType Directory -Force (Join-Path $imageRoot "foods") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $imageRoot "posts") | Out-Null
New-Item -ItemType Directory -Force (Join-Path $imageRoot "users") | Out-Null

function Color-Hex($hex) {
    return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function New-Rect($x, $y, $w, $h) {
    return [System.Drawing.RectangleF]::new([float]$x, [float]$y, [float]$w, [float]$h)
}

function New-RoundRectPath($rect, $radius) {
    $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
    $d = [float]($radius * 2)
    $path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
    $path.AddArc($rect.Right - $d, $rect.Y, $d, $d, 270, 90)
    $path.AddArc($rect.Right - $d, $rect.Bottom - $d, $d, $d, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

function Save-Jpeg($bitmap, $path) {
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq "image/jpeg" } |
        Select-Object -First 1
    $encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
    $encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [int64]92)
    $bitmap.Save($path, $codec, $encoderParams)
    $encoderParams.Dispose()
}

function Draw-FoodImage($filePath, $title, $type, $primary, $secondary, $accent) {
    $width = 1200
    $height = 800
    $bitmap = [System.Drawing.Bitmap]::new($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        [System.Drawing.Rectangle]::new(0, 0, $width, $height),
        (Color-Hex "#FFF7EA"),
        (Color-Hex "#E7F0E8"),
        35
    )
    $graphics.FillRectangle($bg, 0, 0, $width, $height)
    $bg.Dispose()

    $tableBrush = [System.Drawing.SolidBrush]::new((Color-Hex "#E8D5B5"))
    $graphics.FillRectangle($tableBrush, 0, 600, $width, 200)
    $tableBrush.Dispose()

    $linePen = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(45, 120, 83, 45), 3)
    for ($y = 620; $y -lt 800; $y += 42) {
        $graphics.DrawLine($linePen, 0, $y, $width, $y)
    }
    $linePen.Dispose()

    $shadow = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(50, 0, 0, 0))
    $graphics.FillEllipse($shadow, 290, 580, 620, 95)
    $shadow.Dispose()

    $plateOuter = [System.Drawing.SolidBrush]::new((Color-Hex "#FFFDF7"))
    $plateInner = [System.Drawing.SolidBrush]::new((Color-Hex "#F3E8D4"))
    $graphics.FillEllipse($plateOuter, 265, 150, 670, 500)
    $graphics.FillEllipse($plateInner, 330, 205, 540, 385)
    $plateOuter.Dispose()
    $plateInner.Dispose()

    $primaryBrush = [System.Drawing.SolidBrush]::new((Color-Hex $primary))
    $secondaryBrush = [System.Drawing.SolidBrush]::new((Color-Hex $secondary))
    $accentBrush = [System.Drawing.SolidBrush]::new((Color-Hex $accent))
    $creamBrush = [System.Drawing.SolidBrush]::new((Color-Hex "#FFF4D8"))
    $greenBrush = [System.Drawing.SolidBrush]::new((Color-Hex "#1F7A4D"))
    $darkBrush = [System.Drawing.SolidBrush]::new((Color-Hex "#2D2016"))

    switch ($type) {
        "soup" {
            $graphics.FillEllipse($primaryBrush, 350, 220, 500, 350)
            for ($i = 0; $i -lt 18; $i++) {
                $x = 390 + (($i * 61) % 410)
                $y = 255 + (($i * 37) % 255)
                $brush = if ($i % 3 -eq 0) { $secondaryBrush } elseif ($i % 3 -eq 1) { $accentBrush } else { $creamBrush }
                $graphics.FillEllipse($brush, $x, $y, 52, 34)
            }
        }
        "fried" {
            for ($i = 0; $i -lt 13; $i++) {
                $x = 355 + (($i * 83) % 425)
                $y = 245 + (($i * 51) % 245)
                $graphics.FillEllipse($primaryBrush, $x, $y, 125, 72)
                $graphics.FillEllipse($accentBrush, $x + 18, $y + 12, 28, 16)
            }
            for ($i = 0; $i -lt 18; $i++) {
                $x = 360 + (($i * 47) % 450)
                $y = 250 + (($i * 29) % 250)
                $graphics.FillEllipse($greenBrush, $x, $y, 28, 18)
            }
        }
        "vegetable" {
            for ($i = 0; $i -lt 24; $i++) {
                $x = 350 + (($i * 59) % 455)
                $y = 220 + (($i * 43) % 315)
                $w = 92 + (($i * 7) % 34)
                $graphics.FillEllipse($greenBrush, $x, $y, $w, 42)
                if ($i % 4 -eq 0) { $graphics.FillEllipse($accentBrush, $x + 34, $y + 7, 28, 26) }
            }
        }
        "boiled" {
            for ($i = 0; $i -lt 18; $i++) {
                $x = 360 + (($i * 67) % 430)
                $y = 230 + (($i * 47) % 285)
                $brush = if ($i % 2 -eq 0) { $greenBrush } elseif ($i % 3 -eq 0) { $accentBrush } else { $secondaryBrush }
                $graphics.FillEllipse($brush, $x, $y, 95, 58)
            }
        }
        "stir" {
            $wok = [System.Drawing.SolidBrush]::new((Color-Hex "#151A1A"))
            $graphics.FillEllipse($wok, 325, 230, 550, 330)
            $graphics.FillEllipse($primaryBrush, 365, 250, 470, 285)
            $wok.Dispose()
            for ($i = 0; $i -lt 24; $i++) {
                $x = 385 + (($i * 71) % 390)
                $y = 270 + (($i * 37) % 220)
                $brush = if ($i % 4 -eq 0) { $greenBrush } elseif ($i % 4 -eq 1) { $secondaryBrush } elseif ($i % 4 -eq 2) { $accentBrush } else { $creamBrush }
                $graphics.FillRectangle($brush, $x, $y, 90, 28)
            }
        }
        default {
            $pot = New-RoundRectPath (New-Rect 330 220 540 350) 70
            $graphics.FillPath($primaryBrush, $pot)
            $pot.Dispose()
            for ($i = 0; $i -lt 16; $i++) {
                $x = 380 + (($i * 73) % 395)
                $y = 260 + (($i * 53) % 235)
                $brush = if ($i % 3 -eq 0) { $secondaryBrush } elseif ($i % 3 -eq 1) { $creamBrush } else { $accentBrush }
                $graphics.FillEllipse($brush, $x, $y, 90, 58)
            }
        }
    }

    for ($i = 0; $i -lt 20; $i++) {
        $x = 360 + (($i * 53) % 440)
        $y = 230 + (($i * 31) % 300)
        $graphics.FillEllipse($darkBrush, $x, $y, 9, 9)
    }

    $labelRect = New-Rect 70 64 520 116
    $labelPath = New-RoundRectPath $labelRect 28
    $labelBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(220, 20, 90, 67))
    $graphics.FillPath($labelBrush, $labelPath)
    $labelBrush.Dispose()
    $labelPath.Dispose()

    $titleFont = [System.Drawing.Font]::new("Arial", 34, [System.Drawing.FontStyle]::Bold)
    $subFont = [System.Drawing.Font]::new("Arial", 16, [System.Drawing.FontStyle]::Bold)
    $whiteBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::White)
    $graphics.DrawString($title, $titleFont, $whiteBrush, [System.Drawing.PointF]::new(96, 82))
    $graphics.DrawString("Hom Nay An Gi", $subFont, $whiteBrush, [System.Drawing.PointF]::new(100, 133))

    $titleFont.Dispose()
    $subFont.Dispose()
    $whiteBrush.Dispose()
    $primaryBrush.Dispose()
    $secondaryBrush.Dispose()
    $accentBrush.Dispose()
    $creamBrush.Dispose()
    $greenBrush.Dispose()
    $darkBrush.Dispose()

    Save-Jpeg $bitmap $filePath
    $graphics.Dispose()
    $bitmap.Dispose()
}

function Draw-Avatar($filePath, $name, $initials, $color) {
    $size = 512
    $bitmap = [System.Drawing.Bitmap]::new($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $bg = [System.Drawing.Drawing2D.LinearGradientBrush]::new(
        [System.Drawing.Rectangle]::new(0, 0, $size, $size),
        (Color-Hex $color),
        (Color-Hex "#F4A62A"),
        45
    )
    $graphics.FillRectangle($bg, 0, 0, $size, $size)
    $bg.Dispose()

    $overlay = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(65, 255, 255, 255))
    for ($i = 0; $i -lt 8; $i++) {
        $graphics.FillEllipse($overlay, -70 + ($i * 74), 50 + (($i % 3) * 90), 180, 180)
    }
    $overlay.Dispose()

    $circleBrush = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(210, 255, 255, 255))
    $graphics.FillEllipse($circleBrush, 84, 90, 344, 344)
    $circleBrush.Dispose()

    $font = [System.Drawing.Font]::new("Arial", 86, [System.Drawing.FontStyle]::Bold)
    $smallFont = [System.Drawing.Font]::new("Arial", 22, [System.Drawing.FontStyle]::Bold)
    $textBrush = [System.Drawing.SolidBrush]::new((Color-Hex "#145A43"))
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $graphics.DrawString($initials, $font, $textBrush, (New-Rect 84 110 344 220), $format)
    $graphics.DrawString($name, $smallFont, $textBrush, (New-Rect 80 330 352 58), $format)

    $format.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
    $smallFont.Dispose()

    Save-Jpeg $bitmap $filePath
    $graphics.Dispose()
    $bitmap.Dispose()
}

$foods = @(
    @{ File="foods/thit-kho-trung.jpg"; Title="Thit kho trung"; Type="kho"; Primary="#8A3B1B"; Secondary="#D86D2E"; Accent="#F6C657" },
    @{ File="foods/ca-kho-to.jpg"; Title="Ca kho to"; Type="kho"; Primary="#7A351A"; Secondary="#B85C2B"; Accent="#315E47" },
    @{ File="foods/ga-kho-gung.jpg"; Title="Ga kho gung"; Type="kho"; Primary="#A25224"; Secondary="#D78B34"; Accent="#F2C94C" },
    @{ File="foods/suon-xao-chua-ngot.jpg"; Title="Suon xao chua ngot"; Type="stir"; Primary="#B94B32"; Secondary="#F16B3A"; Accent="#E7BC30" },
    @{ File="foods/bo-xao-hanh-tay.jpg"; Title="Bo xao hanh tay"; Type="stir"; Primary="#7B2C22"; Secondary="#E7D6A7"; Accent="#77A464" },
    @{ File="foods/trung-chien-hanh.jpg"; Title="Trung chien hanh"; Type="fried"; Primary="#F2B23B"; Secondary="#FFF0B8"; Accent="#279154" },
    @{ File="foods/ca-chien-nuoc-mam.jpg"; Title="Ca chien nuoc mam"; Type="fried"; Primary="#D8932F"; Secondary="#F3C06C"; Accent="#77451D" },
    @{ File="foods/canh-chua-ca-loc.jpg"; Title="Canh chua ca loc"; Type="soup"; Primary="#E4573D"; Secondary="#F6B84D"; Accent="#2F8F58" },
    @{ File="foods/canh-bi-do-thit-bam.jpg"; Title="Canh bi do thit bam"; Type="soup"; Primary="#F08A2E"; Secondary="#B85B38"; Accent="#2E8A55" },
    @{ File="foods/canh-cai-thit-bam.jpg"; Title="Canh cai thit bam"; Type="soup"; Primary="#5BAE5F"; Secondary="#C27647"; Accent="#D7E8A8" },
    @{ File="foods/canh-ca-chua-trung.jpg"; Title="Canh ca chua trung"; Type="soup"; Primary="#D94831"; Secondary="#F5C74B"; Accent="#EFF3B5" },
    @{ File="foods/rau-muong-xao-toi.jpg"; Title="Rau muong xao toi"; Type="vegetable"; Primary="#2E8B57"; Secondary="#B4D06A"; Accent="#F4E7B8" },
    @{ File="foods/cai-thia-xao-toi.jpg"; Title="Cai thia xao toi"; Type="vegetable"; Primary="#3E9A57"; Secondary="#C7E66A"; Accent="#FFF1C2" },
    @{ File="foods/dau-que-xao-toi.jpg"; Title="Dau que xao toi"; Type="vegetable"; Primary="#2F8B55"; Secondary="#74BE67"; Accent="#EBD45B" },
    @{ File="foods/rau-cu-luoc.jpg"; Title="Rau cu luoc"; Type="boiled"; Primary="#63A75F"; Secondary="#F2A93B"; Accent="#D34C38" },
    @{ File="foods/thit-ba-chi-luoc.jpg"; Title="Thit ba chi luoc"; Type="boiled"; Primary="#DCA57D"; Secondary="#F0D0B5"; Accent="#3D8B55" },
    @{ File="foods/dau-hu-sot-ca-chua.jpg"; Title="Dau hu sot ca chua"; Type="stir"; Primary="#D94732"; Secondary="#F5E8B8"; Accent="#2E8F54" },
    @{ File="foods/ga-chien-nuoc-mam.jpg"; Title="Ga chien nuoc mam"; Type="fried"; Primary="#D8872F"; Secondary="#F2B54B"; Accent="#8B4A1E" }
)

$posts = @(
    @{ File="posts/post-thit-kho-trung.jpg"; Title="Bai viet thit kho"; Type="kho"; Primary="#8A3B1B"; Secondary="#D86D2E"; Accent="#F6C657" },
    @{ File="posts/post-rau-muong.jpg"; Title="Bai viet rau muong"; Type="vegetable"; Primary="#2E8B57"; Secondary="#B4D06A"; Accent="#F4E7B8" },
    @{ File="posts/post-canh-chua.jpg"; Title="Bai viet canh chua"; Type="soup"; Primary="#E4573D"; Secondary="#F6B84D"; Accent="#2F8F58" },
    @{ File="posts/post-dau-hu.jpg"; Title="Bai viet dau hu"; Type="stir"; Primary="#D94732"; Secondary="#F5E8B8"; Accent="#2E8F54" }
)

$users = @(
    @{ File="users/admin.jpg"; Name="Admin"; Initials="AD"; Color="#145A43" },
    @{ File="users/nguyen-van-an.jpg"; Name="Van An"; Initials="NA"; Color="#1E6F5C" },
    @{ File="users/tran-minh.jpg"; Name="Tran Minh"; Initials="TM"; Color="#455A64" },
    @{ File="users/le-thu-huong.jpg"; Name="Thu Huong"; Initials="TH"; Color="#8E4B7B" },
    @{ File="users/pham-hoang-nam.jpg"; Name="Hoang Nam"; Initials="HN"; Color="#7B4B2A" }
)

foreach ($food in $foods) {
    Draw-FoodImage (Join-Path $imageRoot $food.File) $food.Title $food.Type $food.Primary $food.Secondary $food.Accent
}

foreach ($post in $posts) {
    Draw-FoodImage (Join-Path $imageRoot $post.File) $post.Title $post.Type $post.Primary $post.Secondary $post.Accent
}

foreach ($user in $users) {
    Draw-Avatar (Join-Path $imageRoot $user.File) $user.Name $user.Initials $user.Color
}

Write-Host "Generated $($foods.Count) food images, $($posts.Count) post images, and $($users.Count) user avatars."
