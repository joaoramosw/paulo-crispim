export const linksProfile = {
  name: "Paulo Crispim",
  handle: "@paulocrispim",
  avatarSrc: "",
  socials: [
    { platform: "instagram" as const, href: "https://instagram.com/paulocrispim" },
    { platform: "tiktok" as const, href: "https://tiktok.com/@paulocrispim" },
    { platform: "youtube" as const, href: "https://youtube.com/@paulocrispim" },
  ],
  titlePrefix: "Confira meus",
  titleHighlight: "Links Úteis",
};

export type LinkCardItem = {
  title: string;
  description: string;
  href: string;
  badge?: string;
  icon: "presentation" | "book" | "calendar" | "graduation";
};

export const linkCards: LinkCardItem[] = [
  {
    title: "Solicitar uma Palestra",
    description: "Leve clareza, liderança e alta performance para o seu evento, empresa ou instituição.",
    href: "https://wa.me/5581999659147",
    badge: "NOVO",
    icon: "presentation",
  },
  {
    title: "E-book Gratuito",
    description: "Baixe o guia com os 5 pilares da liderança aplicada que uso em todas as minhas formações.",
    href: "#",
    icon: "book",
  },
];

export const featuredLink = {
  eyebrow: "Vídeo em destaque",
  title: "Meu Canal no YouTube",
  description: "Bastidores de palestras, cortes de conteúdo e aulas gratuitas sobre liderança, gestão e alta performance toda semana.",
  ctaLabel: "Inscrever-se",
  href: "https://youtube.com/@paulocrispim",
  thumbnailSrc: "",
};

export const aboutSection = {
  eyebrow: "Sobre",
  name: "Paulo Crispim",
  portraitSrc: "",
  paragraphs: [
    "Engenheiro eletricista, administrador e gestor executivo, Paulo Crispim transforma experiência técnica em conteúdo aplicado para lideranças e equipes de alta performance.",
    "Já levou sua mensagem a empresas, indústrias, universidades e órgãos públicos, conectando engenharia, liderança e comportamento humano em uma comunicação direta e sem fórmulas genéricas.",
    "Hoje dedica-se a palestras corporativas, mentorias e conteúdo digital com um único propósito: transformar conhecimento em atitude e resultado.",
  ],
  metrics: [
    { value: "+120", label: "Palestras realizadas" },
    { value: "+35 mil", label: "Pessoas impactadas" },
    { value: "+40", label: "Empresas atendidas" },
    { value: "10 anos", label: "De trajetória" },
  ],
};

export const linksFooter = {
  copyrightName: "Paulo Crispim",
  socials: linksProfile.socials,
};
