import album1 from '../assets/album-1.jpg';
import album2 from '../assets/album-2.jpg';
import album3 from '../assets/album-3.jpg';
import album4 from '../assets/album-4.jpg';
import album5 from '../assets/album-5.jpg';
import album6 from '../assets/album-6.jpg';
import album7 from '../assets/album-7.jpg';
import album8 from '../assets/album-8.jpg';
import artist1 from '../assets/artist-1.jpg';
import artist2 from '../assets/artist-2.jpg';
import artist3 from '../assets/artist-3.jpg';
import artist4 from '../assets/artist-4.jpg';
import heroConcert from '../assets/hero-concert.jpg';
import newsElectronic from '../assets/news-electronic.jpg';
import newsHiphop from '../assets/news-hiphop.jpg';
import newsJazz from '../assets/news-jazz.jpg';
import newsRock from '../assets/news-rock.jpg';
import newsStudio from '../assets/news-studio.jpg';
import newsVinyl from '../assets/news-vinyl.jpg';
import type { Album, Artist, Genre, Mood, NewsItem, Pick, Track } from '../types';

export const GENRES = [
  'Jazz',
  'Hip-Hop',
  'Rock',
  'Eletrônica',
  'MPB',
  'R&B',
  'Soul',
  'Latina',
] as const satisfies readonly Genre[];

export const MOODS = ['Para relaxar', 'Para focar', 'Para a noite', 'Para dançar'] as const satisfies readonly Mood[];

export const heroImage = heroConcert;

export const featured = {
  kicker: 'Destaque da semana',
  title: 'A noite em que o jazz voltou a lotar os clubes',
  subtitle:
    'Uma nova geração de pianistas e saxofonistas está transformando pequenos palcos em templos de improviso. Ouça a playlist que preparamos.',
  tags: ['Jazz', 'Soul', 'Hip-Hop', 'Rock'] as Genre[],
  track: {
    id: 'featured-so-what',
    title: 'So What',
    artist: 'Miles Davis',
    cover: album1,
    duration: 562,
  } satisfies Track,
};

export const news: NewsItem[] = [
  {
    id: 'n1',
    title: 'O renascimento dos clubes de jazz nas grandes cidades',
    excerpt:
      'Casas pequenas, ingressos baratos e muito improviso: por que uma geração criada no streaming está descobrindo o jazz ao vivo.',
    date: '2026-11-16',
    readTime: '6 min',
    genre: 'Jazz',
    image: newsJazz,
    baseLikes: 482,
    author: 'Clara Menezes',
  },
  {
    id: 'n2',
    title: 'Hip-hop nacional domina os festivais de verão',
    excerpt:
      'Os line-ups de 2027 confirmam a virada: rap e trap ocupam os palcos principais e trazem um público recorde.',
    date: '2026-11-15',
    readTime: '4 min',
    genre: 'Hip-Hop',
    image: newsHiphop,
    baseLikes: 1290,
    author: 'Rafael Torres',
  },
  {
    id: 'n3',
    title: 'Vinil segue em alta: o ritual de ouvir um disco inteiro',
    excerpt:
      'As vendas de LPs continuam crescendo. Conversamos com lojistas e colecionadores sobre o prazer de colocar a agulha no disco.',
    date: '2026-11-14',
    readTime: '5 min',
    genre: 'Soul',
    image: newsVinyl,
    baseLikes: 734,
    author: 'Beatriz Lobo',
  },
  {
    id: 'n4',
    title: 'Guitarras de volta: a nova onda do rock independente',
    excerpt:
      'Bandas que gravam ao vivo, em fita, e lotam casas noturnas provam que o rock nunca saiu de cena.',
    date: '2026-11-12',
    readTime: '7 min',
    genre: 'Rock',
    image: newsRock,
    baseLikes: 356,
    author: 'Diego Alves',
  },
  {
    id: 'n5',
    title: 'Dentro do estúdio: como nasce um álbum em 2026',
    excerpt:
      'Da demo no celular à mixagem final — produtores revelam as ferramentas e os hábitos que moldam o som de hoje.',
    date: '2026-11-10',
    readTime: '8 min',
    genre: 'R&B',
    image: newsStudio,
    baseLikes: 518,
    author: 'Marina Duarte',
  },
  {
    id: 'n6',
    title: 'Música eletrônica ao ar livre: os festivais que valem a viagem',
    excerpt:
      'Lasers, pistas na praia e sets de nascer do sol. Um guia com os encontros eletrônicos mais imperdíveis da temporada.',
    date: '2026-11-08',
    readTime: '5 min',
    genre: 'Eletrônica',
    image: newsElectronic,
    baseLikes: 941,
    author: 'Lucas Prado',
  },
];

