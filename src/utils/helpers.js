export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const getYear = (dateStr) => (dateStr ? dateStr.slice(0, 4) : '—');

export const formatDate = (dateStr) => {
  if (!dateStr) return 'Unknown';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const formatRating = (vote) =>
  typeof vote === 'number' && vote > 0 ? vote.toFixed(1) : 'N/A';

export const formatMoney = (amount) => {
  if (!amount) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const truncate = (text, length = 160) => {
  if (!text) return '';
  return text.length > length ? `${text.slice(0, length).trim()}…` : text;
};

// Title/name come from different fields depending on media type
export const getTitle = (item) => item?.title || item?.name || 'Untitled';
export const getReleaseDate = (item) => item?.release_date || item?.first_air_date;
export const getMediaType = (item) =>
  item?.media_type || (item?.first_air_date ? 'tv' : 'movie');
