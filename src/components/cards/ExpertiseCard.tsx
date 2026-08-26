import type { LucideIcon } from "lucide-react";

type ExpertiseCardProps = {
  title: string;
  description: string;
  category?: string;
  icon?: LucideIcon;
  index?: number;
};

export function ExpertiseCard({ title, description, category, icon: Icon, index = 0 }: ExpertiseCardProps) {
  return (
    <article className="group relative h-full overflow-hidden border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[#35F06A]/35 hover:bg-white/[0.05]">
      <span aria-hidden="true" className="absolute right-5 top-4 font-mono text-5xl font-semibold text-white/[0.035] transition group-hover:text-[#35F06A]/10">0{index + 1}</span>
      {Icon ? (
        <div className="flex h-11 w-11 items-center justify-center border border-[#35F06A]/30 bg-[#35F06A]/10 text-[#35F06A] transition group-hover:bg-[#35F06A] group-hover:text-[#050708]">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </div>
      ) : null}
      {category ? <p className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C8F8D2]">{category}</p> : null}
      <h3 className={`${category ? "mt-3" : "mt-8"} text-lg font-semibold leading-snug text-[#F4F7F8]`}>{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#A8B2BA]">{description}</p>
      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px scale-x-0 bg-[#35F06A]/70 transition group-hover:scale-x-100" />
    </article>
  );
}
