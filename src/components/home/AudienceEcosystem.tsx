"use client";

import { BriefcaseBusiness, Building2, GraduationCap, Lightbulb, LucideIcon, Rocket, TrendingUp, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import { RevealSection } from "@/components/shared/RevealSection";
import { AudienceConnectionLayer } from "./AudienceConnectionLayer";
import { AudienceContextCard } from "./AudienceContextCard";

type AudienceContext = {
  id: string;
  index: string;
  title: string;
  featured?: boolean;
  description?: string;
};

type AudienceEcosystemProps = {
  contexts: AudienceContext[];
};

const iconMap: Record<string, LucideIcon> = {
  "empresas-equipes": Building2,
  "liderancas-gestores": UsersRound,
  "times-operacionais": BriefcaseBusiness,
  "instituicoes-ensino": GraduationCap,
  "profissionais-desenvolvimento": TrendingUp,
  empreendedores: Rocket,
};

export function AudienceEcosystem({ contexts }: AudienceEcosystemProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const featured = contexts.find((context) => context.featured) ?? contexts[0];
  const secondary = contexts.filter((context) => context.id !== featured.id);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    if (reduceMotion.matches || !finePointer.matches) return;

    let frame = 0;
    function handlePointerMove(event: PointerEvent) {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 10;
        setOffset({ x, y });
      });
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <RevealSection variant="scale" className="relative">
      <div className="relative min-h-[34rem] overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(21,27,32,0.88),rgba(6,58,70,0.28))] p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-6 lg:min-h-[38rem]">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(244,247,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,247,248,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} />
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#35F06A]/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-[#063A46]/70 blur-3xl" />
        <AudienceConnectionLayer />

        <div className="relative z-10">
          <div className="mb-6 border-b border-white/10 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">Públicos e contextos</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#A8B2BA]">
              Experiências pensadas para públicos que enfrentam desafios reais de liderança, pessoas e execução.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            <RevealSection delay={80} className="sm:col-span-2 lg:col-span-6">
              <AudienceContextCard {...featured} icon={iconMap[featured.id] ?? Lightbulb} />
            </RevealSection>
            {secondary.map((context, index) => (
              <RevealSection key={context.id} delay={160 + index * 70} className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <AudienceContextCard {...context} icon={iconMap[context.id] ?? Lightbulb} className="h-full" />
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
