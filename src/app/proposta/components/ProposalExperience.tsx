"use client";

import Link from "next/link";
import {
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  brandTopics,
  crossSellItems,
  implementationIncludes,
  implementationScope,
  marketComparisonItems,
  monthlyIncludes,
  paymentOptions,
  portfolioProjects,
  pricing,
  proposalSettings,
  remainingBalanceCents,
  roadmapSteps,
  upsellItems,
  type PaymentOption,
} from "../data";

type ModalName = "summary" | "briefing" | null;

type PaymentCalculation = {
  baseCents: number;
  startSignalCents: number;
  balanceNetCents: number;
  balanceGrossCents: number;
  feeCents: number;
  totalCents: number;
  installments: number[];
};

type SlideDefinition = {
  id: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
};

const googleAdsNotice =
  "A configuração e a gestão de Google Ads estão incluídas no acompanhamento mensal. O investimento em mídia é separado, definido conforme objetivo e pago diretamente na plataforma Google Ads.";

const navigationItems = [
  { label: "Visão geral", slideId: "overview" },
  { label: "Oportunidade", slideId: "opportunity" },
  { label: "Estrutura", slideId: "structure" },
  { label: "Entregas", slideId: "scope" },
  { label: "Portfólio", slideId: "portfolio" },
  { label: "Plano", slideId: "roadmap" },
  { label: "Comparativo", slideId: "comparison" },
  { label: "Investimento", slideId: "investment" },
  { label: "Acompanhamento", slideId: "tracking" },
  { label: "Próximos passos", slideId: "next-steps" },
];

const whatsappInterestOptions = [
  "Palestras",
  "Mentorias",
  "Consultorias",
  "Outro assunto",
];

const activeCrossSellItems = crossSellItems.filter((item) => item.active);

function splitInstallments(totalCents: number, installmentCount: number) {
  const baseInstallment = Math.floor(totalCents / installmentCount);
  const remainder = totalCents % installmentCount;

  return Array.from({ length: installmentCount }, (_, index) => {
    return baseInstallment + (index < remainder ? 1 : 0);
  });
}

function isCreditOption(option: PaymentOption) {
  return option.id.startsWith("credit-");
}

function getPaymentCalculation(option: PaymentOption): PaymentCalculation {
  const baseCents = pricing.implementationNetAmountCents;

  if (option.id === "pix") {
    const startSignalCents = pricing.projectStartSignalCents;
    const balanceNetCents = remainingBalanceCents;

    return {
      baseCents,
      startSignalCents,
      balanceNetCents,
      balanceGrossCents: balanceNetCents,
      feeCents: 0,
      totalCents: startSignalCents + balanceNetCents,
      installments: splitInstallments(balanceNetCents, option.installments),
    };
  }

  const startSignalCents = 0;
  const netAmountCents = baseCents;
  const grossAmountCents = Math.round(netAmountCents / (1 - option.feeRate));

  return {
    baseCents,
    startSignalCents,
    balanceNetCents: netAmountCents,
    balanceGrossCents: grossAmountCents,
    feeCents: grossAmountCents - netAmountCents,
    totalCents: grossAmountCents,
    installments: splitInstallments(grossAmountCents, option.installments),
  };
}

function formatCurrencyFromCents(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}


function formatFeeRate(feeRate: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: feeRate === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(feeRate);
}

function getInstallmentText(option: PaymentOption, calculation: PaymentCalculation) {
  const firstInstallment =
    calculation.installments[0] ?? calculation.balanceGrossCents;
  const suffix = option.id === "pix" ? "mensais via Pix" : "no crédito";

  return `${option.installments}x de ${formatCurrencyFromCents(firstInstallment)} ${suffix}`;
}

function getCardSummaryText(option: PaymentOption) {
  if (option.id === "pix") {
    return "Sinal de R$ 500 + 3 mensalidades via Pix";
  }
  return `${option.installments} parcelas no crédito`;
}

function getWhatsAppHref(interest: string) {
  const configuredNumber = proposalSettings.whatsapp.number.replace(/\D/g, "");

  if (!configuredNumber) {
    return "";
  }

  const message = encodeURIComponent(
    `Olá, Paulo. Tenho interesse em conversar sobre ${interest.toLowerCase()} a partir da proposta de presença digital full.`,
  );

  return `https://wa.me/${configuredNumber}?text=${message}`;
}

function isTextInputTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export function ProposalExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const [openModal, setOpenModal] = useState<ModalName>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(
    paymentOptions[0].id,
  );
  const [selectedInterest, setSelectedInterest] = useState(whatsappInterestOptions[0]);
  const [conditionModalId, setConditionModalId] = useState<string | null>(null);
  const [briefingSent, setBriefingSent] = useState(false);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);

  const selectedPayment =
    paymentOptions.find((option) => option.id === selectedPaymentId) ??
    paymentOptions[0];
  const conditionPayment = conditionModalId
    ? paymentOptions.find((option) => option.id === conditionModalId)
    : null;
  const paymentCalculation = useMemo(
    () => getPaymentCalculation(selectedPayment),
    [selectedPayment],
  );
  const conditionCalculation = conditionPayment
    ? getPaymentCalculation(conditionPayment)
    : null;
  const pixOption = paymentOptions[0];
  const credit4xOption = paymentOptions.find((option) => option.id === "credit-4x")!;
  const pixCalculation = getPaymentCalculation(pixOption);
  const credit4xCalculation = getPaymentCalculation(credit4xOption);
  const pixSavingCents = credit4xCalculation.totalCents - pixCalculation.totalCents;
  const whatsappHref = getWhatsAppHref(selectedInterest);
  const comparisonTotalCents = marketComparisonItems.reduce(
    (sum, item) => sum + item.priceCents,
    0,
  );

  const slides: SlideDefinition[] = [
    {
      id: "overview",
      navLabel: "Visão geral",
      eyebrow: "Proposta estratégica",
      title: "Presença digital full para Paulo Crispim",
      subtitle:
        "Da autoridade profissional à geração contínua de oportunidades para palestras, mentorias e consultorias.",
      content: (
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="max-w-3xl text-lg leading-8 text-slate-200">
              Sua experiência já gera valor. A presença digital precisa apresentar
              essa autoridade com clareza, confiança e direção comercial.
            </p>
            <p className="max-w-3xl rounded-lg border border-white/10 bg-white/7 p-5 text-base leading-7 text-slate-200 shadow-2xl shadow-black/10">
              Paulo Crispim é engenheiro elétrico, palestrante, mentor e consultor.
              Atua com gente e gestão, processos, liderança, engenharia,
              desenvolvimento profissional e consultoria para empresas.
            </p>
            <div className="flex flex-wrap gap-2">
              {brandTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-3 py-1.5 text-sm font-semibold text-[#E9C46A]"
                >
                  {topic}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => goToSlideId("structure")}
                className="min-h-11 rounded-lg bg-[#D9A441] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] focus:outline-none focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2 focus:ring-offset-[#071A33]"
              >
                Conhecer a estrutura proposta
              </button>
              <button
                type="button"
                onClick={() => goToSlideId("investment")}
                className="min-h-11 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#071A33]"
              >
                Ver investimento
              </button>
            </div>
          </div>

          <EngineeringPanel />
        </div>
      ),
    },
    {
      id: "opportunity",
      navLabel: "Oportunidade",
      eyebrow: "Diagnóstico comercial",
      title: "Uma autoridade consolidada precisa de uma presença digital à altura",
      subtitle:
        "A proposta organiza a autoridade profissional em uma estrutura centralizada, mensurável e preparada para campanhas.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          <ComparisonCard
            tone="quiet"
            title="Sem estrutura digital centralizada"
            items={[
              "Informações espalhadas entre conversas, redes sociais e indicações.",
              "Serviços difíceis de entender rapidamente.",
              "Empresas sem referência única para conhecer atuação e diferenciais.",
              "Contatos sem rastreamento de origem.",
              "Oportunidades dependentes apenas de indicações.",
            ]}
          />
          <ComparisonCard
            tone="gold"
            title="Com estrutura digital full"
            items={[
              "Autoridade apresentada de forma clara e profissional.",
              "Serviços organizados para empresas e profissionais.",
              "Caminho direto para WhatsApp, formulário e reunião.",
              "Rastreamento de contatos e comportamento.",
              "Base contínua para campanhas de Google Ads.",
              "Acompanhamento para melhorar a geração de oportunidades.",
            ]}
          />
          <p className="lg:col-span-2 rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-5 text-base font-medium leading-7 text-[#F8FAFC]">
            Não é apenas sobre publicar um site. É sobre construir uma estrutura
            comercial digital que trabalhe a favor da autoridade de Paulo Crispim.
          </p>
        </div>
      ),
    },
    {
      id: "structure",
      navLabel: "Estrutura",
      eyebrow: "Solução full",
      title: "Uma operação digital conectada do posicionamento à captação",
      subtitle:
        "O site é a base, o rastreamento orienta as decisões e o Google Ads acelera a entrada de demanda.",
      content: (
        <div className="space-y-6">
          <FlowStrip
            items={[
              "Autoridade profissional",
              "Posicionamento claro",
              "Site estratégico",
              "Conteúdo organizado",
              "Pré-atendimento",
              "Contato qualificado",
              "Rastreamento",
              "Google Ads",
              "Otimização contínua",
            ]}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Posicionamento e marca",
                "Mensagem central, diferenciais, linguagem e organização da autoridade profissional.",
              ],
              [
                "Site profissional",
                "Estrutura clara, responsiva e preparada para apresentar serviços e gerar contatos.",
              ],
              [
                "Pré-atendimento no site",
                "Assistente com perguntas iniciais e direcionamento para o WhatsApp de Paulo Crispim.",
              ],
              [
                "Rastreamento e conversões",
                "Configuração de Analytics, Tag Manager, Search Console e eventos de contato.",
              ],
              [
                "Google Ads",
                "Campanhas estruturadas para capturar demanda relacionada aos serviços.",
              ],
              [
                "Acompanhamento contínuo",
                "Manutenção técnica, análise de dados, gestão de campanhas e evolução da estrutura.",
              ],
            ].map(([title, description]) => (
              <FeatureCard key={title} title={title} description={description} />
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "scope",
      navLabel: "Entregas",
      eyebrow: "Implantação completa",
      title: "O que será construído na implantação inicial",
      subtitle:
        "Site, rastreamento, estrutura de captação e lançamento inicial de campanhas em uma única implantação.",
      content: (
        <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-lg border border-[#D9A441]/30 bg-white p-5 text-[#1F2937] shadow-xl shadow-black/10">
            <div className="flex flex-wrap gap-2">
              <Badge>Implantação completa</Badge>
              <Badge>Site + rastreamento + captação</Badge>
            </div>
            <ol className="mt-5 space-y-2">
              {implementationScope.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#071A33] text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/7 p-5">
            <h3 className="text-lg font-semibold text-white">Inclui</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {implementationIncludes.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </div>
            <p className="mt-5 rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
              O investimento em mídia paga não está incluso no valor de gestão. A
              verba de anúncios é paga separadamente na conta Google Ads.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "bonus",
      navLabel: "Entregas",
      eyebrow: "Bônus da implantação",
      title: "Assistente de pré-atendimento no site",
      subtitle:
        "Um recurso simples para orientar visitantes, identificar o interesse inicial e encaminhar a conversa para o WhatsApp.",
      content: (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg border border-[#D9A441]/40 bg-white p-6 text-[#1F2937] shadow-xl shadow-black/10">
            <Badge>Bônus incluso na implantação</Badge>
            <h3 className="mt-4 text-2xl font-semibold text-[#071A33]">
              Assistente de pré-atendimento integrado ao WhatsApp
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Um assistente no site para orientar o visitante, identificar o
              interesse inicial e encaminhar a conversa para o WhatsApp de Paulo
              Crispim.
            </p>
            <div className="mt-5 grid gap-2">
              {[
                "Saudação inicial",
                "Opções de interesse",
                "Perguntas simples de pré-qualificação",
                "Direcionamento para palestras, mentorias, consultorias ou outro assunto",
                "Mensagem pré-preenchida conforme o interesse do visitante",
              ].map((item) => (
                <CheckItem key={item} dark>
                  {item}
                </CheckItem>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/7 p-5">
            <h3 className="text-lg font-semibold text-white">
              Demonstração do direcionamento
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Escolha um interesse para visualizar a mensagem que seria preparada
              para o WhatsApp.
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {whatsappInterestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => setSelectedInterest(interest)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#E9C46A] ${
                    selectedInterest === interest
                      ? "border-[#D9A441] bg-[#D9A441] text-[#071A33]"
                      : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-[#071A33] p-4 text-sm leading-6 text-slate-200">
              Olá, Paulo. Tenho interesse em conversar sobre{" "}
              {selectedInterest.toLowerCase()} a partir da proposta de presença
              digital full.
            </div>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#D9A441] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
              >
                Continuar pelo WhatsApp
              </a>
            ) : (
              <p className="mt-4 rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
                O canal de WhatsApp será configurado antes da publicação. Nenhum
                número fictício foi usado nesta proposta.
              </p>
            )}
            <p className="mt-4 text-xs leading-5 text-slate-400">
              Automação de respostas dentro do WhatsApp depende de API oficial,
              aprovação da Meta, configuração específica do número e possíveis
              custos externos. Não faz parte desta proposta inicial.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "journey",
      navLabel: "Estrutura",
      eyebrow: "Jornada de conversão",
      title: "Como a estrutura digital transforma interesse em oportunidade",
      subtitle:
        "Quanto mais clara e objetiva for a jornada, menor será a fricção para transformar interesse em contato comercial.",
      content: (
        <div className="grid gap-4 md:grid-cols-5">
          {[
            "Indicação, Google, LinkedIn ou rede social",
            "Entrada no site profissional",
            "Compreensão da autoridade, dos serviços e diferenciais",
            "Pré-atendimento e direcionamento",
            "Conversa no WhatsApp, formulário ou reunião",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-white/10 bg-white/7 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D9A441] text-sm font-semibold text-[#071A33]">
                {index + 1}
              </span>
              <p className="mt-4 text-sm font-semibold leading-6 text-white">
                {step}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "portfolio",
      navLabel: "Portfólio",
      eyebrow: "Projetos desenvolvidos",
      title: "Exemplos de estruturas digitais já entregues",
      subtitle:
        "Cada projeto é construído conforme posicionamento, público, objetivo e momento comercial do cliente.",
      content: (
        <div className="grid gap-5 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border border-white/10 bg-white p-4 text-[#1F2937] shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
            >
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-[#F4F6F8]">
                <div className="flex items-center gap-1 border-b border-slate-200 bg-white px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                </div>
                <div className="relative h-40 p-4">
                  <PortfolioPreview index={index} />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-semibold text-[#071A33]">
                    {project.segment}
                  </p>
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#071A33]">
                {project.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {project.description}
              </p>
              <span className="mt-4 inline-flex text-sm font-semibold text-[#12345B] group-hover:text-[#071A33]">
                Abrir projeto em nova aba
              </span>
            </a>
          ))}
        </div>
      ),
    },
    {
      id: "roadmap",
      navLabel: "Plano",
      eyebrow: "Plano de execução",
      title: "Plano de execução com acompanhamento por etapas",
      subtitle:
        "Prazo médio para implantação e lançamento da estrutura: 25 a 45 dias, dependendo da entrega dos materiais e aprovações.",
      content: (
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {roadmapSteps.map(([title, duration], index) => (
              <div
                key={title}
                className="rounded-lg border border-white/10 bg-white/7 p-4"
              >
                <span className="text-xs font-semibold uppercase text-[#E9C46A]">
                  Etapa {index + 1}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-6 text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{duration}</p>
              </div>
            ))}
          </div>
          <p className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
            O acompanhamento de campanhas e otimizações continua após a
            publicação, como parte do plano mensal full.
          </p>
        </div>
      ),
    },
    {
      id: "comparison",
      navLabel: "Comparativo",
      eyebrow: "Referência de mercado",
      title: "Quanto você acha que deveria custar tudo isso?",
      subtitle:
        "Cada entrega desta proposta tem valor individual de mercado. Veja o comparativo.",
      content: (
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marketComparisonItems.map((item) => (
              <div
                key={item.item}
                className="rounded-lg border border-white/10 bg-white/7 p-4"
              >
                <p className="text-sm leading-6 text-slate-300">{item.item}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Incluso
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {formatCurrencyFromCents(item.priceCents)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-[#D9A441]/40 bg-[#D9A441]/10 p-6 text-center">
            <p className="text-sm font-semibold uppercase text-[#E9C46A]">
              Valor total no mercado
            </p>
            <p className="mt-2 text-4xl font-semibold text-white">
              {formatCurrencyFromCents(comparisonTotalCents)}
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <p className="text-sm font-semibold uppercase text-[#E9C46A]">
                Implantação full
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {formatCurrencyFromCents(pricing.implementationNetAmountCents)}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Tudo que você viu acima em um único pacote integrado, com
                acompanhamento mensal e otimização contínua.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <p className="text-sm font-semibold uppercase text-[#E9C46A]">
                Acompanhamento full mensal
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
        Manutenção técnica, gestão de Google Ads, análise de conversões e relatório mensal em PDF.
              </p>
            </div>
          </div>

          <p className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
            A proposta full entrega tudo isso em um único pacote integrado, com
            acompanhamento mensal e otimização contínua — pelo valor de uma fração
            do custo individual.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => goToSlideId("investment")}
              className="min-h-11 rounded-lg bg-[#D9A441] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] focus:outline-none focus:ring-2 focus:ring-[#E9C46A] focus:ring-offset-2 focus:ring-offset-[#071A33]"
            >
              Ver investimento
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "investment",
      navLabel: "Investimento",
      eyebrow: "Oferta principal única",
      title: "Investimento para implantação e acompanhamento full",
      subtitle:
        "Uma implantação completa, com acompanhamento mensal separado e verba de mídia tratada com transparência.",
      content: (
        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <InvestmentCard
              title="Implantação Full"
              value={formatCurrencyFromCents(pricing.implementationNetAmountCents)}
              description="Implantação da presença digital full: posicionamento, identidade visual, site profissional, configurações técnicas, rastreamento, estrutura de conversão, assistente de pré-atendimento no site e lançamento inicial da operação de Google Ads."
            />
            <PaymentConditionsGrid
              pixSavingCents={pixSavingCents}
              onConditionDetail={(paymentId) => {
                setConditionModalId(paymentId);
              }}
            />
          </div>
          <div className="space-y-5">
            <InvestmentCard
              title="Acompanhamento Full Mensal"
              value={`${formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês`}
              description="Acompanhamento contínuo após o lançamento, incluindo manutenção técnica básica do site, gestão e otimização de Google Ads, análise de conversões, ajustes de palavras-chave e anúncios, relatório mensal resumido em PDF e recomendações de melhoria."
            />
            <div className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-5">
              <p className="text-lg font-semibold text-white">Plano semestral com desconto</p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {formatCurrencyFromCents(pricing.monthlyFullSupportSixMonthCents)}/mês
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Ao fechar um ciclo de 6 meses, o valor do acompanhamento fica em{" "}
                {formatCurrencyFromCents(pricing.monthlyFullSupportSixMonthCents)}/mês.
                Você economiza{" "}
                {formatCurrencyFromCents(
                  (pricing.monthlyFullSupportAmountCents - pricing.monthlyFullSupportSixMonthCents) * 6,
                )}{" "}
                no período, equivalente a aproximadamente 3 semanas de
                acompanhamento no valor mensal padrão.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <h3 className="text-lg font-semibold text-white">Inclui no mensal</h3>
              <div className="mt-4 grid gap-2">
                {monthlyIncludes.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </div>
            </div>
            <p className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-semibold leading-6 text-[#F8FAFC]">
              {googleAdsNotice}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpenModal("summary")}
                className="min-h-11 rounded-lg bg-[#D9A441] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
              >
                Resumo da implantação
              </button>
              <button
                type="button"
                onClick={() => setOpenModal("briefing")}
                className="min-h-11 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Iniciar briefing
              </button>
            </div>
          </div>

          {/* Print-only consolidated payment table */}
          <div className="proposal-print-only proposal-payment-table proposal-screen-only print:block" style={{ display: 'none' }}>
            <table className="proposal-payment-table">
              <caption>Condições de pagamento — Implantação Full</caption>
              <thead>
                <tr>
                  <th>Condição</th>
                  <th>Sinal de início</th>
                  <th>Saldo bruto</th>
                  <th>Parcelas</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {paymentOptions.map((option) => {
                  const calc = getPaymentCalculation(option);
                  return (
                    <tr key={option.id}>
                      <td>{option.label}</td>
                      <td>{formatCurrencyFromCents(calc.startSignalCents)}</td>
                      <td>{formatCurrencyFromCents(calc.balanceGrossCents)}</td>
                      <td>
                        {calc.installments
                          .map((inst) => formatCurrencyFromCents(inst))
                          .join(" + ")}
                      </td>
                      <td>{formatCurrencyFromCents(calc.totalCents)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              <strong>Acompanhamento Full Mensal:</strong>{" "}
              {formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês
              ({" "}
              {formatCurrencyFromCents(pricing.monthlyFullSupportSixMonthCents)}/mês
              no plano semestral). Inclui manutenção técnica, gestão de Google Ads,
              análise de conversões e relatório mensal em PDF.
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
              O investimento em mídia paga não está incluso no valor de gestão. A
              verba de anúncios é paga separadamente na conta Google Ads.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      navLabel: "Acompanhamento",
      eyebrow: "Transparência",
      title: "Visibilidade em cada etapa do projeto",
      subtitle:
        "A proposta mostra um resumo visual do painel; o acompanhamento editável permanece exclusivamente em /plano.",
      content: (
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-lg border border-white/10 bg-white p-6 text-[#1F2937] shadow-xl shadow-black/10">
            <p className="text-sm font-semibold uppercase text-[#12345B]">
              Progresso geral
            </p>
            <h3 className="mt-2 text-4xl font-semibold text-[#071A33]">
              7% concluído
            </h3>
            <p className="mt-2 text-sm font-medium text-slate-600">
              5 de 71 itens concluídos
            </p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[7%] rounded-full bg-[#D9A441]" />
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <ProgressMiniStat label="Concluídas" value="0" />
              <ProgressMiniStat label="Em andamento" value="2" />
              <ProgressMiniStat label="Pendentes" value="8" />
            </dl>
            <Link
              href="/plano"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345B] focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
            >
              Ver painel detalhado
            </Link>
          </div>

          <div className="grid gap-4">
            <StagePreview
              title="Etapa 1 — Em andamento"
              description="Briefing e diagnóstico"
              detail="3 de 5 itens concluídos"
              percent={60}
            />
            <StagePreview
              title="Etapa 8 — Em andamento"
              description="Configurações técnicas"
              detail="2 de 6 itens concluídos"
              percent={33}
            />
            <p className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
              Não há duplicação da lógica de checklist, progresso, observações ou
              etapas. O painel editável continua apenas na rota /plano.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "evolutions",
      navLabel: "Acompanhamento",
      eyebrow: "Evoluções futuras",
      title: "Evoluções recomendadas",
      subtitle:
        "Recursos adicionais sob escopo, apresentados somente quando houver necessidade comercial real.",
      content: (
        <div className="grid gap-5 lg:grid-cols-2">
          {proposalSettings.showUpsell ? (
            <div className="rounded-lg border border-white/10 bg-white/7 p-5">
              <h3 className="text-xl font-semibold text-white">
                Disponível sob escopo
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Conforme objetivo comercial e necessidade da campanha.
              </p>
              <div className="mt-4 grid gap-2">
                {upsellItems.map((item) => (
                  <CheckItem key={item}>{item}</CheckItem>
                ))}
              </div>
            </div>
          ) : null}

          {proposalSettings.showCrossSell ? (
            <div className="rounded-lg border border-white/10 bg-white p-5 text-[#1F2937] shadow-xl shadow-black/10">
              <h3 className="text-xl font-semibold text-[#071A33]">
                Serviços complementares que podem ampliar os resultados
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Não estão incluídos automaticamente na proposta principal e não são
                obrigatórios.
              </p>
              <div className="mt-4 grid gap-3">
                {activeCrossSellItems.map((item) => (
                  <div key={item.id} className="rounded-lg bg-[#F4F6F8] p-3">
                    <h4 className="text-sm font-semibold text-[#071A33]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ),
    },
    {
      id: "next-steps",
      navLabel: "Próximos passos",
      eyebrow: "Encerramento",
      title: "Uma estrutura digital que representa sua experiência e cria novas oportunidades",
      subtitle:
        "Após a aprovação, o primeiro passo é o briefing estratégico para definir objetivos, público, serviços prioritários, mensagens e materiais necessários.",
      content: (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-5">
            <p className="text-lg leading-8 text-slate-200">
              Paulo Crispim já possui conhecimento, experiência e temas relevantes
              para empresas e profissionais. O próximo passo é organizar essa
              autoridade em uma presença digital clara, estratégica e acompanhada
              continuamente.
            </p>
            {proposalSettings.availability.enabled ? (
              <div className="rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-medium leading-6 text-[#F8FAFC]">
                <p>{proposalSettings.availability.message}</p>
                {proposalSettings.availability.nextStartWindow ? (
                  <p className="mt-2">
                    Próxima janela: {proposalSettings.availability.nextStartWindow}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpenModal("briefing")}
                className="min-h-11 rounded-lg bg-[#D9A441] px-5 py-3 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
              >
                Iniciar briefing estratégico
              </button>
              <button
                type="button"
                onClick={() => setOpenModal("summary")}
                className="min-h-11 rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Avançar com a implantação full
              </button>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white p-5 text-[#1F2937] shadow-xl shadow-black/10">
            <h3 className="text-xl font-semibold text-[#071A33]">Resumo final</h3>
            <div className="mt-4 grid gap-3">
              <SummaryRow
                label="Implantação Full"
                value={formatCurrencyFromCents(pricing.implementationNetAmountCents)}
              />
              <SummaryRow
                label="Condição"
                value="Definida no simulador"
              />
              <SummaryRow
                label="Acompanhamento full"
                value={`${formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês`}
              />
              <SummaryRow label="Verba de anúncios" value="Separada" />
              <SummaryRow label="Bônus" value="Pré-atendimento no site" />
              <SummaryRow label="Prazo médio" value="25 a 45 dias" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const progressPercent =
    slides.length <= 1 ? 100 : Math.round((currentIndex / (slides.length - 1)) * 100);

  function goToSlide(nextIndex: number) {
    const clampedIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
    setCurrentIndex(clampedIndex);

    if (!isDesktop) {
      window.setTimeout(() => {
        slideRefs.current[clampedIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 0);
    }
  }

  function goToSlideId(slideId: string) {
    const nextIndex = slides.findIndex((slide) => slide.id === slideId);

    if (nextIndex >= 0) {
      goToSlide(nextIndex);
    }
  }

  function handleBriefingSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBriefingSent(true);
    handleFutureBriefingIntegration();
  }

  function handleFutureBriefingIntegration() {
    // Placeholder para futura integração com WhatsApp, e-mail ou endpoint de formulário.
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateViewportMode = () => setIsDesktop(mediaQuery.matches);

    updateViewportMode();
    mediaQuery.addEventListener("change", updateViewportMode);

    return () => mediaQuery.removeEventListener("change", updateViewportMode);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      function navigateToIndex(nextIndex: number) {
        const clampedIndex = Math.min(Math.max(nextIndex, 0), slides.length - 1);
        setCurrentIndex(clampedIndex);

        if (!isDesktop) {
          window.setTimeout(() => {
            slideRefs.current[clampedIndex]?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 0);
        }
      }

      if (isTextInputTarget(event.target)) {
        return;
      }

      if (event.key === "Escape" && conditionModalId) {
        setConditionModalId(null);
        return;
      }

      if (event.key === "Escape" && openModal) {
        setOpenModal(null);
        return;
      }

      if (openModal || conditionModalId) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        navigateToIndex(currentIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        navigateToIndex(currentIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        navigateToIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        navigateToIndex(slides.length - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, conditionModalId, isDesktop, openModal, slides.length]);

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const nextIndex = slideRefs.current.findIndex(
          (slide) => slide === visibleEntry.target,
        );

        if (nextIndex >= 0) {
          setCurrentIndex(nextIndex);
        }
      },
      { threshold: [0.35, 0.6] },
    );

    slideRefs.current.forEach((slide) => {
      if (slide) {
        observer.observe(slide);
      }
    });

    return () => observer.disconnect();
  }, [isDesktop, slides.length]);

  return (
    <main className="proposal-root min-h-screen bg-[#071A33] font-sans text-white lg:h-[100svh] lg:overflow-hidden">
      <ProposalNavigation
        currentIndex={currentIndex}
        slides={slides}
        onNavigate={goToSlideId}
      />

      <div
        className="proposal-slides-track lg:transition-transform lg:duration-700 lg:ease-out motion-reduce:transition-none"
        style={
          isDesktop
            ? { transform: `translate3d(0, -${currentIndex * 100}svh, 0)` }
            : undefined
        }
      >
        {slides.map((slide, index) => (
          <SlideShell
            key={slide.id}
            slide={slide}
            index={index}
            isActive={index === currentIndex}
            refCallback={(node) => {
              slideRefs.current[index] = node;
            }}
          />
        ))}
      </div>

      <PresentationControls
        currentIndex={currentIndex}
        total={slides.length}
        progressPercent={progressPercent}
        onPrevious={() => goToSlide(currentIndex - 1)}
        onNext={() => goToSlide(currentIndex + 1)}
        onPrint={() => window.print()}
      />

      {openModal === "summary" ? (
        <SummaryModal
          selectedPayment={selectedPayment}
          calculation={paymentCalculation}
          onClose={() => setOpenModal(null)}
          onBriefing={() => setOpenModal("briefing")}
        />
      ) : null}

      {conditionPayment && conditionCalculation ? (
        <PaymentConditionModal
          payment={conditionPayment}
          calculation={conditionCalculation}
          onClose={() => setConditionModalId(null)}
          onChooseCondition={() => {
            setSelectedPaymentId(conditionPayment.id);
            setConditionModalId(null);
            setOpenModal("briefing");
          }}
        />
      ) : null}

      {openModal === "briefing" ? (
        <BriefingModal
          selectedPayment={selectedPayment}
          calculation={paymentCalculation}
          briefingSent={briefingSent}
          onSubmit={handleBriefingSubmit}
          onClose={() => setOpenModal(null)}
        />
      ) : null}
    </main>
  );
}

function ProposalNavigation({
  currentIndex,
  slides,
  onNavigate,
}: {
  currentIndex: number;
  slides: SlideDefinition[];
  onNavigate: (slideId: string) => void;
}) {
  const currentSlide = slides[currentIndex];

  return (
    <nav className="proposal-chrome fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#071A33]/92 px-4 py-3 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-[110rem] items-center gap-4">
        <div className="hidden min-w-44 md:block">
          <p className="text-xs font-semibold uppercase text-[#E9C46A]">
            Paulo Crispim
          </p>
          <p className="text-sm font-semibold text-white">Proposta Full</p>
        </div>
        <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
          {navigationItems.map((item) => {
            const isActive = currentSlide?.navLabel === item.label;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.slideId)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#E9C46A] ${
                  isActive
                    ? "border-[#D9A441] bg-[#D9A441] text-[#071A33]"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function SlideShell({
  slide,
  index,
  isActive,
  refCallback,
}: {
  slide: SlideDefinition;
  index: number;
  isActive: boolean;
  refCallback: (node: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={refCallback}
      id={slide.id}
      aria-label={slide.title}
      className={`proposal-slide relative min-h-[100svh] overflow-hidden px-4 pb-28 pt-28 sm:px-6 lg:flex lg:h-[100svh] lg:items-center lg:px-8 lg:py-24 ${
        isActive ? "lg:opacity-100" : "lg:opacity-45"
      } transition-opacity duration-500`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:52px_52px]"
      />
      <div className="relative mx-auto w-full max-w-[110rem]">
        <div className="mb-8 flex flex-col gap-3 lg:max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#D9A441]" />
            <p className="text-xs font-semibold uppercase text-[#E9C46A]">
              {String(index + 1).padStart(2, "0")} · {slide.eyebrow}
            </p>
          </div>
          <h1 className="text-balance text-3xl font-semibold leading-tight tracking-normal text-white sm:text-4xl xl:text-5xl">
            {slide.title}
          </h1>
          {slide.subtitle ? (
            <p className="max-w-4xl text-base leading-7 text-slate-300 sm:text-lg">
              {slide.subtitle}
            </p>
          ) : null}
        </div>
        {slide.content}
      </div>
    </section>
  );
}

function PresentationControls({
  currentIndex,
  total,
  progressPercent,
  onPrevious,
  onNext,
  onPrint,
}: {
  currentIndex: number;
  total: number;
  progressPercent: number;
  onPrevious: () => void;
  onNext: () => void;
  onPrint: () => void;
}) {
  return (
    <div className="proposal-chrome fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#071A33]/92 px-4 py-3 backdrop-blur md:px-6">
      <div className="mx-auto flex max-w-[110rem] flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">
            {currentIndex + 1} de {total}
          </span>
          <div
            className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
          >
            <div
              className="h-full rounded-full bg-[#D9A441] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex">
          <button
            type="button"
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="min-h-10 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
          >
            Voltar
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex === total - 1}
            className="min-h-10 rounded-lg bg-[#D9A441] px-4 py-2 text-sm font-semibold text-[#071A33] transition hover:bg-[#E9C46A] disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
          >
            Avançar
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="min-h-10 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
          >
            Imprimir proposta
          </button>
        </div>
      </div>
    </div>
  );
}

function EngineeringPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-white p-5 text-[#1F2937] shadow-2xl shadow-black/20">
      <div className="rounded-lg bg-[#F4F6F8] p-5">
        <div className="grid grid-cols-3 gap-3">
          {["Autoridade", "Captação", "Dados"].map((item) => (
            <div key={item} className="rounded-lg bg-white p-4 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase text-[#94A3B8]">{item}</p>
              <span className="mt-3 block h-1 rounded-full bg-[#D9A441]" />
            </div>
          ))}
        </div>
        <svg
          className="mt-6 h-56 w-full text-[#12345B]"
          viewBox="0 0 480 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M48 176C96 92 158 108 206 132C254 156 286 174 340 96C370 52 410 46 440 62"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M48 176H440M80 56V176M180 56V176M280 56V176M380 56V176"
            stroke="#CBD5E1"
            strokeWidth="2"
          />
          {[48, 206, 340, 440].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy={[176, 132, 96, 62][index]}
              r="9"
              fill="#D9A441"
            />
          ))}
        </svg>
      </div>
      <p className="mt-4 text-sm font-medium leading-6 text-slate-600">
        Uma estrutura digital capaz de apresentar autoridade, organizar serviços,
        facilitar contatos, medir oportunidades e gerar demanda de forma contínua.
      </p>
    </div>
  );
}

function ComparisonCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "quiet" | "gold";
}) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        tone === "gold"
          ? "border-[#D9A441]/40 bg-[#D9A441]/10"
          : "border-white/10 bg-white/7"
      }`}
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
            <Icon name={tone === "gold" ? "check" : "dash"} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowStrip({ items }: { items: string[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <div key={item} className="flex shrink-0 items-center gap-3">
          <div className="rounded-lg border border-[#D9A441]/30 bg-white/7 px-4 py-3 text-sm font-semibold text-white">
            {item}
          </div>
          {index < items.length - 1 ? (
            <span className="text-[#E9C46A]" aria-hidden="true">
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/7 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9A441]/30 text-[#E9C46A]">
        <Icon name="node" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function PaymentConditionsGrid({
  pixSavingCents,
  onConditionDetail,
}: {
  pixSavingCents: number;
  onConditionDetail: (paymentId: string) => void;
}) {
  return (
    <div className="rounded-lg border border-[#D9A441]/35 bg-white p-5 text-[#1F2937] shadow-xl shadow-black/10">
      <h3 className="text-2xl font-semibold text-[#071A33]">
        Simule sua condição de pagamento
      </h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        Escolha a forma de pagamento da implantação. As taxas da operadora são
        repassadas de forma transparente para preservar o valor líquido do
        projeto.
      </p>

      <p className="mt-4 rounded-lg bg-[#F4F6F8] p-3 text-sm font-medium leading-6 text-slate-700">
        Este simulador se aplica somente à implantação de{" "}
        {formatCurrencyFromCents(pricing.implementationNetAmountCents)}. A
        mensalidade de{" "}
        {formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}, a
        verba de mídia e os serviços complementares não entram neste
        parcelamento.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paymentOptions.map((option) => {
          const calc = getPaymentCalculation(option);

          return (
            <div
              key={option.id}
              className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex min-h-8 items-start justify-between gap-2">
                <span className="text-base font-semibold text-[#071A33]">
                  {option.label}
                </span>
                {option.badge ? <Badge>{option.badge}</Badge> : null}
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-center text-xs font-semibold uppercase text-slate-400">
                  Total: {formatCurrencyFromCents(calc.totalCents)}
                </p>
                <div className="rounded-lg bg-[#F4F6F8] p-3 text-center">
                  {isCreditOption(option) ? (
                    <p className="text-xl font-semibold text-[#071A33]">
                      {option.installments}x de {formatCurrencyFromCents(calc.installments[0])}{" "}
                      <span className="text-sm font-medium text-slate-500">no crédito</span>
                    </p>
                  ) : (
                    <p className="text-xl font-semibold text-[#071A33]">
                      Sinal de {formatCurrencyFromCents(calc.startSignalCents)} +{" "}
                      {option.installments}x de {formatCurrencyFromCents(calc.installments[0])}{" "}
                      <span className="text-sm font-medium text-slate-500">via Pix</span>
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onConditionDetail(option.id)}
                className="mt-4 min-h-10 w-full rounded-lg border border-[#071A33] px-4 py-2 text-sm font-semibold text-[#071A33] transition hover:bg-[#071A33] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
              >
                Ver condição detalhada
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border border-[#D9A441]/30 bg-[#D9A441]/10 p-4 text-sm font-semibold leading-6 text-[#12345B]">
        No Pix, você economiza{" "}
        {formatCurrencyFromCents(pixSavingCents)} em relação ao crédito em 4x.
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Valores simulados com base nas taxas atuais da operadora. Taxas podem
        ser atualizadas conforme a condição de pagamento disponível no momento
        da contratação.
      </p>
    </div>
  );
}

function InvestmentCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/7 p-5">
      <p className="text-sm font-semibold uppercase text-[#E9C46A]">{title}</p>
      <p className="mt-2 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function PaymentConditionModal({
  payment,
  calculation,
  onClose,
  onChooseCondition,
}: {
  payment: PaymentOption;
  calculation: PaymentCalculation;
  onClose: () => void;
  onChooseCondition: () => void;
}) {
  const timelineLabels = [
    "No início",
    "1º mês",
    "2º mês",
    "3º mês",
    "4º mês",
  ];

  return (
    <Modal title={`Condição de pagamento — ${payment.label}`} onClose={onClose}>
      <div className="space-y-6">
        {/* 1. Sinal de início (Pix only) */}
        {payment.id === "pix" ? (
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase text-[#12345B]">
              Sinal de início do projeto
            </p>
            <p className="mt-1 text-2xl font-semibold text-[#071A33]">
              {formatCurrencyFromCents(calculation.startSignalCents)} via Pix
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Confirma o início do briefing e a reserva da janela de execução.
            </p>
          </div>
        ) : null}

        {/* 2. Valor da implantação */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold uppercase text-[#12345B]">
            {payment.id === "pix" ? "Saldo líquido da implantação" : "Valor da implantação"}
          </p>
          <p className="mt-1 text-2xl font-semibold text-[#071A33]">
            {formatCurrencyFromCents(
              payment.id === "pix" ? calculation.balanceNetCents : calculation.baseCents,
            )}
          </p>
          {payment.id === "pix" ? (
            <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
              <p>Taxa aplicada: 0%</p>
              <p>
                Saldo final: {formatCurrencyFromCents(calculation.balanceGrossCents)}
              </p>
              <p>
                Três pagamentos mensais via Pix de{" "}
                {formatCurrencyFromCents(calculation.installments[0])}.
              </p>
            </div>
          ) : (
            <div className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
              <p>
                Taxa da operadora: {formatFeeRate(payment.feeRate)} aplicada ao
                valor total
              </p>
              <p>
                Valor total com taxa:{" "}
                {formatCurrencyFromCents(calculation.balanceGrossCents)}
              </p>
              <p>
                {payment.installments === 1
                  ? "Pagamento único"
                  : `${payment.installments} parcelas`}
                {payment.installments === 1
                  ? `: ${formatCurrencyFromCents(calculation.installments[0])}`
                  : ` de ${formatCurrencyFromCents(
                      calculation.installments[0],
                    )} cada`}
              </p>
            </div>
          )}
        </div>

        {/* 3. Cronograma */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold uppercase text-[#12345B]">
            Cronograma de pagamentos
          </p>
          <div className="mt-4 space-y-3">
            {/* Sinal (Pix only) */}
            {payment.id === "pix" ? (
              <div className="flex items-center justify-between rounded-lg bg-[#F4F6F8] p-3">
                <div>
                  <p className="text-sm font-semibold text-[#071A33]">
                    {timelineLabels[0]}
                  </p>
                  <p className="text-xs text-slate-500">Sinal de início do projeto</p>
                </div>
                <p className="text-sm font-semibold text-[#071A33]">
                  {formatCurrencyFromCents(calculation.startSignalCents)}
                </p>
              </div>
            ) : null}

            {/* Parcelas */}
            {calculation.installments.map((installment, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-[#F4F6F8] p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-[#071A33]">
                    {payment.id === "pix"
                      ? timelineLabels[index + 1] ?? `${index + 1}º mês`
                      : `${index + 1}ª parcela`}
                  </p>
                  <p className="text-xs text-slate-500">
                    {payment.id === "pix"
                      ? "Pagamento via Pix"
                      : "Pagamento no cartão"}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#071A33]">
                  {formatCurrencyFromCents(installment)}
                </p>
              </div>
            ))}
          </div>

          {calculation.installments.some(
            (inst, i) => i > 0 && inst !== calculation.installments[0],
          ) ? (
            <p className="mt-3 text-xs leading-5 text-slate-500">
              A última mensalidade pode variar alguns centavos para que a soma
              seja exatamente igual ao total da condição.
            </p>
          ) : null}
        </div>

        {/* 4. Total */}
        <div className="rounded-lg bg-[#071A33] p-4 text-center text-white">
          <p className="text-sm font-semibold uppercase text-[#E9C46A]">
            Total da implantação nesta condição
          </p>
          <p className="mt-1 text-3xl font-semibold">
            {formatCurrencyFromCents(calculation.totalCents)}
          </p>
        </div>

        {/* 5. Acompanhamento mensal */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm font-semibold uppercase text-[#12345B]">
            Acompanhamento Full após o lançamento
          </p>
          <p className="mt-1 text-2xl font-semibold text-[#071A33]">
            {formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Inclui manutenção técnica básica do site, gestão e otimização de
            Google Ads, análise de conversões e recomendações de melhoria.
          </p>
          <p className="mt-3 rounded-lg bg-[#F4F6F8] p-3 text-sm font-medium leading-6 text-slate-700">
            O acompanhamento mensal não faz parte do parcelamento da
            implantação.
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Ao fechar um ciclo de 6 meses, o valor do acompanhamento fica em{" "}
            {formatCurrencyFromCents(pricing.monthlyFullSupportSixMonthCents)}/mês —
            uma economia de{" "}
            {formatCurrencyFromCents(
              (pricing.monthlyFullSupportAmountCents - pricing.monthlyFullSupportSixMonthCents) * 6,
            )}{" "}
            no período.
          </p>
        </div>

        <p className="text-sm leading-6 text-slate-600">
          {googleAdsNotice}
        </p>

        {/* 6. CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onChooseCondition}
            className="min-h-11 flex-1 rounded-lg bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345B] focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
          >
            Escolher esta condição
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
          >
            Voltar às condições
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SummaryModal({
  selectedPayment,
  calculation,
  onClose,
  onBriefing,
}: {
  selectedPayment: PaymentOption;
  calculation: PaymentCalculation;
  onClose: () => void;
  onBriefing: () => void;
}) {
  return (
    <Modal title="Resumo da implantação" onClose={onClose}>
      <div className="grid gap-3">
        <SummaryRow
          label="Implantação base"
          value={formatCurrencyFromCents(pricing.implementationNetAmountCents)}
        />
        <SummaryRow label="Forma de pagamento" value={selectedPayment.label} />
        <SummaryRow label="Taxa aplicada" value={formatFeeRate(selectedPayment.feeRate)} />
        <SummaryRow
          label="Valor final para o cliente"
          value={formatCurrencyFromCents(calculation.totalCents)}
        />
        <SummaryRow
          label="Parcelamento escolhido"
          value={getInstallmentText(selectedPayment, calculation)}
        />
        <SummaryRow
          label="Acompanhamento full"
          value={`${formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês`}
        />
        <SummaryRow label="Bônus" value="Assistente de pré-atendimento no site" />
      </div>
      <p className="mt-4 rounded-lg bg-[#F4F6F8] p-4 text-sm font-medium leading-6 text-slate-700">
        {googleAdsNotice}
      </p>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        Próximos passos: aprovação da proposta, briefing estratégico, organização
        dos materiais, implantação e validação inicial.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBriefing}
          className="min-h-11 rounded-lg bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345B] focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
        >
          Iniciar briefing
        </button>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
        >
          Fechar
        </button>
      </div>
    </Modal>
  );
}

function BriefingModal({
  selectedPayment,
  calculation,
  briefingSent,
  onSubmit,
  onClose,
}: {
  selectedPayment: PaymentOption;
  calculation: PaymentCalculation;
  briefingSent: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}) {
  return (
    <Modal title="Iniciar briefing" onClose={onClose}>
      <div className="rounded-lg bg-[#F4F6F8] p-4">
        <p className="text-sm font-semibold text-[#071A33]">Condição selecionada</p>
        <p className="mt-1 text-sm leading-6 text-slate-700">
          {selectedPayment.label}: {formatCurrencyFromCents(calculation.totalCents)} ·{" "}
          {getInstallmentText(selectedPayment, calculation)}. Acompanhamento full:{" "}
          {formatCurrencyFromCents(pricing.monthlyFullSupportAmountCents)}/mês. Verba de mídia
          separada.
        </p>
      </div>

      {briefingSent ? (
        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          Briefing registrado localmente para esta simulação. A integração de envio
          será conectada em etapa futura.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome" name="name" required />
            <Field label="E-mail" name="email" type="email" required />
            <Field label="Telefone" name="phone" required />
            <label className="grid gap-1 text-sm font-semibold text-[#071A33]">
              Serviço de maior interesse
              <select
                name="interest"
                className="min-h-11 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30"
              >
                {whatsappInterestOptions.map((interest) => (
                  <option key={interest}>{interest}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-[#071A33]">
            Mensagem
            <textarea
              name="message"
              rows={4}
              className="resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30"
              placeholder="Contexto inicial, prioridade comercial ou observações."
            />
          </label>
          {activeCrossSellItems.length > 0 ? (
            <fieldset className="grid gap-2">
              <legend className="text-sm font-semibold text-[#071A33]">
                Interesses complementares opcionais
              </legend>
              {activeCrossSellItems.map((item) => (
                <label
                  key={item.id}
                  className="flex gap-2 rounded-lg bg-[#F4F6F8] p-3 text-sm font-medium text-slate-700"
                >
                  <input
                    type="checkbox"
                    name="crossSell"
                    value={item.id}
                    className="mt-1 h-4 w-4 accent-[#D9A441]"
                  />
                  <span>{item.title}</span>
                </label>
              ))}
            </fieldset>
          ) : null}
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-[#071A33] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#12345B] focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
          >
            Confirmar interesse
          </button>
        </form>
      )}
    </Modal>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="proposal-modal fixed inset-0 z-50 flex items-center justify-center bg-[#071A33]/80 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 text-[#1F2937] shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="proposal-modal-title" className="text-2xl font-semibold text-[#071A33]">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#D9A441]"
            aria-label="Fechar modal"
          >
            ×
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-[#071A33]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="min-h-11 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/30"
      />
    </label>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-fit rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 px-2.5 py-1 text-xs font-semibold text-[#12345B]">
      {children}
    </span>
  );
}

function CheckItem({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={`flex gap-2 text-sm leading-6 ${dark ? "text-slate-700" : "text-slate-200"}`}>
      <Icon name="check" />
      <span>{children}</span>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg bg-[#F4F6F8] p-3">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-right text-sm font-semibold text-[#071A33]">{value}</span>
    </div>
  );
}

function ProgressMiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#F4F6F8] p-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-[#071A33]">{value}</dd>
    </div>
  );
}

function StagePreview({
  title,
  description,
  detail,
  percent,
}: {
  title: string;
  description: string;
  detail: string;
  percent: number;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/7 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
        </div>
        <span className="rounded-full bg-[#D9A441] px-3 py-1 text-xs font-semibold text-[#071A33]">
          {percent}%
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-300">{detail}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#D9A441]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function PortfolioPreview({ index }: { index: number }) {
  const patterns = [
    "M22 108H160M22 132H122M22 62H154M22 84H184",
    "M32 132C72 62 116 92 146 74C166 62 180 42 202 54",
    "M36 56H196M36 90H168M36 124H196M36 158H132",
  ];

  return (
    <svg
      viewBox="0 0 232 160"
      className="h-full w-full text-[#12345B]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="16" y="20" width="200" height="120" rx="8" fill="white" />
      <path
        d={patterns[index] ?? patterns[0]}
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <circle cx="186" cy="108" r="20" fill="#D9A441" />
    </svg>
  );
}

function Icon({ name }: { name: "check" | "dash" | "node" }) {
  if (name === "dash") {
    return (
      <svg
        className="mt-1 h-4 w-4 shrink-0 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "node") {
    return (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 5v14M6 9h12M6 15h12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="6" cy="9" r="2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="15" r="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-[#E9C46A]"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="m5 12 4 4L19 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
