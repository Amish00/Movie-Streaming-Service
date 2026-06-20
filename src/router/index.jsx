import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import TVShows from '../pages/TVShows';
import MovieDetails from '../pages/MovieDetails';
import TVDetails from '../pages/TVDetails';
import Watch from '../pages/Watch';
import Search from '../pages/Search';
import Watchlist from '../pages/Watchlist';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'movies', element: <Movies /> },
      { path: 'tv', element: <TVShows /> },
      { path: 'movie/:id', element: <MovieDetails /> },
      { path: 'tv/:id', element: <TVDetails /> },
      { path: 'watch/movie/:id', element: <Watch mediaType="movie" /> },
      { path: 'watch/tv/:id/:season/:episode', element: <Watch mediaType="tv" /> },
      { path: 'search', element: <Search /> },
      { path: 'watchlist', element: <Watchlist /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
