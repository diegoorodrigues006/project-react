import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { clampProgress, toggleId } from '../lib/music-logic';
import type { Track } from '../types';

interface PlayerState {
  track: Track | null;
  playing: boolean;
  progress: number;
}

interface MusicDropState {
  liked: string[];
  favorites: string[];
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  player: PlayerState;
  play: (track: Track) => void;
  togglePlay: () => void;
  seek: (seconds: number) => void;
  close: () => void;
}

interface SavedState {
  liked: string[];
  favorites: string[];
}

const STORAGE_KEY = 'musicdrop:v1';
const MusicDropContext = createContext<MusicDropState | null>(null);

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function readSavedState(raw: string | null): SavedState {
  if (!raw) return { liked: [], favorites: [] };

  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Os dados salvos do MusicDrop não têm o formato esperado.');
  }

  const stored = parsed as Record<string, unknown>;
  if (!isStringArray(stored.liked) || !isStringArray(stored.favorites)) {
    throw new Error('A lista de curtidas ou favoritos salvos é inválida.');
  }

  return { liked: stored.liked, favorites: stored.favorites };
}

export function MusicDropProvider({ children }: { children: ReactNode }) {
  const [liked, setLiked] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [player, setPlayer] = useState<PlayerState>({
    track: null,
    playing: false,
    progress: 0,
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = readSavedState(window.localStorage.getItem(STORAGE_KEY));
      setLiked(saved.liked);
      setFavorites(saved.favorites);
    } catch (error) {
      console.error('Não foi possível carregar curtidas e favoritos salvos.', error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ liked, favorites }));
    } catch (error) {
      console.error('Não foi possível salvar curtidas e favoritos.', error);
    }
  }, [favorites, hydrated, liked]);

  useEffect(() => {
    if (!player.playing || !player.track) return undefined;
    const timer = window.setInterval(() => {
      setPlayer((current) => {
        if (!current.track || !current.playing) return current;
        const progress = current.progress + 1;
        if (progress >= current.track.duration) {
          return { ...current, progress: current.track.duration, playing: false };
        }
        return { ...current, progress };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [player.playing, player.track]);

  const toggleLike = useCallback((id: string) => {
    setLiked((current) => toggleId(current, id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => toggleId(current, id));
  }, []);

  const play = useCallback((track: Track) => {
    setPlayer((current) => {
      if (current.track?.id !== track.id) {
        return { track, playing: true, progress: 0 };
      }
      if (current.progress >= track.duration) {
        return { track, playing: true, progress: 0 };
      }
      return { ...current, playing: !current.playing };
    });
  }, []);

  const togglePlay = useCallback(() => {
    setPlayer((current) => {
      if (!current.track) return current;
      if (!current.playing && current.progress >= current.track.duration) {
        return { ...current, progress: 0, playing: true };
      }
      return { ...current, playing: !current.playing };
    });
  }, []);

  const seek = useCallback((seconds: number) => {
    setPlayer((current) =>
      current.track
        ? { ...current, progress: clampProgress(seconds, current.track) }
        : current,
    );
  }, []);

  const close = useCallback(() => {
    setPlayer({ track: null, playing: false, progress: 0 });
  }, []);

  const value = useMemo(
    () => ({
      liked,
      favorites,
      toggleLike,
      toggleFavorite,
      player,
      play,
      togglePlay,
      seek,
      close,
    }),
    [liked, favorites, toggleLike, toggleFavorite, player, play, togglePlay, seek, close],
  );

  return <MusicDropContext.Provider value={value}>{children}</MusicDropContext.Provider>;
}

export function useMusicDrop() {
  const state = useContext(MusicDropContext);
  if (!state) throw new Error('useMusicDrop deve ser usado dentro de MusicDropProvider.');
  return state;
}

export function useIsPlaying(trackId: string): boolean {
  const { player } = useMusicDrop();
  return player.track?.id === trackId && player.playing;
}
