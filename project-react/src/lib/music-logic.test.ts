import { clampProgress, toggleId, validateEmail } from './music-logic';
import type { Track } from '../types';

const sampleTrack: Track = {
  id: 'track-1',
  title: 'Sample',
  artist: 'MusicDrop',
  cover: '/cover.jpg',
  duration: 180,
};

describe('MusicDrop music logic', () => {
  it('toggles an id without creating duplicates', () => {
    expect(toggleId(['saved'], 'saved')).toEqual([]);
    expect(toggleId([], 'saved')).toEqual(['saved']);
  });

  it('trims and validates newsletter email addresses', () => {
    expect(validateEmail('  listener@example.com  ')).toEqual({
      ok: true,
      email: 'listener@example.com',
    });
    expect(validateEmail('not-an-email')).toEqual({
      ok: false,
      error: 'Digite um e-mail válido.',
    });
  });

  it('keeps player seeking inside the track duration', () => {
    expect(clampProgress(-4, sampleTrack)).toBe(0);
    expect(clampProgress(500, sampleTrack)).toBe(180);
  });
});
