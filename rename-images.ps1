# Digital Jungle — Portfolio Image Rename Script
# Run this from PowerShell WHILE INSIDE your MAIN folder:
#   1. Open the MAIN folder in File Explorer
#   2. Type 'powershell' in the address bar and hit Enter
#   3. Run:  .\rename-images.ps1

Write-Host "Renaming portfolio images..." -ForegroundColor Cyan
$renamed = 0; $skipped = 0

if (Test-Path -LiteralPath 'client 2.jpg') {
    Rename-Item -LiteralPath 'client 2.jpg' -NewName 'client-work-social-thumbnail.jpg'
    Write-Host "  Renamed: client 2.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): client 2.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Roblox 12.webp') {
    Rename-Item -LiteralPath 'Roblox 12.webp' -NewName 'roblox-gaming-thumbnail-2.webp'
    Write-Host "  Renamed: Roblox 12.webp" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Roblox 12.webp" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'MSI Claw 8.jpg') {
    Rename-Item -LiteralPath 'MSI Claw 8.jpg' -NewName 'msi-claw-8-tech-review.jpg'
    Write-Host "  Renamed: MSI Claw 8.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): MSI Claw 8.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'part 1 thumbnail 2.png') {
    Rename-Item -LiteralPath 'part 1 thumbnail 2.png' -NewName 'gaming-series-part-1-thumbnail.png'
    Write-Host "  Renamed: part 1 thumbnail 2.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): part 1 thumbnail 2.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Cycle sample  1022 copy.jpg') {
    Rename-Item -LiteralPath 'Cycle sample  1022 copy.jpg' -NewName 'cycle-sample-social-thumbnail.jpg'
    Write-Host "  Renamed: Cycle sample  1022 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Cycle sample  1022 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Roblox.webp') {
    Rename-Item -LiteralPath 'Roblox.webp' -NewName 'roblox-gaming-thumbnail.webp'
    Write-Host "  Renamed: Roblox.webp" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Roblox.webp" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'claude fail copy.jpg') {
    Rename-Item -LiteralPath 'claude fail copy.jpg' -NewName 'claude-ai-fail-tech-thumbnail.jpg'
    Write-Host "  Renamed: claude fail copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): claude fail copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'FARLIGHT copy_compressed.png') {
    Rename-Item -LiteralPath 'FARLIGHT copy_compressed.png' -NewName 'farlight-84-gaming-thumbnail.png'
    Write-Host "  Renamed: FARLIGHT copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): FARLIGHT copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'flat lay style copy.jpg') {
    Rename-Item -LiteralPath 'flat lay style copy.jpg' -NewName 'flat-lay-style-tech-thumbnail.jpg'
    Write-Host "  Renamed: flat lay style copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): flat lay style copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'QBZ new copy_compressed.png') {
    Rename-Item -LiteralPath 'QBZ new copy_compressed.png' -NewName 'qbz-new-skin-gaming-thumbnail.png'
    Write-Host "  Renamed: QBZ new copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): QBZ new copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'ZERO STASH 1_compressed.png') {
    Rename-Item -LiteralPath 'ZERO STASH 1_compressed.png' -NewName 'zero-stash-gaming-thumbnail.png'
    Write-Host "  Renamed: ZERO STASH 1_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): ZERO STASH 1_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'enternal QBZ copy_compressed.png') {
    Rename-Item -LiteralPath 'enternal QBZ copy_compressed.png' -NewName 'eternal-qbz-gaming-thumbnail.png'
    Write-Host "  Renamed: enternal QBZ copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): enternal QBZ copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new gun 2 copy.jpg') {
    Rename-Item -LiteralPath 'new gun 2 copy.jpg' -NewName 'new-gun-skin-gaming-thumbnail.jpg'
    Write-Host "  Renamed: new gun 2 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new gun 2 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new gun skin 3 copy_compressed.png') {
    Rename-Item -LiteralPath 'new gun skin 3 copy_compressed.png' -NewName 'gun-skin-collection-gaming-thumbnail.png'
    Write-Host "  Renamed: new gun skin 3 copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new gun skin 3 copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'm1887 skin copy.jpg') {
    Rename-Item -LiteralPath 'm1887 skin copy.jpg' -NewName 'm1887-skin-gaming-thumbnail.jpg'
    Write-Host "  Renamed: m1887 skin copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): m1887 skin copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'kar981 copy.png') {
    Rename-Item -LiteralPath 'kar981 copy.png' -NewName 'kar98-highlight-gaming-thumbnail.png'
    Write-Host "  Renamed: kar981 copy.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): kar981 copy.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'uzi copy.jpg') {
    Rename-Item -LiteralPath 'uzi copy.jpg' -NewName 'uzi-special-gaming-thumbnail.jpg'
    Write-Host "  Renamed: uzi copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): uzi copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'practice copy_compressed.png') {
    Rename-Item -LiteralPath 'practice copy_compressed.png' -NewName 'practice-mode-gaming-thumbnail.png'
    Write-Host "  Renamed: practice copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): practice copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'vlcsnap-2025-02-07-22h28m37s077 copy.png') {
    Rename-Item -LiteralPath 'vlcsnap-2025-02-07-22h28m37s077 copy.png' -NewName 'gameplay-capture-gaming-thumbnail.png'
    Write-Host "  Renamed: vlcsnap-2025-02-07-22h28m37s077 copy.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): vlcsnap-2025-02-07-22h28m37s077 copy.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Intel - Arc B580.jpg') {
    Rename-Item -LiteralPath 'Intel - Arc B580.jpg' -NewName 'intel-arc-b580-tech-review.jpg'
    Write-Host "  Renamed: Intel - Arc B580.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Intel - Arc B580.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Keyboard.jpg') {
    Rename-Item -LiteralPath 'Keyboard.jpg' -NewName 'keyboard-review-tech-thumbnail.jpg'
    Write-Host "  Renamed: Keyboard.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Keyboard.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'chromebook vs laptop copy.jpg') {
    Rename-Item -LiteralPath 'chromebook vs laptop copy.jpg' -NewName 'chromebook-vs-laptop-tech-thumbnail.jpg'
    Write-Host "  Renamed: chromebook vs laptop copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): chromebook vs laptop copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'huawei matebook 14 copy.jpg') {
    Rename-Item -LiteralPath 'huawei matebook 14 copy.jpg' -NewName 'huawei-matebook-14-tech-thumbnail.jpg'
    Write-Host "  Renamed: huawei matebook 14 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): huawei matebook 14 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'speaker.jpg') {
    Rename-Item -LiteralPath 'speaker.jpg' -NewName 'speaker-review-tech-thumbnail.jpg'
    Write-Host "  Renamed: speaker.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): speaker.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'shoes.jpg') {
    Rename-Item -LiteralPath 'shoes.jpg' -NewName 'product-showcase-tech-thumbnail.jpg'
    Write-Host "  Renamed: shoes.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): shoes.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'flat one copy.jpg') {
    Rename-Item -LiteralPath 'flat one copy.jpg' -NewName 'flat-design-tech-thumbnail.jpg'
    Write-Host "  Renamed: flat one copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): flat one copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'thumbnail prompt copy.jpg') {
    Rename-Item -LiteralPath 'thumbnail prompt copy.jpg' -NewName 'thumbnail-prompt-tech-thumbnail.jpg'
    Write-Host "  Renamed: thumbnail prompt copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): thumbnail prompt copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Worth Every Penny.jpg') {
    Rename-Item -LiteralPath 'Worth Every Penny.jpg' -NewName 'worth-every-penny-social-thumbnail.jpg'
    Write-Host "  Renamed: Worth Every Penny.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Worth Every Penny.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Traveling Gears copy.jpg') {
    Rename-Item -LiteralPath 'Traveling Gears copy.jpg' -NewName 'traveling-gears-social-thumbnail.jpg'
    Write-Host "  Renamed: Traveling Gears copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Traveling Gears copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Samcux sample 1321 copy.jpg') {
    Rename-Item -LiteralPath 'Samcux sample 1321 copy.jpg' -NewName 'samcux-sample-social-thumbnail.jpg'
    Write-Host "  Renamed: Samcux sample 1321 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Samcux sample 1321 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new one audio-Recovered copy.jpg') {
    Rename-Item -LiteralPath 'new one audio-Recovered copy.jpg' -NewName 'audio-social-thumbnail.jpg'
    Write-Host "  Renamed: new one audio-Recovered copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new one audio-Recovered copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'talha copy_compressed.jpg') {
    Rename-Item -LiteralPath 'talha copy_compressed.jpg' -NewName 'client-work-talha-social-thumbnail.jpg'
    Write-Host "  Renamed: talha copy_compressed.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): talha copy_compressed.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new client 2 copy.jpg') {
    Rename-Item -LiteralPath 'new client 2 copy.jpg' -NewName 'client-redesign-2-social-thumbnail.jpg'
    Write-Host "  Renamed: new client 2 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new client 2 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new client 4 copy.jpg') {
    Rename-Item -LiteralPath 'new client 4 copy.jpg' -NewName 'client-work-4-social-thumbnail.jpg'
    Write-Host "  Renamed: new client 4 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new client 4 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new client 5 copy.jpg') {
    Rename-Item -LiteralPath 'new client 5 copy.jpg' -NewName 'client-work-5-social-thumbnail.jpg'
    Write-Host "  Renamed: new client 5 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new client 5 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new client 10 copy.jpg') {
    Rename-Item -LiteralPath 'new client 10 copy.jpg' -NewName 'client-work-10-social-thumbnail.jpg'
    Write-Host "  Renamed: new client 10 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new client 10 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new client 11 22 copy.jpg') {
    Rename-Item -LiteralPath 'new client 11 22 copy.jpg' -NewName 'client-work-11-social-thumbnail.jpg'
    Write-Host "  Renamed: new client 11 22 copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new client 11 22 copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new 10 copy_compressed.png') {
    Rename-Item -LiteralPath 'new 10 copy_compressed.png' -NewName 'design-concept-social-thumbnail.png'
    Write-Host "  Renamed: new 10 copy_compressed.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new 10 copy_compressed.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'new 1.jpg') {
    Rename-Item -LiteralPath 'new 1.jpg' -NewName 'fresh-design-social-thumbnail.jpg'
    Write-Host "  Renamed: new 1.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): new 1.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Untitled-galssy copy.jpg') {
    Rename-Item -LiteralPath 'Untitled-galssy copy.jpg' -NewName 'glassy-style-social-thumbnail.jpg'
    Write-Host "  Renamed: Untitled-galssy copy.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Untitled-galssy copy.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'hahahahahaha.png') {
    Rename-Item -LiteralPath 'hahahahahaha.png' -NewName 'gaming-moment-thumbnail.png'
    Write-Host "  Renamed: hahahahahaha.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): hahahahahaha.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'talha.png') {
    Rename-Item -LiteralPath 'talha.png' -NewName 'talha-project-gaming-thumbnail.png'
    Write-Host "  Renamed: talha.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): talha.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'main1.png') {
    Rename-Item -LiteralPath 'main1.png' -NewName 'main-thumbnail-gaming.png'
    Write-Host "  Renamed: main1.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): main1.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'main4 copy.png') {
    Rename-Item -LiteralPath 'main4 copy.png' -NewName 'main-series-4-gaming-thumbnail.png'
    Write-Host "  Renamed: main4 copy.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): main4 copy.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Group 2.png') {
    Rename-Item -LiteralPath 'Group 2.png' -NewName 'mohammed-anas-hero-photo.png'
    Write-Host "  Renamed: Group 2.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Group 2.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'main logo.png') {
    Rename-Item -LiteralPath 'main logo.png' -NewName 'digital-jungle-logo.png'
    Write-Host "  Renamed: main logo.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): main logo.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'thumbnail 12.jpg') {
    Rename-Item -LiteralPath 'thumbnail 12.jpg' -NewName 'before-redesign-sample.jpg'
    Write-Host "  Renamed: thumbnail 12.jpg" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): thumbnail 12.jpg" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Sketches/Gemini_Generated_Image_.png') {
    Rename-Item -LiteralPath 'Sketches/Gemini_Generated_Image_.png' -NewName 'Sketches/hero-sketch-1.png'
    Write-Host "  Renamed: Sketches/Gemini_Generated_Image_.png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Sketches/Gemini_Generated_Image_.png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Sketches/Gemini_Generated_Image_ (1).png') {
    Rename-Item -LiteralPath 'Sketches/Gemini_Generated_Image_ (1).png' -NewName 'Sketches/hero-sketch-2.png'
    Write-Host "  Renamed: Sketches/Gemini_Generated_Image_ (1).png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Sketches/Gemini_Generated_Image_ (1).png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Sketches/Gemini_Generated_Image_ (2).png') {
    Rename-Item -LiteralPath 'Sketches/Gemini_Generated_Image_ (2).png' -NewName 'Sketches/hero-sketch-3.png'
    Write-Host "  Renamed: Sketches/Gemini_Generated_Image_ (2).png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Sketches/Gemini_Generated_Image_ (2).png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Sketches/Gemini_Generated_Image_ (3).png') {
    Rename-Item -LiteralPath 'Sketches/Gemini_Generated_Image_ (3).png' -NewName 'Sketches/hero-sketch-4.png'
    Write-Host "  Renamed: Sketches/Gemini_Generated_Image_ (3).png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Sketches/Gemini_Generated_Image_ (3).png" -ForegroundColor Yellow
    $skipped++
}
if (Test-Path -LiteralPath 'Sketches/Gemini_Generated_Image_ (4).png') {
    Rename-Item -LiteralPath 'Sketches/Gemini_Generated_Image_ (4).png' -NewName 'Sketches/hero-sketch-5.png'
    Write-Host "  Renamed: Sketches/Gemini_Generated_Image_ (4).png" -ForegroundColor Green
    $renamed++
} else {
    Write-Host "  Not found (skipped): Sketches/Gemini_Generated_Image_ (4).png" -ForegroundColor Yellow
    $skipped++
}

Write-Host ""
Write-Host "Done. $renamed renamed, $skipped skipped (already renamed or missing)." -ForegroundColor Cyan