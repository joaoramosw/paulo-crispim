import { ReactNode } from "react";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { FloatingContactButton } from "@/components/shared/FloatingContactButton";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type InternalPageLayoutProps = {
  children: ReactNode;
  backgroundIntensity?: "default" | "strong";
  printMode?: boolean;
};

export function InternalPageLayout({ children, backgroundIntensity = "default", printMode = false }: InternalPageLayoutProps) {
  return (
    <main className={`relative min-h-screen overflow-hidden bg-[#050708] text-[#F4F7F8] ${printMode ? "portfolio-print-root" : ""}`}>
      <AnimatedBackground intensity={backgroundIntensity} />
      <SiteHeader />
      <div className="relative z-10 pt-28">{children}</div>
      <SiteFooter />
      <FloatingContactButton />
    </main>
  );
}
