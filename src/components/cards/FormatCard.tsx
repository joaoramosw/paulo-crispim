import { LucideIcon } from "lucide-react";

type FormatCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function FormatCard({ title, description, icon: Icon }: FormatCardProps) {
  return (
    <article className="group relative overflow-hidden border border-[#35F06A]/18 bg-[#35F06A]/[0.045] p-6 transition hover:border-[#35F06A]/45 hover:bg-[#35F06A]/[0.075]">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#35F06A]/10 blur-2xl transition group-hover:bg-[#35F06A]/20" />
      <Icon aria-hidden="true" className="h-7 w-7 text-[#35F06A]" />
      <h3 className="mt-8 text-xl font-semibold text-[#F4F7F8]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#D8DEE2]">{description}</p>
    </article>
  );
}
