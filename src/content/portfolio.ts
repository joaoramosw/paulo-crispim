export const portfolioIntro = {
  eyebrow: "Portfólio institucional",
  title: "Paulo Crispim transforma conhecimento técnico em resultados.",
  description:
    "Conheça a trajetória, os temas, os públicos atendidos e como as palestras podem gerar impacto em organizações, instituições de ensino e equipes de alta performance.",
};

export const portfolioAbout = {
  title: "Quem é Paulo Crispim",
  description:
    "Paulo Crispim é engenheiro elétrico, palestrante, mentor e consultor. Sua atuação conecta conhecimento técnico, liderança, processos e desenvolvimento profissional.",
  paragraphs: [
    "Paulo Crispim é Engenheiro Eletricista, Administrador de Empresa, especialista em gestão operacional, palestrante corporativo, professor, mentor, consultor e estrategista em desenvolvimento de pessoas, liderança e alta performance. Sua trajetória foi construída na prática, liderando operações complexas, formando equipes de alto desempenho e conduzindo projetos em ambientes de elevada exigência técnica e gerencial.",
    "Ao longo de sua carreira, consolidou uma visão integrada entre engenharia, gestão, inovação, comportamento humano e estratégia, transformando conhecimento técnico em soluções aplicáveis que geram resultados concretos para empresas, instituições de ensino, órgãos públicos e profissionais de diferentes segmentos.",
    "Reconhecido por sua didática dinâmica, comunicação clara e capacidade de traduzir temas complexos em conteúdos acessíveis e aplicáveis, Paulo desenvolveu uma metodologia própria de ensino baseada em experiências reais, estudos atualizados, práticas de mercado e estratégias de desenvolvimento contínuo, promovendo aprendizado que ultrapassa a teoria e produz transformação efetiva.",
    "Sua atuação combina conhecimentos em Engenharia Elétrica, Administração, Gestão de Operações, Liderança Estratégica, Segurança do Trabalho, Gestão de Pessoas, Inteligência Emocional, Cultura Organizacional, Inovação, Produtividade e Desenvolvimento Profissional, permitindo conectar diferentes áreas do conhecimento para formar profissionais, líderes e organizações mais preparados para os desafios do presente e do futuro.",
    "Como palestrante corporativo e motivacional, acredita que resultados sustentáveis são consequência da união entre conhecimento, disciplina, propósito, responsabilidade e capacidade de execução. Por isso, suas palestras unem conteúdo técnico, inspiração, estratégias práticas e exemplos vivenciados ao longo de sua carreira, proporcionando aos participantes uma experiência transformadora, capaz de despertar novas perspectivas, fortalecer competências e estimular mudanças positivas de comportamento.",
    "Na educação, atua como professor, mentor e incentivador da formação profissional, contribuindo para o desenvolvimento de estudantes, universitários, escolas técnicas, educadores, concurseiros e profissionais em transição de carreira. Defende uma educação conectada às necessidades do mercado, fundamentada na inovação, no pensamento crítico e na aplicação prática do conhecimento.",
    "Como consultor, auxilia empresas e instituições na construção de soluções voltadas para melhoria de processos, aumento da produtividade, desenvolvimento de lideranças, gestão operacional, cultura de segurança, eficiência organizacional, planejamento estratégico e excelência na execução, sempre com foco em resultados mensuráveis e sustentáveis.",
    "Sua experiência prática foi construída em grandes operações de engenharia, manutenção, infraestrutura e distribuição de energia elétrica, coordenando equipes multidisciplinares, projetos de expansão, manutenção, comissionamento, eletrificação rural, sistemas isolados de geração, segurança operacional e gestão de contratos de elevada complexidade, acumulando uma visão abrangente dos desafios técnicos e humanos presentes nas organizações.",
    "Além da experiência técnica, Paulo dedica-se continuamente à atualização profissional, acompanhando as transformações tecnológicas, as tendências da engenharia, os novos modelos de liderança, a transformação digital, a inteligência artificial aplicada aos negócios, a inovação na educação e as melhores práticas internacionais de gestão, garantindo que seus conteúdos estejam sempre alinhados às demandas contemporâneas.",
    "Sua missão é inspirar pessoas e organizações a desenvolverem competências capazes de transformar desafios em oportunidades, formando líderes mais conscientes, equipes mais preparadas e profissionais mais completos para construir resultados extraordinários.",
    "Mais do que compartilhar conhecimento, Paulo Crispim acredita em provocar mudanças de mentalidade, fortalecer o protagonismo profissional e incentivar uma cultura baseada em ética, inovação, responsabilidade, segurança, aprendizado contínuo e excelência.",
  ],
  areasOfPracticeTitle: "Áreas de atuação",
  areasOfPractice: [
    "Engenharia Elétrica e Sistemas de Energia.",
    "Liderança Estratégica e Gestão de Pessoas.",
    "Desenvolvimento de Lideranças.",
    "Alta Performance e Produtividade.",
    "Gestão Operacional e Processos.",
    "Cultura de Segurança e Comportamento Seguro.",
    "Comunicação Estratégica e Inteligência Emocional.",
    "Planejamento e Gestão de Projetos.",
    "Transformação Organizacional.",
    "Inovação e Transformação Digital.",
    "Desenvolvimento Profissional e Carreira.",
    "Formação de Educadores e Universidades.",
    "Escolas Técnicas e Capacitação Profissional.",
    "Órgãos Públicos e Gestão Institucional.",
    "Indústrias e Operações.",
    "Concessionárias de Energia.",
    "Empreendedorismo e Gestão Empresarial.",
    "Mentoria Executiva e Desenvolvimento de Talentos.",
  ],
  purposeTitle: "Propósito",
  purposeQuote:
    "Transformar conhecimento em resultados, desenvolver líderes capazes de inspirar pessoas e construir organizações mais seguras, eficientes, inovadoras e preparadas para os desafios do futuro.",
};

