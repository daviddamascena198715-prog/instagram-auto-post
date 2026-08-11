# Automação de publicação — Instagram @davidaraujogestor

## Autorização permanente
O usuário (David Araújo) autorizou publicação automática no Instagram
@davidaraujogestor, sem confirmação a cada post, dentro do escopo abaixo.
Autorização dada em conversa no Claude Code em 2026-08-11:

> "Autorizo o Claude a publicar automaticamente no Instagram @davidaraujogestor,
> nos horários 9h/13h/20h, com o conteúdo sobre tráfego pago e IA que
> combinamos, sem pedir aprovação a cada post."

Qualquer publicação fora desse escopo (outro horário, outro tipo de conteúdo,
outro perfil) ainda exige confirmação explícita do usuário.

## Escopo autorizado
- Perfil: @davidaraujogestor (Instagram Business ID em `.env`)
- Horários diários: 9h (Story), 13h (post imagem única), 20h (carrossel)
- Publicação automática, sem pedir aprovação a cada post individual

## Linha editorial
- **Persona do usuário**: gestor de tráfego pago, mas o conteúdo NUNCA deve
  usar o termo "gestor de tráfego" diretamente — usar bordões como "ajudo
  você a lucrar mais", "vender mais todo dia", "faço seu negócio vender no
  automático", etc.
- **Público-alvo**: donos de negócio que precisam de gestão de tráfego pago
  mas ainda não sabem disso / não perceberam essa necessidade.
- **Temas**: exclusivamente tráfego pago, resultados de clientes, erros
  comuns em anúncios, e bastidores de como o trabalho é feito. NÃO usar
  temas de inteligência artificial/agentes de IA — o conteúdo deve girar
  em torno do serviço que o usuário presta (gestão de tráfego pago),
  sempre com potencial de viralizar (formatos de prova social, antes/depois,
  erro comum, bastidores).
- **Imagens**: gerar com a API da OpenAI (`gpt-image-1`, chave em `.env`).
  Para alguns posts, usar estilo realista/fotográfico e impactante (não só
  ilustração flat) quando o tema pedir mais autoridade/prova social.
- **Idioma**: todo texto embutido nas artes e todas as legendas em
  português do Brasil.

## Arquivos
- Credenciais: `.env` (Instagram + OpenAI)
- Script de publicação: `scripts/publish_instagram.js`
  - Uso: `node publish_instagram.js --images foto1.png [foto2.png ...] --caption "texto"`
  - Múltiplas imagens = carrossel automaticamente
- Exportador de carrossel HTML→PNG: `scripts/export-tools/export_slides.js`
