export type Genre =
  | 'Jazz'
  | 'Hip-Hop'
  | 'Rock'
  | 'Eletrônica'
  | 'MPB'
  | 'R&B'
  | 'Soul'
  | 'Latina';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  genre: Genre;
  image: string;
  baseLikes: number;
  author: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: Genre;
  rating: number;
  cover: string;
  track: string;
  duration: number;
  era: 'Clássico' | 'Atual';
}

export interface Artist {
  id: string;
  name: string;
  genre: Genre;
  origin: string;
  bio: string;
  recommended: string;
  recommendedTrack: string;
  image: string;
  listeners: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: number;
}

export type Mood = 'Para relaxar' | 'Para focar' | 'Para a noite' | 'Para dançar';

export interface Pick extends Track {
  mood: Mood;
  note: string;
  curator: string;
}
