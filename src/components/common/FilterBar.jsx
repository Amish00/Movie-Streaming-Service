import { SlidersHorizontal } from 'lucide-react';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'primary_release_date.desc', label: 'Newest' },
  { value: 'primary_release_date.asc', label: 'Oldest' },
];

const TV_SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'first_air_date.desc', label: 'Newest' },
  { value: 'first_air_date.asc', label: 'Oldest' },
];

export default function FilterBar({ genres = [], genre, sortBy, onGenreChange, onSortChange, isTV = false }) {
  const sortOptions = isTV ? TV_SORT_OPTIONS : SORT_OPTIONS;

  const selectClass =
    'bg-surface border border-edge rounded-md text-sm px-3 py-2 outline-none focus:border-gold/60 transition-colors text-text';

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-faint">
        <SlidersHorizontal size={13} /> Filter
      </span>

      <select value={genre || ''} onChange={(e) => onGenreChange(e.target.value)} className={selectClass}>
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)} className={selectClass}>
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
