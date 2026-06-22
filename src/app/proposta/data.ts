export type PaymentOption = {
  id: string;
  label: string;
  installments: number;
  feeRate: number;
  badge: string | null;
  helperText: string;
};

export type PortfolioProject = {
  name: string;
  segment: string;
  description: string;
  href: string;
};

export type CrossSellItem = {
  id: string;
  title: string;
  description: string;
  active: boolean;
};

export const pricing = {
  implementationNetAmountCents: 140000,
  projectStartSignalCents: 50000,
  monthlyFullSupportAmountCents: 40000,
  monthlyFullSupportSixMonthCents: 35000,
  downsellInternalAmountCents: 130000,
};

export const remainingBalanceCents =
  pricing.implementationNetAmountCents - pricing.projectStartSignalCents;

export const paymentOptions = [
  {
    id: "pix",
    label: "Pix",
    installments: 3,
    feeRate: 0,
    badge: "Melhor condição",
    helperText: "Sinal de início e saldo em pagamentos mensais via Pix, sem taxa.",
  },
  {
    id: "credit-2x",
    label: "Crédito em 2x",
    installments: 2,
    feeRate: 0.0368,
    badge: null,
    helperText: "Saldo da implantação no cartão em duas parcelas mensais.",
  },
  {
    id: "credit-3x",
    label: "Crédito em 3x",
    installments: 3,
    feeRate: 0.0368,
    badge: null,
    helperText: "Saldo da implantação no cartão em três parcelas mensais.",
  },
  {
    id: "credit-4x",
    label: "Crédito em 4x",
    installments: 4,
    feeRate: 0.0368,
    badge: "Maior prazo",
    helperText: "Saldo da implantação no cartão em quatro parcelas mensais.",
  },
] as const satisfies readonly PaymentOption[];

export const proposalSettings = {
  showDownsell: false,
  showUpsell: true,
  showCrossSell: true,
  availability: {
    enabled: false,
    message: "",
    nextStartWindow: "",
  },
  whatsapp: {
    number: "",
  },
};

export const brandTopics = [
  "Gente e gestão",
  "Processos",
  "Liderança",
  "Engenharia",
  "Desenvolvimento profissional",
  "Consultoria para empresas",
];

export const portfolioProjects: PortfolioProject[] = [
  {
    name: "Esther Cavalcante Semijoias",
    segment: "Catálogo e atendimento",
    description:
      "Vitrine digital com catálogo, navegação organizada e atendimento direcionado.",
    href: "https://esthercavalcante.com.br/",
  },
  {
    name: "DomiFarma",
    segment: "Presença institucional",
    description:
      "Projeto digital voltado à presença institucional e comunicação de marca.",
    href: "https://www.domifarma.com.br/",
  },
  {
    name: "Galvão Advocacia Previdenciária",
    segment: "Autoridade profissional",
    description:
      "Presença digital voltada ao posicionamento profissional e geração de contatos.",
    href: "https://galvaoadvprevidenciaria.com.br/",
  },
];

export const roadmapSteps = [
  ["Briefing e diagnóstico", "1 a 2 dias"],
  ["Posicionamento da marca", "2 a 3 dias"],
  ["Logotipo e identidade visual", "4 a 7 dias"],
  ["Organização dos conteúdos", "3 a 5 dias"],
  ["Estrutura do site", "2 a 3 dias"],
  ["Design das páginas", "5 a 7 dias"],
  ["Desenvolvimento do site", "7 a 12 dias"],
  ["Configurações técnicas", "1 a 2 dias"],
  ["Rastreamento e conversões", "1 a 2 dias"],
  ["Google Ads e otimização", "Início após publicação e validação"],
];

export const implementationScope = [
  "Briefing e diagnóstico",
  "Posicionamento da marca",
  "Logotipo e identidade visual",
  "Organização dos conteúdos",
  "Estrutura do site",
  "Design das páginas",
  "Desenvolvimento responsivo",
  "Configurações técnicas",
  "Rastreamento e conversões",
  "Preparação e lançamento inicial de Google Ads",
];

export const implementationIncludes = [
  "Estrutura institucional profissional",
  "Páginas organizadas para autoridade, serviços e contato",
  "Navegação adaptada para celular",
  "Botões de WhatsApp e formulário",
  "Publicação em domínio",
  "SSL e configurações técnicas",
  "Google Analytics 4",
  "Google Tag Manager",
  "Google Search Console",
  "Eventos de clique em WhatsApp",
  "Eventos de envio de formulário",
  "Estrutura inicial de campanhas Google Ads",
  "Configuração de conversões",
  "Assistente de pré-atendimento no site",
];

export const monthlyIncludes = [
  "Manutenção técnica básica do site",
  "Gestão e otimização de Google Ads",
  "Ajustes de palavras-chave e anúncios",
  "Análise de conversões",
  "Relatório mensal resumido em PDF",
  "Recomendações de melhoria",
];

export const upsellItems = [
  "Landing page específica para palestra, mentoria, consultoria ou campanha",
  "Página adicional para um serviço prioritário",
  "Estrutura de captação específica para uma campanha",
  "Variações de anúncios e páginas de conversão",
];

export const crossSellItems: CrossSellItem[] = [
  {
    id: "authority-content",
    title: "Planejamento de conteúdo de autoridade",
    description: "Organização de pautas para LinkedIn e redes sociais.",
    active: true,
  },
  {
    id: "photo-video-organization",
    title: "Organização de fotos e vídeos institucionais",
    description: "Seleção e direção dos materiais visuais necessários.",
    active: true,
  },
  {
    id: "audiovisual-partner",
    title: "Produção audiovisual com fornecedor parceiro",
    description: "Apoio para captação profissional quando houver necessidade.",
    active: true,
  },
  {
    id: "additional-landing-page",
    title: "Landing page adicional para campanhas específicas",
    description: "Página dedicada para uma oferta, evento ou campanha.",
    active: true,
  },
  {
    id: "commercial-material",
    title: "Material comercial em PDF ou apresentação institucional",
    description: "Apoio visual para reuniões, propostas e prospecção.",
    active: true,
  },
];

export const internalDownsell = {
  name: "Implantação Essencial",
  amount: pricing.downsellInternalAmountCents,
  note:
    "Alternativa interna de contingência, usada apenas após objeção real de orçamento. Não compete com a proposta full e não aparece por padrão.",
};

export const marketComparisonItems = [
  { item: "Briefing, diagnóstico e posicionamento de marca", priceCents: 70000 },
  { item: "Design de identidade visual e logotipo", priceCents: 120000 },
  { item: "Site profissional (design + desenvolvimento responsivo)", priceCents: 280000 },
  { item: "Configurações técnicas, SSL, domínio, Analytics", priceCents: 60000 },
  { item: "Rastreamento, Tag Manager, Search Console, eventos", priceCents: 50000 },
  { item: "Assistente de pré-atendimento no site", priceCents: 80000 },
  { item: "Estrutura + lançamento inicial de Google Ads", priceCents: 120000 },
];
