export function AudienceConnectionLayer() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 720 520"
      fill="none"
      preserveAspectRatio="none"
    >
      <path className="pc-draw-line" d="M92 150C194 88 291 93 388 132C492 174 560 150 650 92" stroke="#35F06A" strokeOpacity="0.22" strokeWidth="1.5" />
      <path className="pc-draw-line pc-delay-1" d="M112 240H260L336 318H520L632 246" stroke="#A8B2BA" strokeOpacity="0.18" />
      <path className="pc-draw-line pc-delay-2" d="M82 402C210 330 304 390 420 330C514 282 590 328 660 378" stroke="#35F06A" strokeOpacity="0.18" />
      <g fill="#35F06A">
        <circle className="pc-pulse-dot" cx="92" cy="150" r="4" />
        <circle className="pc-pulse-dot" cx="388" cy="132" r="4" />
        <circle className="pc-pulse-dot" cx="520" cy="318" r="4" />
        <circle className="pc-pulse-dot" cx="660" cy="378" r="4" />
      </g>
    </svg>
  );
}
