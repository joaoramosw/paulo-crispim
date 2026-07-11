import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";
import { ContactChannelCard } from "@/components/cards/ContactChannelCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealSection } from "@/components/shared/RevealSection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { contactConfig, getDefaultTalkMessage, getMailtoUrl, getWhatsAppUrl } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contato | Paulo Crispim",
  description: "Contato oficial de Paulo Crispim para solicitação de palestras corporativas, eventos, convenções e encontros de liderança.",
};

export default function ContatoPage() {
  return (
    <InternalPageLayout>
      <section className="mx-auto grid min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14 lg:py-24">
        <RevealSection>
          <SectionLabel>Contato oficial</SectionLabel>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-[#F4F7F8] sm:text-6xl lg:text-7xl">
            Solicite uma palestra com clareza, profissionalismo e baixa fricção.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#D8DEE2]">
            Preencha os dados essenciais e siga para o WhatsApp oficial com uma mensagem estruturada. Se preferir, use o e-mail como canal direto.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Falar pelo WhatsApp</MagneticButton>
            <MagneticButton href={getMailtoUrl("Solicitação de palestra")} variant="secondary">Enviar e-mail</MagneticButton>
          </div>
        </RevealSection>

        <RevealSection variant="right" delay={120}>
          <ContactForm />
        </RevealSection>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-14 lg:py-28">
        <RevealSection>
          <SectionHeader eyebrow="Canais diretos" title="Escolha o canal mais simples para iniciar a conversa." description="Os canais abaixo são os únicos contatos oficiais configurados neste site." />
        </RevealSection>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <RevealSection>
            <ContactChannelCard title="WhatsApp" value="Solicitar uma palestra" href={getWhatsAppUrl(getDefaultTalkMessage())} icon={MessageCircle} external />
          </RevealSection>
          <RevealSection delay={100}>
            <ContactChannelCard title="E-mail" value={contactConfig.email} href={getMailtoUrl("Solicitação de palestra")} icon={Mail} />
          </RevealSection>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 sm:px-10 lg:px-14 lg:pb-32">
        <RevealSection>
          <div className="border border-white/10 bg-white/[0.035] p-8 sm:p-10 lg:p-14">
            <SectionHeader title="Pronto para alinhar tema, público e contexto do evento?" description="Use o WhatsApp para iniciar a conversa com as informações principais já organizadas." />
            <div className="mt-9">
              <MagneticButton href={getWhatsAppUrl(getDefaultTalkMessage())} external>Solicitar uma palestra</MagneticButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </InternalPageLayout>
  );
}
