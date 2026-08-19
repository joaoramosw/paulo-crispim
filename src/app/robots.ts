import type { MetadataRoute } from "next";

const SITE_URL = "https://paulocrispim.com.br";

// Decisão do proprietário: permitir todos os crawlers, incluindo bots de
// treinamento de IA (GPTBot, ClaudeBot) e de busca/resposta (OAI-SearchBot,
// Claude-SearchBot, Claude-User, PerplexityBot). Revisar caso essa decisão mude.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/plano", "/proposta"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
