import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { InternalPageLayout } from "@/components/layout/InternalPageLayout";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { RevealSection } from "@/components/shared/RevealSection";

// Página operacional: destino de conversão do Google Ads após o envio do
// formulário de contato. Fica fora do sitemap e da navegação pública de
// propósito — o acesso legítimo é sempre o redirecionamento do ContactForm.
// O canonical é próprio (e não o herdado do layout raiz) para não emitir
// noindex apontando para a home.
export const metadata: Metadata = {
  title: "Solicitação enviada",
  description: "Confirmação de recebimento da solicitação de contato com Paulo Crispim.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/solicitacao-enviada",
  },
};

export default function SolicitacaoEnviadaPage() {
  return (
    <InternalPageLayout>
      <section className="mx-auto flex min-h-[60svh] w-full max-w-3xl flex-col items-center justify-center px-6 py-20 text-center sm:px-10 lg:px-14 lg:py-28">
        <RevealSection className="flex w-full flex-col items-center">
          <span aria-hidden="true" className="mb-6 inline-flex h-14 w-14 items-center justify-center border border-[#35F06A]/25 bg-[#35F06A]/[0.06] text-[#35F06A]">
            <CircleCheck className="h-6 w-6" />
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-[#F4F7F8] sm:text-4xl lg:text-5xl">
            Solicitação enviada com sucesso
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#D8DEE2] sm:text-lg">
            Obrigado pelo contato. Nossa equipe recebeu sua solicitação e retornará em breve.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#A8B2BA]">
            Enquanto isso, conheça mais sobre as palestras de Paulo Crispim.
          </p>

          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <MagneticButton href="/palestras">Conheça as palestras</MagneticButton>
            <MagneticButton href="/" variant="secondary">Voltar para o início</MagneticButton>
          </div>
        </RevealSection>
      </section>
    </InternalPageLayout>
  );
}
