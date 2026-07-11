import { LucideIcon } from "lucide-react";

export type AudienceContextCardProps = {
  index: string;
  title: string;
  description?: string;
  featured?: boolean;
  icon: LucideIcon;
  className?: string;
};

export function AudienceContextCard({
  index,
  title,
  description,
  featured = false,
  icon: Icon,
  className = "",
}: AudienceContextCardProps) {
  return (
    <article
      tabIndex={0}
      className={`group relative overflow-hidden border bg-white/[0.035] outline-none transition duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708] ${
        featured
          ? "border-[#35F06A]/35 bg-[radial-gradient(circle_at_88%_18%,rgba(53,240,106,0.16),transparent_30%),linear-gradient(135deg,rgba(53,240,106,0.08),rgba(6,58,70,0.2))] p-5 shadow-[0_0_36px_rgba(53,240,106,0.08)] hover:border-[#35F06A]/65"
          : "border-white/10 p-4 hover:border-[#35F06A]/40 hover:bg-[#35F06A]/[0.045]"
      } ${className}`}
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#35F06A] to-transparent transition duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      <span aria-hidden="true" className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#35F06A] shadow-[0_0_18px_rgba(53,240,106,0.75)]" />
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-[#35F06A]">{index}</span>
        <span className={`flex items-center justify-center border border-[#35F06A]/30 bg-[#35F06A]/10 text-[#35F06A] transition group-hover:scale-105 group-hover:bg-[#35F06A] group-hover:text-[#050708] ${featured ? "h-12 w-12" : "h-10 w-10"}`}>
          <Icon aria-hidden="true" className={featured ? "h-6 w-6" : "h-5 w-5"} />
        </span>
      </div>
      <h3 className={`mt-7 font-semibold leading-snug text-[#F4F7F8] ${featured ? "max-w-md text-2xl" : "text-base"}`}>
        {title}
      </h3>
      {description ? (
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#D8DEE2]">{description}</p>
      ) : null}
      <span aria-hidden="true" className="mt-5 block h-px w-12 bg-gradient-to-r from-[#35F06A] to-transparent transition group-hover:w-20" />
    </article>
  );
}
