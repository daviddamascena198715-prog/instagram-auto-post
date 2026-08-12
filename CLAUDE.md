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
  - **13h** — post de imagem única, gerado com a API da OpenAI (`gpt-image-1`)
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
- **Temas**: exclusivamente tráfego pago, resultados de clientes, erros
  comuns em anúncios, e bastidores de como o trabalho é feito. NÃO usar
  temas de inteligência artificial/agentes de IA.
- **Proibido pesquisar notícias em tempo real** para gerar conteúdo. Já
  tentamos isso (carrossel das 20h) e o agente publicou uma informação
  falsa — o risco de alucinação/erro factual é grande demais para
  publicação sem revisão humana. Usar SOMENTE os temas fixos e revisados
  do banco de conteúdo (`scripts/content-bank/themes.json`).
- **Imagens do template de marca** (manhã e carrossel): renderizadas via
  `scripts/export-tools/render_slides.js`, paleta roxo/dourado/preto,
  fontes Fraunces + Outfit.
- **Imagens via GPT** (post das 13h, `gpt-image-1`): usar SOMENTE para
  deixar o criativo mais bonito/impactante com gráficos e efeitos visuais
  abstratos (barras, linhas de gráfico, luz, partículas, vidro). **NUNCA
  gerar pessoas ou rostos** — um teste gerou uma pessoa com aparência
  artificial/estranha (uncanny valley) e o usuário pediu para remover
  esse post e não repetir. Prompts de IA devem sempre incluir
  explicitamente "no people, no faces".
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
