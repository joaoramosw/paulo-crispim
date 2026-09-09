"use client";

import { useEffect } from "react";
import {
  trackCtaClick,
  trackEmailClick,
  trackEvent,
  trackOutboundClick,
  trackPhoneClick,
  trackWhatsAppClick,
  type WhatsAppClickType,
} from "@/lib/analytics";

// Cobre os principais CTAs comerciais do site (ver AGENTS.md/TRACKING.md):
// solicitar palestra, propostas, "fale comigo/conosco", contratação e os
// CTAs de WhatsApp que não usam o texto padrão "Falar pelo WhatsApp".
const COMMERCIAL_CTA_PATTERN =
  /solicit(ar|e)|proposta|fale (agora|comigo|conosco)|entr(ar|e) em contato|contrat(ar|e)|consultar disponibilidade|ver aplica[cç][aã]o|agend(e|a)|continuar no whatsapp|falar pelo whatsapp/i;

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 60);
}

function getCtaLocation(link: HTMLAnchorElement) {
  return link.dataset.ctaLocation || link.closest("section")?.id || "unknown";
}

function getCtaName(link: HTMLAnchorElement, text: string) {
  return link.dataset.ctaName || slugify(text) || "link";
}

export function AnalyticsInteractionTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") || "";
      if (!href) return;

      const ctaLocation = getCtaLocation(link);
      const text = link.textContent?.replace(/\s+/g, " ").trim() || "";
      const ctaName = getCtaName(link, text);
      const isCommercialCta = COMMERCIAL_CTA_PATTERN.test(text);
      const explicitEvent = link.dataset.trackEvent;

      if (href.startsWith("https://wa.me/") || href.startsWith("https://api.whatsapp.com/")) {
        const whatsappType = (link.dataset.whatsappType as WhatsAppClickType | undefined) ?? "direct";
        trackWhatsAppClick(ctaLocation, whatsappType);
        trackCtaClick({ ctaName, ctaLocation, destination: "whatsapp" });
        return;
      }

      if (href.startsWith("tel:")) {
        trackPhoneClick(ctaLocation);
        trackCtaClick({ ctaName, ctaLocation, destination: "phone" });
        return;
      }

      if (href.startsWith("mailto:")) {
        trackEmailClick(ctaLocation);
        trackCtaClick({ ctaName, ctaLocation, destination: "email" });
        return;
      }

      if (/^https?:\/\//i.test(href)) {
        try {
          const destinationUrl = new URL(href);
          if (destinationUrl.hostname !== window.location.hostname) {
            trackOutboundClick(destinationUrl.hostname, ctaLocation);
            if (isCommercialCta) trackCtaClick({ ctaName, ctaLocation, destination: destinationUrl.hostname });
            return;
          }
        } catch {
          // href externo malformado: ignora silenciosamente.
        }
      }

      if (explicitEvent) {
        trackEvent(explicitEvent, { page_path: window.location.pathname, cta_location: ctaLocation });
        return;
      }

      if (isCommercialCta) {
        trackCtaClick({ ctaName, ctaLocation, destination: href });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
