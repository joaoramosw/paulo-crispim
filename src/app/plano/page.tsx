"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "paulo-crispim-project-tracker-v1";

type StepStatus = "pending" | "inProgress" | "done";

type StepItem = {
  id: string;
  label: string;
};

type ProjectStep = {
  id: string;
  number: number;
  title: string;
  duration: string;
  description: string;
  icon: IconName;
  items: StepItem[];
};

type TrackerState = {
  version: 1;
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  expanded: Record<string, boolean>;
};

type IconName =
  | "diagnostic"
  | "positioning"
  | "identity"
  | "content"
  | "structure"
  | "design"
  | "development"
  | "technical"
  | "tracking"
  | "ads";

const steps: ProjectStep[] = [
  {
    id: "briefing-diagnostico",
    number: 1,
    title: "Briefing e diagnóstico",
    duration: "1 a 2 dias",
    description: "Entender objetivos, público, serviços e posicionamento.",
    icon: "diagnostic",
    items: [
      { id: "objetivo-principal", label: "Confirmar objetivo principal do projeto." },
      { id: "publico-alvo", label: "Definir público-alvo." },
      { id: "servicos-oferecidos", label: "Levantar serviços oferecidos." },
      { id: "diferenciais", label: "Identificar diferenciais do Paulo Crispim." },
      {
        id: "prioridade-comercial",
        label: "Definir prioridade: palestras, mentorias ou consultoria.",
      },
    ],
  },
  {
    id: "posicionamento-marca",
    number: 2,
    title: "Posicionamento da marca",
    duration: "2 a 3 dias",
    description: "Definir mensagem central, diferenciais e foco comercial.",
    icon: "positioning",
    items: [
      { id: "frase-posicionamento", label: "Criar frase de posicionamento." },
      { id: "promessa-principal", label: "Definir promessa principal da marca." },
      { id: "tom-comunicacao", label: "Definir tom de comunicação." },
      { id: "slogan-assinatura", label: "Validar slogan ou assinatura profissional." },
      { id: "temas-autoridade", label: "Separar principais temas de autoridade." },
    ],
  },
  {
    id: "logotipo-identidade",
    number: 3,
    title: "Logotipo e identidade visual",
    duration: "4 a 7 dias",
    description: "Criar logo, cores, tipografia e estilo da marca.",
    icon: "identity",
    items: [
      { id: "referencias-visuais", label: "Definir referências visuais." },
      { id: "proposta-logotipo", label: "Criar proposta de logotipo." },
      { id: "paleta-cores", label: "Definir paleta de cores." },
      { id: "tipografia", label: "Definir tipografia." },
      { id: "versoes-fundos", label: "Criar versões para fundo claro e escuro." },
      { id: "aprovacao-identidade", label: "Aprovar identidade visual final." },
    ],
  },
  {
    id: "organizacao-conteudos",
    number: 4,
    title: "Organização dos conteúdos",
    duration: "3 a 5 dias",
    description: "Separar fotos, biografia, serviços, vídeos, depoimentos e contatos.",
    icon: "content",
    items: [
      { id: "fotos-profissionais", label: "Receber fotos profissionais." },
      { id: "mini-biografia", label: "Receber mini biografia." },
      { id: "curriculo-resumido", label: "Receber currículo resumido." },
      { id: "temas-palestras", label: "Listar temas de palestras." },
      { id: "servicos-mentoria", label: "Listar serviços de mentoria." },
      { id: "servicos-consultoria", label: "Listar serviços de consultoria." },
      { id: "videos-youtube", label: "Separar vídeos ou links do YouTube." },
      { id: "depoimentos", label: "Separar depoimentos e provas sociais." },
      { id: "contatos-redes", label: "Confirmar WhatsApp, e-mail e redes sociais." },
    ],
  },
  {
    id: "estrutura-site",
    number: 5,
    title: "Estrutura do site",
    duration: "2 a 3 dias",
    description: "Definir páginas, seções, chamadas e jornada do visitante.",
    icon: "structure",
    items: [
      { id: "mapa-site", label: "Definir mapa do site." },
      { id: "estrutura-home", label: "Criar estrutura da Home." },
      { id: "pagina-sobre", label: "Definir página Sobre." },
      { id: "pagina-palestras", label: "Definir página Palestras." },
      { id: "pagina-mentorias", label: "Definir página Mentorias." },
      { id: "pagina-consultoria", label: "Definir página Consultoria." },
      { id: "pagina-portfolio", label: "Definir página Portfólio." },
      { id: "pagina-contato", label: "Definir página Contato." },
      { id: "chamadas-acao", label: "Definir chamadas para ação." },
    ],
  },
  {
    id: "design-paginas",
    number: 6,
    title: "Design das páginas",
    duration: "5 a 7 dias",
    description: "Criar layout visual profissional e focado em conversão.",
    icon: "design",
    items: [
      { id: "layout-home", label: "Criar layout da Home." },
      { id: "layouts-internos", label: "Criar layout das páginas internas." },
      { id: "visual-celular", label: "Adaptar visual para celular." },
      { id: "identidade-aprovada", label: "Inserir identidade visual aprovada." },
      { id: "prova-social", label: "Criar seções de prova social." },
      { id: "botoes-contato", label: "Criar botões de contato." },
      { id: "hierarquia-visual", label: "Revisar hierarquia visual." },
    ],
  },
  {
    id: "desenvolvimento-site",
    number: 7,
    title: "Desenvolvimento do site",
    duration: "7 a 12 dias",
    description: "Construir o site, adaptar para celular e publicar no domínio.",
    icon: "development",
    items: [
      { id: "paginas-principais", label: "Desenvolver páginas principais." },
      { id: "responsividade", label: "Implementar responsividade." },
      { id: "componentes", label: "Criar componentes reutilizáveis." },
      { id: "formulario-whatsapp", label: "Integrar formulário ou botão de WhatsApp." },
      { id: "otimizar-imagens", label: "Otimizar imagens." },
      { id: "performance", label: "Revisar performance." },
      { id: "publicar-inicial", label: "Publicar versão inicial." },
      { id: "ajustes-finais", label: "Realizar ajustes finais." },
    ],
  },
  {
    id: "configuracoes-tecnicas",
    number: 8,
    title: "Configurações técnicas",
    duration: "1 a 2 dias",
    description: "Configurar domínio, SSL, e-mail profissional e hospedagem.",
    icon: "technical",
    items: [
      { id: "dominio", label: "Apontar domínio paulocrispim.com.br." },
      { id: "hospedagem", label: "Configurar hospedagem." },
      { id: "ssl", label: "Ativar SSL/HTTPS." },
      { id: "email-profissional", label: "Configurar e-mail profissional." },
      { id: "teste-formulario", label: "Testar formulário de contato." },
      { id: "teste-dispositivos", label: "Testar acesso em desktop e celular." },
    ],
  },
  {
    id: "rastreamento-conversoes",
    number: 9,
    title: "Rastreamento e conversões",
    duration: "1 a 2 dias",
    description: "Instalar Analytics, Tag Manager, Search Console e eventos de contato.",
    icon: "tracking",
    items: [
      { id: "ga4", label: "Configurar Google Analytics 4." },
      { id: "gtm", label: "Configurar Google Tag Manager." },
      { id: "search-console", label: "Configurar Google Search Console." },
      { id: "evento-whatsapp", label: "Criar eventos de clique no WhatsApp." },
      { id: "evento-formulario", label: "Criar evento de envio de formulário." },
      { id: "evento-email-telefone", label: "Criar evento de clique em e-mail/telefone." },
      { id: "validar-eventos", label: "Validar se os eventos estão funcionando." },
    ],
  },
  {
    id: "google-ads-otimizacao",
    number: 10,
    title: "Google Ads e otimização",
    duration: "2 a 4 dias para iniciar",
    description: "Criar campanhas, testar anúncios e acompanhar resultados.",
    icon: "ads",
    items: [
      { id: "conta-google-ads", label: "Criar conta ou acessar Google Ads." },
      { id: "objetivo-campanhas", label: "Definir objetivo das campanhas." },
      { id: "palavras-chave", label: "Definir palavras-chave." },
      { id: "anuncios-pesquisa", label: "Criar anúncios de pesquisa." },
      { id: "paginas-destino", label: "Criar páginas de destino adequadas." },
      { id: "configurar-conversoes", label: "Configurar conversões." },
      { id: "publicar-campanha", label: "Publicar campanha inicial." },
      { id: "acompanhar-resultados", label: "Acompanhar resultados." },
      { id: "ajustar-anuncios", label: "Ajustar anúncios e palavras-chave." },
    ],
  },
];

