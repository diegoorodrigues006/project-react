import { Pause, Play, RotateCcw, X } from 'lucide-react';

import { formatTime } from '../data/music';
import { useMusicDrop } from './MusicDropContext';
import { Equalizer } from './Primitives';

export function NowPlayingBar() {
  const { player, togglePlay, seek, close } = useMusicDrop();
  const { track, playing, progress } = player;
  if (!track) return null;

  const percentage = (progress / track.duration) * 100;
  return (
    <div className="now-playing-wrap" role="region" aria-label="Tocando agora">
      <div className="now-playing">
        <img className={`now-playing-cover${playing ? ' is-spinning' : ''}`} src={track.cover} alt="" />
        <div className="now-playing-details">
          <div className="now-playing-title">
            <strong>{track.title}</strong>
            <Equalizer active={playing} />
          </div>
          <span>{track.artist}</span>
          <div className="player-progress">
            <time>{formatTime(progress)}</time>
            <input
              type="range"
              min={0}
              max={track.duration}
              value={progress}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Progresso da faixa simulada"
              style={{
                background: `linear-gradient(90deg, var(--primary) ${percentage}%, rgba(255,255,255,.17) ${percentage}%)`,
              }}
            />
            <time>{formatTime(track.duration)}</time>
          </div>
        </div>
        <button type="button" className="player-secondary" onClick={() => seek(0)} aria-label="Voltar ao início">
          <RotateCcw size={16} />
        </button>
        <button type="button" className="player-toggle" onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Tocar'}>
          {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button type="button" className="player-close" onClick={close} aria-label="Fechar player">
          <X size={17} />
        </button>
        <span className="player-demo-label">PLAYER DEMONSTRATIVO</span>
      </div>
    </div>
  );
}
