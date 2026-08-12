type GlyphProps = {
  className?: string;
};

export function InstagramGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TikTokGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14.5 3v10.6a2.7 2.7 0 1 1-2.2-2.66V8.4a5.3 5.3 0 1 0 4.7 5.27V9.9a6.9 6.9 0 0 0 4 1.28V8.6a4.3 4.3 0 0 1-2.9-1.14A4.4 4.4 0 0 1 16.9 4.4V3h-2.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YoutubeGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.3 9.3v5.4l4.7-2.7-4.7-2.7Z" fill="currentColor" />
    </svg>
  );
}

export const SOCIAL_GLYPHS = {
  instagram: InstagramGlyph,
  tiktok: TikTokGlyph,
  youtube: YoutubeGlyph,
};
