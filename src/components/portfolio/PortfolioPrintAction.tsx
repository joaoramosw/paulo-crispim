"use client";

import { Printer } from "lucide-react";

export function PortfolioPrintAction() {
  return (
    <button type="button" onClick={() => window.print()} className="portfolio-print-action group inline-flex min-h-12 items-center justify-center gap-3 border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#F4F7F8] transition hover:border-[#35F06A]/50 hover:bg-[#35F06A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
      <Printer aria-hidden="true" className="h-4 w-4 text-[#35F06A]" />
      Salvar Portfólio em PDF
    </button>
  );
}
