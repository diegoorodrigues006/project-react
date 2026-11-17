<div align="center">

# 🎧 MusicDrop

### Descubra novos sons. Explore histórias. Encontre sua próxima faixa favorita.

Uma experiência musical feita para quem gosta de ir além do play: notícias, artistas, álbuns e indicações reunidos em um só lugar.

[Explorar o projeto](#-começando) · [Funcionalidades](#-o-que-você-encontra) · [Tecnologias](#-tecnologias)

</div>

---

## ✨ Sobre o projeto

O **MusicDrop** é uma aplicação web de curadoria musical desenvolvida com React e TypeScript. O projeto reúne conteúdo editorial e ferramentas de descoberta em uma interface responsiva, com páginas dedicadas a diferentes formas de explorar música.

## 🎶 O que você encontra

- **Início:** destaques editoriais, notícias, álbuns, artistas e seleções da semana.
- **Notícias:** busca por texto, filtro por gênero e opção para guardar matérias favoritas.
- **Artistas:** descubra artistas em destaque e explore recomendações por gênero.
- **Álbuns:** explore a seleção de discos, filtre por gênero e ordene por nota, data ou título.
- **Indicações:** faixas organizadas por clima, com opções para iniciar uma seleção ou escolher uma faixa aleatória.
- **Curtidas e favoritos:** suas escolhas ficam salvas no armazenamento local do navegador.
- **Player demonstrativo:** controles de reprodução e progresso para experimentar a interface.
- **Newsletter demonstrativa:** validação do endereço e confirmação visual de inscrição.

> **Importante:** o player é uma demonstração de interface e não transmite áudio. A newsletter também é demonstrativa: não há envio ou cadastro em um serviço externo.

## 🧭 Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Página inicial e destaques |
| `/noticias` | Notícias, busca, filtros e itens salvos |
| `/artistas` | Artistas em foco |
| `/albuns` | Álbuns, filtros e ordenação |
| `/indicacoes` | Faixas recomendadas por clima |

## 🛠️ Tecnologias

- **React 19** e **TypeScript**
- **React Router** para navegação
- **CSS** para estilos e layout responsivo
- **Lucide React** para ícones
- **Create React App** para desenvolvimento e build

## 🚀 Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) e npm instalados
- Git (opcional, para clonar o repositório)

### Instalação e execução

No terminal, clone o repositório e entre na pasta da aplicação:

```bash
git clone https://github.com/diegoorodrigues006/project-react.git
cd project-react/project-react
npm install
npm start
```

O servidor de desenvolvimento ficará disponível em [http://localhost:3000](http://localhost:3000).

### Scripts disponíveis

```bash
npm start                 # inicia o servidor de desenvolvimento
npm test -- --watchAll=false  # executa os testes uma vez
npm run build             # gera a versão de produção
```

O resultado de produção é gerado na pasta `build/`.

## 📁 Organização do projeto

```text
project-react/
├── public/                 # arquivos públicos da aplicação
├── src/
│   ├── components/         # componentes reutilizáveis e contexto
│   ├── data/               # conteúdo musical utilizado pela interface
│   ├── lib/                # funções auxiliares
│   ├── pages/               # páginas e rotas da aplicação
│   ├── App.tsx              # estrutura principal e navegação
│   └── index.tsx            # ponto de entrada
├── package.json
└── README.md
```

## 💡 Próximas evoluções

- Conectar o player a uma fonte real de áudio.
- Integrar a newsletter a um serviço de cadastro.
- Buscar notícias e catálogo musical em uma API.
- Adicionar imagens de demonstração e testes para os principais fluxos.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas! Abra uma [issue](https://github.com/diegoorodrigues006/project-react/issues) para relatar um problema ou propor uma ideia.

---

<div align="center">

Feito com 🎵 e curiosidade musical.

</div>
