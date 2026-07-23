"use client";

import { useEffect, useRef } from "react";
import { WavingFlag } from "@/components/WavingFlag";

const MAX_OFFSET = 22; // px of drift at full mouse travel
const MAX_ROTATE = 1.4; // degrees of tilt
const THROTTLE_MS = 40; // min gap between transform updates

interface InteractiveFlagBackdropProps {
  className?: string;
}

export function InteractiveFlagBackdrop({ className }: InteractiveFlagBackdropProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastRun = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (reduceMotion) return;

    if (isTouch) {
      el.classList.add("animate-flag-idle-drift");
      return;
    }

    function handleMove(e: PointerEvent) {
      const now = performance.now();
      if (now - lastRun.current < THROTTLE_MS) return;
      lastRun.current = now;

      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      const tx = nx * MAX_OFFSET;
      const ty = ny * MAX_OFFSET * 0.5;
      const rot = nx * MAX_ROTATE;
      if (el) {
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
      }
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        willChange: "transform",
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <WavingFlag className="h-full w-full" />
    </div>
  );
}
