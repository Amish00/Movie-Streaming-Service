import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card';
import { RowSkeleton } from './Loader';
import useFetch from '../../hooks/useFetch';

export default function ContentRow({ title, fetcher, items, mediaType, seeAllHref }) {
  const railRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const { data, loading } = useFetch(
    () => (fetcher ? fetcher() : Promise.resolve(null)),
    [title]
  );

  const list = items || data?.results || [];

  const updateEdges = () => {
    const el = railRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const scroll = (direction) => {
    const el = railRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * (direction === 'left' ? -1 : 1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(updateEdges, 350);
  };

  if (!loading && list.length === 0) return null;

  return (
    <section className="relative">
      <div className="flex items-baseline justify-between mb-3 px-4 sm:px-8">
        <h2 className="font-display text-xl sm:text-2xl tracking-wide uppercase text-text">
          {title}
        </h2>
        {seeAllHref && (
          <Link
            to={seeAllHref}
            className="text-xs sm:text-sm text-muted hover:text-gold flex items-center gap-1 font-mono shrink-0"
          >
            See all <ChevronRight size={13} />
          </Link>
        )}
      </div>

      <div className="relative group/row">
        {!atStart && (
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-1 top-0 bottom-6 z-10 w-10 items-center justify-center bg-gradient-to-r from-base to-transparent text-text opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {loading ? (
          <div className="px-4 sm:px-8">
            <RowSkeleton />
          </div>
        ) : (
          <div
            ref={railRef}
            onScroll={updateEdges}
            className="rail flex gap-3 overflow-x-auto px-4 sm:px-8 pb-2 scroll-smooth"
          >
            {list.map((item) => (
              <Card
                key={`${item.id}-${item.media_type || mediaType}`}
                item={item}
                mediaType={mediaType}
                className="shrink-0 w-[160px] sm:w-[180px]"
              />
            ))}
          </div>
        )}

        {!atEnd && (
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-1 top-0 bottom-6 z-10 w-10 items-center justify-center bg-gradient-to-l from-base to-transparent text-text opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </section>
  );
}
