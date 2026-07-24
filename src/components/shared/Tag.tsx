export function Tag({ children }: { children: string }) {
  return (
    <span className="border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-[#D8DEE2] backdrop-blur-sm transition hover:border-[#35F06A]/35 hover:text-[#F4F7F8]">
      {children}
    </span>
  );
}
