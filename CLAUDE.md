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

## Escopo autorizado — Stories e carrossel de autoridade 6h
Autorizado ao vivo pelo usuário em 2026-08-17, na mesma conversa em que a
rotina foi criada e depois ajustada (autorização válida conforme a regra
acima — "na conversa, ao vivo"). **Os 2 Stories diários foram DESATIVADOS
em 2026-09-19, a pedido do usuário** ("desative storie e deixe ativo so os
posts") — a rotina das 6h agora publica só:
- 1 post de carrossel no FEED, às 06h00 BRT, com a dica de autoridade do dia
  (tráfego pago OU comercial, o que tiver mais novidade/potencial),
  expandida em 5 slides — ver seção "Carrossel de autoridade 6h (feed)".
A seção "Stories diários 6h — 2 temas de autoridade" abaixo fica mantida só
como referência histórica (formato dos 2 temas, critérios de qualidade,
varredura de novidade e regras de anti-repetição) — essas regras continuam
valendo pra escolha do tema do carrossel, mesmo sem o Story ser publicado
separadamente. Se o usuário quiser reativar os Stories no futuro, o texto
antigo (`allowed_tools`/passos removidos do prompt da rotina) pode ser
restaurado a partir do histórico do repositório.

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

## Stories diários 6h — 2 temas de autoridade (DESATIVADO em 2026-09-19)
**A publicação de Stories foi desativada em 2026-09-19** a pedido do
usuário — a rotina das 6h não publica mais os 2 Stories, só o carrossel de
feed (ver "Carrossel de autoridade 6h (feed)"). Esta seção fica só como
referência: os "2 temas de autoridade" (tráfego pago e comercial) e as
regras de varredura de novidade/anti-repetição abaixo continuam sendo
usados pra decidir o tema do carrossel do dia, mesmo sem o Story separado.

Histórico: adicionado em 2026-08-17 (5 temas de notícias), **reduzido para
2 temas de autoridade em 2026-08-17** a pedido do usuário — deixou de ser
conteúdo de notícia/atualidade e passou a ser conteúdo evergreen que
constrói autoridade do perfil nos dois pilares do negócio. **Escopo
separado do calendário de 5 posts do feed** — quando ativo, publicava no
Stories (não no feed), sem legenda (Stories não têm legenda na API).

**Geração de imagem: Nano Banana (Higgsfield)**, revertido em 2026-08-20 a
pedido do usuário (tinha ficado temporariamente em HTML/Playwright puro
entre 2026-08-17 e 2026-08-20, período em que o crédito de Nano Banana
estava zerado — ver "Geração de imagem (Nano Banana) e revisão" pra
mecânica completa de geração/polling/revisão/válvula de escape, mesma usada
pelo calendário de 5 posts). Os templates HTML/Playwright
(`news-story-template.html`, `authority-carousel-template.html`) continuam
no repositório como legado, caso precisem ser reativados de novo no futuro
(ex.: se o crédito acabar de novo).

- **Horário**: 06h00 BRT (09h00 UTC), todo dia.
- **2 temas fixos, um story cada**:
  1. **Tráfego pago** — uma dica/insight que demonstra domínio técnico real
     (erro comum, mecânica de algoritmo, leitura de métrica, decisão
     estratégica) — não é teoria genérica de curso, é o tipo de coisa que só
     quem gerencia campanha de verdade sabe.
  2. **Comercial** — uma dica/insight sobre vendas, negociação, fechamento,
     posicionamento ou relação com cliente que demonstra autoridade comercial
     (não é motivacional vazio — é tático, aplicável). **Ângulos possíveis**
     (adicionado em 2026-09-19, a pedido do usuário, pra ampliar a variedade
     e facilitar a anti-repetição — rotacionar entre eles, não usar sempre o
     mesmo ângulo):
     - **Negociação**: ancoragem de preço, como responder objeção de preço,
       técnicas de concessão (nunca ceder sem pedir algo em troca), silêncio
       estratégico, como não entrar em guerra de desconto.
     - **Fechamento**: sinais de compra, perguntas de fechamento, como
       reduzir o ciclo de vendas, erros que travam o fechamento no último
       passo, como lidar com "vou pensar".
     - **Follow-up**: cadência ideal de follow-up (quantas vezes, em quanto
       tempo), como reativar lead frio sem parecer desesperado, o que
       escrever quando o cliente some no meio da negociação, follow-up
       depois do "não" (nutrição de longo prazo).
     - **No-show / faltas em reunião**: como reduzir no-show de reunião
       marcada (confirmação, lembrete, criar compromisso verbal), o que
       fazer quando o cliente falta sem avisar, como reagendar sem parecer
       carente.
     - Outros ângulos válidos: qualificação de lead, discovery/diagnóstico,
       posicionamento de autoridade na abordagem inicial, gestão de
       expectativa pós-venda (evita churn/cancelamento).
- **Varredura de novidade de mercado, com fallback evergreen** (atualizado
  2026-08-17, mesmo padrão da exceção do pilar Educação 7h): antes de montar
  cada dica, a rotina usa `WebSearch` (1-2 buscas por tema) procurando
  novidade recente (últimos dias) e relevante:
  - Tráfego pago: mudança/atualização em plataforma de anúncio (Meta Ads,
    Google Ads, TikTok Ads), novo recurso de IA aplicado a mídia paga,
    mudança de algoritmo, novidade de mercado que afeta CAC/ROAS.
  - Comercial: tendência de vendas/negociação, mudança de comportamento de
    compra B2B/B2C, novidade de ferramenta comercial, dado de mercado sobre
    fechamento/funil.
  Se achar algo específico e recente que passe no critério (mesmo critério
  da exceção Educação 7h: específico, recente — dias não meses —,
  claramente relevante pro tema), usa isso como base da dica e cita a fonte
  no corpo (`body`, formato "Fonte: [veículo]"). **Se não achar nada que
  passe no critério, cai no fallback**: dica evergreen de autoridade (sem
  fonte), seguindo os critérios de qualidade abaixo. Nunca deixar de
  publicar por falta de novidade — o evergreen é sempre a rede de
  segurança, igual ao calendário fixo do pilar Educação 7h.
  - **Guardrails da varredura** (mesmos da exceção Educação 7h): nunca
    inventar número/estatística/citação que não veio literalmente da busca;
    nunca afirmar como fato o que a busca só sugere; se não tiver certeza se
    é notícia real recente, trata como não confiável e cai no fallback.
  - **Pessoas citadas na novidade**: mesma regra de sempre — nunca foto real
    ou fabricada de pessoa específica, mesmo pública; cita nome/cargo em
    texto se relevante.
- **Anti-repetição (adicionado em 2026-08-31, depois de detectar 3
  execuções seguidas com a mesma notícia e a mesma dica evergreen)**: ANTES
  de decidir a dica de cada tema, leia
  `scripts/content-bank/recent-topics.json` (lista das últimas execuções,
  mais recente primeiro; se o arquivo não existir, trate como lista vazia).
  Para os últimos 5 registros desse arquivo, verifique:
  - **Novidade pesquisada**: se a notícia mais relevante encontrada na
    varredura já apareceu (mesma ou reformulada) em algum dos últimos 5
    registros, ela NÃO PODE ser reusada — busque a segunda melhor
    notícia ainda não usada, ou caia no fallback evergreen com um ângulo
    diferente de qualquer um já usado.
  - **Fallback evergreen**: escolha uma dica/tática claramente diferente
    (outro ângulo, outro erro comum, outro cenário) de qualquer uma
    presente nos últimos 5 registros do mesmo tema (tráfego pago ou
    comercial) — nunca repetir a mesma tática só reescrita com outras
    palavras.
  - **Variedade visual**: o ícone/elemento visual central de cada tema não
    pode ser o mesmo usado no registro mais recente daquele tema (ex.: se
    ontem foi "alvo/mira", hoje usa outro elemento coerente com a nova
    dica).
  Ao final da rotina (depois de publicar), adicione um novo registro no
  topo do array em `recent-topics.json` com
  `{date, trafegoPago: {resumo, fonte, icone}, comercial: {resumo, fonte,
  icone}, carrosselTema}`, mantenha só os 8 registros mais recentes
  (remova os mais antigos do fim do array), e faça
  `git add scripts/content-bank/recent-topics.json && git commit -m "..."
  && git push` pra esse histórico persistir pro próximo run (o resto do
  `daily-output/` continua gitignored, só esse arquivo de histórico é
  commitado). Se o push falhar (ex.: sem permissão), reporte isso
  claramente no relatório final, mas isso não deve impedir a publicação
  dos posts do dia.
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
- **Variedade visual** (adicionado 2026-08-19, a pedido do usuário — os
  posts estavam saindo todos com o mesmo layout de ícone todo dia; mantido
  depois da volta ao Nano Banana em 2026-08-20, agora como instrução de
  prompt em vez de campo de schema). Antes de escrever o prompt de imagem
  de cada tema, decidir qual elemento visual central combina melhor com o
  CONTEÚDO daquela dica específica, em vez de pedir sempre a mesma coisa:
  - Se a dica tiver 2-4 valores numéricos comparáveis (ex.: CAC antes/depois,
    conversão A vs B, custo por lead em 2 plataformas), pedir no prompt um
    **mockup de dashboard com um gráfico de barras real** comparando esses
    valores (cores semânticas: vermelho pro pior resultado, verde pro
    melhor, ver "Identidade visual").
  - Se a dica girar em torno de UM número/percentual central (ex.: "73% dos
    anúncios com esse erro..."), pedir um **número grande em destaque
    dourado** como elemento visual principal, com uma legenda curta abaixo.
  - Se a dica for qualitativa, sem dado numérico que valha a pena
    visualizar, usar o layout padrão: **ícone circular dourado** temático
    (alvo/mira pra tráfego pago, maleta/aperto de mão pra comercial) com
    1-2 selos/pills pequenos ao lado (ex.: "AUTORIDADE", "ERRO COMUM").
  - **Nunca inventar número pra caber num gráfico** — só pedir
    gráfico/número em destaque quando o dado vier de verdade da pesquisa
    (`WebSearch`) ou for uma faixa/ordem de grandeza genérica claramente
    identificada como ilustrativa no texto (nunca como se fosse resultado
    real medido de cliente).
  - **Variar entre os 2 stories do mesmo dia**: evitar que os 2 saiam com o
    mesmo tipo de elemento visual sempre que o conteúdo permitir (ex.: um
    com gráfico de barras e um com ícone) — e variar também dia a dia.
- **Geração da arte** (Nano Banana — `generate_image`, `model:
  "nano_banana_pro"`, mesma mecânica de "Geração de imagem (Nano Banana) e
  revisão"): montar 1 prompt de imagem por tema, formato Stories (9:16),
  seguindo a identidade visual (fundo preto/azul-marinho muito escuro,
  dourado #C9A24B, tipografia bold pro headline + legível pro corpo, linha
  fina dourada divisória, logo pequeno "davidaraujogestor" num canto),
  incorporando:
  1. O elemento visual central decidido em "Variedade visual" acima.
  2. Headline curto com a dica (pode destacar 1-2 palavras-chave em
     dourado).
  3. Corpo de texto (2-4 linhas) com a dica completa e, se usou novidade
     pesquisada, uma linha "Fonte: [veículo]" (omitir no fallback
     evergreen).
  Gerar, revisar (`Read` na imagem baixada — mesmo checklist da seção
  "Geração de imagem") e, se reprovar, ajustar o prompt e gerar de novo
  (até 3 tentativas por tema + válvula de escape, mesma regra do
  calendário).
- **Publicação**: `node scripts/publish_instagram.js --images <imagem_baixada.png> --story`
  — um comando por tema, 2 publicações de Story no total. Sem `--caption`
  (Stories não usam legenda).
- O `allowed_tools` da rotina de Stories 6h inclui `WebSearch` (pra
  varredura de novidade de mercado) e as ferramentas MCP do Higgsfield
  (`generate_image`, `show_generations`).
- Arquivos legados (não usados no fluxo ativo desde 2026-08-20, mantidos
  pra eventual reativação): `scripts/content-bank/templates/news-story-template.html`
  + `scripts/export-tools/render_news_story.js`.

## Carrossel/post de autoridade 6h (feed)
Adicionado em 2026-08-17, na mesma execução da rotina dos Stories 6h — o
usuário pediu pra aproveitar a dica mais relevante das duas do dia e virar
um post no FEED, publicado no mesmo horário (06h00 BRT).
**Desde 2026-09-19, este post é a ÚNICA publicação da rotina das 6h**
(os 2 Stories foram desativados — ver "Stories diários 6h" acima).
**Geração de imagem: Nano Banana (Higgsfield)**, revertido em 2026-08-20
junto com os Stories 6h (ficou em HTML/Playwright puro entre 2026-08-17 e
2026-08-20 por falta de crédito de Nano Banana) — mesma identidade visual
(fonte, layout, cores douradas) já usada no resto do calendário. Ver
"Fallback sem crédito Nano Banana" abaixo pra quando o crédito acabar de
novo.

- **Horário**: 06h00 BRT (09h00 UTC), domingo/segunda/quarta/sexta.
- **Formato alternado (adicionado em 2026-09-19, a pedido do usuário —
  "intercala, um post carrossel e outro não")**: a rotina alterna entre
  **carrossel (5 slides)** e **post de imagem única** a cada execução
  agendada, pra variar o formato do feed:
  1. Leia o campo `formato` do registro mais recente em
     `recent-topics.json` (`"carrossel"` ou `"imagem_unica"`).
  2. Se o último foi `"carrossel"`, hoje é `"imagem_unica"` — e vice-versa.
  3. Se não houver registro anterior com esse campo (histórico antigo, sem
     `formato`), trate como se o último tivesse sido `"carrossel"` — ou
     seja, hoje começa em `"imagem_unica"`.
  4. Registre o `formato` usado hoje no novo registro do `recent-topics.json`
     (passo 10 do prompt da rotina), pra a próxima execução alternar
     corretamente.
- **Post de imagem única** (quando o formato do dia for `imagem_unica`):
  UMA imagem só, no mesmo estilo cinematográfico full-bleed da capa do
  carrossel (ver estrutura abaixo), mas com um corpo de texto adicional
  (2-3 linhas, a dica completa) já que não há slides interiores pra
  explicar o ponto — a imagem sozinha precisa comunicar a dica inteira.
  Mesmos elementos obrigatórios da capa (wordmark, selo com sigla, headline
  com destaque dourado), **sem** contador de página nem selo "ARRASTA →"
  (não é carrossel). Publicar com
  `node scripts/publish_instagram.js --images <imagem.png> --caption "<legenda>"`
  (uma imagem só, sem `--story` → vira post normal de feed). A legenda seguе
  a mesma regra de nexo do carrossel (resume a dica + convite a seguir).
- **Escolha de qual dica vira o post do dia**: a rotina ainda pesquisa/compõe as
  2 dicas do dia (tráfego pago e comercial, ver seção "Stories diários 6h"
  pros critérios de pesquisa/qualidade/anti-repetição) mesmo sem publicar
  os Stories separadamente — isso serve só pra decidir qual das duas vira
  o carrossel:
  1. Preferir a dica que usou novidade de mercado pesquisada (mais atual)
     sobre a evergreen sem fonte.
  2. Se as duas vierem de novidade (ou as duas forem evergreen), escolher a
     que tem mais potencial de engajamento/compartilhamento — mesma lógica
     de priorização de viralização da exceção Educação 7h.
  A dica não escolhida não é publicada em lugar nenhum (nem Story, nem
  carrossel) — só ajuda a decidir o tema do dia e fica registrada em
  `recent-topics.json` pra não ser reproposta à toa nos próximos dias.
- **Estrutura do carrossel — 5 slides, cada um gerado via `generate_image`
  individualmente** (mesma mecânica de "Geração de imagem (Nano Banana) e
  revisão" usada pelos pilares de carrossel do calendário):
  1. **Capa — estilo cinematográfico full-bleed** (mudado em 2026-08-26,
     pedido do usuário com referência visual): diferente dos interiores/CTA
     (que seguem o padrão dashboard/mockup preto/dourado), a capa agora é
     uma cena foto-realista dramática ocupando TODO o quadro de borda a
     borda (sem fundo sólido, sem mockup de app/dashboard), com elemento
     central simbólico relacionado ao tema (tráfego pago ou comercial),
     iluminação de alto contraste, tons predominantemente pretos/azul-
     marinho muito escuros com brilho pontual dourado (#C9A24B) — nunca
     laranja nem outra cor fora da paleta. Leve vinheta escura na parte
     inferior pra legibilidade do texto. Elementos obrigatórios:
     - Canto superior esquerdo: wordmark pequeno "davidaraujogestor" em
       texto creme discreto.
     - Canto superior direito: selo pequeno arredondado sólido dourado
       (#C9A24B) com uma sigla curta em maiúsculas relacionada ao tema
       (ex. "ADS", "IA", "$"), texto do selo em preto/azul-marinho bem
       escuro pra contraste — nunca laranja.
     - Parte inferior, sobre o gradiente: headline em maiúsculas (o hook do
       tema) em fonte bold branca/creme quebrado em 2-3 linhas curtas, com
       1-2 palavras-chave destacadas dentro de uma caixa/retângulo sólido
       dourado (mesma cor do selo do canto) com texto escuro dentro — nunca
       laranja, sempre dourado #C9A24B.
     - Canto inferior esquerdo: contador de página discreto "01/N" (N =
       total de slides) em texto pequeno cinza-claro/creme.
     - Canto inferior direito: selo discreto "ARRASTA →" em texto pequeno
       cinza-claro/creme com seta fina.
     Perfeitamente legível, sem erro de ortografia, sem letra cortada, sem
     pessoas/rostos reais (figuras simbólicas/objetos/robôs estilizados são
     permitidos, desde que não sejam fotos reais/fabricadas de pessoa
     específica).
  2-4. **Interiores** (3 slides): desmembrar a dica em 3 pontos concretos e
     numerados (ex.: 3 erros, 3 passos, 3 sinais) — cada slide com selo de
     contagem "N/5" e headline curto (o ponto) + texto de apoio explicando
     em 2-3 linhas. Se a dica não render pra 3 pontos naturalmente, pode
     usar 2 (ajustar o total de slides). **Variedade visual** (mesma regra
     dos Stories 6h): se um dos pontos tiver 2-4 valores numéricos
     comparáveis, pedir no prompt um mockup com gráfico de barras real
     comparando esses valores; se girar em torno de UM número central,
     pedir um número grande em destaque dourado; senão, texto simples é o
     padrão. Nunca forçar gráfico em ponto sem dado real.
  5. **CTA**: headline convidativo, texto de apoio opcional, botão/selo
     "SEGUIR →" — sempre convite pra seguir o perfil, nunca promessa de
     resultado específico.
- **Revisão obrigatória**: checklist completo da seção "Geração de imagem
  (Nano Banana) e revisão" pra cada slide — coerência entre os slides
  (a promessa da capa precisa ser cumprida pelos interiores) é um critério
  extra específico deste carrossel.
- **Legenda**: compor um texto curto (tema/hook da capa + 1-2 linhas de
  corpo + convite a seguir), seguindo a mesma regra de nexo da "Linha
  editorial" — a legenda não pode prometer o que os slides não entregam.
- **Publicação** (FEED, não Stories): baixar as 5 imagens geradas e
  publicar com `node scripts/publish_instagram.js --images <slide1.png> <slide2.png> <slide3.png> <slide4.png> <slide5.png> --caption "<legenda>"`
  (múltiplas imagens no `--images` já publica como carrossel; ajustar a
  lista se usou 4 slides em vez de 5).
- **Guardrails**: mesmos da seção "Stories diários 6h" (nunca fabricar
  número/resultado específico como se fosse dado real de cliente; nunca
  foto real/fabricada de pessoa citada).
- Template/renderizador usado no fallback sem crédito Nano Banana (ver seção
  "Geração de imagem (Nano Banana) e revisão" → "Fallback sem crédito"):
  `scripts/content-bank/templates/authority-carousel-template.html` +
  `scripts/export-tools/render_authority_carousel.js` — roda 100% dentro do
  mesmo sandbox em nuvem da rotina (Playwright + Node, sem depender do
  computador do usuário estar ligado), igual a qualquer outro passo.

## Geração de imagem (Nano Banana) e revisão
- Todos os 5 pilares do calendário **e a rotina de Stories/carrossel 6h**
  (desde 2026-08-20) geram TODAS as imagens via Nano Banana
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
  fundo preto/azul-marinho muito escuro (nunca azul elétrico/roxo/verde
  neon — paleta antiga), logo pequeno "davidaraujogestor" visível no canto.
  Interiores/CTA: linha fina dourada divisória visível; selo de contagem
  "N/total" visível nos interiores. **Capa da rotina de autoridade 6h**
  segue o estilo cinematográfico full-bleed próprio (ver "Carrossel de
  autoridade 6h" acima) — sem linha divisória, sem mockup, mas com badge
  dourado no canto superior direito, headline com destaque em caixa
  dourada, contador "01/N" e selo "ARRASTA →" visíveis. Se achar problema
  em qualquer imagem, gerar de novo ajustando o prompt daquele slide (até
  3 tentativas por imagem).
- Se a geração de qualquer slide falhar/reprovar 3x (depois da válvula de
  escape abaixo) por um motivo que NÃO seja falta de crédito/cota, reportar
  o erro claramente e NÃO publicar nada do post — não há fallback pro
  sistema antigo de IA (`gpt-image-1`) pra esse tipo de falha. Se o motivo
  FOR falta de crédito/cota, ver "Fallback sem crédito Nano Banana" abaixo
  — não desista, tem fallback pra esse caso específico.
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

### Fallback sem crédito Nano Banana (adicionado em 2026-09-19, a pedido
do usuário — "quando não tiver créditos no higgsfield, faça pelo claude")
Se o Higgsfield/Nano Banana devolver um erro de **cota/crédito** — textos
como `"Out of credits in the selected workspace"` ou `"You've reached the
daily generation limit for your grace period"` — isso é diferente de um
job travado (não se aplica a válvula de escape dos itens 1-3 acima, porque
não adianta tentar de novo: a API já rejeitou a geração antes de começar).
Nesse caso específico:
1. Confirme que é erro de cota mesmo (a mensagem já deixa claro) — não
   precisa cross-check com `show_generations`, já que nem chegou a criar
   job.
2. **Não desista e não pare a rotina** — troque IMEDIATAMENTE pro fallback
   local, que roda 100% dentro do sandbox em nuvem da própria rotina (sem
   depender de nenhum serviço externo pago, e sem depender do computador
   do usuário estar ligado): `node scripts/export-tools/render_authority_carousel.js <slides.json> <outDir>`
   (usa Playwright + o template `authority-carousel-template.html`, já
   pré-instalado no ambiente).
3. Monte o `slides.json` com os mesmos textos que seriam usados nos prompts
   do Nano Banana, adaptados aos campos do template:
   - Carrossel: `[{"type":"capa","tag":"<TEMA>","headline":"...","body":"...","icon":"target|briefcase"}, {"type":"interior"|"chart","headline":"...","body":"..."} × 3, {"type":"cta","headline":"...","body":"...","ctaLabel":"SEGUIR →"}]`
     (`icon`: `"target"` pra tráfego pago, `"briefcase"` pra comercial).
   - Post de imagem única: array com um só elemento `{"type":"capa", ...}`
     (mesmos campos) — o fallback não tem a versão "cinematográfica
     full-bleed" da capa (isso só existe via Nano Banana), então nesse
     modo a imagem sai no estilo dashboard/ícone padrão do template — é
     uma rede de segurança, não precisa ser visualmente idêntica ao normal.
   - **Alternância clara/escura (adicionado em 2026-09-23, a pedido do
     usuário — "os posts estão todos iguais e feio... a primeira imagem
     pode ser mais escura, a segunda mais clara, a 3 mais escura")**: o
     template já alterna automaticamente o tom de fundo por slide (índice
     par = escuro, ímpar = claro/creme, mesma paleta dourada nos dois) —
     não precisa fazer nada extra pra isso acontecer, é o comportamento
     padrão. Só passar `"tone":"dark"` ou `"tone":"light"` num slide
     específico se quiser forçar um tom fora da alternância automática
     (raro).
   - **Variedade de conteúdo visual — não deixar todo slide igual (texto
     corrido)**: usar `"type":"chart"` (em vez de `"interior"`) pro slide
     que tiver 2-4 valores comparáveis — vira gráfico de barras de verdade
     via `"visual":{"type":"bar","unit":"%","bars":[{"label":"...","value":34,"tone":"gold|blue|green|red|yellow"},...]}`
     — ou que girar em torno de UM número central — vira número grande em
     destaque via `"visual":{"type":"stat","value":"7 dias","label":"..."}`.
     Slide `"type":"capa"` (inclusive no post de imagem única, que só tem
     esse slide) também aceita o mesmo campo `"visual"` opcional, quando o
     tema permitir mostrar um gráfico/número já na capa. Só usar `"chart"`
     quando o dado for real (nunca inventar número pra caber num gráfico —
     mesmo guardrail de sempre); quando não houver dado numérico real,
     usar `"interior"` (texto) normalmente. Variar entre os 3 formatos
     (texto/gráfico/número) ao longo do carrossel em vez de repetir o
     mesmo em todos os slides.
   - O script gera `outDir/slide_1.png`, `slide_2.png`, etc. Revise cada
     uma normalmente (mesmo checklist de sempre) antes de publicar.
4. Se já tinha gerado algumas imagens via Nano Banana antes do erro de
   cota aparecer (ex.: capa ok, mas o slide 2 falhou por falta de crédito),
   pode misturar: mantenha as que já foram aprovadas e gere só as
   restantes via fallback local, pra não desperdiçar o que já funcionou.
5. Publique normalmente (mesmo comando `publish_instagram.js` de sempre) —
   pro Instagram não importa se a imagem veio do Nano Banana ou do
   render local, contanto que passe na revisão.
6. Registre no relatório final e no `recent-topics.json` que esse post
   usou o fallback local (campo livre, ex. `"fonte_imagem": "fallback
   local (sem crédito Nano Banana)"`), pra o usuário saber que precisa
   recarregar o crédito do Higgsfield quando quiser voltar ao visual
   cinematográfico completo.

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
- Template/renderizador dos Stories 6h e do carrossel de autoridade
  (`news-story-template.html` + `render_news_story.js`,
  `authority-carousel-template.html` + `render_authority_carousel.js`):
  **legado** desde 2026-08-20 — a rotina voltou a usar Nano Banana (ver
  seções "Stories diários 6h" e "Carrossel de autoridade 6h" acima),
  templates mantidos pra eventual reativação futura.
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
  rodar a rotina de Stories 6h em HTML/Playwright sem depender de Nano
  Banana — domínios mantidos liberados mesmo após a volta ao Nano Banana em
  2026-08-20 (não atrapalham, e o template Playwright continua como legado
  reativável).
- 6 rotinas cron em claude.ai/code/routines (5 do calendário de feed + 1 dos
  Stories 6h), cada
  uma com o `.env` recriado no início a partir dos valores no prompt da
  rotina (não há repositório privado nem secret store nesse fluxo — o
  repositório GitHub é público, então credenciais NUNCA vão para lá)
- `allowed_tools` de cada rotina inclui as ferramentas MCP do Higgsfield
  (`mcp__9c4f3976-f86a-4785-b11a-e53430fc6e9a__generate_image` e
  `__show_generations`) além de Bash/Read/Write/Edit/Glob/Grep
