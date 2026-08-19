import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { BrandMark } from "@/components/layout/BrandMark";
import { contactConfig, getDefaultTalkMessage, getMailtoUrl, getWhatsAppUrl } from "@/lib/contact";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Palestras", href: "/palestras" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Dúvidas frequentes", href: "/#faq" },
  { label: "Links", href: "/links" },
  { label: "Contato", href: "/contato" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 border-t border-white/10 bg-[#050708] px-6 py-12 text-[#A8B2BA] sm:px-10 lg:px-14 lg:py-14">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          <div>
            <BrandMark imageClassName="h-11 w-auto sm:h-12" priority={false} />
            <p className="mt-5 max-w-md text-sm leading-7">
              Palestras corporativas para empresas, líderes e equipes que buscam clareza, direção e evolução profissional.
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a href={getWhatsAppUrl(getDefaultTalkMessage())} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
                <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
              </a>
              <a href={getMailtoUrl("Solicitação de palestra")} className="inline-flex items-center gap-2 transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
                <Mail aria-hidden="true" className="h-4 w-4" /> {contactConfig.email}
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.22em] lg:justify-end">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em]">
          <p>© {year} Paulo Crispim. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
