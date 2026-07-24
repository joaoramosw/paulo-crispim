import { ChevronDown } from "lucide-react";
import type { TrajectoryStage } from "@/content/portfolio";
import { RevealSection } from "@/components/shared/RevealSection";

const DETAILS_GROUP_NAME = "portfolio-trajetoria";

export function TrajectoryTimeline({ stages }: { stages: TrajectoryStage[] }) {
  return (
    <div className="relative mt-12">
      <div
        aria-hidden="true"
        className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#35F06A] via-white/10 to-transparent md:block lg:hidden"
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <RevealSection key={stage.id} delay={index * 90}>
            <details
              id={stage.id}
              name={DETAILS_GROUP_NAME}
              className="group portfolio-card relative h-full border border-white/10 bg-white/[0.035] transition hover:border-[#35F06A]/35 open:border-[#35F06A]/35"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 p-5 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
                <div>
                  <span className="flex h-10 w-10 items-center justify-center border border-[#35F06A]/40 bg-[#050708] font-mono text-sm text-[#35F06A] shadow-[0_0_24px_rgba(53,240,106,0.16)]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold leading-snug text-[#F4F7F8]">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#A8B2BA]">{stage.subtitle}</p>
                </div>
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-[#35F06A] transition-transform duration-300 group-open:rotate-180"
                />
              </summary>

              <div className="pc-disclosure-content border-t border-white/10 p-5">
                <div className="space-y-4">
                  {stage.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex} className="text-sm leading-7 text-[#A8B2BA]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <h4 className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-[#C8F8D2]">
                  {stage.listTitle}
                </h4>
                <ul className="mt-4 space-y-2">
                  {stage.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-7 text-[#A8B2BA]">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#35F06A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </RevealSection>
        ))}
      </div>
    </div>
  );
}
