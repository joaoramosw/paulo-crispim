"use client";

import { useEffect, useState } from "react";

export function AnimatedBackground({ intensity = "default" }: { intensity?: "default" | "strong" }) {
  const [position, setPosition] = useState({ x: 50, y: 20 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!finePointer.matches || reduceMotion.matches) {
      return;
    }

    let frame = 0;
    function handlePointerMove(event: PointerEvent) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        setPosition({
          x: Math.round((event.clientX / window.innerWidth) * 100),
          y: Math.round((event.clientY / window.innerHeight) * 100),
        });
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const glowOpacity = intensity === "strong" ? "opacity-90" : "opacity-70";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(168,178,186,0.16),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(6,58,70,0.62),transparent_34%),linear-gradient(135deg,#050708_0%,#11181D_48%,#062C35_100%)]" />
      <div
        className={`absolute h-[34rem] w-[34rem] rounded-full bg-[#35F06A]/[0.055] blur-3xl transition-transform duration-700 ${glowOpacity}`}
        style={{ transform: `translate(${position.x - 20}vw, ${position.y - 34}vh)` }}
      />
      <div className="pc-grid absolute inset-0 opacity-35" />
      <div className="pc-flow absolute inset-x-[-20%] top-[12%] h-px bg-gradient-to-r from-transparent via-[#35F06A]/65 to-transparent" />
      <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1440 1200" fill="none" preserveAspectRatio="none">
        <path className="pc-draw-line" d="M-80 360C150 250 326 286 506 170C720 32 900 90 1054 142C1216 196 1320 84 1520 18" stroke="#35F06A" strokeOpacity="0.32" strokeWidth="2" />
        <path className="pc-draw-line pc-delay-1" d="M-60 810C196 650 402 742 586 578C730 450 898 458 1052 502C1214 548 1342 430 1530 378" stroke="#A8B2BA" strokeOpacity="0.18" />
        <path className="pc-draw-line pc-delay-2" d="M228 130H520L674 286H1012L1168 132H1500" stroke="#A8B2BA" strokeOpacity="0.2" />
        <g fill="#F4F7F8" opacity="0.2">
          <circle cx="506" cy="170" r="4" />
          <circle cx="1054" cy="142" r="4" />
          <circle cx="674" cy="286" r="3" />
          <circle cx="1052" cy="502" r="4" />
        </g>
        <circle className="pc-pulse-dot" cx="1054" cy="142" r="8" fill="#35F06A" opacity="0.78" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(5,7,8,0.55))]" />
    </div>
  );
}
