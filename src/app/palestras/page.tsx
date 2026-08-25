import type { Metadata } from "next";
import Image from "next/image";
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
      {/*
        Hero de palestras: a fotografia já foi composta com a área negativa à
        esquerda reservada ao conteúdo. A partir de xl (1280px) ela vira o
        próprio plano de fundo do Hero — full-bleed, passando por baixo do
        header transparente — e o texto ocupa essa área escura. Abaixo de xl a
        composição é empilhada (conteúdo → fotografia) com recorte próprio,
        porque a largura reduzida não comporta texto sobre a imagem.
      */}
      <section className="relative isolate -mt-28 w-full overflow-hidden xl:mx-auto xl:max-w-[1920px]">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-12 pt-36 sm:px-10 lg:px-14 xl:min-h-[clamp(720px,calc(42vw+140px),880px)] xl:pb-40 xl:pt-28">
          <RevealSection className="xl:max-w-[560px]">
            <SectionLabel>Palestras corporativas</SectionLabel>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-tight text-[#F4F7F8] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[2.6rem] xl:leading-[1.06] 2xl:text-[3.05rem]">
              Clareza, liderança e ação para equipes que precisam evoluir com direção.
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#D8DEE2] sm:text-xl xl:mt-6 xl:text-lg">
              Uma palestra construída para provocar reflexão, fortalecer responsabilidade e conectar estratégia, pessoas e execução em ambientes corporativos e profissionais.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-8">
              <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
              <MagneticButton href="#temas" variant="secondary">Ver temas de palestra</MagneticButton>
            </div>
          </RevealSection>
        </div>

        <div className="pc-hero-dissolve relative mt-4 aspect-[4/3] w-full overflow-hidden md:aspect-[3/2] lg:aspect-[16/10] xl:absolute xl:inset-0 xl:z-0 xl:mt-0 xl:aspect-auto">
          <Image
            src="/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png"
            alt="Paulo Crispim durante palestra corporativa diante de uma plateia"
            fill
            sizes="(min-width:1920px) 1920px, 100vw"
            fetchPriority="high"
            loading="eager"
            className="object-cover object-[82%_50%] xl:object-[50%_34%]"
          />
          {/* Véu mínimo: rampa à esquerda para o H1, faixa curta no topo para o
              header transparente e uma rampa longa em tom petróleo na base, que
              leva a fotografia até o fundo da página. Some antes do telão e do
              rosto de Paulo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(5,7,8,0.66)_0%,rgba(5,7,8,0.42)_26%,rgba(5,7,8,0.14)_44%,rgba(5,7,8,0)_57%),linear-gradient(180deg,rgba(5,7,8,0.42)_0%,rgba(5,7,8,0)_11%),linear-gradient(0deg,rgba(5,9,11,0.72)_0%,rgba(6,15,19,0.46)_7%,rgba(6,20,25,0.24)_15%,rgba(6,26,32,0.08)_24%,rgba(6,26,32,0)_34%)] xl:block"
          />
          {/* No layout empilhado a fotografia não tem véu lateral, só a mesma
              rampa de base — mais curta, porque aqui a plateia aparece inteira. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(5,9,11,0.7)_0%,rgba(6,15,19,0.42)_8%,rgba(6,20,25,0.18)_17%,rgba(6,26,32,0.06)_26%,rgba(6,26,32,0)_34%)] xl:hidden"
          />
        </div>
      </section>

      {/* A seção seguinte encosta na cauda da dissolução do Hero: o espaçamento
          superior é menor do que o das demais e uma ponte cromática em tom
          petróleo atravessa a emenda, para que os dois blocos leiam como um
          campo contínuo em vez de duas placas. */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-10 sm:px-10 lg:px-14 lg:pt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 -z-10 h-72 w-screen max-w-[1920px] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(6,32,39,0)_0%,rgba(6,32,39,0.2)_44%,rgba(6,32,39,0)_100%)]"
        />
        <RevealSection delay={120}>
          <aside className="relative overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">Pontos de autoridade</p>
            <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-x-12">
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
        {/*
          Abertura editorial: a partir de lg o cabeçalho divide a linha com um
          retrato de autoridade — a fotografia entra pelo lado direito, oposto
          ao recorte de palco que fecha a página. Abaixo de lg a composição
          empilha na ordem cabeçalho → fotografia → cards, e o retrato recebe
          largura máxima própria para não virar um bloco alto demais no celular.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <RevealSection>
            <SectionHeader eyebrow="Proposta de valor" title="Uma mensagem para empresas que precisam transformar pressão em evolução." description="A abordagem aproxima liderança, disciplina, comunicação e execução sem recorrer a promessas grandiosas ou fórmulas genéricas." />
          </RevealSection>

          <RevealSection variant="right" delay={120}>
            <figure className="relative m-0 mx-auto w-full max-w-80 sm:max-w-sm lg:max-w-none">
              <div aria-hidden="true" className="mb-5 ml-auto h-px w-full max-w-56 bg-gradient-to-l from-[#35F06A]/70 to-transparent" />
              <div className="pc-portrait-authority relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/paulo-crispim/imagens/MRF_6114.jpg"
                  alt="Paulo Crispim em retrato profissional"
                  fill
                  sizes="(min-width:1280px) 460px, (min-width:1024px) 34vw, (min-width:640px) 24rem, 20rem"
                  className="object-cover object-[50%_15%]"
                />
              </div>
            </figure>
          </RevealSection>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
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
        {/*
          Espelho da composição de "Proposta de valor": aqui a fotografia ocupa
          a coluna da esquerda. A ordem do DOM continua cabeçalho → fotografia
          (é o cabeçalho que abre a seção para leitor de tela e para o layout
          empilhado); a inversão visual acontece só a partir de lg, via order.
        */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:items-center lg:gap-16">
          <RevealSection className="lg:order-2">
            <SectionHeader eyebrow="Formatos autorizados" title="Presença adequada para diferentes contextos institucionais." description="A comunicação pode ser direcionada ao momento do evento, mantendo uma base profissional, clara e orientada à ação." />
          </RevealSection>

          <RevealSection variant="left" delay={120} className="lg:order-1">
            <figure className="relative m-0 mx-auto w-full max-w-80 sm:max-w-sm lg:max-w-none">
              <div className="pc-portrait-formats relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/paulo-crispim/imagens/MRF_6132.jpg"
                  alt="Paulo Crispim em ensaio profissional"
                  fill
                  sizes="(min-width:1280px) 460px, (min-width:1024px) 34vw, (min-width:640px) 24rem, 20rem"
                  className="object-cover object-[50%_10%]"
                />
              </div>
            </figure>
          </RevealSection>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4 lg:mt-16">
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
            {/*
              Recorte de palco fechando a página no momento da conversão: mesma
              fotografia do Hero, enquadramento diferente (Paulo, microfone,
              telão e as primeiras fileiras da plateia). Sangra pela borda
              direita do painel e some por máscara antes de chegar ao texto, de
              modo que H2 e botões nunca ficam sobre a imagem. Só a partir de
              lg — abaixo disso não há largura sobrando ao lado do conteúdo.
            */}
            <div
              aria-hidden="true"
              className="pc-cta-stage pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
            >
              <Image
                src="/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png"
                alt=""
                fill
                sizes="(min-width:1280px) 540px, 46vw"
                className="object-cover object-[86%_46%]"
              />
            </div>
            <div className="relative lg:max-w-[56%]">
              <SectionHeader title="Leve uma palestra com clareza técnica, energia humana e foco em evolução." description="Solicite uma conversa para alinhar tema, público e contexto do evento." />
            </div>
            <div className="relative mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
              <MagneticButton href="/contato" variant="secondary">Entrar em contato</MagneticButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </InternalPageLayout>
  );
}
