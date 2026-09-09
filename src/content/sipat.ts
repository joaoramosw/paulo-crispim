/**
 * Conteúdo da landing de SIPAT (/sipat).
 *
 * Página de conversão independente do restante do site: header, footer e CTA
 * próprios, um único destino (WhatsApp) e copy escrita para quem organiza a
 * Semana Interna de Prevenção de Acidentes do Trabalho. Os textos ficam aqui,
 * separados da composição, pelo mesmo motivo de `content/paulo-crispim.ts`:
 * ajustar copy de campanha não deveria exigir mexer em layout.
 */

export const sipatWhatsAppMessage =
  "Olá, Paulo Crispim. Gostaria de informações sobre uma palestra de SIPAT / segurança do trabalho para a minha empresa.";

export const sipatContent = {
  ctaLabel: "Solicitar disponibilidade e proposta",
  ctaNote: "Resposta rápida pelo WhatsApp oficial. Sem compromisso.",

  hero: {
    eyebrow: "Palestra para SIPAT · Segurança do Trabalho",
    // Headline curta de propósito: uma promessa e um contraste, sem subordinada.
    // A explicação de "como" fica na linha de apoio, não no H1.
    title: "A SIPAT que vira cultura, não checklist.",
    description:
      "Palestra conduzida por um engenheiro eletricista que liderou equipes onde o risco era real. Conteúdo que muda comportamento — não que passa o tempo.",
    portrait: {
      name: "Paulo Crispim",
      role: "Engenheiro eletricista · Palestrante corporativo",
    },
  },

  proof: {
    quote:
      "Não é um palestrante que fala sobre segurança. É um engenheiro eletricista que liderou equipes onde o risco era real.",
    partners: {
      eyebrow: "Parceiros",
      title: "Empresas que já confiaram no trabalho.",
      description:
        "Organizações que contaram com Paulo Crispim para gerar clareza, liderança e resultado junto às suas equipes.",
      credentialsLabel: "Por que a mensagem chega",
      credentials: [
        {
          title: "Engenheiro eletricista",
          description: "Base técnica real, aplicada a operações críticas e a segurança de quem está na ponta.",
        },
        {
          title: "Liderança em campo",
          description: "Equipes multidisciplinares em manutenção, eletrificação e operações de alta exigência.",
        },
        {
          title: "Educação corporativa",
          description: "Palestras e treinamentos para empresas, indústrias, concessionárias e órgãos públicos.",
        },
      ],
    },
  },

  problem: {
    index: "01",
    eyebrow: "O problema",
    title: "Toda empresa cumpre a SIPAT. Poucas mudam alguma coisa depois dela.",
    items: [
      "A palestra genérica que a equipe esquece já na segunda-feira.",
      "Conteúdo desconectado da realidade de quem está na operação.",
      "Ninguém muda de postura — e o risco que a SIPAT deveria reduzir continua ali.",
      "O evento vira obrigação de calendário, não investimento em pessoas.",
    ],
  },

  stage: {
    eyebrow: "Em cena",
    title: "Uma plateia que fica acordada até o fim.",
    description:
      "Presença de palco, linguagem de operação e histórias que a equipe reconhece — porque aconteceram com quem está falando.",
  },

  process: {
    index: "02",
    eyebrow: "Da experiência à atitude",
    title: "Não é palestra de prateleira. É um processo que gera movimento.",
    steps: [
      {
        title: "Entender o contexto",
        description: "Cada operação tem seu risco e sua pressão. A palestra parte da realidade da sua equipe.",
      },
      {
        title: "Conectar prática e reflexão",
        description:
          "Experiências reais de engenharia, campo e liderança traduzidas em mensagem clara e aplicável.",
      },
      {
        title: "Transformar consciência em atitude",
        description: "O objetivo é mudança de postura, responsabilidade e compromisso real com segurança.",
      },
    ],
  },

  results: {
    index: "03",
    eyebrow: "Resultados",
    title: "O que a sua organização leva junto com a palestra.",
    items: [
      "Equipe que sai engajada e consciente — não com sono.",
      "Segurança tratada como valor da cultura, não como obrigação legal.",
      "Um evento que a diretoria percebe como investimento, com retorno visível.",
      "Conteúdo personalizado para o setor e os desafios reais da sua operação.",
    ],
  },

  audience: {
    index: "04",
    eyebrow: "Para quem é",
    title: "Feita para quem leva segurança a sério.",
    description:
      "Conteúdo desenhado para eventos corporativos — SIPATs, convenções, treinamentos e encontros de segurança.",
    tags: [
      "SESMT",
      "Técnicos de segurança",
      "Engenheiros de segurança",
      "RH",
      "Gestores de evento",
      "Indústrias",
      "Concessionárias de energia",
      "Construtoras",
      "Agronegócio",
      "Órgãos públicos",
    ],
  },

  trajectory: {
    index: "05",
    eyebrow: "Trajetória",
    title: "Uma trajetória construída no campo, não só no palco.",
    paragraphs: [
      "Engenheiro eletricista com atuação em operações críticas, manutenção, eletrificação e segurança. Liderou equipes multidisciplinares em ambientes de alta exigência, onde decisão errada custa gente.",
      "Hoje leva essa vivência à educação corporativa: a mesma linguagem de quem já esteve na ponta da operação.",
    ],
  },

  faq: {
    index: "06",
    eyebrow: "Dúvidas frequentes",
    title: "Antes de falar com a gente.",
    items: [
      {
        question: "A palestra é personalizada para a minha empresa?",
        answer: "Sim. O conteúdo é contextualizado por setor, público e desafios, sem perder a essência.",
      },
      {
        question: "Presencial ou online?",
        answer: "Os dois formatos são possíveis; definimos conforme o evento.",
      },
      {
        question: "Atende a minha cidade ou estado?",
        answer: "Consulte disponibilidade para a data e o local do seu evento.",
      },
      {
        question: "Com quanta antecedência devo solicitar?",
        answer: "Quanto antes, maior a chance de garantir a data.",
      },
    ],
  },

  cta: {
    title: "A SIPAT que a equipe lembra o ano inteiro.",
    description:
      "Conte o objetivo do evento, o perfil do público e a data prevista. O atendimento avança a partir daí.",
  },
};
