import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { imageUrl } from '../../api/client';
import { getTVSeasonDetails } from '../../api/tmdb';
import useFetch from '../../hooks/useFetch';
import { Spinner } from '../common/Loader';
import { truncate, formatRuntime } from '../../utils/helpers';

export default function EpisodeList({ tvId, seasons = [], activeSeason, activeEpisode }) {
  const realSeasons = seasons.filter((s) => s.season_number > 0);
  const [season, setSeason] = useState(activeSeason || realSeasons[0]?.season_number || 1);
  const navigate = useNavigate();

  const { data, loading } = useFetch(() => getTVSeasonDetails(tvId, season), [tvId, season]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="font-display text-xl uppercase tracking-wide">Episodes</h3>
        <select
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
          className="bg-surface border border-edge rounded-md text-sm px-3 py-2 outline-none focus:border-gold/60"
        >
          {realSeasons.map((s) => (
            <option key={s.id} value={s.season_number}>
              {s.name} ({s.episode_count} episodes)
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner label="Loading episodes…" />
      ) : (
        <div className="flex flex-col divide-y divide-edge">
          {(data?.episodes || []).map((ep) => {
            const isActive = season === activeSeason && ep.episode_number === activeEpisode;
            return (
              <button
                key={ep.id}
                onClick={() => navigate(`/watch/tv/${tvId}/${season}/${ep.episode_number}`)}
                className={`group flex gap-4 py-4 text-left transition-colors ${
                  isActive ? 'bg-surface/60 -mx-3 px-3 rounded-lg' : 'hover:bg-surface/40 -mx-3 px-3 rounded-lg'
                }`}
              >
                <div className="relative w-32 sm:w-40 aspect-video rounded-md overflow-hidden bg-surface shrink-0">
                  {ep.still_path ? (
                    <img src={imageUrl(ep.still_path, 'w300')} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-faint text-xs">No image</div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play size={20} className="fill-text text-text" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm sm:text-base font-medium truncate ${isActive ? 'text-gold' : ''}`}>
                      {ep.episode_number}. {ep.name}
                    </p>
                    {ep.runtime && (
                      <span className="hidden sm:flex items-center gap-1 text-xs text-faint font-mono shrink-0">
                        <Clock size={12} /> {formatRuntime(ep.runtime)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted mt-1 line-clamp-2">
                    {truncate(ep.overview, 140) || 'No description available.'}
                  </p>
                </div>
              </button>
            );
          })}
          {(!data?.episodes || data.episodes.length === 0) && (
            <p className="py-6 text-sm text-muted">No episodes found for this season.</p>
          )}
        </div>
      )}
    </div>
  );
}
