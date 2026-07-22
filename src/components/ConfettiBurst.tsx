"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = [
  "var(--color-sapphire)",
  "var(--color-success)",
  "var(--color-amber)",
  "var(--color-gold)",
  "#ffffff",
];

interface ConfettiBurstProps {
  count?: number;
}

/* Deterministic pseudo-random in [0, 1), seeded by index — keeps piece
   generation a pure function of `count` so it's safe to compute during render. */
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function ConfettiBurst({ count = 28 }: ConfettiBurstProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (Math.PI * 2 * i) / count + seededRandom(i) * 0.5;
        const distance = 60 + seededRandom(i + 0.33) * 80;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 24;
        const rot = seededRandom(i + 0.66) * 360;
        const delay = seededRandom(i + 0.11) * 0.15;
        const color = COLORS[i % COLORS.length];
        const size = 5 + seededRandom(i + 0.88) * 4;
        return { tx, ty, rot, delay, color, size, id: i };
      }),
    [count]
  );

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden="true"
    >
      {pieces.map((p) => (
        <span
          key={p.id}
          className="animate-confetti-burst absolute left-1/2 top-1/2 rounded-sm"
          style={
            {
              width: p.size,
              height: p.size * 1.6,
              backgroundColor: p.color,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
