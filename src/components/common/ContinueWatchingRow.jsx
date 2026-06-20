import { Link } from 'react-router-dom';
import { Play, X } from 'lucide-react';
import { imageUrl } from '../../api/client';
import { useApp } from '../../hooks/useApp';

export default function ContinueWatchingRow() {
  const { continueWatchingList, removeFromContinueWatching } = useApp();

  if (continueWatchingList.length === 0) return null;

  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl tracking-wide uppercase text-text mb-3 px-4 sm:px-8">
        Continue Watching
      </h2>
      <div className="rail flex gap-3 overflow-x-auto px-4 sm:px-8 pb-2">
        {continueWatchingList.map((entry) => {
          const isTV = entry.mediaType === 'tv';
          const href = isTV
            ? `/watch/tv/${entry.id}/${entry.season || 1}/${entry.episode || 1}`
            : `/watch/movie/${entry.id}`;
          return (
            <div key={`${entry.mediaType}-${entry.id}`} className="group relative shrink-0 w-[220px] sm:w-[260px]">
              <Link to={href} className="block">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-surface ring-1 ring-edge group-hover:ring-gold/50 transition-all">
                  {entry.backdropPath ? (
                    <img src={imageUrl(entry.backdropPath, 'w500')} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-faint text-xs px-3 text-center">
                      {entry.title}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play size={26} className="fill-text text-text" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-black/50">
                    <div className="h-full bg-gold" style={{ width: `${Math.min(entry.progress || 0, 100)}%` }} />
                  </div>
                </div>
                <p className="mt-2 text-sm font-medium truncate">{entry.title}</p>
                {isTV && (
                  <p className="text-xs text-muted font-mono">
                    S{entry.season} · E{entry.episode}
                  </p>
                )}
              </Link>
              <button
                onClick={() => removeFromContinueWatching(entry.id, entry.mediaType)}
                aria-label="Remove from continue watching"
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 text-text flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black transition-opacity"
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