export const albums: Album[] = [
  { id: 'a1', title: 'Kind of Blue', artist: 'Miles Davis', year: 1959, genre: 'Jazz', rating: 5, cover: album1, track: 'So What', duration: 562, era: 'Clássico' },
  { id: 'a2', title: 'A Love Supreme', artist: 'John Coltrane', year: 1965, genre: 'Jazz', rating: 5, cover: album2, track: 'Acknowledgement', duration: 469, era: 'Clássico' },
  { id: 'a3', title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', year: 2015, genre: 'Hip-Hop', rating: 5, cover: album3, track: 'Alright', duration: 219, era: 'Atual' },
  { id: 'a4', title: 'OK Computer', artist: 'Radiohead', year: 1997, genre: 'Rock', rating: 5, cover: album4, track: 'Paranoid Android', duration: 383, era: 'Clássico' },
  { id: 'a5', title: 'Rumours', artist: 'Fleetwood Mac', year: 1977, genre: 'Rock', rating: 4.5, cover: album5, track: 'Dreams', duration: 257, era: 'Clássico' },
  { id: 'a6', title: 'Buena Vista Social Club', artist: 'Buena Vista Social Club', year: 1997, genre: 'Latina', rating: 4.5, cover: album6, track: 'Chan Chan', duration: 256, era: 'Clássico' },
  { id: 'a7', title: 'Clube da Esquina', artist: 'Milton Nascimento & Lô Borges', year: 1972, genre: 'MPB', rating: 5, cover: album7, track: 'Cais', duration: 225, era: 'Clássico' },
  { id: 'a8', title: 'SOS', artist: 'SZA', year: 2022, genre: 'R&B', rating: 4, cover: album8, track: 'Snooze', duration: 201, era: 'Atual' },
];

export const artists: Artist[] = [
  {
    id: 'ar1',
    name: 'Kamasi Washington',
    genre: 'Jazz',
    origin: 'Los Angeles, EUA',
    bio: 'Saxofonista que levou o jazz espiritual de volta às arenas, com arranjos épicos, coros e orquestra.',
    recommended: 'Fearless Movement (2024)',
    recommendedTrack: 'Asha the First',
    image: artist1,
    listeners: '2,1 mi',
  },
  {
    id: 'ar2',
    name: 'Liniker',
    genre: 'Soul',
    origin: 'Araraquara, Brasil',
    bio: 'Voz potente do soul brasileiro, mistura MPB, funk e R&B com letras íntimas e arranjos luxuosos.',
    recommended: 'Caju (2024)',
    recommendedTrack: 'Caju',
    image: artist2,
    listeners: '3,4 mi',
  },
  {
    id: 'ar3',
    name: 'Little Simz',
    genre: 'Hip-Hop',
    origin: 'Londres, Reino Unido',
    bio: 'Rapper e compositora de rimas afiadas e produção cinematográfica — uma das vozes mais relevantes do rap atual.',
    recommended: 'Sometimes I Might Be Introvert (2021)',
    recommendedTrack: 'Introvert',
    image: artist3,
    listeners: '4,8 mi',
  },
  {
    id: 'ar4',
    name: 'Khruangbin',
    genre: 'Rock',
    origin: 'Houston, EUA',
    bio: 'Trio instrumental que funde funk psicodélico, surf rock e sonoridades do mundo inteiro em grooves hipnóticos.',
    recommended: 'A La Sala (2024)',
    recommendedTrack: 'May Ninth',
    image: artist4,
    listeners: '6,2 mi',
  },
];

export const picks: Pick[] = [
  { id: 'p1', title: 'So What', artist: 'Miles Davis', cover: album1, duration: 562, mood: 'Para relaxar', note: 'O contrabaixo que abre a faixa é a melhor forma de desacelerar o dia.', curator: 'Clara' },
  { id: 'p2', title: 'Cais', artist: 'Milton Nascimento', cover: album7, duration: 225, mood: 'Para relaxar', note: 'Piano, voz e uma melancolia que abraça.', curator: 'Beatriz' },
  { id: 'p3', title: 'Acknowledgement', artist: 'John Coltrane', cover: album2, duration: 469, mood: 'Para focar', note: 'Hipnótico do primeiro ao último compasso.', curator: 'Clara' },
  { id: 'p4', title: 'Paranoid Android', artist: 'Radiohead', cover: album4, duration: 383, mood: 'Para focar', note: 'Seis minutos que mudam de forma o tempo todo.', curator: 'Diego' },
  { id: 'p5', title: 'Snooze', artist: 'SZA', cover: album8, duration: 201, mood: 'Para a noite', note: 'R&B suave para as luzes baixas.', curator: 'Marina' },
  { id: 'p6', title: 'Caju', artist: 'Liniker', cover: artist2, duration: 312, mood: 'Para a noite', note: 'Soul brasileiro em estado de graça.', curator: 'Beatriz' },
  { id: 'p7', title: 'Alright', artist: 'Kendrick Lamar', cover: album3, duration: 219, mood: 'Para dançar', note: 'Um hino que funciona em qualquer pista.', curator: 'Rafael' },
  { id: 'p8', title: 'Chan Chan', artist: 'Buena Vista Social Club', cover: album6, duration: 256, mood: 'Para dançar', note: 'Impossível ficar parado com esse violão.', curator: 'Lucas' },
  { id: 'p9', title: 'Dreams', artist: 'Fleetwood Mac', cover: album5, duration: 257, mood: 'Para relaxar', note: 'Clássico absoluto para fim de tarde.', curator: 'Diego' },
  { id: 'p10', title: 'May Ninth', artist: 'Khruangbin', cover: artist4, duration: 246, mood: 'Para a noite', note: 'Groove lento e hipnótico.', curator: 'Lucas' },
];

export function albumToTrack(album: Album): Track {
  return {
    id: `album-${album.id}`,
    title: album.track,
    artist: album.artist,
    cover: album.cover,
    duration: album.duration,
  };
}

export function artistToTrack(artist: Artist): Track {
  return {
    id: `artist-${artist.id}`,
    title: artist.recommendedTrack,
    artist: artist.name,
    cover: artist.image,
    duration: 240,
  };
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function formatTime(seconds: number): string {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}
