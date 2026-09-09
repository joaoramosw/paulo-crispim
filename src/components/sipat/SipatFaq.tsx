"use client";

import { trackFaqOpen } from "@/lib/analytics";

type SipatFaqItem = {
  question: string;
  answer: string;
};

type SipatFaqProps = {
  items: SipatFaqItem[];
};

/**
 * Acordeão nativo (<details>), não um controlado por estado: a resposta fica
 * no DOM e acessível mesmo antes da hidratação, e o navegador cuida de
 * teclado e semântica. O componente só é client por causa do `onToggle`, que
 * alimenta o evento faq_open do GA4 (ver docs/TRACKING.md).
 */
export function SipatFaq({ items }: SipatFaqProps) {
  return (
    <div className="grid gap-px border-y border-white/[0.08] bg-white/[0.08]">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group bg-[#080B0C]"
          onToggle={(event) => {
            if (event.currentTarget.open) {
              trackFaqOpen({ faqId: `sipat_faq_${index + 1}`, faqPosition: index + 1 });
            }
          }}
        >
          <summary className="sipat-display flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-1 py-5 text-[1.03125rem] font-medium tracking-[-0.01em] text-white transition-colors hover:text-[#22C07A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22C07A] [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#22C07A]"
            >
              <span className="absolute h-px w-3.5 bg-current" />
              <span className="absolute h-3.5 w-px bg-current transition-transform duration-200 ease-out group-open:scale-y-0 motion-reduce:transition-none" />
            </span>
          </summary>
          <p className="m-0 max-w-[60ch] px-1 pb-[22px] text-[0.9375rem] leading-[1.6] text-[#A9B1B1]">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
