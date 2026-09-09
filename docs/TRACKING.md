# Rastreamento — Paulo Crispim

Documentação do rastreamento implementado para Google Ads, GA4, Microsoft Clarity/GTM (não instalados) e Vercel Analytics. Objetivo: medir a jornada até a geração de lead sem poluir a conversão principal do Google Ads com sinais comportamentais.

## Ferramentas

| Ferramenta | Status | Observação |
| --- | --- | --- |
| Google Ads (Google Tag) | Instalado | `AW-18412361171`, carregado globalmente em `src/app/layout.tsx` via `gtag.js`. |
| GA4 | Preparado, não configurado | Sem Measurement ID real disponível. Ativa automaticamente assim que `NEXT_PUBLIC_GA_MEASUREMENT_ID` for definido (mesmo `gtag.js`, sem script adicional). |
| Google Tag Manager | Não instalado | O site usa Google Tag direto; um GTM redundante duplicaria a captura de `gclid`/Conversion Linking, que o gtag.js já faz sozinho. Não recomendado enquanto o gtag direto atender. |
| Microsoft Clarity | Não instalado | Nenhum script/ID encontrado no projeto. Não foi adicionado (fora do escopo "não instalar por instalar" sem um ID real fornecido). |
| Vercel Analytics | Instalado | `@vercel/analytics` (`<Analytics />` em `layout.tsx`). Eventos customizados de alto valor (`Lead Generated`, `WhatsApp Click`) enviados via `track()` a partir de `src/lib/analytics.ts`. |

## IDs públicos

- Google Ads: `AW-18412361171`
- Conversão principal (lead): `AW-18412361171/NI0iCOy9uegcENOr2ctE`
- GA4 Measurement ID: não definido (ver `.env.example`)

Nenhum segredo é armazenado aqui — todos os IDs acima são públicos por natureza (tags client-side).

## Arquitetura

Tracking centralizado em `src/lib/analytics.ts` — nenhuma chamada `gtag()` solta pelo projeto:

- `trackEvent` / `trackGA4Event` — evento genérico via `window.gtag`.
- `trackGoogleAdsConversion` — dispara `send_to` de uma conversão específica do Ads.
- `trackGenerateLead` — conversão principal: `generate_lead` (GA4) + conversão do Ads, em paralelo, sem bloquear o redirecionamento para o WhatsApp.
- `setEnhancedConversionUserData` — `gtag('set', 'user_data', ...)` (Enhanced Conversions), nunca envia PII como parâmetro de evento.
- `trackWhatsAppClick`, `trackPhoneClick`, `trackEmailClick`, `trackCtaClick`, `trackOutboundClick`, `trackFormStart`, `trackFormError`, `trackFaqOpen`, `trackEngagedPage`, `trackScrollDepth`, `trackLectureTopicClick`, `trackPortfolioInteraction`, `trackPageView`.

Dois componentes globais (montados em `src/app/layout.tsx`) cobrem a maior parte do site por delegação de eventos, em vez de instrumentar cada botão manualmente:

- `AnalyticsInteractionTracker` — ouve cliques em `<a>` no documento inteiro e classifica automaticamente: links `wa.me`/`api.whatsapp.com` → `whatsapp_click`; `tel:` → `phone_click`; `mailto:` → `email_click`; links externos → `outbound_click`; textos com padrão comercial ("Solicitar", "Fale conosco", "Entre em contato" etc.) → `cta_click`. Pode ser refinado com `data-cta-name`, `data-cta-location` e `data-whatsapp-type` nos links quando o texto/seção não forem suficientes.
- `PageViewTracker` — dispara `page_view` a cada navegação client-side (App Router não recarrega a página, então o `gtag` automático não veria essas trocas — por isso `send_page_view: false` no `config` e o disparo manual aqui), além de `scroll_depth` (50/75/90%) e `engaged_page` (30s) uma vez por page view, exceto nas páginas internas `/plano` e `/proposta` (fora do funil público, bloqueadas em `robots.ts`).

## Conversão principal — `generate_lead`

Dispara em dois fluxos que terminam em WhatsApp, cada um com seu próprio `form_name`:

1. **Formulário de contato** (`src/components/forms/ContactForm.tsx`, `/contato`) — `form_name: "contato_palestras"`.
2. **Assistente de palestras** (`src/components/shared/LeadAssistant.tsx`, chat flutuante presente em todas as páginas) — `form_name: "lead_assistant_palestras"`. É funcionalmente um formulário (qualifica intenção, prazo, público, formato, local e nome antes do WhatsApp), por isso também alimenta a conversão principal; guardado por uma flag em `sessionStorage` para nunca disparar duas vezes no mesmo atendimento.

Em ambos: dispara **somente** após validação concluída, imediatamente antes de abrir o WhatsApp, nunca ao carregar a página, focar um campo ou submeter com erro. Como o WhatsApp abre com `window.open`/`<a target="_blank">` — ação síncrona do próprio clique — a navegação nunca depende do retorno do `gtag`; se `gtag` estiver ausente/bloqueado por AdBlock, o WhatsApp abre normalmente e as chamadas de tracking apenas não têm efeito (todas guardadas por `typeof window.gtag === "function"`).

## Enhanced Conversions

`ContactForm` coleta e-mail e WhatsApp — antes de disparar a conversão, chama `setEnhancedConversionUserData(email, whatsapp)`, que normaliza o telefone para E.164 (`src/lib/phone.ts`, ex.: `71999999999` → `+5571999999999`) e usa exclusivamente `gtag('set', 'user_data', ...)`. Campos vazios/telefones com dígitos incompatíveis não são enviados. `LeadAssistant` não coleta e-mail/telefone, então não alimenta Enhanced Conversions.

## Eventos implementados

