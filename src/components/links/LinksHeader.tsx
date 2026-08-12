import Image from "next/image";
import { User } from "lucide-react";
import { SOCIAL_GLYPHS } from "./SocialGlyphs";
import type { linksProfile } from "@/content/links";

type LinksHeaderProps = {
  profile: typeof linksProfile;
};

export function LinksHeader({ profile }: LinksHeaderProps) {
  return (
    <header className="flex flex-col items-center pt-16 text-center sm:pt-20">
      <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/15 bg-white/5 shadow-[0_0_40px_rgba(0,255,102,0.12)] sm:h-28 sm:w-28">
        {profile.avatarSrc ? (
          <Image src={profile.avatarSrc} alt={profile.name} fill sizes="112px" className="object-cover" />
        ) : (
          <User aria-hidden="true" className="h-10 w-10 text-white/30" />
        )}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-[#00FF66]/20" />
      </div>

      <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 text-white/60">
          {profile.socials.map(({ platform, href }) => {
            const Glyph = SOCIAL_GLYPHS[platform];
            return (
              <a
                key={platform}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="transition duration-300 hover:text-[#00FF66]"
              >
                <Glyph className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />
        <span className="text-xs font-medium text-white/70">{profile.handle}</span>
      </div>

      <h1 className="mt-7 max-w-xs text-3xl font-semibold leading-tight tracking-tight text-white sm:max-w-md sm:text-4xl">
        {profile.titlePrefix}{" "}
        <span className="italic text-[#00FF66]">{profile.titleHighlight}</span>
      </h1>
    </header>
  );
}
