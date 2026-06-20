import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import Card from '../components/common/Card';
import Pagination from '../components/common/Pagination';
import { GridSkeleton } from '../components/common/Loader';
import useFetch from '../hooks/useFetch';
import { searchMulti } from '../api/tmdb';

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const page = Number(params.get('page')) || 1;

  const { data, loading } = useFetch(
    () => (query ? searchMulti(query, page) : Promise.resolve({ results: [] })),
    [query, page]
  );

  const results = (data?.results || []).filter(
    (item) => item.media_type === 'movie' || item.media_type === 'tv'
  );

  const setPage = (p) => setParams({ q: query, page: String(p) });

  return (
    <div className="px-4 sm:px-8 py-8 min-h-[60vh]">
      <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-wide mb-1 flex items-center gap-2">
        <SearchIcon size={22} className="text-gold" /> Search Results
      </h1>
      {query && <p className="text-muted text-sm mb-6">for “{query}”</p>}

      {!query ? (
        <p className="text-muted py-12 text-center">Start typing in the search bar above to find something to watch.</p>
      ) : loading ? (
        <GridSkeleton />
      ) : results.length === 0 ? (
        <p className="text-muted py-12 text-center">No results for “{query}”. Try a different title.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {results.map((item) => (
              <Card key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>
          <Pagination page={page} totalPages={data?.total_pages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
