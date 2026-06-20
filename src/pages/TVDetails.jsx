import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, SquarePlay } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { getTVDetails } from '../api/tmdb';
import { imageUrl } from '../api/client';
import { Spinner } from '../components/common/Loader';
import RatingStub from '../components/common/RatingStub';
import WatchlistButton from '../components/common/WatchlistButton';
import CastList from '../components/common/CastList';
import ContentRow from '../components/common/ContentRow';
import EpisodeList from '../components/tv/EpisodeList';
import { formatDate, getYear } from '../utils/helpers';

export default function TVDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: show, loading, error } = useFetch(() => getTVDetails(id), [id]);

  if (loading) return <Spinner label="Loading title…" />;
  if (error || !show) {
    return (
      <div className="text-center py-24 text-muted">
        Couldn't load this series. <Link to="/" className="text-gold hover:underline">Go home</Link>
      </div>
    );
  }

  const trailer = show.videos?.results?.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
  const backdrop = imageUrl(show.backdrop_path, 'original');
  const poster = imageUrl(show.poster_path, 'w500');

  return (
    <div className="pb-16">
      <div className="relative w-full h-[60vh] min-h-[420px] grain overflow-hidden">
        {backdrop && <img src={backdrop} alt="" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-base/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/10 to-transparent" />
      </div>

      <div className="relative -mt-40 sm:-mt-56 px-4 sm:px-8 flex flex-col sm:flex-row gap-6 sm:gap-10">
        <img
          src={poster}
          alt={show.name}
          className="hidden sm:block w-48 sm:w-64 rounded-lg ring-1 ring-edge shadow-2xl shadow-black/60 shrink-0"
        />

        <div className="flex-1 pt-2">
          {show.tagline && (
            <p className="text-gold font-display tracking-wide uppercase text-sm mb-2">{show.tagline}</p>
          )}
          <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wide leading-tight mb-3 text-balance">
            {show.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-muted mb-4">
            <RatingStub vote={show.vote_average} size="lg" />
            <span>{getYear(show.first_air_date)}</span>
            <span>
              {show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}
            </span>
            {show.genres?.length > 0 && <span>{show.genres.map((g) => g.name).join(' · ')}</span>}
          </div>

          <p className="text-sm sm:text-base text-muted max-w-2xl mb-6 text-balance">
            {show.overview || 'No description available.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/watch/tv/${show.id}/1/1`)}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-base font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <Play size={18} className="fill-base" /> Play S1 · E1
            </button>
            <WatchlistButton
              id={show.id}
              mediaType="tv"
              title={show.name}
              posterPath={show.poster_path}
              voteAverage={show.vote_average}
            />
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-muted hover:text-gold font-medium px-2 py-3 transition-colors"
              >
                <SquarePlay size={20} /> Watch Trailer
              </a>
            )}
          </div>

          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 text-sm max-w-xl">
            <div>
              <dt className="text-faint font-mono text-xs uppercase">Status</dt>
              <dd className="mt-0.5">{show.status || '—'}</dd>
            </div>
            <div>
              <dt className="text-faint font-mono text-xs uppercase">First Air Date</dt>
              <dd className="mt-0.5">{formatDate(show.first_air_date)}</dd>
            </div>
            <div>
              <dt className="text-faint font-mono text-xs uppercase">Episodes</dt>
              <dd className="mt-0.5">{show.number_of_episodes || '—'}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="px-4 sm:px-8 mt-12">
        <EpisodeList tvId={show.id} seasons={show.seasons} />
      </div>

      <div className="px-4 sm:px-8 mt-12">
        <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wide mb-4">Cast</h2>
        <CastList cast={show.credits?.cast || []} />
      </div>

      <div className="mt-12">
        <ContentRow title="More Like This" items={show.similar?.results} mediaType="tv" />
      </div>
    </div>
  );
}
