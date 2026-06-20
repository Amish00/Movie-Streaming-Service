import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, SquarePlay } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { getMovieDetails } from '../api/tmdb';
import { imageUrl } from '../api/client';
import { Spinner } from '../components/common/Loader';
import RatingStub from '../components/common/RatingStub';
import WatchlistButton from '../components/common/WatchlistButton';
import CastList from '../components/common/CastList';
import ContentRow from '../components/common/ContentRow';
import { formatRuntime, formatDate, getYear, formatMoney } from '../utils/helpers';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, loading, error } = useFetch(() => getMovieDetails(id), [id]);

  if (loading) return <Spinner label="Loading title…" />;
  if (error || !movie) {
    return (
      <div className="text-center py-24 text-muted">
        Couldn't load this movie. <Link to="/" className="text-gold hover:underline">Go home</Link>
      </div>
    );
  }

  const trailer = movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
  const backdrop = imageUrl(movie.backdrop_path, 'original');
  const poster = imageUrl(movie.poster_path, 'w500');

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
          alt={movie.title}
          className="hidden sm:block w-48 sm:w-64 rounded-lg ring-1 ring-edge shadow-2xl shadow-black/60 shrink-0"
        />

        <div className="flex-1 pt-2">
          {movie.tagline && (
            <p className="text-gold font-display tracking-wide uppercase text-sm mb-2">{movie.tagline}</p>
          )}
          <h1 className="font-display text-3xl sm:text-5xl uppercase tracking-wide leading-tight mb-3 text-balance">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-muted mb-4">
            <RatingStub vote={movie.vote_average} size="lg" />
            <span>{getYear(movie.release_date)}</span>
            {movie.runtime && <span>{formatRuntime(movie.runtime)}</span>}
            {movie.genres?.length > 0 && <span>{movie.genres.map((g) => g.name).join(' · ')}</span>}
          </div>

          <p className="text-sm sm:text-base text-muted max-w-2xl mb-6 text-balance">
            {movie.overview || 'No description available.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/watch/movie/${movie.id}`)}
              className="flex items-center gap-2 bg-gold hover:bg-gold-light text-base font-semibold px-6 py-3 rounded-md transition-colors"
            >
              <Play size={18} className="fill-base" /> Play
            </button>
            <WatchlistButton
              id={movie.id}
              mediaType="movie"
              title={movie.title}
              posterPath={movie.poster_path}
              voteAverage={movie.vote_average}
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
              <dd className="mt-0.5">{movie.status || '—'}</dd>
            </div>
            <div>
              <dt className="text-faint font-mono text-xs uppercase">Release Date</dt>
              <dd className="mt-0.5">{formatDate(movie.release_date)}</dd>
            </div>
            {movie.budget > 0 && (
              <div>
                <dt className="text-faint font-mono text-xs uppercase">Budget</dt>
                <dd className="mt-0.5">{formatMoney(movie.budget)}</dd>
              </div>
            )}
            {movie.revenue > 0 && (
              <div>
                <dt className="text-faint font-mono text-xs uppercase">Revenue</dt>
                <dd className="mt-0.5">{formatMoney(movie.revenue)}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="px-4 sm:px-8 mt-12">
        <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wide mb-4">Cast</h2>
        <CastList cast={movie.credits?.cast || []} />
      </div>

      <div className="mt-12">
        <ContentRow title="More Like This" items={movie.similar?.results} mediaType="movie" />
      </div>
    </div>
  );
}
