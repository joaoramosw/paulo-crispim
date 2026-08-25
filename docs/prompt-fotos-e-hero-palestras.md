Você está trabalhando diretamente no projeto existente do site Paulo Crispim.

Projeto local:

`C:\Desenvolvimento\paulo-crispim`

Site de referência:

- https://www.paulocrispim.com.br/
- https://www.paulocrispim.com.br/palestras

Quero que você implemente diretamente no código uma melhoria visual baseada em fotografias reais de Paulo Crispim.

NÃO quero passar pelo OpenDesign.

NÃO quero apenas uma análise ou plano.

Quero que você:

1. analise o projeto existente;
2. identifique exatamente os componentes envolvidos;
3. implemente as alterações;
4. teste responsividade;
5. rode as validações existentes;
6. deixe o projeto compilando corretamente.

---

# OBJETIVO

Aumentar a presença humana e a percepção de autoridade do site sem reconstruir a identidade existente.

As fotografias devem ajudar a comunicar:

- liderança;
- experiência;
- autoridade;
- proximidade;
- atuação profissional;
- posicionamento como palestrante.

Não redesenhar o site inteiro.

Não transformar o projeto em um template novo.

Trabalhar sobre a implementação existente.

---

# ASSETS

Todos os arquivos estarão em:

`C:\Desenvolvimento\paulo-crispim\public\paulo-crispim\imagens`

Utilizar:

## HOME — Autoridade aplicada

Arquivo:

`MRF_6114.jpg`

URL pública:

`/paulo-crispim/imagens/MRF_6114.jpg`

Utilizar a fotografia ORIGINAL.

Não remover o fundo.

Não substituir o fundo.

---

## HOME — Trajetória aplicada

Arquivo:

`MRF_6062.jpg`

URL pública:

`/paulo-crispim/imagens/MRF_6062.jpg`

Utilizar a fotografia ORIGINAL.

Não remover o fundo.

Não substituir o fundo.

---

## PALESTRAS — Hero principal

Arquivo:

`paulo-crispim-palestrante-palco-hero.png`

URL pública:

`/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png`

Essa imagem JÁ ESTÁ EDITADA.

NÃO tente recriá-la.

NÃO remova o fundo.

NÃO altere a fotografia.

NÃO aplique filtros fortes.

NÃO tente gerar outro cenário.

Utilize o arquivo como imagem final.

---

# 1. ANALISE O PROJETO ANTES DE CODIFICAR

Primeiro examine:

- framework;
- estrutura de rotas;
- componentes;
- layout;
- sistema de estilos;
- Tailwind/CSS/CSS Modules/etc.;
- breakpoints;
- componentes de imagem;
- containers;
- tokens;
- fontes;
- cores;
- gradientes;
- espaçamentos;
- animações;
- tratamento atual de responsividade.

Identifique especificamente:

HOME:

- seção “Autoridade aplicada”;
- seção “Trajetória aplicada”.

PALESTRAS:

- Hero de `/palestras`.

Reutilize os padrões já presentes no projeto.

Não crie outra arquitetura visual paralela.

---

# 2. REGRAS GERAIS

Preservar integralmente:

- textos;
- títulos;
- descrições;
- navbar;
- footer;
- CTAs;
- URLs;
- âncoras;
- formulário;
- SEO;
- metadata;
- fontes;
- identidade visual;
- comportamento dos botões.

Não reescrever copy.

Não inventar frases.

Não alterar conteúdo para fazer a fotografia caber.

O layout deve se adaptar ao conteúdo existente, e não o contrário.

---

# 3. HOME — “AUTORIDADE APLICADA”

Localize a seção:

“Autoridade aplicada”.

Integrar:

`/paulo-crispim/imagens/MRF_6114.jpg`

Essa fotografia possui Paulo em pé, de terno bege, segurando o paletó e olhando para a câmera.

Ela deve comunicar:

