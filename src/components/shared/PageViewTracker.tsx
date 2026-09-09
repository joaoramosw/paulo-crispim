"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEngagedPage, trackPageView, trackScrollDepth } from "@/lib/analytics";

const ENGAGEMENT_SECONDS = 30;
const SCROLL_THRESHOLDS = [50, 75, 90] as const;

// Páginas internas de planejamento/proposta comercial (bloqueadas em
// robots.ts) não fazem parte do funil público — não faz sentido medir
// engajamento/scroll de visitante ali.
const INTERNAL_PATH_PREFIXES = ["/plano", "/proposta"];

function getScrollPercent() {
  const doc = document.documentElement;
  const scrollableHeight = doc.scrollHeight - doc.clientHeight;
  if (scrollableHeight <= 0) return 100;
  return Math.round((window.scrollY / scrollableHeight) * 100);
}

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);

    if (INTERNAL_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    const reachedThresholds = new Set<(typeof SCROLL_THRESHOLDS)[number]>();

    function handleScroll() {
      const percent = getScrollPercent();
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !reachedThresholds.has(threshold)) {
          reachedThresholds.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }

    const engagementTimer = window.setTimeout(() => {
      trackEngagedPage(ENGAGEMENT_SECONDS);
    }, ENGAGEMENT_SECONDS * 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.clearTimeout(engagementTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
