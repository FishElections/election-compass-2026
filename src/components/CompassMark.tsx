interface CompassMarkProps {
  className?: string;
  animate?: boolean;
}

export function CompassMark({ className, animate }: CompassMarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="20"
        r="17"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.35"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="20"
          y1="4"
          x2="20"
          y2={deg % 90 === 0 ? "8" : "6.5"}
          stroke="currentColor"
          strokeWidth={deg % 90 === 0 ? 1.8 : 1}
          opacity={deg % 90 === 0 ? 0.9 : 0.4}
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <g className={animate ? "animate-needle-settle origin-center" : ""}>
        <path d="M20 8 L23.5 20 L20 20 Z" fill="var(--color-gold)" />
        <path d="M20 20 L23.5 20 L20 32 Z" fill="currentColor" opacity="0.9" />
        <path d="M20 8 L16.5 20 L20 20 Z" fill="currentColor" opacity="0.55" />
        <path d="M20 20 L16.5 20 L20 32 Z" fill="currentColor" opacity="0.3" />
      </g>
      <circle cx="20" cy="20" r="2.2" fill="currentColor" />
    </svg>
  );
}
