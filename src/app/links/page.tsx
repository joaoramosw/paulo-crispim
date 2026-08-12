import type { Metadata } from "next";
import { LinksHeader } from "@/components/links/LinksHeader";
import { LinkCard } from "@/components/links/LinkCard";
import { FeaturedLinkCard } from "@/components/links/FeaturedLinkCard";
import { AboutSection } from "@/components/links/AboutSection";
import { LinksFooter } from "@/components/links/LinksFooter";
import { aboutSection, featuredLink, linkCards, linksFooter, linksProfile } from "@/content/links";

export const metadata: Metadata = {
  title: "Links Úteis",
  description: "Todos os links úteis de Paulo Crispim em um só lugar: palestras, conteúdo e canais oficiais.",
  alternates: {
    canonical: "/links",
  },
};

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a110e] to-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-14 px-4 md:max-w-5xl md:px-8">
        <LinksHeader profile={linksProfile} />

        <section aria-label="Links úteis" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {linkCards.map((card) => (
            <LinkCard key={card.title} {...card} />
          ))}
          <FeaturedLinkCard content={featuredLink} />
        </section>

        <AboutSection content={aboutSection} />

        <LinksFooter content={linksFooter} />
      </div>
    </main>
  );
}
