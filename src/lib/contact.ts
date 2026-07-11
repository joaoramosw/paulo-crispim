export const contactConfig = {
  whatsapp: "5581999659147",
  email: "paulocrispim2510@gmail.com",
};

export function getWhatsAppUrl(message?: string) {
  const baseUrl = `https://wa.me/${contactConfig.whatsapp}`;

  if (!message) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function getMailtoUrl(subject?: string) {
  if (!subject) {
    return `mailto:${contactConfig.email}`;
  }

  return `mailto:${contactConfig.email}?subject=${encodeURIComponent(subject)}`;
}

export function getDefaultTalkMessage() {
  return "Olá, Paulo Crispim. Gostaria de solicitar informações sobre uma palestra.";
}
