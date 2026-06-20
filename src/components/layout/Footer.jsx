import { Link } from 'react-router-dom';
import { Clapperboard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-edge mt-16 px-4 sm:px-8 py-10 text-sm text-muted">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg uppercase tracking-wide text-text">
          <Clapperboard size={18} className="text-gold" />
          Vira<span className="text-gold">Share</span>
        </Link>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link to="/" className="hover:text-text">Home</Link></li>
          <li><Link to="/movies" className="hover:text-text">Movies</Link></li>
          <li><Link to="/tv" className="hover:text-text">TV Shows</Link></li>
          <li><Link to="/watchlist" className="hover:text-text">My List</Link></li>
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-edge flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs font-mono text-faint">
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
          Playback is provided via Vidking.
        </p>
        <p>© {new Date().getFullYear()} ViraShare — built for personal, non-commercial use.</p>
      </div>
    </footer>
  );
}
