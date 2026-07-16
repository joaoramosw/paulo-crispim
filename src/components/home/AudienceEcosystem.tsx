"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Factory,
  GraduationCap,
  HardHat,
  Landmark,
  Lightbulb,
  LucideIcon,
  Rocket,
  School,
  Tractor,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  "escolas-tecnicas": School,
  universidades: GraduationCap,
  "profissionais-desenvolvimento": TrendingUp,
  empreendedores: Rocket,
  "concessionarias-energia": Zap,
  industrias: Factory,
  "orgaos-publicos": Landmark,
  "seguranca-trabalho": HardHat,
  concurseiros: BookOpenCheck,
  "agronegocio-infraestrutura": Tractor,
  "eventos-corporativos": CalendarCheck,
};

export function AudienceEcosystem({ contexts }: AudienceEcosystemProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3800, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((slideIndex: number) => emblaApi?.scrollTo(slideIndex), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    function onSelect() {
      setSelectedIndex(emblaApi!.selectedScrollSnap());
    }

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <RevealSection variant="scale" className="relative">
      <div className="relative overflow-hidden border border-white/10 bg-[linear-gradient(135deg,rgba(21,27,32,0.88),rgba(6,58,70,0.28))] p-5 shadow-2xl shadow-black/30 backdrop-blur-sm sm:p-6">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(244,247,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(244,247,248,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" />
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#35F06A]/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-28 left-8 h-64 w-64 rounded-full bg-[#063A46]/70 blur-3xl" />
        <AudienceConnectionLayer />

        <div className="relative z-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C8F8D2]">Públicos e contextos</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#A8B2BA]">
                Experiências pensadas para públicos que enfrentam desafios reais de liderança, pessoas e execução.
              </p>
            </div>
            <div className="flex shrink-0 gap-2" role="group" aria-label="Navegar entre públicos e contextos">
              <button
                type="button"
                onClick={scrollPrev}
                className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.035] text-[#A8B2BA] transition hover:border-[#35F06A]/40 hover:text-[#C8F8D2]"
                aria-label="Público anterior"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.035] text-[#A8B2BA] transition hover:border-[#35F06A]/40 hover:text-[#C8F8D2]"
                aria-label="Próximo público"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {contexts.map((context) => (
                <AudienceContextCard key={context.id} {...context} icon={iconMap[context.id] ?? Lightbulb} />
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Selecionar público e contexto">
            {contexts.map((context, index) => (
              <button
                key={context.id}
                type="button"
                role="tab"
                onClick={() => scrollTo(index)}
                aria-selected={index === selectedIndex}
                aria-label={`Ir para ${context.title}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === selectedIndex ? "w-6 bg-[#35F06A]" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
