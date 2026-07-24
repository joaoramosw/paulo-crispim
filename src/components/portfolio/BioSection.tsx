import { Check, ChevronDown } from "lucide-react";
import { portfolioAbout } from "@/content/portfolio";

export function BioSection({ about }: { about: typeof portfolioAbout }) {
  return (
    <details className="group portfolio-card mt-12 border border-white/10 bg-white/[0.035] open:border-[#35F06A]/35">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-bold uppercase tracking-[0.18em] text-[#C8F8D2] outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:p-6">
        <span>
          <span className="group-open:hidden">Ler biografia completa</span>
          <span className="hidden group-open:inline">Recolher</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-[#35F06A] transition-transform duration-300 group-open:rotate-180"
        />
      </summary>

      <div className="pc-disclosure-content border-t border-white/10 p-5 sm:p-6">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-[#D8DEE2]">
              {paragraph}
            </p>
          ))}
        </div>

        <h3 className="mt-10 text-lg font-semibold text-[#F4F7F8]">{about.areasOfPracticeTitle}</h3>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {about.areasOfPractice.map((area) => (
            <li key={area} className="flex items-start gap-2 text-sm leading-7 text-[#A8B2BA]">
              <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#35F06A]" />
              <span>{area}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-10 text-lg font-semibold text-[#F4F7F8]">{about.purposeTitle}</h3>
        <p className="mt-4 border-l border-[#35F06A] pl-4 text-sm leading-7 text-[#A8B2BA]">
          {about.purposeQuote}
        </p>
      </div>
    </details>
  );
}
