import { ArrowRight, Play, Search, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { AlbumCard, ArtistCard, NewsCard } from '../components/MusicCards';
import { useMusicDrop } from '../components/MusicDropContext';
import { Hero, GenreMarquee } from '../components/Hero';
import { PickRow, PicksPreview } from '../components/Picks';
import { Container, FilterChips, PageHeader, SectionHeading } from '../components/Primitives';
import { albums, artists, news, MOODS, picks } from '../data/music';
import type { Album, Genre, Mood } from '../types';

const NEWS_GENRES = Array.from(new Set(news.map((item) => item.genre)));
const ALBUM_GENRES = Array.from(new Set(albums.map((item) => item.genre)));
const ARTIST_GENRES = Array.from(new Set(artists.map((item) => item.genre)));
const SORTS = [
  { id: 'rating', label: 'Nota' },
  { id: 'newest', label: 'Mais recentes' },
  { id: 'oldest', label: 'Mais antigos' },
  { id: 'az', label: 'A–Z' },
] as const;
type AlbumSort = (typeof SORTS)[number]['id'];

export function HomePage() {
  const [genre, setGenre] = useState<Genre | 'all'>('all');
  const [era, setEra] = useState<Album['era'] | 'all'>('all');
  const filteredNews = genre === 'all' ? news : news.filter((item) => item.genre === genre);
  const filteredAlbums = era === 'all' ? albums : albums.filter((item) => item.era === era);

  function chooseGenre(nextGenre: Genre) {
    setGenre(NEWS_GENRES.includes(nextGenre) ? nextGenre : 'all');
    document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Hero onGenre={chooseGenre} />
      <GenreMarquee />
      <section id="noticias" className="home-section">
        <Container>
          <SectionHeading
            eyebrow="Notícias & blog"
            title="O que está tocando"
            accent="agora"
            description="Reportagens, bastidores e tendências do mundo da música — curadas pela nossa redação."
            action={<Link className="button button-glass" to="/noticias">Todas as notícias <ArrowRight size={16} /></Link>}
          />
          <div className="filter-row">
            <FilterChips options={NEWS_GENRES} value={genre} onChange={setGenre} label="Filtrar notícias por gênero" />
          </div>
          {filteredNews.length === 0 ? (
            <p className="empty-state">Nenhuma notícia desse gênero ainda.</p>
          ) : (
            <div className={`news-grid${genre === 'all' ? ' news-grid--featured' : ''}`}>
              {filteredNews.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} featured={index === 0 && genre === 'all'} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section id="albuns" className="home-section albums-section">
        <Container>
          <SectionHeading
            eyebrow="Álbuns da semana"
            title="Os melhores do"
            accent="mundo"
            description="Clássicos que mudaram tudo e lançamentos que já nasceram eternos. Passe o mouse e dê o play."
            action={<FilterChips options={['Clássico', 'Atual'] as const} value={era} onChange={setEra} label="Filtrar álbuns por época" />}
          />
          <div className="album-grid">
            {filteredAlbums.slice(0, 4).map((album, index) => <AlbumCard key={album.id} album={album} index={index} />)}
          </div>
          <div className="center-action">
            <Link className="button button-glass button-large" to="/albuns">Ver ranking completo <ArrowRight size={17} /></Link>
          </div>
        </Container>
      </section>

      <section id="artistas" className="home-section">
        <Container>
          <SectionHeading
            eyebrow="Artists in focus"
            title="Artistas em"
            accent="foco"
            description="Quatro nomes que você precisa ouvir esta semana — e o disco por onde começar."
            action={<Link className="button button-glass" to="/artistas">Todos os artistas <ArrowRight size={16} /></Link>}
          />
          <div className="artist-grid">
            {artists.map((artist, index) => <ArtistCard key={artist.id} artist={artist} index={index} />)}
          </div>
        </Container>
      </section>
      <PicksPreview />
    </>
  );
}

export function NewsPage() {
  const { favorites } = useMusicDrop();
  const [genre, setGenre] = useState<Genre | 'all'>('all');
  const [query, setQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const term = query.trim().toLocaleLowerCase('pt-BR');
  const savedNewsCount = favorites.filter((id) => news.some((item) => item.id === id)).length;
  const filteredNews = news.filter((item) =>
    (genre === 'all' || item.genre === genre) &&
    (!onlySaved || favorites.includes(item.id)) &&
    (!term || `${item.title} ${item.excerpt}`.toLocaleLowerCase('pt-BR').includes(term)),
  );

  return (
    <>
      <PageHeader eyebrow="Notícias & blog" title="Tudo que" accent="soa novo" description="Reportagens, bastidores e tendências — do clube de jazz à pista de dança." />
      <section className="page-section">
        <Container>
          <div className="list-toolbar">
            <FilterChips options={NEWS_GENRES} value={genre} onChange={setGenre} label="Filtrar notícias por gênero" />
            <div className="list-tools">
              <label className="inline-search">
                <Search size={16} />
                <span className="visually-hidden">Buscar notícias</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar notícias..." />
              </label>
              <button
                type="button"
                className={`saved-filter${onlySaved ? ' is-active' : ''}`}
                onClick={() => setOnlySaved((value) => !value)}
                aria-pressed={onlySaved}
              >
                <span aria-hidden="true">▣</span> Salvos ({savedNewsCount})
              </button>
            </div>
          </div>
          {filteredNews.length === 0 ? (
            <p className="empty-state">
              {onlySaved ? 'Você ainda não salvou nenhuma notícia. Use o marcador nos cards para guardar uma.' : 'Nenhuma notícia encontrada.'}
            </p>
          ) : (
            <div className="news-grid">
              {filteredNews.map((item, index) => <NewsCard key={item.id} item={item} index={index} />)}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export function ArtistsPage() {
  const [genre, setGenre] = useState<Genre | 'all'>('all');
  const filteredArtists = genre === 'all' ? artists : artists.filter((artist) => artist.genre === genre);

  return (
    <>
      <PageHeader eyebrow="Artists in focus" title="Vozes que" accent="importam" description="Uma seleção de artistas que estão redefinindo seus gêneros — e o som recomendado para começar." />
      <section className="page-section">
        <Container>
          <div className="filter-row">
            <FilterChips options={ARTIST_GENRES} value={genre} onChange={setGenre} label="Filtrar artistas por gênero" />
          </div>
          <div className="artist-grid">
            {filteredArtists.map((artist, index) => <ArtistCard key={artist.id} artist={artist} index={index} detailed />)}
          </div>
        </Container>
      </section>
    </>
  );
}

export function AlbumsPage() {
  const [genre, setGenre] = useState<Genre | 'all'>('all');
  const [sort, setSort] = useState<AlbumSort>('rating');
  const filteredAlbums = albums
    .filter((album) => genre === 'all' || album.genre === genre)
    .slice()
    .sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating || a.year - b.year;
      if (sort === 'newest') return b.year - a.year;
      if (sort === 'oldest') return a.year - b.year;
      return a.title.localeCompare(b.title);
    });

  return (
    <>
      <PageHeader eyebrow="Álbuns" title="Discos para" accent="a vida toda" description="Do vinil de 1959 ao lançamento que já virou clássico. Filtre, ordene e dê o play." />
      <section className="page-section">
        <Container>
          <div className="list-toolbar">
            <FilterChips options={ALBUM_GENRES} value={genre} onChange={setGenre} label="Filtrar álbuns por gênero" />
            <div className="sort-control" role="group" aria-label="Ordenar álbuns">
              {SORTS.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSort(item.id)}
                  aria-pressed={sort === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="album-grid album-grid--all">
            {filteredAlbums.map((album, index) => <AlbumCard key={album.id} album={album} index={index} />)}
          </div>
        </Container>
      </section>
    </>
  );
}

export function PicksPage() {
  const { play } = useMusicDrop();
  const [mood, setMood] = useState<Mood | 'all'>('all');
  const filteredPicks = mood === 'all' ? picks : picks.filter((pick) => pick.mood === mood);

  function playRandom() {
    const pick = filteredPicks[Math.floor(Math.random() * filteredPicks.length)];
    if (pick) play(pick);
  }

  return (
    <>
      <PageHeader eyebrow="Indicações" title="Trilha para" accent="cada momento" description="Nossos curadores escolhem faixas toda semana. Escolha o clima e aperte o play." />
      <section className="page-section">
        <Container>
          <div className="list-toolbar picks-toolbar">
            <FilterChips options={MOODS} value={mood} onChange={setMood} allLabel="Tudo" label="Filtrar indicações por clima" />
            <div className="list-tools">
              <button type="button" className="button button-neon button-large" onClick={() => filteredPicks[0] && play(filteredPicks[0])}>
                <Play size={16} fill="currentColor" /> Tocar
              </button>
              <button type="button" className="button button-glass button-large" onClick={playRandom}>
                <Shuffle size={16} /> Aleatório
              </button>
            </div>
          </div>
          <div className="pick-list-panel">
            <div className="pick-list-header">
              <span>#</span><span /><span>Faixa</span><span>Por que ouvir</span><span>Duração</span>
            </div>
            <ol className="pick-list">
              {filteredPicks.map((pick, index) => <PickRow key={pick.id} pick={pick} index={index} />)}
            </ol>
          </div>
        </Container>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Página não encontrada</h1>
      <p>Essa faixa saiu do disco. A página que você procura não existe.</p>
      <Link to="/" className="button button-neon">Voltar ao início <ArrowRight size={16} /></Link>
    </section>
  );
}
