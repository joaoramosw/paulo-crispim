"use client";

import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getLeadWhatsAppUrl,
  getVisibleSteps,
  type LeadAnswerKey,
  type LeadAnswers,
  type LeadFlowStep,
} from "@/lib/leadAssistant";

const STORAGE_KEY = "pc-lead-assistant-v1";

type Phase = "flow" | "summary";

type StoredState = {
  answers: LeadAnswers;
  currentIndex: number;
  phase: Phase;
};

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
}

export function LeadAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<LeadAnswers>(() => readStoredState()?.answers ?? {});
  const [currentIndex, setCurrentIndex] = useState<number>(() => readStoredState()?.currentIndex ?? 0);
  const [phase, setPhase] = useState<Phase>(() => readStoredState()?.phase ?? "flow");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const visibleSteps = useMemo(() => getVisibleSteps(answers), [answers]);
  const currentStep = visibleSteps[currentIndex];

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, currentIndex, phase }));
  }, [answers, currentIndex, phase]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusTimer = window.setTimeout(() => {
      dialog?.querySelector<HTMLElement>(focusableSelector)?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;
      const focusableItems = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector));
      const firstItem = focusableItems[0];
      const lastItem = focusableItems.at(-1);
      if (!firstItem || !lastItem) return;

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function answerAndAdvance(key: LeadAnswerKey, value: string) {
    const nextAnswers = { ...answers, [key]: value };
    setAnswers(nextAnswers);

    const nextSteps = getVisibleSteps(nextAnswers);
    if (currentIndex + 1 >= nextSteps.length) {
      setPhase("summary");
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function goBack() {
    if (phase === "summary") {
      setPhase("flow");
      setCurrentIndex(visibleSteps.length - 1);
      return;
    }
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  }

  function resetAssistant() {
    setAnswers({});
    setCurrentIndex(0);
    setPhase("flow");
    if (typeof window !== "undefined") window.sessionStorage.removeItem(STORAGE_KEY);
  }

  const canGoBack = phase === "summary" || currentIndex > 0;
  const firstName = answers.name?.trim().split(/\s+/)[0];
  const whatsappUrl = useMemo(() => getLeadWhatsAppUrl(answers), [answers]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? "Fechar assistente de palestras" : "Abrir assistente de palestras"}
        aria-expanded={isOpen}
        className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#35F06A]/45 bg-[#35F06A] text-[#050708] shadow-[0_0_34px_rgba(53,240,106,0.34)] transition hover:scale-105 hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#050708] active:scale-95 ${!isOpen ? "pc-chatbot-btn" : ""}`}
      >
        {!isOpen && (
          <span className="pointer-events-none absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500" />
          </span>
        )}
        {isOpen ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle aria-hidden="true" className="h-6 w-6" />
            <span className="pointer-events-none absolute bottom-full right-0 mb-3 w-56 translate-y-1 border border-white/10 bg-[#050708]/95 px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#C8F8D2] opacity-0 shadow-2xl shadow-black/30 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Assistente de Palestras
            </span>
          </>
        )}
      </button>

      {isOpen ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Assistente de palestras"
          className="pc-step-in fixed bottom-[max(4.75rem,calc(env(safe-area-inset-bottom)+4.75rem))] right-[max(1rem,env(safe-area-inset-right))] left-4 z-50 flex max-h-[min(38rem,calc(100svh-7rem))] w-auto flex-col overflow-hidden border border-white/10 bg-[#0A0E11]/97 shadow-2xl shadow-black/50 backdrop-blur-xl sm:left-auto sm:w-96"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#F4F7F8]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#35F06A]" />
                Assistente de Palestras
              </p>
              <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[#A8B2BA]">Atendimento rápido</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Fechar"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 text-[#A8B2BA] transition hover:border-[#35F06A]/40 hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </header>

          {phase === "flow" ? (
            <Progress current={currentIndex} total={visibleSteps.length} onBack={canGoBack ? goBack : undefined} />
          ) : null}

          <div className="flex-1 overflow-y-auto px-5 py-5">
            {phase === "flow" && currentStep ? (
              <div key={`${phase}-${currentStep.id}`} className="pc-step-in">
                {currentIndex === 0 ? (
                  <p className="mb-5 text-sm leading-6 text-[#D8DEE2]">
                    Olá! 👋 Posso te ajudar a encontrar a melhor palestra para sua empresa ou evento. São só algumas
                    perguntas rápidas e já encaminho seu atendimento pelo WhatsApp.
                  </p>
                ) : null}

                <p className="text-base font-semibold text-[#F4F7F8]">{currentStep.question}</p>

                {currentStep.type === "options" ? (
                  <div className="mt-4 flex flex-col gap-2">
                    {currentStep.options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => answerAndAdvance(currentStep.id, option.id)}
                        className="w-full border border-white/10 bg-white/[0.035] px-4 py-3 text-left text-sm font-medium text-[#D8DEE2] transition hover:border-[#35F06A]/45 hover:bg-[#35F06A]/[0.08] hover:text-[#F4F7F8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <TextStepForm
                    key={currentStep.id}
                    step={currentStep}
                    initialValue={answers[currentStep.id] ?? ""}
                    onSubmit={(value) => answerAndAdvance(currentStep.id, value)}
                  />
                )}
              </div>
            ) : null}

            {phase === "summary" ? (
              <div key="summary" className="pc-step-in">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-[#F4F7F8]">
                  <Check aria-hidden="true" className="h-4 w-4 text-[#35F06A]" />
                  Tudo certo{firstName ? `, ${firstName}` : ""}!
                </p>
                <p className="mt-3 text-sm leading-6 text-[#D8DEE2]">
                  Já organizei as principais informações do seu evento. Agora é só continuar no WhatsApp para
                  verificarmos disponibilidade e próximos passos.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#35F06A] bg-[#35F06A] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#050708] transition hover:bg-[#C8F8D2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E11]"
                >
                  Continuar no WhatsApp
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <p className="mt-3 text-xs leading-5 text-[#A8B2BA]">
                  Você não precisará preencher tudo novamente. As informações serão enviadas automaticamente.
                </p>

                <button
                  type="button"
                  onClick={resetAssistant}
                  className="mt-3 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.14em] text-[#A8B2BA] underline decoration-white/20 underline-offset-4 transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
                >
                  Iniciar novo atendimento
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function TextStepForm({
  step,
  initialValue,
  onSubmit,
}: {
  step: Extract<LeadFlowStep, { type: "text" }>;
  initialValue: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <form
      className="mt-4 flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        onSubmit(trimmed);
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={step.placeholder}
        autoFocus
        className="w-full border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-[#F4F7F8] placeholder:text-[#6B747B] focus:border-[#35F06A]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#35F06A] bg-[#35F06A] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-[#050708] transition hover:bg-[#C8F8D2] disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0E11]"
      >
        {step.ctaLabel}
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>
    </form>
  );
}

function Progress({ current, total, onBack }: { current: number; total: number; onBack?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.14em] text-[#A8B2BA] transition hover:text-[#35F06A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35F06A]"
        >
          ← Voltar
        </button>
      ) : (
        <span />
      )}
      <div className="flex items-center gap-2">
        <span className="text-[0.68rem] uppercase tracking-[0.14em] text-[#6B747B]">
          Etapa {Math.min(current + 1, total)} de {total}
        </span>
        <div className="flex items-center gap-1" aria-hidden="true">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 w-1.5 rounded-full ${index <= current ? "bg-[#35F06A]" : "bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
