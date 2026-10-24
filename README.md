# Data-Cred — app instalável (PWA)

Publicado em: https://solucoesinformaticasrv-lab.github.io/data-cred-app/

Casca instalável do **Data-Cred** (controle de empréstimos). A página abre o app publicado no Google Apps Script dentro de uma tela cheia, para que ele possa ser instalado no celular ou no computador como um aplicativo.

## Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Abre o Data-Cred (link `/exec` na constante `APP_URL`) |
| `manifest.json` | Nome, cores (azul `#002776`) e ícones do app instalado |
| `sw.js` | Service worker: guarda só esta casca, nunca os dados do app |
| `icons/` | Ícones 192, 512, maskable, Apple e favicon |

## Trocar o link do Apps Script

Edite a linha `const APP_URL = "..."` no `index.html` e faça commit na `main`. Se mudar ícones ou o `sw.js`, aumente a versão em `CACHE_NAME` (ex.: `datacred-shell-v2`).

## Ajuste obrigatório no Apps Script

Para o app abrir dentro desta página, o `doGet` precisa permitir ser exibido em iframe. Nas duas saídas do `doGet` (tela principal e "Acesso Suspenso"), acrescente:

```js
.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
```

Depois, **Implantar → Gerenciar implantações → editar → Nova versão**, mantendo o mesmo link `/exec`.

## Instalar

- **Android (Chrome):** abra o site → menu ⋮ → *Instalar app*.
- **iPhone (Safari):** abra o site → Compartilhar → *Adicionar à Tela de Início*.
- **Computador (Chrome/Edge):** ícone de instalar na barra de endereço.

Se aparecer a tela de login do Google ou a página ficar em branco, use o botão **Abrir o Data-Cred** que aparece após alguns segundos.
