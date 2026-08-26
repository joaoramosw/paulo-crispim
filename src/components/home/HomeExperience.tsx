"use client";

import { ArrowRight, Award, BriefcaseBusiness, Check, CheckCircle2, GraduationCap, Megaphone, Target, TrendingUp, Users } from "lucide-react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { startTransition, useState } from "react";
import { TopicCard } from "@/components/cards/TopicCard";
import { AudienceEcosystem } from "@/components/home/AudienceEcosystem";
import { FaqSection } from "@/components/home/FaqSection";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { LeadAssistant } from "@/components/shared/LeadAssistant";
import { RevealSection } from "@/components/shared/RevealSection";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { homeContent } from "@/content/paulo-crispim";
import { getDefaultTalkMessage, getWhatsAppUrl } from "@/lib/contact";
import type { PartnerLogo } from "@/lib/partners";

function DecorativeField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(168,178,186,0.16),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(6,58,70,0.66),transparent_34%),linear-gradient(135deg,#050708_0%,#11181D_48%,#062C35_100%)]" />
      <div className="absolute -right-36 top-4 h-[36rem] w-[36rem] rounded-full border border-[#35F06A]/10 bg-[#35F06A]/[0.035] blur-3xl" />
      <div className="absolute left-[-12rem] top-[40rem] h-[28rem] w-[28rem] rounded-full bg-[#063A46]/50 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-55"
        viewBox="0 0 1440 1800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-80 520C178 402 324 429 486 296C648 163 785 55 1000 100C1140 129 1241 49 1520 -82"
          stroke="#35F06A"
          strokeOpacity="0.34"
          strokeWidth="2"
        />
        <path
          d="M-40 594C216 466 384 493 536 378C738 225 862 186 1038 214C1209 241 1324 121 1490 62"
          stroke="#A8B2BA"
          strokeOpacity="0.16"
        />
        <path
          d="M230 132H650L808 292H1124"
          stroke="#A8B2BA"
          strokeOpacity="0.2"
        />
        <path
          d="M-120 1320C150 1190 330 1238 520 1084C735 910 884 912 1064 940C1236 966 1336 860 1540 790"
          stroke="#35F06A"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
        <path
          d="M724 1506H1018L1162 1368H1510"
          stroke="#A8B2BA"
          strokeOpacity="0.15"
        />
        <path
          d="M1004 58L1146 202L1030 354"
          stroke="#35F06A"
          strokeOpacity="0.18"
        />
        <g fill="#F4F7F8" opacity="0.18">
          <circle cx="486" cy="296" r="4" />
          <circle cx="1000" cy="100" r="4" />
          <circle cx="1146" cy="202" r="3" />
          <circle cx="724" cy="1506" r="3" />
          <circle cx="1064" cy="940" r="4" />
        </g>
        <circle cx="1000" cy="100" r="8" fill="#35F06A" opacity="0.72" />
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,247,248,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(244,247,248,0.028)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 border border-[#35F06A]/25 bg-[#35F06A]/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#C8F8D2] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#35F06A]" />
      {children}
    </p>
  );
}

const TALK_ICONS = [Megaphone, GraduationCap, Target, TrendingUp, Users, BriefcaseBusiness, CheckCircle2, Award];
const SECTION_TITLE_CLASS = "text-[clamp(1.875rem,4.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F7F8]";
const HERO_IMAGE_SIZES = "(min-width: 1280px) 480px, (min-width: 1024px) 42vw, (min-width: 640px) 352px, calc(100vw - 3rem)";
const { props: desktopHeroImageProps } = getImageProps({
  src: "/paulo-crispim/imagens/hero/paulo-crispim-hero-desktop.jpg",
  alt: "",
  width: 1240,
  height: 1550,
  sizes: HERO_IMAGE_SIZES,
  quality: 82,
});
const { props: mobileHeroImageProps } = getImageProps({
  src: "/paulo-crispim/imagens/hero/paulo-crispim-hero-mobile.jpg",
  alt: "Paulo Crispim sentado, de terno claro e gravata verde, sorrindo para a câmera",
  width: 1000,
  height: 1250,
  sizes: HERO_IMAGE_SIZES,
  quality: 82,
  fetchPriority: "high",
});

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#D8DEE2] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