- presença;
- liderança;
- segurança;
- autoridade executiva.

---

## DESKTOP

Transformar a abertura dessa seção em uma composição editorial assimétrica.

Referência aproximada:

- fotografia: 35% a 40%;
- conteúdo: 60% a 65%.

Esses números são referências, não regras matemáticas.

Adapte ao container existente.

Não colocar a fotografia simplesmente dentro de um card genérico.

Quero aparência semelhante a uma página editorial corporativa.

Pode utilizar de maneira discreta:

- border-radius já existente no projeto;
- overflow controlado;
- linha gráfica existente;
- pequeno offset vertical;
- máscara suave;
- fade muito discreto.

Não inventar elementos decorativos chamativos.

---

## FOTOGRAFIA

Preservar o fundo escuro ORIGINAL.

Não remover o fundo.

Usar preferencialmente uma proporção visual próxima de:

`4 / 5`

ou respeitar a proporção original caso produza resultado melhor.

Se utilizar `object-fit: cover`, preservar obrigatoriamente:

- cabeça;
- rosto;
- tronco;
- mãos;
- gesto com o paletó.

Nunca cortar o topo da cabeça.

Nunca fazer crop estranho nas mãos.

---

## INTEGRAÇÃO

A imagem deve parecer parte da composição, e não um JPG colocado ao lado do texto.

Se fizer sentido dentro da implementação existente, permitir pequeno deslocamento vertical da fotografia em relação ao container.

Não provocar:

- overflow horizontal;
- CLS;
- quebra de seção;
- sobreposição indevida.

---

## MOBILE

Em telas menores, utilizar preferencialmente:

1. introdução/título;
2. fotografia;
3. conteúdos de autoridade.

Imagem:

- largura disponível;
- proporção preservada;
- sem crop agressivo;
- espaçamento consistente com o design existente.

---

# 4. HOME — “TRAJETÓRIA APLICADA”

Localizar:

“Trajetória aplicada”

e a introdução associada a:

“Uma trajetória construída entre estratégia, operações, liderança e desenvolvimento de pessoas.”

Integrar:

`/paulo-crispim/imagens/MRF_6062.jpg`

Não alterar textos.

---

# OBJETIVO VISUAL

Essa fotografia deve desempenhar um papel diferente da anterior.

Ela deve funcionar como:

PAUSA EDITORIAL

entre blocos densos de conteúdo.

Não transformar a seção inteira em uma grande fotografia.

Os conteúdos de trajetória continuam sendo os protagonistas.

---

## DESKTOP

Integrar a fotografia no início da seção, junto ao conteúdo introdutório.

Referência aproximada:

- imagem: 30% a 40%;
- introdução: restante.

Depois dessa composição inicial, manter os blocos existentes da trajetória normalmente.

Não inserir a mesma fotografia novamente entre cada item.

---

## ALTERNÂNCIA

Criar ritmo visual em relação a “Autoridade aplicada”.

Se a fotografia de “Autoridade aplicada” estiver do lado esquerdo, colocar preferencialmente esta do lado direito.

Se a primeira estiver do lado direito, colocar esta do lado esquerdo.

Queremos uma sequência visual semelhante a:

imagem | conteúdo

seguida posteriormente por:

conteúdo | imagem

ou equivalente.

Não sacrificar ordem semântica para conseguir isso.

No mobile, manter uma ordem lógica no DOM.

---

## FOTOGRAFIA

Manter o fundo escuro original de:

`MRF_6062.jpg`

Não remover fundo.

Não alterar a iluminação.

Não adicionar efeitos artificiais.

O tratamento deve parecer:

- editorial;
- documental;
- profissional;
- sóbrio.

Não repetir exatamente a mesma máscara utilizada em “Autoridade aplicada”.

As duas seções devem conversar entre si, mas não parecer cópias.

---

# 5. PALESTRAS — NOVO HERO

Agora trabalhar na rota:

