"use client";

import Image from "next/image";
import { useState } from "react";
import type { PartnerLogo } from "@/lib/partners";

type PartnersMarqueeProps = {
  title: string;
  description?: string;
  logos: PartnerLogo[];
};

export function PartnersMarquee({ title, description, logos }: PartnersMarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  if (logos.length === 0) return null;

  const trackLogos = [...logos, ...logos];

  return (
    <section aria-label={title} className="pc-section border-y border-white/10">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">{title}</p>
        {description ? <p className="mt-3 text-sm leading-6 text-[#A8B2BA]">{description}</p> : null}
      </div>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="pc-marquee flex w-max items-center gap-14"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {trackLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              aria-hidden={index >= logos.length}
              className="relative h-20 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-4 sm:h-24 sm:w-44"
            >
              <Image
                src={logo.src}
                alt={index < logos.length ? logo.alt : ""}
                fill
                loading="eager"
                sizes="(max-width: 639px) 160px, 176px"
                className="rounded-lg object-contain transition-transform duration-300 ease-out hover:scale-105 active:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
