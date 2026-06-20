# ViraShare

A movie & TV streaming browser built with Vite, React, React Router, and Tailwind CSS. Content metadata (titles, posters, cast, search) comes from **TMDB**; playback is handled by **Vidking**'s keyless iframe embeds.

This is a personal/portfolio project for browsing and watching public movie/TV metadata — there's no backend, no user accounts, and no media is hosted or stored by this app itself.

## Features

- **Home** — rotating hero banner with a "Now Showing" marquee, a Continue Watching row, and rows for trending, popular, top-rated, now-playing, and on-the-air titles.
- **Browse** — paginated grids for Movies and TV Shows with genre and sort filters (`/movies`, `/tv`).
- **Search** — live type-ahead dropdown in the navbar, plus a dedicated results page (`/search?q=...`).
- **Movie & TV detail pages** — backdrop hero, synopsis, cast list, trailer link, and a "More Like This" row. TV pages include a season/episode browser.
- **Watch page** — embeds the Vidking player with the title's synopsis underneath; TV titles get an inline episode switcher so you can jump episodes without leaving the player.
- **My List** — add or remove any title from a personal watchlist, persisted in `localStorage`.
- **Continue Watching** — playback position is captured from Vidking's `postMessage` events and resumed automatically the next time you open that title.
- **Responsive, themed UI** — dark "velvet cinema" palette (plum-black with a marquee-gold accent) built entirely with Tailwind, no UI component library.

## Tech stack

| Layer | Choice |
|---|---|
| Build tool | Vite 8 |
| UI library | React 19 |
| Routing | React Router v6 (`RouterProvider` / data router) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config, no `tailwind.config.js`) |
| HTTP client | Axios |
| Icons | lucide-react |
| Metadata API | TMDB (The Movie Database) |
| Playback | Vidking (keyless iframe embeds) |
| State | React Context + `localStorage` (no Redux/Zustand) |

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A free [TMDB account](https://www.themoviedb.org/signup) and API token

### Installation

```bash
git clone https://github.com/<your-username>/virashare.git
cd virashare
npm install
```

### Environment variables

Copy the example file and add your TMDB token:

```bash
cp .env.example .env.local
```

```
VITE_TMDB_ACCESS_TOKEN=your_tmdb_v4_read_access_token_here
```

Get a **v4 Read Access Token** (not the v3 API key) from your TMDB account under **Settings → API**. `.env.local` is git-ignored by default.

> **Heads up:** this is a client-side app. Like any frontend project that calls TMDB directly, the token is visible to anyone who inspects network requests in the browser. That's expected for TMDB's free tier — just don't reuse a token you also use for sensitive account actions, and never commit `.env.local`.

Vidking needs no API key or token — it works as a fully keyless iframe embed.

### Running locally

```bash
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── api/              TMDB client + endpoint functions, Vidking URL builder
│   ├── client.js     axios instance, auth header, imageUrl() helper
│   ├── tmdb.js        every TMDB endpoint used by the app
│   └── vidking.js     embed URL builder + player postMessage parser
├── components/
│   ├── layout/        Navbar, NavSearch, Footer, Layout (route shell)
│   ├── common/        Card, ContentRow, HeroBanner, Pagination,
│   │                  FilterBar, CastList, WatchlistButton, Loader, ...
│   ├── tv/             EpisodeList (season/episode browser)
│   └── player/         VidkingPlayer (iframe + progress tracking)
├── context/            AppContext — watchlist & continue-watching state
├── hooks/              useFetch, useDebounce, useLocalStorage,
│                       useGenreMap, useApp
├── pages/              Home, Movies, TVShows, MovieDetails, TVDetails,
│                       Watch, Search, Watchlist, NotFound
├── router/             Route definitions
└── utils/              Formatting helpers (dates, runtime, ratings)
```

## How playback works

The Watch page (`/watch/movie/:id` or `/watch/tv/:id/:season/:episode`) doesn't stream anything itself — it builds a Vidking embed URL from the TMDB id and drops it into an iframe:

```
https://www.vidking.net/embed/movie/{tmdbId}
https://www.vidking.net/embed/tv/{tmdbId}/{season}/{episode}
```

Vidking posts playback events (`play`, `pause`, `timeupdate`, `ended`, `seeked`) back to the parent window. `VidkingPlayer` listens for these and reports progress up to the page, which saves it to `localStorage` so the title shows up in **Continue Watching** with the correct resume position next time.

## Attribution & disclaimers

- This product uses the TMDB API but is not endorsed or certified by TMDB. See TMDB's [attribution guidelines](https://www.themoviedb.org/about/logos-attribution) before deploying this publicly.
- Playback is provided entirely by Vidking's third-party embed service; this project doesn't host, proxy, or store any video content.
- Built for personal, non-commercial, educational use.

## Roadmap ideas

- User ratings/reviews stored locally
- Optional sign-in to sync watchlist across devices
- "Because you watched..." recommendation rows using TMDB's recommendations endpoint
- Light theme toggle

## License

MIT for the code in this repository. TMDB data and Vidking playback remain subject to their respective terms of service.
