import Link from "next/link";
import { homeContent } from "@/content/paulo-crispim";

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
      <h2 className="text-3xl font-semibold tracking-tight text-[#F4F7F8] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[#D8DEE2] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function BrandMark() {
  return (
    <Link href="/" aria-label="Paulo Crispim - inicio" className="group inline-flex flex-col gap-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]">
      <span className="text-base font-semibold uppercase tracking-[0.28em] text-[#F4F7F8] transition group-hover:text-[#C8F8D2] sm:text-lg">
        Paulo
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.46em] text-[#A8B2BA] sm:text-sm">
        Crispim
      </span>
      <span className="mt-1 h-px w-24 bg-[#35F06A]" />
    </Link>
  );
}

export default function Home() {
  const {
    brand,
    navigation,
    hero,
    credibility,
    talks,
    audiences,
    topics,
    trajectory,
    approach,
    purpose,
    contact,
  } = homeContent;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050708] text-[#F4F7F8]">
      <DecorativeField />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-7 sm:px-10 lg:px-14">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-5">
            <BrandMark />
            <span className="hidden max-w-44 text-right text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-[#A8B2BA] sm:block lg:hidden">
              {brand.signature}
            </span>
          </div>

          <nav aria-label="Navegacao principal" className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A8B2BA]">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition hover:bg-white/8 hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contato"
              className="ml-0 rounded-full border border-[#35F06A]/40 bg-[#35F06A]/10 px-4 py-2 text-[#C8F8D2] transition hover:bg-[#35F06A] hover:text-[#050708] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708] lg:ml-2"
            >
              Solicitar palestra
            </Link>
          </nav>
        </header>

        <section className="grid min-h-[calc(100vh-7rem)] items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:py-20">
          <div className="max-w-5xl">
            <SectionLabel>{hero.eyebrow}</SectionLabel>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#F4F7F8] sm:text-6xl md:text-7xl lg:text-8xl">
              {hero.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#D8DEE2] sm:text-xl">
              {hero.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-[#35F06A] bg-[#35F06A] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#050708] transition hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#F4F7F8] transition hover:border-[#35F06A]/50 hover:bg-[#35F06A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708]"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>

            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {hero.highlights.map((highlight) => (
                <div key={highlight} className="border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-medium text-[#D8DEE2] backdrop-blur-sm">
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <aside className="relative min-h-[27rem] overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8" aria-label="Frentes de autoridade de Paulo Crispim">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent opacity-70" />
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#35F06A]/10 blur-3xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#A8B2BA]">
              Autoridade aplicada
            </p>

            <div className="mt-10 space-y-6">
              {hero.panelItems.map((item, index) => (
                <div key={item} className="flex items-center gap-5">
                  <span className="font-mono text-sm text-[#35F06A]">0{index + 1}</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#35F06A]/70 to-transparent" />
                  <span className="min-w-36 text-right text-sm font-medium uppercase tracking-[0.18em] text-[#F4F7F8]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-7 left-6 right-6 sm:left-8 sm:right-8">
              <div className="grid grid-cols-4 gap-2" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span key={index} className="h-1 rounded-full bg-[#A8B2BA]/20" />
                ))}
              </div>
              <p className="mt-6 border-l border-[#35F06A] pl-5 text-sm leading-6 text-[#A8B2BA]">
                Palestras com base em experiencia executiva, gestao de operacoes e desenvolvimento humano.
              </p>
            </div>
          </aside>
        </section>

        <section aria-label="Credenciais" className="grid gap-4 border-y border-white/10 py-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-[#A8B2BA]">
            {credibility.intro}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {credibility.items.map((item) => (
              <span key={item} className="border border-[#35F06A]/18 bg-[#35F06A]/[0.045] px-4 py-3 text-sm font-semibold text-[#C8F8D2]">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="palestras" className="scroll-mt-8 py-20 lg:py-28">
          <SectionHeader eyebrow={talks.eyebrow} title={talks.title} description={talks.description} />
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {talks.items.map((talk, index) => (
              <article key={talk.title} className="group relative min-h-64 overflow-hidden border border-white/10 bg-white/[0.035] p-6 transition hover:border-[#35F06A]/40 hover:bg-[#35F06A]/[0.045]">
                <div aria-hidden="true" className="absolute right-5 top-5 font-mono text-5xl font-semibold text-white/[0.035] transition group-hover:text-[#35F06A]/10">
                  0{index + 1}
                </div>
                <div className="mb-8 flex h-10 w-10 items-center justify-center border border-[#35F06A]/35 bg-[#35F06A]/10 font-mono text-sm text-[#35F06A]">
                  {index + 1}
                </div>
                <h3 className="max-w-xs text-xl font-semibold leading-snug text-[#F4F7F8]">
                  {talk.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-[#A8B2BA]">
                  {talk.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-y border-white/10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader title={audiences.title} description={audiences.description} />
          <div className="grid gap-3 sm:grid-cols-2">
            {audiences.items.map((item) => (
              <div key={item} className="flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-[#D8DEE2]">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#35F06A] shadow-[0_0_20px_rgba(53,240,106,0.65)]" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="temas" className="scroll-mt-8 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <SectionHeader title={topics.title} description={topics.description} />
            <div className="flex flex-wrap gap-3">
              {topics.items.map((item) => (
                <span key={item} className="border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-[#D8DEE2] transition hover:border-[#35F06A]/35 hover:text-[#C8F8D2]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="trajetoria" className="scroll-mt-8 border-y border-white/10 py-20 lg:py-28">
          <SectionHeader eyebrow={trajectory.eyebrow} title={trajectory.title} description={trajectory.description} />
          <div className="mt-12 grid gap-5 lg:grid-cols-5">
            {trajectory.items.map((item, index) => (
              <article key={item.title} className="relative border border-white/10 bg-white/[0.03] p-5">
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

        <section className="py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeader title={approach.title} />
            <div className="space-y-4">
              {approach.items.map((item, index) => (
                <article key={item.title} className="grid gap-4 border border-white/10 bg-white/[0.035] p-5 sm:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-2xl text-[#35F06A]">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-[#F4F7F8]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#A8B2BA]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border border-[#35F06A]/20 bg-[#35F06A]/[0.045] p-8 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">
            {purpose.title}
          </p>
          <blockquote className="mt-8 max-w-5xl text-3xl font-semibold leading-tight tracking-tight text-[#F4F7F8] sm:text-4xl lg:text-5xl">
            &quot;{purpose.quote}&quot;
          </blockquote>
        </section>

        <section id="contato" className="scroll-mt-8 py-20 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <SectionHeader title={contact.title} description={contact.description} />
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center border border-[#35F06A]/40 bg-[#35F06A]/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#C8F8D2] opacity-85"
                >
                  {contact.ctaLabel}
                </button>
                <p className="max-w-md text-sm leading-7 text-[#A8B2BA]">
                  O WhatsApp e o e-mail oficiais serao conectados aqui assim que os canais forem confirmados.
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

        <footer className="flex flex-col gap-5 border-t border-white/10 py-7 text-xs font-medium uppercase tracking-[0.22em] text-[#A8B2BA] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[#F4F7F8]">{brand.name}</span>
            <span className="mx-3 text-[#35F06A]">/</span>
            <span>{brand.signature}</span>
          </div>
          <nav aria-label="Navegacao do rodape" className="flex flex-wrap gap-3">
            {navigation.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050708]">
                {item.label}
              </Link>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
