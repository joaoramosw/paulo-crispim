import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel do Projeto",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlanoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
