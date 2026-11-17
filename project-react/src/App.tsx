import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { MusicDropProvider } from './components/MusicDropContext';
import { NewsletterFooter } from './components/NewsletterFooter';
import { NowPlayingBar } from './components/NowPlayingBar';
import { SiteHeader } from './components/SiteHeader';
import {
  AlbumsPage,
  ArtistsPage,
  HomePage,
  NewsPage,
  NotFoundPage,
  PicksPage,
} from './pages/Pages';

const pageMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'MusicDrop 🎵 — Notícias, álbuns e curadoria musical',
    description: 'O destaque da semana, notícias de música, álbuns essenciais e artistas em foco.',
  },
  '/noticias': {
    title: 'Notícias de música — MusicDrop',
    description: 'Reportagens, bastidores e tendências de jazz, hip-hop, rock, eletrônica e muito mais.',
  },
  '/artistas': {
    title: 'Artistas em foco — MusicDrop',
    description: 'Conheça artistas em destaque e descubra por qual faixa começar.',
  },
  '/albuns': {
    title: 'Melhores álbuns do mundo — MusicDrop',
    description: 'Ranking de álbuns clássicos e atuais com notas, ano, gênero e faixa recomendada.',
  },
  '/indicacoes': {
    title: 'Indicações da semana — MusicDrop',
    description: 'Faixas escolhidas pelos curadores do MusicDrop para cada momento.',
  },
};

function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = pageMetadata[pathname] ?? {
      title: 'Página não encontrada — MusicDrop',
      description: 'A página que você procura não existe no MusicDrop.',
    };
    document.title = metadata.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = metadata.description;
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <MusicDropProvider>
        <PageMetadata />
        <SiteHeader />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/artistas" element={<ArtistsPage />} />
            <Route path="/albuns" element={<AlbumsPage />} />
            <Route path="/indicacoes" element={<PicksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <NewsletterFooter />
        <NowPlayingBar />
      </MusicDropProvider>
    </BrowserRouter>
  );
}

export default App;
