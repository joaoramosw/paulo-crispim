export type TrackingParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18412361171";
const conversionLabels = {
  leadForm: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_LABEL,
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL,
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL,
  email: process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_LABEL,
} as const;

function getPagePath() {
  return typeof window === "undefined" ? undefined : window.location.pathname;
}

function isValidConversionLabel(label: string | undefined): label is string {
  return Boolean(label && /^[A-Za-z0-9_-]+$/.test(label) && !/^(ABC123|XXXXXXXX|CONVERSION_LABEL)$/i.test(label));
}

function warnMissingLabel(conversionName: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[analytics] Conversion label ausente para ${conversionName}.`);
  }
}

export function trackEvent(eventName: string, params: TrackingParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  try {
    window.gtag("event", eventName, Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined)));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] Falha ao enviar evento.", error);
    }
  }
}

export function trackGoogleAdsConversion(label: string | undefined, conversionName: string) {
  if (!isValidConversionLabel(label)) {
    warnMissingLabel(conversionName);
    return;
  }

  trackEvent("conversion", { send_to: `${GOOGLE_ADS_ID}/${label}` });
}

export function trackProposalClick(ctaLocation: string) {
  trackEvent("proposal_click", { page_path: getPagePath(), cta_location: ctaLocation });
}

export function trackWhatsAppClick(ctaLocation: string) {
  trackEvent("whatsapp_click", { page_path: getPagePath(), cta_location: ctaLocation });
  trackGoogleAdsConversion(conversionLabels.whatsapp, "WhatsApp");
}

export function trackPhoneClick(ctaLocation: string) {
  trackEvent("phone_click", { page_path: getPagePath(), cta_location: ctaLocation });
  trackGoogleAdsConversion(conversionLabels.phone, "telefone");
}

export function trackEmailClick(ctaLocation: string) {
  trackEvent("email_click", { page_path: getPagePath(), cta_location: ctaLocation });
  trackGoogleAdsConversion(conversionLabels.email, "e-mail");
}

export function trackLeadFormStart() {
  trackEvent("lead_form_start", { page_path: getPagePath() });
}

export function trackLeadFormSubmitSuccess() {
  trackEvent("lead_form_submit_success", { page_path: getPagePath() });
  trackGoogleAdsConversion(conversionLabels.leadForm, "Submit lead form");
}

export function trackLeadFormSubmitError(errorType: "validation" | "network" | "unknown") {
  trackEvent("lead_form_submit_error", { page_path: getPagePath(), error_type: errorType });
}