| Evento | Onde dispara | Ferramenta | Principal? |
| --- | --- | --- | --- |
| `generate_lead` | Formulário de contato ou assistente concluídos e válidos | GA4 + Ads | **SIM** |
| `page_view` | Toda navegação (inicial e client-side) | GA4 | não |
| `whatsapp_click` | Qualquer link `wa.me`/`api.whatsapp.com` clicado (delegado) | GA4 (+ Ads só quando `whatsapp_type: direct`) | não |
| `phone_click` | Link `tel:` clicado (nenhum encontrado no site hoje; cobertura fica pronta) | GA4 (+ Ads se label configurado) | não |
| `email_click` | Link `mailto:` clicado | GA4 (+ Ads se label configurado) | não |
| `cta_click` | CTAs comerciais (texto "Solicitar", WhatsApp, `tel:`, `mailto:` etc.) | GA4 | não |
| `outbound_click` | Link externo (ex.: afiliados de livros no portfólio) | GA4 | não |
| `form_start` | Primeira interação real no formulário/assistente | GA4 | não |
| `form_error` | Submissão do formulário de contato com validação falha | GA4 | não |
| `faq_open` | Pergunta do FAQ aberta na Home (`faq_N`) ou na landing `/sipat` (`sipat_faq_N`) — `faq_id` controlado, não o texto integral | GA4 | não |
| `engaged_page` | ~30s de permanência em página comercial (exclui `/plano`, `/proposta`) | GA4 | não |
| `scroll_depth` | 50/75/90% de rolagem por page view | GA4 | não |
| `portfolio_interaction` | Ação "Salvar Portfólio em PDF" | GA4 | não |

`lecture_topic_click` está implementado em `src/lib/analytics.ts` (`trackLectureTopicClick`) mas não tem ponto de disparo hoje — os cards de tema (`TopicCard`/`ExpertiseCard`) não linkam para um tema específico. Pronto para uso se essa navegação for adicionada.

`video_start/progress/complete` e `testimonial_interaction` não foram implementados: não há vídeo incorporado nem depoimentos/cases interativos no site hoje.

A landing `/sipat` tem um destino único (WhatsApp) repetido em cinco pontos. Todos os links carregam `data-cta-location`, então `whatsapp_click`/`cta_click` chegam ao GA4 já segmentados por posição na página: `header`, `hero`, `resultados`, `cta_final`, `sticky_bar` e `rodape`. É por esse campo que se compara qual dobra converte.

## Microconversões

`whatsapp_click`, `phone_click`, `email_click`, `cta_click`, `outbound_click`, `faq_open`, `engaged_page`, `scroll_depth`, `portfolio_interaction`, `page_view` — nenhum é a conversão principal do Google Ads. `whatsapp_click`/`phone_click`/`email_click` só disparam uma conversão do Ads quando um label dedicado for configurado (hoje nenhum está) e, no caso do WhatsApp, apenas para cliques `direct` (fora do fluxo de formulário) — para não conflitar com `generate_lead`.

## Lead qualificado (preparação futura)

Não implementado — depende de retorno comercial humano (CRM, planilha ou backend). Quando existir uma fonte de dados, `qualify_lead`/`disqualify_lead`/`working_lead`/`close_convert_lead` podem ser adicionados em `src/lib/analytics.ts` seguindo o mesmo padrão, disparados a partir de uma integração (offline conversions do Google Ads ou GA4 Measurement Protocol) — nunca fabricados no client-side.

## Consent Mode / LGPD

**Pendente.** O site não tem banner de cookies/CMP hoje. Não foi implementado um Google Consent Mode "por baixo dos panos" (ex.: negar `ad_storage`/`analytics_storage` por padrão sem um banner real) porque isso seria uma decisão jurídica travestida de decisão técnica. Recomendação: avaliar um CMP (ex.: compatível com o Google Consent Mode v2) antes de aumentar investimento em mídia paga com base em LGPD; a arquitetura de tracking atual (Google Tag direto, sem GTM) já está pronta para receber `gtag('consent', 'default', ...)`/`gtag('consent', 'update', ...)` quando essa decisão for tomada.

## UTMs e atribuição

Não foi criado um mecanismo próprio de captura de UTM/`gclid`/`gbraid`/`wbraid`: o site usa Google Tag diretamente (não GTM), e o próprio `gtag.js` já captura `gclid` e mantém o Conversion Linking automaticamente (cookie `_gcl_au`) em todas as páginas, sem necessidade de lógica adicional. Não há redirects no projeto (`next.config.ts` não define nenhum) que possam derrubar esses parâmetros. Quando o GA4 for configurado, `first_touch`/`last_touch` e UTMs de sessão passam a ser capturados automaticamente pela própria propriedade — criar uma camada própria de atribuição hoje duplicaria isso sem necessidade.

## Configurações manuais pendentes (fora do código)

1. Criar a propriedade GA4 e preencher `NEXT_PUBLIC_GA_MEASUREMENT_ID` na Vercel.
2. Confirmar no Google Ads que a conversão `AW-18412361171/NI0iCOy9uegcENOr2ctE` está marcada como principal/usada para lances, e que ela é a única otimizando a campanha.
3. Se algum label de microconversão (WhatsApp/telefone/e-mail) for criado no Ads, marcá-lo como **secundário** (não usado para lances), e preencher a variável correspondente.
4. Avaliar CMP/Consent Mode antes de escalar investimento (ver seção acima).
5. Configurar filtro de tráfego interno/de desenvolvimento no GA4 (Admin → Data Filters), em vez de qualquer lógica client-side — mais confiável que checar `NODE_ENV` no navegador do visitante.

## Testes realizados

Ver resumo entregue na conversa de implementação (build, lint, typecheck, revisão manual dos fluxos de formulário/WhatsApp/AdBlock).
