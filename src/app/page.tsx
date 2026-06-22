const focusAreas = ["Palestras", "Mentorias", "Consultorias"];

export default function Home() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#050708] text-[#F4F7F8]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(168,178,186,0.16),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(6,58,70,0.58),transparent_34%),linear-gradient(135deg,#050708_0%,#151B20_52%,#062C35_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-28 top-10 h-[34rem] w-[34rem] rounded-full border border-[#35F06A]/10 bg-[#35F06A]/[0.03] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-full opacity-50"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 960"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-80 720C178 602 324 629 486 496C648 363 785 255 1000 300C1140 329 1241 249 1520 118"
            stroke="#35F06A"
            strokeOpacity="0.42"
            strokeWidth="2"
          />
          <path
            d="M-40 764C216 636 384 663 536 548C738 395 862 356 1038 384C1209 411 1324 291 1490 232"
            stroke="#A8B2BA"
            strokeOpacity="0.18"
            strokeWidth="1"
          />
          <path
            d="M272 106H689L806 224H1118"
            stroke="#A8B2BA"
            strokeOpacity="0.2"
          />
          <path
            d="M760 766H1038L1158 650H1500"
            stroke="#A8B2BA"
            strokeOpacity="0.18"
          />
          <path
            d="M1014 148L1138 276L1044 404"
            stroke="#35F06A"
            strokeOpacity="0.2"
          />
          <g fill="#F4F7F8" opacity="0.18">
            <circle cx="486" cy="496" r="4" />
            <circle cx="1000" cy="300" r="4" />
            <circle cx="1138" cy="276" r="3" />
            <circle cx="760" cy="766" r="3" />
          </g>
          <circle cx="1000" cy="300" r="8" fill="#35F06A" opacity="0.8" />
        </svg>
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-7 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between">
          <div
            aria-label="Paulo Crispim"
            className="inline-flex flex-col gap-1 text-left"
          >
            <span className="text-lg font-semibold uppercase tracking-[0.28em] text-[#F4F7F8] sm:text-xl">
              Paulo
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.46em] text-[#A8B2BA] sm:text-base">
              Crispim
            </span>
            <span className="mt-1 h-px w-24 bg-[#35F06A]" />
          </div>

          <div className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-[#A8B2BA] sm:flex">
            <span className="h-2 w-2 rounded-full bg-[#35F06A] shadow-[0_0_24px_rgba(53,240,106,0.8)]" />
            2026
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.72fr)] lg:py-10">
          <div className="max-w-4xl">
            <p className="mb-8 inline-flex items-center gap-3 border border-[#35F06A]/25 bg-[#35F06A]/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#C8F8D2] sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#35F06A]" />
              Nova experiência em construção
            </p>

            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-normal text-[#F4F7F8] sm:text-6xl md:text-7xl lg:text-8xl">
              Uma nova forma de transformar conhecimento em direção.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#D8DEE2] sm:text-xl">
              Estamos preparando uma experiência pensada para profissionais e
              empresas que buscam clareza, estratégia, liderança e evolução
              contínua.
            </p>

            <div className="mt-10 max-w-3xl border-l border-[#35F06A] pl-5">
              <p className="text-2xl font-medium leading-snug text-[#F4F7F8] sm:text-3xl">
                Grandes resultados começam com decisões bem direcionadas.
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#A8B2BA] sm:text-base">
                Em breve, palestras, mentorias e consultorias para impulsionar
                pessoas, equipes e negócios.
              </p>
            </div>
          </div>

          <aside
            aria-label="Áreas de atuação em preparação"
            className="relative min-h-[24rem] overflow-hidden border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-8"
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#35F06A] to-transparent opacity-70"
            />
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#35F06A]/10 blur-3xl"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#A8B2BA]">
              Estrutura em evolução
            </p>

            <div className="mt-10 space-y-6">
              {focusAreas.map((area, index) => (
                <div key={area} className="flex items-center gap-5">
                  <span className="font-mono text-sm text-[#35F06A]">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#35F06A]/70 to-transparent" />
                  <span className="min-w-32 text-right text-sm font-medium uppercase tracking-[0.22em] text-[#F4F7F8]">
                    {area}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute bottom-7 left-6 right-6 sm:left-8 sm:right-8">
              <div className="grid grid-cols-4 gap-2" aria-hidden="true">
                {Array.from({ length: 16 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-1 rounded-full bg-[#A8B2BA]/20"
                  />
                ))}
              </div>
              <p className="mt-6 text-sm leading-6 text-[#A8B2BA]">
                Liderança, estratégia, desenvolvimento profissional, gestão e
                engenharia organizados em uma presença digital mais clara.
              </p>
            </div>
          </aside>
        </div>

        <footer className="flex items-center justify-between border-t border-white/10 pt-5 text-xs font-medium uppercase tracking-[0.22em] text-[#A8B2BA]">
          <span>Paulo Crispim · 2026</span>
          <span className="hidden text-[#35F06A] sm:inline">
            Clareza · direção · evolução
          </span>
        </footer>
      </section>
    </main>
  );
}
