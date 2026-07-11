import { MessageCircle } from "lucide-react";
import { getDefaultTalkMessage, getWhatsAppUrl } from "@/lib/contact";

export function FloatingContactButton() {
  return (
    <a
      href={getWhatsAppUrl(getDefaultTalkMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp de Paulo Crispim"
      className="floating-contact group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#35F06A]/45 bg-[#35F06A] text-[#050708] shadow-[0_0_34px_rgba(53,240,106,0.34)] transition hover:scale-105 hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] active:scale-95"
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" />
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-56 translate-y-1 border border-white/10 bg-[#050708]/95 px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#C8F8D2] opacity-0 shadow-2xl shadow-black/30 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        Assistente Paulo Crispim — em breve
      </span>
    </a>
  );
}
