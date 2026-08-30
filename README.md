# Paulo Crispim — Site institucional

Site institucional do palestrante **Paulo Crispim** (engenheiro eletricista, administrador, gestor executivo e palestrante corporativo). Construído em Next.js (App Router) com Tailwind CSS, focado em apresentar palestras, portfólio e canais de contato, com forte trabalho de identidade visual, SEO e conversão.

Produção: **https://paulocrispim.com.br**

## Variáveis de ambiente

Para produção, configure na Vercel a variável pública da Google Tag do Google Ads:

```text
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-18412361171
```

O projeto mantém o ID informado como fallback para preservar o funcionamento local quando a variável ainda não estiver definida. O identificador é público e não é um segredo.

Os labels de conversão são opcionais e devem ser preenchidos somente com os valores reais copiados do Google Ads. Eles permanecem vazios no `.env.example` para evitar conversões incorretas.

---

## ⚠️ Antes de mexer no código

Este projeto está no **Next.js 16**, uma versão recente cujas APIs e convenções podem divergir do que você (ou uma IA) já conhece de projetos Next mais antigos. Antes de implementar algo que dependa de uma API específica do framework, confira a documentação local em:

```
node_modules/next/dist/docs/
```

Isso evita reintroduzir padrões depreciados (ex.: APIs antigas de `Image`, `Metadata`, roteamento etc.).

---

## Stack técnica

