import type { Metadata } from "next";
import Image from "next/image";
import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, GraduationCap, Mail, MessageCircle, Presentation, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";
import { ExpertiseCard } from "@/components/cards/ExpertiseCard";
import { HighlightCard } from "@/components/cards/HighlightCard";
import { ContactChannelCard } from "@/components/cards/ContactChannelCard";
import { BioSection } from "@/components/portfolio/BioSection";
import { TrajectoryTimeline } from "@/components/portfolio/TrajectoryTimeline";
import { PortfolioPrintAction } from "@/components/portfolio/PortfolioPrintAction";
import { ReadingReferenceGrid } from "@/components/portfolio/ReadingReferenceGrid";
import { RevealSection } from "@/components/shared/RevealSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { TechnicalDivider } from "@/components/shared/TechnicalDivider";
import { Tag } from "@/components/shared/Tag";
import { bookReferences } from "@/content/books";
import { talkTopics } from "@/content/palestras";
import {
  portfolioAbout,
  portfolioAreas,
  portfolioAreasHeading,
  portfolioContactItems,
  portfolioDifferentials,
  portfolioIdentityThemes,
  portfolioIntro,
  portfolioTrajectoryHeading,
  portfolioTrajectoryStages,
} from "@/content/portfolio";
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

// posição de cada ícone corresponde ao índice do mesmo registro em portfolioAreas — manter os dois arrays na mesma ordem
const areaIcons = [Users, Users, BriefcaseBusiness, Target, TrendingUp, Award, BookOpen, CheckCircle2, ShieldCheck, GraduationCap];
const differentialIcons = [Target, Presentation, CheckCircle2];

