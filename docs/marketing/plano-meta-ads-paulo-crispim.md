# Plano Inicial de Meta Ads | Paulo Crispim

Versão: 1.0 — planejamento inicial (fase de descoberta)
Plataformas: Instagram + Facebook (Meta Ads)
Orçamento: R$ 30 a R$ 40 por dia (~R$ 900 a R$ 1.200/mês)
Objetivo comercial: gerar demanda e leads para contratação de palestras
Formato principal: vídeos curtos verticais (9:16)

---

## 1. Princípio da fase inicial

Com R$ 35/dia não dá para otimizar conversão e testar criativo ao mesmo tempo. Por isso o plano é dividido em duas fases:

| Fase | Período | Foco | Verba |
|---|---|---|---|
| Fase 1 — Aprendizado | Semanas 1 e 2 | Descobrir tema, gancho, discurso e público vencedores | 100% em teste |
| Fase 2 — Conversão | Semana 3 em diante | Escalar vencedores + remarketing + esteira de teste | 25% teste / 60% conversão / 15% remarketing |

Regra de ouro da Fase 1: **não perseguir lead barato ainda.** O objetivo é comprar informação (qual tema e qual abertura seguram atenção) e construir os públicos de remarketing, que hoje não existem.

---

## 2. Pré-requisitos (Semana 0 — antes de subir qualquer anúncio)

| Item | Status necessário |
|---|---|
| Conta de anúncios + Business Manager | Criada e verificada |
| Pixel instalado em paulocrispim.com.br | Eventos `PageView`, `ViewContent` (/palestras), `Contact` (clique WhatsApp/e-mail) |
| Domínio verificado no BM | Obrigatório para atribuição correta |
| Conversions API (CAPI) | Desejável, não bloqueante no início |
| WhatsApp Business conectado ao BM | Obrigatório para campanha de mensagens |
| Mensagem de saudação + resposta rápida no WhatsApp | Roteiro de qualificação pronto (ver seção 9) |
| Perfis @paulocrispim (IG/FB) | Bio, destaque, link e últimos posts alinhados ao posicionamento |
| Planilha de acompanhamento | Métricas da seção 11, atualizada 2x por semana |

---

## 3. Estrutura de campanhas

### Fase 1 — Semanas 1 e 2

**C1 — TESTE DE CRIATIVOS**
- Objetivo: **Engajamento → Visualizações de vídeo (ThruPlay)**
- Por quê: é o objetivo mais barato para gerar volume de visualização, ler retenção com significância estatística e alimentar os públicos de remarketing por vídeo.
- Orçamento: nível de **conjunto (ABO)**, não CBO — CBO concentraria a verba em 1 conjunto e mataria o teste.
- 4 conjuntos × R$ 8,75/dia (a R$ 35) ou × R$ 10,00/dia (a R$ 40)
- 3 vídeos por conjunto = 12 anúncios ativos
- Destino do CTA: `/palestras` com UTM (aquece o Pixel mesmo com objetivo de vídeo)

| Conjunto | Eixo temático | Público-alvo |
|---|---|---|
| CJ1 | Liderança e gestão de equipes | RH / T&D / gestores |
| CJ2 | Cultura de segurança e SIPAT | Indústria, concessionárias, SESMT |
| CJ3 | Indústria, engenharia e performance operacional | Manutenção, O&M, engenharia |
| CJ4 | Universidades e escolas técnicas | Coordenadores, diretores, professores |

### Fase 2 — Semana 3 em diante

| Campanha | Objetivo Meta | Verba/dia (R$35) | Verba/dia (R$40) | Conteúdo |
|---|---|---|---|---|
| **C1 — Esteira de teste** | Engajamento (ThruPlay) | R$ 8 | R$ 10 | 3 vídeos novos a cada 14 dias |
| **C2 — Conversão (frio)** | Vendas → Aplicativos de mensagens (WhatsApp) | R$ 20 | R$ 22 | 2 a 3 vídeos vencedores da Fase 1 |
| **C3 — Remarketing** | Vendas → Aplicativos de mensagens ou Tráfego para LP | R$ 7 | R$ 8 | Prova social + oferta direta |

