import { BookOpen, CalendarCheck, GraduationCap, Presentation, type LucideIcon } from "lucide-react";
import type { LinkCardItem } from "@/content/links";

const CARD_ICONS: Record<LinkCardItem["icon"], LucideIcon> = {
  presentation: Presentation,
  book: BookOpen,
  calendar: CalendarCheck,
  graduation: GraduationCap,
};

export function LinkCard({ title, description, href, badge, icon }: LinkCardItem) {
  const Icon = CARD_ICONS[icon];
  const external = href.startsWith("http");

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00FF66]/40 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(0,255,102,0.08)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00FF66]/25 bg-[#00FF66]/10 text-[#00FF66] transition duration-300 group-hover:bg-[#00FF66] group-hover:text-black">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <h3 className="text-base font-bold text-white sm:text-lg">{title}</h3>
        {badge ? (
          <span className="ml-auto shrink-0 rounded-full bg-[#00FF66] px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-black">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>

      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:border-[#00FF66]/50 group-hover:text-[#00FF66] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Acessar
        <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </article>
  );
}
