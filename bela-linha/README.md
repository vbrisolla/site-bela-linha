# Bela Linha — Bordados personalizados

Site vitrine da Bela Linha. Todos os pedidos vão para o WhatsApp.

Site estático: só HTML, CSS e JavaScript, sem build e sem dependências.

## Estrutura

```
index.html   → conteúdo da página
style.css    → visual (cores no topo, em :root)
script.js    → links do WhatsApp e filtro da vitrine
img/         → logo, fotos e favicon
```

## Como adicionar uma peça

1. Coloque a foto em `img/` (de preferência JPG em pé, proporção 4:5, até ~900 px de largura).
2. No `index.html`, copie um bloco `<article class="peca">` e troque a foto, o `alt`, o tipo, o nome e o `data-cat` (`bastidores`, `quadros` ou `chaveiros`).
3. O link do WhatsApp com o nome da peça é gerado sozinho.

## Como trocar o número do WhatsApp

Na primeira linha do `script.js`, mude a constante `WHATSAPP` (DDI + DDD + número, só números).

## Publicar

1. Crie um repositório no GitHub e envie estes arquivos.
2. Na Vercel: **Add New → Project**, importe o repositório, deixe o Framework Preset como **Other** e clique em **Deploy**.
3. Cada `git push` publica de novo automaticamente.