const topics = [
  "Gente e gestão",
  "Processos",
  "Liderança",
  "Engenharia",
  "Desenvolvimento profissional",
  "Consultoria para empresas",
];

const statusCopy: Record<StepStatus, string> = {
  pending: "Pendente",
  inProgress: "Em andamento",
  done: "Concluído",
};

const statusStyles: Record<
  StepStatus,
  {
    badge: string;
    card: string;
    dot: string;
    progress: string;
  }
> = {
  pending: {
    badge: "border-slate-200 bg-slate-100 text-slate-700",
    card: "border-slate-200 bg-white",
    dot: "bg-slate-300",
    progress: "bg-slate-300",
  },
  inProgress: {
    badge: "border-sky-100 bg-sky-50 text-sky-800",
    card: "border-sky-100 bg-white",
    dot: "bg-sky-300",
    progress: "bg-sky-400",
  },
  done: {
    badge: "border-emerald-200 bg-emerald-100 text-emerald-800",
    card: "border-emerald-300 bg-emerald-50/70 shadow-emerald-100",
    dot: "bg-emerald-500",
    progress: "bg-emerald-500",
  },
};

const allItemIds = steps.flatMap((step) =>
  step.items.map((item) => getItemKey(step.id, item.id)),
);

function getItemKey(stepId: string, itemId: string) {
  return `${stepId}:${itemId}`;
}

