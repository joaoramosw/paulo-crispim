import { ArrowRight } from "lucide-react";

type SipatCtaProps = {
  href: string;
  label: string;
  location: string;
  /** Só o CTA da dobra pulsa — repetir o efeito na página inteira o anula. */
  pulse?: boolean;
  className?: string;
};

/**
 * CTA único da landing: todo clique vai para o WhatsApp oficial. O rastreio
 * acontece pelo AnalyticsInteractionTracker global (que reconhece hrefs
 * wa.me), por isso o que importa aqui é carregar `data-cta-location` e
 * `data-cta-name` para o evento sair identificado por seção.
 */
export function SipatCta({ href, label, location, pulse = false, className = "" }: SipatCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-location={location}
      data-cta-name="solicitar_disponibilidade_proposta"
      className={`sipat-display group flex min-h-[58px] w-full max-w-[420px] items-center justify-center gap-2.5 rounded-xl bg-[#22C07A] px-6 py-4 text-center text-[clamp(0.9375rem,4vw,1.0625rem)] font-bold tracking-[-0.01em] text-[#04140C] transition-colors duration-200 hover:bg-[#2FD489] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C07A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] ${
        pulse ? "sipat-pulse-ring" : ""
      } ${className}`}
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </a>
  );
}
