import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
      <Clapperboard size={40} className="text-gold mb-4" />
      <h1 className="font-display text-4xl sm:text-5xl uppercase tracking-wide mb-3">Scene Missing</h1>
      <p className="text-muted max-w-md mb-6">
        We couldn't find the page you were looking for. It may have been moved, renamed, or never existed.
      </p>
      <Link
        to="/"
        className="bg-gold hover:bg-gold-light text-base font-semibold px-6 py-3 rounded-md transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
