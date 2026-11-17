import { ArrowDown, Pause, Play } from 'lucide-react';

import { featured, GENRES, heroImage } from '../data/music';
import type { Genre } from '../types';
import { useIsPlaying, useMusicDrop } from './MusicDropContext';

export function Hero({ onGenre }: { onGenre: (genre: Genre) => void }) {
  const { play } = useMusicDrop();
  const playing = useIsPlaying(featured.track.id);

  return (
    <section className="hero-section">
      <img
        className="hero-background"
        src={heroImage}
        alt="Piano de cauda iluminado em um palco de jazz"
        width={1920}
        height={1088}
      />
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-content">
        <p className="hero-kicker"><span>Nº 47</span>{featured.kicker}</p>
        <h1>A noite em que o <em>jazz</em> voltou a lotar os <strong>clubes</strong></h1>
        <p className="hero-subtitle">{featured.subtitle}</p>
        <div className="hero-actions">
          <button type="button" className="button button-neon button-large" onClick={() => play(featured.track)}>
            {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
            {playing ? 'Pausar' : 'Ouvir agora'}
          </button>
          <a className="button button-glass button-large" href="#noticias">Ler a matéria</a>
        </div>
        <div className="hero-tags" aria-label="Gêneros em destaque">
          {featured.tags.map((tag) => (
            <button type="button" key={tag} onClick={() => onGenre(tag)}>#{tag}</button>
          ))}
        </div>
      </div>
      <a href="#noticias" className="hero-scroll">
        Rolar <ArrowDown size={16} />
      </a>
    </section>
  );
}

export function GenreMarquee() {
  const items = [...GENRES, ...GENRES];
  return (
    <div className="genre-marquee" aria-label={`Gêneros musicais: ${GENRES.join(', ')}`}>
      <div className="genre-marquee-track" aria-hidden="true">
        {items.map((genre, index) => (
          <span key={`${genre}-${index}`} className={index % 2 ? 'genre-marquee-alt' : ''}>
            {genre}<i />
          </span>
        ))}
      </div>
    </div>
  );
}
