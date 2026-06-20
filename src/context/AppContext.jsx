import { useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { AppContext } from './appContextInstance';

const keyFor = (id, mediaType) => `${mediaType}-${id}`;

export function AppProvider({ children }) {
  const [watchlist, setWatchlist] = useLocalStorage('viralis:watchlist', []);
  const [continueWatching, setContinueWatching] = useLocalStorage(
    'viralis:continue-watching',
    {}
  );

  const isInWatchlist = useCallback(
    (id, mediaType) => watchlist.some((entry) => entry.id === id && entry.mediaType === mediaType),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (item) => {
      setWatchlist((prev) => {
        const exists = prev.some(
          (entry) => entry.id === item.id && entry.mediaType === item.mediaType
        );
        if (exists) {
          return prev.filter(
            (entry) => !(entry.id === item.id && entry.mediaType === item.mediaType)
          );
        }
        return [{ ...item, addedAt: Date.now() }, ...prev];
      });
    },
    [setWatchlist]
  );

  const removeFromWatchlist = useCallback(
    (id, mediaType) => {
      setWatchlist((prev) =>
        prev.filter((entry) => !(entry.id === id && entry.mediaType === mediaType))
      );
    },
    [setWatchlist]
  );

  const saveProgress = useCallback(
    (entry) => {
      const key = keyFor(entry.id, entry.mediaType);
      setContinueWatching((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...entry, updatedAt: Date.now() },
      }));
    },
    [setContinueWatching]
  );

  const getProgress = useCallback(
    (id, mediaType) => continueWatching[keyFor(id, mediaType)] || null,
    [continueWatching]
  );

  const removeFromContinueWatching = useCallback(
    (id, mediaType) => {
      setContinueWatching((prev) => {
        const next = { ...prev };
        delete next[keyFor(id, mediaType)];
        return next;
      });
    },
    [setContinueWatching]
  );

  const continueWatchingList = useMemo(
    () =>
      Object.values(continueWatching)
        .filter((entry) => entry.progress > 1 && entry.progress < 95)
        .sort((a, b) => b.updatedAt - a.updatedAt),
    [continueWatching]
  );

  const value = useMemo(
    () => ({
      watchlist,
      isInWatchlist,
      toggleWatchlist,
      removeFromWatchlist,
      saveProgress,
      getProgress,
      removeFromContinueWatching,
      continueWatchingList,
    }),
    [
      watchlist,
      isInWatchlist,
      toggleWatchlist,
      removeFromWatchlist,
      saveProgress,
      getProgress,
      removeFromContinueWatching,
      continueWatchingList,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
