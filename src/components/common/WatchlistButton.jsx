import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

export default function WatchlistButton({ id, mediaType, title, posterPath, voteAverage, className = '' }) {
  const { isInWatchlist, toggleWatchlist } = useApp();
  const inList = isInWatchlist(id, mediaType);

  return (
    <button
      onClick={() => toggleWatchlist({ id, mediaType, title, posterPath, voteAverage })}
      className={`flex items-center gap-2 font-medium px-5 py-2.5 sm:py-3 rounded-md border transition-colors ${
        inList
          ? 'bg-gold/15 border-gold text-gold'
          : 'bg-white/10 border-white/20 text-text hover:border-gold/60 hover:text-gold'
      } ${className}`}
    >
      {inList ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      {inList ? 'In My List' : 'Add to My List'}
    </button>
  );
}
