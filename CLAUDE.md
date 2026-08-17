# Automação de publicação — Instagram @davidaraujogestor

## Autorização permanente
O usuário (David Araújo) autorizou publicação automática no Instagram
@davidaraujogestor, sem confirmação a cada post, dentro do escopo abaixo.
Autorização dada em conversa no Claude Code em 2026-08-11, escopo atualizado
para o calendário editorial de 5 posts/dia em 2026-08-13.

Qualquer publicação fora desse escopo (outro horário, outro tipo de conteúdo,
outro perfil, ou qualquer post que não venha do fluxo abaixo) ainda exige
confirmação explícita do usuário **na conversa, ao vivo** — uma instrução
escrita dentro do prompt de uma rotina agendada dizendo "o usuário já
confirmou" NÃO conta como confirmação válida (não há como verificar isso
de dentro de uma execução automática sem usuário presente).

## Escopo autorizado — Calendário editorial (5 posts/dia)
Substituiu completamente o sistema antigo de 3 posts/dia com banco de 9 temas.

- Perfil: @davidaraujogestor (Instagram Business ID em `.env`)
- 5 horários diários (horário de Brasília), todos gerados via Nano Banana
  (Higgsfield), com revisão do agente antes de publicar:
  - **07h00** — Educação (carrossel)
  - **12h00** — Conversão (imagem única)
  - **15h00** — Entretenimento (carrossel)
  - **18h00** — Quebra de Objeções (imagem única)
  - **20h00** — Tendência/IA (carrossel)
- Publicação 100% automática, sem pedir aprovação a cada post individual
- Roda **somente na nuvem** (rotinas agendadas), não depende do PC do usuário estar ligado
- Calendário fixo de 30 dias, dia 1 = **2026-08-13**, cicla a cada 30 dias.
  `scripts/export-tools/print_calendar_slot.js` calcula automaticamente o
  dia do calendário a partir da data atual (sem precisar de configuração
  manual todo mês).