`/palestras`

Localizar o Hero atual.

A fotografia principal passa a ser:

`/paulo-crispim/imagens/paulo-crispim-palestrante-palco-hero.png`

---

# MUITO IMPORTANTE — A IMAGEM JÁ FOI COMPOSTA ESPECIFICAMENTE PARA O HERO

A imagem é horizontal 16:9.

Ela contém:

- grande área escura/negativa à esquerda;
- Paulo Crispim no terço direito;
- Paulo segurando um microfone;
- telão corporativo ao fundo;
- plateia ocupando a região inferior;
- contexto inequívoco de palestra.

Portanto, NÃO implementar o Hero como uma divisão rígida:

`48% texto / 52% imagem`

Essa abordagem desperdiçaria a composição da fotografia.

A própria imagem já possui espaço destinado ao conteúdo.

---

# 6. ESTRATÉGIA DO HERO NO DESKTOP

Utilizar a fotografia como elemento visual praticamente FULL-BLEED dentro do Hero.

O Hero deve aproveitar grande parte ou toda a largura disponível.

A imagem pode ser:

- background visual da seção;

OU, preferencialmente quando a arquitetura permitir:

- elemento `<img>` / componente de imagem com posicionamento absoluto;
- cobrindo a área visual do Hero;
- mantendo semântica e otimização adequadas.

Escolha a solução tecnicamente mais adequada ao framework existente.

---

# 7. POSICIONAMENTO DO CONTEÚDO

O conteúdo textual deve ocupar a área ESCURA À ESQUERDA já existente na própria fotografia.

Manter integralmente o conteúdo atual, incluindo:

“Palestras corporativas”

“Clareza, liderança e ação para equipes que precisam evoluir com direção.”

e:

- descrição atual;
- CTAs;
- links;
- comportamento dos botões.

Não colocar texto sobre Paulo.

Não colocar botão sobre Paulo.

Não cobrir o rosto.

Não cobrir o microfone.

Não cobrir a mão.

---

# 8. LARGURA DO TEXTO

No desktop, restringir o bloco de conteúdo a aproximadamente:

`max-width: 520px–620px`

ou ao valor equivalente já usado pelo projeto.

Evitar linhas excessivamente longas.

A área vazia à esquerda é grande o suficiente para suportar:

- eyebrow;
- H1;
- descrição;
- CTAs.

Usar essa vantagem.

---

# 9. ALTURA DO HERO

O Hero deve ter presença.

Não deixar a imagem achatada em uma faixa muito baixa.

Referência:

desktop:

`min-height: 650px`

a

`760px`

dependendo da navbar, tipografia e estrutura existente.

Em telas muito largas, controlar altura para não criar uma seção gigantesca.

Não aplicar números cegamente.

Ajustar visualmente.

---

# 10. IMAGEM NO DESKTOP

Prioridade máxima:

preservar a composição original da imagem.

A fotografia já foi criada para o layout.

Evitar crop desnecessário.

Preferencialmente utilizar:

`object-fit: cover`

com um `object-position` que mantenha Paulo aproximadamente no terço direito.

A referência conceitual pode ficar próxima de:

`object-position: center center`

ou

`object-position: 60% center`

mas determine o valor real visualmente.

Não mover Paulo para o centro.

A grande área negativa esquerda precisa continuar existindo.

---

# 11. PLATEIA

Preservar a região inferior da imagem.

NÃO cortar toda a plateia.

A plateia é essencial porque comunica imediatamente:

PAULO
+
PALCO
+
PÚBLICO
+
PALESTRA.

É um elemento comercial, não apenas decorativo.

---

# 12. TELÃO

O telão atrás de Paulo deve permanecer visível.

Não aplicar overlays pesados sobre ele.

Não colocar elementos HTML tentando simular conteúdo adicional no telão.

Não adicionar textos ao painel.

A fotografia já está finalizada.

---

# 13. GRADIENTE

