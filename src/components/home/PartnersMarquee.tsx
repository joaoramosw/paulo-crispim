"use client";

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
    <section aria-label={title} className="border-y border-white/10 py-14 lg:py-16">
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
              className="flex h-20 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] p-2.5 sm:h-24 sm:w-48"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- intrinsic sizing (h-full w-auto) is needed so the rendered box hugs the logo pixels tightly; next/image's `fill` mode leaves letterboxed transparent space that swallows the rounded corners. */}
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto max-w-full rounded-lg object-contain transition-transform duration-300 ease-out hover:scale-105 active:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
