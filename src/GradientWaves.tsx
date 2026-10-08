import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';
import './GradientWaves.css';

type WaveDetail = 'low' | 'medium' | 'high';

interface GradientWavesProps {
  horizonColor?: string;
  waveColor?: string;
  crestColor?: string;
  speed?: number;
  amplitude?: number;
  waveScale?: number;
  waveRatio?: number;
  swell?: number;
  turbulence?: number;
  tilt?: number;
  zoom?: number;
  height?: number;
  fogDepth?: number;
  detail?: WaveDetail;
  brightness?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  parallaxStrength?: number;
  grain?: boolean;
  grainIntensity?: number;
  dpr?: number;
  className?: string;
}

interface WaveUniforms {
  iTime: { value: number };
  iResolution: { value: Float32Array };
  uSpeed: { value: number };
  uAmplitude: { value: number };
  uWaveScale: { value: number };
  uWaveRatio: { value: number };
  uSwell: { value: number };
  uTurbulence: { value: number };
  uTilt: { value: number };
  uZoom: { value: number };
  uHeight: { value: number };
  uFogDepth: { value: number };
  uSteps: { value: number };
  uBrightness: { value: number };
  uOpacity: { value: number };
  uGrain: { value: number };
  uGrainIntensity: { value: number };
  uMouse: { value: Float32Array };
  uParallax: { value: number };
  uEnableMouse: { value: boolean };
  uHorizonColor: { value: Float32Array };
  uWaveColor: { value: Float32Array };
  uCrestColor: { value: Float32Array };
}

interface WaveContext {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
  uniforms: WaveUniforms;
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 20000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 128; i++) {
    if (float(i) >= uSteps) break;
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.1) break;
    dist += 0.9 * dscene;
    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
  }
  return dist;
}

