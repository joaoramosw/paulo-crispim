import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

export function MagneticButton({ children, href, variant = "primary", external = false, className = "" }: MagneticButtonProps) {
  const base = "group relative inline-flex min-h-12 items-center justify-center overflow-hidden px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]";
  const styles = variant === "primary"
    ? "border border-[#35F06A] bg-[#35F06A] text-[#050708] hover:bg-[#C8F8D2]"
    : "border border-white/15 bg-white/[0.035] text-[#F4F7F8] hover:border-[#35F06A]/50 hover:bg-[#35F06A]/10";
  const content = (
    <>
      <span className="absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg] bg-white/25 opacity-0 transition duration-500 group-hover:left-[120%] group-hover:opacity-100" />
      <span className="relative inline-flex items-center gap-3">
        {children}
        <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {content}
    </Link>
  );
}