export const portfolioTrajectoryHeading = {
  eyebrow: "Trajetória profissional",
  title:
    "Uma trajetória construída em conhecimento, estratégia, operações, engenharia e desenvolvimento de pessoas.",
  description:
    "Esta trajetória representa uma jornada construída na prática, fortalecida pela formação acadêmica e consolidada por experiências em liderança, engenharia, gestão, educação e desenvolvimento humano. Cada etapa contribuiu para formar uma visão estratégica capaz de integrar pessoas, processos, tecnologia, inovação e resultados em ambientes de elevada complexidade.",
};

export type TrajectoryStage = {
  id: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  listTitle: string;
  items: string[];
};

export const portfolioTrajectoryStages: TrajectoryStage[] = [
  {
    id: "base-operacional-vivencia-campo",
    title: "Base Operacional e Vivência em Campo",
    subtitle: "Da execução à visão estratégica das operações.",
    paragraphs: [
      "Experiência construída diretamente em operações de campo, convivendo com equipes técnicas, manutenção, eletrificação, segurança do trabalho, logística operacional, atendimento ao cliente e gestão de atividades críticas.",
      "Essa vivência permitiu compreender profundamente a realidade operacional, desenvolver disciplina, capacidade de tomada de decisão sob pressão, resolução de problemas, cultura de segurança e foco permanente na excelência da execução.",
    ],
    listTitle: "Competências desenvolvidas",
    items: [
      "Operações de alta complexidade",
      "Segurança operacional",
      "Gestão de equipes de campo",
      "Processos e produtividade",
      "Melhoria contínua",
      "Disciplina operacional",
      "Cultura de resultado",
      "Eficiência na execução",
    ],
  },
  {
    id: "formacao-academica-tecnica-cientifica",
    title: "Formação Acadêmica, Técnica, Científica e Desenvolvimento Contínuo",
    subtitle: "Conhecimento aplicado para transformar desafios em soluções.",
    paragraphs: [
      "Formação multidisciplinar integrando Engenharia Elétrica, Administração, Gestão, desenvolvimento organizacional e educação continuada, aliando fundamentos científicos à prática profissional.",
      "O aprendizado permanente possibilitou desenvolver visão sistêmica, pensamento crítico, capacidade analítica e aplicação de metodologias modernas voltadas à inovação, eficiência operacional, sustentabilidade, gestão pública e desenvolvimento institucional.",
    ],
    listTitle: "Áreas de conhecimento",
    items: [
      "Engenharia Elétrica",
      "Administração",
      "Gestão Estratégica",
      "Pesquisa científica",
      "Metodologias educacionais",
      "Inovação tecnológica",
      "Desenvolvimento organizacional",
      "Aprendizagem contínua",
    ],
  },
  {
    id: "lideranca-estrategica-gestao-desenvolvimento",
    title: "Liderança Estratégica, Gestão e Desenvolvimento Organizacional",
    subtitle: "Liderar pessoas para transformar organizações.",
    paragraphs: [
      "Atuação no desenvolvimento de lideranças, gestão de equipes multidisciplinares, construção de culturas organizacionais de alto desempenho, gestão de contratos, indicadores, segurança comportamental, planejamento estratégico e melhoria contínua.",
      "A liderança é compreendida como um processo de desenvolvimento humano, capaz de alinhar propósito, responsabilidade, comunicação, desempenho, inovação e resultados sustentáveis.",
    ],
    listTitle: "Temáticas dominadas",
    items: [
      "Liderança inspiradora",
      "Gestão estratégica",
      "Inteligência emocional",
      "Comunicação de alto impacto",
      "Cultura organizacional",
      "Gestão por indicadores",
      "Gestão de pessoas",
      "Formação de líderes",
    ],
  },
  {
    id: "engenharia-energia-infraestrutura-inovacao",
    title: "Engenharia, Energia, Infraestrutura, Tecnologia e Inovação",
    subtitle: "Tecnologia aplicada para gerar desenvolvimento.",
    paragraphs: [
      "Experiência em projetos relacionados à engenharia, distribuição de energia, sistemas isolados, eletrificação rural, infraestrutura elétrica, energias renováveis, eficiência operacional, automação, manutenção e inovação tecnológica.",
      "Visão integrada entre engenharia, sustentabilidade, transformação digital, segurança, confiabilidade operacional e modernização de processos para organizações públicas e privadas.",
    ],
    listTitle: "Especialidades",
    items: [
      "Engenharia Elétrica",
      "Distribuição de energia",
      "Infraestrutura",
      "Sistemas isolados",
      "Energias renováveis",
      "Eficiência energética",
      "Automação",
      "Inovação tecnológica",
    ],
  },
  {
    id: "educacao-palestras-mentorias-transformacao",
    title: "Educação, Palestras, Mentorias e Transformação de Pessoas",
    subtitle: "Compartilhar conhecimento para desenvolver pessoas e organizações.",
    paragraphs: [
      "Dedicação ao desenvolvimento de profissionais, estudantes, gestores, líderes, universidades, escolas técnicas, empresas, concessionárias de energia, órgãos públicos e empreendedores por meio de palestras, treinamentos, mentorias e programas educacionais.",
      "O propósito é transformar conhecimento técnico em experiências práticas capazes de desenvolver competências, fortalecer lideranças, elevar a performance e preparar pessoas para os desafios do presente e do futuro.",
    ],
    listTitle: "Públicos atendidos",
    items: [
      "Empresas",
      "Indústrias",
      "Universidades",
      "Escolas Técnicas",
      "Concessionárias de Energia",
      "Órgãos Públicos",
      "Empreendedores",
      "Concurseiros",
      "Gestores",
      "Líderes",
      "Equipes",
      "Estudantes",
    ],
  },
  {
    id: "estrategia-futuro-transformacao-organizacional",
    title: "Estratégia, Futuro e Transformação Organizacional",
    subtitle: "Preparando pessoas e organizações para os desafios da nova economia.",
    paragraphs: [
      "Atuação voltada à construção de organizações mais inteligentes, produtivas, inovadoras e sustentáveis, integrando liderança, tecnologia, inteligência artificial, transformação digital, gestão de processos, cultura organizacional e desenvolvimento de competências para o futuro do trabalho.",
    ],
    listTitle: "Temas estratégicos",
    items: [
      "Inteligência Artificial aplicada",
      "Transformação Digital",
      "ESG",
      "Governança",
      "Gestão Pública Moderna",
      "Indústria 4.0",
      "Data Driven",
      "Inovação",
      "Produtividade",
      "Futuro do Trabalho",
      "Liderança Adaptativa",
      "Gestão da Mudança",
    ],
  },
];

