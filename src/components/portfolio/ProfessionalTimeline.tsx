import { RevealSection } from "@/components/shared/RevealSection";

export type TimelineItem = {
  title: string;
  description: string;
};

export function ProfessionalTimeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative mt-12">
      <div aria-hidden="true" className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#35F06A] via-white/10 to-transparent md:block lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-full" />
      <div className="grid gap-5 lg:grid-cols-5">
        {items.map((item, index) => (
          <RevealSection key={item.title} delay={index * 90}>
            <article className="portfolio-card relative h-full border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:border-[#35F06A]/35">
              <span className="mb-8 flex h-10 w-10 items-center justify-center border border-[#35F06A]/40 bg-[#050708] font-mono text-sm text-[#35F06A] shadow-[0_0_24px_rgba(53,240,106,0.16)]">0{index + 1}</span>
              <h3 className="text-lg font-semibold leading-snug text-[#F4F7F8]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#A8B2BA]">{item.description}</p>
            </article>
          </RevealSection>
        ))}
      </div>
    </div>
  );
}
