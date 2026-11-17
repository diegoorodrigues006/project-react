import type { Track } from '../types';

export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id];
}

export function likeCount(base: number, liked: boolean): number {
  return base + Number(liked);
}

export function compactNumber(value: number): string {
  return value >= 1000
    ? `${(value / 1000).toFixed(1).replace('.', ',').replace(',0', '')} mil`
    : String(value);
}

export type EmailValidation =
  | { ok: true; email: string }
  | { ok: false; error: string };

export function validateEmail(value: string): EmailValidation {
  const email = value.trim();
  if (!email) return { ok: false, error: 'Digite seu e-mail.' };
  if (email.length > 255) return { ok: false, error: 'O e-mail deve ter até 255 caracteres.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Digite um e-mail válido.' };
  }
  return { ok: true, email };
}

export function clampProgress(seconds: number, track: Track): number {
  return Math.min(track.duration, Math.max(0, Math.floor(seconds)));
}