void main() {
  float time = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(time / 0.130, time / 0.810, time / 0.200, time / 0.710);
  float c;
  float s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot);
  s = sin(xrot);
  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x;
  s = nuv.y;
  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
  c = cos(uTilt);
  s = sin(uTilt);
  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

  if (uEnableMouse) {
    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw);
    s = sin(yaw);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
    c = cos(pitch);
    s = sin(pitch);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;
  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  vec3 body = mix(uWaveColor, uCrestColor, clamp(pos.z * 0.08 + 0.5, 0.0, 1.0));
  vec3 color = mix(uHorizonColor, body, t);
  color = clamp(color * uBrightness, 0.0, 1.0);

  float alpha = clamp(t, 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float noise = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (noise - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(color * alpha, alpha);
}`;

const detailToSteps = (detail: WaveDetail) => {
  if (detail === 'low') return 40;
  if (detail === 'high') return 110;
  return 70;
};

function hexToRgb(hex: string): Float32Array {
  const value = hex.trim().replace(/^#/, '');
  const normalized = value.length === 3 ? value.replace(/./g, (channel) => channel + channel) : value;
  const match = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!match) return new Float32Array([1, 1, 1]);
  return new Float32Array([
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ]);
}

export default function GradientWaves({
  horizonColor = '#5227FF',
  waveColor = '#FF9FFC',
  crestColor = '#FFFFFF',
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = 'medium',
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = true,
  grainIntensity = 0.05,
  dpr = 1,
  className = '',
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<WaveContext | null>(null);
  const mouseInteractionRef = useRef(mouseInteraction);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(Math.max(dpr, 0.5), 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.4 },
        uAmplitude: { value: 2.5 },
        uWaveScale: { value: 0.6 },
        uWaveRatio: { value: 0.9 },
        uSwell: { value: 35 },
        uTurbulence: { value: 20 },
        uTilt: { value: 1.11 },
        uZoom: { value: 1 },
        uHeight: { value: 5.5 },
        uFogDepth: { value: 15 },
        uSteps: { value: 40 },
        uBrightness: { value: 1 },
        uOpacity: { value: 1 },
        uGrain: { value: 1 },
        uGrainIntensity: { value: 0.05 },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uParallax: { value: 0.5 },
        uEnableMouse: { value: true },
        uHorizonColor: { value: new Float32Array([1, 1, 1]) },
        uWaveColor: { value: new Float32Array([1, 1, 1]) },
        uCrestColor: { value: new Float32Array([1, 1, 1]) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    const context: WaveContext = {
      renderer,
      program,
      mesh,
      uniforms: program.uniforms as WaveUniforms,
    };
    contextRef.current = context;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
      context.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      context.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const currentMouse = new Float32Array([0.5, 0.5]);
    const targetMouse = new Float32Array([0.5, 0.5]);
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetMouse[0] = (event.clientX - rect.left) / rect.width;
      targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
    };
    const onPointerLeave = () => {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    };
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let isPaused = false;
    let elapsed = 0;
    let previousTime = performance.now();
    let lastRenderTime = 0;
    const frameInterval = 1000 / 30;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canAnimate = () => isVisible && isPageVisible && !isPaused && !reducedMotion.matches;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const loop = (now: number) => {
      raf = 0;
      if (!canAnimate()) return;

      elapsed += Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      if (now - lastRenderTime >= frameInterval) {
        const mouseX = mouseInteractionRef.current ? targetMouse[0] : 0.5;
        const mouseY = mouseInteractionRef.current ? targetMouse[1] : 0.5;
        currentMouse[0] += 0.05 * (mouseX - currentMouse[0]);
        currentMouse[1] += 0.05 * (mouseY - currentMouse[1]);
        context.uniforms.iTime.value = elapsed;
        context.uniforms.uMouse.value.set(currentMouse);
        renderer.render({ scene: mesh });
        lastRenderTime = now;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!canAnimate() || raf) return;
      previousTime = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (canAnimate()) start();
      else stop();
    };
    const onReducedMotionChange = () => {
      if (canAnimate()) start();
      else {
        stop();
        renderer.render({ scene: mesh });
      }
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (canAnimate()) start();
      else stop();
    });
    intersectionObserver.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onReducedMotionChange);
    setSize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onReducedMotionChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      contextRef.current = null;
      if (canvas.parentNode === container) container.removeChild(canvas);
      const loseContext = gl.getExtension('WEBGL_lose_context') as { loseContext?: () => void } | null;
      loseContext?.loseContext?.();
    };
  }, [dpr]);

  useEffect(() => {
    mouseInteractionRef.current = mouseInteraction;
    const context = contextRef.current;
    if (!context) return;

    const uniforms = context.uniforms;
    uniforms.uSpeed.value = speed;
    uniforms.uAmplitude.value = amplitude;
    uniforms.uWaveScale.value = waveScale;
    uniforms.uWaveRatio.value = waveRatio;
    uniforms.uSwell.value = swell;
    uniforms.uTurbulence.value = turbulence;
    uniforms.uTilt.value = tilt;
    uniforms.uZoom.value = zoom;
    uniforms.uHeight.value = height;
    uniforms.uFogDepth.value = fogDepth;
    uniforms.uSteps.value = detailToSteps(detail);
    uniforms.uBrightness.value = brightness;
    uniforms.uOpacity.value = opacity;
    uniforms.uGrain.value = grain ? 1 : 0;
    uniforms.uGrainIntensity.value = grainIntensity;
    uniforms.uParallax.value = parallaxStrength;
    uniforms.uEnableMouse.value = mouseInteraction;
    uniforms.uHorizonColor.value.set(hexToRgb(horizonColor));
    uniforms.uWaveColor.value.set(hexToRgb(waveColor));
    uniforms.uCrestColor.value.set(hexToRgb(crestColor));
    context.renderer.render({ scene: context.mesh });
  }, [
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity,
  ]);

  return <div ref={containerRef} className={`gradient-waves-container ${className}`.trim()} />;
}
