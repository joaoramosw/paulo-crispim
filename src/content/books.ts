export type BookReference = {
  title: string;
  author: string;
  category: string;
  description?: string;
  coverImage?: string;
  affiliateUrl?: string;
  isAffiliateAvailable: boolean;
};

const morningMiracleAffiliateUrl = "https://www.mercadolivre.com.br/livro-o-milagre-da-manh-hal-elrod-editora-bestseller-2006/p/MLB19299565?matt_event_ts=1782931274091&matt_d2id=e82c446c-bd91-4eb6-86e3-7bc91fff56e9&matt_tracing_id=08569e7b-625e-4029-9409-2f347b0477c2#polycard_client=recommendations_home_affiliate-profile&reco_backend=item_decorator&reco_client=home_affiliate-profile&matt_tool_id=26594391&reco_item_pos=0&source=affiliate-profile&reco_backend_type=function&reco_id=6488b2d6-d7df-4dd2-b5cb-de836b9703d3&tracking_id=fd721aed-ead0-4ffd-9d24-3a07ffa83774&wid=MLB3802077845&sid=recos&c_id=/home/card-featured/element&c_uid=92af7a37-5d57-4abf-bab3-9c78a2ceb230";

export const bookReferences: BookReference[] = [
  {
    title: "Hábitos Atômicos",
    author: "James Clear",
    category: "Disciplina",
    description: "Leitura associada a consistência, rotina e melhoria contínua.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788550807560-L.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "A Psicologia Financeira",
    author: "Morgan Housel",
    category: "Comportamento",
    description: "Repertório sobre decisões, comportamento e visão de longo prazo.",
    coverImage: "/capas-livros/capa-a-psicologia-financeira.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "O Poder da Ação",
    author: "Paulo Vieira",
    category: "Ação",
    description: "Referência ligada a atitude, responsabilidade e movimento.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788545200345-L.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "O Milagre da Manhã",
    author: "Hal Elrod",
    category: "Alta performance",
    description: "Leitura sobre rotina, energia pessoal e desenvolvimento diário.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788576849940-L.jpg",
    affiliateUrl: morningMiracleAffiliateUrl,
    isAffiliateAvailable: true,
  },
  {
    title: "Como Fazer Amigos e Influenciar Pessoas",
    author: "Dale Carnegie",
    category: "Comunicação",
    description: "Repertório clássico sobre relacionamento, influência e comunicação humana.",
    coverImage: "/capas-livros/capa-como-fazer-amigos-e-influenciar-pessoas.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "Inteligência Emocional",
    author: "Daniel Goleman",
    category: "Pessoas",
    description: "Base de leitura sobre emoções, comportamento e relações no trabalho.",
    coverImage: "/capas-livros/capa-inteligencia-emocional.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "Os 7 Hábitos das Pessoas Altamente Eficazes",
    author: "Stephen Covey",
    category: "Liderança",
    description: "Leitura associada a maturidade, prioridades e eficácia pessoal.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788576840626-L.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "As Coisas que Você Só Vê Quando Desacelera",
    author: "Haemin Sunim",
    category: "Reflexão",
    description: "Referência sobre pausa, presença e leitura consciente da vida cotidiana.",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788543105291-L.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "Café com Deus Pai 2026",
    author: "Junior Rostirola",
    category: "Desenvolvimento",
    description: "Item de leitura exibido sem destaque religioso adicional ou chamada comercial.",
    coverImage: "/capas-livros/capa-cafe-com-deus-pai.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "As 21 Irrefutáveis Leis da Liderança",
    author: "John C. Maxwell",
    category: "Liderança",
    coverImage: "/capas-livros/capa-as-21-irrefutaveis-leis-da-lideranca.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "Execução: A Disciplina para Atingir Resultados",
    author: "Larry Bossidy e Ram Charan",
    category: "Execução",
    coverImage: "/capas-livros/capa-execucao-a-disciplina-para-atingir-resultados.jpg",
    isAffiliateAvailable: false,
  },
  {
    title: "Comece pelo Porquê",
    author: "Simon Sinek",
    category: "Propósito",
    coverImage: "https://covers.openlibrary.org/b/isbn/9788543106632-L.jpg",
    isAffiliateAvailable: false,
  },
];
