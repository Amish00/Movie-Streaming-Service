# Viralis

A movie & TV streaming browser built with Vite, React, React Router, and Tailwind CSS. Content metadata comes from **TMDB**; playback is handled by **Vidking**'s keyless iframe embeds.

## Features

- **Home** — rotating hero banner, Continue Watching, and rows for trending, popular, top-rated, now-playing, and on-the-air content.
- **Movies / TV Shows** — paginated browse grids with genre and sort filters (`/movies`, `/tv`).
- **Search** — live type-ahead dropdown in the navbar plus a full results page (`/search?q=...`).
- **Movie & TV detail pages** — backdrop hero, synopsis, cast, trailer link, and a "More Like This" row. TV pages include a season/episode browser.
- **Watch page** — embeds the Vidking player, shows the title's description underneath, and (for TV) an inline episode switcher.
- **My List** — add/remove movies or shows to a personal watchlist, stored in `localStorage`.
- **Continue Watching** — playback position is captured from Vidking's `postMessage` events and resumed automatically next time you open that title.

## Tech stack

- Vite 8 + React 19
- React Router v6 (data router / `RouterProvider`)
- Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js` needed)
- Axios for the TMDB client
- lucide-react for icons

## Getting started

```bash
npm install
cp .env.example .env.local   # then paste your TMDB token into .env.local
npm run dev
```

### TMDB API token

Get a **v4 Read Access Token** from your TMDB account → Settings → API, then put it in `.env.local`:

```
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

`.env.local` is already git-ignored. Note that this is a client-side app — like any frontend project that calls TMDB directly, the token is visible to anyone who inspects network requests in the browser. That's expected for TMDB's free tier, but don't reuse a token you also use for paid/sensitive TMDB account actions, and don't commit `.env.local` to a public repo.

### Vidking player

No API key needed — Vidking works as keyless iframe embeds. The embed URLs are built in `src/api/vidking.js`. The default player accent color is set to match the app's gold theme; change `DEFAULT_PLAYER_COLOR` there if you'd like a different color.

## Project structure

```
src/
  api/            TMDB client + endpoint functions, Vidking URL builder
  components/
    layout/       Navbar, Footer, Layout, navbar search
    common/       Card, ContentRow, HeroBanner, Pagination, FilterBar, etc.
    tv/           EpisodeList (season/episode browser)
    player/       VidkingPlayer (iframe + progress tracking)
  context/        AppContext — watchlist & continue-watching state
  hooks/          useFetch, useDebounce, useLocalStorage, useGenreMap, useApp
  pages/          Home, Movies, TVShows, MovieDetails, TVDetails, Watch, Search, Watchlist, NotFound
  router/         Route definitions
```

## Notes

- TMDB's free API plan is rate-limited; if rows look empty intermittently during development, check the browser console for `429` responses.
- This project uses the TMDB API but is not endorsed or certified by TMDB. If you deploy this publicly, review TMDB's attribution requirements (themoviedb.org/about/logos-attribution) for proper logo usage.
