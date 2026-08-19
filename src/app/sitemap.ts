import type { MetadataRoute } from "next";

const SITE_URL = "https://paulocrispim.com.br";

// lastModified é omitido de propósito: o projeto não rastreia data real de
// alteração de conteúdo por página, e gerar `new Date()` a cada request
// forjaria um sinal de atualização falso para os crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/palestras`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contato`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/links`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
