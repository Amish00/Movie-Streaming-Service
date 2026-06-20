import axios from 'axios';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const imageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

tmdb.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.status_message ||
      error.message ||
      'Something went wrong talking to TMDB.';
    return Promise.reject(new Error(message));
  }
);

export default tmdb;
