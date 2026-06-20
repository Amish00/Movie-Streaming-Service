import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { imageUrl } from '../../api/client';
import { getTitle, getReleaseDate, getYear, truncate, getMediaType } from '../../utils/helpers';
import useGenreMap, { namesFromIds } from '../../hooks/useGenreMap';
import RatingStub from './RatingStub';

const ROTATE_MS = 7000;

export default function HeroBanner({ items = [] }) {
  const slides = useMemo(() => items.slice(0, 6), [items]);
  const [active, setActive] = useState(0);
  const genreMap = useGenreMap();
  const navigate = useNavigate();

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const item = slides[active];
  const type = getMediaType(item);
  const genres = namesFromIds(genreMap, item.genre_ids).slice(0, 3);
  const backdrop = imageUrl(item.backdrop_path, 'original');

  const handlePlay = () => {
    if (type === 'tv') {
      navigate(`/watch/tv/${item.id}/1/1`);
    } else {
      navigate(`/watch/movie/${item.id}`);
    }
  };

  return (
    <div className="relative w-full h-[78vh] min-h-[480px] max-h-[760px] overflow-hidden grain">
      {/* Backdrop */}
      <div className="absolute inset-0">
        {backdrop && (
          <img
            key={backdrop}
            src={backdrop}
            alt=""
            className="w-full h-full object-cover animate-fade-in"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-base/10 to-transparent" />
      </div>

      {/* Signature element: vertical marquee strip, like a cinema marquee ribbon */}
      <div className="hidden sm:flex absolute left-0 top-0 h-full w-10 bg-base/70 border-r border-gold/30 backdrop-blur-sm z-10 items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-3 text-gold/80 [writing-mode:vertical-rl] rotate-180 font-display text-xs tracking-[0.3em] uppercase whitespace-nowrap">
          <span>Now Showing</span>
          <span className="text-gold/40">★</span>
          <span>{type === 'tv' ? 'Series' : 'Feature'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:pl-20 sm:pr-12 pb-16 sm:pb-20 max-w-3xl">
        <div className="flex items-center gap-3 mb-3 text-sm font-mono text-muted">
          <RatingStub vote={item.vote_average} size="lg" />
          <span>{getYear(getReleaseDate(item))}</span>
          {genres.length > 0 && (
            <span className="hidden sm:inline truncate">{genres.join(' · ')}</span>
          )}
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-wide leading-[0.95] text-balance mb-4 drop-shadow-lg">
          {getTitle(item)}
        </h1>

        <p className="text-sm sm:text-base text-muted text-balance mb-6 max-w-xl hidden sm:block">
          {truncate(item.overview, 200)}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlay}
            className="flex items-center gap-2 bg-gold hover:bg-gold-light text-base font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-md transition-colors"
          >
            <Play size={18} className="fill-base" /> Play
          </button>
          <button
            onClick={() => navigate(`/${type}/${item.id}`)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-text font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-md transition-colors"
          >
            <Info size={18} /> More Info
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 right-6 z-10 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1 rounded-full transition-all ${
                i === active ? 'w-6 bg-gold' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