Como a região esquerda da fotografia já é escura, provavelmente será necessário pouco tratamento adicional.

Primeiro teste a fotografia SEM overlay pesado.

Se for necessário aumentar a legibilidade do H1, aplicar somente um gradiente muito discreto.

Por exemplo, conceitualmente:

lado esquerdo:
cor de fundo atual com opacidade moderada;

centro:
redução progressiva;

lado direito:
transparente.

O gradiente não deve chegar de maneira perceptível ao rosto de Paulo.

Não transformar a imagem inteira em uma fotografia escurecida.

---

# 14. CTAs

Preservar os botões existentes.

Eles precisam permanecer claramente visíveis sobre a região esquerda.

Garantir:

- contraste;
- hover;
- focus;
- teclado;
- área clicável;
- comportamento atual.

Não criar novos CTAs.

---

# 15. MOBILE DO HERO

NÃO tentar simplesmente comprimir o desktop.

Em mobile, a largura reduzida torna inadequado manter todo o texto sobre a fotografia.

Utilizar composição empilhada.

Preferência:

1. eyebrow;
2. H1;
3. descrição;
4. CTAs;
5. fotografia.

A fotografia entra imediatamente após o bloco principal de conteúdo.

---

# 16. IMAGEM MOBILE

Usar a MESMA imagem:

`paulo-crispim-palestrante-palco-hero.png`

Mas aplicar crop específico para telas pequenas.

O enquadramento mobile deve priorizar:

- Paulo;
- microfone;
- parte do telão;
- parte da plateia.

A enorme área vazia do lado esquerdo pode ser parcialmente removida no mobile, pois o texto estará fora da imagem.

Utilizar algo próximo de:

`aspect-ratio: 4 / 3`

ou

`16 / 10`

dependendo de qual preservar melhor Paulo e a plateia.

Ajustar `object-position` especificamente para mobile.

Provavelmente será necessário deslocar o foco para a direita.

Não usar exatamente o mesmo `object-position` do desktop de forma automática.

---

# 17. TABLET

Entre aproximadamente 768px e 1024px, verificar cuidadosamente o Hero.

Não deixe acontecer uma situação intermediária ruim onde:

- texto cobre Paulo;
- Paulo fica pequeno;
- plateia desaparece;
- título fica espremido.

Se necessário, mudar para layout empilhado antes do breakpoint mobile convencional.

A decisão deve ser baseada no resultado visual, e não apenas nos breakpoints existentes.

---

# 18. PERFORMANCE DAS IMAGENS

Se o projeto for Next.js, utilizar `next/image`.

Para o Hero de `/palestras`:

- dimensões corretas;
- `sizes`;
- `priority` ou `fetchPriority="high"` quando tecnicamente apropriado;
- evitar CLS.

Para as imagens da Home abaixo da dobra:

- lazy loading;
- não utilizar priority sem necessidade.

Não carregar versões absurdamente grandes em mobile.

Se o pipeline atual já gerar WebP/AVIF automaticamente, aproveitá-lo.

Não precisa converter o arquivo manualmente se o framework já fizer otimização adequada.

---

# 19. ACESSIBILIDADE

Utilizar textos alternativos naturais.

Para:

`MRF_6114.jpg`

usar algo semelhante a:

`Paulo Crispim em retrato profissional`

Para:

`MRF_6062.jpg`

usar algo semelhante a:

`Paulo Crispim em ensaio profissional`

Para:

`paulo-crispim-palestrante-palco-hero.png`

usar:

`Paulo Crispim durante palestra corporativa diante de uma plateia`

Não fazer keyword stuffing.

Se a implementação do Hero tratar a imagem puramente como decoração e todo o conteúdo equivalente já estiver no texto da seção, avalie corretamente a semântica antes de decidir entre `alt` descritivo e imagem decorativa.

---

# 20. RESPONSIVIDADE

Testar pelo menos:

