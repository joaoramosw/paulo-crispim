import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsInteractionTracker } from "@/components/shared/AnalyticsInteractionTracker";
import { PageViewTracker } from "@/components/shared/PageViewTracker";
import { getGa4MeasurementId, getGoogleAdsId } from "@/lib/analytics";
import "./globals.css";

const SITE_URL = "https://paulocrispim.com.br";
const OG_IMAGE = "/paulo-crispim/logos/logo-quadrado-minima-paulo-crispim.png";
const GOOGLE_ADS_ID = getGoogleAdsId();
const GA4_MEASUREMENT_ID = getGa4MeasurementId();

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
    "Palestrante Corporativo · Engenheiro Eletricista · Administrador · Gestor Executivo · Professor · Influenciador Digital",
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
      "Palestrante Corporativo · Engenheiro Eletricista · Administrador · Gestor Executivo · Professor · Influenciador Digital",
    images: [
      {
        url: OG_IMAGE,
        width: 2000,
        height: 2000,
        alt: "Paulo Crispim — Palestrante e consultor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulo Crispim | Palestras, Liderança e Alta Performance",
    description:
      "Palestrante Corporativo · Engenheiro Eletricista · Administrador · Gestor Executivo · Professor · Influenciador Digital",
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/paulo-crispim/logos/logo-quadrado-minima-paulo-crispim.png",
    apple: "/paulo-crispim/logos/logo-quadrado-minima-paulo-crispim.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#050708",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Paulo Crispim",
  jobTitle: "Palestrante, Engenheiro Elétrico, Mentor e Consultor",
  description:
    "Palestrante Corporativo · Engenheiro Eletricista · Administrador · Gestor Executivo · Professor · Influenciador Digital",
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
  sameAs: [
    "https://instagram.com/paulocrispim",
    "https://tiktok.com/@paulocrispim",
    "https://youtube.com/@paulocrispim",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Paulo Crispim",
  url: SITE_URL,
  inLanguage: "pt-BR",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <AnalyticsInteractionTracker />
        <PageViewTracker />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // send_page_view desativado: navegação client-side do App Router não
            // dispara reload, então o page_view é enviado manualmente pelo
            // PageViewTracker (evita perder pageviews de rota e evita duplicidade
            // no load inicial).
            gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)}, { send_page_view: false });
            ${GA4_MEASUREMENT_ID ? `gtag('config', ${JSON.stringify(GA4_MEASUREMENT_ID)}, { send_page_view: false });` : ""}
          `}
        </Script>
      </body>
    </html>
  );
}