Nunca mais de 3 campanhas simultâneas neste nível de verba.

### Nomenclatura padrão

```
Campanha:  C2_MSG_CONVERSAO-FRIO_2026-09
Conjunto:  CJ1_LIDERANCA_NE-CAPITAIS_28-60_INT-RH
Anúncio:   AD_CJ1_V01_GANCHO-DOR_15s
UTM:       ?utm_source=meta&utm_medium=cpc&utm_campaign=conversao-frio&utm_content=cj1-v01
```

---

## 4. Públicos e segmentações

### Base comum
- **Geografia:** Recife + Região Metropolitana, e capitais do Nordeste (João Pessoa, Maceió, Natal, Salvador, Aracaju, Fortaleza, Teresina, São Luís). Fase 2, se houver capacidade de deslocamento: incluir polos industriais de SP/MG (Campinas, Ribeirão Preto, Belo Horizonte).
- **Idade:** 28–60 (CJ2 e CJ4 podem começar em 25).
- **Gênero:** todos.
- **Idioma:** Português (Brasil).
- **Posicionamentos (Fase 1, manuais):** Reels e Stories IG/FB, Feed IG/FB, Explorar. **Excluir Audience Network e Artigos instantâneos** — queimam verba com visualização de baixa qualidade.
- **Posicionamentos (Fase 2):** Advantage+ posicionamentos liberado.

### Segmentação por conjunto (Fase 1 — detalhada e manual, para conseguir ler diferença entre públicos)

| Conjunto | Interesses / comportamentos | Cargos (dados demográficos > trabalho) |
|---|---|---|
| **CJ1 — Liderança** | Recursos Humanos, Gestão de pessoas, Treinamento e desenvolvimento, Liderança, Endomarketing, ABRH, Desenvolvimento organizacional | Gerente de RH, Diretor, Coordenador, Business Partner |
| **CJ2 — Segurança/SIPAT** | Segurança do trabalho, CIPA, SIPAT, Normas regulamentadoras, Engenharia de segurança, Medicina do trabalho | Técnico de Segurança do Trabalho, Engenheiro de Segurança, SESMT |
| **CJ3 — Indústria/Energia** | Manutenção industrial, Engenharia elétrica, Automação industrial, Lean manufacturing, Energia solar, Setor elétrico, CREA | Gerente de Manutenção, Engenheiro, Supervisor de Operações |
| **CJ4 — Educação** | Ensino superior, Institutos federais, SENAI/SENAC, Coordenação pedagógica, Engenharia (estudantes), Eventos acadêmicos | Professor, Coordenador de curso, Diretor de escola |

Regras:
- **Uma variável por conjunto.** Não misturar públicos dentro do mesmo conjunto — isso destrói a leitura do teste.
- Se um público ficar abaixo de ~300 mil pessoas, ampliar geografia antes de ampliar interesses.
- Em Fase 2, migrar para **público amplo + Advantage+ com sugestão de público** baseado no vencedor. Nesse nível de verba, o algoritmo tende a encontrar melhor do que a segmentação manual — mas só depois de existir sinal de conversão.

### Públicos de remarketing (criar no Dia 1, usar na Fase 2)

| ID | Público | Janela | Temperatura |
|---|---|---|---|
| R1 | Assistiu 25%+ de qualquer vídeo (IG + FB) | 30 dias | Morno |
| R2 | Assistiu 50%+ de qualquer vídeo | 90 dias | Quente |
| R3 | Engajou com perfil do Instagram / página do Facebook | 365 dias | Morno |
| R4 | Visitantes do site | 90 dias | Morno |
| R5 | Visitou `/palestras` ou `/contato` | 90 dias | Quente |
| R6 | Lookalike 1% de R2 | — | Frio qualificado (ativar quando R2 ≥ 1.000 pessoas) |

