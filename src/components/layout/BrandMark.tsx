import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" aria-label="Paulo Crispim - início" className="group inline-flex flex-col gap-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
      <span className="text-base font-semibold uppercase tracking-[0.28em] text-[#F4F7F8] transition group-hover:text-[#C8F8D2] sm:text-lg">
        Paulo
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.46em] text-[#A8B2BA] sm:text-sm">
        Crispim
      </span>
      <span className="mt-1 h-px w-24 bg-[#35F06A] transition group-hover:w-32" />
    </Link>
  );
}
