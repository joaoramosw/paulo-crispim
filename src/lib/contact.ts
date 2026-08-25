/**
 * Contas do domínio próprio (paulocrispim.com.br, hospedado na Zoho), que
 * substituem o endereço de Gmail usado antes no site. A separação por assunto
 * é a definida no Manual de Acesso ao E-mail Profissional:
 *
 * - palestras@  briefing e solicitação de eventos;
 * - comercial@  proposta, cachê e contrato;
 * - principal   relacionamento direto, parceiros e contatos institucionais.
 */
export const contactEmails = {
  principal: "paulocrispim@paulocrispim.com.br",
  palestras: "palestras@paulocrispim.com.br",
  comercial: "comercial@paulocrispim.com.br",
} as const;

export const contactConfig = {
  whatsapp: "5581999659147",
  // Todo link de e-mail do site abre com o assunto "Solicitação de palestra",
  // que é exatamente o caso que o manual encaminha para a caixa palestras@.
  email: contactEmails.palestras,
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
