import { useEffect, useMemo, useRef } from 'react';
import { getMovieEmbedUrl, getTVEmbedUrl, parsePlayerEvent } from '../../api/vidking';

export default function VidkingPlayer({
  mediaType,
  tmdbId,
  season,
  episode,
  resumeSeconds,
  onProgress,
}) {
  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  const src = useMemo(() => {
    const options = { autoPlay: true, progress: resumeSeconds ? Math.floor(resumeSeconds) : undefined };
    return mediaType === 'tv'
      ? getTVEmbedUrl(tmdbId, season, episode, options)
      : getMovieEmbedUrl(tmdbId, options);
    // Intentionally exclude resumeSeconds from deps below the first mount —
    // we only want the start position applied once, not on every tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType, tmdbId, season, episode]);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = parsePlayerEvent(event.data);
      if (data) onProgressRef.current?.(data);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden ring-1 ring-edge">
      <iframe
        key={src}
        src={src}
        title="Video player"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0"
      />
    </div>
  );
}
