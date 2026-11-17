# MusicDrop

Site responsivo de notícias, álbuns e curadoria musical, construído com React e TypeScript.

## Executar localmente

Na pasta `project-react`, instale as dependências e inicie o servidor:

```bash
npm install
npm start
```

O Create React App abrirá o site em `http://localhost:3000`.

## Páginas

- `/` — destaque editorial, notícias, álbuns, artistas e seleções da semana.
- `/noticias` — busca, filtro por gênero, curtidas e favoritos.
- `/artistas` — artistas em destaque e faixas recomendadas.
- `/albuns` — filtro por gênero, ordenação e favoritos.
- `/indicacoes` — faixas filtradas por clima, com reprodução e seleção aleatória.

Curtidas e favoritos ficam salvos no navegador. O player simula os controles e o progresso; não transmite áudio. A newsletter valida o endereço e demonstra a confirmação na tela, mas ainda não envia os dados a um serviço.

## Verificações

```bash
npm test -- --watchAll=false
npm run build
```
