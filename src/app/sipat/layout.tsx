import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";

/*
  A /sipat não herda a tipografia do site (Geist): é uma landing de campanha
  com voz própria — Archivo nos títulos, Manrope no texto. As variáveis são
  aplicadas no wrapper da rota, e não no <html>, para que nenhuma outra página
  carregue essas fontes.
*/
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const TITLE = "Palestra de SIPAT | Segurança do Trabalho";
const DESCRIPTION =
  "Palestra de SIPAT conduzida por um engenheiro eletricista que liderou equipes em operações críticas. Conteúdo que muda comportamento e transforma segurança em cultura.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "palestra SIPAT",
    "palestrante SIPAT",
    "segurança do trabalho",
    "cultura de segurança",
    "semana interna de prevenção de acidentes",
    "palestra segurança do trabalho empresa",
  ],
  openGraph: {
    title: `${TITLE} | Paulo Crispim`,
    description: DESCRIPTION,
    url: "/sipat",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Paulo Crispim`,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: "/sipat",
  },
};

export default function SipatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${archivo.variable} ${manrope.variable} flex flex-1 flex-col`}>{children}</div>;
}