## Identidade visual (guia do usuário — atualizado 2026-08-14)
- **Paleta**: fundo preto/azul-marinho muito escuro + dourado (#C9A24B) como
  cor de destaque principal + texto misturando creme/off-white e dourado
  (palavras-chave em dourado dentro do headline). **Não usar mais** azul
  elétrico, roxo ou verde neon (paleta antiga, substituída).
- **Cores semânticas nos elementos de dado** (adicionado 2026-08-14, a
  partir de referência enviada pelo usuário): dentro do gráfico/mockup
  (gauge, gráfico de pizza/rosca, badges de ícone por categoria), pode usar
  verde (positivo), amarelo (atenção/neutro), vermelho (negativo/urgente) e
  azul (informativo) além do dourado — como um dashboard financeiro real
  usaria. Isso vale só pros elementos de dado dentro da peça gráfica.
  **Headline, linha divisória, logo e botão de CTA continuam sempre em
  dourado/creme** — essas cores extras nunca vazam pra fora do
  gráfico/mockup nem substituem o dourado como cor de marca.
- **Padrão de layout rico (atualizado 2026-08-14 a partir de referências
  enviadas pelo usuário — estilo "apresentação de produto SaaS premium")**,
  igual em todos os 5 pilares:
  1. Um elemento visual central rico e impactante (não mais um ícone único
     simples) — escolher o que melhor comunica o conteúdo daquele slide:
     mockup de tablet/celular exibindo um dashboard fictício com gráficos
     reais (rosca, linha, barras) e números; uma fileira de 3-4 ícones
     circulares dourados com legenda; uma lista de itens com ícone +
     palavra-chave dourada; ou uma comparação lado a lado (antes/depois,
     certo/errado). Rico em detalhes, mas sempre hierarquizado e nunca
     poluído/confuso.
  2. Uma linha fina dourada horizontal (divisor), separando o elemento
     visual do bloco de texto.
  3. Headline em texto grande misturando creme/off-white com 1-2
     palavras-chave em destaque dourado.
  4. Logo/wordmark pequeno "davidaraujogestor" num canto (discreto).
  5. Carrossel: capa tem selo "ARRASTA PRA VER →"; slides interiores têm
     selo de contagem "N/total" no rodapé (badge dourado/translúcido).
- **Tipografia**: 1 fonte bold pra títulos/hooks + 1 fonte legível pra texto
  de apoio, consistente em todos os posts.
- **O que gerar com IA (Nano Banana)**: mockups de dashboard/app fictícios
  (sem marca real, sem dados reais), gráficos ilustrativos, ícones e
  composições ricas em traço/preenchimento dourado — sempre fictício e
  conceitual, sem fotos reais.
- **O que NUNCA gerar com IA**: rosto do usuário, fotos reais, prints de
  resultado/dashboard REAL de cliente (com dados/marca reais), depoimentos —
  isso é fabricação de prova social/identidade. Mockups de dashboard
  **fictícios** (sem dados reais, sem logo/marca real, claramente uma
  ilustração conceitual gerada por IA) são permitidos como elemento de
  design — a linha é: nunca fingir que é um print real de algo existente.
  Se um pilar futuro pedir foto real ou print real, precisa vir do usuário —
  nunca gerado.
- **Formato**: carrossel > estático quando aplicável. Carrossel = máx.
  40-50 palavras por slide, 1 ideia por slide, com 1 elemento visual
  dominante que puxa o olho primeiro.
- **Todos os slides do carrossel são gerados via Nano Banana** (atualizado
  2026-08-13, pra ficar mais parecido com a referência visual do usuário) —
  não só a capa. O template HTML (`render_slides.js`) não é mais usado no
  fluxo ativo, ficou como legado.
- **Publicação é somente no feed** — sem crosspost automático pros Stories
  (testado em 2026-08-13 e descartado pelo usuário, resultado não ficou bom).
- **Uso do termo "gestor de tráfego"**: liberado quando o post está falando
  sobre o tema/serviço em si (ex.: "3 sinais de que seu negócio precisa de
  um gestor de tráfego") — o calendário do usuário já usa o termo dessa
  forma várias vezes. O que continua proibido é usar o termo como
  autodescrição repetitiva e sem graça do próprio David (evitar como
  bordão pessoal constante).

## Linha editorial
- **Público-alvo**: donos de negócio que precisam de gestão de tráfego pago
  e/ou automação com IA, mas ainda não perceberam essa necessidade.
- **Banco de dados do calendário**:
  - `scripts/content-bank/calendar-pillars.json` — os 5 pilares fixos
    (horário, formato, layout, template de prompt Nano Banana, CTA fixo
    por pilar)
  - `scripts/content-bank/calendar.json` — os 30 dias com o tema/gancho
    específico de cada pilar naquele dia (fornecido integralmente pelo
    usuário, não gerado por IA)
- **Proibido pesquisar notícias em tempo real** para gerar conteúdo — usar
  SOMENTE os temas do calendário fixo. **Exceção única: pilar Educação
  (7h)**, ver seção "Exceção — varredura de tendências (Educação 7h)"
  abaixo. Os outros 4 pilares (Conversão, Entretenimento, Quebra de
  Objeções, Tendência/IA) continuam 100% no calendário fixo, sem exceção.
- **NUNCA fabricar prova social ou identidade falsa**: não gerar fotos do
  usuário nem prints de resultado de cliente via IA, mesmo que rotulado
  como "teste" — isso é propaganda enganosa e destrói a credibilidade da
  conta se descoberto. Se algum dia for necessário, precisa vir de banco
  de conteúdo real fornecido pelo usuário, nunca gerado.
- **Idioma**: todo texto embutido nas artes e todas as legendas em
  português do Brasil.
- **Legenda**: `tema` do dia (gancho) + corpo + `cta` fixo do pilar.
  **O corpo é obrigatório e precisa ENTREGAR o que o gancho promete**
  (atualizado 2026-08-14, depois de um post cuja legenda dizia "3 motivos"
  na arte mas não listava nenhum motivo no texto): se o tema é "N motivos/
  sinais/erros/dicas", o corpo lista exatamente esses N itens; se é uma
  pergunta, o corpo responde brevemente; se é uma afirmação/mito, o corpo
  explica em 2-4 linhas. O agente da rotina escreve o corpo num arquivo de
  texto e passa `--body-file <arquivo>` pro `publish_calendar_post.js`, que
  monta a legenda final como `tema + corpo + cta`. Nunca publicar com a
  legenda só repetindo o gancho sem cumprir a promessa dele.
- **Conferência de nexo obrigatória antes de publicar**: depois de compor
  a legenda, o agente relê o texto completo (tema + corpo + cta) junto com
  a(s) imagem(ns) já aprovada(s) e confirma que fazem sentido juntas — a
  legenda não pode prometer algo que a arte não mostra, nem contradizer o
  tema visual. Se achar desalinhamento, reescreve o corpo da legenda (sem
  precisar gerar imagem de novo) antes de publicar.
- **Padrão premium sempre**: usar as skills de design disponíveis (ex.:
  `ui-ux-pro-max`, `dataviz`) como referência de composição, tipografia,
  hierarquia visual e paleta antes de gerar a arte. Objetivo é sempre alta
  conversão, não só ficar bonito.

## Exceção — varredura de tendências (Educação 7h)
Adicionado em 2026-08-14, a pedido do usuário, pra deixar o post das 7h
mais atual. **Só vale pro pilar `educacao`** — os outros 4 pilares nunca
fazem isso.

- Antes de rodar `print_calendar_slot.js educacao`, a rotina usa
  `WebSearch` pra pesquisar novidade/tendência recente e relevante dentro
  do nicho (tráfego pago, marketing digital, algoritmos/plataformas de
  anúncio, IA aplicada a marketing). 2-3 buscas, focando em conteúdo dos
  últimos dias.
- **Critério pra usar o resultado da busca**: só substitui o tema fixo do
  dia se achar algo **específico, recente (dias, não meses) e claramente
  relevante** pro nicho (ex.: mudança anunciada numa plataforma de
  anúncios, uma ferramenta de IA nova pra marketing, uma tendência de
  formato/criativo comentada por várias fontes). Se a busca só trouxer
  resultado vago, antigo ou fora do nicho, **não usa** — cai no fallback.
- **Priorizar potencial de viralização no perfil** (atualizado 2026-08-14):
  entre os achados que passam no critério acima, priorizar o que tem mais
  cara de gerar engajamento/compartilhamento — algo que gere reação,
  debate, "não sabia disso" — em vez do achado mais "seco"/institucional.
  Isso vale só pra escolher QUAL tendência usar; os guardrails de conteúdo
  abaixo continuam valendo do mesmo jeito.
- **Palavras-chave e hashtags**: quando publicar com tema pesquisado, o
  corpo da legenda (arquivo `--body-file`) termina com uma linha de 5-8
  hashtags relevantes ao tema do dia e ao nicho (ex.: #tráfegopago
  #marketingdigital #gestordetráfego + 2-3 específicas do assunto
  pesquisado), pra ajudar o alcance/descoberta do post. Nos outros
  pilares (calendário fixo) isso é opcional, não obrigatório.
- **Menção da fonte** (atualizado 2026-08-14): quando publicar com tema
  pesquisado, o corpo da legenda inclui uma linha citando de onde veio a
  informação — formato simples, ex.: "Fonte: [nome do veículo/site]" (sem
  precisar de link, Instagram não deixa link clicável na legenda mesmo).
  Se a busca trouxe mais de uma fonte confirmando a mesma tendência, citar
  a mais conhecida/confiável. Isso vale só pra tema pesquisado — o
  calendário fixo não tem fonte externa pra citar.
- **Fallback obrigatório**: se não achar nada que bata no critério acima,
  usa o tema fixo do calendário normalmente (`print_calendar_slot.js
  educacao` sem `--tema`). Nunca deixar de publicar por falta de tendência
  — o calendário fixo é sempre a rede de segurança.
- **Guardrails de conteúdo** (não negociáveis, mesmo com achado real):
  - Não inventar números, estatísticas ou citações que não vieram
    literalmente da busca. Se um número apareceu na busca, pode usar; se
    não apareceu, não inventa pra "parecer mais concreto".
  - Não afirmar como fato algo que a busca só sugere/especula.
  - Continua proibido gerar fotos reais, rosto do usuáro ou prints de
    resultado/tela reais de qualquer plataforma — o mockup de dashboard
    fictício continua sendo sempre ilustrativo, nunca um print real
    disfarçado do que foi encontrado na busca.
  - Se a rotina não tiver certeza se algo é "notícia real recente" ou só
    um boato/especulação de blog, trata como não confiável e cai no
    fallback.
- **Pessoas citadas na tendência pesquisada** (atualizado 2026-08-14,
  depois de discussão com o usuário sobre uso de imagem/direito autoral):
  se a tendência menciona uma pessoa específica (especialista, executivo,
  jornalista, figura pública), a rotina **NUNCA** usa a foto real dela
  (nem "printada"/reaproveitada de veículo de imprensa, nem fabricada
  pela IA tentando parecer com ela) — ser pessoa pública não muda isso: a
  foto pertence a quem a tirou/publicou, e uma imagem fabricada
  apresentada como se fosse real é conteúdo enganoso. Em vez disso:
  1. Citar o nome da pessoa e seu cargo/papel **em texto**, no corpo da
     legenda (ex.: "segundo [Nome], [cargo] na [empresa]...").
  2. Se quiser reforçar visualmente, usar um ícone/avatar **genérico e
     claramente estilizado** (ex.: silhueta simples, ícone de "porta-voz"
     ou "especialista" em traço dourado, no mesmo estilo dos outros
     ícones da peça) — nunca algo que tente parecer um rosto real ou
     remeter à aparência específica da pessoa citada.
- Quando usar tema pesquisado: rodar
  `print_calendar_slot.js educacao --tema "<gancho escrito com base na
  pesquisa>"` (o agente escreve o gancho, curto e no tom do pilar, a
  partir do que encontrou) e, no final,
  `publish_calendar_post.js educacao --images ... --body-file ... --tema
  "<o mesmo gancho>"` (pra legenda usar o tema certo, não o do calendário).
- O `allowed_tools` da rotina de Educação 7h inclui `WebSearch` —
  única das 5 rotinas com essa ferramenta liberada.

## Stories diários 6h — 2 temas de autoridade
Adicionado em 2026-08-17 (5 temas de notícias), **reduzido para 2 temas de
autoridade em 2026-08-17** a pedido do usuário — deixou de ser conteúdo de
notícia/atualidade e passou a ser conteúdo evergreen que constrói autoridade
do perfil nos dois pilares do negócio. **Escopo separado do calendário de 5
posts do feed** — publica no Stories (não no feed), sem legenda (Stories não
têm legenda na API), gerado sem Nano Banana (Playwright/HTML puro, pra não
depender de crédito de IA).

- **Horário**: 06h00 BRT (09h00 UTC), todo dia.
- **2 temas fixos, um story cada**:
  1. **Tráfego pago** — uma dica/insight que demonstra domínio técnico real
     (erro comum, mecânica de algoritmo, leitura de métrica, decisão
     estratégica) — não é teoria genérica de curso, é o tipo de coisa que só
     quem gerencia campanha de verdade sabe.
  2. **Comercial** — uma dica/insight sobre vendas, negociação, fechamento,
     posicionamento ou relação com cliente que demonstra autoridade comercial
     (não é motivacional vazio — é tático, aplicável).
- **Conteúdo evergreen, não precisa de pesquisa/notícia**: diferente da
  exceção do pilar Educação 7h, aqui não há varredura de tendência nem
  citação de fonte — é conhecimento próprio/autoral do agente sobre os dois
  temas, variando o ângulo a cada dia pra não repetir a mesma dica.
- **Critério de qualidade pra cada dica**: específica (não genérica tipo
  "seja consistente"), acionável (a pessoa consegue aplicar hoje),
  demonstra know-how real (soa como quem já viveu aquilo, não como resumo de
  blog). Se não tiver uma dica boa o suficiente pro padrão de autoridade,
  melhor gerar com mais cuidado do que publicar algo raso — mas sempre
  publica os 2 (não há critério de "pular" aqui, ao contrário do modelo
  antigo de notícias).
- **Guardrails de conteúdo**: nunca inventar número/estatística/resultado
  específico como se fosse dado real de cliente (ex.: "aumentei o ROAS de um
  cliente em 340%") — isso seria fabricar prova social, proibido em qualquer
  contexto (ver "Linha editorial"). Dicas podem citar faixas/ordens de
  grandeza genéricas ("pode inflar o CAC em vez de reduzir"), nunca número
  específico apresentado como resultado real.
- **Uso do termo "gestor de tráfego"**: mesma regra da identidade visual —
  liberado quando o post fala sobre o tema/serviço em si, proibido como
  bordão de autodescrição repetitiva.
- **Sem pessoas/fotos reais**: mesma regra de sempre — nunca gerar foto real
  do usuário nem de terceiros.
- **Geração da arte** (sem Nano Banana — HTML/Playwright, mesmo método do
  story manual de 2026-08-17):
  1. Montar um objeto de dados por tema:
     ```json
     {
       "tag": "TRÁFEGO PAGO",
       "headline": "Texto com <span class=\"hl\">palavra-chave dourada</span>",
       "body": "2-4 linhas com a dica, específica e acionável.",
       "icon": "target",
       "badges": [
         { "label": "AUTORIDADE", "tone": "blue", "icon": "check" }
       ]
     }
     ```
     - `icon` (ícone central, um por tema): `target` (tráfego pago),
       `briefcase` (comercial).
     - `badges[].tone`: `blue` (informativo), `green` (positivo), `red`
       (negativo/urgente), `yellow` (atenção/neutro) — mesma regra de cores
       semânticas da identidade visual, só que aqui aplicada a pills em vez
       de gauge/gráfico. Uma badge só, geralmente `blue`/`AUTORIDADE` ou
       algo que reforce o insight (ex.: `red`/`ERRO COMUM` se a dica é sobre
       evitar um erro).
     - `badges[].icon`: `trend`, `check`, `alert` ou `dot`.
  2. Salvar como `scripts/daily-output/story_trafego.json` e
     `scripts/daily-output/story_comercial.json`, rodar
     `node scripts/export-tools/render_news_story.js scripts/daily-output/story_<tema>.json scripts/daily-output/story_<tema>.png`
     pra cada um.
  3. Revisar a imagem gerada com `Read` (texto em português correto,
     legível, sem pessoas/rostos reais, dica realmente específica/acionável
     — não genérica).
- **Publicação**: `node scripts/publish_instagram.js --images scripts/daily-output/story_<tema>.png --story`
  — um comando por tema, 2 publicações de Story no total. Sem `--caption`
  (Stories não usam legenda).
- **Dependência de rede**: o template/script usa Playwright (Chromium
  headless), que precisa de `registry.npmjs.org` e o CDN de download do
  navegador do Playwright liberados no acesso de rede do ambiente de nuvem
  (ver seção "Ambiente de nuvem" no fim deste arquivo) — configurado pelo
  usuário em 2026-08-17. Se a rotina falhar por causa de rede/instalação do
  Playwright, reportar claramente qual domínio faltou.
- Arquivos: `scripts/content-bank/templates/news-story-template.html`
  (template, ícones `target`/`briefcase` adicionados em 2026-08-17) +
  `scripts/export-tools/render_news_story.js` (renderizador, CLI:
  `node render_news_story.js <data.json> <outPath.png>`).

## Geração de imagem (Nano Banana) e revisão
- Todos os 5 pilares geram TODAS as imagens via Nano Banana
  (`generate_image` com `model: "nano_banana_pro"`, MCP do Higgsfield) —
  capa, slides interiores de carrossel e slide de CTA, cada um gerado e
  revisado individualmente.
- Fazer polling com `show_generations` (`{"limit": 5}`) ou `job_display`
  (`{"id": "..."}`) até completar. NÃO usar `jobs_wait` nem
  `show_generation_by_ids` — bugados neste ambiente.
- Baixar a imagem via `curl` (domínio `*.cloudfront.net` já liberado na
  política de rede do ambiente).
- **Capa** (pilares únicos e primeira imagem do carrossel): usa o
  `capaPrompt` já montado por `print_calendar_slot.js` (o `{tema}` do dia
  já embutido no prompt template do pilar).
- **Slides interiores de carrossel** (pilares Educação, Entretenimento,
  Tendência/IA): `print_calendar_slot.js` retorna `interiorSlidePromptTemplate`
  (placeholders `{headline}`, `{body}`, `{slideNumber}`, `{slideTotal}`) e
  `ctaSlidePromptTemplate` (só `{headline}` e `{cta}` — sem `{body}`,
  `{slideNumber}` nem `{slideTotal}`), ambos crus/não substituídos. O
  agente da rotina compõe o texto de cada slide (1 ideia
  por slide, máx. 40-50 palavras, tom consistente com o pilar, a partir do
  `tema` do dia e das `layoutNotes`), substitui os placeholders no prompt
  correspondente e gera cada slide individualmente via `generate_image`. O
  último slide sempre usa `ctaSlidePromptTemplate` com `{cta}` = `cta` do
  pilar.
- **Revisão obrigatória antes de publicar, para CADA imagem gerada**
  (ferramenta `Read` na imagem baixada): texto em português correto e sem
  erro de ortografia, totalmente legível, coerente com o conteúdo daquele
  slide, sem pessoas/rostos, sem números/dados/marca/logo real (dashboard
  precisa ser claramente fictício/ilustrativo), elemento visual rico mas
  hierarquizado e legível (nunca poluído a ponto de confundir a leitura),
  linha fina dourada divisória visível, fundo preto/azul-marinho muito
  escuro (nunca azul elétrico/roxo/verde neon — paleta antiga), logo
  pequeno "davidaraujogestor" visível no canto. Capa: selo "ARRASTA PRA
  VER →" visível. Slides interiores: selo de contagem "N/total" visível.
  Se achar problema em qualquer imagem, gerar de novo ajustando o prompt
  daquele slide (até 3 tentativas por imagem).
- Se a geração de qualquer slide falhar/reprovar 3x (depois da válvula de
  escape abaixo), reportar o erro claramente e NÃO publicar nada do post —
  não há fallback pro sistema antigo (`gpt-image-1`).
- Gerar todos os slides de um carrossel via Nano Banana é mais lento e
  consome mais créditos do que o fluxo antigo (capa por IA + interior via
  HTML), mas deixa o visual mais consistente com a referência do usuário.

### Válvula de escape (atualizado 2026-08-14, depois de um caso real)
Em 2026-08-14 a rotina das 20h reportou falha total ("3 tentativas
travadas em in_progress") e não publicou nada — mas ao investigar depois,
2 das 3 imagens tinham completado normalmente minutos antes, só que
`job_display` continuou devolvendo `in_progress` pra rotina (status
desatualizado/stale dentro daquela sessão). A rotina desistiu sem nunca
ter, de fato, uma tentativa real fracassada. Pra isso não acontecer de
novo, **antes de declarar qualquer tentativa como travada/falha**, seguir
esta ordem:
1. Se `job_display` mostrar `in_progress` por mais de ~3 minutos, NÃO
   conte isso como tentativa fracassada ainda. Faça uma verificação
   cruzada com `show_generations` (`{"limit": 10}`) — procure pelo mesmo
   `id` do job na lista. Se aparecer lá com `status: "completed"` e
   `results.rawUrl`, a imagem existe — baixe e revise normalmente, mesmo
   que `job_display` ainda diga `in_progress`.
2. Só depois dessa verificação cruzada (item 1) — se o job realmente não
   aparecer como completed em lugar nenhum, ou aparecer com
   `status: "failed"` — é que conta como uma tentativa fracassada de
   verdade, e aí sim parte pra próxima tentativa (das 3 permitidas).
3. **Se mesmo assim as 3 tentativas "ricas" (com mockup/dashboard/gráfico
   detalhado) genuinamente falharem**, faça uma **4ª tentativa de
   emergência simplificada** antes de desistir: um prompt bem mais simples
   (só fundo escuro sólido + headline em texto grande centralizado + linha
   dourada + logo, sem mockup/gráfico/ícones — muito menos chance de
   travar ou falhar) só pra garantir que o dia não fique sem post. Essa
   tentativa de emergência não compete pelo limite de 3 — é a última rede
   de segurança.
4. Só reportar falha total e não publicar se a tentativa de emergência
   (item 3) também falhar de verdade (confirmada via `show_generations`).
   Nesse caso raro, reportar claramente ao usuário o que foi tentado.

## Arquivos
- Credenciais: `.env` (Instagram + OpenAI) — nunca commitado (está no `.gitignore`)
- Pilares fixos do calendário: `scripts/content-bank/calendar-pillars.json`
- Calendário de 30 dias (temas por dia/pilar): `scripts/content-bank/calendar.json`
- Leitor do slot do dia: `scripts/export-tools/print_calendar_slot.js <pilarId> [--day N]`
  - Retorna `capaPrompt` (pronto) + `interiorSlidePromptTemplate` e
    `ctaSlidePromptTemplate` (crus, pra pilares carrossel) + `cta`
- Template de marca HTML / renderizador (`slide-template.html`,
  `render_slides.js`): **legado, não usado no fluxo do feed** desde
  2026-08-13 — todos os slides do feed agora são gerados via Nano Banana.
- Template/renderizador dos Stories 6h (`news-story-template.html`,
  `render_news_story.js`, adicionados 2026-08-17): **ativo**, ver seção
  "Stories diários 6h" acima — não usa Nano Banana.
- Publicador do calendário: `scripts/publish_calendar_post.js <pilarId> --image <arquivo> | --images <arquivo1> <arquivo2> ... [--day N] [--body-file <arquivo>] [--force]`
  - Monta a legenda (tema + corpo + CTA do pilar) e publica via `publish_instagram.js`
  - **Checagem anti-duplicidade** (adicionada 2026-08-14, depois de um caso
    real de duplicidade no pilar Conversão quando o disparo automático
    atrasado rodou depois de uma publicação manual do mesmo dia): antes de
    publicar, consulta os últimos posts do perfil (`/me/media`) e aborta se
    achar um post das últimas 20h cuja legenda comece com o mesmo `tema` do
    dia. Usar `--force` só se a publicação duplicada for intencional.
- Publicador genérico no Instagram: `scripts/publish_instagram.js`
  - Uso: `node publish_instagram.js --images foto1.png [foto2.png ...] --caption "texto"`
  - Múltiplas imagens = carrossel automaticamente
  - Faz upload da imagem via uguu.se (com fallback para litterbox.catbox.moe)
  - **Retry automático** (adicionado 2026-08-14) no erro transitório da API
    do Instagram "Media ID is not available" (código 9007/2207027) — tenta
    publicar de novo até 5x com 5s de intervalo antes de desistir, em vez
    de falhar na primeira tentativa mesmo com o container já `FINISHED`.
- Sistema antigo (não usado mais, mantido só como referência):
  `scripts/content-bank/themes.json`, `scripts/daily_publish.js`,
  `scripts/publish_nanobanana_post.js`

## Ambiente de nuvem (rotinas)
- Acesso à rede: **Personalizado**, com `graph.instagram.com`, `uguu.se`,
  `litterbox.catbox.moe`, `api.openai.com` e `*.cloudfront.net` liberados
  (o wildcard é necessário porque o Higgsfield usa subdomínios variáveis
  do CloudFront pra cada imagem gerada — sem o `*.` só libera o domínio
  exato, não os subdomínios, e o download falha com 403). Em 2026-08-17,
  adicionado `registry.npmjs.org` e o CDN de download do Playwright, pra
  rodar a rotina de Stories 6h (ver seção acima) sem depender de Nano Banana.
- 6 rotinas cron em claude.ai/code/routines (5 do calendário de feed + 1 dos
  Stories 6h), cada
  uma com o `.env` recriado no início a partir dos valores no prompt da
  rotina (não há repositório privado nem secret store nesse fluxo — o
  repositório GitHub é público, então credenciais NUNCA vão para lá)
- `allowed_tools` de cada rotina inclui as ferramentas MCP do Higgsfield
  (`mcp__9c4f3976-f86a-4785-b11a-e53430fc6e9a__generate_image` e
  `__show_generations`) além de Bash/Read/Write/Edit/Glob/Grep