**Exclusões obrigatórias:**
- C2 (frio) exclui R5 e quem disparou evento `Contact` nos últimos 30 dias.
- C3 (remarketing) exclui quem já iniciou conversa no WhatsApp nos últimos 15 dias.

---

## 5. A bateria de 12 vídeos

Matriz de teste: **4 temas (entre conjuntos) × 3 tipos de abertura (dentro do conjunto)**. Isso permite descobrir, de uma só vez, qual assunto vende e qual estilo de abertura segura atenção.

Os 3 tipos de abertura, repetidos em todos os conjuntos:
- **A — Dor/provocação:** frase de choque sobre o problema do decisor.
- **B — Prova social/bastidor:** corte real de palestra, plateia visível, som ambiente.
- **C — Lista/autoridade:** "3 erros que...", "o que ninguém te contou sobre...".

| # | Conjunto | Abertura | Gancho (primeiros 3s) | Corpo | CTA final |
|---|---|---|---|---|---|
| V01 | CJ1 Liderança | A — Dor | "Promoveram o melhor técnico da equipe para líder. E a empresa perdeu os dois." | Por que competência técnica não vira liderança sozinha | "Sua liderança precisa dessa conversa? Chama no WhatsApp." |
| V02 | CJ1 Liderança | B — Prova | Corte de palestra, plateia reagindo: "Foi isso que eu falei para uma sala de líderes semana passada." | Trecho forte + reação do público | "Quer essa palestra no seu evento? Fala comigo." |
| V03 | CJ1 Liderança | C — Lista | "3 erros que todo líder técnico comete no primeiro ano de gestão." | 3 erros, 10s cada | "Tem esses erros no seu time? Me chama." |
| V04 | CJ2 Segurança | A — Dor | "Sua SIPAT vira palestra chata porque ninguém fala a língua de quem está no campo." | Segurança como cultura, não como obrigação | "Vai montar sua SIPAT? Chama no WhatsApp." |
| V05 | CJ2 Segurança | B — Prova | Corte com plateia operacional (uniforme, galpão/auditório) | Trecho sobre comportamento seguro | "Quer esse conteúdo na sua SIPAT? Fala comigo." |
| V06 | CJ2 Segurança | C — Lista | "Segurança não se resolve com cartaz na parede. Se resolve com 3 coisas." | 3 pilares de cultura prevencionista | "Solicite disponibilidade para sua SIPAT." |
| V07 | CJ3 Indústria | A — Dor | "Sua fábrica não tem problema de manutenção. Tem problema de rotina." | Disciplina operacional e confiabilidade | "Vamos falar com a sua equipe técnica? Chama no WhatsApp." |
| V08 | CJ3 Indústria | B — Prova | Bastidor em campo/planta + corte de palestra técnica | Engenharia aplicada à realidade da operação | "Leve essa palestra para sua operação." |
| V09 | CJ3 Indústria | C — Lista | "Indústria 4.0 sem disciplina operacional é só painel bonito." | Tecnologia x rotina x indicador | "Quer discutir isso com seu time? Fala comigo." |
| V10 | CJ4 Educação | A — Dor | "O aluno de engenharia se forma sabendo calcular e sem saber trabalhar." | Lacuna entre formação e mercado | "Vai organizar a semana acadêmica? Chama no WhatsApp." |
| V11 | CJ4 Educação | B — Prova | Corte em auditório universitário, sala cheia | Trecho sobre carreira e empregabilidade | "Quer essa palestra na sua instituição?" |
| V12 | CJ4 Educação | C — Lista | "3 competências que a escola técnica não ensina e o mercado de energia cobra no primeiro mês." | 3 competências | "Fale comigo sobre a data do seu evento." |

### Especificação técnica dos vídeos
- Formato **9:16**, 1080×1920, MP4.
- Duração **15 a 30 segundos**. Nenhum acima de 45s nesta bateria.
- **Legendas queimadas** em todos (a maioria assiste sem som).
- Gancho nos **primeiros 3 segundos**, sem introdução, sem vinheta, sem "olá, tudo bem?".
- Marca discreta (canto inferior, fora da safe zone dos Stories).
- CTA falado + escrito nos últimos 2 a 3 segundos.
- Recomendado: pelo menos 5 dos 12 com **imagem real de palestra com plateia** — é o principal ativo de prova social para venda de palestra.

