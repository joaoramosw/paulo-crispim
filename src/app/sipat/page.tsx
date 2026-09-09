import Image from "next/image";
import Link from "next/link";
import { SipatCta } from "@/components/sipat/SipatCta";
import { SipatFaq } from "@/components/sipat/SipatFaq";
import { SipatPartners } from "@/components/sipat/SipatPartners";
import { SipatStickyCta } from "@/components/sipat/SipatStickyCta";
import { sipatContent, sipatWhatsAppMessage } from "@/content/sipat";
import { contactEmails, getWhatsAppUrl } from "@/lib/contact";
import { getPartnerLogos } from "@/lib/partners";

const { hero, proof, problem, stage, process: approach, results, audience, trajectory, faq, cta } = sipatContent;

const CONTAINER = "mx-auto w-full max-w-[1120px] px-5 sm:px-6";
const SECTION_PADDING = "py-[clamp(3rem,7vw,6rem)]";
const EYEBROW = "sipat-display m-0 text-[11px] font-semibold uppercase leading-[1.5] tracking-[0.16em]";
const SECTION_TITLE =
  "sipat-display m-0 text-[clamp(1.5625rem,5.6vw,2.5rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-white";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function SipatPage() {
  const whatsappUrl = getWhatsAppUrl(sipatWhatsAppMessage);
  const partnerLogos = getPartnerLogos();

  return (
    <main className="sipat-root relative w-full overflow-x-hidden bg-[#050708] text-[#F2F4F4]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#050708]/[0.86] backdrop-blur-[14px]">
        <div className={`${CONTAINER} flex items-center justify-between gap-4 py-3`}>
          <Link href="/" aria-label="Paulo Crispim — página inicial" className="flex-none">
            <Image
              src="/paulo-crispim/logos/logo-paulo-crispim-header.png"
              alt="Paulo Crispim"
              width={120}
              height={34}
              priority
              className="h-[34px] w-auto"
            />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="header"
            data-cta-name="whatsapp_header"
            className="sipat-display flex min-h-[44px] flex-none items-center gap-2 rounded-full border border-[#22C07A]/50 px-4 py-2.5 text-[0.8125rem] font-semibold tracking-[0.02em] text-[#22C07A] transition-colors hover:border-[#22C07A] hover:text-[#4AD796] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C07A]"
          >
            <span aria-hidden="true" className="block h-[7px] w-[7px] rounded-full bg-[#22C07A]" />
            WhatsApp
          </a>
        </div>
      </header>

      {/* Dobra: promessa curta à esquerda, prova visual à direita. O H1 carrega
          uma única ideia; o "como" fica na linha de apoio. */}
      <section className="relative pb-[clamp(2.25rem,6vw,5rem)] pt-[clamp(1.75rem,6vw,4.5rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[140px] -top-[120px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(34,192,122,0.16),transparent_68%)]"
        />
        <div
          className={`${CONTAINER} relative grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(1.75rem,4vw,3.5rem)]`}
        >
          <div className="sipat-rise-in min-w-0">
            <p className={`${EYEBROW} mb-[18px] text-[#22C07A]`}>{hero.eyebrow}</p>
            <h1 className="sipat-display m-0 mb-5 text-[clamp(1.9375rem,7.4vw,3.375rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-white">
              {hero.title}
            </h1>
            <p className="m-0 mb-7 max-w-[46ch] text-[clamp(0.9375rem,4vw,1.125rem)] leading-[1.62] text-[#A9B1B1]">
              {hero.description}
            </p>
            <SipatCta href={whatsappUrl} label={sipatContent.ctaLabel} location="hero" pulse />
            <p className="m-0 mt-3.5 text-[0.84375rem] leading-[1.5] text-[#7D8686]">{sipatContent.ctaNote}</p>
          </div>

          <div className="relative min-w-0">
            <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F10]">
              <Image
                src="/paulo-crispim/imagens/hero/paulo-crispim-hero-mobile.jpg"
                alt="Paulo Crispim, engenheiro eletricista e palestrante corporativo"
                fill
                priority
                quality={82}
                sizes="(min-width: 1024px) 520px, 92vw"
                className="object-cover object-[50%_18%]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_top,rgba(5,7,8,0.92),transparent)]"
              />
              <div className="absolute inset-x-4 bottom-4">
                <p className="sipat-display m-0 text-[0.9375rem] font-semibold tracking-[-0.01em] text-white">
                  {hero.portrait.name}
                </p>
                <p className="m-0 mt-1 text-[0.78125rem] leading-[1.45] text-[#A9B1B1]">{hero.portrait.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={proof.partners.title} className="border-y border-white/[0.07] bg-[#080B0C]">
        <div className={`${CONTAINER} grid gap-[clamp(1.75rem,4vw,3rem)] py-[clamp(2rem,5vw,3.5rem)]`}>
          <blockquote className="m-0 border-l-2 border-[#22C07A] pl-[clamp(1rem,3vw,1.625rem)]">
            <p className="sipat-display m-0 max-w-[34ch] text-[clamp(1.25rem,4.6vw,1.875rem)] font-medium leading-[1.28] tracking-[-0.02em] text-white">
              {proof.quote}
            </p>
          </blockquote>

          <SipatPartners
            eyebrow={proof.partners.eyebrow}
            title={proof.partners.title}
            description={proof.partners.description}
            credentialsLabel={proof.partners.credentialsLabel}
            credentials={proof.partners.credentials}
            logos={partnerLogos}
          />
        </div>
      </section>

      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <p className={`${EYEBROW} mb-3.5 text-[#7D8686]`}>
          {problem.index} · {problem.eyebrow}
        </p>
        <h2 className={`${SECTION_TITLE} mb-[clamp(1.5rem,4vw,2.5rem)] max-w-[26ch]`}>{problem.title}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3.5">
          {problem.items.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-white/[0.08] bg-[#0A0D0E] p-[22px] transition-colors duration-300 hover:border-[#22C07A]/35"
            >
              <p className="m-0 text-[0.96875rem] leading-[1.55] text-[#CFD4D4]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Faixa de palco: a única prova que nenhum texto substitui. Sangra de
          borda a borda e dissolve no topo e na base, então as seções vizinhas
          encostam nela sem linha de corte. */}
      <section aria-label={stage.title} className="relative isolate w-full">
        {/* A partir de sm a faixa segue a proporção da própria fotografia
            (1672x941), então não há corte até o teto de 40rem; acima disso o
            corte é vertical e a âncora fica alta (24%) para que a cabeça de
            Paulo nunca encoste na borda. No celular a faixa é mais alta que a
            proporção de propósito — o corte passa a ser horizontal e a âncora
            de 72% mantém Paulo à direita, liberando a esquerda para o texto. */}
        <div className="sipat-stage-band relative h-[21rem] w-full sm:aspect-[1672/941] sm:h-auto sm:max-h-[40rem]">
          <Image
            src="/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png"
            alt="Paulo Crispim palestrando com microfone diante de uma plateia corporativa"
            fill
            quality={82}
            sizes="100vw"
            className="object-cover object-[72%_50%] sm:object-[60%_24%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,7,8,0.94)_0%,rgba(5,7,8,0.62)_38%,rgba(5,7,8,0.15)_70%,rgba(5,7,8,0)_100%)] sm:bg-[linear-gradient(90deg,rgba(5,7,8,0.92)_0%,rgba(5,7,8,0.7)_32%,rgba(5,7,8,0.26)_56%,rgba(5,7,8,0)_78%)]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-end pb-8 sm:items-center sm:pb-0">
          <div className={CONTAINER}>
            <p className={`${EYEBROW} mb-3 text-[#22C07A]`}>{stage.eyebrow}</p>
            <h2 className={`${SECTION_TITLE} max-w-[18ch]`}>{stage.title}</h2>
            <p className="m-0 mt-4 max-w-[38ch] text-[0.96875rem] leading-[1.6] text-[#CFD4D4]">{stage.description}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.07] bg-[#080B0C]">
        <div className={`${CONTAINER} ${SECTION_PADDING}`}>
          <p className={`${EYEBROW} mb-3.5 text-[#22C07A]`}>
            {approach.index} · {approach.eyebrow}
          </p>
          <h2 className={`${SECTION_TITLE} mb-[clamp(1.75rem,4vw,3rem)] max-w-[26ch]`}>{approach.title}</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(1.125rem,3vw,1.75rem)]">
            {approach.steps.map((step, index) => (
              <div key={step.title} className="border-t border-white/[0.14] pt-5">
                <p className="sipat-display m-0 mb-3 text-[2.125rem] font-semibold leading-none tracking-[-0.03em] text-[#22C07A]/90">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="sipat-display m-0 mb-2.5 text-[1.1875rem] font-semibold leading-[1.25] tracking-[-0.015em] text-white">
                  {step.title}
                </h3>
                <p className="m-0 text-[0.9375rem] leading-[1.6] text-[#A9B1B1]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <p className={`${EYEBROW} mb-3.5 text-[#7D8686]`}>
          {results.index} · {results.eyebrow}
        </p>
        <h2 className={`${SECTION_TITLE} mb-[clamp(1.5rem,4vw,2.5rem)] max-w-[24ch]`}>{results.title}</h2>
        {/* Grade de 2px sobre fundo claro: as divisórias são o próprio gap, sem
            borda por célula — assim nenhuma linha dobra no encontro delas. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-0.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
          {results.items.map((item) => (
            <div key={item} className="flex items-start gap-3.5 bg-[#050708] p-[clamp(1.25rem,3vw,1.75rem)]">
              <span aria-hidden="true" className="mt-[7px] block h-[9px] w-[9px] flex-none rounded-sm bg-[#22C07A]" />
              <p className="m-0 text-[0.96875rem] leading-[1.55] text-[#E2E6E6]">{item}</p>
            </div>
          ))}
        </div>
        <SipatCta
          href={whatsappUrl}
          label={sipatContent.ctaLabel}
          location="resultados"
          className="mt-[clamp(1.5rem,4vw,2.25rem)]"
        />
      </section>

      <section className="border-y border-white/[0.07] bg-[#080B0C]">
        <div className={`${CONTAINER} ${SECTION_PADDING}`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-16">
            {/* Último retrato da página, à esquerda no desktop para contrapor o
                da dobra; no empilhado ele vem depois do texto. */}
            <div className="order-2 min-w-0 lg:order-1">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[22rem] overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0F10] lg:max-w-none">
                <Image
                  src="/paulo-crispim/imagens/MRF_6047.jpg"
                  alt="Paulo Crispim em retrato profissional"
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 22rem, 92vw"
                  className="object-cover object-[50%_16%]"
                />
              </div>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <p className={`${EYEBROW} mb-3.5 text-[#7D8686]`}>
                {audience.index} · {audience.eyebrow}
              </p>
              <h2 className={`${SECTION_TITLE} mb-[clamp(0.625rem,2vw,1rem)] max-w-[24ch]`}>{audience.title}</h2>
              <p className="m-0 mb-[clamp(1.5rem,4vw,2.25rem)] max-w-[52ch] text-[0.96875rem] leading-[1.6] text-[#A9B1B1]">
                {audience.description}
              </p>
              <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
                {audience.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/[0.12] bg-white/[0.02] px-4 py-2.5 text-[0.875rem] text-[#E2E6E6]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção sem fotografia de propósito: a prova visual já foi dada na faixa
          de palco e no retrato de "Para quem é". Aqui o texto se divide em duas
          colunas a partir de lg — título de um lado, argumento do outro — para
          não virar um bloco corrido de largura inteira. */}
      <section className={`${CONTAINER} ${SECTION_PADDING}`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="min-w-0">
            <p className={`${EYEBROW} mb-3.5 text-[#7D8686]`}>
              {trajectory.index} · {trajectory.eyebrow}
            </p>
            <h2 className={`${SECTION_TITLE} max-w-[20ch]`}>{trajectory.title}</h2>
          </div>
          <div className="min-w-0 lg:pt-1">
            {trajectory.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`m-0 max-w-[56ch] text-[0.96875rem] leading-[1.65] ${
                  index === 0 ? "mb-4 text-[#CFD4D4]" : "text-[#A9B1B1]"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-white/[0.07] bg-[#080B0C]">
        <div className={`mx-auto w-full max-w-[820px] px-5 sm:px-6 ${SECTION_PADDING}`}>
          <p className={`${EYEBROW} mb-3.5 text-[#7D8686]`}>
            {faq.index} · {faq.eyebrow}
          </p>
          <h2 className="sipat-display m-0 mb-[clamp(1.5rem,4vw,2.25rem)] text-[clamp(1.5625rem,5.6vw,2.25rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-white">
            {faq.title}
          </h2>
          <SipatFaq items={faq.items} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050708]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[680px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(34,192,122,0.2),transparent_70%)]"
        />
        <div className="relative mx-auto w-full max-w-[760px] px-5 py-[clamp(3.5rem,9vw,6.875rem)] text-center sm:px-6">
          <h2 className="sipat-display m-0 mb-[18px] text-[clamp(1.6875rem,6.4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            {cta.title}
          </h2>
          <p className="mx-auto mb-[30px] mt-0 max-w-[48ch] text-[clamp(0.9375rem,4vw,1.0625rem)] leading-[1.62] text-[#A9B1B1]">
            {cta.description}
          </p>
          <SipatCta href={whatsappUrl} label={sipatContent.ctaLabel} location="cta_final" className="mx-auto" />
          <p className="m-0 mt-3.5 text-[0.84375rem] leading-[1.5] text-[#7D8686]">{sipatContent.ctaNote}</p>
        </div>
      </section>

      {/* O padding inferior extra reserva a altura da barra fixa de conversão,
          para que ela nunca cubra o contato do rodapé. */}
      <footer className="border-t border-white/[0.07] bg-[#080B0C]">
        <div className={`${CONTAINER} grid gap-6 pb-[calc(clamp(2rem,5vw,3rem)+76px)] pt-[clamp(2rem,5vw,3rem)]`}>
          <Image
            src="/paulo-crispim/logos/logo-paulo-crispim-header.png"
            alt="Paulo Crispim"
            width={113}
            height={32}
            className="h-8 w-auto"
          />
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="rodape"
              data-cta-name="whatsapp_rodape"
              className="text-[0.90625rem] text-[#22C07A] transition-colors hover:text-[#4AD796]"
            >
              WhatsApp · (81) 99965-9147
            </a>
            <a
              href={`mailto:${contactEmails.palestras}?subject=${encodeURIComponent("Palestra SIPAT")}`}
              data-cta-location="rodape"
              className="text-[0.90625rem] text-[#CFD4D4] transition-colors hover:text-white"
            >
              {contactEmails.palestras}
            </a>
          </div>
          <p className="m-0 text-[0.78125rem] leading-[1.5] text-[#6D7676]">
            © {new Date().getFullYear()} Paulo Crispim. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <SipatStickyCta href={whatsappUrl} label={sipatContent.ctaLabel} />
    </main>
  );
}
