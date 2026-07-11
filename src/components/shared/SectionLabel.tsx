export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 border border-[#35F06A]/25 bg-[#35F06A]/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#C8F8D2] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#35F06A] shadow-[0_0_18px_rgba(53,240,106,0.7)]" />
      {children}
    </p>
  );
}
