import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, onChange }) {
  const max = Math.min(totalPages || 1, 500); // TMDB caps at 500 pages
  if (max <= 1) return null;

  const go = (p) => {
    const next = Math.max(1, Math.min(max, p));
    if (next !== page) onChange(next);
  };

  const pages = () => {
    const set = new Set([1, max, page - 1, page, page + 1]);
    return [...set].filter((p) => p >= 1 && p <= max).sort((a, b) => a - b);
  };

  let prev = 0;
  const items = [];
  pages().forEach((p) => {
    if (prev && p - prev > 1) items.push('…');
    items.push(p);
    prev = p;
  });

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8 font-mono text-sm">
      <button
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-edge text-muted hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:hover:text-muted disabled:hover:border-edge transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {items.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-faint">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            className={`w-9 h-9 rounded-md transition-colors ${
              p === page
                ? 'bg-gold text-base font-semibold'
                : 'border border-edge text-muted hover:text-gold hover:border-gold/50'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => go(page + 1)}
        disabled={page >= max}
        className="w-9 h-9 flex items-center justify-center rounded-md border border-edge text-muted hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:hover:text-muted disabled:hover:border-edge transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
