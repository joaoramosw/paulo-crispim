import { track as trackVercelEvent } from "@vercel/analytics";
import { normalizePhoneToE164BR } from "./phone";

export type TrackingParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18412361171";
// GA4 nunca é inventado: só existe se a variável de ambiente for fornecida.
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined;

// O label da conversão de lead foi fornecido explicitamente pelo Google Ads da
// conta (AW-18412361171/NI0iCOy9uegcENOr2ctE) e segue o mesmo padrão de
// fallback já usado para GOOGLE_ADS_ID: variável de ambiente prevalece, valor
// real conhecido cobre o caso de a variável ainda não estar configurada.
const conversionLabels = {
  leadForm: process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_FORM_LABEL || "NI0iCOy9uegcENOr2ctE",
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL,
  phone: process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_LABEL,
  email: process.env.NEXT_PUBLIC_GOOGLE_ADS_EMAIL_LABEL,
} as const;

export function getGoogleAdsId() {
  return GOOGLE_ADS_ID;
}

export function getGa4MeasurementId() {
  return GA4_MEASUREMENT_ID;
}

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

function debugLog(eventName: string, params: TrackingParams) {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", eventName, params);
  }
}

/** Envia um evento para o gtag (Google Ads + GA4, quando configurado). */
export function trackEvent(eventName: string, params: TrackingParams = {}) {
  debugLog(eventName, params);

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

// Mesmo transporte de trackEvent — alias para deixar explícito, nos pontos de
// chamada, quando o evento existe primariamente para alimentar o GA4.
export const trackGA4Event = trackEvent;

function trackVercelHighValueEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  try {
    trackVercelEvent(name, params);
  } catch {
    // Vercel Analytics não instalado/carregado (ex.: fora da Vercel): ignora.
  }
}

export function trackGoogleAdsConversion(label: string | undefined, conversionName: string, params: TrackingParams = {}) {
  if (!isValidConversionLabel(label)) {
    warnMissingLabel(conversionName);
    return;
  }

  trackEvent("conversion", { send_to: `${GOOGLE_ADS_ID}/${label}`, ...params });
}

/**
 * Enhanced Conversions: define e-mail/telefone via o mecanismo oficial
 * `gtag('set', 'user_data', ...)`. Nunca envia esses dados como parâmetro de
 * evento do GA4 — só passam por este canal, e só quando presentes.
 */
export function setEnhancedConversionUserData(email?: string, phone?: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const normalizedPhone = normalizePhoneToE164BR(phone);
  const userData: Record<string, string> = {};
  if (email?.trim()) userData.email = email.trim();
  if (normalizedPhone) userData.phone_number = normalizedPhone;

  if (Object.keys(userData).length === 0) return;

  try {
    window.gtag("set", "user_data", userData);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[analytics] Falha ao definir user_data (Enhanced Conversions).", error);
    }
  }
}

/** Conversão principal do site: dispara a conversão do Google Ads para o lead. */
function reportGoogleAdsLeadConversion() {
  trackGoogleAdsConversion(conversionLabels.leadForm, "generate_lead", { value: 1.0, currency: "BRL" });
}

/**
 * Dispara a conversão de geração de lead: generate_lead no GA4 + conversão
 * principal do Google Ads. Chamar SOMENTE após validação concluída e envio
 * realmente efetivado — nunca ao carregar a página, focar o formulário ou
 * clicar com erros pendentes. Nenhuma das chamadas aqui bloqueia a navegação
 * para o WhatsApp: `window.gtag` é sempre fire-and-forget.
 */
export function trackGenerateLead(params: { formName: string; leadInterest?: string }) {
  trackEvent("generate_lead", {
    form_name: params.formName,
    lead_interest: params.leadInterest,
    page_location: typeof window === "undefined" ? undefined : window.location.href,
  });
  reportGoogleAdsLeadConversion();
  trackVercelHighValueEvent("Lead Generated", { form_name: params.formName });
}

export type WhatsAppClickType = "direct" | "after_form";

/**
 * `direct`: clique em botão de WhatsApp sem passar por um formulário/fluxo de
 * qualificação — microconversão secundária, dispara o label de conversão
 * dedicado do Ads (se configurado).
 * `after_form`: WhatsApp aberto imediatamente após um generate_lead já
 * registrado (ContactForm/LeadAssistant) — não deve gerar uma segunda
 * conversão do Ads, para não conflitar com a conversão principal.
 */
export function trackWhatsAppClick(placement: string, type: WhatsAppClickType = "direct") {
  trackEvent("whatsapp_click", { page_path: getPagePath(), placement, whatsapp_type: type });

  if (type === "direct") {
    trackGoogleAdsConversion(conversionLabels.whatsapp, "WhatsApp");
    trackVercelHighValueEvent("WhatsApp Click", { placement });
  }
}

export function trackPhoneClick(placement: string) {
  trackEvent("phone_click", { page_path: getPagePath(), placement });
  trackGoogleAdsConversion(conversionLabels.phone, "telefone");
}

export function trackEmailClick(placement: string) {
  trackEvent("email_click", { page_path: getPagePath(), placement });
  trackGoogleAdsConversion(conversionLabels.email, "e-mail");
}

export function trackCtaClick(params: { ctaName: string; ctaLocation: string; destination: string }) {
  trackEvent("cta_click", {
    cta_name: params.ctaName,
    cta_location: params.ctaLocation,
    destination: params.destination,
    page_path: getPagePath(),
  });
}

export function trackOutboundClick(destinationDomain: string, linkLocation: string) {
  trackEvent("outbound_click", { destination_domain: destinationDomain, link_location: linkLocation, page_path: getPagePath() });
}

export function trackFormStart(formName: string) {
  trackEvent("form_start", { form_name: formName, page_path: getPagePath() });
}

export function trackFormError(params: { formName: string; fieldName: string; errorType: string }) {
  trackEvent("form_error", { form_name: params.formName, field_name: params.fieldName, error_type: params.errorType });
}

export function trackFaqOpen(params: { faqId: string; faqPosition: number }) {
  trackEvent("faq_open", { faq_id: params.faqId, faq_position: params.faqPosition, page_path: getPagePath() });
}

export function trackEngagedPage(engagementSeconds = 30) {
  trackEvent("engaged_page", { page_path: getPagePath(), engagement_seconds: engagementSeconds });
}

export function trackScrollDepth(percentScrolled: 50 | 75 | 90) {
  trackEvent("scroll_depth", { percent_scrolled: percentScrolled, page_path: getPagePath() });
}

export function trackLectureTopicClick(params: { topicSlug: string; action: string }) {
  trackEvent("lecture_topic_click", { topic_slug: params.topicSlug, action: params.action, page_path: getPagePath() });
}

export function trackPortfolioInteraction(action: string) {
  trackEvent("portfolio_interaction", { action, page_path: getPagePath() });
}

export function trackPageView(pagePath: string) {
  trackEvent("page_view", {
    page_path: pagePath,
    page_title: typeof document === "undefined" ? undefined : document.title,
    page_location: typeof window === "undefined" ? undefined : window.location.href,
  });
}
