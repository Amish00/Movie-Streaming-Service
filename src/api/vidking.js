const BASE = 'https://www.vidking.net/embed';

// Theme accent used as the player's default color (sent without the leading #)
export const DEFAULT_PLAYER_COLOR = 'D4A24C';

const buildQuery = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, value);
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
};

/**
 * Build a Vidking movie embed URL.
 * options: { color, autoPlay, progress }
 */
export const getMovieEmbedUrl = (tmdbId, options = {}) => {
  const { color = DEFAULT_PLAYER_COLOR, autoPlay, progress } = options;
  const query = buildQuery({ color, autoPlay, progress });
  return `${BASE}/movie/${tmdbId}${query}`;
};

/**
 * Build a Vidking TV episode embed URL.
 * options: { color, autoPlay, nextEpisode, episodeSelector, progress }
 */
export const getTVEmbedUrl = (tmdbId, season, episode, options = {}) => {
  const {
    color = DEFAULT_PLAYER_COLOR,
    autoPlay,
    nextEpisode = true,
    episodeSelector = true,
    progress,
  } = options;
  const query = buildQuery({ color, autoPlay, nextEpisode, episodeSelector, progress });
  return `${BASE}/tv/${tmdbId}/${season}/${episode}${query}`;
};

/**
 * Parses postMessage payloads sent by the Vidking player.
 * Returns null if the event isn't a recognized player event.
 */
export const parsePlayerEvent = (raw) => {
  try {
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (parsed?.type === 'PLAYER_EVENT' && parsed.data) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
};
