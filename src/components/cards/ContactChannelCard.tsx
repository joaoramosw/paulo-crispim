import { LucideIcon, ArrowUpRight } from "lucide-react";

type ContactChannelCardProps = {
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export function ContactChannelCard({ title, value, href, icon: Icon, external = false }: ContactChannelCardProps) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex items-start justify-between gap-5 border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-[#35F06A]/40 hover:bg-[#35F06A]/[0.045] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]">
      <span>
        <span className="mb-6 flex h-11 w-11 items-center justify-center border border-[#35F06A]/30 bg-[#35F06A]/10 text-[#35F06A] transition group-hover:bg-[#35F06A] group-hover:text-[#050708]">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="block text-xs font-bold uppercase tracking-[0.22em] text-[#A8B2BA]">{title}</span>
        <span className="mt-3 block text-lg font-semibold text-[#F4F7F8]">{value}</span>
      </span>
      <ArrowUpRight aria-hidden="true" className="h-5 w-5 text-[#35F06A] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}
