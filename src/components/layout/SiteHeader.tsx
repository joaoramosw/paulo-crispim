"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { getDefaultTalkMessage, getWhatsAppUrl } from "@/lib/contact";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Palestras", href: "/palestras" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Contato", href: "/contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 12);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-40 transition duration-300 ${hasScrolled || isOpen ? "border-b border-white/10 bg-[#050708]/88 shadow-2xl shadow-black/30 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-5 sm:px-10 lg:px-14">
        <BrandMark />

        <nav aria-label="Navegação principal" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A8B2BA] lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`group relative rounded-full px-3 py-2 transition hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708] ${active ? "text-[#F4F7F8]" : ""}`}>
                {item.label}
                <span className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-[#35F06A] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
          <a href={getWhatsAppUrl(getDefaultTalkMessage())} target="_blank" rel="noopener noreferrer" className="ml-2 rounded-full border border-[#35F06A]/40 bg-[#35F06A]/10 px-4 py-2 text-[#C8F8D2] transition hover:bg-[#35F06A] hover:text-[#050708] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708]">
            Solicitar uma palestra
          </a>
        </nav>

        <button type="button" aria-label={isOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-white/[0.04] text-[#F4F7F8] transition hover:border-[#35F06A]/40 hover:bg-[#35F06A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] lg:hidden">
          {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
        </button>
      </div>

      <div className={`overflow-hidden border-t border-white/10 bg-[#050708]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav aria-label="Menu mobile" className="mx-auto grid w-full max-w-7xl gap-2 px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#A8B2BA] sm:px-10">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-[#35F06A]/40 hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] ${pathname === item.href ? "border-[#35F06A]/50 text-[#C8F8D2]" : ""}`}>
              {item.label}
            </Link>
          ))}
          <a href={getWhatsAppUrl(getDefaultTalkMessage())} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="border border-[#35F06A] bg-[#35F06A] px-4 py-3 text-[#050708] transition hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
            Solicitar uma palestra
          </a>
        </nav>
      </div>
    </header>
  );
}
