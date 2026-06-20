import { useEffect, useState } from 'react';
import { getMovieGenres, getTVGenres } from '../api/tmdb';

// Module-level cache so genre lists (rarely change) are only fetched once
// per page session, no matter how many components need them.
let cachedMap = null;
let inFlight = null;

const loadGenreMap = async () => {
  if (cachedMap) return cachedMap;
  if (inFlight) return inFlight;

  inFlight = Promise.all([getMovieGenres(), getTVGenres()]).then(([movies, tv]) => {
    const map = {};
    [...(movies.genres || []), ...(tv.genres || [])].forEach((g) => {
      map[g.id] = g.name;
    });
    cachedMap = map;
    return map;
  });

  return inFlight;
};

export default function useGenreMap() {
  const [map, setMap] = useState(() => cachedMap || {});

  useEffect(() => {
    if (cachedMap) return;
    loadGenreMap().then(setMap).catch(() => setMap({}));
  }, []);

  return map;
}

export const namesFromIds = (map, ids = []) =>
  ids.map((id) => map[id]).filter(Boolean);