### Cuidados de política do Meta
Evitar copy que afirme atributo pessoal do usuário ("Você é um líder despreparado?", "Sua empresa tem acidentes?"). Reprova. Reescrever em terceira pessoa: "Muitos líderes técnicos travam no primeiro ano de gestão."

---

## 6. Textos e CTAs

Estrutura de copy padrão (curta, 2 a 4 linhas):

```
[Linha 1 — dor ou contexto do decisor]
[Linha 2 — o que a palestra entrega]
[Linha 3 — CTA direto com pedido de informação]
```

Exemplo (CJ1):
> Liderança técnica não se resolve com cargo novo.
> Palestra sobre liderança, clareza e execução para equipes que trabalham sob pressão.
> Me chame no WhatsApp com a data e a cidade do seu evento.

**CTAs por fase:**

| Fase | Botão CTA | Destino |
|---|---|---|
| C1 — Teste | "Saiba mais" | `/palestras` (aquece Pixel) |
| C2 — Conversão frio | **"Enviar mensagem"** | WhatsApp |
| C3 — Remarketing quente | "Enviar mensagem" | WhatsApp |
| C3 — Remarketing morno | "Saiba mais" | `/palestras` |

---

## 7. Destino: WhatsApp ou landing page?

**Decisão para o início: WhatsApp como canal principal de conversão.**

Motivos:
- Menor atrito para o decisor corporativo, que quer saber disponibilidade e cachê, não ler página.
- O objetivo "Aplicativos de mensagens" precisa de bem menos eventos por semana para sair do aprendizado do que um objetivo de conversão no site — decisivo com R$ 20/dia.
- Palestra é venda consultiva: a qualificação acontece na conversa, não no formulário.

**A landing page continua no plano, com dois papéis:**
1. Destino da C1 (teste) e do remarketing morno — constrói o público R4/R5 e dá credibilidade antes do contato.
2. Página de apoio enviada dentro da conversa de WhatsApp (portfólio, temas, formatos).

Ajustes recomendados em `/palestras` para campanha:
- Bloco de prova social acima da dobra (foto com plateia + números: +120 palestras, +35 mil pessoas, +40 empresas).
- Botão de WhatsApp fixo com mensagem pré-preenchida por tema.
- Evento `Contact` disparado no clique.
- Tempo de carregamento abaixo de 2,5s no 4G.

Formulário instantâneo (Lead Ads) fica como **plano B**, apenas se o custo por conversa no WhatsApp passar de R$ 35 de forma consistente.

---

## 8. Remarketing (a partir da Semana 3)

| Público | Criativo | Mensagem |
|---|---|---|
| R2 + R5 (quente) | Vídeo de prova social + depoimento de contratante | Oferta direta: "Consulte disponibilidade para a data do seu evento" |
| R1 + R4 (morno) | Vídeo de bastidor / trecho mais forte de palestra | "Veja como é uma palestra do Paulo na prática" |
| R3 (engajou perfil) | Carrossel ou vídeo institucional de 30s | Autoridade: trajetória, temas, formatos |

Frequência máxima em remarketing: 4 a 5 em 7 dias. Acima disso, trocar criativo.

---

## 9. Qualificação do lead no WhatsApp

Roteiro fixo, respondido em até 1 hora útil (a velocidade de resposta é o maior fator de perda nesse funil):

1. Qual a cidade e a data prevista do evento?
2. Qual o tipo de evento (SIPAT, convenção, semana acadêmica, encontro de liderança)?
3. Qual o perfil e o tamanho aproximado do público?
4. Qual o objetivo principal do evento?
5. Formato presencial ou online?

**Lead qualificado = respondeu itens 1, 2 e 3.** Esse é o número que a campanha deve otimizar, não o total de conversas.

---

## 10. Cronograma

