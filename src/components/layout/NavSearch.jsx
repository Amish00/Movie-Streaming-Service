import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import useDebounce from '../../hooks/useDebounce';
import { searchMulti } from '../../api/tmdb';
import { imageUrl } from '../../api/client';
import { getTitle, getYear, getReleaseDate } from '../../utils/helpers';

export default function NavSearch({ mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [resolvedQuery, setResolvedQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounced = useDebounce(query, 350);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const loading = Boolean(debounced.trim()) && resolvedQuery !== debounced;

  useEffect(() => {
    if (!debounced.trim()) {
      return;
    }
    let active = true;

    searchMulti(debounced)
      .then((data) => {
        if (!active) return;
        const filtered = (data.results || []).filter(
          (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );
        setResults(filtered.slice(0, 6));
        setResolvedQuery(debounced);
      })
      .catch(() => {
        if (!active) return;
        setResults([]);
        setResolvedQuery(debounced);
      });
    return () => {
      active = false;
    };
  }, [debounced]);

  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const goToResult = (item) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(`/${item.media_type}/${item.id}`);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={containerRef} className={mobile ? 'relative w-full' : 'relative'}>
      <form onSubmit={submitSearch} className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search movies & TV"
          className={
            'bg-surface border border-edge rounded-full text-sm placeholder:text-faint text-text pl-9 pr-8 py-2.5 outline-none focus:border-gold/60 transition-colors ' +
            (mobile ? 'w-full' : 'w-52 focus:w-80 transition-all duration-300')
          }
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-text"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </form>

      {open && query.trim() && (
        <div className="absolute right-0 mt-2 w-full sm:w-80 bg-surface border border-edge rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50 animate-fade-in">
          {loading ? (
            <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted">
              <Loader2 size={14} className="animate-spin" /> Searching…
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-muted">No matches for “{query}”.</p>
          ) : (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((item) => (
                <li key={`${item.media_type}-${item.id}`}>
                  <button
                    onClick={() => goToResult(item)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-surface-light text-left transition-colors"
                  >
                    <img
                      src={imageUrl(item.poster_path, 'w92')}
                      alt=""
                      className="w-9 h-[3.25rem] object-cover rounded shrink-0"
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium truncate">{getTitle(item)}</span>
                      <span className="block text-xs text-muted font-mono">
                        {getYear(getReleaseDate(item))} · {item.media_type === 'tv' ? 'TV' : 'Movie'}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={submitSearch}
            className="w-full text-center text-sm py-2.5 border-t border-edge text-gold hover:bg-surface-light font-medium"
          >
            See all results for “{query}”
          </button>
        </div>
      )}
    </div>
  );
}
