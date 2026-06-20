import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/common/Card';
import FilterBar from '../components/common/FilterBar';
import Pagination from '../components/common/Pagination';
import { GridSkeleton } from '../components/common/Loader';
import useFetch from '../hooks/useFetch';
import { discoverMovies, getMovieGenres } from '../api/tmdb';

export default function Movies() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page')) || 1;
  const genre = params.get('genre') || '';
  const sortBy = params.get('sort') || 'popularity.desc';

  const [genres, setGenres] = useState([]);
  useEffect(() => {
    getMovieGenres().then((res) => setGenres(res.genres || [])).catch(() => setGenres([]));
  }, []);

  const { data, loading } = useFetch(
    () => discoverMovies({ page, genre, sortBy }),
    [page, genre, sortBy]
  );

  const updateParams = (next) => {
    const merged = { page: String(page), genre, sort: sortBy, ...next };
    const cleaned = Object.fromEntries(Object.entries(merged).filter(([, v]) => v));
    setParams(cleaned);
  };

  return (
    <div className="px-4 sm:px-8 py-8">
      <h1 className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-6">Movies</h1>

      <FilterBar
        genres={genres}
        genre={genre}
        sortBy={sortBy}
        onGenreChange={(g) => updateParams({ genre: g, page: '1' })}
        onSortChange={(s) => updateParams({ sort: s, page: '1' })}
      />

      {loading ? (
        <GridSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {(data?.results || []).map((movie) => (
              <Card key={movie.id} item={movie} mediaType="movie" />
            ))}
          </div>
          {(data?.results || []).length === 0 && (
            <p className="text-muted py-12 text-center">No movies matched these filters.</p>
          )}
          <Pagination
            page={page}
            totalPages={data?.total_pages}
            onChange={(p) => updateParams({ page: String(p) })}
          />
        </>
      )}
    </div>
  );
}
