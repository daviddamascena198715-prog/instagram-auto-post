# Automação de publicação — Instagram @davidaraujogestor

## Autorização permanente
O usuário (David Araújo) autorizou publicação automática no Instagram
@davidaraujogestor, sem confirmação a cada post, dentro do escopo abaixo.
Autorização dada em conversa no Claude Code em 2026-08-11.

Qualquer publicação fora desse escopo (outro horário, outro tipo de conteúdo,
outro perfil) ainda exige confirmação explícita do usuário.

## Escopo autorizado
- Perfil: @davidaraujogestor (Instagram Business ID em `.env`)
- Horários diários (horário de Brasília), todos publicando imagem:
  - **9h15** — post de imagem única, gerado com o template de marca (HTML/CSS, sem IA)
  - **13h** — post de imagem única, gerado com Nano Banana (Higgsfield), com
    revisão do próprio agente antes de publicar (ortografia, legibilidade,
    coerência, ausência de pessoas); se falhar ou reprovar 3 tentativas,
    usa como alternativa a API da OpenAI (`gpt-image-1`)
  - **20h** — carrossel de 5 imagens, gerado com o template de marca (HTML/CSS, sem IA)
- Publicação 100% automática, sem pedir aprovação a cada post individual
- Roda **somente na nuvem** (rotinas agendadas), não depende do PC do usuário estar ligado

## Linha editorial
- **Persona do usuário**: gestor de tráfego pago, mas o conteúdo NUNCA deve
  usar o termo "gestor de tráfego" diretamente — usar bordões como "ajudo
  você a lucrar mais", "vender mais todo dia", "faço seu negócio vender no
  automático", etc.
- **Público-alvo**: donos de negócio que precisam de gestão de tráfego pago
  mas ainda não sabem disso / não perceberam essa necessidade.
- **Temas**: exclusivamente tráfego pago e dores que gestão de tráfego
  resolve — resultados de clientes, erros comuns em anúncios, bastidores
  de como o trabalho é feito, verba mal direcionada, concorrência ocupando
  espaço, vaidade x venda, criativo cansado, campanha esquecida sem
  otimização, e datas comerciais perdidas por falta de planejamento. NÃO
  usar temas de inteligência artificial/agentes de IA. Banco completo em
  `scripts/content-bank/themes.json` (9 temas, rotação por dia — mesmo
  índice de dia usado nos 3 horários, então o tema é o mesmo o dia todo).
- **Toda peça mostra problema + solução, com o usuário como quem resolve**:
  não basta uma afirmação bonita (ex.: "números não mentem" sozinho não
  conta história nenhuma). Cada post precisa deixar claro o "antes"
  (a dor/erro) e o "depois" (o resultado de ter alguém cuidando disso).
  No post das 13h (imagem única), isso vira uma composição visual
  antes/depois lado a lado (metade esquerda = problema, metade direita =
  solução, com uma linha/selo dividindo as duas, rótulos "ANTES"/"DEPOIS").
  Na legenda e nos slides do carrossel, a mesma lógica se aplica em texto:
  mostrar a dor, mostrar a virada, e deixar claro que quem resolve isso é
  o usuário. Cada tema do banco já tem esse par problema/solução definido
  em `theme.post.gptPrompt` (imagem) e nas legendas.
- **Proibido pesquisar notícias em tempo real** para gerar conteúdo. Já
  tentamos isso (carrossel das 20h) e o agente publicou uma informação
  falsa — o risco de alucinação/erro factual é grande demais para
  publicação sem revisão humana. Usar SOMENTE os temas fixos e revisados
  do banco de conteúdo (`scripts/content-bank/themes.json`).
- **Imagens do template de marca** (manhã e carrossel): renderizadas via
  `scripts/export-tools/render_slides.js`, paleta roxo/dourado/preto,
  fontes Fraunces + Outfit.
- **Imagens via IA** (post das 13h — Nano Banana como padrão, `gpt-image-1`
  como alternativa): usar SOMENTE para deixar o criativo mais bonito/
  impactante com gráficos e efeitos visuais abstratos (barras, linhas de
  gráfico, luz, partículas, vidro), sempre na composição antes/depois
  descrita acima. **NUNCA gerar pessoas ou rostos** — um teste gerou uma
  pessoa com aparência artificial/estranha (uncanny valley) e o usuário
  pediu para remover esse post e não repetir. Prompts de IA devem sempre
  incluir explicitamente "no people, no faces".
- **Revisão antes de publicar (post das 13h)**: depois de gerar a imagem
  via Nano Banana, o próprio agente da rotina precisa visualizar o
  resultado (ferramenta `Read`) e checar: texto em português correto e
  sem erro de ortografia, totalmente legível (sem letra cortada/borrada),
  frase com nexo/coerente com o tema do dia, sem pessoas/rostos, dentro da
  paleta da marca. Se achar problema, gerar de novo ajustando o prompt
  (até 3 tentativas no total). Se ainda assim não aprovar, usar o
  método alternativo já validado (`gpt-image-1`) pra não perder o post do
  dia.
- **Idioma**: todo texto embutido nas artes e todas as legendas em
  português do Brasil.
- **CTA sempre volta pro usuário, em qualquer tema**: independente do
  assunto do post (tráfego pago, artes/criativos, sites, o que for), a
  chamada pra ação final da legenda precisa deixar claro que é o usuário
  quem faz aquilo pro negócio de quem está lendo — nunca uma dica
  genérica de "faça você mesmo" ou algo que a pessoa resolva sozinha.
  Sempre terminar convidando a pessoa a chamar no direct para contratar
  o serviço (seja gestão de tráfego, criação de arte/criativo, criação
  de site, etc.).
- **Padrão premium sempre**: todo post/carrossel gerado (automático ou sob
  pedido) precisa ter acabamento de alto padrão — visual bonito, copy que
  converte, nada de arte/legenda "de rascunho". Antes de criar a arte,
  usar as skills de design disponíveis (ex.: `ui-ux-pro-max`, `dataviz`)
  como referência de composição, tipografia, hierarquia visual e paleta,
  mesmo quando o conteúdo é gerado via template HTML ou via IA de imagem.
  O objetivo é sempre alta conversão, não só ficar bonito.

## Arquivos
- Credenciais: `.env` (Instagram + OpenAI) — nunca commitado (está no `.gitignore`)
- Banco de conteúdo (temas fixos, rotação por dia): `scripts/content-bank/themes.json`
- Template de marca (HTML): `scripts/content-bank/templates/slide-template.html`
- Renderizador do template: `scripts/export-tools/render_slides.js`
  - Detecta e usa Chromium pré-instalado no ambiente da nuvem quando existe
    (evita reinstalar a cada execução)
- Orquestrador do dia: `scripts/daily_publish.js --type morning|post|carousel [--use-gpt]`
- Publicador no Instagram: `scripts/publish_instagram.js`
  - Uso: `node publish_instagram.js --images foto1.png [foto2.png ...] --caption "texto"`
  - Múltiplas imagens = carrossel automaticamente
  - Faz upload da imagem via uguu.se (com fallback para litterbox.catbox.moe)

## Ambiente de nuvem (rotinas)
- Acesso à rede: **Personalizado**, com `graph.instagram.com`, `uguu.se`,
  `litterbox.catbox.moe` e `api.openai.com` liberados (necessário além da
  lista padrão de gerenciadores de pacotes)
- 3 rotinas cron em claude.ai/code/routines, uma por horário, cada uma com
  o `.env` recriado no início a partir dos valores no prompt da rotina
  (não há repositório privado nem secret store nesse fluxo — o repositório
  GitHub é público, então credenciais NUNCA vão para lá)
