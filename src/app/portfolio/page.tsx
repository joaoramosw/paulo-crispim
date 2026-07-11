import type { Metadata } from "next";
import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, Mail, MessageCircle, Presentation, Target, TrendingUp, Users } from "lucide-react";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";
import { ExpertiseCard } from "@/components/cards/ExpertiseCard";
import { HighlightCard } from "@/components/cards/HighlightCard";
import { ContactChannelCard } from "@/components/cards/ContactChannelCard";
import { ProfessionalTimeline } from "@/components/portfolio/ProfessionalTimeline";
import { PortfolioPrintAction } from "@/components/portfolio/PortfolioPrintAction";
import { ReadingReferenceGrid } from "@/components/portfolio/ReadingReferenceGrid";
import { RevealSection } from "@/components/shared/RevealSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { TechnicalDivider } from "@/components/shared/TechnicalDivider";
import { bookReferences } from "@/content/books";
import { talkTopics } from "@/content/palestras";
import { portfolioAbout, portfolioAreas, portfolioContactItems, portfolioDifferentials, portfolioIntro, portfolioTrajectory } from "@/content/portfolio";
import { contactConfig, getDefaultTalkMessage, getMailtoUrl, getWhatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Portfólio",
  description: "Portfólio institucional de Paulo Crispim para apresentação empresarial, temas de palestras e contato comercial.",
  openGraph: {
    title: "Portfólio | Paulo Crispim",
    description: "Portfólio institucional de Paulo Crispim para apresentação empresarial, temas de palestras e contato comercial.",
    url: "/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio | Paulo Crispim",
    description: "Portfólio institucional de Paulo Crispim para apresentação empresarial, temas de palestras e contato comercial.",
  },
  alternates: {
    canonical: "/portfolio",
  },
};

const areaIcons = [Users, Users, BriefcaseBusiness, Target, TrendingUp, Award, BookOpen, CheckCircle2];
const differentialIcons = [Target, Presentation, CheckCircle2];

export default function PortfolioPage() {
  return (
    <InternalPageLayout backgroundIntensity="strong" printMode>
      <section className="portfolio-section mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-24">
        <RevealSection>
          <SectionLabel>{portfolioIntro.eyebrow}</SectionLabel>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#F4F7F8] sm:text-6xl md:text-7xl">
            {portfolioIntro.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#D8DEE2] sm:text-xl">{portfolioIntro.description}</p>
          <div className="portfolio-actions mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
            <PortfolioPrintAction />
          </div>
        </RevealSection>

        <RevealSection variant="right" delay={120}>
          <aside className="portfolio-card relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">Apresentação empresarial</p>
            <div className="mt-9 grid gap-3">
              {portfolioContactItems.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border border-white/10 bg-[#050708]/35 px-4 py-3 text-sm font-semibold text-[#D8DEE2]">
                  <span className="font-mono text-xs text-[#35F06A]">0{index + 1}</span>
                  <span className="h-px flex-1 bg-[#35F06A]/35" />
                  <span className="text-right">{item}</span>
                </div>
              ))}
            </div>
            <TechnicalDivider />
            <p className="text-sm leading-7 text-[#A8B2BA]">Material digital preparado para leitura, envio comercial e impressão pelo navegador.</p>
          </aside>
        </RevealSection>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Quem é" title={portfolioAbout.title} description={portfolioAbout.description} />
        </RevealSection>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Trajetória profissional" title="Uma trajetória construída no campo, nas operações e na liderança." description="A leitura abaixo organiza a experiência de forma qualitativa, sem datas, cargos, empresas ou resultados não autorizados." />
        </RevealSection>
        <ProfessionalTimeline items={portfolioTrajectory} />
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Formação e repertório" title="Base técnica, gestão e desenvolvimento profissional em uma mesma mensagem." description="A atuação apresentada combina engenharia elétrica, administração, docência, liderança e desenvolvimento humano conforme conteúdo já disponível no projeto." />
        </RevealSection>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolioAreas.map((area, index) => (
            <RevealSection key={area.title} delay={index * 70}>
              <HighlightCard title={area.title} description={area.description} icon={areaIcons[index] ?? Target} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Temas de palestra" title="Temas para provocar reflexão, clareza e ação." description="Os temas abaixo são os mesmos estruturados na comunicação atual, apresentados como repertório comercial de palestras." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {talkTopics.map((topic, index) => (
            <RevealSection key={topic.title} delay={index * 70}>
              <ExpertiseCard title={topic.title} description={topic.description} index={index} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Diferenciais" title="Uma presença profissional com rigor técnico e leitura humana." description="Diferenciais qualitativos, sem métricas, clientes ou provas não autorizadas." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {portfolioDifferentials.map((item, index) => (
            <RevealSection key={item.title} delay={index * 90}>
              <HighlightCard title={item.title} description={item.description} icon={differentialIcons[index]} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Repertório" title="Referências que formam seu repertório" description="Uma curadoria editorial de leitura associada a disciplina, comunicação, comportamento, liderança e evolução contínua." />
        </RevealSection>
        <div className="mt-12">
          <ReadingReferenceGrid books={bookReferences} />
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <div className="portfolio-card border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-8 sm:p-10 lg:p-14">
            <SectionHeader title="Solicite uma palestra para o seu evento." description="Use os canais oficiais para iniciar uma conversa sobre tema, público e contexto." />
            <div className="portfolio-actions mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
              <MagneticButton href="/contato" variant="secondary">Entrar em contato</MagneticButton>
            </div>
          </div>
        </RevealSection>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-14 lg:pb-32">
        <RevealSection>
          <SectionHeader eyebrow="Contatos" title="Canais oficiais" description="Contatos centralizados para solicitação de palestras e envio deste portfólio." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <ContactChannelCard title="WhatsApp" value="Solicitar uma palestra" href={getWhatsAppUrl(getDefaultTalkMessage())} icon={MessageCircle} external />
          <ContactChannelCard title="E-mail" value={contactConfig.email} href={getMailtoUrl("Solicitação de palestra")} icon={Mail} />
        </div>
      </section>
    </InternalPageLayout>
  );
}
