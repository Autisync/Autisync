# Turn phone walk-in videos into scroll frames for <StepInside />.
# Needs ffmpeg on PATH (winget install Gyan.FFmpeg).
#
#   .\scripts\step-inside\make-frames.ps1 -Name bobs -Landscape C:\clips\bobs-landscape.mp4 -Portrait C:\clips\bobs-portrait.mp4
#
# Writes public/step-inside/<Name>/desktop and /mobile, prints the frame counts
# to put in the page:  <StepInside desktop={{ dir: "/step-inside/bobs/desktop", count: N }} ... />
param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$Landscape,
    [string]$Portrait,
    [int]$Frames = 150   # target frame count: 120-200 keeps the walk smooth and the page light
)
$ErrorActionPreference = "Stop"
$root = Join-Path (Split-Path -Parent (Split-Path -Parent $PSScriptRoot)) "public\step-inside\$Name"

function Cut($video, $out, $width) {
    New-Item -ItemType Directory -Force -Path $out | Out-Null
    $dur = [double](ffprobe -v error -show_entries format=duration -of csv=p=0 $video)
    $fps = [math]::Round($Frames / $dur, 3)
    ffmpeg -v error -y -i $video -vf "fps=$fps,scale=${width}:-2" -c:v libwebp -quality 70 "$out\f_%04d.webp"
    $n = (Get-ChildItem $out -Filter f_*.webp).Count
    $kb = [math]::Round(((Get-ChildItem $out -Filter f_*.webp | Measure-Object Length -Sum).Sum) / 1KB)
    Write-Host "$out : $n frames, $kb KB"
}

Cut $Landscape "$root\desktop" 1600
if ($Portrait) { Cut $Portrait "$root\mobile" 900 }
Write-Host "Poster: /step-inside/$Name/desktop/f_0001.webp"
