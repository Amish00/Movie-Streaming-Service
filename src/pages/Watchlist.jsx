import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import { useApp } from '../hooks/useApp';

export default function Watchlist() {
  const { watchlist } = useApp();

  return (
    <div className="px-4 sm:px-8 py-8 min-h-[60vh]">
      <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide mb-6 flex items-center gap-2">
        <Bookmark size={22} className="text-gold" /> My List
      </h1>

      {watchlist.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="mb-4">You haven't saved anything yet.</p>
          <Link to="/" className="text-gold hover:underline font-medium">
            Browse what's trending →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {watchlist.map((entry) => (
            <Card
              key={`${entry.mediaType}-${entry.id}`}
              mediaType={entry.mediaType}
              item={{
                id: entry.id,
                title: entry.title,
                name: entry.title,
                poster_path: entry.posterPath,
                media_type: entry.mediaType,
                vote_average: entry.voteAverage,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
