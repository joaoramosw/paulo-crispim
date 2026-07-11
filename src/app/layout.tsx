import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://paulocrispim.com.br";
const OG_IMAGE = "/paulo-crispim/logos/logo quadrado minima paulo crispim.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paulo Crispim | Palestras, Liderança e Alta Performance",
    template: "%s | Paulo Crispim",
  },
  description:
    "Palestras corporativas sobre liderança, gestão, engenharia, segurança, alta performance e desenvolvimento de pessoas. Solicite uma palestra com Paulo Crispim.",
  keywords: [
    "palestras corporativas",
    "palestrante motivacional",
    "liderança",
    "gestão de pessoas",
    "engenharia elétrica",
    "segurança do trabalho",
    "alta performance",
    "desenvolvimento profissional",
    "treinamento corporativo",
    "conferencista",
    "Paulo Crispim",
  ],
  authors: [{ name: "Paulo Crispim" }],
  creator: "Paulo Crispim",
  publisher: "Paulo Crispim",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Paulo Crispim",
    title: "Paulo Crispim | Palestras, Liderança e Alta Performance",
    description:
      "Palestras corporativas sobre liderança, gestão, engenharia, segurança, alta performance e desenvolvimento de pessoas.",
    images: [
      {
        url: OG_IMAGE,
        width: 800,
        height: 800,
        alt: "Paulo Crispim — Palestrante e consultor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Crispim | Palestras, Liderança e Alta Performance",
    description:
      "Palestras corporativas sobre liderança, gestão, engenharia, segurança, alta performance e desenvolvimento de pessoas.",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/paulo-crispim/logos/paulo-crispim-logo-recomendado.svg",
    apple: "/paulo-crispim/logos/logo quadrado minima paulo crispim.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paulo Crispim",
  jobTitle: "Palestrante, Engenheiro Elétrico, Mentor e Consultor",
  description:
    "Palestras corporativas sobre liderança, gestão, engenharia, segurança, alta performance e desenvolvimento de pessoas.",
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  knowsAbout: [
    "Liderança",
    "Gestão de Pessoas",
    "Engenharia Elétrica",
    "Segurança do Trabalho",
    "Alta Performance",
    "Desenvolvimento Profissional",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
