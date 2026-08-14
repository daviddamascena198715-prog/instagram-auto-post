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
  cor de destaque + texto misturando creme/off-white e dourado (palavras-chave
  em dourado dentro do headline). **Não usar mais** azul elétrico, roxo ou
  verde neon (paleta antiga, substituída).
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
  SOMENTE os temas do calendário fixo.
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
- **Padrão premium sempre**: usar as skills de design disponíveis (ex.:
  `ui-ux-pro-max`, `dataviz`) como referência de composição, tipografia,
  hierarquia visual e paleta antes de gerar a arte. Objetivo é sempre alta
  conversão, não só ficar bonito.

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
  e `ctaSlidePromptTemplate` (strings cruas, com placeholders `{headline}`,
  `{body}`, `{slideNumber}`, `{slideTotal}` e `{cta}` ainda não
  substituídos). O agente da rotina compõe o texto de cada slide (1 ideia
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
- Se a geração de qualquer slide falhar/reprovar 3x, reportar o erro
  claramente e NÃO publicar nada do post — não há fallback automático pra
  este sistema (diferente do sistema antigo que caía pro `gpt-image-1`).
- Gerar todos os slides de um carrossel via Nano Banana é mais lento e
  consome mais créditos do que o fluxo antigo (capa por IA + interior via
  HTML), mas deixa o visual mais consistente com a referência do usuário.

## Arquivos
- Credenciais: `.env` (Instagram + OpenAI) — nunca commitado (está no `.gitignore`)
- Pilares fixos do calendário: `scripts/content-bank/calendar-pillars.json`
- Calendário de 30 dias (temas por dia/pilar): `scripts/content-bank/calendar.json`
- Leitor do slot do dia: `scripts/export-tools/print_calendar_slot.js <pilarId> [--day N]`
  - Retorna `capaPrompt` (pronto) + `interiorSlidePromptTemplate` e
    `ctaSlidePromptTemplate` (crus, pra pilares carrossel) + `cta`
- Template de marca HTML / renderizador (`slide-template.html`,
  `render_slides.js`): **legado, não usado no fluxo ativo** desde
  2026-08-13 — todos os slides agora são gerados via Nano Banana
- Publicador do calendário: `scripts/publish_calendar_post.js <pilarId> --image <arquivo> | --images <arquivo1> <arquivo2> ... [--day N]`
  - Monta a legenda (tema + CTA do pilar) e publica via `publish_instagram.js`
- Publicador genérico no Instagram: `scripts/publish_instagram.js`
  - Uso: `node publish_instagram.js --images foto1.png [foto2.png ...] --caption "texto"`
  - Múltiplas imagens = carrossel automaticamente
  - Faz upload da imagem via uguu.se (com fallback para litterbox.catbox.moe)
- Sistema antigo (não usado mais, mantido só como referência):
  `scripts/content-bank/themes.json`, `scripts/daily_publish.js`,
  `scripts/publish_nanobanana_post.js`

## Ambiente de nuvem (rotinas)
- Acesso à rede: **Personalizado**, com `graph.instagram.com`, `uguu.se`,
  `litterbox.catbox.moe`, `api.openai.com` e `*.cloudfront.net` liberados
  (o wildcard é necessário porque o Higgsfield usa subdomínios variáveis
  do CloudFront pra cada imagem gerada — sem o `*.` só libera o domínio
  exato, não os subdomínios, e o download falha com 403)
- 5 rotinas cron em claude.ai/code/routines, uma por pilar/horário, cada
  uma com o `.env` recriado no início a partir dos valores no prompt da
  rotina (não há repositório privado nem secret store nesse fluxo — o
  repositório GitHub é público, então credenciais NUNCA vão para lá)
- `allowed_tools` de cada rotina inclui as ferramentas MCP do Higgsfield
  (`mcp__9c4f3976-f86a-4785-b11a-e53430fc6e9a__generate_image` e
  `__show_generations`) além de Bash/Read/Write/Edit/Glob/Grep
