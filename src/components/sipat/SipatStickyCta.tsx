"use client";

import { useEffect, useState } from "react";
import { SipatCta } from "./SipatCta";

type SipatStickyCtaProps = {
  href: string;
  label: string;
};

/**
 * Barra fixa de conversão. Só aparece depois que o visitante passa da primeira
 * dobra — antes disso o CTA da hero já está em tela e a barra seria ruído.
 * Renderiza null no servidor e no primeiro paint, então não há mismatch de
 * hidratação nem salto de layout: o rodapé já reserva a altura da barra.
 */
export function SipatStickyCta({ href, label }: SipatStickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > window.innerHeight * 0.85);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sipat-rise-in fixed inset-x-0 bottom-0 z-[60] border-t border-white/[0.09] bg-[#050708]/95 px-4 pb-[calc(0.625rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[14px]">
      <SipatCta
        href={href}
        label={label}
        location="sticky_bar"
        className="mx-auto min-h-[52px] max-w-[520px] py-3.5 text-[0.96875rem]"
      />
    </div>
  );
}
