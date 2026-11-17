import { Bookmark, Clock3, Headphones, Heart, MapPin, Pause, Play } from 'lucide-react';

import { albumToTrack, artistToTrack, formatDate } from '../data/music';
import { compactNumber, likeCount } from '../lib/music-logic';
import type { Album, Artist, NewsItem } from '../types';
import { Equalizer, StarRating } from './Primitives';
import { useIsPlaying, useMusicDrop } from './MusicDropContext';

export function NewsCard({
  item,
  featured = false,
  index = 0,
}: {
  item: NewsItem;
  featured?: boolean;
  index?: number;
}) {
  const { liked, favorites, toggleLike, toggleFavorite } = useMusicDrop();
  const isLiked = liked.includes(item.id);
  const isSaved = favorites.includes(item.id);

  return (
    <article
      className={`news-card${featured ? ' news-card--featured' : ''}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="news-card-image">
        <img src={item.image} alt="" loading="lazy" width={1024} height={768} />
        <span className="genre-pill">{item.genre}</span>
        <button
          type="button"
          className={`icon-button news-save${isSaved ? ' is-saved' : ''}`}
          onClick={() => toggleFavorite(item.id)}
          aria-label={isSaved ? 'Remover notícia dos favoritos' : 'Salvar notícia nos favoritos'}
          aria-pressed={isSaved}
        >
          <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="news-card-body">
        <div className="news-meta">
          <time dateTime={item.date}>{formatDate(item.date)}</time>
          <span className="meta-separator" />
          <span><Clock3 size={12} /> {item.readTime}</span>
        </div>
        <h3>{item.title}</h3>
        <p className="news-excerpt">{item.excerpt}</p>
        <div className="news-card-footer">
          <span className="author">por <strong>{item.author}</strong></span>
          <button
            type="button"
            className={`like-button${isLiked ? ' is-liked' : ''}`}
            onClick={() => toggleLike(item.id)}
            aria-pressed={isLiked}
            aria-label={isLiked ? 'Descurtir notícia' : 'Curtir notícia'}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{compactNumber(likeCount(item.baseLikes, isLiked))}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function AlbumCard({ album, index = 0 }: { album: Album; index?: number }) {
  const { play, favorites, toggleFavorite } = useMusicDrop();
  const track = albumToTrack(album);
  const playing = useIsPlaying(track.id);
  const isSaved = favorites.includes(album.id);

  return (
    <article className="album-card" style={{ animationDelay: `${index * 60}ms` }}>
      <div className="album-artwork">
        <div className={`vinyl-disc${playing ? ' vinyl-disc--playing' : ''}`} aria-hidden="true" />
        <div className="album-sleeve">
          <img src={album.cover} alt={`Capa de ${album.title}`} loading="lazy" width={816} height={816} />
          <span className="era-pill">{album.era}</span>
          <button
            type="button"
            className={`album-play${playing ? ' is-playing' : ''}`}
            onClick={() => play(track)}
            aria-label={playing ? `Pausar ${album.track}` : `Ouvir ${album.track}`}
          >
            {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
          </button>
        </div>
      </div>
      <div className="album-details">
        <div className="album-info">
          <h3>{album.title}</h3>
          <p>{album.artist} <span>·</span> {album.year}</p>
          <div className="album-score"><StarRating value={album.rating} /><strong>{album.rating.toFixed(1)}</strong></div>
        </div>
        <button
          type="button"
          className={`icon-button album-favorite${isSaved ? ' is-saved' : ''}`}
          onClick={() => toggleFavorite(album.id)}
          aria-label={isSaved ? 'Remover álbum dos favoritos' : 'Salvar álbum nos favoritos'}
          aria-pressed={isSaved}
        >
          <Heart size={18} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}

export function ArtistCard({
  artist,
  index = 0,
  detailed = false,
}: {
  artist: Artist;
  index?: number;
  detailed?: boolean;
}) {
  const { play } = useMusicDrop();
  const track = artistToTrack(artist);
  const playing = useIsPlaying(track.id);

  return (
    <article
      className={`artist-card${detailed ? ' artist-card--detailed' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="artist-photo">
        <img src={artist.image} alt={`Retrato de ${artist.name}`} loading="lazy" width={768} height={960} />
        <div className="artist-photo-caption">
          <span className="listener-count"><Headphones size={13} /> {artist.listeners} ouvintes</span>
          <h3>{artist.name}</h3>
          <p><MapPin size={12} /> {artist.origin} <span>·</span> {artist.genre}</p>
        </div>
      </div>
      <div className="artist-card-body">
        <p className="artist-bio">{artist.bio}</p>
        <div className="artist-recommendation">
          <button
            type="button"
            className="artist-play"
            onClick={() => play(track)}
            aria-label={playing ? `Pausar ${artist.recommendedTrack}` : `Ouvir ${artist.recommendedTrack}`}
          >
            {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
          </button>
          <div>
            <span>RECOMENDADO PARA COMEÇAR</span>
            <strong>{artist.recommended}</strong>
          </div>
          {playing && <Equalizer />}
        </div>
      </div>
    </article>
  );
}
