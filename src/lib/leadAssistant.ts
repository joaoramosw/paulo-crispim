import { contactConfig } from "@/lib/contact";

export type QuickReplyOption = {
  id: string;
  label: string;
};

export type LeadAnswerKey = "intent" | "timing" | "audience" | "format" | "location" | "name";

export type LeadAnswers = Partial<Record<LeadAnswerKey, string>>;

type OptionStep = {
  id: Exclude<LeadAnswerKey, "location" | "name">;
  type: "options";
  question: string;
  options: QuickReplyOption[];
};

type TextStep = {
  id: Extract<LeadAnswerKey, "location" | "name">;
  type: "text";
  question: string;
  placeholder: string;
  ctaLabel: string;
};

export type LeadFlowStep = OptionStep | TextStep;

export const INTENT_OPTIONS: QuickReplyOption[] = [
  { id: "corporativa", label: "Palestra corporativa" },
  { id: "lideranca", label: "Liderança e gestão" },
  { id: "seguranca", label: "Segurança / SIPAT" },
  { id: "performance", label: "Alta performance" },
  { id: "engenharia", label: "Engenharia e tecnologia" },
  { id: "evento", label: "Evento ou convenção" },
  { id: "indefinido", label: "Ainda não sei qual palestra" },
  { id: "outro", label: "Outro assunto" },
];

export const TIMING_OPTIONS: QuickReplyOption[] = [
  { id: "30dias", label: "Nos próximos 30 dias" },
  { id: "1a3meses", label: "Em 1 a 3 meses" },
  { id: "3a6meses", label: "Em 3 a 6 meses" },
  { id: "adiante", label: "Mais adiante" },
  { id: "definindo", label: "Ainda estamos definindo" },
];

export const AUDIENCE_OPTIONS: QuickReplyOption[] = [
  { id: "ate50", label: "Até 50 pessoas" },
  { id: "50a100", label: "50 a 100 pessoas" },
  { id: "100a300", label: "100 a 300 pessoas" },
  { id: "300a500", label: "300 a 500 pessoas" },
  { id: "mais500", label: "Mais de 500 pessoas" },
  { id: "naodefinido", label: "Ainda não definido" },
];

export const FORMAT_OPTIONS: QuickReplyOption[] = [
  { id: "presencial", label: "Presencial" },
  { id: "online", label: "Online" },
  { id: "hibrido", label: "Híbrido" },
  { id: "naodefinido", label: "Ainda não definido" },
];

export const LEAD_FLOW_STEPS: LeadFlowStep[] = [
  {
    id: "intent",
    type: "options",
    question: "O que você está buscando?",
    options: INTENT_OPTIONS,
  },
  {
    id: "timing",
    type: "options",
    question: "Quando vocês pretendem realizar o evento?",
    options: TIMING_OPTIONS,
  },
  {
    id: "audience",
    type: "options",
    question: "Qual o público aproximado?",
    options: AUDIENCE_OPTIONS,
  },
  {
    id: "format",
    type: "options",
    question: "Como será o evento?",
    options: FORMAT_OPTIONS,
  },
  {
    id: "location",
    type: "text",
    question: "Em qual cidade/estado será realizado?",
    placeholder: "Ex.: Belo Horizonte/MG",
    ctaLabel: "Continuar",
  },
  {
    id: "name",
    type: "text",
    question: "Como posso te chamar?",
    placeholder: "Seu nome",
    ctaLabel: "Concluir",
  },
];

export function getVisibleSteps(answers: LeadAnswers): LeadFlowStep[] {
  return LEAD_FLOW_STEPS.filter((step) => {
    if (step.id === "location") {
      return answers.format === "presencial";
    }
    return true;
  });
}

function findLabel(options: QuickReplyOption[], id?: string) {
  return options.find((option) => option.id === id)?.label;
}

function closingLine(intentId?: string) {
  switch (intentId) {
    case "seguranca":
      return "Estamos organizando uma ação de segurança/SIPAT e gostaria de entender qual palestra seria mais adequada para nosso público.";
    case "lideranca":
      return "Estamos buscando uma palestra voltada ao desenvolvimento de líderes e equipes e gostaria de conhecer as possibilidades.";
    case "indefinido":
      return "Ainda estamos definindo o tema e gostaria de uma orientação sobre qual palestra faria mais sentido para nosso evento.";
    default:
      return "Gostaria de verificar disponibilidade e receber mais informações para avançarmos com a contratação.";
  }
}

export function buildWhatsAppMessage(answers: LeadAnswers): string {
  const lines = [
    "Olá! Vim pelo site do Paulo Crispim e gostaria de informações para contratação de palestra.",
    "",
  ];

  if (answers.name) {
    lines.push(`Nome: ${answers.name}`);
  }

  const intentLabel = findLabel(INTENT_OPTIONS, answers.intent);
  if (intentLabel) {
    lines.push(`Interesse: ${intentLabel}`);
  }

  const timingLabel = findLabel(TIMING_OPTIONS, answers.timing);
  if (timingLabel) {
    lines.push(`Previsão: ${timingLabel}`);
  }

  const audienceLabel = findLabel(AUDIENCE_OPTIONS, answers.audience);
  if (audienceLabel) {
    lines.push(`Público estimado: ${audienceLabel}`);
  }

  const formatLabel = findLabel(FORMAT_OPTIONS, answers.format);
  if (formatLabel) {
    lines.push(`Formato: ${formatLabel}`);
  }

  if (answers.format === "presencial" && answers.location) {
    lines.push(`Local: ${answers.location}`);
  }

  lines.push("", closingLine(answers.intent));

  return lines.join("\n");
}

export function getLeadWhatsAppUrl(answers: LeadAnswers): string {
  const message = buildWhatsAppMessage(answers);
  return `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
