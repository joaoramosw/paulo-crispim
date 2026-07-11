import { LucideIcon } from "lucide-react";

type HighlightCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function HighlightCard({ title, description, icon: Icon }: HighlightCardProps) {
  return (
    <article className="group border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-[#35F06A]/35 hover:bg-white/[0.055]">
      <div className="mb-6 inline-flex h-10 w-10 items-center justify-center border border-white/10 bg-[#050708]/50 text-[#35F06A] transition group-hover:border-[#35F06A]/40 group-hover:shadow-[0_0_24px_rgba(53,240,106,0.18)]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-[#F4F7F8]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#A8B2BA]">{description}</p>
    </article>
  );
}
