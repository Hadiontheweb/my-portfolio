import { useEffect, useRef } from 'react';

const FRAME_DIR = '/frames';
const EASING = 0.24; // lerp factor per 60fps frame — higher tracks scroll more closely
const SNAP = 0.0004;

// Actual files on disk: 001–176 contiguous, then 178, 179, 180, 182 (no 177/181)
const FRAME_FILES: string[] = [];
for (let i = 1; i <= 176; i++) FRAME_FILES.push(`frame_${String(i).padStart(3, '0')}.webp`);
FRAME_FILES.push('frame_178.webp', 'frame_179.webp', 'frame_180.webp', 'frame_182.webp');
const FRAME_COUNT = FRAME_FILES.length;

/**
 * Fixed full-viewport background canvas that scrubs the 180-frame morph against
 * scroll from the top of the page through the end of the services section.
 * It fades out at the end of the services section so later sections have no
 * morph frame behind them.
 */
export default function MorphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ---- scrub state ----
    let target = 0; // progress 0..1 from page top to the end of services
    let display = 0; // eased progress actually rendered
    let needsRender = true;
    let started = false;
    let raf = 0;

    let cw = 0, ch = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth, h = window.innerHeight;
      if (!w || !h) return; // tab not laid out yet — tick() self-heals this
      cw = w; ch = h;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      needsRender = true;
    };

    // ---- frame sequence ----
    const frames = FRAME_FILES.map(() => new Image());
    const requestedFrames = new Set<number>();
    let requestedTargetCenter = -1;
    let requestedDisplayCenter = -1;
    const isReady = (img: HTMLImageElement) => img.complete && img.naturalWidth > 0;
    const requestFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || requestedFrames.has(index)) return;
      requestedFrames.add(index);
      const img = frames[index];
      img.decoding = 'async';
      img.fetchPriority =
        index === requestedTargetCenter || (index === 0 && requestedTargetCenter === -1) ? 'high' : 'low';
      img.onload = () => {
        if (!started) {
          started = true;
          resize();
        }
        needsRender = true;
      };
      img.onerror = () => {
        console.error(`Failed to load morph frame: ${FRAME_FILES[index]}`);
      };
      img.src = `${FRAME_DIR}/${FRAME_FILES[index]}`;
    };

    // Nearest frame that has finished loading (walk back, then forward)
    const nearestReady = (i: number): HTMLImageElement | null => {
      for (let k = i; k >= 0; k--) if (isReady(frames[k])) return frames[k];
      for (let k = i + 1; k < FRAME_COUNT; k++) if (isReady(frames[k])) return frames[k];
      return null;
    };

    requestFrame(0);

    // Complete the morph when the services section reaches the bottom of view.
    const readScroll = () => {
      const services = document.getElementById('services');
      const servicesBottom = services
        ? services.offsetTop + services.offsetHeight
        : document.documentElement.scrollHeight;
      const servicesEnd = services
        ? services.offsetTop + services.offsetHeight - window.innerHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      const fadeDistance = Math.min(160, Math.max(servicesBottom, 0));
      canvas.parentElement?.style.setProperty(
        'opacity',
        String(Math.min(1, Math.max(0, (servicesBottom - window.scrollY) / fadeDistance))),
      );
      const max = servicesEnd;
      target = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      const center = Math.round(target * (FRAME_COUNT - 1));
      if (center !== requestedTargetCenter) {
        requestedTargetCenter = center;
        [center, center + 1, center - 1, center + 2, center - 2].forEach(requestFrame);
      }
    };

    // Full-bleed cover fit, centered
    const drawCover = (img: HTMLImageElement, alpha: number) => {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih) return;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s, h = ih * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const render = () => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, cw, ch);

      const t = display * (FRAME_COUNT - 1);
      const i0 = Math.min(Math.floor(t), FRAME_COUNT - 1);
      const frac = t - i0;
      const img0 = nearestReady(i0);
      if (!img0) return;
      drawCover(img0, 1);
      // Fractional blend into the next frame = sub-frame smoothness
      if (frac > 0.001 && i0 + 1 < FRAME_COUNT && isReady(frames[i0 + 1])) {
        drawCover(frames[i0 + 1], frac);
      }
      ctx.globalAlpha = 1;
    };

    // ---- animation loop ----
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 64);
      lastTime = now;

      // Self-healing size check (covers 0x0 tab races where no resize event fires)
      if (window.innerWidth !== cw || window.innerHeight !== ch) resize();

      readScroll();
      const diff = target - display;
      if (Math.abs(diff) > SNAP) {
        // frame-rate independent lerp toward the scroll target
        const k = 1 - Math.pow(1 - EASING, dt / 16.667);
        display += diff * k;
        needsRender = true;
      } else if (display !== target) {
        display = target;
        needsRender = true;
      }

      const displayCenter = Math.round(display * (FRAME_COUNT - 1));
      if (displayCenter !== requestedDisplayCenter) {
        requestedDisplayCenter = displayCenter;
        [displayCenter, displayCenter + 1, displayCenter - 1].forEach(requestFrame);
      }

      if (needsRender && started) {
        render();
        needsRender = false;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      frames.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Fixed in place behind everything (z-0); content sections sit above at z-10.
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
