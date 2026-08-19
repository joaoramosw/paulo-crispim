import Image from "next/image";
import Link from "next/link";

type BrandMarkProps = {
  imageClassName?: string;
  priority?: boolean;
};

export function BrandMark({
  imageClassName = "h-9 w-auto transition group-hover:opacity-90 sm:h-11",
  priority = true,
}: BrandMarkProps = {}) {
  return (
    <Link href="/" aria-label="Paulo Crispim - início" className="group inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
      <Image
        src="/paulo-crispim/logos/logo-paulo-crispim-header.png"
        alt="Paulo Crispim"
        width={1651}
        height={467}
        priority={priority}
        className={imageClassName}
      />
    </Link>
  );
}