function getInitialState(): TrackerState {
  return {
    version: 1,
    checked: Object.fromEntries(allItemIds.map((itemId) => [itemId, false])),
    notes: Object.fromEntries(steps.map((step) => [step.id, ""])),
    expanded: Object.fromEntries(steps.map((step) => [step.id, true])),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeBooleanRecord(
  value: unknown,
  fallback: Record<string, boolean>,
): Record<string, boolean> {
  if (!isRecord(value)) {
    return fallback;
  }

  return Object.fromEntries(
    Object.keys(fallback).map((key) => [key, typeof value[key] === "boolean" ? value[key] : fallback[key]]),
  );
}

function normalizeStringRecord(
  value: unknown,
  fallback: Record<string, string>,
): Record<string, string> {
  if (!isRecord(value)) {
    return fallback;
  }

  return Object.fromEntries(
    Object.keys(fallback).map((key) => [key, typeof value[key] === "string" ? value[key] : fallback[key]]),
  );
}

// Esta camada pode ser trocada futuramente por Supabase mantendo o componente estável.
function loadState(): TrackerState {
  const fallback = getInitialState();

  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const savedState = window.localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return fallback;
    }

    const parsedState: unknown = JSON.parse(savedState);

    if (!isRecord(parsedState)) {
      return fallback;
    }

    return {
      version: 1,
      checked: normalizeBooleanRecord(parsedState.checked, fallback.checked),
      notes: normalizeStringRecord(parsedState.notes, fallback.notes),
      expanded: normalizeBooleanRecord(parsedState.expanded, fallback.expanded),
    };
  } catch {
    return fallback;
  }
}

