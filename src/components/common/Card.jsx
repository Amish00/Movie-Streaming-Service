import { Link } from 'react-router-dom';
import { Play, Plus, Check } from 'lucide-react';
import { imageUrl } from '../../api/client';
import { getTitle, getReleaseDate, getYear, getMediaType } from '../../utils/helpers';
import { useApp } from '../../hooks/useApp';
import RatingStub from './RatingStub';

export default function Card({ item, mediaType, className = 'w-full' }) {
  const type = mediaType || getMediaType(item);
  const { isInWatchlist, toggleWatchlist } = useApp();
  const inList = isInWatchlist(item.id, type);
  const poster = imageUrl(item.poster_path, 'w342');

  const handleToggle = (e) => {
    e.preventDefault();
    toggleWatchlist({
      id: item.id,
      mediaType: type,
      title: getTitle(item),
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
    });
  };

  return (
    <Link
      to={`/${type}/${item.id}`}
      className={`group ${className} focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg`}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface ring-1 ring-edge group-hover:ring-gold/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50">
        {poster ? (
          <img
            src={poster}
            alt={getTitle(item)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-faint text-xs px-3 text-center">
            {getTitle(item)}
          </div>
        )}

        <div className="absolute top-2 right-2">
          <RatingStub vote={item.vote_average} />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-base shrink-0">
              <Play size={14} className="fill-base text-base ml-0.5" />
            </span>
            <button
              onClick={handleToggle}
              aria-label={inList ? 'Remove from My List' : 'Add to My List'}
              className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-text hover:border-gold hover:text-gold transition-colors shrink-0"
            >
              {inList ? <Check size={15} /> : <Plus size={15} />}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm font-medium truncate group-hover:text-gold transition-colors">
        {getTitle(item)}
      </p>
      <p className="text-xs text-muted font-mono">
        {getYear(getReleaseDate(item))} · {type === 'tv' ? 'TV' : 'Movie'}
      </p>
    </Link>
  );
}