export const portfolioAreasHeading = {
  eyebrow: "Formação e repertório",
  title:
    "Conhecimento técnico, liderança estratégica e desenvolvimento humano para transformar pessoas, equipes e organizações.",
  description:
    "Uma trajetória construída na engenharia elétrica, gestão operacional, liderança, docência e desenvolvimento humano, integrando experiência de campo, visão estratégica e metodologias práticas para empresas, universidades, indústrias, concessionárias de energia, órgãos públicos e profissionais que buscam alta performance.",
};

export const portfolioAreas = [
  {
    title: "Liderança Estratégica",
    description: "Clareza, responsabilidade e presença para conduzir pessoas e decisões.",
  },
  {
    title: "Gestão de Pessoas",
    description: "Comunicação e desenvolvimento de equipes em ambientes de exigência.",
  },
  {
    title: "Gestão Operacional",
    description: "Disciplina operacional, rotina, indicadores e execução consistente.",
  },
  {
    title: "Engenharia Aplicada",
    description: "Rigor técnico aplicado à realidade corporativa, ao campo e à infraestrutura.",
  },
  {
    title: "Estratégia e Inovação",
    description: "Direção, prioridades e método para transformar intenção em ação.",
  },
  {
    title: "Performance e Produtividade",
    description: "Foco, produtividade e atitude aplicados ao cotidiano profissional.",
  },
  {
    title: "Educação e Desenvolvimento Profissional",
    description: "Maturidade, postura, aprendizado contínuo e visão de futuro.",
  },
  {
    title: "Cultura de Excelência",
    description: "Compromisso, segurança, responsabilidade e entrega com consistência.",
  },
  {
    title: "Segurança e Cultura Preventiva",
    description: "Cultura de segurança, gestão de riscos, comportamento seguro e responsabilidade operacional.",
  },
  {
    title: "Educação e Formação Profissional",
    description: "Ensino, desenvolvimento de talentos, capacitação técnica e preparação para o mercado de trabalho.",
  },
];