function saveState(state: TrackerState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearChecklistProgress(state: TrackerState): TrackerState {
  return {
    ...state,
    checked: Object.fromEntries(allItemIds.map((itemId) => [itemId, false])),
  };
}

function clearAllState(): TrackerState {
  return getInitialState();
}

function getStepProgress(step: ProjectStep, checked: TrackerState["checked"]) {
  const total = step.items.length;
  const completed = step.items.filter((item) => checked[getItemKey(step.id, item.id)]).length;

  return {
    completed,
    total,
    percent: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}

function getStepStatus(step: ProjectStep, checked: TrackerState["checked"]): StepStatus {
  const progress = getStepProgress(step, checked);

  if (progress.completed === 0) {
    return "pending";
  }

  if (progress.completed === progress.total) {
    return "done";
  }

  return "inProgress";
}

function getOverallProgress(state: TrackerState) {
  const completedItems = allItemIds.filter((itemId) => state.checked[itemId]).length;
  const totalItems = allItemIds.length;
  const stepStatuses = steps.map((step) => getStepStatus(step, state.checked));

  return {
    completedItems,
    totalItems,
    percent: totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
    completedSteps: stepStatuses.filter((status) => status === "done").length,
    inProgressSteps: stepStatuses.filter((status) => status === "inProgress").length,
    pendingSteps: stepStatuses.filter((status) => status === "pending").length,
  };
}

export default function PlanoPage() {
  const [trackerState, setTrackerState] = useState<TrackerState>(getInitialState);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setTrackerState(loadState());
      setHasLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      saveState(trackerState);
    }
  }, [hasLoaded, trackerState]);

  const overallProgress = useMemo(() => getOverallProgress(trackerState), [trackerState]);

  function updateCheckbox(stepId: string, itemId: string, checked: boolean) {
    const itemKey = getItemKey(stepId, itemId);

    setTrackerState((currentState) => ({
      ...currentState,
      checked: {
        ...currentState.checked,
        [itemKey]: checked,
      },
    }));
  }

  function updateNotes(stepId: string, event: ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target.value;

    setTrackerState((currentState) => ({
      ...currentState,
      notes: {
        ...currentState.notes,
        [stepId]: value,
      },
    }));
  }

  function toggleChecklist(stepId: string) {
    setTrackerState((currentState) => ({
      ...currentState,
      expanded: {
        ...currentState.expanded,
        [stepId]: !currentState.expanded[stepId],
      },
    }));
  }

  function markAllComplete() {
    const shouldContinue = window.confirm(
      "Marcar todos os itens como concluídos? Essa ação vai alterar o progresso de todas as etapas.",
    );

    if (!shouldContinue) {
      return;
    }

    setTrackerState((currentState) => ({
      ...currentState,
      checked: Object.fromEntries(allItemIds.map((itemId) => [itemId, true])),
    }));
  }

  function handleClearChecklistProgress() {
    const shouldContinue = window.confirm(
      "Limpar apenas o progresso dos checklists? As observações serão mantidas.",
    );

    if (!shouldContinue) {
      return;
    }

    setTrackerState((currentState) => clearChecklistProgress(currentState));
  }

  function handleClearAllState() {
    const shouldContinue = window.confirm(
      "Apagar progresso e observações? Essa ação remove todos os dados salvos neste navegador.",
    );

    if (!shouldContinue) {
      return;
    }

    setTrackerState(clearAllState());
  }

  return (
    <main className="min-h-screen bg-[#f7faf7] font-sans text-slate-900">
      <section className="relative overflow-hidden border-b border-emerald-100 bg-[linear-gradient(135deg,#ffffff_0%,#f5faf4_48%,#edf8f1_100%)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px),radial-gradient(circle_at_20%_20%,rgba(74,222,128,0.22),transparent_24rem),radial-gradient(circle_at_82%_12%,rgba(14,165,233,0.13),transparent_20rem)] [background-size:44px_44px,44px_44px,auto,auto]"
        />
        <div className="relative mx-auto flex w-full max-w-[104rem] flex-col gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="flex max-w-4xl flex-col gap-4">
            <div className="flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Painel estratégico
            </div>
            <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              Próximas etapas do projeto{" "}
              <span className="text-emerald-700">Paulo Crispim</span>
            </h1>
            <p className="max-w-3xl text-lg font-medium leading-8 text-slate-700 sm:text-xl">
              Da construção da marca à captação de clientes com site e Google Ads
            </p>
            <p className="max-w-4xl text-base leading-7 text-slate-600">
              Paulo Crispim é engenheiro elétrico, palestrante, mentor e consultor.
              Atua com gente e gestão, processos, liderança, engenharia,
              desenvolvimento profissional e consultoria para empresas.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[104rem] px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-100 sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  Acompanhamento geral
                </p>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h2 className="text-2xl font-semibold tracking-normal text-slate-950">
                    Progresso geral: {overallProgress.percent}% concluído
                  </h2>
                  <p className="text-sm font-medium text-slate-600">
                    {overallProgress.completedItems} de {overallProgress.totalItems} itens
                    concluídos
                  </p>
                </div>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-slate-100"
                aria-label={`Progresso geral: ${overallProgress.percent}% concluído`}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={overallProgress.percent}
              >
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#86efac,#22c55e)] transition-all duration-500 ease-out"
                  style={{ width: `${overallProgress.percent}%` }}
                />
              </div>

              <dl className="grid gap-3 sm:grid-cols-3">
                <ProgressStat label="Etapas concluídas" value={overallProgress.completedSteps} tone="emerald" />
                <ProgressStat label="Etapas em andamento" value={overallProgress.inProgressSteps} tone="sky" />
                <ProgressStat label="Etapas pendentes" value={overallProgress.pendingSteps} tone="slate" />
              </dl>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={markAllComplete}
                className="min-h-11 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Marcar tudo como concluído
              </button>
              <button
                type="button"
                onClick={handleClearChecklistProgress}
                className="min-h-11 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
              >
                Limpar progresso
              </button>
              <button
                type="button"
                onClick={handleClearAllState}
                className="min-h-11 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Apagar progresso e observações
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[104rem] px-4 pb-10 sm:px-6 lg:px-8">
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-emerald-200 via-slate-200 to-transparent sm:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent lg:block"
          />
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,19rem),1fr))] min-[1680px]:grid-cols-5">
            {steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                trackerState={trackerState}
                onCheckboxChange={updateCheckbox}
                onNotesChange={updateNotes}
                onToggleChecklist={toggleChecklist}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-100 bg-white">
        <div className="mx-auto flex w-full max-w-[104rem] flex-col gap-2 px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-slate-950">
            Prazo médio total: 25 a 45 dias, dependendo da entrega dos materiais e
            aprovações.
          </p>
          <p className="text-sm leading-6 text-slate-600">
            Após a publicação, recomenda-se acompanhamento mensal para otimização de
            anúncios, conteúdo e conversões.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ProgressStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "sky" | "slate";
}) {
  const toneClass = {
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-800",
    sky: "border-sky-100 bg-sky-50 text-sky-800",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  }[tone];

  return (
    <div className={`rounded-lg border px-3 py-3 ${toneClass}`}>
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] opacity-75">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold">{value}</dd>
    </div>
  );
}