- 375px;
- 390px;
- 430px;
- 768px;
- 1024px;
- 1280px;
- 1440px;
- 1920px.

Verificar especificamente:

- rosto de Paulo;
- mãos;
- microfone;
- plateia;
- telão;
- H1;
- CTAs;
- alinhamento;
- crops;
- espaços;
- overflow.

Nenhuma largura deve gerar scroll horizontal.

---

# 21. NÃO FAZER

Não:

- redesenhar a Home;
- redesenhar `/palestras`;
- mudar todos os cards;
- trocar paleta;
- trocar tipografia;
- criar carrossel;
- adicionar parallax;
- adicionar vídeo;
- adicionar background animado;
- adicionar efeitos 3D;
- adicionar glassmorphism;
- adicionar molduras exageradas;
- colocar blur forte sobre fotografias;
- colocar texto por cima do rosto;
- adicionar novas dependências sem necessidade;
- alterar copy;
- modificar SEO existente sem motivo técnico;
- recriar a fotografia do palco em CSS;
- usar IA para modificar a imagem;
- substituir o arquivo que já foi fornecido.

---

# 22. ANIMAÇÕES

Se já existir um sistema de animação no projeto, pode utilizar entrada muito discreta.

Somente algo como:

- opacity;
- translateY pequeno;
- translateX pequeno.

Não instalar biblioteca nova apenas para animar as imagens.

Nada de zoom contínuo, parallax ou animações chamativas no Hero.

---

# 23. CÓDIGO

Manter código simples.

Não criar abstrações desnecessárias.

Se os três usos forem suficientemente diferentes, não há necessidade de criar um componente genérico complexo.

Criar componente reutilizável somente se realmente simplificar a implementação.

Preservar convenções já existentes no projeto.

---

# 24. VALIDAÇÃO

Depois de implementar:

1. executar lint;
2. executar typecheck, caso exista;
3. executar testes existentes;
4. executar build de produção;
5. corrigir erros introduzidos;
6. verificar as rotas;
7. confirmar carregamento dos assets;
8. confirmar responsividade.

Não finalizar a tarefa deixando build quebrado.

---

# 25. RESULTADO ESPERADO — HOME

A Home deve continuar parecendo o mesmo site, porém menos excessivamente textual.

“Autoridade aplicada” deve comunicar:

LIDERANÇA + PRESENÇA + EXPERIÊNCIA.

“Trajetória aplicada” deve comunicar:

EXPERIÊNCIA + REFLEXÃO + HISTÓRIA PROFISSIONAL.

As duas fotografias devem gerar ritmo editorial sem transformar a página em uma galeria.

---

# 26. RESULTADO ESPERADO — PALESTRAS

Esta é a alteração visual de maior importância.

O novo Hero precisa fazer o visitante compreender imediatamente:

“Paulo Crispim é um palestrante que sobe ao palco e fala para públicos corporativos.”

A imagem já possui exatamente a composição necessária:

- texto à esquerda;
- Paulo à direita;
- palco ao fundo;
- público na base.

A implementação deve valorizar essa composição, e não lutar contra ela.

Em desktop, a experiência deve ser próxima de uma peça publicitária/editorial de alto nível.

Em mobile, deve virar uma composição clara e funcional, com conteúdo primeiro e fotografia logo depois.

---

# 27. EXECUTE AGORA

Não me entregue somente sugestões.

Inspecione o projeto e implemente as alterações.

Ao terminar, responda objetivamente com:

- arquivos modificados;
- componentes modificados;
- assets utilizados;
- breakpoint adotado para mudança do Hero;
- tratamento desktop;
- tratamento mobile;
- resultado do lint;
- resultado do typecheck;
- resultado dos testes;
- resultado do build;
- qualquer pendência real.

Se algum arquivo de imagem não existir no caminho informado, identifique especificamente qual está faltando em vez de substituir silenciosamente por outro.