| Camada | Tecnologia |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| UI | [React 19](https://react.dev/) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com/) (config via CSS, sem `tailwind.config.js`) |
| Linguagem | TypeScript |
| Ícones | [lucide-react](https://lucide.dev/) |
| Carrossel | [embla-carousel-react](https://www.embla-carousel.com/) |
| Lint | ESLint (`eslint-config-next`) |
| Deploy | Vercel (padrão Next.js) |

Não há banco de dados nem backend próprio: o site é estático/prerenderizado, com conteúdo mantido em arquivos TypeScript (`src/content/*`) e envio de contato feito via link direto para WhatsApp/e-mail (sem formulário com backend).

---

## Como rodar localmente

Pré-requisito: Node.js 20+ (o projeto usa `@types/node` v20; Next 16 requer Node atualizado).

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build   # build de produção (também roda o type-check do TypeScript)
npm run start   # sobe o build de produção localmente
npm run lint    # ESLint
```

> Se já existir um `next dev` rodando fora do WSL/terminal atual (ex.: direto no Windows), o Next detecta e evita subir uma segunda instância na mesma porta — nesse caso, use a instância já ativa em vez de tentar forçar outra.

---

## Estrutura do projeto

```
src/
├── app/                     # Rotas (App Router)
│   ├── page.tsx             # Home
│   ├── palestras/           # Página de palestras corporativas
│   ├── portfolio/           # Portfólio institucional (com modo impressão)
│   ├── contato/             # Contato (WhatsApp / e-mail)
│   ├── links/                # Mini-landing "link in bio" (bento grid)
│   ├── plano/                # Painel interno de acompanhamento do projeto (não indexado)
│   ├── proposta/             # Proposta comercial enviada ao cliente (não indexado)
│   ├── layout.tsx           # Layout raiz, metadata global, fontes
│   ├── sitemap.ts / robots.ts
│   └── globals.css          # Tema Tailwind v4 (tokens, cores, fontes)
│
├── components/
│   ├── layout/               # Header, Footer, wrapper de páginas internas
│   ├── home/                 # Seções específicas da Home
│   ├── portfolio/             # Seções específicas do Portfólio
│   ├── links/                 # Componentes da mini-landing de links
│   ├── cards/                 # Cards reutilizáveis (destaque, tema, contato, livro...)
│   ├── forms/                  # Formulário de contato
│   └── shared/                 # Primitivos usados em várias páginas (botões, reveal on scroll, labels de seção, fundo animado)
│
├── content/                  # "CMS" do site: todo o texto/dados vive aqui, separado da UI
│   ├── paulo-crispim.ts       # Conteúdo da Home (hero, credenciais, temas, trajetória...)
│   ├── palestras.ts           # Conteúdo da página de Palestras
│   ├── portfolio.ts           # Conteúdo do Portfólio
│   ├── books.ts                # Curadoria de livros (com link de afiliado opcional)
│   └── links.ts                 # Conteúdo da página /links
│
└── lib/
    ├── contact.ts             # Helpers de WhatsApp/e-mail (número, mensagens padrão)
    └── partners.ts             # Lê logos de parceiros direto de public/parceiros-logos

public/
├── paulo-crispim/            # Fotos, logos e identidade visual oficiais
├── parceiros-logos/           # Logos de parceiros/clientes (lidos dinamicamente por lib/partners.ts)
└── capas-livros/               # Capas para a curadoria de livros
```

### Convenção de conteúdo

A regra do projeto é **separar texto de layout**: qualquer copy (títulos, descrições, listas) deve morar em `src/content/*.ts`, tipado, e ser importado pelos componentes/páginas — nunca hardcoded direto no JSX das páginas de produto. Isso facilita revisão de texto sem mexer em layout e vice-versa.

---

## Páginas e seu propósito

| Rota | Indexada? | O que é |
| --- | --- | --- |
| `/` | ✅ | Home — hero, credenciais, parceiros, palestras, públicos-alvo, temas, trajetória, abordagem, CTA de contato |
| `/palestras` | ✅ | Página comercial focada em palestras corporativas (proposta de valor, temas, formatos) |
| `/portfolio` | ✅ | Portfólio institucional (bio, trajetória, áreas de atuação, repertório de leitura, contato) — com botão de impressão/exportação |
| `/contato` | ✅ | Formulário que monta a mensagem e redireciona para WhatsApp, ou botão de e-mail direto |
| `/links` | — | Mini-landing "link in bio" estilo bento grid, para uso em bio de redes sociais |
| `/plano` | ❌ (`robots.ts`) | Painel interno de acompanhamento das etapas do projeto (uso do time/dev, com progresso salvo em `localStorage`) |
| `/proposta` | ❌ (`robots.ts` + `robots: noindex` na própria página) | Proposta comercial estruturada, enviada ao cliente — não é conteúdo do site público |

`sitemap.ts` e `robots.ts` já refletem essa distinção — `/plano` e `/proposta` são deliberadamente excluídas da indexação.

---

## Identidade visual

O padrão visual "core" do site (Home, Palestras, Portfólio, Contato) é:

- Fundo escuro quase preto (`#050708`), com gradientes/campos decorativos radiais em `AnimatedBackground`.
- Acento verde `#35F06A` para CTAs, bordas de destaque e ícones.
- Cards com bordas retas (sem `rounded`), `border-white/10`, fundo translúcido (`bg-white/[0.035]`).
- Tipografia sem serifa (Geist), títulos com `tracking-tight`.
- Espaçamento em grid de 8px: seções usam `py-14 lg:py-20`, cards `p-6`, topo de página `pt-24 lg:pt-28`.

A página `/links` é intencionalmente uma identidade visual **separada** (glassmorphism, `rounded-2xl`, verde `#00FF66`), pensada como mini-landing de bio de rede social — não deve ser usada como referência para as demais páginas.

Componentes de UI compartilhados (botões, labels de seção, cabeçalhos de seção, reveal-on-scroll) ficam em `src/components/shared/` e devem ser reaproveitados antes de criar variações novas.

---

## Contato / conversão

Não há backend de formulário: `src/lib/contact.ts` centraliza o número de WhatsApp e o e-mail oficiais, e gera URLs (`wa.me`, `mailto:`) com mensagem pré-preenchida. Qualquer alteração de canal oficial (número, e-mail, mensagem padrão) deve ser feita **só nesse arquivo**.

---

## Deploy

Projeto pensado para deploy na Vercel (build padrão do Next.js, sem configuração de servidor customizada). `metadataBase`, Open Graph e Twitter cards já apontam para `https://paulocrispim.com.br` em `src/app/layout.tsx` — atualize essa constante se o domínio mudar.
