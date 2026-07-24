type ExpertiseCardProps = {
  title: string;
  description: string;
  index?: number;
};

export function ExpertiseCard({ title, description, index = 0 }: ExpertiseCardProps) {
  return (
    <article className="group relative h-full border border-white/10 bg-white/[0.03] p-5 transition hover:border-[#35F06A]/35 hover:bg-white/[0.05]">
      <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
      <h3 className="mt-8 text-lg font-semibold leading-snug text-[#F4F7F8]">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#A8B2BA]">{description}</p>
      <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-px scale-x-0 bg-[#35F06A]/70 transition group-hover:scale-x-100" />
    </article>
  );
}
