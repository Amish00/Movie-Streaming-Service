import { useCallback, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { getMovieDetails, getTVDetails } from '../api/tmdb';
import { Spinner } from '../components/common/Loader';
import VidkingPlayer from '../components/player/VidkingPlayer';
import RatingStub from '../components/common/RatingStub';
import EpisodeList from '../components/tv/EpisodeList';
import { useApp } from '../hooks/useApp';
import { formatRuntime, getYear } from '../utils/helpers';

export default function Watch({ mediaType }) {
  const params = useParams();
  const id = params.id;
  const season = mediaType === 'tv' ? Number(params.season) : undefined;
  const episode = mediaType === 'tv' ? Number(params.episode) : undefined;

  const { data: details, loading } = useFetch(
    () => (mediaType === 'tv' ? getTVDetails(id) : getMovieDetails(id)),
    [mediaType, id]
  );

  const { saveProgress, getProgress } = useApp();
  const savedProgress = getProgress(Number(id), mediaType);
  const resumeSeconds =
    savedProgress?.mediaType === mediaType &&
    (mediaType === 'movie' || (savedProgress.season === season && savedProgress.episode === episode))
      ? savedProgress.timestamp
      : undefined;

  const lastSaveRef = useRef(0);

  const handleProgress = useCallback(
    (eventData) => {
      const now = Date.now();
      const shouldThrottle = eventData.event === 'timeupdate' && now - lastSaveRef.current < 4000;
      if (shouldThrottle) return;
      lastSaveRef.current = now;

      saveProgress({
        id: Number(id),
        mediaType,
        title: details?.title || details?.name,
        backdropPath: details?.backdrop_path,
        season,
        episode,
        progress: eventData.progress,
        timestamp: eventData.currentTime,
        duration: eventData.duration,
      });
    },
    [id, mediaType, season, episode, details, saveProgress]
  );

  const title = useMemo(() => {
    if (!details) return '';
    if (mediaType === 'tv') return `${details.name} — S${season} · E${episode}`;
    return details.title;
  }, [details, mediaType, season, episode]);

  if (loading) return <Spinner label="Loading player…" />;

  return (
    <div className="pb-16">
      <div className="px-4 sm:px-8 pt-4 pb-3">
        <Link
          to={mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors"
        >
          <ArrowLeft size={16} /> Back to details
        </Link>
      </div>

      <div className="px-4 sm:px-8">
        <VidkingPlayer
          mediaType={mediaType}
          tmdbId={id}
          season={season}
          episode={episode}
          resumeSeconds={resumeSeconds}
          onProgress={handleProgress}
        />
      </div>

      {details && (
        <div className="px-4 sm:px-8 mt-6">
          <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide mb-2 text-balance">
            {title}
          </h1>
          <div className="flex items-center gap-3 text-sm font-mono text-muted mb-3">
            <RatingStub vote={details.vote_average} />
            <span>{getYear(details.release_date || details.first_air_date)}</span>
            {details.runtime && <span>{formatRuntime(details.runtime)}</span>}
          </div>
          <p className="text-sm text-muted text-balance">{details.overview}</p>
        </div>
      )}

      {mediaType === 'tv' && details && (
        <div className="px-4 sm:px-8 mt-10">
          <EpisodeList tvId={id} seasons={details.seasons} activeSeason={season} activeEpisode={episode} />
        </div>
      )}
    </div>
  );
}
