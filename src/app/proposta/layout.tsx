import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposta Estratégica Full",
  description:
    "Proposta de presença digital full para Paulo Crispim, incluindo site profissional, rastreamento, assistente de pré-atendimento, Google Ads e acompanhamento contínuo.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Proposta Estratégica Full | Paulo Crispim",
    description:
      "Proposta de presença digital full para Paulo Crispim, incluindo site profissional, rastreamento, assistente de pré-atendimento, Google Ads e acompanhamento contínuo.",
    url: "/proposta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proposta Estratégica Full | Paulo Crispim",
    description:
      "Proposta de presença digital full para Paulo Crispim, incluindo site profissional, rastreamento, assistente de pré-atendimento, Google Ads e acompanhamento contínuo.",
  },
};

export default function PropostaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