type HomeExperienceProps = {
  partnerLogos: PartnerLogo[];
};

export function HomeExperience({ partnerLogos }: HomeExperienceProps) {
  const {
    hero,
    credibility,
    partners,
    talks,
    audiences,
    topics,
    trajectory,
    approach,
    purpose,
    contact,
    faq,
  } = homeContent;
  const [activeTalkCategory, setActiveTalkCategory] = useState("Todos");
  const [activeTopicTitle, setActiveTopicTitle] = useState(topics.items[0].title);
  const talkCategories = [
    "Todos",
    ...Array.from(new Set(talks.items.map((talk) => talk.category))),
  ];
  const visibleTalks =
    activeTalkCategory === "Todos"
      ? talks.items
      : talks.items.filter((talk) => talk.category === activeTalkCategory);
  const activeTopic =
    topics.items.find((topic) => topic.title === activeTopicTitle) ?? topics.items[0];

  function selectTalkCategory(category: string) {
    startTransition(() => {
      setActiveTalkCategory(category);
    });
  }

  function selectTopic(topicTitle: string) {
    startTransition(() => {
      setActiveTopicTitle(topicTitle);
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050708] text-[#F4F7F8]">
      <DecorativeField />
      <SiteHeader />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 sm:px-10 sm:pt-28 lg:px-14 lg:pt-32">
        <section className="grid items-start gap-10 pb-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)] lg:gap-14 lg:pb-16">
          <div className="max-w-[46rem]">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1 className="mt-5 max-w-[48rem] text-[clamp(2.15rem,6vw,3.35rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-[#F4F7F8]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.55] text-[#D8DEE2] sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={hero.primaryCta.href}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#35F06A] bg-[#35F06A] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#050708] transition-all duration-200 hover:bg-[#C8F8D2] hover:shadow-[0_0_28px_rgba(53,240,106,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.16em]"
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex min-h-12 w-full items-center justify-center border border-white/15 bg-transparent px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#D8DEE2] transition-all duration-200 hover:border-[#35F06A]/45 hover:bg-[#35F06A]/[0.08] hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.16em]"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <figure className="relative m-0 mx-auto w-full max-w-[22rem] lg:mt-1 lg:max-w-[28rem] xl:max-w-[30rem]" data-od-id="hero-portrait">
            {/* halo de profundidade: a foto não pousa sobre preto chapado */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-[18%] -top-[14%] -bottom-[10%] z-0 bg-[radial-gradient(58%_46%_at_54%_30%,rgba(6,58,70,0.55),transparent_72%),radial-gradient(42%_30%_at_62%_12%,rgba(53,240,106,0.07),transparent_70%)] blur-[28px]"
            />

            <div className="pc-hero-portrait relative z-10 aspect-[4/5] w-full overflow-hidden">
              <picture>
                <source media="(min-width:1024px)" srcSet={desktopHeroImageProps.srcSet} />
                <img
                  {...mobileHeroImageProps}
                  alt={mobileHeroImageProps.alt}
                  className="h-full w-full object-cover"
                />
              </picture>

              {/* véu frio de borda: aproxima o marrom do estúdio do teal da página */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(5,7,8,0.35)_0%,rgba(5,7,8,0.12)_7%,rgba(5,7,8,0)_20%),linear-gradient(270deg,rgba(5,7,8,0.28)_0%,rgba(5,7,8,0.09)_8%,rgba(5,7,8,0)_22%),linear-gradient(0deg,rgba(5,7,8,0.40)_0%,rgba(5,7,8,0.11)_9%,rgba(5,7,8,0)_20%),linear-gradient(180deg,rgba(6,44,53,0.22)_0%,rgba(6,44,53,0)_26%)]"
              />
            </div>

            <figcaption className="relative z-30 -mt-5 flex items-center gap-4 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#C8F8D2]">
              <span>Palco</span>
              <span aria-hidden="true" className="h-px flex-1 bg-[#35F06A]/45" />
              <span>Campo</span>
            </figcaption>
          </figure>
        </section>

        <section
          aria-label="Frentes de autoridade de Paulo Crispim"
          className="pb-12"
          data-od-id="hero-authority-rail"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#A8B2BA]">
            Autoridade aplicada
          </p>
          <div className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
            {hero.panelItems.map((item, index) => (
              <div key={item} className="flex items-baseline gap-4 border-t border-white/10 pt-3.5">
                <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
                <span className="text-sm font-medium uppercase leading-snug tracking-[0.18em] text-[#F4F7F8]">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[44rem] border-l border-[#35F06A] pl-4 text-sm leading-6 text-[#A8B2BA]">
            Experiência executiva aplicada à liderança, cultura organizacional, segurança e resultados sustentáveis.
          </p>
        </section>

        <section aria-label="Credenciais" className="border-y border-white/10 py-8">
          <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.22em] text-[#A8B2BA]">
            {credibility.intro}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {credibility.items.map((item, index) => (
              <RevealSection key={item} variant="up" delay={index * 80} className="w-full sm:w-[calc(33.333%-0.5rem)]">
                <span className="flex min-h-12 items-center justify-center gap-2 border border-[#35F06A]/18 bg-[#35F06A]/[0.045] px-4 py-3 text-center text-sm font-semibold text-[#C8F8D2] transition duration-300 hover:-translate-y-0.5 hover:border-[#35F06A]/40 hover:bg-[#35F06A]/[0.08]">
                  <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#35F06A]" />
                  {item}
                </span>
              </RevealSection>
            ))}
          </div>
        </section>

        <PartnersMarquee title={partners.title} description={partners.description} logos={partnerLogos} />

        <section id="palestras" className="pc-section scroll-mt-8">
          {/*
            Cabeçalho próprio em vez de <SectionHeader>: a partir de lg o badge
            e o título ocupam a coluna esquerda e a descrição a direita, com o
            texto começando na mesma linha do título (row-start explícito, sem
            compensar a altura do badge na mão). Abaixo de lg nada disso vale e
            a ordem do DOM já entrega a pilha badge → título → descrição, igual
            ao componente compartilhado. Os filtros seguem abaixo, intactos.
          */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14">
            <div className="lg:col-start-1 lg:row-start-1">
              <SectionLabel>{talks.eyebrow}</SectionLabel>
            </div>
            <h2 className={`${SECTION_TITLE_CLASS} max-w-3xl lg:col-start-1 lg:row-start-2`}>{talks.title}</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#D8DEE2] sm:text-lg lg:col-start-2 lg:row-start-2 lg:mt-0">
              {talks.description}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3" aria-label="Filtrar palestras por categoria">
            {talkCategories.map((category) => {
              const isActive = category === activeTalkCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => selectTalkCategory(category)}
                  className={`min-h-11 border px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.1em] transition sm:px-4 sm:text-xs sm:tracking-[0.18em] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708] ${
                    isActive
                      ? "border-[#35F06A] bg-[#35F06A] text-[#050708]"
                      : "border-white/10 bg-white/[0.035] text-[#A8B2BA] hover:border-[#35F06A]/40 hover:text-[#C8F8D2]"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {visibleTalks.map((talk, index) => {
              const isOrphanPair = visibleTalks.length % 3 === 2 && index >= visibleTalks.length - 2;
              const isFirstOrphan = isOrphanPair && index === visibleTalks.length - 2;
              const orphanColStart = isFirstOrphan ? "xl:col-start-2" : isOrphanPair ? "xl:col-start-4" : "";

              return (
                <div key={talk.title} className={`h-full xl:col-span-2 ${orphanColStart}`}>
                  <TopicCard
                    title={talk.title}
                    description={talk.description}
                    category={talk.category}
                    icon={TALK_ICONS[index % TALK_ICONS.length]}
                    index={index}
                    actionHref="#contato"
                    actionLabel="Ver aplicação desse tema"
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section className="pc-section relative border-y border-white/10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-center lg:gap-14">
            <RevealSection>
              <div className="max-w-3xl">
                <SectionLabel>Para quem é</SectionLabel>
                <h2 className={SECTION_TITLE_CLASS}>{audiences.title}</h2>
                <p className="mt-5 text-base leading-8 text-[#D8DEE2] sm:text-lg">
                  {audiences.description}
                </p>
                <div aria-hidden="true" className="mt-8 h-px w-full max-w-sm overflow-hidden bg-white/10">
                  <span className="pc-flow block h-px w-2/3 bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#A8B2BA]">
                  Empresas, indústria, setor público e educação. Um único propósito: transformar conhecimento em atitude, pessoas em protagonistas e resultados em legado.
                </p>
              </div>
            </RevealSection>

            <RevealSection variant="right" delay={120} className="mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:mr-0">
              <figure className="pc-portrait-audience relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/paulo-crispim/imagens/MRF_5755.jpg"
                  alt="Paulo Crispim em retrato de estúdio, vestindo camisa rosa e terno cinza"
                  fill
                  sizes="(min-width: 1024px) 352px, (min-width: 640px) 352px, calc(100vw - 3rem)"
                  className="object-cover object-[50%_14%]"
                />
              </figure>
            </RevealSection>
          </div>

          <div className="mt-12">
            <AudienceEcosystem contexts={audiences.contexts} />
          </div>
        </section>

        <section id="temas" className="pc-section scroll-mt-8">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <SectionHeader title={topics.title} description={topics.description} />
            <div>
              <div className="flex flex-wrap gap-3" aria-label="Selecionar tema de palestra">
                {topics.items.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => selectTopic(item.title)}
                    className={`min-h-11 border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708] ${
                      item.title === activeTopic.title
                        ? "border-[#35F06A]/70 bg-[#35F06A]/10 text-[#C8F8D2]"
                        : "border-white/10 bg-white/[0.035] text-[#D8DEE2] hover:border-[#35F06A]/35 hover:text-[#C8F8D2]"
                    }`}
                    aria-pressed={item.title === activeTopic.title}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <article className="mt-6 border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C8F8D2]">
                  Tema selecionado
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-[#F4F7F8]">
                  {activeTopic.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#D8DEE2]">
                  {activeTopic.description}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="trajetoria" className="pc-section scroll-mt-8 border-y border-white/10">
          {/* Pausa editorial: a fotografia abre a seção ao lado da introdução
              (lado oposto ao de "Autoridade aplicada") e os blocos de
              trajetória seguem como protagonistas logo abaixo.

              A composição não é "texto | JPG": o retrato principal dissolve
              pela borda voltada ao texto (máscara), a régua de acento sai da
              coluna de texto e passa POR BAIXO desse fade, e um segundo
              retrato menor invade a lateral do primeiro criando camada. O
              conjunto lê como uma página editorial, não como um card com foto. */}
          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
            <div className="relative z-10">
              <SectionHeader eyebrow={trajectory.eyebrow} title={trajectory.title} description={trajectory.description} />
              <p className="mt-5 max-w-3xl border-l border-[#35F06A] pl-4 text-sm leading-7 text-[#A8B2BA]">
                {trajectory.highlight}
              </p>
              {/* atravessa a calha e some sob a borda dissolvida da fotografia */}
              <div
                aria-hidden="true"
                className="mt-9 hidden h-px w-[calc(100%+10rem)] bg-gradient-to-r from-[#35F06A]/55 via-[#35F06A]/18 to-transparent lg:block"
              />
            </div>

            <RevealSection variant="right" delay={120} className="relative z-10">
              <figure className="relative m-0 mx-auto w-full max-w-[21rem] sm:max-w-[23rem] lg:mr-0 lg:ml-auto lg:-mt-6 lg:max-w-[25rem] xl:max-w-[27rem]">
                {/* halo de profundidade: o retrato não pousa sobre preto chapado */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-[16%] -top-[12%] -bottom-[14%] z-0 bg-[radial-gradient(56%_44%_at_56%_28%,rgba(6,58,70,0.5),transparent_72%),radial-gradient(40%_28%_at_64%_10%,rgba(53,240,106,0.06),transparent_70%)] blur-[30px]"
                />

                <div className="pc-portrait-trajectory relative z-10 aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src="/paulo-crispim/imagens/MRF_6069.jpg"
                    alt="Paulo Crispim em retrato de estúdio, sentado, de terno claro e gravata verde"
                    fill
                    sizes="(min-width:1280px) 432px, (min-width:1024px) 400px, (min-width:640px) 368px, 100vw"
                    className="object-cover object-[50%_26%] sm:object-[50%_28%]"
                  />
                  {/* véu frio de borda: aproxima o marrom do estúdio do teal da página */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,44,53,0.2)_0%,rgba(6,44,53,0)_28%),linear-gradient(0deg,rgba(5,7,8,0.34)_0%,rgba(5,7,8,0)_24%)]"
                  />
                </div>

                {/* segunda leitura do mesmo ensaio, sobreposta: cria camada e
                    tira da seção o ar de "uma foto ao lado do texto" */}
                <div className="absolute -bottom-7 -left-3 z-20 hidden bg-[#050708] p-1.5 sm:block sm:w-[8.5rem] lg:-left-9 lg:-bottom-9 lg:w-[10rem] xl:w-[11rem]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src="/paulo-crispim/imagens/MRF_6132.jpg"
                      alt=""
                      fill
                      sizes="(min-width:1280px) 176px, (min-width:1024px) 160px, 136px"
                      className="object-cover object-[50%_10%]"
                    />
                  </div>
                </div>
              </figure>
            </RevealSection>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {trajectory.items.map((item, index) => (
              <article key={item.title} className="relative h-full border border-white/10 bg-white/[0.03] p-6">
                <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
                <h3 className="mt-8 text-lg font-semibold leading-snug text-[#F4F7F8]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#A8B2BA]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="pc-section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className={`${SECTION_TITLE_CLASS} text-balance`}>{approach.title}</h2>
          </div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3 lg:mt-10">
            {approach.items.map((item, index) => (
              <article
                key={item.title}
                className="border border-white/10 bg-white/[0.035] p-5 text-center transition duration-200 hover:-translate-y-0.5 hover:border-[#35F06A]/30 sm:text-left"
              >
                <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[#F4F7F8]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#A8B2BA]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-8 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">
            {purpose.title}
          </p>
          <blockquote className="mt-8 max-w-5xl text-2xl font-semibold leading-tight tracking-tight text-[#F4F7F8] sm:text-3xl md:text-4xl">
            &quot;{purpose.quote}&quot;
          </blockquote>
        </section>

        <section id="contato" className="pc-section scroll-mt-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeader title={contact.title} description={contact.description} />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppUrl(getDefaultTalkMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center border border-[#35F06A] bg-[#35F06A] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#050708] transition hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] sm:w-auto sm:px-6 sm:text-sm sm:tracking-[0.18em]"
                >
                  {contact.ctaLabel}
                </a>
                <p className="max-w-md text-sm leading-7 text-[#A8B2BA]">
                  O WhatsApp oficial abre com uma mensagem inicial pronta para facilitar o briefing do evento.
                </p>
              </div>
            </div>

            <aside className="border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#A8B2BA]">
                Preparado para briefing
              </p>
              <div className="mt-6 space-y-3">
                {contact.preparationItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-white/10 bg-[#050708]/35 px-4 py-3 text-sm font-semibold text-[#D8DEE2]">
                    <span className="h-px w-6 bg-[#35F06A]" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <FaqSection eyebrow={faq.eyebrow} title={faq.title} description={faq.description} items={faq.items} />

      </div>
      <SiteFooter />
      <LeadAssistant />
    </main>
  );
}
