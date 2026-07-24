import Image from "next/image";
import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" aria-label="Paulo Crispim - início" className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
      <Image
        src="/paulo-crispim/logos/logo-paulo-crispim-full.png"
        alt="Paulo Crispim"
        width={736}
        height={455}
        priority
        className="h-10 w-auto transition group-hover:opacity-90 sm:h-12"
      />
    </Link>
  );
}
