import type { CSSProperties, ReactNode } from 'react';

interface GlassEffectProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function GlassEffect({ children, className = '', style = {} }: GlassEffectProps) {
  return (
    <div
      className={`liquid-glass-dock relative isolate overflow-hidden rounded-3xl text-white ${className}`}
      style={style}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
        style={{
          backdropFilter: 'blur(5px) saturate(155%)',
          WebkitBackdropFilter: 'blur(5px) saturate(155%)',
          filter: 'url(#liquid-glass-distortion)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        style={{ background: 'rgba(255, 255, 255, 0.12)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        style={{
          boxShadow:
            'inset 1px 1px 1px rgba(255, 255, 255, 0.42), inset -1px -1px 1px rgba(255, 255, 255, 0.18)',
        }}
      />
      <div className="relative z-30">{children}</div>
    </div>
  );
}

export function GlassFilter() {
  return (
    <svg aria-hidden="true" className="pointer-events-none fixed h-0 w-0">
      <filter
        id="liquid-glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="28"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