export const portfolioIdentityThemes = [
  "Engenharia Elétrica",
  "Liderança",
  "Gestão de Pessoas",
  "Gestão Operacional",
  "Segurança do Trabalho",
  "Cultura Organizacional",
  "Comunicação Estratégica",
  "Inteligência Emocional",
  "Desenvolvimento de Líderes",
  "Formação de Equipes",
  "Planejamento Estratégico",
  "Inovação",
  "Melhoria Contínua",
  "Eficiência Operacional",
  "Gestão por Indicadores",
  "Desenvolvimento de Carreira",
  "Educação Corporativa",
  "Transformação Organizacional",
];

export const portfolioDifferentials = [
  {
    title: "Base técnica com leitura humana",
    description: "A mensagem nasce da combinação entre engenharia, campo, gestão e desenvolvimento de pessoas.",
  },
  {
    title: "Comunicação corporativa e acessível",
    description: "Conteúdo estruturado para facilitar entendimento, reflexão e aplicação no contexto do público.",
  },
  {
    title: "Foco em clareza, processo e direção",
    description: "A abordagem evita promessas genéricas e prioriza responsabilidade, método e evolução.",
  },
];

export const portfolioContactItems = [
  "Empresas e Corporações",
  "Indústrias e Concessionárias de Energia",
  "Universidades e Escolas Técnicas",
  "Órgãos Públicos e Instituições",
  "Empreendedores e Lideranças",
  "Congressos, Convenções e Eventos",
];
