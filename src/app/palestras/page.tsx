import type { Metadata } from "next";
import { Award, BriefcaseBusiness, BookOpen, CheckCircle2, Presentation, Target, TrendingUp, Users } from "lucide-react";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";
import { TopicCard } from "@/components/cards/TopicCard";
import { HighlightCard } from "@/components/cards/HighlightCard";
import { FormatCard } from "@/components/cards/FormatCard";
import { RevealSection } from "@/components/shared/RevealSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { TechnicalDivider } from "@/components/shared/TechnicalDivider";
import { getDefaultTalkMessage, getWhatsAppUrl } from "@/lib/contact";
import { talkBenefits, talkFormats, talkTopics, talkValuePoints } from "@/content/palestras";

export const metadata: Metadata = {
  title: "Palestras",
  description: "Palestras corporativas de Paulo Crispim para empresas, eventos, convenções, encontros de liderança e semanas acadêmicas ou profissionais.",
  keywords: [
    "palestras corporativas",
    "palestrante liderança",
    "treinamento empresas",
    "conferencista",
    "palestras motivação",
  ],
  openGraph: {
    title: "Palestras Corporativas | Paulo Crispim",
    description: "Palestras corporativas de Paulo Crispim para empresas, eventos, convenções, encontros de liderança e semanas acadêmicas ou profissionais.",
    url: "/palestras",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palestras Corporativas | Paulo Crispim",
    description: "Palestras corporativas de Paulo Crispim para empresas, eventos, convenções, encontros de liderança e semanas acadêmicas ou profissionais.",
  },
  alternates: {
    canonical: "/palestras",
  },
};

const topicIcons = [Users, TrendingUp, Target, CheckCircle2, BriefcaseBusiness, Award];
const benefitIcons = [Target, CheckCircle2, TrendingUp, Users];
const formatIcons = [Presentation, BriefcaseBusiness, Users, BookOpen];

export default function PalestrasPage() {
  return (
    <InternalPageLayout backgroundIntensity="strong">
      <section className="relative mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.85fr] lg:px-14 lg:py-24">
        <RevealSection>
          <SectionLabel>Palestras corporativas</SectionLabel>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#F4F7F8] sm:text-6xl md:text-7xl lg:text-8xl">
            Clareza, liderança e ação para equipes que precisam evoluir com direção.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#D8DEE2] sm:text-xl">
            Uma palestra construída para provocar reflexão, fortalecer responsabilidade e conectar estratégia, pessoas e execução em ambientes corporativos e profissionais.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
            <MagneticButton href="#temas" variant="secondary">Ver temas de palestra</MagneticButton>
          </div>
        </RevealSection>

        <RevealSection variant="right" delay={120}>
          <aside className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">Pontos de autoridade</p>
            <div className="mt-8 space-y-5">
              {talkValuePoints.map((point, index) => (
                <div key={point} className="flex items-center gap-5">
                  <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#35F06A]/70 to-transparent" />
                  <span className="max-w-44 text-right text-sm font-medium uppercase tracking-[0.16em] text-[#F4F7F8]">{point}</span>
                </div>
              ))}
            </div>
            <TechnicalDivider />
            <p className="text-sm leading-7 text-[#A8B2BA]">Conteúdo com base técnica, leitura humana e foco em clareza, processo e evolução profissional.</p>
          </aside>
        </RevealSection>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Proposta de valor" title="Uma mensagem para empresas que precisam transformar pressão em evolução." description="A abordagem aproxima liderança, disciplina, comunicação e execução sem recorrer a promessas grandiosas ou fórmulas genéricas." />
        </RevealSection>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {talkBenefits.map((benefit, index) => (
            <RevealSection key={benefit.title} delay={index * 80}>
              <HighlightCard title={benefit.title} description={benefit.description} icon={benefitIcons[index]} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section id="temas" className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Temas de palestra" title="Conteúdos que unem engenharia, gestão e comportamento humano." description="Os temas partem do repertório já apresentado na marca e podem ser adaptados ao contexto do evento e ao perfil do público." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {talkTopics.map((topic, index) => (
            <RevealSection key={topic.title} delay={index * 70}>
              <TopicCard title={topic.title} description={topic.description} category={topic.category} icon={topicIcons[index] ?? Presentation} index={index} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Formatos autorizados" title="Presença adequada para diferentes contextos institucionais." description="A comunicação pode ser direcionada ao momento do evento, mantendo uma base profissional, clara e orientada à ação." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {talkFormats.map((format, index) => (
            <RevealSection key={format.title} delay={index * 80}>
              <FormatCard title={format.title} description={format.description} icon={formatIcons[index]} />
            </RevealSection>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-14 lg:pb-32">
        <RevealSection>
          <div className="relative overflow-hidden border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-8 sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
            <SectionHeader title="Leve uma palestra com clareza técnica, energia humana e foco em evolução." description="Solicite uma conversa para alinhar tema, público e contexto do evento." />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
              <MagneticButton href="/contato" variant="secondary">Entrar em contato</MagneticButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </InternalPageLayout>
  );
}
