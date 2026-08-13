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

## Identidade visual (guia do usuário — atualizado 2026-08-13)
- **Paleta**: fundo azul-marinho quase preto + dourado (#C9A24B) como cor
  de destaque única + texto em creme/off-white. **Não usar mais** azul
  elétrico, roxo ou verde neon (paleta antiga, substituída). 2 cores fixas,
  nunca variar entre posts.
- **Padrão de layout fixo (inspirado em referência enviada pelo usuário)**,
  igual em todos os 5 pilares:
  1. Um único ícone conceitual em traço fino dourado, relacionado ao tema do
     dia (ex.: alvo, seta, engrenagem, balança, lâmpada, chip) — nunca um
     conjunto de vários ícones, nunca ilustração cheia/carregada.
  2. Uma linha fina dourada horizontal (divisor), logo acima do headline.
  3. Headline em texto grande cor creme, com o gancho/tema do dia.
  4. Logo/wordmark pequeno "davidaraujogestor" num canto (discreto).
  5. Carrossel: selo "ARRASTA PRA VER →" no rodapé (badge dourado/translúcido).
- **Tipografia**: 1 fonte bold pra títulos/hooks + 1 fonte legível pra texto
  de apoio, consistente em todos os posts.
- **O que gerar com IA (Nano Banana)**: fundos conceituais, ícone único em
  traço fino dourado por peça, sem fotos reais.
- **O que NUNCA gerar com IA**: rosto do usuário, fotos reais, prints de
  resultado/dashboard de cliente, depoimentos — isso é fabricação de prova
  social/identidade e não faz parte do calendário atual (todos os 5 pilares
  hoje usam só fundos/ilustrações conceituais, sem depender de conteúdo
  real). Se um pilar futuro pedir foto real, ela precisa vir do usuário —
  nunca gerada.
- **Formato**: carrossel > estático quando aplicável. Carrossel = máx.
  40-50 palavras por slide, 1 ideia por slide, com 1 elemento visual
  dominante que puxa o olho primeiro. Slides interiores (template HTML)
  usam só os fundos `dark`, `dark-alt`, `dark2` ou `gold-glow` — nunca
  `deep-purple`, `gradient`, `gradient-cta` ou `noir` (contêm roxo, fora da
  paleta atual).
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
- **Legenda**: `tema` do dia (do calendário) + `cta` fixo do pilar,
  montada automaticamente por `publish_calendar_post.js`.
- **Padrão premium sempre**: usar as skills de design disponíveis (ex.:
  `ui-ux-pro-max`, `dataviz`) como referência de composição, tipografia,
  hierarquia visual e paleta antes de gerar a arte. Objetivo é sempre alta
  conversão, não só ficar bonito.

## Geração de imagem (Nano Banana) e revisão
- Todos os 5 pilares geram a capa/imagem via Nano Banana
  (`generate_image` com `model: "nano_banana_pro"`, MCP do Higgsfield),
  usando o `capaPrompt` já montado por `print_calendar_slot.js` (o
  `{tema}` do dia já embutido no prompt template do pilar).
- Fazer polling com `show_generations` (`{"limit": 5}`) ou `job_display`
  (`{"id": "..."}`) até completar. NÃO usar `jobs_wait` nem
  `show_generation_by_ids` — bugados neste ambiente.
- Baixar a imagem via `curl` (domínio `*.cloudfront.net` já liberado na
  política de rede do ambiente).
- **Revisão obrigatória antes de publicar** (ferramenta `Read` na imagem
  baixada): texto em português correto e sem erro de ortografia,
  totalmente legível, coerente com o tema do dia, sem pessoas/rostos,
  ícone único em traço fino dourado (nunca vários ícones/ilustração
  carregada), linha fina dourada divisória visível acima do headline,
  fundo azul-marinho quase preto (nunca azul elétrico/roxo/verde neon —
  paleta antiga), logo pequeno "davidaraujogestor" visível no canto.
  Se achar problema, gerar de novo ajustando o prompt (até 3 tentativas
  no total).
- **Carrossel** (Educação, Entretenimento, Tendência/IA): a capa é gerada
  via Nano Banana; os slides interiores (2 até o penúltimo) são
  renderizados via template HTML de marca
  (`scripts/export-tools/render_slides.js`), com o agente da rotina
  compondo o texto de cada slide interior a partir do `tema` do dia e das
  `layoutNotes` do pilar (1 ideia por slide, máx. 40-50 palavras, tom
  consistente com o pilar). O slide final sempre é o CTA do pilar.
- Se a geração falhar/reprovar 3x, reportar o erro claramente e NÃO
  publicar — não há fallback automático pra este sistema novo (diferente
  do sistema antigo que caía pro `gpt-image-1`).

## Arquivos
- Credenciais: `.env` (Instagram + OpenAI) — nunca commitado (está no `.gitignore`)
- Pilares fixos do calendário: `scripts/content-bank/calendar-pillars.json`
- Calendário de 30 dias (temas por dia/pilar): `scripts/content-bank/calendar.json`
- Leitor do slot do dia: `scripts/export-tools/print_calendar_slot.js <pilarId> [--day N]`
- Template de marca (HTML, usado nos slides interiores de carrossel):
  `scripts/content-bank/templates/slide-template.html`
- Renderizador do template: `scripts/export-tools/render_slides.js`
  - Detecta e usa Chromium pré-instalado no ambiente da nuvem quando existe
    (require condicional/lazy, não quebra o modo Nano Banana se o
    Playwright não estiver instalado)
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