export default function PortfolioPage() {
  return (
    <InternalPageLayout backgroundIntensity="strong" printMode>
      <section className="portfolio-section mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_0.8fr] lg:px-14 lg:py-14">
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

        {/*
          A coluna direita da abertura passa a ser uma pilha: retrato de
          autoridade em cima, card "Apresentação empresarial" logo abaixo. O
          card continua idêntico — a fotografia entra antes dele, e não no
          lugar de nada. Abaixo de lg a ordem do DOM já entrega
          título → CTAs → fotografia → card.
        */}
        <RevealSection variant="right" delay={120}>
          <figure className="portfolio-photo relative m-0 mx-auto mb-7 w-full max-w-[22rem] lg:mb-8 lg:max-w-none">
            {/* halo de profundidade: o estúdio escuro não encosta em preto chapado */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[14%] -top-[12%] bottom-[4%] -z-10 bg-[radial-gradient(56%_48%_at_52%_28%,rgba(6,58,70,0.5),transparent_72%),radial-gradient(40%_28%_at_58%_10%,rgba(53,240,106,0.06),transparent_70%)] blur-[26px]"
            />
            <div className="pc-portfolio-cover relative aspect-[4/5] w-full overflow-hidden lg:aspect-[5/4]">
              <Image
                src="/paulo-crispim/imagens/MRF_6114.jpg"
                alt="Paulo Crispim em retrato profissional, de terno claro e gravata"
                fill
                sizes="(min-width:1536px) 34vw, (min-width:1024px) 36vw, (min-width:640px) 22rem, 100vw"
                className="object-cover object-[50%_18%] lg:object-[50%_7%]"
              />
            </div>
            <figcaption className="relative mt-5 flex items-center gap-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#C8F8D2]">
              <span>Presença</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[#35F06A]/45" />
              <span>Autoridade</span>
            </figcaption>
          </figure>

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

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <RevealSection>
          <SectionHeader eyebrow="Quem é" title={portfolioAbout.title} description={portfolioAbout.description} />
        </RevealSection>
        <BioSection about={portfolioAbout} />
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <RevealSection>
          <SectionHeader
            eyebrow={portfolioTrajectoryHeading.eyebrow}
            title={portfolioTrajectoryHeading.title}
            description={portfolioTrajectoryHeading.description}
          />
        </RevealSection>
        <TrajectoryTimeline stages={portfolioTrajectoryStages} />
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <RevealSection>
          <SectionHeader
            eyebrow={portfolioAreasHeading.eyebrow}
            title={portfolioAreasHeading.title}
            description={portfolioAreasHeading.description}
          />
        </RevealSection>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {portfolioAreas.map((area, index) => (
            <RevealSection key={area.title} delay={index * 70}>
              <HighlightCard title={area.title} description={area.description} icon={areaIcons[index] ?? Target} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <RevealSection>
          <SectionHeader
            eyebrow="Identidade profissional"
            title="Temas que fazem parte da identidade profissional de Paulo Crispim."
            description="Um repertório de competências e temas que atravessam toda a sua atuação, da engenharia à liderança."
          />
        </RevealSection>
        {/*
          A nuvem de temas é leve demais para ocupar a largura inteira. A
          fotografia entra na direita como pausa — perfil, ajuste do punho:
          repertório e cuidado profissional, sem competir com as tags.
        */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.4fr)] lg:items-start lg:gap-14">
          <div className="flex flex-wrap gap-3">
            {portfolioIdentityThemes.map((theme, index) => (
              <RevealSection key={theme} delay={index * 30} variant="scale">
                <Tag>{theme}</Tag>
              </RevealSection>
            ))}
          </div>

          <RevealSection variant="right" delay={120} className="portfolio-photo">
            <figure className="relative m-0 mx-auto w-full max-w-[18rem] lg:max-w-none">
              <div className="pc-portfolio-aside relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/paulo-crispim/imagens/MRF_6103.jpg"
                  alt="Paulo Crispim ajustando o punho da camisa, de terno claro e gravata"
                  fill
                  sizes="(min-width:1024px) 24vw, (min-width:640px) 18rem, 100vw"
                  className="object-cover object-[50%_12%]"
                />
              </div>
            </figure>
          </RevealSection>
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
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

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
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

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        <RevealSection>
          <SectionHeader eyebrow="Repertório" title="Referências que formam seu repertório" description="Uma curadoria editorial de leitura associada a disciplina, comunicação, comportamento, liderança e evolução contínua." />
        </RevealSection>
        <div className="mt-8">
          <ReadingReferenceGrid books={bookReferences} />
        </div>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        {/*
          O pedido comercial ganha o contexto que ele descreve: palco, telão,
          microfone e plateia. A partir de lg a fotografia é a metade direita do
          próprio bloco — a área escura da imagem recebe o título e os botões,
          que ficam contidos em menos da metade da largura para nunca cruzarem
          Paulo. Abaixo de lg ela vira uma faixa cheia depois dos CTAs, com
          recorte próprio (mais fechado em Paulo e na plateia).
        */}
        <RevealSection>
          <div className="portfolio-card relative overflow-hidden border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-8 sm:p-10 lg:min-h-[24rem] lg:p-14">
            <div
              aria-hidden="true"
              className="pc-portfolio-stage pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block"
            >
              <Image
                src="/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png"
                alt=""
                fill
                sizes="(min-width:1280px) 640px, 54vw"
                className="object-cover object-[76%_42%]"
              />
            </div>

            <div className="relative z-10 lg:max-w-[44%]">
              <SectionHeader title="Solicite uma palestra para o seu evento." description="Use os canais oficiais para iniciar uma conversa sobre tema, público e contexto." />
              <div className="portfolio-actions mt-9 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
                <MagneticButton href="/contato" variant="secondary">Entrar em contato</MagneticButton>
              </div>
            </div>

            <div className="portfolio-photo pc-portfolio-stage-band relative -mx-8 mt-10 aspect-[16/10] sm:-mx-10 sm:aspect-[16/9] lg:hidden">
              <Image
                src="/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png"
                alt="Paulo Crispim durante palestra corporativa diante de uma plateia"
                fill
                sizes="100vw"
                className="object-cover object-[74%_45%]"
              />
            </div>
          </div>
        </RevealSection>
      </section>

      <section className="portfolio-section mx-auto w-full max-w-7xl px-6 pb-20 pt-10 sm:px-10 lg:px-14 lg:pb-24">
        <RevealSection>
          <SectionHeader eyebrow="Contatos" title="Canais oficiais" description="Contatos centralizados para solicitação de palestras e envio deste portfólio." />
        </RevealSection>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <ContactChannelCard title="WhatsApp" value="Solicitar uma palestra" href={getWhatsAppUrl(getDefaultTalkMessage())} icon={MessageCircle} external />
          <ContactChannelCard title="E-mail" value={contactConfig.email} href={getMailtoUrl("Solicitação de palestra")} icon={Mail} />
        </div>
      </section>
    </InternalPageLayout>
  );
}
