import { useMemo } from "react";

export function Dust({ count = 35 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        top: 60 + Math.random() * 40,
        delay: Math.random() * 12,
        dur: 10 + Math.random() * 14,
        dx: (Math.random() - 0.5) * 120 + "px",
        dy: -(80 + Math.random() * 200) + "px",
        size: 1.5 + Math.random() * 2.5,
        key: i,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.key}
          className="dust"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--dx" as string]: p.dx,
            ["--dy" as string]: p.dy,
          }}
        />
      ))}
    </div>
  );
}

export function FairyLights() {
  const lights = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        left: (i / 22) * 100 + (Math.random() - 0.5) * 4,
        top: 4 + Math.sin(i * 0.8) * 3 + Math.random() * 2,
        delay: Math.random() * 3,
        hue: 70 + Math.random() * 20,
        key: i,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24">
      <svg className="absolute inset-x-0 top-0 h-16 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
        <path d="M0 2 Q 25 8 50 3 T 100 4" stroke="oklch(0.35 0.02 30)" strokeWidth="0.15" fill="none" />
      </svg>
      {lights.map((l) => (
        <span
          key={l.key}
          className="fairy-light absolute"
          style={{
            left: `${l.left}%`,
            top: `${l.top}%`,
            width: 8,
            height: 8,
            borderRadius: 9999,
            background: `oklch(0.92 0.15 ${l.hue})`,
            boxShadow: `0 0 12px oklch(0.90 0.18 ${l.hue} / 0.9), 0 0 30px oklch(0.85 0.18 ${l.hue} / 0.6)`,
            animationDelay: `${l.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Candle({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="absolute" style={style}>
      {/* glow */}
      <div
        className="absolute -inset-16 rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.85 0.18 70 / 0.55), transparent 65%)",
          filter: "blur(8px)",
        }}
      />
      {/* candle body */}
      <div
        className="relative mx-auto"
        style={{
          width: 28,
          height: 70,
          background:
            "linear-gradient(180deg, oklch(0.94 0.03 80), oklch(0.82 0.04 70))",
          borderRadius: 4,
          boxShadow: "inset -4px 0 6px oklch(0.55 0.04 40 / 0.4), 0 8px 14px oklch(0 0 0 / 0.4)",
        }}
      />
      {/* flame */}
      <div
        className="flame absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: 64,
          width: 12,
          height: 22,
          background:
            "radial-gradient(circle at 50% 70%, oklch(0.98 0.18 90), oklch(0.75 0.22 50) 60%, transparent 75%)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          filter: "blur(0.4px)",
        }}
      />
    </div>
  );
}

export function Petals({ count = 18 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 8,
        dx: (Math.random() - 0.5) * 200 + "px",
        size: 10 + Math.random() * 10,
        rot: Math.random() * 360,
        key: i,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p) => (
        <svg
          key={p.key}
          className="petal"
          width={p.size}
          height={p.size}
          viewBox="0 0 20 20"
          style={{
            left: `${p.left}%`,
            top: `-5%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            ["--dx" as string]: p.dx,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          <path
            d="M10 1 C 14 5, 19 9, 10 19 C 1 9, 6 5, 10 1 Z"
            fill="oklch(0.83 0.08 18 / 0.85)"
          />
        </svg>
      ))}
    </div>
  );
}

export function Sparkles({ count = 14 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 3,
        size: 6 + Math.random() * 8,
        key: i,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((s) => (
        <svg
          key={s.key}
          className="sparkle"
          width={s.size}
          height={s.size}
          viewBox="0 0 10 10"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        >
          <path
            d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
            fill="oklch(0.92 0.16 85)"
          />
        </svg>
      ))}
    </div>
  );
}
