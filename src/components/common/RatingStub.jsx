import { Star } from 'lucide-react';
import { formatRating } from '../../utils/helpers';

/**
 * Signature UI element: a torn-ticket-stub rating badge. The notch and
 * dashed perforation evoke a physical cinema ticket rather than a generic
 * pill badge, tying the rating back to the "going to the movies" subject.
 */
export default function RatingStub({ vote, size = 'sm' }) {
  const rating = formatRating(vote);
  const dims = size === 'lg' ? 'text-sm px-2.5 py-1.5' : 'text-[11px] px-2 py-1';

  return (
    <div
      className={`relative inline-flex items-center gap-1 bg-base/90 border border-gold/40 text-gold font-mono font-medium ${dims}`}
      style={{
        clipPath:
          'polygon(0 0, 100% 0, 100% 100%, 8px 100%, 8px 78%, 0 78%, 0 56%, 8px 56%, 8px 34%, 0 34%, 0 0)',
      }}
    >
      <Star size={size === 'lg' ? 13 : 11} className="fill-gold text-gold" />
      {rating}
    </div>
  );
}
