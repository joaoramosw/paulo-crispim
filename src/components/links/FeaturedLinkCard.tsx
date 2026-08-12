import Image from "next/image";
import { Play } from "lucide-react";
import type { featuredLink } from "@/content/links";

type FeaturedLinkCardProps = {
  content: typeof featuredLink;
};

export function FeaturedLinkCard({ content }: FeaturedLinkCardProps) {
  return (
    <article className="group col-span-1 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00FF66]/40 hover:bg-white/[0.07] hover:shadow-[0_0_32px_rgba(0,255,102,0.08)] md:col-span-2 md:flex-row md:items-center">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-black/60 md:aspect-square md:w-64">
        {content.thumbnailSrc ? (
          <Image src={content.thumbnailSrc} alt={content.title} fill sizes="(max-width: 768px) 100vw, 256px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,102,0.16),transparent_55%),linear-gradient(145deg,#111,#000)]" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/50 text-[#00FF66] backdrop-blur-sm transition duration-300 group-hover:scale-105">
            <Play aria-hidden="true" className="ml-0.5 h-6 w-6" fill="currentColor" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:py-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00FF66]">{content.eyebrow}</p>
        <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{content.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-gray-400">{content.description}</p>

        <a
          href={content.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#00FF66] bg-[#00FF66] px-6 py-3 text-sm font-bold text-black transition-all duration-300 hover:bg-[#00FF66]/85 hover:shadow-[0_0_24px_rgba(0,255,102,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF66] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {content.ctaLabel}
          <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </article>
  );
}