function StepCard({
  step,
  trackerState,
  onCheckboxChange,
  onNotesChange,
  onToggleChecklist,
}: {
  step: ProjectStep;
  trackerState: TrackerState;
  onCheckboxChange: (stepId: string, itemId: string, checked: boolean) => void;
  onNotesChange: (stepId: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleChecklist: (stepId: string) => void;
}) {
  const progress = getStepProgress(step, trackerState.checked);
  const status = getStepStatus(step, trackerState.checked);
  const isExpanded = trackerState.expanded[step.id];
  const styles = statusStyles[status];
  const notesId = `${step.id}-notes`;
  const checklistId = `${step.id}-checklist`;

  return (
    <article
      className={`relative z-10 flex min-h-[29rem] flex-col rounded-lg border p-4 shadow-sm transition ${styles.card}`}
    >
      <div
        aria-hidden="true"
        className={`absolute -left-[0.42rem] top-8 h-3 w-3 rounded-full ring-4 ring-[#f7faf7] sm:left-1/2 sm:-top-[0.35rem] sm:-translate-x-1/2 ${styles.dot}`}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700">
            <StepIcon name={step.icon} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-emerald-700">Etapa {step.number}</p>
            <h3 className="mt-1 text-lg font-semibold leading-6 tracking-normal text-slate-950">
              {step.title}
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-6.5 py-0.5 text-xs font-semibold text-slate-600">
          {step.duration}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.badge}`}>
          {statusCopy[status]}
        </span>
        {status === "done" ? (
          <span className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Concluído
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-800">
            {progress.completed} de {progress.total} itens concluídos
          </span>
          <span className="font-medium text-slate-500">{progress.percent}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-950">Checklist</h4>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={checklistId}
          onClick={() => onToggleChecklist(step.id)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {isExpanded ? "Recolher" : "Ver checklist"}
        </button>
      </div>

      {isExpanded ? (
        <ul id={checklistId} className="mt-3 flex flex-col gap-2.5">
          {step.items.map((item) => {
            const itemKey = getItemKey(step.id, item.id);
            const inputId = `${step.id}-${item.id}`;

            return (
              <li key={item.id} className="flex gap-2.5 rounded-lg bg-slate-50 px-3 py-2">
                <input
                  id={inputId}
                  type="checkbox"
                  checked={trackerState.checked[itemKey] ?? false}
                  onChange={(event) => onCheckboxChange(step.id, item.id, event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-emerald-600 accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                />
                <label
                  htmlFor={inputId}
                  className="cursor-pointer text-sm leading-6 text-slate-700"
                >
                  {item.label}
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <p id={checklistId} className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
          Checklist recolhido
        </p>
      )}

      <div className="mt-5 flex flex-1 flex-col justify-end">
        <label htmlFor={notesId} className="text-sm font-semibold text-slate-950">
          Observações da etapa {step.number}
        </label>
        <textarea
          id={notesId}
          value={trackerState.notes[step.id] ?? ""}
          onChange={(event) => onNotesChange(step.id, event)}
          rows={3}
          placeholder="Pendências, decisões ou comentários do projeto."
          className="mt-2 min-h-24 resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
        />
      </div>
    </article>
  );
}

function StepIcon({ name }: { name: IconName }) {
  const iconProps = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case "diagnostic":
      return (
        <svg {...iconProps}>
          <path d="M6 4h12v16H6V4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "positioning":
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "identity":
      return (
        <svg {...iconProps}>
          <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.5 12h7M12 8.5v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "content":
      return (
        <svg {...iconProps}>
          <path d="M5 4h10l4 4v12H5V4Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15 4v4h4M8 12h8M8 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "structure":
      return (
        <svg {...iconProps}>
          <path d="M12 5v14M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="6" cy="9" r="2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="18" cy="15" r="2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "design":
      return (
        <svg {...iconProps}>
          <path d="M4 17.5 15.5 6l2.5 2.5L6.5 20H4v-2.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 7.5 16.5 10M8 20h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "development":
      return (
        <svg {...iconProps}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "technical":
      return (
        <svg {...iconProps}>
          <path d="M5 8h14v9H5V8Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 8V6.5A4.5 4.5 0 0 1 16.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case "tracking":
      return (
        <svg {...iconProps}>
          <path d="M5 19V5M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="m8 15 3-4 3 2 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
          <circle cx="11" cy="11" r="1" fill="currentColor" />
          <circle cx="14" cy="13" r="1" fill="currentColor" />
          <circle cx="18" cy="7" r="1" fill="currentColor" />
        </svg>
      );
    case "ads":
      return (
        <svg {...iconProps}>
          <path d="M4 12h4l8-5v10l-8-5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 12v5M19 9.5c1.5 1.3 1.5 3.7 0 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}
