import { LucideIcon } from "lucide-react";

type TopicCardProps = {
  title: string;
  description: string;
  category?: string;
  icon: LucideIcon;
  index?: number;
};

export function TopicCard({ title, description, category, icon: Icon, index = 0 }: TopicCardProps) {
  return (
    <article className="group relative h-full min-h-72 overflow-hidden border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#35F06A]/45 hover:bg-[#35F06A]/[0.045] focus-within:border-[#35F06A]/45">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#35F06A] to-transparent transition duration-500 group-hover:scale-x-100" />
      <div aria-hidden="true" className="absolute right-5 top-5 font-mono text-5xl font-semibold text-white/[0.035] transition group-hover:text-[#35F06A]/10">0{index + 1}</div>
      <div className="mb-7 flex h-12 w-12 items-center justify-center border border-[#35F06A]/30 bg-[#35F06A]/10 text-[#35F06A] transition group-hover:scale-105 group-hover:bg-[#35F06A] group-hover:text-[#050708]">
        <Icon aria-hidden="true" className="h-5 w-5" />
      </div>
      {category ? <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C8F8D2]">{category}</p> : null}
      <h3 className="max-w-xs text-xl font-semibold leading-snug text-[#F4F7F8]">{title}</h3>
      <p className="mt-5 text-sm leading-7 text-[#A8B2BA]">{description}</p>
    </article>
  );
}
