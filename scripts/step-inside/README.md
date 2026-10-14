# Step-inside websites

The walk-in hero is `src/app/components/StepInside.tsx`. The sales page is `/websites/step-inside`.

## Film it (5 minutes on site)
1. Daylight, lights on, glass clean, no customers' faces close up.
2. Phone on 4K, exposure locked (tap and hold), stabilisation on. Walk slowly.
3. Start outside and **pan right to left** along the shopfront and sign.
4. Walk to the door and **open it with a good frame**: door centred, sign visible.
5. Step in and **look to the right** across the counter. Hold 2 seconds.
6. 10–20 seconds in total. Film it twice: landscape (computers) and portrait (phones).

## Make the frames
```powershell
.\scripts\step-inside\make-frames.ps1 -Name bobs -Landscape C:\clips\bobs-land.mp4 -Portrait C:\clips\bobs-port.mp4
```

## Use it on a client's site
```tsx
<StepInside
  desktop={{ dir: "/step-inside/bobs/desktop", count: 150 }}
  mobile={{ dir: "/step-inside/bobs/mobile", count: 150 }}
  poster="/step-inside/bobs/desktop/f_0001.webp"
  label="Step inside Bob's"
  logo="Bob's"
>
  {/* optional headline + buttons over the first frames */}
</StepInside>
```

The demo walk-in in `public/step-inside/cafe-demo` is cut from free Pexels clips (master video: `marketing/step-inside/walkin-demo-1080p.mp4`). Replace it with a real client walk-in as soon as you have one.
