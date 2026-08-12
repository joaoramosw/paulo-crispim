import { SOCIAL_GLYPHS } from "./SocialGlyphs";
import type { linksFooter } from "@/content/links";

type LinksFooterProps = {
  content: typeof linksFooter;
};

export function LinksFooter({ content }: LinksFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center gap-5 border-t border-white/10 pb-12 pt-10 text-center sm:pb-16">
      <div className="flex items-center gap-4">
        {content.socials.map(({ platform, href }) => {
          const Glyph = SOCIAL_GLYPHS[platform];
          return (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00FF66]/40 hover:text-[#00FF66]"
            >
              <Glyph className="h-4 w-4" />
            </a>
          );
        })}
      </div>
      <p className="text-xs text-gray-500">
        © {year} {content.copyrightName}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
