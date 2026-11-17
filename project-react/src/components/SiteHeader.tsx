import { Camera, Menu, Play, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { albums, artists, news } from '../data/music';
import { SiteLogo } from './SiteLogo';

const navigation = [
  { to: '/', label: 'Home' },
  { to: '/noticias', label: 'Notícias' },
  { to: '/artistas', label: 'Artistas' },
  { to: '/albuns', label: 'Álbuns' },
  { to: '/indicacoes', label: 'Indicações' },
];

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  kind: 'Notícia' | 'Álbum' | 'Artista';
  to: '/noticias' | '/albuns' | '/artistas';
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo<SearchResult[]>(() => {
    const all: SearchResult[] = [
      ...news.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: item.genre,
        image: item.image,
        kind: 'Notícia' as const,
        to: '/noticias' as const,
      })),
      ...albums.map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: `${item.artist} · ${item.year}`,
        image: item.cover,
        kind: 'Álbum' as const,
        to: '/albuns' as const,
      })),
      ...artists.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: item.genre,
        image: item.image,
        kind: 'Artista' as const,
        to: '/artistas' as const,
      })),
    ];
    const term = query.trim().toLocaleLowerCase('pt-BR');
    return (term
      ? all.filter((result) =>
          `${result.title} ${result.subtitle}`.toLocaleLowerCase('pt-BR').includes(term),
        )
      : all.filter((_, index) => index % 3 === 0)
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
    else setQuery('');
  }, [searchOpen]);

  function openResult(result: SearchResult) {
    setSearchOpen(false);
    navigate(result.to);
  }

  return (
    <>
      <header className="site-header">
        <div className={`header-bar${scrolled ? ' header-bar--scrolled' : ''}`}>
          <SiteLogo onClick={() => setMenuOpen(false)} />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <button type="button" className="search-trigger" onClick={() => setSearchOpen(true)}>
              <Search size={16} /> <span>Buscar</span> <kbd>Ctrl/⌘ K</kbd>
            </button>
            <button
              type="button"
              className="mobile-search icon-button"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} />
            </button>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
              <Camera size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-link">
              <Play size={16} fill="currentColor" />
            </a>
            <button
              type="button"
              className="mobile-menu icon-button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Menu móvel">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {searchOpen && (
        <div
          className="search-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Buscar no MusicDrop">
            <div className="search-dialog-input">
              <Search size={20} />
              <input
                ref={searchInput}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque artistas, álbuns ou notícias..."
                aria-label="Termo de busca"
              />
              <button type="button" className="icon-button" aria-label="Fechar busca" onClick={() => setSearchOpen(false)}>
                <X size={19} />
              </button>
            </div>
            <p className="search-results-label">{query ? `${results.length} resultado(s)` : 'Sugestões'}</p>
            <div className="search-results">
              {results.length === 0 ? (
                <p className="search-empty">Nada encontrado para “{query}”.</p>
              ) : (
                results.map((result) => (
                  <button
                    type="button"
                    key={`${result.kind}-${result.id}`}
                    className="search-result"
                    onClick={() => openResult(result)}
                  >
                    <img src={result.image} alt="" />
                    <span className="search-result-copy">
                      <strong>{result.title}</strong>
                      <small>{result.subtitle}</small>
                    </span>
                    <span className="search-result-kind">{result.kind}</span>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
