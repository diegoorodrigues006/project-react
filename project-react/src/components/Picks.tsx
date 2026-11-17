import { ArrowRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

import { formatTime, picks } from '../data/music';
import type { Pick } from '../types';
import { useIsPlaying, useMusicDrop } from './MusicDropContext';
import { Container, SectionHeading } from './Primitives';

export function PickRow({ pick, index }: { pick: Pick; index: number }) {
  const { player, play } = useMusicDrop();
  const playing = useIsPlaying(pick.id);
  const isCurrent = player.track?.id === pick.id;

  return (
    <li className={`pick-row${isCurrent ? ' pick-row--current' : ''}`} style={{ animationDelay: `${index * 50}ms` }}>
      <button
        type="button"
        className="pick-play"
        onClick={() => play(pick)}
        aria-label={playing ? `Pausar ${pick.title}` : `Ouvir ${pick.title}`}
      >
        <span className="pick-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="pick-play-icon">{playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}</span>
      </button>
      <img className="pick-cover" src={pick.cover} alt="" loading="lazy" />
      <div className="pick-track">
        <strong>{pick.title}</strong>
        <span>{pick.artist}</span>
      </div>
      <p className="pick-note">“{pick.note}” <span>— {pick.curator}</span></p>
      <time>{formatTime(pick.duration)}</time>
    </li>
  );
}

export function PicksPreview() {
  return (
    <section className="picks-preview">
      <Container>
        <div className="picks-preview-panel">
          <SectionHeading
            eyebrow="Indicações da redação"
            title="O drop da"
            accent="semana"
            description="Faixas escolhidas a dedo pelos nossos curadores. Toque e deixe rolar."
            action={<Link className="button button-neon" to="/indicacoes">Ver indicações <ArrowRight size={16} /></Link>}
          />
          <ol className="pick-list">
            {picks.slice(0, 5).map((pick, index) => <PickRow key={pick.id} pick={pick} index={index} />)}
          </ol>
        </div>
      </Container>
    </section>
  );
}
