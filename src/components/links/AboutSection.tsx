import Image from "next/image";
import { User } from "lucide-react";
import type { aboutSection } from "@/content/links";

type AboutSectionProps = {
  content: typeof aboutSection;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="border-t border-white/10 pt-12 sm:pt-16">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:mx-0 md:w-72">
          {content.portraitSrc ? (
            <Image src={content.portraitSrc} alt={content.name} fill sizes="(max-width: 768px) 320px, 288px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(0,255,102,0.14),transparent_55%),linear-gradient(160deg,#111,#000)]">
              <User aria-hidden="true" className="h-16 w-16 text-white/15" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00FF66]">{content.eyebrow}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Quem é <span className="italic">{content.name}</span>?
          </h2>

          <div className="mt-5 space-y-4">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-gray-300 sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {content.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00FF66]/30 sm:text-left"
              >
                <p className="text-xl font-bold text-[#00FF66] sm:text-2xl">{metric.value}</p>
                <p className="mt-1 text-xs leading-snug text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
