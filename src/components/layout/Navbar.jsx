import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Clapperboard, Bookmark } from 'lucide-react';
import NavSearch from './NavSearch';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/tv', label: 'TV Shows' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-base/95 backdrop-blur-sm border-b border-edge">
      <nav className="flex items-center justify-between gap-4 px-4 sm:px-8 h-20">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 font-display text-2xl sm:text-3xl tracking-wide uppercase shrink-0">
            <Clapperboard size={26} className="text-gold" />
            Vira<span className="text-gold">Share</span>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? 'text-gold' : 'text-muted hover:text-text'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <NavSearch />
          </div>
          <Link
            to="/watchlist"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted hover:text-gold transition-colors"
          >
            <Bookmark size={17} /> My List
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-text"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4 border-t border-edge pt-4 bg-base">
          <div className="sm:hidden">
            <NavSearch mobile onNavigate={() => setMenuOpen(false)} />
          </div>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {[...LINKS, { to: '/watchlist', label: 'My List' }].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-1 transition-colors ${isActive ? 'text-gold' : 'text-muted hover:text-text'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
