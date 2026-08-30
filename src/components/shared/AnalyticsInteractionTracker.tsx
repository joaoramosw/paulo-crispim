"use client";

import { useEffect } from "react";
import {
  trackEmailClick,
  trackEvent,
  trackPhoneClick,
  trackProposalClick,
  trackWhatsAppClick,
} from "@/lib/analytics";

function getCtaLocation(link: HTMLAnchorElement) {
  return link.dataset.ctaLocation || link.closest("section")?.id || "unknown";
}

function isProposalText(text: string) {
  return /solicit(ar|e)|proposta|fale agora|entr(ar|e) em contato|agend(e|a)/i.test(text);
}

export function AnalyticsInteractionTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") || "";
      const ctaLocation = getCtaLocation(link);
      const text = link.textContent?.replace(/\s+/g, " ").trim() || "";
      const explicitEvent = link.dataset.trackEvent;

      if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) {
        trackWhatsAppClick(ctaLocation);
        if (isProposalText(text)) trackProposalClick(ctaLocation);
        return;
      }

      if (href.startsWith("tel:")) {
        trackPhoneClick(ctaLocation);
        return;
      }

      if (href.startsWith("mailto:")) {
        trackEmailClick(ctaLocation);
        return;
      }

      if (explicitEvent) {
        trackEvent(explicitEvent, { page_path: window.location.pathname, cta_location: ctaLocation });
        return;
      }

      if (isProposalText(text)) {
        trackProposalClick(ctaLocation);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
