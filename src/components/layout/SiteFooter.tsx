import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { contactConfig, getDefaultTalkMessage, getMailtoUrl, getWhatsAppUrl } from "@/lib/contact";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Palestras", href: "/palestras" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Contato", href: "/contato" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 border-t border-white/10 bg-[#050708] px-6 py-10 text-[#A8B2BA] sm:px-10 lg:px-14">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
        <div>
          <Image
            src="/paulo-crispim/logos/logo-paulo-crispim-full.png"
            alt="Paulo Crispim"
            width={436}
            height={255}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-xl text-sm leading-7">Palestras corporativas para empresas, líderes e equipes que buscam clareza, direção e evolução profissional.</p>
          <div className="mt-5 flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap">
            <a href={getWhatsAppUrl(getDefaultTalkMessage())} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
              <MessageCircle aria-hidden="true" className="h-4 w-4" /> WhatsApp
            </a>
            <a href={getMailtoUrl("Solicitação de palestra")} className="inline-flex items-center gap-2 transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
              <Mail aria-hidden="true" className="h-4 w-4" /> {contactConfig.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:items-end">
          <nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em]">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs uppercase tracking-[0.2em]">© {year} Paulo Crispim. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
