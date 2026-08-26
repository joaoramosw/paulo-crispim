"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { getDefaultTalkMessage, getWhatsAppUrl } from "@/lib/contact";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
};

export function FaqSection({ eyebrow, title, description, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();
  const whatsappUrl = getWhatsAppUrl(getDefaultTalkMessage());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" aria-label={title} className="pc-section scroll-mt-8 border-y border-white/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 inline-flex items-center gap-3 border border-[#35F06A]/25 bg-[#35F06A]/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#C8F8D2] sm:text-xs">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#35F06A]" />
          {eyebrow}
        </p>
        <h2 className="text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F7F8]">{title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#D8DEE2] sm:text-lg">{description}</p>
      </div>

      <div className="mx-auto mt-10 max-w-[900px] border-t border-white/10 lg:mt-14">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const isLast = index === items.length - 1;
          const buttonId = `${baseId}-faq-button-${index}`;
          const panelId = `${baseId}-faq-panel-${index}`;

          return (
            <div key={item.question} className="border-b border-white/10">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708]"
                >
                  <span className="text-sm font-semibold text-[#F4F7F8] sm:text-base">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative flex h-5 w-5 shrink-0 items-center justify-center text-[#35F06A]"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={`absolute h-3.5 w-px bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${
                        isOpen ? "scale-y-0" : "scale-y-100"
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#A8B2BA]">
                    {item.answer}
                    {isLast ? (
                      <>
                        {" "}
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isOpen ? 0 : -1}
                          className="inline-flex items-center gap-1 font-semibold text-[#35F06A] transition hover:text-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
                        >
                          Falar pelo WhatsApp
                          <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </a>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-[900px] text-center lg:mt-16">
        <p className="text-lg font-semibold text-[#F4F7F8] sm:text-xl">Ainda ficou com alguma dúvida?</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#A8B2BA]">
          Fale diretamente com nossa equipe e conte um pouco sobre seu evento.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#35F06A] bg-[#35F06A] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#050708] transition-all duration-200 hover:bg-[#C8F8D2] hover:shadow-[0_0_28px_rgba(53,240,106,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.16em]"
        >
          Falar pelo WhatsApp
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