| Período | Ação |
|---|---|
| Semana 0 | Setup técnico (seção 2), produção dos 12 vídeos, criação dos públicos de remarketing |
| Semanas 1–2 | C1 no ar com 100% da verba. **Não mexer em nada nas primeiras 72h** (fase de aprendizado) |
| Dia 3 | Leitura de sinal apenas. Sem alterações |
| Dia 7 | Primeiro corte: pausar criativos com hook rate abaixo de 20% |
| Dia 14 | Leitura consolidada: definir tema vencedor, gancho vencedor, público vencedor |
| Semana 3 | Subir C2 (conversão) e C3 (remarketing). C1 reduzida para esteira de teste |
| Semanas 4–6 | Otimização: escalar 20–30% a cada 3–4 dias enquanto o custo por conversa se mantiver |
| A cada 14 dias | Novo lote de 3 vídeos na C1, sempre variando 1 elemento por vez |

---

## 11. Métricas principais

### Fase 1 — métricas de criativo (as únicas que importam nas 2 primeiras semanas)

| Métrica | Como calcular | Meta inicial |
|---|---|---|
| **Hook rate** | Visualizações de 3s ÷ impressões | ≥ 25% |
| **Hold rate** | ThruPlays ÷ impressões | ≥ 12% |
| Custo por ThruPlay | Gasto ÷ ThruPlays | ≤ R$ 0,10 |
| CPM | — | R$ 12 a R$ 30 |
| CTR (saída) | Cliques no link ÷ impressões | ≥ 0,8% |
| Frequência | — | ≤ 2,5 |

Critério de corte: criativo que gastou R$ 25 sem atingir hook rate de 20% é pausado.

### Fase 2 — métricas de negócio

| Métrica | Meta inicial |
|---|---|
| Conversas iniciadas no WhatsApp | 40 a 60/mês |
| **Custo por conversa iniciada** | R$ 10 a R$ 25 |
| Taxa conversa → lead qualificado | 25% a 40% |
| **Custo por lead qualificado** | ≤ R$ 70 |
| Taxa lead qualificado → proposta enviada | ≥ 40% |
| Taxa proposta → contrato | 20% a 30% |
| **CAC por palestra fechada** | Comparar com o cachê médio |

Todos os benchmarks acima são referência de partida. A partir do dia 30, os números reais da conta substituem essas metas.

### Expectativa realista com R$ 35/dia

```
R$ 1.050/mês  →  ~50 conversas iniciadas
              →  ~15 leads qualificados
              →  ~6 propostas enviadas
              →  1 a 2 palestras fechadas
```

Uma única palestra fechada tende a pagar de 1 a 3 meses de mídia. Esse é o critério real de sucesso — não CPM nem número de visualizações.

---

## 12. Rotina de gestão

| Frequência | O quê |
|---|---|
| Diário (5 min) | Verificar entrega, reprovações e saldo |
| 2x por semana | Atualizar planilha de métricas |
| Semanal | Corte de criativos ruins, ajuste de verba, leitura de públicos |
| Quinzenal | Novo lote de 3 vídeos + relatório de aprendizado |
| Mensal | Revisão de estratégia, custo por lead qualificado e decisão de escala |

**Registrar em documento o aprendizado de cada lote:** qual tema, qual abertura, qual público. Depois de 3 lotes (6 semanas), existe uma biblioteca de padrões vencedores — e é isso que faz a verba render mais do que qualquer ajuste de segmentação.

---

## 13. O que NÃO fazer nesta fase

- Não usar CBO na campanha de teste.
- Não subir mais de 3 vídeos por conjunto — a verba não sustenta a leitura.
- Não criar campanha separada por cidade neste orçamento.
- Não mexer em conjuntos dentro das primeiras 72h.
- Não rodar objetivo de conversão no site (Pixel) antes de haver volume de eventos.
- Não usar vídeo horizontal ou reaproveitar palestra completa sem edição.
- Não terceirizar a primeira resposta do WhatsApp: no início, quem responde é quem vende.
