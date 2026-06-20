import tmdb from './client';

/* ---------------------------------- Trending --------------------------------- */

export const getTrendingMovies = (timeWindow = 'week', page = 1) =>
  tmdb.get(`/trending/movie/${timeWindow}`, { params: { page } });

export const getTrendingTV = (timeWindow = 'week', page = 1) =>
  tmdb.get(`/trending/tv/${timeWindow}`, { params: { page } });

export const getTrendingAll = (timeWindow = 'day', page = 1) =>
  tmdb.get(`/trending/all/${timeWindow}`, { params: { page } });

/* ----------------------------------- Movies ----------------------------------- */

export const getPopularMovies = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } });

export const getTopRatedMovies = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } });

export const getNowPlayingMovies = (page = 1) =>
  tmdb.get('/movie/now_playing', { params: { page } });

export const getUpcomingMovies = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } });

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations,release_dates' },
  });

export const discoverMovies = ({ page = 1, genre, sortBy = 'popularity.desc', year } = {}) =>
  tmdb.get('/discover/movie', {
    params: {
      page,
      sort_by: sortBy,
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
    },
  });

/* ---------------------------------- TV Series --------------------------------- */

export const getPopularTV = (page = 1) =>
  tmdb.get('/tv/popular', { params: { page } });

export const getTopRatedTV = (page = 1) =>
  tmdb.get('/tv/top_rated', { params: { page } });

export const getOnTheAirTV = (page = 1) =>
  tmdb.get('/tv/on_the_air', { params: { page } });

export const getAiringTodayTV = (page = 1) =>
  tmdb.get('/tv/airing_today', { params: { page } });

export const getTVDetails = (id) =>
  tmdb.get(`/tv/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations,content_ratings' },
  });

export const getTVSeasonDetails = (id, seasonNumber) =>
  tmdb.get(`/tv/${id}/season/${seasonNumber}`);

export const discoverTV = ({ page = 1, genre, sortBy = 'popularity.desc', year } = {}) =>
  tmdb.get('/discover/tv', {
    params: {
      page,
      sort_by: sortBy,
      with_genres: genre || undefined,
      first_air_date_year: year || undefined,
    },
  });

/* ----------------------------------- Search ------------------------------------ */

export const searchMulti = (query, page = 1) =>
  tmdb.get('/search/multi', { params: { query, page, include_adult: false } });

export const searchMovies = (query, page = 1) =>
  tmdb.get('/search/movie', { params: { query, page, include_adult: false } });

export const searchTV = (query, page = 1) =>
  tmdb.get('/search/tv', { params: { query, page, include_adult: false } });

/* ----------------------------------- Genres ------------------------------------ */

export const getMovieGenres = () => tmdb.get('/genre/movie/list');

export const getTVGenres = () => tmdb.get('/genre/tv/list');

/* ---------------------------------- People -------------------------------------- */

export const getPersonDetails = (id) =>
  tmdb.get(`/person/${id}`, { params: { append_to_response: 'combined_credits' } });
